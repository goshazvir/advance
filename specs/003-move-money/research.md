# Research: Move Money

**Feature**: 003-move-money | **Date**: 2026-02-22

## R1: API Proxy Pattern for POST /move-money

**Decision**: Create `src/app/api/pages/move-money/route.ts` that proxies `POST` to backend `/move-money` endpoint.

**Rationale**: Follows established two-hop proxy pattern used by `src/app/api/pages/accounts/route.ts`. The client calls `/api/pages/move-money`, the server-side route proxies to the external backend with auth token.

**Alternatives considered**:
- Direct backend call from client — rejected, violates Constitution Principle I.

## R2: Form Component Pattern

**Decision**: Use React Hook Form with `Controller` + `FlexxTextField` (currency mode) + `FlexxAutocomplete` (for account dropdowns).

**Rationale**: Matches `CreateAccountForm.tsx` pattern exactly. `FlexxTextField` with `currency` prop provides `$` prefix + `react-number-format` formatting with 2-decimal precision. `FlexxAutocomplete` (or `FlexxTextField` with `select` + `options` props) provides dropdown with `SelectOption[]` items.

**Alternatives considered**:
- MUI `Select` directly — rejected, Constitution Principle III requires Flexx components.
- Custom dropdown — rejected, `FlexxAutocomplete` already exists.

## R3: Mutation & Data Freshness

**Decision**: `useMoveMoneyMutation` hook using `useMutation` from `react-query` v3. On success: invalidate `ACCOUNTS`, `ACCOUNT`, and `ACCOUNT_TRANSACTIONS` query keys.

**Rationale**: Constitution Principle II (NON-NEGOTIABLE) requires server-authoritative data post-mutation. Invalidating all three keys ensures: (1) account balances refresh on dashboard, (2) individual account balance refreshes in drawer, (3) transaction lists refresh to show new "Internal Transfer" entries.

**Alternatives considered**:
- Optimistic updates — rejected, explicitly prohibited for financial data.
- Invalidate only `ACCOUNTS` — rejected, `ACCOUNT` and `ACCOUNT_TRANSACTIONS` also affected.

## R4: Success Notification

**Decision**: Use `react-toastify`'s `toast.success()` for post-transfer notification.

**Rationale**: Already used in the codebase (`FlexxApiClientService.ts` uses `toast.error()`). No new dependency needed. Provides consistent UX.

**Alternatives considered**:
- MUI Snackbar — rejected, `react-toastify` already integrated.
- Custom notification — rejected, violates YAGNI.

## R5: Drawer Stacking (Account Drawer + Move Money Drawer)

**Decision**: Move Money drawer renders as a separate `DrawerWrapper` portal (`drawerWidth='md'`, 35vw). When opened from Account Drawer header, both drawers coexist — Account Drawer (`drawerWidth='lg'`, 55vw) remains open on the left, Move Money drawer opens on the right.

**Rationale**: MUI `Drawer` components are independently portaled. Multiple drawers naturally stack right-to-left. The Account Drawer at 55vw + Move Money at 35vw ≈ 90vw — both fit on screen.

**Alternatives considered**:
- Close Account Drawer before opening Move Money — rejected, contradicts UX requirement from spec (FR-002b).
- Single combined drawer — rejected, over-engineers a simple overlay.

## R6: Source Account Pre-fill from Account Drawer

**Decision**: `useMoveMoney` hook accepts optional `prefilledSourceAccount: Account` parameter. When provided, the source field renders as read-only text ("Account Name · Bank Name") instead of a dropdown. The `openDrawer` function accepts optional `Account` to enable this mode.

**Rationale**: Matches screenshot showing "Main Operating Account · Citibank" as static text when opened from Account Drawer header.

**Alternatives considered**:
- Pre-select in dropdown but keep editable — rejected, contradicts spec FR-002a (read-only text, not dropdown).

## R7: Account Dropdown Display Format

**Decision**: Dropdown options formatted as `SelectOption` with `label: "Account Name - Bank Name **XXXX"` (e.g., "Main Operating Account - Chase **4819"), `value: account_id`.

**Rationale**: Clarified in spec session — provides enough info to distinguish accounts without cluttering.

**Alternatives considered**:
- Account name only — rejected, ambiguous when user has multiple accounts at same bank.
- Include balance — rejected, unnecessary info for account selection.

## R8: Client-Side Balance Validation

**Decision**: Validate `amount <= sourceAccount.balance` on the client before submission. Display error via `FlexxTextField` validation error message.

**Rationale**: Balance data is already available from the accounts query. Provides instant feedback and prevents unnecessary API calls. Server-side validation exists as fallback.

**Alternatives considered**:
- Server-only validation — rejected, wastes API call for preventable error.
