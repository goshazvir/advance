# Tasks: Home Dashboard Redesign

**Input**: Design documents from `specs/005-home-dashboard/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: No test framework configured. Validation via `yarn test` (ESLint + TypeScript type-check).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create feature directory structure and domain type definitions

- [x] T001 Create feature directory structure: `src/views/flexx-apps/home/components/`, `src/views/flexx-apps/home/hooks/`, `src/views/flexx-apps/home/domain/`
- [x] T002 Define domain interfaces (BankSummary, AccountStatusSummary, TransactionDirectionSummary, PortfolioOverview) in `src/views/flexx-apps/home/domain/HomeDashboard.ts` per data-model.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Data aggregation hook and dashboard shell that ALL widgets depend on

**CRITICAL**: No widget implementation can begin until this phase is complete

- [x] T003 Create `useHomeDashboardData` hook in `src/views/flexx-apps/home/hooks/useHomeDashboardData.ts` — calls `useFetchAccounts()` and `useFetchTransactions()`, computes all derived data (portfolioOverview, topBanksByAccounts, topBanksByFunds, recentTransactions, accountStatusSummary, transactionVolumeSummary) using `useMemo`, exposes `isLoading` object with separate `accounts` and `transactions` booleans per research.md R-001 and R-006
- [x] T004 Create `HomeDashboard` shell component in `src/views/flexx-apps/home/components/HomeDashboard.tsx` — uses `FlexxDashboardWrapper`, displays "Dashboard" title (FR-014), calls `useHomeDashboardData`, renders responsive CSS Grid layout via MUI `Box` with `sx` prop (`gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}`) per research.md R-002, renders placeholder slots for each widget
- [x] T005 Update `src/app/(client)/(dashboard)/home/page.tsx` — replace all static content with `HomeDashboard` component import, keep `'use client'` directive

**Checkpoint**: Home page renders with "Dashboard" title and empty grid layout. Data fetching works.

---

## Phase 3: User Story 1 — Portfolio Overview at a Glance (Priority: P1) MVP

**Goal**: Display a hero widget with total balance, total account count, and total transaction count

**Independent Test**: Navigate to `/home` and verify hero section shows correct aggregated totals matching sum of all account balances, account count, and transaction count

### Implementation for User Story 1

- [x] T006 [US1] Create `PortfolioOverviewWidget` in `src/views/flexx-apps/home/components/PortfolioOverviewWidget.tsx` — accepts `portfolioOverview: PortfolioOverview`, `isLoading: boolean` props. Renders MUI `Card` + `CardContent` spanning full grid width (`gridColumn: '1 / -1'`). Shows total balance using `AdvanceCurrencyText` with large variant, total accounts and total transactions as secondary metrics. Shows `Skeleton` placeholders when loading. Shows $0.00 / 0 / 0 when data is empty (FR-002, FR-008, FR-010, FR-013)
- [x] T007 [US1] Wire `PortfolioOverviewWidget` into `HomeDashboard` in `src/views/flexx-apps/home/components/HomeDashboard.tsx` — pass `portfolioOverview` and `isLoading.accounts || isLoading.transactions` from `useHomeDashboardData`

**Checkpoint**: MVP complete — `/home` shows total balance, account count, and transaction count with loading skeletons

---

## Phase 4: User Story 2 — Top Banks by Number of Accounts (Priority: P2)

**Goal**: Display ranked widget of top 3 banks by account count with bank name, icon, and count

**Independent Test**: Verify widget groups accounts by bank name, counts them, sorts descending, shows top 3 with correct names, icons, and counts

### Implementation for User Story 2

- [x] T008 [P] [US2] Create `TopBanksByAccountsWidget` in `src/views/flexx-apps/home/components/TopBanksByAccountsWidget.tsx` — accepts `banks: BankSummary[]`, `isLoading: boolean` props. Renders MUI `Card` with title "Top Banks by Accounts". Lists up to 3 entries with ranking indicator (1st/2nd/3rd), bank icon (with fallback for empty `bank_icon`), bank name, and account count. Shows `Skeleton` when loading. Shows empty message when no data (FR-003, FR-008, FR-010)
- [x] T009 [US2] Wire `TopBanksByAccountsWidget` into `HomeDashboard` in `src/views/flexx-apps/home/components/HomeDashboard.tsx` — pass `topBanksByAccounts` and `isLoading.accounts` from `useHomeDashboardData`

**Checkpoint**: Dashboard shows portfolio overview + top banks by accounts

---

## Phase 5: User Story 3 — Top Banks by Total Funds (Priority: P2)

**Goal**: Display ranked widget of top 3 banks by total balance with bank name, formatted total, and account count

**Independent Test**: Verify widget sums balances per bank, sorts descending, shows top 3 with correct currency totals

### Implementation for User Story 3

- [x] T010 [P] [US3] Create `TopBanksByFundsWidget` in `src/views/flexx-apps/home/components/TopBanksByFundsWidget.tsx` — accepts `banks: BankSummary[]`, `isLoading: boolean` props. Renders MUI `Card` with title "Top Banks by Funds". Lists up to 3 entries with ranking indicator, bank name, total balance via `AdvanceCurrencyText`, and contributing account count. Shows `Skeleton` when loading (FR-004, FR-008, FR-013)
- [x] T011 [US3] Wire `TopBanksByFundsWidget` into `HomeDashboard` in `src/views/flexx-apps/home/components/HomeDashboard.tsx` — pass `topBanksByFunds` and `isLoading.accounts` from `useHomeDashboardData`

**Checkpoint**: Dashboard shows portfolio + both bank ranking widgets

---

## Phase 6: User Story 4 — Recent Transactions (Priority: P2)

**Goal**: Display 5 most recent transactions with clickable rows that navigate to account drawer

**Independent Test**: Verify widget shows 5 most recent transactions sorted by date descending. Click a row to navigate to `/accounts?accountId=xxx` and auto-open the drawer

### Implementation for User Story 4

- [x] T012 [P] [US4] Create `RecentTransactionsWidget` in `src/views/flexx-apps/home/components/RecentTransactionsWidget.tsx` — accepts `transactions: Transaction[]`, `isLoading: boolean` props. Renders MUI `Card` with title "Recent Transactions". Uses `FlexxTable` with columns: Date (`dateFormat: 'sm'`), Account (`account_name`), Merchant, Amount (`currency: true`), Direction (with `decorator` for credit/debit colors), Status (with `decorator`). Rows have `onClick` using `useRouter().push('/accounts?accountId=...')`. Shows empty state "No transactions yet" when no data. Pagination disabled (`disablePagination: true`). Shows skeleton when loading (FR-005, FR-008, FR-010, FR-011, FR-013)
- [x] T013 [US4] Modify `src/app/(client)/(dashboard)/accounts/page.tsx` — read `accountId` from URL search params via `useSearchParams()`. If present, call `openAccountDrawer(accountId)` on mount via `useEffect` to auto-open the drawer (FR-011, research.md R-005)
- [x] T014 [US4] Wire `RecentTransactionsWidget` into `HomeDashboard` in `src/views/flexx-apps/home/components/HomeDashboard.tsx` — pass `recentTransactions` and `isLoading.transactions` from `useHomeDashboardData`. Span full grid width (`gridColumn: '1 / -1'`)

**Checkpoint**: Dashboard shows all P1+P2 widgets. Transaction click navigates to accounts page and opens drawer

---

## Phase 7: User Story 5 — Account Status Summary (Priority: P3)

**Goal**: Display account counts grouped by status (Open, Closed, Invalid) with colored indicators

**Independent Test**: Verify widget shows correct count for each status with matching color codes (success/error/warning)

### Implementation for User Story 5

- [x] T015 [P] [US5] Create `AccountStatusWidget` in `src/views/flexx-apps/home/components/AccountStatusWidget.tsx` — accepts `statusSummary: AccountStatusSummary`, `isLoading: boolean` props. Renders MUI `Card` with title "Account Status". Shows three status rows with MUI `Chip` using `statusColorMap` pattern from AccountDrawerHeader (open→success, closed→error, invalid→warning). Shows total account count. Shows `Skeleton` when loading (FR-006, FR-008, research.md R-008)
- [x] T016 [US5] Wire `AccountStatusWidget` into `HomeDashboard` in `src/views/flexx-apps/home/components/HomeDashboard.tsx` — pass `accountStatusSummary` and `isLoading.accounts` from `useHomeDashboardData`

**Checkpoint**: Dashboard shows portfolio + banks + transactions + account status

---

## Phase 8: User Story 6 — Transaction Volume by Direction (Priority: P3)

**Goal**: Display credit vs debit transaction summary: total amounts and counts for each direction

**Independent Test**: Verify widget shows correct credit/debit totals and counts with visual distinction (green for credit, red for debit)

### Implementation for User Story 6

- [x] T017 [P] [US6] Create `TransactionVolumeWidget` in `src/views/flexx-apps/home/components/TransactionVolumeWidget.tsx` — accepts `volumeSummary: TransactionDirectionSummary`, `isLoading: boolean` props. Renders MUI `Card` with title "Transaction Volume". Shows credit total via `AdvanceCurrencyText` (green color) with count, debit total (red color) with count. Shows `Skeleton` when loading (FR-007, FR-008, FR-013, research.md R-009)
- [x] T018 [US6] Wire `TransactionVolumeWidget` into `HomeDashboard` in `src/views/flexx-apps/home/components/HomeDashboard.tsx` — pass `transactionVolumeSummary` and `isLoading.transactions` from `useHomeDashboardData`

**Checkpoint**: All 6 widgets render on the dashboard

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Responsive layout verification, edge case handling, lint compliance

- [x] T019 Verify responsive grid layout in `src/views/flexx-apps/home/components/HomeDashboard.tsx` — ensure Portfolio Overview and Recent Transactions span full width (`gridColumn: '1 / -1'`), remaining 4 widgets fill 2-3 column grid. Test xs/md/lg breakpoints (FR-012)
- [x] T020 Verify independent widget loading in `src/views/flexx-apps/home/components/HomeDashboard.tsx` — account-based widgets (US2, US3, US5) render when accounts load, transaction-based widgets (US4, US6) render when transactions load, hero widget (US1) renders when both load (FR-009)
- [x] T021 Run `yarn lint:fix` and `npx tsc --noEmit` to ensure all new files pass lint and type-check with zero errors (Constitution Principle V)
- [x] T022 Run quickstart.md manual verification checklist: navigate to `/home`, verify all 6 widgets, resize to mobile, compare totals with `/accounts` page, click recent transaction row, verify skeletons on refresh

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 (T001, T002) — BLOCKS all user stories
- **User Stories (Phase 3–8)**: All depend on Phase 2 completion (T003, T004, T005)
  - US2, US3, US5 depend on accounts data only
  - US4, US6 depend on transactions data only
  - US1 depends on both
  - US4 (T013) modifies accounts page — independent of other stories
- **Polish (Phase 9)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — No dependencies on other stories
- **US2 (P2)**: Can start after Phase 2 — No dependencies on other stories
- **US3 (P2)**: Can start after Phase 2 — No dependencies on other stories
- **US4 (P2)**: Can start after Phase 2 — No dependencies on other stories (T013 is independent file)
- **US5 (P3)**: Can start after Phase 2 — No dependencies on other stories
- **US6 (P3)**: Can start after Phase 2 — No dependencies on other stories

### Parallel Opportunities

Within Phase 2:
- T003 and T004 can be partially parallel (hook doesn't depend on shell)

After Phase 2 completes:
- All widget tasks marked [P] can run in parallel: T008, T010, T012, T015, T017 (different files)
- T013 (accounts page modification) is independent of all widget files

---

## Parallel Example: All Widget Components

```bash
# After Phase 2 completes, launch all widget components in parallel:
Task: "Create PortfolioOverviewWidget in src/views/flexx-apps/home/components/PortfolioOverviewWidget.tsx"
Task: "Create TopBanksByAccountsWidget in src/views/flexx-apps/home/components/TopBanksByAccountsWidget.tsx"
Task: "Create TopBanksByFundsWidget in src/views/flexx-apps/home/components/TopBanksByFundsWidget.tsx"
Task: "Create RecentTransactionsWidget in src/views/flexx-apps/home/components/RecentTransactionsWidget.tsx"
Task: "Create AccountStatusWidget in src/views/flexx-apps/home/components/AccountStatusWidget.tsx"
Task: "Create TransactionVolumeWidget in src/views/flexx-apps/home/components/TransactionVolumeWidget.tsx"
Task: "Modify accounts page to read accountId URL param in src/app/(client)/(dashboard)/accounts/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T002)
2. Complete Phase 2: Foundational (T003–T005)
3. Complete Phase 3: User Story 1 (T006–T007)
4. **STOP and VALIDATE**: Navigate to `/home`, verify total balance, account count, transaction count
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Dashboard shell with grid and data hook ready
2. Add US1 (Portfolio Overview) → MVP hero widget → Validate
3. Add US2 + US3 (Bank Rankings) → Bank insights → Validate
4. Add US4 (Recent Transactions) → Activity feed + cross-page navigation → Validate
5. Add US5 + US6 (Status + Volume) → Complete analytical dashboard → Validate
6. Polish → Responsive + edge cases + lint → Final validation

### Single Developer Strategy

Execute phases 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 sequentially. Each phase produces a deployable increment.

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- No test framework tasks — validation is via `yarn test` (ESLint + tsc)
- All widgets accept pre-computed data as props — `useHomeDashboardData` is the single source of truth
- FlexxTable handles skeleton, pagination, and empty states internally for US4 (Recent Transactions)
- Commit after each completed phase for clean git history
