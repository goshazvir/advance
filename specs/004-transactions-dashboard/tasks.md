# Tasks: Transactions Dashboard

**Input**: Design documents from `/specs/004-transactions-dashboard/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: API layer and query key registration needed by all user stories

- [x] T001 Add `TRANSACTIONS = 'fetch_transactions'` to QueryClientIds enum in `src/QueryClient/queryClient.ids.ts`
- [x] T002 [P] Add `fetchTransactions(params?: {search_term?: string})` method to `src/flexxApi/flexxApiService.ts` — follow existing `fetchAccountTransactions` pattern, call endpoint `pages/transactions`
- [x] T003 [P] Create API proxy route at `src/app/api/pages/transactions/route.ts` — proxy GET requests to backend `GET /transaction`, forward `search_term` and `account_id` query params. Follow existing accounts route pattern

**Checkpoint**: API layer complete — `flexxApiService().fetchTransactions()` works end-to-end through the two-hop proxy

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Navigation and page routing that MUST exist before any UI can be built

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Add "Transactions" menu item to sidebar in `src/components/FlexxLayout/FlexxVerticalLayout/FlexxSideBarMenu/flexxMenuItems.ts` — add after Accounts in TopGroup, use appropriate icon, href `/transactions`
- [x] T005 [P] Create page route at `src/app/(client)/(dashboard)/transactions/page.tsx` — `'use client'` directive, render placeholder with FlexxDashboardWrapper and "Transactions" title (Typography h4, fontWeight 600)

**Checkpoint**: Navigation to `/transactions` works from sidebar, shows page title

---

## Phase 3: User Story 1 — View All Transactions (Priority: P1) MVP

**Goal**: Display all transactions across all accounts in a sortable table with columns: Date, Account, Merchant, Amount, Direction, Status

**Independent Test**: Navigate to /transactions from sidebar → table appears with all transactions, correct columns, proper formatting (superscript cents, date format "Mon DD YYYY"), default sort by Date descending, all columns sortable

### Implementation for User Story 1

- [x] T006 [P] [US1] Create `useFetchTransactions` hook in `src/views/transactions/hooks/useFetchTransactions.tsx` — use `useQuery` from `'react-query'` with `QueryClientIds.TRANSACTIONS` key, call `flexxApiService().fetchTransactions()`, return `{data, isLoading, isError}`
- [x] T007 [P] [US1] Create `useTransactionsDashboardTable` hook in `src/views/transactions/hooks/useTransactionsDashboardTable.tsx` — accept `Transaction[] | undefined`, return `{columns, rows}`. Define FlexxColumn[]: date (`dateFormat: 'md'`, `defaultSort: 'desc'`), account (`account_name`), merchant, amount (`currency: true`, `showCents: true`, `align: 'right'`), direction, status. Map transactions to FlexxTableRow[] via useMemo
- [x] T008 [US1] Create `TransactionsDashboard` component in `src/views/transactions/components/TransactionsDashboard.tsx` — use `useFetchTransactions` + `useTransactionsDashboardTable` hooks, render FlexxTable with columns, rows, isLoading, isError props. Wrap in FlexxDashboardWrapper with "Transactions" title
- [x] T009 [US1] Wire `TransactionsDashboard` into page route — update `src/app/(client)/(dashboard)/transactions/page.tsx` to import and render TransactionsDashboard component instead of placeholder

**Checkpoint**: User Story 1 complete — table shows all transactions with correct formatting, sorting works on all columns, default sort is Date descending

---

## Phase 4: User Story 2 — Search Transactions (Priority: P2)

**Goal**: Add search bar that filters transactions by keyword via server-side `search_term` parameter

**Independent Test**: Type a merchant name in the search bar → table shows only matching transactions. Clear search → all transactions return

### Implementation for User Story 2

- [x] T010 [US2] Update `useFetchTransactions` in `src/views/transactions/hooks/useFetchTransactions.tsx` — accept `searchQuery` parameter, pass as `search_term` to `fetchTransactions()`, include in query key array for automatic refetch on change
- [x] T011 [US2] Integrate search in `TransactionsDashboard` at `src/views/transactions/components/TransactionsDashboard.tsx` — use `useGlobalSearch()` hook for search state, pass `searchQuery` to `useFetchTransactions`, configure FlexxTable `searchBar` prop with `searchTerm` and `onChangeSearchTerm`

**Checkpoint**: User Story 2 complete — search filters transactions server-side, empty search shows all, no-results shows empty state

---

## Phase 5: User Story 3 — Paginate Transactions (Priority: P2)

**Goal**: Table pagination with "Rows per page" selector, default 100 rows per page

**Independent Test**: With many transactions, pagination controls appear at bottom with page navigation and "Rows per page" selector. Changing rows per page re-renders table

### Implementation for User Story 3

- [x] T012 [US3] Configure pagination in `TransactionsDashboard` at `src/views/transactions/components/TransactionsDashboard.tsx` — set `customRowsPerPage={100}` on FlexxTable (pagination is built-in to FlexxTable, this sets the default page size)

**Checkpoint**: User Story 3 complete — pagination works with "Rows per page" selector, default 100

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Lint compliance and final validation

- [x] T013 Run `yarn lint:fix` to auto-fix import order and formatting issues
- [x] T014 Run `npx tsc --noEmit` and verify zero TypeScript errors
- [ ] T015 Visual verification against reference screenshot `img_4.png` — confirm column order, date format, amount format, pagination, search bar placement match the design

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: T004/T005 can run in parallel with Phase 1 (different files), but US phases need both Phase 1 and Phase 2
- **User Story 1 (Phase 3)**: Depends on Phase 1 (API layer) + Phase 2 (page route)
- **User Story 2 (Phase 4)**: Depends on User Story 1 (needs TransactionsDashboard and useFetchTransactions to exist)
- **User Story 3 (Phase 5)**: Depends on User Story 1 (needs TransactionsDashboard to exist). Can run in parallel with User Story 2
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Setup + Foundational — no dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 (modifies files created in US1)
- **User Story 3 (P2)**: Depends on US1 (modifies files created in US1). Independent of US2

### Parallel Opportunities

- T001, T002, T003 can all run in parallel (different files)
- T004, T005 can run in parallel (different files)
- T006, T007 can run in parallel (different files)
- T012 (US3) can run in parallel with T010-T011 (US2) if done by different developers

---

## Parallel Example: Setup + Foundational

```bash
# All setup tasks touch different files — run in parallel:
Task T001: "Add TRANSACTIONS to QueryClientIds in src/QueryClient/queryClient.ids.ts"
Task T002: "Add fetchTransactions to src/flexxApi/flexxApiService.ts"
Task T003: "Create API route at src/app/api/pages/transactions/route.ts"
Task T004: "Add nav item in flexxMenuItems.ts"
Task T005: "Create page route at src/app/(client)/(dashboard)/transactions/page.tsx"
```

## Parallel Example: User Story 1

```bash
# Hooks touch different files — run in parallel:
Task T006: "Create useFetchTransactions in src/views/transactions/hooks/useFetchTransactions.tsx"
Task T007: "Create useTransactionsDashboardTable in src/views/transactions/hooks/useTransactionsDashboardTable.tsx"

# Then sequentially (depends on both hooks):
Task T008: "Create TransactionsDashboard in src/views/transactions/components/TransactionsDashboard.tsx"
Task T009: "Wire into page route"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T005)
3. Complete Phase 3: User Story 1 (T006-T009)
4. **STOP and VALIDATE**: Navigate to /transactions, verify table with all columns, formatting, sorting
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → API + navigation ready
2. Add User Story 1 → Full table view (MVP!)
3. Add User Story 2 → Search integration
4. Add User Story 3 → Pagination config (100 rows default)
5. Polish → Lint, type-check, visual verification

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- FlexxTable provides built-in pagination and sorting — US2/US3 are primarily prop configuration
- No new domain types needed — existing `Transaction` interface is reused
- React Query v3 only — imports from `'react-query'`, NOT `'@tanstack/react-query'`
- Commit after each phase checkpoint
