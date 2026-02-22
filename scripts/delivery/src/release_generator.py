"""
Main orchestration logic for release generation
"""

import asyncio
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any, Optional

from .linear_client import LinearClient
from .ai_client import AIClient
from .slack_client import SlackClient
from .config import Config


class ReleaseGenerator:
    """Main class for orchestrating release generation"""

    def __init__(
        self, linear_client: LinearClient, ai_client: AIClient, config: Config
    ):
        self.linear_client = linear_client
        self.ai_client = ai_client
        self.config = config

        # Initialize Slack client if webhook URL is provided
        self.slack_client = None
        if config.enable_slack:
            self.slack_client = SlackClient(config.slack_webhook_url)

    async def get_merged_issues(self) -> List[Dict[str, Any]]:
        """Get all merged issues from Linear"""
        return await self.linear_client.get_merged_issues()

    async def get_issues_for_release(self, production: bool = False) -> List[Dict[str, Any]]:
        """Get issues for release based on environment

        For staging: Get issues with 'Merged' status
        For production: Get issues with 'Deployed to Staging' or 'Tested in Staging' status
        """
        if production:
            return await self.linear_client.get_production_ready_issues()
        return await self.linear_client.get_merged_issues()

    async def generate_release_notes(
        self, issues: List[Dict[str, Any]], custom_prompt: Optional[str] = None
    ) -> str:
        """Generate AI-powered release notes"""

        if not issues:
            return self._generate_empty_release_notes()

        # Generate release notes using AI
        release_notes = await self.ai_client.generate_release_notes(
            issues, custom_prompt
        )

        # Add metadata header
        header = self._generate_header(len(issues))

        return f"{header}\n\n{release_notes}"

    async def save_release_notes(
        self, release_notes: str, custom_filename: Optional[str] = None
    ) -> Path:
        """Save release notes to file"""

        filename = self.config.get_output_filename(custom_filename)
        output_path = self.config.output_dir / filename

        # Ensure output directory exists
        output_path.parent.mkdir(parents=True, exist_ok=True)

        # Write release notes
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(release_notes)

        return output_path

    async def update_issue_statuses(
        self, issues: List[Dict[str, Any]], new_status: str
    ) -> int:
        """Update all issues to new status"""

        issue_ids = [issue["id"] for issue in issues]

        if not issue_ids:
            return 0

        return await self.linear_client.bulk_update_issue_statuses(
            issue_ids, new_status
        )

    async def post_to_slack(
        self, release_notes: str, issue_count: int, dry_run: bool = False, production: bool = False
    ) -> bool:
        """Post release notes to Slack if configured"""

        if not self.slack_client:
            return False

        return await self.slack_client.post_release_notes(
            release_notes, issue_count, dry_run, production
        )

    async def run_full_automation(
        self,
        dry_run: bool = False,
        output_filename: Optional[str] = None,
        custom_prompt: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Run the complete automation workflow"""

        results = {
            "success": False,
            "issues_found": 0,
            "issues_updated": 0,
            "release_notes_path": None,
            "errors": [],
        }

        try:
            # Step 1: Get merged issues
            merged_issues = await self.get_merged_issues()
            results["issues_found"] = len(merged_issues)

            if not merged_issues:
                results["success"] = True
                results["message"] = "No merged issues found"
                return results

            # Step 2: Generate release notes
            release_notes = await self.generate_release_notes(
                merged_issues, custom_prompt
            )

            # Step 3: Save release notes
            output_path = await self.save_release_notes(release_notes, output_filename)
            results["release_notes_path"] = str(output_path)

            # Step 4: Update issue statuses (unless dry run)
            if not dry_run:
                updated_count = await self.update_issue_statuses(
                    merged_issues, self.config.staging_status
                )
                results["issues_updated"] = updated_count

            results["success"] = True

        except Exception as e:
            results["errors"].append(str(e))

        return results

    def _generate_header(self, issue_count: int) -> str:
        """Generate release notes header"""

        now = datetime.now()

        return f"""# Release Notes - {now.strftime("%Y-%m-%d")}

**Generated**: {now.strftime("%Y-%m-%d %H:%M:%S")}
**Issues Processed**: {issue_count}
**Status**: Deployed to Staging

---"""

    def _generate_empty_release_notes(self) -> str:
        """Generate release notes when no issues are found"""

        header = self._generate_header(0)

        return f"""{header}

## Summary

No merged issues found for this release cycle.

This release contains no changes - all systems remain stable with no new features, bug fixes, or improvements to report.

---

*Generated automatically by Release Automation*"""

    async def validate_configuration(self) -> Dict[str, bool]:
        """Validate all configurations and connections"""

        validation_results = {
            "linear_connection": False,
            "ai_connection": False,
            "output_directory": False,
            "template_file": False,
        }

        try:
            # Test Linear connection
            validation_results["linear_connection"] = (
                await self.linear_client.test_connection()
            )
        except Exception:
            pass

        try:
            # Test AI connection (simple test)
            test_issues = [
                {"identifier": "TEST-1", "title": "Test issue", "description": "Test"}
            ]
            await self.ai_client.summarize_changes(test_issues)
            validation_results["ai_connection"] = True
        except Exception:
            pass

        # Check output directory
        validation_results["output_directory"] = (
            self.config.output_dir.exists() or self.config.output_dir.parent.exists()
        )

        # Check template file (if configured)
        if self.config.template_path.exists():
            validation_results["template_file"] = True
        else:
            validation_results["template_file"] = True  # Optional, so mark as valid

        return validation_results

    async def get_release_summary(self, issues: List[Dict[str, Any]]) -> str:
        """Get a brief summary of the release"""

        if not issues:
            return "No changes in this release."

        return await self.ai_client.summarize_changes(issues)

    def format_issue_for_display(self, issue: Dict[str, Any]) -> str:
        """Format a single issue for display"""

        identifier = issue.get("identifier", "Unknown")
        title = issue.get("title", "No title")
        state = issue.get("state", {}).get("name", "Unknown")

        # Get labels
        labels = []
        for label_node in issue.get("labels", {}).get("nodes", []):
            labels.append(label_node.get("name", ""))

        labels_str = f" [{', '.join(labels)}]" if labels else ""

        return f"{identifier}: {title} ({state}){labels_str}"
