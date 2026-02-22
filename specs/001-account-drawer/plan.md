# Implementation Plan: Account Drawer

**Branch**: `001-account-drawer` | **Date**: 2026-02-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-account-drawer/spec.md`

## Summary

Implement a right-side drawer that opens when clicking an account row in the Accounts dashboard. The drawer displays account details (name, status badge, bank, masked account number, routing number, balance) in a header section and a paginated transactions table below. This requires building API integration (Next.js proxy routes + flexxApiService methods) for `GET /account/{account_id}` and `GET /account/{account_id}/transactions`, React Query hooks for data fetching, and the drawer UI using existing `DrawerWrapper` and `FlexxTable` components.

## Technical Context

**Language/Version**: TypeScript (strict mode, `--noEmit --incremental`)
**Primary Dependencies**: Next.js 16 (App Router), React 19, MUI v5, react-query v3 (3.39.3), Tailwind CSS
**Storage**: N/A (backend-managed via REST API proxy)
**Testing**: `yarn test` = ESLint + TypeScript type-check (no Jest/Vitest)
**Target Platform**: Web browser (desktop-first, responsive)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: Account details within 1s, transactions within 2s of drawer open
**Constraints**: Must follow two-hop API proxy pattern, no optimistic updates for financial data, react-query v3 only
**Scale/Scope**: ~10 accounts, ~5-50 transactions per account

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Two-Hop API Proxy | PASS | New API routes in `src/app/api/` + methods in `flexxApiService.ts` |
| II. Server-Authoritative Financial Data | PASS | Read-only feature; no mutations. When Move Money is added later, invalidation patterns will apply |
| III. Flexx Component Library First | PASS | Uses `DrawerWrapper`, `FlexxTable`, `AdvanceAccountNumberDisplay`, `AdvanceCurrencyText` |
| IV. React Query v3 Conventions | PASS | Imports from `'react-query'`, new keys in `QueryClientIds` enum, `use[Feature][Action]` naming |
| V. Type Safety & Lint Compliance | PASS | New `Transaction` interface, no `any`, proper import order |
| VI. Simplicity & YAGNI | PASS | No abstractions beyond what's needed; reuses existing patterns |

**Post-Phase 1 Re-check**: All gates still pass. No violations introduced.

## Project Structure

### Documentation (this feature)

```text
specs/001-account-drawer/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── domain/
│   └── Transaction.ts                          # NEW — Transaction interface + enums
├── flexxApi/
│   └── flexxApiService.ts                      # MODIFY — add fetchAccount(), fetchAccountTransactions()
├── app/api/pages/
│   ├── accounts/[accountId]/
│   │   ├── route.ts                            # NEW — GET /api/pages/accounts/:accountId
│   │   └── transactions/
│   │       └── route.ts                        # NEW — GET /api/pages/accounts/:accountId/transactions
├── QueryClient/
│   └── queryClient.ids.ts                      # MODIFY — add ACCOUNT, ACCOUNT_TRANSACTIONS
├── hooks/
│   ├── useFetchAccount.tsx                     # NEW — useQuery for single account
│   └── useFetchAccountTransactions.tsx         # NEW — useQuery for account transactions
├── views/accounts/
│   ├── components/
│   │   ├── AccountsDashboardTable.tsx          # MODIFY — add row onClick to open drawer
│   │   ├── AccountDrawer.tsx                   # NEW — drawer entry component
│   │   └── AccountDrawerHeader.tsx             # NEW — account details header
│   └── hooks/
│       ├── useAccountDrawer.tsx                # NEW — drawer state + portal logic
│       └── useAccountDrawerTransactionsTable.tsx  # NEW — columns + row transform for transactions
```

**Structure Decision**: Follows existing feature file structure in `src/views/accounts/`. New components live in `components/`, new hooks in `hooks/`. API routes follow existing `src/app/api/pages/accounts/` nesting. Domain types in `src/domain/`.

## Complexity Tracking

> No constitution violations. No complexity justifications needed.
