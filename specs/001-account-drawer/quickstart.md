# Quickstart: Account Drawer

**Feature**: 001-account-drawer
**Branch**: `001-account-drawer`

## Prerequisites

```bash
git checkout 001-account-drawer
yarn install
yarn dev
```

Open http://localhost:3000/accounts in browser.

## Implementation Order

### 1. Domain types
Create `src/domain/Transaction.ts` with `Transaction` interface, `TransactionDirection` and `TransactionStatus` enums.

### 2. API layer
- Add Next.js route handlers for account detail and account transactions
- Add `fetchAccount()` and `fetchAccountTransactions()` methods to `flexxApiService`
- Add `ACCOUNT` and `ACCOUNT_TRANSACTIONS` to `QueryClientIds` enum

### 3. React Query hooks
- `useFetchAccount(accountId)` — fetches single account details
- `useFetchAccountTransactions(accountId)` — fetches account transactions

### 4. Drawer UI
- `AccountDrawerHeader` — displays account details (name, badge, bank, masked number, routing, balance, Move Money button)
- `useAccountDrawerTransactionsTable` — defines columns and transforms Transaction[] to FlexxTableRow[]
- `AccountDrawer` — combines header + FlexxTable in DrawerWrapper
- `useAccountDrawer` — manages drawer state (selectedAccountId + open/close + portal)

### 5. Integration
- Modify `AccountsDashboardTable` to add row `onClick` that opens the drawer
- Wire `useAccountDrawer` into the accounts page

## Validation

```bash
yarn lint       # Zero ESLint errors
yarn ts         # Zero TypeScript errors
```

Manual check:
1. Click any account row → drawer opens with correct details
2. Transactions table shows with pagination
3. Account number masked by default, toggleable with eye icon
4. Click different account row → drawer updates
5. Click X → drawer closes
6. Move Money button visible in header

## Key Files

| File | Action | Purpose |
|------|--------|---------|
| `src/domain/Transaction.ts` | NEW | Transaction types |
| `src/app/api/pages/accounts/[accountId]/route.ts` | NEW | API proxy for account detail |
| `src/app/api/pages/accounts/[accountId]/transactions/route.ts` | NEW | API proxy for account transactions |
| `src/flexxApi/flexxApiService.ts` | MODIFY | Add fetchAccount, fetchAccountTransactions |
| `src/QueryClient/queryClient.ids.ts` | MODIFY | Add ACCOUNT, ACCOUNT_TRANSACTIONS |
| `src/hooks/useFetchAccount.tsx` | NEW | React Query hook for account |
| `src/hooks/useFetchAccountTransactions.tsx` | NEW | React Query hook for transactions |
| `src/views/accounts/components/AccountDrawer.tsx` | NEW | Drawer entry component |
| `src/views/accounts/components/AccountDrawerHeader.tsx` | NEW | Account details header |
| `src/views/accounts/hooks/useAccountDrawer.tsx` | NEW | Drawer state + portal |
| `src/views/accounts/hooks/useAccountDrawerTransactionsTable.tsx` | NEW | Transactions table config |
| `src/views/accounts/components/AccountsDashboardTable.tsx` | MODIFY | Add row onClick |
