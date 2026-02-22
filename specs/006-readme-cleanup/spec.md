# Feature Specification: Project README & Cleanup

**Feature Branch**: `006-readme-cleanup`
**Created**: 2026-02-22
**Status**: Draft
**Input**: User description: "Prepare the project for production-ready presentation by cleaning up internal artifacts and creating a professional README.md"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Professional README for New Developers (Priority: P1)

A new developer discovers the Advance project (via GitHub or the live demo link). They open the repository and read the README to understand what the application does, how it's structured, and how to get it running locally. The README should give them a clear picture of the project's pages, user flows, architecture, and where to find detailed feature specifications.

**Why this priority**: The README is the first thing anyone sees when they visit the repository. A professional, informative README establishes credibility and provides essential onboarding information.

**Independent Test**: Can be tested by having someone unfamiliar with the project read the README and answer: "What does this app do?", "What pages exist?", "How do I run it?", "Where is the architecture documented?"

**Acceptance Scenarios**:

1. **Given** a visitor opens the repository, **When** they read the README, **Then** they understand the application purpose, see the live demo link, and know how to run it locally
2. **Given** a developer wants to understand the codebase, **When** they read the README, **Then** they can identify the tech stack, folder structure, available pages, and where feature specs live
3. **Given** a developer reads the README, **When** they look for feature documentation, **Then** they find a reference to the `specs/` directory with brief descriptions of each feature folder

---

### User Story 2 - Remove Internal Reference Artifacts (Priority: P1)

The project repository currently contains internal reference screenshots (img.png, img_1.png, img_2.png, img_3.png, img_4.png) in the root directory. These are internal development artifacts that should not be present in a production-ready repository. They should be deleted, and no references to them should remain in the README.

**Why this priority**: Equally critical as the README — internal artifacts in the repo undermine professionalism and may expose internal processes.

**Independent Test**: Can be verified by checking that no `img*.png` files exist in the root directory and no references to them appear in any tracked files.

**Acceptance Scenarios**:

1. **Given** the repository root, **When** a user lists files, **Then** no `img.png`, `img_1.png`, `img_2.png`, `img_3.png`, or `img_4.png` files are present
2. **Given** the README.md, **When** a user reads it, **Then** there are no `![img...](img...)` image references or broken image links

---

### User Story 3 - Clean Professional Tone (Priority: P2)

The README and any visible repository content should read as a professional project overview. There should be no language suggesting this is an assignment, evaluation, homework, or challenge. The tone should be that of a real production application.

**Why this priority**: Professional presentation is important but secondary to having correct content and no internal artifacts.

**Independent Test**: Can be verified by searching the entire repository for terms like "interview", "assignment", "task", "evaluated", "test", "homework", "challenge" and confirming none appear in user-facing documentation.

**Acceptance Scenarios**:

1. **Given** the README.md content, **When** searched for assignment-related terminology, **Then** no matches are found for words like "interview", "assignment", "task evaluating", "evaluated", "homework", "challenge"
2. **Given** the entire repository, **When** scanned for internal process language in user-facing files, **Then** the CLAUDE.md (internal dev tooling) is excluded from this check, but README.md and other visible docs are clean

---

### Edge Cases

- What if the specs/ directory structure contains assignment-related language in spec files? — Spec files are development documentation and acceptable as-is; only the README needs cleanup
- What if removing images breaks other references? — Verify no other files besides the old README reference these images
- What if the CLAUDE.md references images? — CLAUDE.md is internal tooling and not visible to casual repo visitors; leave as-is

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All root-level screenshot files (`img.png`, `img_1.png`, `img_2.png`, `img_3.png`, `img_4.png`) MUST be deleted from the repository
- **FR-002**: README.md MUST be completely rewritten with a professional project overview
- **FR-003**: README MUST include a live demo link to `https://advance-orpin.vercel.app/home`
- **FR-004**: README MUST include a "Pages & User Flows" section describing each page:
  - **Home** (`/home`): Portfolio overview dashboard with financial summary widgets
  - **Accounts** (`/accounts`): Accounts list with search, "Add Account" and "Move Money" actions. Clicking a row opens account detail drawer with transactions
  - **Transactions** (`/transactions`): Global transactions table with search, sorting, and pagination
- **FR-005**: README MUST include an "Architecture & Project Structure" section covering tech stack and folder layout
- **FR-006**: README MUST include a reference to the `specs/` directory with 1-2 line descriptions for each feature folder:
  - `001-account-drawer` — Account detail drawer with transactions
  - `002-create-account` — Account creation flow
  - `003-move-money` — Money transfer between accounts
  - `004-transactions-dashboard` — Global transactions view
  - `005-home-dashboard` — Home dashboard with portfolio overview
- **FR-007**: README MUST include "Getting Started" instructions (prerequisites, install, dev server)
- **FR-008**: README MUST NOT contain any language indicating an interview assignment, test, or evaluation
- **FR-009**: README MUST be concise — not overly long, focused on essential information
- **FR-010**: CLAUDE.md MUST remain unchanged (internal development tooling)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new visitor can understand the application's purpose and navigate to the live demo within 30 seconds of reading the README
- **SC-002**: A developer can set up and run the project locally by following README instructions alone
- **SC-003**: Zero internal reference screenshots remain in the repository root
- **SC-004**: Zero assignment-related terminology appears in user-facing documentation (README.md)
- **SC-005**: All five feature spec folders are referenced with brief descriptions in the README
- **SC-006**: The README fits within approximately 80-120 lines — concise enough to be read in under 3 minutes
