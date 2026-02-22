#!/usr/bin/env python3
"""
Release Automation Script
Automates the process of generating release notes from Linear tickets
and updating ticket statuses.

Run this script directly to execute the full automation workflow:
- Fetch merged issues from Linear
- Generate AI-powered release notes
- Save release notes to file
- Update issue statuses to "Deployed to Staging"
"""

import argparse
import asyncio
import os
import sys
from pathlib import Path
from datetime import datetime
from typing import Optional

try:
    from rich.console import Console
    from rich.progress import Progress, SpinnerColumn, TextColumn
    from rich.panel import Panel
    from rich.table import Table
except ImportError:
    print("❌ Missing dependencies. Please install requirements:")
    print("pip install -r requirements.txt")
    sys.exit(1)

from src.config import Config
from src.linear_client import LinearClient
from src.ai_client import AIClient
from src.release_generator import ReleaseGenerator

console = Console()

# Configuration - Set these to customize behavior
# Check environment variable first, then fall back to default
DRY_RUN = os.getenv("RELEASE_DRY_RUN", "true").lower() == "true"
PRODUCTION = os.getenv("RELEASE_PRODUCTION", "false").lower() == "true"
VERBOSE = True  # Set to False for minimal output
AI_MODEL = "gpt-4"  # Can be "gpt-4" or "gpt-3.5-turbo"


async def run_automation(
    release_generator: ReleaseGenerator,
    dry_run: bool,
    verbose: bool,
    production: bool = False,
):
    """Main automation workflow"""

    # Set target status based on environment
    target_status = "Deployed to Production" if production else "Deployed to Staging"
    env_name = "Production" if production else "Staging"

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console,
    ) as progress:

        # Step 1: Fetch issues based on environment
        if production:
            task1 = progress.add_task("Fetching production-ready issues from Linear...", total=None)
        else:
            task1 = progress.add_task("Fetching merged issues from Linear...", total=None)
        merged_issues = await release_generator.get_issues_for_release(production)
        progress.update(task1, completed=True)

        if not merged_issues:
            if production:
                console.print("[yellow]ℹ️  No production-ready issues found (Deployed to Staging / Tested in Staging)[/yellow]")
            else:
                console.print("[yellow]ℹ️  No merged issues found[/yellow]")
            return

        if production:
            console.print(f"[green]✅ Found {len(merged_issues)} production-ready issues[/green]")
        else:
            console.print(f"[green]✅ Found {len(merged_issues)} merged issues[/green]")

        if verbose:
            show_issues_table(merged_issues)

        # Step 2: Generate release notes
        task2 = progress.add_task("Generating AI release notes...", total=None)
        release_notes = await release_generator.generate_release_notes(merged_issues)
        progress.update(task2, completed=True)

        console.print("[green]✅ Release notes generated[/green]")

        # Step 3: Post to Slack (if configured)
        if release_generator.slack_client:
            task3 = progress.add_task("Posting to Slack...", total=None)
            slack_success = await release_generator.post_to_slack(
                release_notes, len(merged_issues), dry_run, production
            )
            progress.update(task3, completed=True)

            if slack_success:
                console.print("[green]✅ Posted to Slack channel[/green]")
            else:
                console.print("[yellow]⚠️  Failed to post to Slack[/yellow]")
        else:
            console.print("[dim]ℹ️  Slack not configured - skipping[/dim]")

        # Step 4: Update issue statuses
        if not dry_run:
            if production:
                task4 = progress.add_task("Moving issues to Deployed to Production...", total=None)
            else:
                task4 = progress.add_task("Updating issue statuses...", total=None)
            updated_count = await release_generator.update_issue_statuses(
                merged_issues, target_status
            )
            progress.update(task4, completed=True)
            if production:
                console.print(
                    f"[green]✅ Moved {updated_count} issues from staging to '{target_status}'[/green]"
                )
            else:
                console.print(
                    f"[green]✅ Updated {updated_count} issues to '{target_status}'[/green]"
                )
        else:
            console.print("[yellow]⚠️  Skipped status updates (dry run)[/yellow]")

    # Show summary
    console.print("\n" + "=" * 50)
    console.print("[bold green]🎉 Release Automation Completed![/bold green]")
    console.print(f"🎫 Issues processed: {len(merged_issues)}")
    console.print(f"🌍 Environment: {env_name}")
    if release_generator.slack_client:
        console.print("📝 Release notes posted to Slack")
    if not dry_run:
        if production:
            console.print(f"✅ All issues moved from staging to '{target_status}'")
        else:
            console.print(f"✅ All issues updated to '{target_status}'")


async def show_issues(linear_client: LinearClient, status: str):
    """Display issues in a table"""

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console,
    ) as progress:
        task = progress.add_task(f"Fetching {status} issues...", total=None)
        issues = await linear_client.get_issues_by_status(status)
        progress.update(task, completed=True)

    if not issues:
        console.print(f"[yellow]No issues found with status '{status}'[/yellow]")
        return

    show_issues_table(issues)


def show_issues_table(issues):
    """Display issues in a formatted table"""

    table = Table(title="Linear Issues")
    table.add_column("ID", style="cyan", no_wrap=True)
    table.add_column("Title", style="white")
    table.add_column("Status", style="green")
    table.add_column("Labels", style="yellow")

    for issue in issues:
        # Handle labels structure from Linear API
        labels_data = issue.get("labels", {})
        if isinstance(labels_data, dict) and "nodes" in labels_data:
            labels = ", ".join(
                [label.get("name", "") for label in labels_data["nodes"]]
            )
        elif isinstance(labels_data, list):
            labels = ", ".join([label.get("name", "") for label in labels_data])
        else:
            labels = ""

        table.add_row(
            issue.get("identifier", ""),
            issue.get("title", ""),
            issue.get("state", {}).get("name", ""),
            labels,
        )

    console.print(table)


async def main():
    """Main execution function"""

    # Parse command line arguments
    parser = argparse.ArgumentParser(description="Release Automation Script")
    parser.add_argument(
        "--production", "-p",
        action="store_true",
        help="Run in production mode (updates status to 'Deployed to Production')"
    )
    parser.add_argument(
        "--dry-run", "-d",
        action="store_true",
        help="Run in dry-run mode (no changes will be made)"
    )
    args = parser.parse_args()

    # Command line args override environment variables
    dry_run = args.dry_run or DRY_RUN
    production = args.production or PRODUCTION

    env_name = "Production" if production else "Staging"

    console.print(
        Panel.fit(
            f"[bold blue]🚀 Release Automation Started ({env_name})[/bold blue]", border_style="blue"
        )
    )

    if dry_run:
        console.print("[yellow]⚠️  DRY RUN MODE - No changes will be made[/yellow]\n")

    try:
        # Initialize configuration
        config = Config()

        # Initialize clients
        linear_client = LinearClient(config.linear_api_key, config.linear_team_id)
        ai_client = AIClient(config.openai_api_key, AI_MODEL)
        release_generator = ReleaseGenerator(linear_client, ai_client, config)

        # Run the automation
        await run_automation(release_generator, dry_run, VERBOSE, production)

    except Exception as e:
        console.print(f"[red]❌ Error: {str(e)}[/red]")
        sys.exit(1)


if __name__ == "__main__":
    # Run the automation directly
    asyncio.run(main())
