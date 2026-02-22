# Quickstart: Home Dashboard Redesign

**Branch**: `005-home-dashboard` | **Date**: 2026-02-22

## Prerequisites

```bash
git checkout 005-home-dashboard
yarn install
yarn dev
# Open http://localhost:3000/home
```

## Feature Structure

```
src/views/flexx-apps/home/
├── components/
│   ├── HomeDashboard.tsx              # Main dashboard entry component
│   ├── PortfolioOverviewWidget.tsx     # Hero widget: total balance, accounts, transactions
│   ├── TopBanksByAccountsWidget.tsx    # Top 3 banks by account count
│   ├── TopBanksByFundsWidget.tsx       # Top 3 banks by total balance
│   ├── RecentTransactionsWidget.tsx    # Last 5 transactions (FlexxTable)
│   ├── AccountStatusWidget.tsx        # Account status summary (open/closed/invalid)
│   └── TransactionVolumeWidget.tsx    # Credit vs debit summary
├── hooks/
│   └── useHomeDashboardData.ts        # Aggregates accounts + transactions data
├── domain/
│   └── HomeDashboard.ts               # BankSummary, AccountStatusSummary, etc.
└── Home.tsx                           # Re-export (if needed for backward compat)
```

## Key Files to Modify

| File | Change |
|------|--------|
| `src/app/(client)/(dashboard)/home/page.tsx` | Replace static content with `HomeDashboard` component |
| `src/app/(client)/(dashboard)/accounts/page.tsx` | Read `accountId` URL param to auto-open drawer |

## Data Flow

```
useFetchAccounts() ─────┐
                        ├──→ useHomeDashboardData() ──→ Widget components
useFetchTransactions() ──┘

useHomeDashboardData returns:
  - portfolioOverview: {totalBalance, totalAccounts, totalTransactions}
  - topBanksByAccounts: BankSummary[] (top 3)
  - topBanksByFunds: BankSummary[] (top 3)
  - recentTransactions: Transaction[] (top 5 by date)
  - accountStatusSummary: {open, closed, invalid, total}
  - transactionVolumeSummary: {creditTotal, debitTotal, creditCount, debitCount}
  - isLoading: {accounts: boolean, transactions: boolean}
```

## Verification

```bash
# Type check
npx tsc --noEmit

# Lint
yarn lint

# Full test gate
yarn test
```

### Manual verification checklist

1. Navigate to `/home` — all 6 widgets render with correct data
2. Resize browser to mobile width — widgets stack in single column
3. Compare total balance with sum of balances on `/accounts` page
4. Compare recent transactions with top 5 on `/transactions` page
5. Click a recent transaction row — navigates to `/accounts` and opens account drawer
6. Refresh page — skeletons appear briefly, then data loads
