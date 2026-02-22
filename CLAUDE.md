# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev              # Dev server (Next.js Turbo mode), http://localhost:3000
yarn build            # Production build
yarn test             # Runs: yarn lint && yarn ts
yarn lint             # ESLint
yarn lint:fix         # ESLint autofix
yarn fm:fix           # Prettier format
yarn ts               # TypeScript type check (--noEmit --incremental)
yarn generate:component          # Scaffold new component
yarn generate:view               # Scaffold new view (with hooks/domain dirs)
```

No test framework (Jest/Vitest) is configured. `yarn test` = lint + type-check only.

## Architecture

**Stack:** Next.js 16 (App Router, Turbo) + React 19 + TypeScript + MUI v5 + Tailwind CSS + React Query v3 (3.39.3)

### Routing

```
src/app/(client)/(dashboard)/home/page.tsx       -> /home
src/app/(client)/(dashboard)/accounts/page.tsx   -> /accounts
src/app/(client)/(dashboard)/layout.jsx          -> dashboard chrome (sidebar, nav, providers)
src/app/(client)/layout.tsx                      -> ReactQueryProvider wrapper
src/app/api/                                     -> API proxy routes to backend
```

Middleware redirects `/` to `/home`.

### API layer (two-hop proxy)

1. **Client** (`src/flexxApi/FlexxApiClientService.ts`) — fetch wrapper, calls `/api/...` (Next.js API routes)
2. **Server** (`src/app/api/FlexxNextApiService/`) — proxies to external backend, adds Bearer token

Add new API methods to `src/flexxApi/flexxApiService.ts` (singleton pattern: `flexxApiService().methodName()`).

### React Query v3 — IMPORTANT

This project uses **react-query v3** (NOT TanStack v4/v5). Imports:

```typescript
import {useQuery, useMutation, useQueryClient} from 'react-query';
```

- Query keys are defined in `src/QueryClient/queryClient.ids.ts` (enum `QueryClientIds`)
- QueryClient config: 3min stale time, 2 retries (`src/QueryClient/queryClient.tsx`)
- Provider: `src/components/ReactQueryProvider/ReactQueryProvider.tsx`

### State management

- **Server state** — React Query (`useQuery`)
- **Global client state** — React Context (`src/@core/contexts/`)
- **Local state** — `useState`

### Key component patterns

- **Tables** — always use `FlexxTable` (`src/components/FlexxTable/`). Define `FlexxColumn[]` + transform data to `FlexxTableRow[]` in a custom hook (e.g., `useAccountsDashboardTable`)
- **Drawers** — `DrawerWrapper` (`src/components/DrawerWrapper/`) + `useBoolean` for open/close + portaled to `document.body`
- **Text inputs** — never use MUI TextField directly, use `FlexxTextField` (`src/components/FlexxCustomTextInputs/`)
- **Loader** — use `AdvanceLoaderCenter` for full-screen loading
- **Forms** — React Hook Form + valibot for schema validation

### Feature file structure

```
src/views/flexx-apps/[feature]/
├── components/     # Feature UI
├── hooks/          # Business logic hooks
├── domain/         # TypeScript interfaces
└── Feature.tsx     # Entry component

src/components/[Name]/
├── Name.tsx
└── domain/         # Types
```

### Styling

MUI `sx` prop is primary for component styling. Tailwind for utility classes only (spacing, layout). Tailwind configured with `preflight: false` and `important: '#__next'` to avoid MUI conflicts. Design tokens defined as CSS custom properties in `src/app/globals.css` (`--advance-*`).

## ESLint rules to know

- `no-console: error` (allowed: `console.error` in hooks, `console.error` + `console.log` in route files)
- `@typescript-eslint/no-explicit-any: error`
- `no-nested-ternary: error`
- `unused-imports/no-unused-imports: error`
- `perfectionist/sort-imports` — order: style, type, [builtin/external], internal
- `prefer-destructuring` for objects

## Conventions

- All interactive components must have `'use client'` directive
- Hook naming: `use[Feature][Action]` (e.g., `useFetchAccounts`, `useCreateAccount`)
- Prefer `const` over `let`; prefer interfaces over types
- Use descriptive boolean vars: `isLoading`, `hasError`, `isOpen`
- Singleton API services: factory function pattern (`let instance = null; const service = () => {...}`)
- Ask before creating new directories/files or adding external libraries
- Do not use MUI TextInput — use FlexxTextField

## Domain types

- `Account`: `{account_id, name, routing_number, account_number, bank_name, bank_icon, status: AccountStatus, balance: number}` (`src/domain/Account.ts`)
- `AccountStatus`: `OPEN | CLOSED | INVALID`

## UI Reference Screenshots

Before implementing or modifying any page, **always review the corresponding screenshot** to match the expected layout, spacing, and component placement.

| Screenshot | Page / Feature |
|------------|---------------|
| `img.png` | **Account Drawer** — click account row to open drawer. Header: account name + status badge + bank name, masked account number (with eye toggle), routing number, balance. "Move Money" button in header. Transactions table below (Date, Merchant, Amount, Direction, Status columns) with pagination. |
| `img_1.png` | **Account Drawer (full view)** — same drawer overlaying the accounts list. Accounts table stays visible on the left, drawer takes right portion of the screen. |
| `img_2.png` | **Create Account drawer** — opens from "Add Account" CTA. Fields: Account Name, Bank Name, Routing Number, Account Number (all required). "Add Account" submit button at bottom. |
| `img_3.png` | **Move Money drawer** — opens from "Move Money" CTA on accounts dashboard. Fields: Source Account (dropdown), Destination Account (dropdown), Amount (dollar input). Checkbox: "I confirm this transfer". "Move Money" submit button (disabled until checkbox checked). |
| `img_4.png` | **Transactions Dashboard** — separate page (`/transactions` in sidebar nav). Search bar at top. Table columns: Date, Account, Merchant, Amount, Direction, Status. Pagination with "Rows per page" selector. Shows all transactions across all accounts. |

### Key UI details from screenshots:

- Account numbers are **masked** (`**3863`) with an eye icon to reveal
- Amounts use **superscript cents** format (`$4,647.07` with `.07` smaller)
- Status badges: `approved`, `pending` as text labels
- Direction column: `debit` / `credit`
- Sidebar nav items: Home, Accounts, Transactions
- Drawers open as right-side panels overlaying the page content
- "Add Account" and "Move Money" are **separate CTA buttons** on the accounts dashboard toolbar

## Backend API (Flexx Mock Provider v1.0.0)

Base URL: `https://internal-fe-mock-provider.r6zcf729z3zke.us-east-1.cs.amazonlightsail.com`
Swagger docs: `{base}/docs`  |  OpenAPI spec: `{base}/openapi.json`

