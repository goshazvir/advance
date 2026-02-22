"""
Linear API client for GraphQL integration
"""

import asyncio
from typing import List, Dict, Any, Optional

import httpx
from pydantic import BaseModel


class LinearIssue(BaseModel):
    """Linear issue model"""

    id: str
    identifier: str
    title: str
    description: Optional[str] = None
    state: Dict[str, Any]
    labels: List[Dict[str, Any]] = []
    assignee: Optional[Dict[str, Any]] = None
    team: Dict[str, Any]
    created_at: str
    updated_at: str


class LinearClient:
    """Linear API GraphQL client"""

    def __init__(self, api_key: str, team_id: str):
        self.api_key = api_key
        self.team_id = team_id
        self.api_url = "https://api.linear.app/graphql"
        self.headers = {"Authorization": api_key, "Content-Type": "application/json"}

    async def _make_request(
        self, query: str, variables: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """Make GraphQL request to Linear API"""

        payload = {"query": query, "variables": variables or {}}

        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.api_url, json=payload, headers=self.headers, timeout=30.0
            )

            if response.status_code != 200:
                raise Exception(
                    f"Linear API request failed: {response.status_code} - {response.text}"
                )

            data = response.json()

            if "errors" in data:
                raise Exception(f"Linear API GraphQL errors: {data['errors']}")

            return data.get("data", {})

    async def get_issues_by_status(self, status: str) -> List[Dict[str, Any]]:
        """Get all issues by status"""

        query = """
        query GetIssuesByStatus($teamId: String!, $statusName: String!) {
            team(id: $teamId) {
                issues(
                    filter: {
                        state: { name: { eq: $statusName } }
                    }
                    orderBy: updatedAt
                ) {
                    nodes {
                        id
                        identifier
                        title
                        description
                        state {
                            id
                            name
                            type
                        }
                        labels {
                            nodes {
                                id
                                name
                                color
                            }
                        }
                        assignee {
                            id
                            name
                            email
                        }
                        team {
                            id
                            name
                        }
                        createdAt
                        updatedAt
                    }
                }
            }
        }
        """

        variables = {"teamId": self.team_id, "statusName": status}

        data = await self._make_request(query, variables)

        if not data.get("team"):
            raise Exception(f"Team with ID {self.team_id} not found")

        issues = data["team"]["issues"]["nodes"]
        return issues

    async def get_merged_issues(self) -> List[Dict[str, Any]]:
        """Get all issues with 'merged' status"""
        return await self.get_issues_by_status("Merged")

    async def get_production_ready_issues(self) -> List[Dict[str, Any]]:
        """Get all issues ready for production deployment (Deployed to Staging + Tested in Staging)"""
        deployed_to_staging = await self.get_issues_by_status("Deployed to Staging")
        tested_in_staging = await self.get_issues_by_status("Tested in Staging")

        # Combine both lists, avoiding duplicates by id
        seen_ids = set()
        combined = []

        for issue in deployed_to_staging + tested_in_staging:
            if issue["id"] not in seen_ids:
                seen_ids.add(issue["id"])
                combined.append(issue)

        return combined

    async def update_issue_status(self, issue_id: str, status_name: str) -> bool:
        """Update issue status"""

        # First, get the status ID by name
        status_id = await self._get_status_id_by_name(status_name)

        if not status_id:
            raise Exception(f"Status '{status_name}' not found")

        query = """
        mutation UpdateIssue($issueId: String!, $stateId: String!) {
            issueUpdate(
                id: $issueId
                input: {
                    stateId: $stateId
                }
            ) {
                success
                issue {
                    id
                    identifier
                    state {
                        name
                    }
                }
            }
        }
        """

        variables = {"issueId": issue_id, "stateId": status_id}

        data = await self._make_request(query, variables)

        return data.get("issueUpdate", {}).get("success", False)

    async def _get_status_id_by_name(self, status_name: str) -> Optional[str]:
        """Get status ID by name"""

        query = """
        query GetTeamStates($teamId: String!) {
            team(id: $teamId) {
                states {
                    nodes {
                        id
                        name
                        type
                    }
                }
            }
        }
        """

        variables = {"teamId": self.team_id}

        data = await self._make_request(query, variables)

        if not data.get("team"):
            return None

        states = data["team"]["states"]["nodes"]

        for state in states:
            if state["name"].lower() == status_name.lower():
                return state["id"]

        return None

    async def bulk_update_issue_statuses(
        self, issue_ids: List[str], status_name: str
    ) -> int:
        """Update multiple issues to the same status"""

        updated_count = 0

        # Use semaphore to limit concurrent requests
        semaphore = asyncio.Semaphore(5)

        async def update_single_issue(issue_id: str) -> bool:
            async with semaphore:
                try:
                    success = await self.update_issue_status(issue_id, status_name)
                    if success:
                        return True
                except Exception as e:
                    print(f"Failed to update issue {issue_id}: {e}")
                    return False
                return False

        # Execute updates concurrently
        tasks = [update_single_issue(issue_id) for issue_id in issue_ids]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        # Count successful updates
        for result in results:
            if result is True:
                updated_count += 1

        return updated_count

    async def test_connection(self) -> bool:
        """Test Linear API connection"""

        query = """
        query TestConnection {
            viewer {
                id
                name
                email
            }
        }
        """

        try:
            data = await self._make_request(query)
            return "viewer" in data and data["viewer"] is not None
        except Exception:
            return False
