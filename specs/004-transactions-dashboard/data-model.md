# Data Model: Transactions Dashboard

**Branch**: `004-transactions-dashboard` | **Date**: 2026-02-22

## Entities

### Transaction (existing — no changes)

The `Transaction` interface already exists at `src/domain/Transaction.ts`. This feature consumes it read-only.

| Field | Type | Description |
|-------|------|-------------|
| transaction_id | string | Unique identifier |
| merchant | string | Merchant name |
| amount | number | Transaction amount in dollars |
| direction | `'credit' \| 'debit'` | Transaction direction |
| created_at | string | ISO date string |
| account_id | string | Associated account ID |
| status | `'pending' \| 'approved'` | Transaction status |
| extra_data | Record<string, unknown> | Additional metadata |
| user_created | boolean | Whether user-created |
| account_name | string | Account name (populated by GET /transaction) |

### FlexxTableRow (existing — consumed as-is)

Table rows map `Transaction` fields to display columns:

| Display Column | Source Field | Formatting |
|---------------|-------------|------------|
| Date | `created_at` | `dateFormat: 'md'` → "Feb 12 2026" |
| Account | `account_name` | Plain text |
| Merchant | `merchant` | Plain text |
| Amount | `amount` | `currency: true, showCents: true` → superscript cents |
| Direction | `direction` | Plain text ("credit" / "debit") |
| Status | `status` | Plain text ("approved" / "pending") |

## Data Flow

```
GET /transaction?search_term=X
       ↓
flexxApiService().fetchTransactions({search_term})
       ↓
useFetchTransactions(searchQuery) — React Query hook
       ↓
useTransactionsDashboardTable(transactions) — maps to FlexxColumn[] + FlexxTableRow[]
       ↓
FlexxTable — renders with sorting, pagination, search
```

## Query Keys

| Key | Enum Value | Used By |
|-----|-----------|---------|
| TRANSACTIONS | `'fetch_transactions'` | `useFetchTransactions` |

**Note**: This is a new entry in `QueryClientIds` enum. Existing `ACCOUNT_TRANSACTIONS` is for per-account transactions in the drawer — they are separate concerns.

## No State Transitions

This feature is read-only. No mutations, no state transitions, no optimistic updates needed.
