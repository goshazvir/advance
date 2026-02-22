# Research: Transactions Dashboard

**Branch**: `004-transactions-dashboard` | **Date**: 2026-02-22

## R-001: FlexxTable Reuse for Transactions

**Decision**: Use existing `FlexxTable` component with `FlexxColumn[]` + `FlexxTableRow[]` pattern.

**Rationale**: FlexxTable already supports all required features: column sorting (via `defaultSort`, `disableSort`, `onSort`), pagination (built-in `TablePagination`), currency formatting (`currency: true`, `showCents: true`), date formatting (`dateFormat: 'md'`), search bar integration (`searchBar` prop), loading/error/empty states.

**Alternatives considered**:
- Custom table component — rejected: violates Constitution Principle III (Flexx Component Library First)
- MUI DataGrid — rejected: overkill for read-only table, not used elsewhere in project

## R-002: API Endpoint & Data Shape

**Decision**: Use `GET /transaction?search_term=...` which returns `Transaction[]` with `account_name` populated.

**Rationale**: This endpoint returns all transactions across all accounts with `account_name` already populated (unlike `GET /account/{id}/transactions` where `account_name` is empty). Server-side search via `search_term` query param is supported.

**Alternatives considered**:
- Client-side aggregation of per-account transactions — rejected: inefficient, `account_name` not populated in per-account endpoint
- Client-side search filtering — rejected: server already supports `search_term`, keeps client simple

## R-003: API Layer Pattern (Two-Hop Proxy)

**Decision**: Create Next.js API route at `src/app/api/pages/transactions/route.ts` + add `fetchTransactions()` method to `flexxApiService.ts`.

**Rationale**: Follows Constitution Principle I (Two-Hop API Proxy). Existing pattern from `accounts` feature: client → `/api/pages/transactions` → backend `/transaction`.

**Alternatives considered**: None — the two-hop proxy is a non-negotiable constitutional requirement.

## R-004: Search Integration

**Decision**: Use `GlobalSearchContext` (`useGlobalSearch()` hook) for search state, pass to FlexxTable's `searchBar` prop, and include `search_term` in the React Query key for server-side filtering.

**Rationale**: Matches the accounts dashboard pattern. `FlexxTableSearchBar` component handles debounced input (300ms). Search triggers re-fetch with `search_term` query parameter.

**Alternatives considered**:
- Local search state (useState) — rejected: GlobalSearchContext is the established pattern
- Client-side filtering — rejected: server-side filtering already available and more scalable

## R-005: Sorting Strategy

**Decision**: Client-side sorting using FlexxTable's built-in sort. Default sort: Date descending (newest first) via `defaultSort: 'desc'` on the date column.

**Rationale**: FlexxTable has built-in sort support. The API doesn't support server-side sorting, so client-side sort is the only option. Given the pagination is also client-side (all data fetched at once), this works well.

**Alternatives considered**:
- Server-side sorting — rejected: API doesn't support sort parameters

## R-006: Sidebar Navigation

**Decision**: Add `TransactionsMenuItem` to `flexxMenuItems.ts` in the `TopGroup` array, after Home and Accounts.

**Rationale**: Menu items are defined in `src/components/FlexxLayout/FlexxVerticalLayout/FlexxSideBarMenu/flexxMenuItems.ts`. Add new entry with icon, title "Transactions", href "/transactions".

**Alternatives considered**: None — single pattern for sidebar items.

## R-007: Feature File Structure

**Decision**: Follow established feature structure:
```
src/views/transactions/
├── components/TransactionsDashboard.tsx
├── hooks/useTransactionsDashboardTable.tsx
├── hooks/useFetchTransactions.tsx
└── domain/ (reuse existing Transaction interface)
```

**Rationale**: Matches the accounts feature structure per Constitution Development Workflow. The `Transaction` interface already exists in `src/domain/Transaction.ts` — no need to duplicate.

**Alternatives considered**: None — constitutional requirement for feature file structure.
