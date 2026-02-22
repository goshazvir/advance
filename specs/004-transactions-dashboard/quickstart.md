# Quickstart: Transactions Dashboard

**Branch**: `004-transactions-dashboard` | **Date**: 2026-02-22

## What This Feature Does

Adds a `/transactions` page accessible from the sidebar navigation. Displays all transactions across all accounts in a sortable, searchable, paginated table.

## Files to Create

| File | Purpose |
|------|---------|
| `src/app/(client)/(dashboard)/transactions/page.tsx` | Next.js page route |
| `src/app/api/pages/transactions/route.ts` | API proxy route |
| `src/views/transactions/components/TransactionsDashboard.tsx` | Main view component |
| `src/views/transactions/hooks/useTransactionsDashboardTable.tsx` | Column/row definitions |
| `src/views/transactions/hooks/useFetchTransactions.tsx` | React Query data hook |

## Files to Modify

| File | Change |
|------|--------|
| `src/flexxApi/flexxApiService.ts` | Add `fetchTransactions()` method |
| `src/QueryClient/queryClient.ids.ts` | Add `TRANSACTIONS` to enum |
| `src/components/FlexxLayout/.../flexxMenuItems.ts` | Add Transactions nav item |

## Key Patterns to Follow

1. **FlexxTable** — define `FlexxColumn[]` with `dateFormat: 'md'`, `currency: true`, `showCents: true`, `defaultSort: 'desc'` on Date column
2. **React Query v3** — `import {useQuery} from 'react-query'`, use `QueryClientIds.TRANSACTIONS`
3. **Two-hop proxy** — API route in `src/app/api/pages/transactions/route.ts` forwards to backend `GET /transaction`
4. **GlobalSearchContext** — `useGlobalSearch()` for search state, pass `search_term` to API
5. **FlexxDashboardWrapper** — wraps the page content with standard layout

## Dev Commands

```bash
yarn dev          # Start dev server
yarn lint:fix     # Fix lint issues
npx tsc --noEmit  # Type check
```
