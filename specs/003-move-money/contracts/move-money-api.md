# API Contract: Move Money

**Feature**: 003-move-money | **Date**: 2026-02-22

## POST /api/pages/move-money

Next.js API route that proxies to backend `POST /move-money`.

### Request

```typescript
interface MoveMoneyPayload {
  source_account_id: string;
  destination_account_id: string;
  amount: number;
  merchant: string; // "Internal Transfer"
}
```

**Example**:
```json
{
  "source_account_id": "acc_123",
  "destination_account_id": "acc_456",
  "amount": 500.00,
  "merchant": "Internal Transfer"
}
```

### Response 200

```typescript
Transaction[] // Array of created transactions (debit + credit)
```

**Example**:
```json
[
  {
    "transaction_id": "txn_001",
    "merchant": "Internal Transfer",
    "amount": 500.00,
    "direction": "debit",
    "created_at": "2026-02-22T12:00:00Z",
    "account_id": "acc_123",
    "status": "pending",
    "extra_data": {},
    "user_created": false
  },
  {
    "transaction_id": "txn_002",
    "merchant": "Internal Transfer",
    "amount": 500.00,
    "direction": "credit",
    "created_at": "2026-02-22T12:00:00Z",
    "account_id": "acc_456",
    "status": "pending",
    "extra_data": {},
    "user_created": false
  }
]
```

### Response 422

```json
{
  "detail": [
    {
      "loc": ["body", "amount"],
      "msg": "Amount must be greater than zero",
      "type": "value_error"
    }
  ]
}
```

## Client-Side Service Method

```typescript
// In flexxApiService.ts
async moveMoney(payload: MoveMoneyPayload): Promise<Transaction[]> {
  return post<Transaction[]>({endpoint: 'pages/move-money', body: payload});
}
```

## Post-Mutation Side Effects

After successful response, the client MUST:
1. `queryClient.invalidateQueries(QueryClientIds.ACCOUNTS)`
2. `queryClient.invalidateQueries(QueryClientIds.ACCOUNT)`
3. `queryClient.invalidateQueries(QueryClientIds.ACCOUNT_TRANSACTIONS)`
4. `toast.success('Transfer completed successfully')`
5. Close the Move Money drawer
