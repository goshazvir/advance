# Quickstart: Create Account

**Feature**: 002-create-account | **Date**: 2026-02-22

## Prerequisites

- Node.js, Yarn installed
- Backend API running (or accessible at configured URL)
- `yarn install` completed

## Development

```bash
yarn dev                    # Start dev server at http://localhost:3000
```

Navigate to `/accounts` to see the accounts dashboard with the "Add Account" button.

## Files to Modify/Create

### Modified files (6):
1. `src/app/api/pages/accounts/route.ts` — Add POST handler
2. `src/flexxApi/flexxApiService.ts` — Add `createAccount()` method
3. `src/views/accounts/components/CreateAccountForm.tsx` — Replace placeholder with form
4. `src/views/accounts/hooks/useCreateAccount.tsx` — Accept onSuccess callback
5. `src/views/accounts/components/AccountsCtas.tsx` — Pass onAccountCreated prop
6. `src/app/(client)/(dashboard)/accounts/page.tsx` — Orchestrate create→detail drawer flow

### New files (1):
1. `src/views/accounts/hooks/useCreateAccountMutation.tsx` — useMutation hook

## Verification

```bash
yarn lint                   # ESLint — zero errors
npx tsc --noEmit            # TypeScript — zero errors
```

Manual testing:
1. Open `/accounts` page
2. Click "Add Account" button → drawer opens with form
3. Submit empty form → validation errors appear
4. Fill all 4 fields, click "Add Account" → account created
5. Create drawer closes → account detail drawer opens with new account
6. Accounts list shows the new account

## Key Patterns to Follow

- **Form**: `useForm()` + `Controller` + `FlexxTextField` + `buildValidationRules()`
- **Mutation**: `useMutation` from `'react-query'` (v3 import!)
- **Cache**: `invalidateQueries(QueryClientIds.ACCOUNTS)` in `onSuccess`
- **Drawer**: `DrawerWrapper` + `useBoolean` + `ReactDOM.createPortal`
- **API**: Two-hop proxy — client → Next.js route → backend
