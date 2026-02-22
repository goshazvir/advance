# Data Model: Home Dashboard Redesign

**Branch**: `005-home-dashboard` | **Date**: 2026-02-22

## Existing Entities (no changes)

### Account

**Source**: `src/domain/Account.ts`

| Field | Type | Notes |
|-------|------|-------|
| account_id | string | Primary key |
| name | string | Display name |
| routing_number | string | — |
| account_number | string | Masked display |
| bank_name | string | Used for grouping |
| bank_icon | string | URL, may be empty |
| status | AccountStatus | `open` / `closed` / `invalid` |
| balance | number | Used for fund totals |

### Transaction

**Source**: `src/domain/Transaction.ts`

| Field | Type | Notes |
|-------|------|-------|
| transaction_id | string | Primary key |
| merchant | string | Display name |
| amount | number | Currency amount |
| direction | TransactionDirection | `credit` / `debit` |
| created_at | string | ISO date string, used for sorting |
| account_id | string | FK to Account |
| status | TransactionStatus | `pending` / `approved` |
| account_name | string | Populated by `GET /transaction` only |
| extra_data | Record<string, unknown> | Not used on dashboard |
| user_created | boolean | Not used on dashboard |

## Derived Entities (new, computed client-side)

### BankSummary

**Source**: New interface in `src/views/flexx-apps/home/domain/`

Computed by grouping `Account[]` by `bank_name`.

| Field | Type | Notes |
|-------|------|-------|
| bankName | string | Grouping key |
| bankIcon | string | From first account in group |
| accountCount | number | Count of accounts in this bank |
| totalBalance | number | Sum of all account balances in this bank |

**Derivation logic**:
```
accounts.reduce → group by bank_name → for each group:
  bankName = group key
  bankIcon = first account's bank_icon
  accountCount = group.length
  totalBalance = sum(account.balance)
→ sort descending by accountCount (or totalBalance)
→ take top 3
```

### AccountStatusSummary

**Source**: New interface in `src/views/flexx-apps/home/domain/`

Computed by grouping `Account[]` by `status`.

| Field | Type | Notes |
|-------|------|-------|
| open | number | Count of accounts with status `open` |
| closed | number | Count of accounts with status `closed` |
| invalid | number | Count of accounts with status `invalid` |
| total | number | Total account count |

### TransactionDirectionSummary

**Source**: New interface in `src/views/flexx-apps/home/domain/`

Computed by partitioning `Transaction[]` by `direction`.

| Field | Type | Notes |
|-------|------|-------|
| creditTotal | number | Sum of credit transaction amounts |
| debitTotal | number | Sum of debit transaction amounts |
| creditCount | number | Count of credit transactions |
| debitCount | number | Count of debit transactions |

### PortfolioOverview

**Source**: New interface in `src/views/flexx-apps/home/domain/`

Computed from `Account[]` and `Transaction[]`.

| Field | Type | Notes |
|-------|------|-------|
| totalBalance | number | Sum of all account balances |
| totalAccounts | number | Count of all accounts |
| totalTransactions | number | Count of all transactions |

## State Transitions

No state transitions apply — this feature is read-only. All entities are fetched and displayed without modification.

## Validation Rules

No validation rules apply — this feature does not accept user input. Data is read from existing API responses.
