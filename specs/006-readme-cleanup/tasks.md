# Tasks: Project README & Cleanup

**Input**: Design documents from `/specs/006-readme-cleanup/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Not requested — manual verification only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: User Story 2 - Remove Internal Reference Artifacts (Priority: P1)

**Goal**: Delete all 5 internal reference screenshots from the repository root so no internal artifacts remain.

**Independent Test**: Run `ls img*.png` in root — should return nothing. Run `git status` — images should show as deleted.

### Implementation for User Story 2

- [x] T001 [P] [US2] Delete screenshot file `img.png` from repository root
- [x] T002 [P] [US2] Delete screenshot file `img_1.png` from repository root
- [x] T003 [P] [US2] Delete screenshot file `img_2.png` from repository root
- [x] T004 [P] [US2] Delete screenshot file `img_3.png` from repository root
- [x] T005 [P] [US2] Delete screenshot file `img_4.png` from repository root

**Checkpoint**: Zero `img*.png` files exist in repository root

---

## Phase 2: User Story 1 - Professional README for New Developers (Priority: P1) 🎯 MVP

**Goal**: Rewrite `README.md` as a professional project overview with demo link, pages/flows, architecture, specs reference, and getting started instructions.

**Independent Test**: A new reader can answer: "What does this app do?", "What pages exist?", "How do I run it?", "Where are feature specs?"

### Implementation for User Story 1

- [x] T006 [US1] Rewrite `README.md` with complete professional project overview containing all required sections:
  - Project name ("Advance") and one-line description
  - Live demo link: `https://advance-orpin.vercel.app/home`
  - **Pages & User Flows** section:
    - Home (`/home`): Portfolio overview dashboard with financial summary widgets
    - Accounts (`/accounts`): Accounts list with search, Add Account and Move Money actions; click row to open account detail drawer with transactions
    - Transactions (`/transactions`): Global transactions table with search, sorting, and pagination
  - **Architecture & Project Structure** section: tech stack list + folder structure tree
  - **Feature Specifications** section: reference to `specs/` directory with 1-2 line descriptions per folder:
    - `001-account-drawer` — Account detail drawer with transaction history
    - `002-create-account` — Account creation form and flow
    - `003-move-money` — Money transfer between accounts
    - `004-transactions-dashboard` — Global transactions view
    - `005-home-dashboard` — Home dashboard with portfolio overview
  - **Getting Started** section: prerequisites (Node.js, Yarn), install, dev server commands
  - **Available Commands** table: dev, build, test, lint, format, generate
  - Target: ~80-120 lines, concise and scannable

**Checkpoint**: README.md is complete with all required sections, demo link works, specs referenced

---

## Phase 3: User Story 3 - Clean Professional Tone (Priority: P2)

**Goal**: Verify the README and repository contain zero assignment-related language in user-facing documentation.

**Independent Test**: `grep -i "interview\|assignment\|evaluated\|homework\|challenge\|task evaluating" README.md` returns nothing.

### Implementation for User Story 3

- [x] T007 [US3] Audit `README.md` for assignment-related terminology ("interview", "assignment", "evaluated", "homework", "challenge", "task evaluating", "skills") and remove any found
- [x] T008 [US3] Verify no broken image references remain in `README.md` (no `![img` markdown image syntax pointing to deleted files)

**Checkpoint**: README is clean of assignment language and has no broken references

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final verification across all changes

- [x] T009 Run verification commands from `specs/006-readme-cleanup/quickstart.md` — confirm no `img*.png` files remain, no assignment language in README, project still builds
- [x] T010 Verify `CLAUDE.md` is unchanged (diff against main branch) — only auto-generated agent context line added by speckit workflow

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (US2 — Delete images)**: No dependencies — can start immediately
- **Phase 2 (US1 — Write README)**: Depends on Phase 1 (images must be deleted before writing README that doesn't reference them)
- **Phase 3 (US3 — Clean tone)**: Depends on Phase 2 (README must be written before auditing tone)
- **Phase 4 (Polish)**: Depends on all previous phases

### User Story Dependencies

- **User Story 2 (P1)**: No dependencies — start first
- **User Story 1 (P1)**: Depends on US2 (images deleted before README rewrite)
- **User Story 3 (P2)**: Depends on US1 (README written before tone audit)

### Parallel Opportunities

- All image deletion tasks (T001-T005) can run in parallel — different files, no dependencies
- T007 and T008 can run in parallel — different validation checks on same file

---

## Implementation Strategy

### MVP First (User Story 2 + User Story 1)

1. Delete all images (Phase 1, T001-T005) — parallel execution
2. Write complete README (Phase 2, T006)
3. **STOP and VALIDATE**: README is professional, complete, no broken refs
4. Audit tone (Phase 3, T007-T008)
5. Final verification (Phase 4, T009-T010)

### Single Developer Flow

All phases are sequential for a single developer. Total: 10 tasks, estimated ~15 minutes of work.

---

## Notes

- [P] tasks = different files, no dependencies
- This is a documentation-only feature — no source code changes
- CLAUDE.md must remain unchanged per FR-010
- README target length: ~80-120 lines
- Commit after each phase for clean git history
