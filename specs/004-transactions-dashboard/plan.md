# Implementation Plan: Transactions Dashboard

**Branch**: `004-transactions-dashboard` | **Date**: 2026-02-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-transactions-dashboard/spec.md`

## Summary

Add a Transactions Dashboard page at `/transactions` that displays all transactions across all accounts in a FlexxTable with sorting, search, and pagination. Follows existing feature patterns (accounts dashboard) — reuses FlexxTable, GlobalSearchContext, two-hop API proxy, and React Query v3. Read-only feature, no mutations.

## Technical Context

**Language/Version**: TypeScript (strict mode, `--noEmit --incremental`)
**Primary Dependencies**: Next.js 16 (App Router), React 19, MUI v5, react-query v3 (3.39.3)
**Storage**: N/A (external backend via two-hop API proxy)
**Testing**: `yarn test` = ESLint + TypeScript type-check (no Jest/Vitest)
**Target Platform**: Web browser (Next.js App Router)
**Project Type**: Web application (frontend)
**Performance Goals**: Page loads within 2 seconds, search results within 5 seconds
**Constraints**: React Query v3 imports only, no `@tanstack/react-query`, no `any` types, no `console.log`
**Scale/Scope**: Single read-only page, ~5 new files, ~3 modified files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Two-Hop API Proxy | PASS | New API route + flexxApiService method planned |
| II. Server-Authoritative Financial Data | PASS | Read-only feature, no mutations. No optimistic updates. |
| III. Flexx Component Library First | PASS | Uses FlexxTable, FlexxDashboardWrapper, FlexxTextField patterns |
| IV. React Query v3 Conventions | PASS | Imports from `'react-query'`, new `QueryClientIds.TRANSACTIONS` key |
| V. Type Safety & Lint Compliance | PASS | TypeScript strict mode, no `any`, proper imports |
| VI. Simplicity & YAGNI | PASS | Reuses all existing components, no new abstractions |

**Post-Phase 1 re-check**: All gates still PASS. No new dependencies, no new abstractions, no mutations.

## Project Structure

### Documentation (this feature)

```text
specs/004-transactions-dashboard/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── (client)/(dashboard)/transactions/
│   │   └── page.tsx                          # NEW — Next.js route
│   └── api/pages/transactions/
│       └── route.ts                          # NEW — API proxy route
├── views/
│   └── transactions/
│       ├── components/
│       │   └── TransactionsDashboard.tsx      # NEW — Main view
│       └── hooks/
│           ├── useTransactionsDashboardTable.tsx  # NEW — Table columns/rows
│           └── useFetchTransactions.tsx            # NEW — React Query hook
├── flexxApi/
│   └── flexxApiService.ts                    # MODIFY — Add fetchTransactions()
├── QueryClient/
│   └── queryClient.ids.ts                    # MODIFY — Add TRANSACTIONS enum
└── components/FlexxLayout/.../
    └── flexxMenuItems.ts                     # MODIFY — Add nav item
```

**Structure Decision**: Follows the established `src/views/[feature]/` pattern with `components/` and `hooks/` subdirectories. No `domain/` directory needed — the `Transaction` interface already exists in `src/domain/Transaction.ts`.

## Complexity Tracking

No constitution violations. No complexity justifications needed.
