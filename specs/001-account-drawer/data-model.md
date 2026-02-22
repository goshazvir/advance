# Data Model: Account Drawer

**Feature**: 001-account-drawer
**Date**: 2026-02-22

## Entities

### Account (existing)

**Path**: `src/domain/Account.ts`
**Status**: No changes needed

| Field | Type | Description |
|-------|------|-------------|
| account_id | string | Unique identifier |
| name | string | Account display name |
| routing_number | string | Bank routing number |
| account_number | string | Full account number (masked in UI) |
| bank_name | string | Name of the bank |
| bank_icon | string | Icon identifier for the bank |
| status | AccountStatus | `open` \| `closed` \| `invalid` |
| balance | number | Current balance in dollars |

**Enum**: `AccountStatus` — `OPEN = 'open'`, `CLOSED = 'closed'`, `INVALID = 'invalid'`

### Transaction (new)

**Path**: `src/domain/Transaction.ts`
**Status**: New file

| Field | Type | Description |
|-------|------|-------------|
| transaction_id | string | Unique identifier |
| merchant | string | Merchant name |
| amount | number | Transaction amount in dollars |
| direction | TransactionDirection | `credit` \| `debit` |
| created_at | string | ISO date string |
| account_id | string | Associated account ID |
| status | TransactionStatus | `pending` \| `approved` |
| extra_data | object | Additional metadata (unused in this feature) |
| user_created | boolean | Whether created by user |
| account_name | string | Account name (populated only via `GET /transaction`, empty via per-account endpoint) |

**Enum**: `TransactionDirection` — `CREDIT = 'credit'`, `DEBIT = 'debit'`
**Enum**: `TransactionStatus` — `PENDING = 'pending'`, `APPROVED = 'approved'`

## Relationships

```
Account 1 ──── * Transaction
  (account_id)     (account_id)
```

An account has zero or more transactions. Transactions are fetched per-account via `GET /account/{account_id}/transactions`.

## Query Keys

| Key | Enum Value | Query Key Shape | Description |
|-----|------------|-----------------|-------------|
| ACCOUNTS | `fetch_accounts` | `[QueryClientIds.ACCOUNTS]` | Existing — list all accounts |
| ACCOUNT | `fetch_account` | `[QueryClientIds.ACCOUNT, accountId]` | New — single account details |
| ACCOUNT_TRANSACTIONS | `fetch_account_transactions` | `[QueryClientIds.ACCOUNT_TRANSACTIONS, accountId]` | New — transactions for one account |

## State Transitions

This feature is read-only. No state transitions are triggered by the Account Drawer itself. When the Move Money feature is added later, it will need to invalidate `ACCOUNTS`, `ACCOUNT`, and `ACCOUNT_TRANSACTIONS` query keys after successful mutations (per Constitution II).
