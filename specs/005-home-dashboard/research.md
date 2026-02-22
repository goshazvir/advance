# Research: Home Dashboard Redesign

**Branch**: `005-home-dashboard` | **Date**: 2026-02-22

## R-001: Data Fetching Strategy

**Decision**: Reuse existing hooks `useFetchAccounts` and `useFetchTransactions` — no new API endpoints or query keys needed.

**Rationale**: Both hooks already exist and cover the required data:
- `useFetchAccounts()` → `GET /account` → returns `Account[]` with `bank_name`, `bank_icon`, `balance`, `status`
- `useFetchTransactions()` → `GET /transaction` → returns `Transaction[]` with `account_name`, `amount`, `direction`, `created_at`, `status`

The `GET /transaction` endpoint (unlike `GET /account/{id}/transactions`) populates `account_name` on each transaction, which the Recent Transactions widget needs.

**Alternatives considered**:
- New dashboard-specific API endpoint — rejected (backend doesn't have one, and client-side aggregation is trivial for this data volume)
- New query keys — rejected (the data is identical to what accounts/transactions pages use; sharing cache keys means data stays fresh after mutations on other pages)

## R-002: Widget Layout Approach

**Decision**: Use MUI `Box` with CSS Grid (`display: 'grid'`) and responsive `gridTemplateColumns` via the `sx` prop.

**Rationale**: The codebase uses MUI Stack for linear layouts. For a 2-3 column dashboard grid, CSS Grid via `sx` is the simplest approach without introducing new dependencies. MUI Grid component is not used anywhere in the codebase.

**Alternatives considered**:
- MUI Grid v2 component — rejected (not used in codebase, adds unnecessary abstraction)
- Flexbox with percentage widths — rejected (CSS Grid is cleaner for dashboard card layouts)

## R-003: Widget Card Component

**Decision**: Use MUI `Card` + `CardContent` for widget containers.

**Rationale**: The current home page already uses `Card` + `CardContent`. It provides consistent elevation, padding, and border styling. Each widget gets its own Card.

**Alternatives considered**:
- MUI Paper — rejected (Card has better built-in structure with CardContent)
- Custom Box with border — rejected (Card is semantic and already used on the page)

## R-004: Loading State Pattern

**Decision**: Use MUI `Skeleton` components within each widget card. Render two independent loading states (one for account-based widgets, one for transaction-based widgets).

**Rationale**: The codebase already uses `Skeleton` in `FlexxTableSkeletonBody`. Independent loading means account widgets render as soon as accounts load, even if transactions are still fetching.

**Alternatives considered**:
- Single full-page `AdvanceLoaderCenter` — rejected (violates FR-009 independent rendering requirement)
- Custom shimmer component — rejected (MUI Skeleton is already used in the project)

## R-005: Recent Transactions Click Navigation

**Decision**: Use `next/navigation` `useRouter().push('/accounts')` combined with URL search params (`?accountId=xxx`) to open the account drawer on the Accounts page.

**Rationale**: The account drawer is managed by `useAccountDrawer` hook on the Accounts page. There's no global drawer state. The cleanest cross-page navigation approach is to pass the account ID as a URL parameter and have the Accounts page read it on mount.

**Alternatives considered**:
- Global context for drawer state — rejected (over-engineering for a single navigation flow, violates Principle VI)
- Just navigate to `/accounts` without opening drawer — rejected (violates FR-011)

## R-006: Bank Summary Computation

**Decision**: Compute bank summaries client-side in a custom hook `useHomeDashboardData` using `useMemo` on the accounts array.

**Rationale**: Grouping accounts by `bank_name` and computing totals is a simple reduce operation. No need for backend support or separate caching.

**Alternatives considered**:
- Separate derived query with `select` option — rejected (unnecessary complexity for a synchronous computation)

## R-007: Currency Formatting

**Decision**: Use existing `AdvanceCurrencyText` component for all currency displays in widgets.

**Rationale**: Component already handles superscript cents pattern, negative amounts, and consistent formatting across the app. Used in FlexxTable (via `currency: true` column flag) and directly in components.

## R-008: Status Badge Colors

**Decision**: Reuse the existing `statusColorMap` pattern from `AccountDrawerHeader.tsx`:
- `open` → `success` (green)
- `closed` → `error` (red)
- `invalid` → `warning` (yellow)

Use MUI `Chip` with `color` and `variant='outlined'` props.

**Rationale**: This exact pattern already exists for account status display. Reusing it ensures visual consistency.

## R-009: Transaction Direction Visual Distinction

**Decision**: Use colored text or chips: `credit` → green, `debit` → red. Follow the same pattern used in transaction tables across the app.

**Rationale**: Standard financial convention — green for money in, red for money out. Aligns with existing transaction table rendering.

## R-010: Empty State Handling

**Decision**: Each widget handles its own empty state inline (e.g., "No transactions yet", showing zero values). No shared empty state component needed.

**Rationale**: Different widgets need different empty states. Zero values ($0.00, 0 accounts) are valid displays for summary widgets, while list widgets need "No data" messages.
