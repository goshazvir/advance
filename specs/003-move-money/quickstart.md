# Quickstart: Move Money

**Feature**: 003-move-money | **Date**: 2026-02-22

## Prerequisites

- Node.js + Yarn installed
- `yarn install` completed
- Dev server running: `yarn dev` (http://localhost:3000)
- Backend API available (auto-proxied via Next.js API routes)

## Implementation Order

### 1. API Layer (backend → frontend)

1. Create `src/domain/MoveMoneyPayload.ts` — interface for API request
2. Create `src/app/api/pages/move-money/route.ts` — proxy route handler
3. Add `moveMoney()` method to `src/flexxApi/flexxApiService.ts`

### 2. Mutation Hook

4. Create `src/views/accounts/hooks/useMoveMoneyMutation.tsx` — `useMutation` + `invalidateQueries` on success

### 3. Form & Drawer

5. Create `src/views/accounts/domain/MoveMoneyForm.types.ts` — form values type + defaults
6. Create `src/views/accounts/components/MoveMoneyForm.tsx` — React Hook Form with dropdowns, amount, checkbox
7. Create `src/views/accounts/hooks/useMoveMoney.tsx` — drawer state + portal (accepts optional pre-filled source account)

### 4. Integration

8. Modify `src/views/accounts/components/AccountsCtas.tsx` — add "Move Money" CTA button
9. Modify `src/views/accounts/components/AccountDrawerHeader.tsx` — wire existing "Move Money" button onClick
10. Modify `src/app/(client)/(dashboard)/accounts/page.tsx` — integrate `useMoveMoney` hook, pass handlers down

## Verification

```bash
yarn lint        # Zero ESLint errors
yarn ts          # Zero TypeScript errors (or: npx tsc --noEmit)
```

### Manual Testing Checklist

- [ ] Click "Move Money" on dashboard toolbar → drawer opens with empty form
- [ ] Select source account → dropdown shows "Name - Bank **XXXX" format
- [ ] Select destination account → same account as source is prevented
- [ ] Enter amount > source balance → validation error shown
- [ ] Enter valid amount, check "I confirm this transfer", click "Move Money" → success toast, drawer closes
- [ ] Account balances refresh after transfer (no manual reload needed)
- [ ] Open Account Drawer → click "Move Money" in header → both drawers visible, source pre-filled as read-only
- [ ] Close and reopen drawer → form resets to empty state

## Key Patterns to Follow

- **Form**: See `CreateAccountForm.tsx` for React Hook Form + Controller pattern
- **Drawer hook**: See `useCreateAccount.tsx` for DrawerWrapper + portal pattern
- **Mutation**: See `useCreateAccountMutation.tsx` for useMutation + invalidation pattern
- **Toast**: `import { toast } from 'react-toastify'` → `toast.success('Transfer completed successfully')`
