# API Route Contracts: Account Drawer

## GET /api/pages/accounts/[accountId]

**Next.js route**: `src/app/api/pages/accounts/[accountId]/route.ts`
**Proxies to**: `GET /account/{account_id}`

**Request**:
- Method: GET
- Path param: `accountId` (string)

**Response 200**: `Account`
```json
{
  "account_id": "string",
  "name": "string",
  "routing_number": "string",
  "account_number": "string",
  "bank_name": "string",
  "bank_icon": "string",
  "status": "open",
  "balance": 0,
  "user_created": false
}
```

**Error 422**: Validation error (invalid account_id)

---

## GET /api/pages/accounts/[accountId]/transactions

**Next.js route**: `src/app/api/pages/accounts/[accountId]/transactions/route.ts`
**Proxies to**: `GET /account/{account_id}/transactions`

**Request**:
- Method: GET
- Path param: `accountId` (string)
- Query param (optional): `search_term` (string)

**Response 200**: `Transaction[]`
```json
[
  {
    "transaction_id": "string",
    "merchant": "string",
    "amount": 0,
    "direction": "credit",
    "created_at": "string",
    "account_id": "string",
    "status": "pending",
    "extra_data": {},
    "user_created": false,
    "account_name": ""
  }
]
```

**Error 422**: Validation error (invalid account_id)

---

## flexxApiService Methods

### fetchAccount(accountId: string): Promise<Account>

**Client call**: `flexxApiService().fetchAccount(accountId)`
**HTTP**: `GET /api/pages/accounts/${accountId}`
**Returns**: Single `Account` object

### fetchAccountTransactions(accountId: string, params?: { search_term?: string }): Promise<Transaction[]>

**Client call**: `flexxApiService().fetchAccountTransactions(accountId, params)`
**HTTP**: `GET /api/pages/accounts/${accountId}/transactions?${queryParams}`
**Returns**: Array of `Transaction` objects
