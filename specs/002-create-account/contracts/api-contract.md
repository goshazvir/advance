# API Contract: Create Account

**Feature**: 002-create-account | **Date**: 2026-02-22

## Next.js API Route (client → proxy)

### `POST /api/pages/accounts`

**File**: `src/app/api/pages/accounts/route.ts`

**Request**:
```json
{
  "name": "string",
  "routing_number": "string",
  "account_number": "string",
  "bank_name": "string",
  "bank_icon": "string",
  "status": "open",
  "balance": 0
}
```

**Response 200**: `Account` object
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
  "user_created": true
}
```

**Error 422**: Validation error
```json
{
  "detail": [
    {
      "loc": ["string", 0],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

## Backend Endpoint (proxy → external)

### `POST /account`

Proxied by Next.js API route. Same request/response schema as above. Auth header (`Bearer token`) added by `FlexxNextApiService`.

## Client Service Method

### `flexxApiService().createAccount(payload)`

**File**: `src/flexxApi/flexxApiService.ts`

**Signature**:
```typescript
async createAccount(payload: CreateAccountPayload): Promise<Account>
```

**Calls**: `post<Account>({endpoint: 'pages/accounts', body: payload})`

## React Query Mutation Hook

### `useCreateAccountMutation(options)`

**File**: `src/views/accounts/hooks/useCreateAccountMutation.tsx`

**Pattern**:
```typescript
useMutation(
  (payload: CreateAccountPayload) => flexxApiService().createAccount(payload),
  {
    onSuccess: (data: Account) => {
      queryClient.invalidateQueries(QueryClientIds.ACCOUNTS);
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  }
)
```

**Returns**: `{ mutate, isLoading }` — `mutate(payload)` triggers creation, `isLoading` disables submit button.
