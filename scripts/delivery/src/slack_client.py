"""
Slack client for posting release notes
"""

import json
from typing import Dict, Any

import httpx


class SlackClient:
    """Slack client for posting messages"""

    def __init__(self, webhook_url: str):
        self.webhook_url = webhook_url

    async def post_release_notes(
        self, release_notes: str, issue_count: int, dry_run: bool = False, production: bool = False
    ) -> bool:
        """Post release notes to Slack channel"""

        if dry_run:
            print("🔔 [DRY RUN] Posting test message to Slack:")
            print(f"   Channel: {self._get_channel_from_webhook()}")
            print(f"   Issues: {issue_count}")

        try:
            # Format the message for Slack
            slack_message = self._format_release_notes_for_slack(
                release_notes, issue_count, dry_run, production
            )

            # Send to Slack
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    self.webhook_url, json=slack_message, timeout=30.0
                )

                if response.status_code == 200:
                    return True
                else:
                    print(
                        f"❌ Slack API error: {response.status_code} - {response.text}"
                    )
                    return False

        except Exception as e:
            print(f"❌ Failed to post to Slack: {str(e)}")
            return False

    def _format_release_notes_for_slack(
        self, release_notes: str, issue_count: int, dry_run: bool = False, production: bool = False
    ) -> Dict[str, Any]:
        """Format release notes for Slack message"""

        # Extract just the content part (without the header)
        lines = release_notes.split("\n")
        content_start = 0

        # Find where the actual content starts (after the header)
        for i, line in enumerate(lines):
            if line.strip().startswith("##") and not line.strip().startswith("---"):
                content_start = i
                break

        # Get the main content
        main_content = (
            "\n".join(lines[content_start:]) if content_start > 0 else release_notes
        )

        # Truncate if too long (Slack has message limits)
        if len(main_content) > 2000:
            main_content = main_content[:1900] + "\n\n... (truncated)"

        # Determine environment name
        env_name = "Production" if production else "Staging"

        # Determine header text based on dry run mode and environment
        if dry_run:
            header_text = "🧪 Testing Release notes"
        else:
            header_text = f"🚀 New FE Release Deploying to {env_name}"

        # Determine description text
        if dry_run:
            description_text = f"*{issue_count} issues* would be deployed to {env_name.lower()} environment (DRY RUN)."
        else:
            description_text = f"*{issue_count} issues* have been merged and deployed to {env_name.lower()} environment."

        return {
            "text": header_text,
            "blocks": [
                {"type": "header", "text": {"type": "plain_text", "text": header_text}},
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": description_text,
                    },
                },
                {"type": "divider"},
                {"type": "section", "text": {"type": "mrkdwn", "text": main_content}},
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": "Generated automatically by Release Automation 🤖",
                        }
                    ],
                },
            ],
        }

    def _get_channel_from_webhook(self) -> str:
        """Extract channel info from webhook URL for display"""
        try:
            # Webhook URLs contain team and channel info
            if "hooks.slack.com" in self.webhook_url:
                return "Slack Channel (via webhook)"
            return "Unknown Channel"
        except:
            return "Slack Channel"

    async def test_connection(self) -> bool:
        """Test Slack webhook connection"""

        test_message = {
            "text": "🧪 Test message from Release Automation",
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "🧪 *Test Message*\n\nThis is a test message from the Release Automation script to verify Slack integration is working.",
                    },
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": "You can safely ignore this message.",
                        }
                    ],
                },
            ],
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    self.webhook_url, json=test_message, timeout=30.0
                )

                return response.status_code == 200

        except Exception:
            return False
