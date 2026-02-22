# Tasks: Account Drawer

**Input**: Design documents from `/specs/001-account-drawer/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: No test framework configured. Validation is `yarn lint && yarn ts` + manual verification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Domain types and query key registration needed by all subsequent phases

- [x] T001 [P] Create Transaction interface with TransactionDirection and TransactionStatus enums in `src/domain/Transaction.ts` — fields: transaction_id, merchant, amount, direction (credit|debit), created_at, account_id, status (pending|approved), extra_data, user_created, account_name (see data-model.md)
- [x] T002 [P] Add ACCOUNT and ACCOUNT_TRANSACTIONS entries to QueryClientIds enum in `src/QueryClient/queryClient.ids.ts` — values: `fetch_account` and `fetch_account_transactions`

---

## Phase 2: Foundational — API Integration (US5, Priority: P1)

**Purpose**: Two-hop API proxy routes + flexxApiService methods + React Query hooks. MUST be complete before any UI work.

**⚠️ CRITICAL**: No user story UI work can begin until this phase is complete

- [x] T003 [P] Create Next.js API route handler for GET account detail in `src/app/api/pages/accounts/[accountId]/route.ts` — extract `accountId` from route params, proxy to backend `GET /account/{account_id}` via `flexxNextApiService().get()`, set `dynamic = 'force-dynamic'` (follow pattern in `src/app/api/pages/accounts/route.ts`)
- [x] T004 [P] Create Next.js API route handler for GET account transactions in `src/app/api/pages/accounts/[accountId]/transactions/route.ts` — extract `accountId` from route params, forward `search_term` query param, proxy to backend `GET /account/{account_id}/transactions` via `flexxNextApiService().get()`, set `dynamic = 'force-dynamic'`
- [x] T005 Add `fetchAccount(accountId: string): Promise<Account>` and `fetchAccountTransactions(accountId: string, params?: {search_term?: string}): Promise<Transaction[]>` methods to FlexxApiService class in `src/flexxApi/flexxApiService.ts` — fetchAccount calls `get({endpoint: \`pages/accounts/${accountId}\`})`, fetchAccountTransactions calls `get({endpoint: \`pages/accounts/${accountId}/transactions?${queryParams}\`})`
- [x] T006 [P] Create `useFetchAccount` React Query hook in `src/hooks/useFetchAccount.tsx` — import from `'react-query'`, use `[QueryClientIds.ACCOUNT, accountId]` as query key, call `flexxApiService().fetchAccount(accountId)`, set `enabled: !!accountId`, return `{data, isLoading, isError}`
- [x] T007 [P] Create `useFetchAccountTransactions` React Query hook in `src/hooks/useFetchAccountTransactions.tsx` — import from `'react-query'`, use `[QueryClientIds.ACCOUNT_TRANSACTIONS, accountId]` as query key, call `flexxApiService().fetchAccountTransactions(accountId)`, set `enabled: !!accountId`, return `{data, isLoading, isError}`

**Checkpoint**: API layer complete. Verify with browser devtools: `fetch('/api/pages/accounts/{id}')` and `fetch('/api/pages/accounts/{id}/transactions')` return correct data.

---

## Phase 3: User Story 1 — View Account Details (Priority: P1) 🎯 MVP

**Goal**: Clicking an account row opens a right-side drawer showing account name, status badge, bank name, masked account number (with eye toggle), routing number, and formatted balance. Includes "Move Money" button in header (US4). Accounts table stays visible on left.

**Independent Test**: Click any account row → drawer opens with correct account details displayed.

### Implementation for User Story 1

- [x] T008 [P] [US1] Create `AccountDrawerHeader` component in `src/views/accounts/components/AccountDrawerHeader.tsx` — receives Account data as prop. Display: account name + status badge (open/closed/invalid using chip/tag), bank name below, masked account number using `AdvanceAccountNumberDisplay` with eye toggle, routing number, balance formatted with `AdvanceCurrencyText` (superscript cents). Include "Move Money" button (styled per screenshot: outlined button with icon). Match layout from img.png/img_1.png reference screenshots. Add `'use client'` directive.
- [x] T009 [P] [US1] Create `useAccountDrawer` hook in `src/views/accounts/hooks/useAccountDrawer.tsx` — manage `selectedAccountId` state (string | null) via `useState`, use `useBoolean` for drawer open/close, expose `openDrawer(accountId: string)` (sets ID + opens), `closeDrawer()` (closes + clears ID), and a portal-rendered `AccountDrawerPortal` JSX via `useMemo` + `ReactDOM.createPortal` to `document.body`. DrawerWrapper config: `drawerWidth='lg'`, `anchor='right'`, close action in `actions` array. Follow `useCreateAccount` hook pattern.
- [x] T010 [US1] Create `AccountDrawer` component in `src/views/accounts/components/AccountDrawer.tsx` — receives `accountId` prop, calls `useFetchAccount(accountId)` for account data. Renders `AccountDrawerHeader` with account data. Shows `AdvanceLoaderCenter` while loading. Handles error state. Add `'use client'` directive. (Transactions table will be added in Phase 4)
- [x] T011 [US1] Modify `AccountsDashboardTable` in `src/views/accounts/components/AccountsDashboardTable.tsx` — import and call `useAccountDrawer()` hook. Add `onClick` handler to each FlexxTableRow that calls `openDrawer(account.account_id)`. Render the `AccountDrawerPortal` returned by the hook. When a different row is clicked while drawer is open, the selectedAccountId state change triggers React Query refetch automatically (satisfies US3 acceptance scenario 2).

**Checkpoint**: Click any account row → drawer opens with account details. Click X → drawer closes. Click different row → drawer updates. Move Money button visible.

---

## Phase 4: User Story 2 — View Account Transactions (Priority: P1)

**Goal**: The drawer shows a paginated transactions table below the account header with columns: Date, Merchant, Amount, Direction, Status.

**Independent Test**: Open drawer for any account → transactions table loads with correct columns, formatted data, and pagination.

### Implementation for User Story 2

- [x] T012 [P] [US2] Create `useAccountDrawerTransactionsTable` hook in `src/views/accounts/hooks/useAccountDrawerTransactionsTable.tsx` — define `FlexxColumn[]` with 5 columns: Date (`dateFormat: 'md'`, field mapped from `created_at`), Merchant (string), Amount (`currency: true`, `showCents: true`), Direction (string, values: 'debit'/'credit'), Status (string, values: 'approved'/'pending'). Transform `Transaction[]` to `FlexxTableRow[]` via `useMemo`. Follow `useAccountsDashboardTable` hook pattern.
- [x] T013 [US2] Integrate transactions table into `AccountDrawer` component in `src/views/accounts/components/AccountDrawer.tsx` — call `useFetchAccountTransactions(accountId)` for transaction data, call `useAccountDrawerTransactionsTable(transactions)` for columns/rows. Add `FlexxTable` below `AccountDrawerHeader` with: `columns`, `rows`, `isLoading`, `isError`, `customRowsPerPage={10}`, `emptyState="No transactions"`. Loading/error states for transactions are independent from account header (FR-020).

**Checkpoint**: Open drawer → header shows account details AND transactions table shows below with pagination. Empty account shows "No transactions" message.

---

## Phase 5: User Story 3 — Close and Switch Accounts (Priority: P2)

**Goal**: User can close the drawer via X button and switch between accounts by clicking different rows.

**Independent Test**: Open drawer → click X → drawer closes. Open drawer for Account A → click Account B row → drawer updates to Account B.

### Implementation for User Story 3

- [x] T014 [US3] Verify and refine close/switch behavior in `src/views/accounts/hooks/useAccountDrawer.tsx` — ensure `closeDrawer` clears `selectedAccountId` to null (prevents stale data on reopen). Ensure clicking a new row while drawer is open calls `openDrawer(newAccountId)` which updates state and triggers React Query refetch for both account and transactions queries. Handle rapid clicks gracefully (React Query's `enabled: !!accountId` and key-based caching prevents race conditions).

**Checkpoint**: Close via X works. Rapid switching between accounts shows correct data each time.

---

## Phase 6: User Story 4 — Move Money Button (Priority: P2)

**Goal**: "Move Money" button is present and correctly positioned in the drawer header.

**Independent Test**: Open any account drawer → "Move Money" button visible in header area.

### Implementation for User Story 4

- [x] T015 [US4] Verify Move Money button in `AccountDrawerHeader` in `src/views/accounts/components/AccountDrawerHeader.tsx` — button should be styled as outlined/secondary button with transfer icon, positioned per img.png screenshot (top-right of header area). Button is non-functional for this feature (no onClick handler beyond placeholder). Ensure it renders correctly for all account statuses.

**Checkpoint**: Move Money button visible in header for all accounts.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validation and quality assurance across all phases

- [x] T016 Run `yarn lint` and `yarn ts` — fix any ESLint errors (no-console, no-explicit-any, unused-imports, import order) and TypeScript type errors across all new/modified files
- [x] T017 Run quickstart.md manual validation checklist — verify all 6 checks: (1) click row → drawer opens, (2) transactions table with pagination, (3) masked account number + eye toggle, (4) click different row → drawer updates, (5) click X → drawer closes, (6) Move Money button visible

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 (T001 for Transaction type, T002 for query keys)
- **US1 (Phase 3)**: Depends on Phase 2 (needs API hooks)
- **US2 (Phase 4)**: Depends on Phase 2 (needs transaction API hook) + Phase 3 (needs AccountDrawer component to integrate into)
- **US3 (Phase 5)**: Depends on Phase 3 (needs working drawer to verify close/switch)
- **US4 (Phase 6)**: Depends on Phase 3 (needs AccountDrawerHeader to verify button)
- **Polish (Phase 7)**: Depends on all previous phases

### User Story Dependencies

- **US5 (API Integration)**: Foundational — blocks US1 and US2
- **US1 (View Account Details)**: Depends on US5 only — core MVP
- **US2 (View Account Transactions)**: Depends on US5 + US1 (needs AccountDrawer to exist)
- **US3 (Close/Switch)**: Behavior implemented in US1, this phase verifies/refines
- **US4 (Move Money Button)**: UI implemented in US1, this phase verifies

### Within Each User Story

- API routes (T003, T004) can be created in parallel
- Service methods (T005) depend on route structure being defined
- React Query hooks (T006, T007) depend on service methods (T005) and query keys (T002)
- UI components depend on hooks being available

### Parallel Opportunities

**Phase 1**: T001 and T002 in parallel (different files)
**Phase 2**: T003 and T004 in parallel (different files). After T005: T006 and T007 in parallel.
**Phase 3**: T008 and T009 in parallel (different files). Then T010 (depends on both). Then T011.
**Phase 4**: T012 can start as soon as Phase 2 is done (independent hook). T013 depends on T010 + T012.
**Phase 5-6**: T014 and T015 can run in parallel (different files).

---

## Parallel Example: Phases 1-2

```bash
# Phase 1 — both in parallel:
Task: "T001 — Create Transaction types in src/domain/Transaction.ts"
Task: "T002 — Add query keys in src/QueryClient/queryClient.ids.ts"

# Phase 2 — API routes in parallel:
Task: "T003 — Create account detail API route"
Task: "T004 — Create account transactions API route"

# Phase 2 — after T005, hooks in parallel:
Task: "T006 — Create useFetchAccount hook"
Task: "T007 — Create useFetchAccountTransactions hook"
```

## Parallel Example: Phase 3

```bash
# Header and drawer hook in parallel:
Task: "T008 — Create AccountDrawerHeader component"
Task: "T009 — Create useAccountDrawer hook"

# Then sequentially:
Task: "T010 — Create AccountDrawer (depends on T008 + T009)"
Task: "T011 — Modify AccountsDashboardTable (depends on T010)"
```

---

## Implementation Strategy

### MVP First (US1 Only — Phases 1-3)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: API Integration (T003-T007)
3. Complete Phase 3: US1 — View Account Details (T008-T011)
4. **STOP and VALIDATE**: Click account row → drawer opens with details
5. This delivers a working drawer with account details — usable without transactions

### Full Delivery (All Stories — Phases 1-7)

1. Phases 1-3 → MVP drawer with account details
2. Phase 4 → Add transactions table
3. Phases 5-6 → Verify close/switch + Move Money button polish
4. Phase 7 → Lint, type-check, full manual validation
5. Each phase adds value without breaking previous work

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US3 (close/switch) and US4 (Move Money button) are largely implemented as part of US1 — their phases are for verification and refinement
- No test framework configured — validation is `yarn lint && yarn ts` + manual testing
- Commit after each phase completion
- All React Query hooks use composite keys `[QueryClientIds.KEY, accountId]` for per-account cache separation
- Account and transaction fetching are independent (FR-020) — separate hooks, separate error states
