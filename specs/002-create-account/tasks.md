# Tasks: Create Account

**Input**: Design documents from `/specs/002-create-account/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No test framework configured. Verification via `yarn lint` + `npx tsc --noEmit` + manual testing.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Foundational (API Layer)

**Purpose**: Create the API proxy route and client service method that ALL user stories depend on. Must complete before any form implementation.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T001 [P] Add POST handler to existing API route. Read request body with `req.json()`, forward via `flexxNextApiService().post({url: 'account', req, body})`. Export `POST` alongside existing `GET` in `src/app/api/pages/accounts/route.ts`
- [x] T002 [P] Add `createAccount(payload: CreateAccountPayload)` method to `FlexxApiService` class. Uses `post<Account>({endpoint: 'pages/accounts', body: payload})`. Define `CreateAccountPayload` interface (name, routing_number, account_number, bank_name, bank_icon, status, balance) in `src/flexxApi/flexxApiService.ts`
- [x] T003 Create `useCreateAccountMutation` hook. Uses `useMutation` from `'react-query'` (v3!), calls `flexxApiService().createAccount()`, invalidates `QueryClientIds.ACCOUNTS` in `onSuccess`, accepts optional `onSuccess(data: Account)` and `onError(error: Error)` callbacks. Returns `{mutate, isLoading}` in `src/views/accounts/hooks/useCreateAccountMutation.tsx`

**Checkpoint**: API layer ready — `POST /api/pages/accounts` proxies to backend, `flexxApiService().createAccount()` available, mutation hook ready for use.

---

## Phase 2: User Story 1 — Create a New Account (Priority: P1) 🎯 MVP

**Goal**: User clicks "Add Account" → drawer opens with form → fills 4 fields → clicks "Add Account" submit → account created → create drawer closes → account detail drawer opens showing new account → accounts list refreshes.

**Independent Test**: Click "Add Account", fill Account Name / Bank Name / Routing Number / Account Number, submit. New account appears in list and detail drawer auto-opens.

### Implementation for User Story 1

- [x] T004 [P] [US1] Rewrite `CreateAccountForm` placeholder with full form implementation. Use `useForm<CreateAccountFormValues>()` from react-hook-form. Add 4 `Controller` + `FlexxTextField` fields (Account Name with `label="Account Name"`, Bank Name with `label="Bank Name"`, Routing Number with `label="Routing Number"`, Account Number with `label="Account Number"`), each with `rules={buildValidationRules({required: true})}` and `externalError={!!fieldState.error}` / `externalHelperText={fieldState.error?.message}`. Add "Add Account" MUI `Button` at bottom that calls `handleSubmit`. On submit, map form values to `CreateAccountPayload` (add `bank_icon: ''`, `status: 'open'`, `balance: 0`) and call `mutate()`. Accept `onSuccess` and `onClose` props. Define `CreateAccountFormValues` interface (name, bank_name, routing_number, account_number) in `src/views/accounts/components/CreateAccountForm.tsx`
- [x] T005 [P] [US1] Modify `AccountsDashboardTable` to accept `openAccountDrawer` function and `AccountDrawerPortal` ReactNode as props from parent instead of using internal `useAccountDrawer()`. Remove internal `useAccountDrawer()` call, use props instead in `src/views/accounts/components/AccountsDashboardTable.tsx`
- [x] T006 [P] [US1] Modify `AccountsCtas` to accept `onAccountCreated` callback prop (type: `(accountId: string) => void`). Pass it through `useCreateAccount` hook. Remove internal `useCreateAccount()` and accept `CreateAccountDrawer` and `openCreateDrawer` as props, OR pass `onAccountCreated` into `useCreateAccount` which forwards to `CreateAccountForm` in `src/views/accounts/components/AccountsCtas.tsx`
- [x] T007 [US1] Modify `useCreateAccount` hook to accept `onSuccess?: (account: Account) => void` option. On successful mutation in `CreateAccountForm`, call `closeDrawer()` then `onSuccess(createdAccount)`. Pass `onSuccess` and `closeDrawer` as props to `CreateAccountForm` in `src/views/accounts/hooks/useCreateAccount.tsx`
- [x] T008 [US1] Refactor `accounts/page.tsx` to orchestrate create→detail drawer flow. Lift `useAccountDrawer()` to page level. Pass `openDrawer` and `AccountDrawerPortal` down to `AccountsDashboardTable`. Create `onAccountCreated` callback that calls `accountDrawer.openDrawer(accountId)`. Pass `onAccountCreated` to `AccountsCtas`. Result: after account creation, create drawer closes, detail drawer auto-opens for new account, and accounts list refetches via cache invalidation in `src/app/(client)/(dashboard)/accounts/page.tsx`

**Checkpoint**: User Story 1 fully functional — user can create account, see it in list, and detail drawer auto-opens.

---

## Phase 3: User Story 2 — Form Validation (Priority: P2)

**Goal**: Required field validation errors appear on submit, only empty fields show errors, errors clear when corrected. Submit button shows loading state during API call. Server errors displayed in drawer.

**Independent Test**: Open drawer, click "Add Account" without filling fields — all 4 show "This field is required." error. Fill one field, submit again — only 3 show errors. Fill all, submit — loading spinner on button. If server error — error message shows, form data preserved.

### Implementation for User Story 2

- [x] T009 [US2] Enhance `CreateAccountForm` with loading/error states. Disable "Add Account" button and show loading indicator while `isLoading` from mutation is true (FR-007). Add MUI `Alert` component (severity="error") above form fields to display server error message when mutation fails. Keep form data intact on error (FR-010). Use `useState` for error message, set in mutation `onError`, clear on next submit attempt in `src/views/accounts/components/CreateAccountForm.tsx`

**Checkpoint**: Validation UX complete — errors display correctly, loading state prevents duplicate submissions, server errors shown inline.

---

## Phase 4: User Story 3 — Close Drawer Without Saving (Priority: P3)

**Goal**: User can close the drawer via X button without creating an account. Form data is discarded and reset when drawer reopens.

**Independent Test**: Open drawer, type in fields, click X — drawer closes, no account created. Reopen drawer — fields are empty.

### Implementation for User Story 3

- [x] T010 [US3] Add form reset when drawer closes/reopens. Call `form.reset()` when the create drawer opens (use `useEffect` watching `isOpen` from parent, or reset on mount via RHF `useForm` defaults). Ensure server error state is also cleared on reopen. This prevents stale form data from persisting across open/close cycles in `src/views/accounts/components/CreateAccountForm.tsx`

**Checkpoint**: Cancel/close UX complete — drawer closes cleanly, form resets on reopen.

---

## Phase 5: Polish & Verification

**Purpose**: Final quality gates and cross-cutting validation

- [x] T011 Run `yarn lint` and fix any ESLint errors across all modified files. Ensure import ordering follows `perfectionist/sort-imports` rules, no unused imports, no `console.log` outside route files, `'use client'` on all interactive components
- [x] T012 Run `npx tsc --noEmit` and fix any TypeScript errors. Verify all new interfaces are properly typed, no `any` usage, all props correctly defined
- [x] T013 Manual testing per quickstart.md verification steps: (1) Open /accounts, (2) Click "Add Account" → drawer opens, (3) Submit empty → validation errors, (4) Fill 4 fields + submit → account created, (5) Create drawer closes → detail drawer opens, (6) Accounts list shows new account, (7) Close detail drawer + close/reopen create drawer → form is empty

---

## Phase 6: Input Validation Hardening

**Purpose**: Ensure numeric fields only accept digit characters to prevent invalid data entry.

- [x] T014 [US2] Add `number` prop to Routing Number and Account Number `FlexxTextField` fields in `CreateAccountForm.tsx`. The `number` prop swaps to `FlexxNumberInput` (IMask-based, accepts only digits `/^\d*$/`). Also add `routingNumber` prop to Routing Number field to enforce 9-character limit (US routing number standard). Verified with `npx tsc --noEmit` and `yarn lint`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: No dependencies — can start immediately. BLOCKS all user stories.
- **US1 (Phase 2)**: Depends on Phase 1 completion. Must complete before US2/US3 since they enhance the form built here.
- **US2 (Phase 3)**: Depends on T004 (form exists to add loading/error states to)
- **US3 (Phase 4)**: Depends on T004 (form exists to add reset behavior to)
- **Polish (Phase 5)**: Depends on all user stories complete

### Task Dependencies Graph

```
T001 ─┐
      ├─ T003 ─┐
