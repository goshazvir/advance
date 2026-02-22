"""
Configuration management for release automation
"""

import os
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv

# Load environment variables from .env file in the delivery script directory
# This ensures the .env is found regardless of the current working directory
_script_dir = Path(__file__).resolve().parent.parent  # Go up from src/ to delivery/
_env_path = _script_dir / ".env"
load_dotenv(_env_path)


class Config:
    """Configuration class for release automation"""

    def __init__(self):
        # Linear API Configuration
        self.linear_api_key = self._get_required_env("LINEAR_API_KEY")
        self.linear_team_id = "FE"
        self.linear_api_url = "https://api.linear.app/graphql"
        self.openai_organization = "org-Dgqo1Y7B2gjERLCoRVEhJD5X"
        self.openai_api_key = self._get_required_env("OPENAI_API_KEY")
        self.openai_model = "gpt-4"

        # Output Configuration
        self.output_dir = Path("./output/releases")
        self.output_dir.mkdir(parents=True, exist_ok=True)

        # Release Configuration
        self.merged_status = "Merged"
        self.staging_status = "Deployed to Staging"

        # Template Configuration
        self.template_dir = Path("./templates")
        self.template_file = "release_template.md"

        # AI Configuration
        self.ai_temperature = 0.3
        self.ai_max_tokens = 2000

        # Slack Configuration (optional)
        self.slack_webhook_url = self._get_required_env("SLACK_WEBHOOK_URL")
        self.enable_slack = bool(self.slack_webhook_url)

        # Validation
        self._validate_config()

    def _get_required_env(self, key: str) -> str:
        """Get required environment variable or raise error"""
        value = os.getenv(key)
        if not value:
            raise ValueError(f"Required environment variable {key} is not set")
        return value

    def _validate_config(self):
        """Validate configuration"""
        if not self.linear_api_key.startswith(("lin_api_", "lin_")):
            raise ValueError("LINEAR_API_KEY appears to be invalid format")

        if not self.openai_api_key.startswith("sk-"):
            raise ValueError("OPENAI_API_KEY appears to be invalid format")

    @property
    def template_path(self) -> Path:
        """Get full path to template file"""
        return self.template_dir / self.template_file

    def get_output_filename(self, custom_name: Optional[str] = None) -> str:
        """Generate output filename"""
        if custom_name:
            return custom_name

        from datetime import datetime

        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        return f"release_notes_{timestamp}.md"
