# Data Model: Move Money

**Feature**: 003-move-money | **Date**: 2026-02-22

## New Entities

### MoveMoneyPayload

Represents the request body sent to `POST /move-money`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| source_account_id | string | Yes | ID of the account to debit |
| destination_account_id | string | Yes | ID of the account to credit |
| amount | number | Yes | Transfer amount in dollars (> 0, <= source balance) |
| merchant | string | Yes | Auto-populated as "Internal Transfer" |

**Location**: `src/domain/MoveMoneyPayload.ts`

### MoveMoneyFormValues

Represents the form state managed by React Hook Form.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| source_account_id | string | Yes | "" | Selected source account ID |
| destination_account_id | string | Yes | "" | Selected destination account ID |
| amount | string | Yes | "" | Amount as string (formatted by react-number-format) |
| confirmed | boolean | Yes | false | "I confirm this transfer" checkbox state |

**Location**: `src/views/accounts/domain/MoveMoneyForm.types.ts`

**Transformation**: `MoveMoneyFormValues` → `MoveMoneyPayload`:
- `amount`: parse string to number (remove formatting)
- `merchant`: hardcode `"Internal Transfer"`
- `confirmed`: not sent to API (client-only gate)

## Existing Entities (referenced, not modified)

### Account

**Location**: `src/domain/Account.ts`

Used for:
- Populating source/destination dropdowns (filtered to `status === 'open'`)
- Displaying account info in dropdown format: `"Name - Bank **XXXX"`
- Client-side balance validation (`amount <= account.balance`)

### Transaction

**Location**: `src/domain/Transaction.ts`

Used for:
- API response type from `POST /move-money` (returns `Transaction[]`)
- Invalidated after mutation to show new "Internal Transfer" entries

## Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| source_account_id | Required, must be a valid account ID | "Source account is required" |
| destination_account_id | Required, must differ from source | "Destination account is required" / "Source and destination must be different" |
| amount | Required, > 0, <= source account balance | "Amount is required" / "Amount must be greater than zero" / "Amount exceeds available balance" |
| confirmed | Must be true before submit | (button disabled, no error message) |

## Query Key Impact

After successful `POST /move-money`:

| Query Key | Action | Reason |
|-----------|--------|--------|
| `QueryClientIds.ACCOUNTS` | Invalidate | Balances changed on both accounts |
| `QueryClientIds.ACCOUNT` | Invalidate | Individual account balance changed |
| `QueryClientIds.ACCOUNT_TRANSACTIONS` | Invalidate | New "Internal Transfer" transactions created |