Auth is stubbed (`'no-auth'` token). Session hardcoded as `AGENCY` tenant, `ADMIN` role.

All API routes go through the Next.js proxy (`src/app/api/`), so client code calls `/api/...` which forwards to the backend. When adding new endpoints, create both the API route handler AND the `flexxApiService` method.

### Endpoints

#### Accounts

| Method | Path | Description | Params / Body |
|--------|------|-------------|---------------|
| `GET` | `/account` | List Accounts | `?search_term=string` (optional query) |
| `POST` | `/account` | Create Account | Body: `{name, routing_number, account_number, bank_name, bank_icon, status, balance}` |
| `GET` | `/account/{account_id}` | Get Account | `account_id` (path, required) |
| `POST` | `/account/{account_id}` | Update Account | `account_id` (path) + Body: `{name, routing_number, account_number, bank_name, bank_icon, status, balance}` |

#### Transactions

| Method | Path | Description | Params / Body |
|--------|------|-------------|---------------|
| `GET` | `/account/{account_id}/transactions` | List Account Transactions | `account_id` (path, required), `?search_term=string` (optional) |
| `GET` | `/transaction` | List All Transactions | `?account_id=string` (optional), `?search_term=string` (optional) |
| `GET` | `/transaction/{transaction_id}` | Get Transaction | `transaction_id` (path, required) |

#### Money Movement

| Method | Path | Description | Body |
|--------|------|-------------|------|
| `POST` | `/move-money` | Move Money | `{source_account_id, destination_account_id, amount, merchant}` |

#### Utility

| Method | Path | Description | Response |
|--------|------|-------------|----------|
| `GET` | `/` | Root | `{status, service}` |
| `GET` | `/health` | Health check | `{status, service}` |
| `POST` | `/reset` | Reset User Data (deletes user-created accounts & transactions) | `{deleted_accounts, deleted_transactions, remaining_accounts, remaining_transactions}` |

### Response schemas

**Account:**
```json
{
  "account_id": "string",
  "name": "string",
  "routing_number": "string",
  "account_number": "string",
  "bank_name": "string",
  "bank_icon": "",
  "status": "open",
  "balance": 0,
  "user_created": false
}
```

**Transaction:**
```json
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
```

**Validation Error (422):**
```json
{
  "detail": [{"loc": ["string", 0], "msg": "string", "type": "string", "input": "string", "ctx": {}}]
}
```

### Key details:

- `direction` values: `"credit"` | `"debit"`
- `status` values for accounts: `"open"` | `"closed"` | `"invalid"`
- `status` values for transactions: `"pending"` | `"approved"`
- `account_name` field on transactions — populated when fetching all transactions (via `/transaction`), empty when fetching per-account
- `/move-money` returns an array of Transaction objects (the created transfer transactions)
- All list endpoints return arrays `[...]`, single-item endpoints return objects `{...}`

---

## CRITICAL: Data Freshness After Money Movements

**After ANY mutation that moves money, creates accounts, or modifies financial data, the UI MUST show fresh server data. Never use optimistic updates for financial operations.**

### Required pattern for all money-related mutations:

1. **Invalidate** the relevant query keys after mutation succeeds
2. **Refetch** — let React Query refetch from the server (do NOT manually set cache data)
3. **Verify** the UI reflects the latest server response (balances, transaction lists, account data)

```typescript
// CORRECT pattern — invalidate & refetch after mutation
const queryClient = useQueryClient();

const mutation = useMutation(
  (data) => flexxApiService().moveMoneyOrCreateOrWhatever(data),
  {
    onSuccess: () => {
      // Invalidate all affected queries — React Query will refetch automatically
      queryClient.invalidateQueries(QueryClientIds.ACCOUNTS);
      queryClient.invalidateQueries(QueryClientIds.TRANSACTIONS);
      // Add any other affected query keys
    },
  }
);
```

```typescript
// WRONG — never do this for financial data
const mutation = useMutation(fn, {
  onMutate: async (newData) => {
    // ❌ NO optimistic updates for money movements
    queryClient.setQueryData(key, optimisticData);
  },
});
```

### Screens that MUST reflect fresh data after money movements:

- Creator/account balance display
- Transactions list/table (account drawer + transactions dashboard)
- Payout history and status
- Any summary or aggregate showing monetary values

### Checklist for every financial mutation:

- [ ] `invalidateQueries` called for ALL affected query keys in `onSuccess`
- [ ] No `onMutate` optimistic cache manipulation for money data
- [ ] UI shows loading/refetching state while fresh data loads
- [ ] After refetch completes, balances and transaction lists match server state
