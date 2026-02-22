"""
AI client for generating release notes using OpenAI
"""

import json
from typing import Any, Dict, List, Optional

from openai import AsyncOpenAI
from pydantic import BaseModel


class ReleaseNoteSection(BaseModel):
    """Release note section model"""

    category: str
    items: List[str]


class ReleaseNotes(BaseModel):
    """Release notes model"""

    version: Optional[str] = None
    date: str
    summary: str
    sections: List[ReleaseNoteSection]


class AIClient:
    """OpenAI client for release note generation"""

    def __init__(self, api_key: str, model: str = "gpt-4"):
        self.client = AsyncOpenAI(api_key=api_key)
        self.model = model
        self.temperature = 0.3
        self.max_tokens = 2000

    async def generate_release_notes(self, issues: List[Dict[str, Any]], custom_prompt: Optional[str] = None) -> str:
        """Generate release notes from Linear issues"""

        if not issues:
            return "No changes to report in this release."

        # Prepare issue data for AI
        issue_data = self._prepare_issue_data(issues)

        # Use custom prompt or default
        prompt = custom_prompt or self._get_default_prompt()

        # Create the full prompt
        full_prompt = f"""
{prompt}

Here are the Linear issues that were merged:

{issue_data}

Please generate comprehensive release notes in markdown format.
"""

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a technical writer specializing in creating clear, comprehensive release notes for software products.",
                    },
                    {"role": "user", "content": full_prompt},
                ],
                temperature=self.temperature,
                max_tokens=self.max_tokens,
            )

            if response.choices and len(response.choices) > 0:
                message_content = response.choices[0].message.content
                if message_content:
                    return message_content.strip()
                else:
                    return "Unable to generate release notes - empty response from AI"
            else:
                return "Unable to generate release notes - no response from AI"

        except Exception as e:
            raise Exception(f"Failed to generate release notes: {str(e)}")

    def _prepare_issue_data(self, issues: List[Dict[str, Any]]) -> str:
        """Prepare issue data for AI processing"""

        formatted_issues = []

        for issue in issues:
            # Extract key information
            identifier = issue.get("identifier", "Unknown")
            title = issue.get("title", "No title")
            description = issue.get("description") or "No description"

            # Extract labels
            labels = []
            labels_data = issue.get("labels")
            if labels_data:
                if isinstance(labels_data, dict) and "nodes" in labels_data:
                    for label_node in labels_data["nodes"]:
                        if label_node and label_node.get("name"):
                            labels.append(label_node.get("name", ""))
                elif isinstance(labels_data, list):
                    for label_node in labels_data:
                        if label_node and label_node.get("name"):
                            labels.append(label_node.get("name", ""))

            # Format issue
            issue_text = f"""
**{identifier}**: {title}
Labels: {', '.join(labels) if labels else 'None'}
Description: {description[:500]}{'...' if len(description or '') > 500 else ''}
"""
            formatted_issues.append(issue_text)

        return "\n".join(formatted_issues)

    def _get_default_prompt(self) -> str:
        """Get default prompt for release note generation"""

        return """
Create professional release notes from the provided Linear issues. Follow these guidelines:

1. **Structure**: Organize changes into logical categories (Features, Bug Fixes, Improvements, etc.)
2. **Conciseness**: Keep each description to 1-2 sentences maximum. Be brief and direct.
3. **Clarity**: Write clear, user-friendly descriptions that explain the impact of each change
4. **Grouping**: Group related changes together and avoid duplication
5. **Labels**: Use the issue labels to help categorize changes appropriately
6. **Format**: Use markdown formatting with proper headers and bullet points

Categories to consider:
- 🚀 **New Features**: New functionality added
- 🐛 **Bug Fixes**: Issues resolved and bugs fixed
- ⚡ **Improvements**: Performance improvements and enhancements
- 🔧 **Technical**: Infrastructure, refactoring, and technical improvements
- 📚 **Documentation**: Documentation updates and additions
- 🔒 **Security**: Security-related changes

For each change:
- Start with the issue identifier (e.g., ABC-123)
- Provide a clear, concise description (1-2 sentences MAX)
- Focus on user impact rather than technical implementation details
- Use action-oriented language (Added, Fixed, Improved, etc.)
- Avoid lengthy explanations - keep it brief and impactful

Example format:
```markdown
# Release Notes - [Date]

## 🚀 New Features
- **ABC-123**: Added user dashboard with real-time analytics
- **ABC-124**: Implemented advanced search with filters

## 🐛 Bug Fixes
- **ABC-125**: Fixed login session timeouts
- **ABC-126**: Resolved data sync issues

## ⚡ Improvements
- **ABC-127**: Improved page load times by 40%
- **ABC-128**: Enhanced mobile responsiveness
```

**IMPORTANT**: Keep all descriptions short and concise. Avoid long explanations. Each item should be 1-2 sentences maximum.
"""

    async def generate_structured_release_notes(self, issues: List[Dict[str, Any]]) -> ReleaseNotes:
        """Generate structured release notes as a Pydantic model"""

        from datetime import datetime

        # Generate markdown release notes
        markdown_notes = await self.generate_release_notes(issues)

        # For now, return a basic structured version
        # In the future, you could use AI to parse the markdown into structured data
        return ReleaseNotes(
            date=datetime.now().strftime("%Y-%m-%d"),
            summary=f"Release containing {len(issues)} changes",
            sections=[
                ReleaseNoteSection(
                    category="Changes",
                    items=[f"{issue.get('identifier', '')}: {issue.get('title', '')}" for issue in issues],
                )
            ],
        )

    async def summarize_changes(self, issues: List[Dict[str, Any]]) -> str:
        """Generate a brief summary of changes"""

        if not issues:
            return "No changes in this release."

        issue_titles = [issue.get("title", "") for issue in issues[:10]]  # Limit to first 10

        prompt = f"""
Provide a brief 2-3 sentence summary of the following changes:

{chr(10).join(f"- {title}" for title in issue_titles)}

Focus on the main themes and overall impact of these changes.
"""

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a technical writer creating concise summaries of software changes.",
                    },
                    {"role": "user", "content": prompt},
                ],
                temperature=0.3,
                max_tokens=200,
            )

            return response.choices[0].message.content.strip()

        except Exception as e:
            return f"Summary of {len(issues)} changes including bug fixes, new features, and improvements."
