# Tasks: Move Money

**Input**: Design documents from `/specs/003-move-money/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: No test tasks — no test framework configured. Validation via `yarn lint` + `yarn ts`.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Domain Types)

**Purpose**: Create shared TypeScript interfaces used across all stories

- [x] T001 [P] Create MoveMoneyPayload interface in `src/domain/MoveMoneyPayload.ts` — fields: `source_account_id: string`, `destination_account_id: string`, `amount: number`, `merchant: string`. Export the interface.
- [x] T002 [P] Create MoveMoneyFormValues interface and defaults in `src/views/accounts/domain/MoveMoneyForm.types.ts` — fields: `source_account_id: string` (default ""), `destination_account_id: string` (default ""), `amount: string` (default ""), `confirmed: boolean` (default false). Export interface, default values object, and any helper types.

---

## Phase 2: Foundational (API Layer)

**Purpose**: API proxy route + service method + mutation hook — MUST complete before any user story

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Create Next.js API proxy route in `src/app/api/pages/move-money/route.ts` — export `POST` handler that reads `req.json()` body and proxies via `flexxNextApiService().post({url: 'move-money', req, body})`. Add `export const dynamic = 'force-dynamic'`. Follow pattern from `src/app/api/pages/accounts/route.ts`.
- [x] T004 Add `moveMoney()` method to `src/flexxApi/flexxApiService.ts` — accepts `MoveMoneyPayload`, returns `Promise<Transaction[]>`, calls `post<Transaction[]>({endpoint: 'pages/move-money', body: payload})`. Import `MoveMoneyPayload` from domain, `Transaction` from domain.
- [x] T005 Create `useMoveMoneyMutation` hook in `src/views/accounts/hooks/useMoveMoneyMutation.tsx` — uses `useMutation` from `'react-query'` to call `flexxApiService().moveMoney(payload)`. On success: invalidate `QueryClientIds.ACCOUNTS`, `QueryClientIds.ACCOUNT`, `QueryClientIds.ACCOUNT_TRANSACTIONS` via `useQueryClient()`. Accept `options?: { onSuccess?: (data: Transaction[]) => void; onError?: (error: Error) => void }`. Return `{ mutate, isLoading }`. Follow pattern from `useCreateAccountMutation.tsx`.

**Checkpoint**: API layer ready — mutation can be called from any component

---

## Phase 3: User Story 1 — Transfer Money Between Accounts (Priority: P1) MVP

**Goal**: User can open Move Money drawer from dashboard CTA or Account Drawer header, fill in source/destination/amount, confirm, and submit a transfer. Data refreshes after success.

**Independent Test**: Open drawer → select two accounts → enter amount → check confirm → click "Move Money" → transfer succeeds, drawer closes, balances update.

### Implementation for User Story 1

- [x] T006 [US1] Create MoveMoneyForm component in `src/views/accounts/components/MoveMoneyForm.tsx` — `'use client'` directive. Props: `isOpen: boolean`, `onSuccess?: () => void`, `prefilledSourceAccount?: Account | null`. Uses `useForm<MoveMoneyFormValues>` with default values from T002. Form fields: (1) Source Account — if `prefilledSourceAccount` provided, render as read-only `Typography` showing "Account Name · Bank Name"; otherwise render `Controller` with `FlexxTextField` using `select` + `options` props, options formatted as `SelectOption[]` with `label: "Name - Bank **XXXX"`, `value: account_id`, filtered to accounts with `status === 'open'`. (2) Destination Account — same dropdown pattern, filtered to open accounts. (3) Amount — `Controller` with `FlexxTextField` using `currency` prop, `placeholder="Enter amount"`. (4) "I confirm this transfer" — `Controller` with MUI `Checkbox` + `FormControlLabel`. (5) "Move Money" submit `Button` (variant `contained`, fullWidth). On submit: transform `MoveMoneyFormValues` → `MoveMoneyPayload` (parse amount string to number, set `merchant: "Internal Transfer"`, use `prefilledSourceAccount.account_id` if pre-filled), call `useMoveMoneyMutation.mutate()`. Fetch accounts via `useFetchAccounts()` for dropdown data.
- [x] T007 [US1] Create `useMoveMoney` hook in `src/views/accounts/hooks/useMoveMoney.tsx` — `useBoolean` for drawer open/close state. `openDrawer` function accepts optional `Account` parameter to set `prefilledSourceAccount` state (via `useState<Account | null>(null)`). `closeDrawer` clears the pre-filled account. Returns `{ isOpen, openDrawer, closeDrawer, MoveMoneyDrawer }` where `MoveMoneyDrawer` is a `useMemo` portal wrapping `DrawerWrapper` (drawerWidth `'md'`, removePaddingBottom, close action icon) containing `MoveMoneyForm` with `isOpen`, `onSuccess` (calls closeDrawer), and `prefilledSourceAccount`. Portal to `document.body`. Follow pattern from `useCreateAccount.tsx`.
- [x] T008 [US1] Add "Move Money" CTA button to `src/views/accounts/components/AccountsCtas.tsx` — add second `ActionButtonConfig` to `actions` array: `name: 'Move Money'`, `variant: 'outlined'`, `onClick: openMoveMoney`, `startIcon: 'fluent--arrow-swap-20-regular'`. Receive `onMoveMoneyClick` via props. Render `{MoveMoneyDrawer}` alongside `{CreateAccountDrawer}`. Update `AccountsCtasProps` interface to accept `onMoveMoneyClick` and `MoveMoneyDrawer` (ReactNode).
- [x] T009 [US1] Integrate `useMoveMoney` in `src/app/(client)/(dashboard)/accounts/page.tsx` — call `useMoveMoney()` hook. Pass `openDrawer` to `AccountsCtas` as `onMoveMoneyClick` and `MoveMoneyDrawer` as portal. Pass `openDrawer` (with Account param) to `AccountDrawerHeader` via prop drilling through `AccountsDashboardTable` → `AccountDrawer` → `AccountDrawerHeader`.
- [x] T010 [US1] Wire "Move Money" button in `src/views/accounts/components/AccountDrawerHeader.tsx` — accept `onMoveMoneyClick?: (account: Account) => void` prop. Add `onClick={() => onMoveMoneyClick?.(account)}` to the existing "Move Money" `Button`. Thread the prop through parent components: `AccountDrawer.tsx` receives and passes to `AccountDrawerHeader`, `AccountsDashboardTable.tsx` receives and passes to `AccountDrawer` via the portal.

**Checkpoint**: Full transfer flow works from both dashboard CTA and Account Drawer header. MVP complete.

---

## Phase 4: User Story 2 — Form Validation and Error Prevention (Priority: P2)

**Goal**: Invalid transfers are blocked client-side. Same-account selection prevented. Amount validated against balance. Submit button disabled until form is valid.

**Independent Test**: Try submitting with missing fields → blocked. Select same account → prevented. Enter amount > balance → error shown. Enter 0 or negative → error. Uncheck confirm → button disabled.

### Implementation for User Story 2

- [x] T011 [US2] Add same-account prevention to MoveMoneyForm in `src/views/accounts/components/MoveMoneyForm.tsx` — filter the destination dropdown `options` to exclude the currently selected `source_account_id`. Use `useWatch` on `source_account_id` to reactively filter. If source changes and destination matches, reset destination to empty string.
- [x] T012 [US2] Add amount validation rules to MoveMoneyForm in `src/views/accounts/components/MoveMoneyForm.tsx` — add `rules` to amount `Controller`: required ("Amount is required"), custom validate: amount must be > 0 ("Amount must be greater than zero"), amount must be <= selected source account balance ("Amount exceeds available balance"). Look up source account balance from accounts data using the selected `source_account_id`. Display errors via `FlexxTextField` `externalError` and `externalHelperText` props.
- [x] T013 [US2] Disable "Move Money" submit button in `src/views/accounts/components/MoveMoneyForm.tsx` — button `disabled` when: `!formState.isValid` OR `!confirmed` (watched via `useWatch`) OR `isLoading`. Use `useWatch({ control, name: 'confirmed' })` to track checkbox state. Ensure all `Controller` rules are set so `formState.isValid` reflects all validations.

**Checkpoint**: All invalid submissions blocked client-side. 100% of invalid inputs prevented before API call.

---

## Phase 5: User Story 3 — Drawer Interaction and Feedback (Priority: P3)

**Goal**: Loading states during submission, server error display, form reset on close/reopen, success toast notification.

**Independent Test**: Submit → see loading indicator. Trigger server error → see error in drawer, can retry. Close and reopen → form is empty. Successful transfer → toast appears.

### Implementation for User Story 3

- [x] T014 [US3] Add loading state to MoveMoneyForm in `src/views/accounts/components/MoveMoneyForm.tsx` — when `isLoading` from mutation is true: submit button shows "Transferring..." text (or CircularProgress), all form fields disabled. Button disabled via `isLoading` flag (already partially done in T013).
- [x] T015 [US3] Add server error display to MoveMoneyForm in `src/views/accounts/components/MoveMoneyForm.tsx` — add `useState<string | null>(null)` for `serverError`. In mutation `onError`: set `serverError(error.message || 'Transfer failed. Please try again.')`. Render `Alert severity='error'` above form fields when `serverError` is set. Clear `serverError` on new submit attempt. Follow pattern from `CreateAccountForm.tsx`.
- [x] T016 [US3] Add form reset on drawer close/reopen in `src/views/accounts/components/MoveMoneyForm.tsx` — add `useEffect` watching `isOpen` prop: when `isOpen` changes, call `reset(defaultValues)` and `setServerError(null)`. Follow pattern from `CreateAccountForm.tsx`.
- [x] T017 [US3] Add success toast notification in `src/views/accounts/hooks/useMoveMoneyMutation.tsx` or `MoveMoneyForm.tsx` — after successful mutation, call `toast.success('Transfer completed successfully')` from `react-toastify`. Place in mutation `onSuccess` callback chain (either in the hook or in the form's `onSuccess` handler).

**Checkpoint**: Full UX polish complete. Loading, errors, reset, and success toast all working.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify quality gates and cross-cutting requirements

- [x] T018 Run `yarn lint` and fix any ESLint errors across all new/modified files
- [x] T019 Run `npx tsc --noEmit` and fix any TypeScript errors across all new/modified files
- [x] T020 Manual testing per `specs/003-move-money/quickstart.md` checklist — verify all 8 test scenarios pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately. T001 and T002 are parallel.
- **Foundational (Phase 2)**: T003 and T004 depend on T001. T005 depends on T004. BLOCKS all user stories.
- **US1 (Phase 3)**: Depends on Phase 2 completion. T006 depends on T002 + T005. T007 depends on T006. T008-T010 depend on T007.
- **US2 (Phase 4)**: Depends on US1 (Phase 3) completion — adds validation to existing form.
- **US3 (Phase 5)**: Depends on US1 (Phase 3) completion — adds UX polish to existing form. Can run in parallel with US2.
- **Polish (Phase 6)**: Depends on all user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Depends on Foundational (Phase 2) — core transfer flow, MVP
- **US2 (P2)**: Depends on US1 — adds validation to existing MoveMoneyForm
- **US3 (P3)**: Depends on US1 — adds loading/error/reset to existing MoveMoneyForm. Can run in parallel with US2 since they modify different concerns in the same file.

### Within Each User Story

- Domain types before services/hooks
- Hooks before components that use them
- Components before page integration
- Core logic before integration wiring

### Parallel Opportunities

- T001 and T002 can run in parallel (different files, no dependencies)
- T014 and T015 can run in parallel (different concerns in same file, but best done sequentially to avoid conflicts)
- US2 and US3 can conceptually run in parallel (different validation vs UX concerns), but both modify `MoveMoneyForm.tsx` so sequential is safer

---

## Parallel Example: Phase 1 Setup

```bash
# Launch both domain type files together:
Task: "Create MoveMoneyPayload interface in src/domain/MoveMoneyPayload.ts"
Task: "Create MoveMoneyFormValues interface in src/views/accounts/domain/MoveMoneyForm.types.ts"
```

## Parallel Example: User Story 1

```bash
# After T006 (form component) is created, T007 (hook) can start.
# After T007 is done, T008+T009+T010 integration tasks are sequential
# (they thread props through the component tree).
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002) — ~5 min
2. Complete Phase 2: Foundational API Layer (T003-T005) — ~15 min
3. Complete Phase 3: User Story 1 (T006-T010) — ~45 min
4. **STOP and VALIDATE**: Test transfer flow end-to-end
5. Deploy/demo if ready — users can already move money

### Incremental Delivery

1. Setup + Foundational → API layer ready
2. Add US1 → Transfer works → Deploy (MVP!)
3. Add US2 → Validation prevents errors → Deploy
4. Add US3 → Loading/error/reset polish → Deploy
5. Polish → Lint + type check clean → Final deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No test framework configured — validation via `yarn lint` + `yarn ts` + manual testing
- Constitution Principle II: NO optimistic updates in mutation hook — invalidate queries only
- `react-toastify` already in project — use `toast.success()` for notifications
- `FlexxTextField` with `currency` prop handles `$` prefix and number formatting
- `FlexxTextField` with `select` + `options` props handles dropdowns
- Commit after each phase completion