T002 ─┘        │
               │    T004 ─┬─ T007 ─── T008
               └────┤     │           ↑ ↑
                    T005 ──┘           │ │
                    T006 ──────────────┘ │
                                         │
                    T009 (after T004) ───┘
                    T010 (after T004)
                    T011, T012, T013 (after all)
```

### Parallel Opportunities

**Phase 1**: T001 and T002 run in parallel (different files: route.ts vs flexxApiService.ts)
**Phase 2**: T004, T005, and T006 run in parallel (different files: CreateAccountForm.tsx vs AccountsDashboardTable.tsx vs AccountsCtas.tsx)
**Phase 3-4**: T009 and T010 run in parallel after T004 (both modify CreateAccountForm.tsx but different concerns — could be sequential if preferred)

---

## Parallel Example: Phase 2 (User Story 1)

```text
# These three tasks touch different files and can run simultaneously:
Task T004: "Implement CreateAccountForm in src/views/accounts/components/CreateAccountForm.tsx"
Task T005: "Modify AccountsDashboardTable in src/views/accounts/components/AccountsDashboardTable.tsx"
Task T006: "Modify AccountsCtas in src/views/accounts/components/AccountsCtas.tsx"

# Then sequentially:
Task T007: "Modify useCreateAccount hook" (needs T004 interface)
Task T008: "Wire page.tsx orchestration" (needs T005, T006, T007)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Foundational (T001-T003)
2. Complete Phase 2: User Story 1 (T004-T008)
3. **STOP and VALIDATE**: Create account end-to-end works, detail drawer opens, list refreshes
4. This is a shippable MVP

### Incremental Delivery

1. Phase 1 (Foundational) → API layer ready
2. Phase 2 (US1) → Core creation flow works → **MVP shippable**
3. Phase 3 (US2) → Loading states + error handling polished
4. Phase 4 (US3) → Form reset on close/reopen
5. Phase 5 (Polish) → Lint/type-check clean, manual verification

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- No test framework — verification via lint + tsc + manual testing
- Constitution Principle II: mutation MUST use `invalidateQueries`, NO optimistic updates
- Constitution Principle III: use `FlexxTextField` (not raw MUI TextField), `DrawerWrapper`, `buildValidationRules`
- Constitution Principle IV: import from `'react-query'` (v3), NOT `'@tanstack/react-query'`
- Commit after each phase checkpoint
