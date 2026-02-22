# Research: Account Drawer

**Feature**: 001-account-drawer
**Date**: 2026-02-22

## R1: Drawer Component Pattern

**Decision**: Use existing `DrawerWrapper` component with portal rendering via `ReactDOM.createPortal` to `document.body`.

**Rationale**: The codebase already has `DrawerWrapper` (`src/components/DrawerWrapper/DrawerWrapper.tsx`) with full support for right-side drawers, configurable widths, close actions, and portal behavior. The `useCreateAccount` hook demonstrates the exact pattern: `useBoolean` for open/close state + `useMemo` wrapping a portal-rendered `DrawerWrapper`.

**Alternatives considered**:
- Custom drawer implementation — rejected, violates Constitution III (Flexx Component Library First)
- MUI Drawer directly — rejected, same violation

**Implementation detail**: Use `drawerWidth='lg'` (55vw) to match the screenshot layout where the accounts table remains visible on the left. The drawer will be rendered via `useAccountDrawer` hook following the `useCreateAccount` pattern.

## R2: Transactions Table Pattern

**Decision**: Use `FlexxTable` component with custom `FlexxColumn[]` definitions and a data transformation hook.

**Rationale**: `FlexxTable` already supports all required features: currency formatting (`currency: true`, `showCents: true`), date formatting (`dateFormat`), pagination (built-in with `customRowsPerPage`), loading/error/empty states, and row click handlers. The `useAccountsDashboardTable` hook demonstrates the exact column definition + row transformation pattern.

**Alternatives considered**:
- MUI DataGrid — rejected, not used in project, violates Constitution III
- Custom table — rejected, unnecessary complexity

**Implementation detail**: Define 5 columns (Date, Merchant, Amount, Direction, Status). Use `currency: true` + `showCents: true` for Amount. Use `dateFormat: 'md'` for dates (produces "Jan 27 2026" format). Direction and Status as plain text strings.

## R3: API Integration Layer

**Decision**: Follow existing two-hop proxy pattern — add Next.js API route handlers + `flexxApiService` methods.

**Rationale**: Constitution I mandates the two-hop proxy. Existing `src/app/api/pages/accounts/route.ts` shows the exact pattern for proxying to backend. The `flexxApiService` singleton class needs two new methods.

**Alternatives considered**:
- Direct backend calls — prohibited by Constitution I
- Server components with direct fetch — rejected, would break existing client-side React Query pattern

**Implementation detail**:
1. API route `src/app/api/pages/accounts/[accountId]/route.ts` → proxies to `GET /account/{account_id}`
2. API route `src/app/api/pages/accounts/[accountId]/transactions/route.ts` → proxies to `GET /account/{account_id}/transactions`
3. `flexxApiService().fetchAccount(accountId)` → calls `/api/pages/accounts/${accountId}`
4. `flexxApiService().fetchAccountTransactions(accountId)` → calls `/api/pages/accounts/${accountId}/transactions`

## R4: React Query Integration

**Decision**: Two new query keys in `QueryClientIds` enum, two new custom hooks following `use[Feature][Action]` naming.

**Rationale**: Constitution IV mandates React Query v3 conventions. Current `useFetchAccounts` hook shows the exact pattern: import from `'react-query'`, use `QueryClientIds` enum for keys, return `{data, isLoading, isError}`.

**Alternatives considered**:
- Single combined query for account + transactions — rejected, spec FR-020 requires independent fetching so one failure doesn't block the other
- Inline useQuery without custom hooks — rejected, violates naming convention

**Implementation detail**:
- `QueryClientIds.ACCOUNT = 'fetch_account'`
- `QueryClientIds.ACCOUNT_TRANSACTIONS = 'fetch_account_transactions'`
- `useFetchAccount(accountId)` — enabled only when `accountId` is truthy
- `useFetchAccountTransactions(accountId)` — enabled only when `accountId` is truthy
- Both use `[QueryClientIds.KEY, accountId]` as composite query keys for proper cache separation per account

## R5: Account Number Masking

**Decision**: Reuse existing `AdvanceAccountNumberDisplay` component for the drawer header.

**Rationale**: This component already exists in `src/components/AdvanceAccountNumberDisplay/` and is used in the accounts dashboard table. It provides masked display (`**3863`), eye icon toggle, and copy functionality — exactly what the spec requires.

**Alternatives considered**:
- Custom masking logic — rejected, component already exists and is battle-tested

## R6: Drawer State Management

**Decision**: Use `useState` for selected account ID at the `AccountsDashboardTable` level, passed to the drawer hook.

**Rationale**: The drawer opens when clicking an account row (passing `account_id`), and closes via the X button (setting `account_id` to `null`). Clicking a different row updates the `account_id`, which triggers React Query to refetch. No global state needed — this is local to the accounts page.

**Alternatives considered**:
- React Context for selected account — rejected, YAGNI (Constitution VI), only used within one page
- URL parameter for selected account — rejected, over-engineering for a drawer that doesn't need deep linking

**Implementation detail**: `useAccountDrawer` hook manages `selectedAccountId` state + `useBoolean` for open/close + portal rendering. The accounts table passes `onRowClick={(accountId) => openDrawer(accountId)}`.
