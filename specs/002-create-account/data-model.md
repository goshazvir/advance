# Data Model: Create Account

**Feature**: 002-create-account | **Date**: 2026-02-22

## Entities

### Account (existing — no changes)

Defined in `src/domain/Account.ts`.

| Field | Type | Notes |
|-------|------|-------|
| `account_id` | `string` | Server-generated UUID |
| `name` | `string` | Display name (user input) |
| `routing_number` | `string` | Bank routing identifier (user input) |
| `account_number` | `string` | Unique account identifier (user input) |
| `bank_name` | `string` | Financial institution name (user input) |
| `bank_icon` | `string` | Icon URL (defaulted to `''` on creation) |
| `status` | `AccountStatus` | Enum: `OPEN` / `CLOSED` / `INVALID` (defaulted to `'open'` on creation) |
| `balance` | `number` | Account balance (defaulted to `0` on creation) |
| `user_created` | `boolean` | Server-set flag |

### CreateAccountPayload (new interface)

To be defined in `src/views/accounts/domain/` or inline in the mutation hook.

| Field | Type | Required | Source |
|-------|------|----------|--------|
| `name` | `string` | Yes | User input — "Account Name" field |
| `bank_name` | `string` | Yes | User input — "Bank Name" field |
| `routing_number` | `string` | Yes | User input — "Routing Number" field |
| `account_number` | `string` | Yes | User input — "Account Number" field |
| `bank_icon` | `string` | No | Hardcoded `''` |
| `status` | `string` | No | Hardcoded `'open'` |
| `balance` | `number` | No | Hardcoded `0` |

### CreateAccountFormValues (new interface)

Used by React Hook Form — only the 4 user-editable fields.

| Field | Type | Validation |
|-------|------|------------|
| `name` | `string` | Required, non-empty |
| `bank_name` | `string` | Required, non-empty |
| `routing_number` | `string` | Required, non-empty |
| `account_number` | `string` | Required, non-empty |

## State Transitions

```
[No Account] --POST /account--> Account (status: "open", balance: 0)
```

No state transitions within this feature — newly created accounts always start as `open` with zero balance.

## Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| Account Name | Non-empty after trim | "This field is required." |
| Bank Name | Non-empty after trim | "This field is required." |
| Routing Number | Non-empty after trim | "This field is required." |
| Account Number | Non-empty after trim | "This field is required." |

All validations use `buildValidationRules({required: true})` from `FlexxTextFieldValidators`.

## Query Keys

| Key | Enum Value | Invalidated After |
|-----|------------|-------------------|
| `QueryClientIds.ACCOUNTS` | `'fetch_accounts'` | Account creation success |
