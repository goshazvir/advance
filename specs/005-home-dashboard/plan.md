# Implementation Plan: Home Dashboard Redesign

**Branch**: `005-home-dashboard` | **Date**: 2026-02-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/005-home-dashboard/spec.md`

## Summary

Replace the current static home page (interview assignment instructions) with a dynamic financial dashboard. The dashboard displays 6 widgets: Portfolio Overview (hero), Top 3 Banks by Accounts, Top 3 Banks by Funds, Recent 5 Transactions, Account Status Summary, and Transaction Volume by Direction. All data is derived client-side from existing `GET /account` and `GET /transaction` API responses using existing fetch hooks. No new backend endpoints, API routes, or query keys are needed.

## Technical Context

**Language/Version**: TypeScript (strict mode, `--noEmit --incremental`)
**Primary Dependencies**: Next.js 16 (App Router), React 19, MUI v5, react-query v3 (3.39.3)
**Storage**: N/A (read-only dashboard, data fetched from existing API)
**Testing**: `yarn test` = ESLint + TypeScript type-check (no Jest/Vitest)
**Target Platform**: Web (desktop + mobile responsive)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: Dashboard renders within 2 seconds of navigation
**Constraints**: No new external libraries, no new API endpoints
**Scale/Scope**: 6 widget components, 1 data aggregation hook, 1 domain file, ~2 modified files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Two-Hop API Proxy | PASS | No new API calls — reuses existing `useFetchAccounts` and `useFetchTransactions` which already go through the proxy |
| II. Server-Authoritative Financial Data | PASS | Read-only feature — no mutations. Data displayed matches server responses. Dashboard uses shared query keys so it auto-refreshes after mutations on other pages |
| III. Flexx Component Library First | PASS | Uses `FlexxDashboardWrapper`, `AdvanceCurrencyText`, `FlexxTable` (for recent transactions), MUI `Card`/`Chip` for widgets |
| IV. React Query v3 Conventions | PASS | Reuses existing hooks importing from `'react-query'` with `QueryClientIds` enum keys |
| V. Type Safety & Lint Compliance | PASS | All new code will be fully typed, no `any`, proper import ordering |
| VI. Simplicity & YAGNI | PASS | Pure UI feature with minimal new code. One aggregation hook, no new abstractions. No feature flags |

**Post-Design Re-check**: All principles still hold. No violations detected.

## Project Structure

### Documentation (this feature)

```text
specs/005-home-dashboard/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 research decisions
├── data-model.md        # Entity definitions
├── quickstart.md        # Development quickstart
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
src/views/flexx-apps/home/
├── components/
│   ├── HomeDashboard.tsx              # Main dashboard entry (replaces static content)
│   ├── PortfolioOverviewWidget.tsx     # P1: Hero — total balance, accounts, transactions
│   ├── TopBanksByAccountsWidget.tsx    # P2: Top 3 banks ranked by account count
│   ├── TopBanksByFundsWidget.tsx       # P2: Top 3 banks ranked by total balance
│   ├── RecentTransactionsWidget.tsx    # P2: Last 5 transactions with FlexxTable
│   ├── AccountStatusWidget.tsx        # P3: Open/Closed/Invalid counts
│   └── TransactionVolumeWidget.tsx    # P3: Credit vs Debit totals
├── hooks/
│   └── useHomeDashboardData.ts        # Aggregates accounts + transactions into widget data
└── domain/
    └── HomeDashboard.ts               # BankSummary, AccountStatusSummary, etc. interfaces

src/app/(client)/(dashboard)/home/page.tsx        # MODIFY: replace static page with HomeDashboard
src/app/(client)/(dashboard)/accounts/page.tsx    # MODIFY: read accountId URL param to auto-open drawer
```

**Structure Decision**: Follows the established `src/views/flexx-apps/[feature]/` pattern with `components/`, `hooks/`, and `domain/` subdirectories. The home page at `src/app/(client)/(dashboard)/home/page.tsx` becomes a thin wrapper importing `HomeDashboard`.

## Complexity Tracking

No constitution violations — this section is intentionally empty.
