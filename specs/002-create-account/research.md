# Research: Create Account

**Feature**: 002-create-account | **Date**: 2026-02-22

## R-001: React Hook Form + FlexxTextField Integration Pattern

**Decision**: Use `Controller` from react-hook-form to wrap `FlexxTextField`, combined with `buildValidationRules()` for validation rules.

**Rationale**: The codebase already has `buildValidationRules()` in `FlexxTextFieldValidators.ts` that generates `RegisterOptions` compatible with react-hook-form. `FlexxTextField` supports `externalError` and `externalHelperText` props for showing validation state from RHF's `fieldState.error`. Using `Controller` (not `register`) is necessary because `FlexxTextField` is a controlled component wrapping MUI TextField.

**Alternatives considered**:
- `register()` with ref forwarding — rejected because `FlexxTextField` doesn't forward refs to the underlying input
- Standalone valibot schema — rejected because `buildValidationRules()` already maps FlexxTextField props to RHF validation rules, keeping it DRY

## R-002: Post-Creation Drawer Transition (Create → Detail)

**Decision**: Lift the `openDrawer` function from `useAccountDrawer()` (in `AccountsDashboardTable`) up to the accounts page level, and pass an `onSuccess` callback through `useCreateAccount` → `CreateAccountForm` that calls `closeDrawer()` on the create drawer then `openDrawer(newAccountId)` on the account detail drawer.

**Rationale**: Currently `useAccountDrawer()` lives inside `AccountsDashboardTable` and `useCreateAccount()` lives inside `AccountsCtas`. These are sibling components. To orchestrate the create→detail transition, the account detail drawer's `openDrawer` needs to be accessible from the create form's success handler. Lifting state to the page component (`accounts/page.tsx`) is the simplest approach without introducing global state or context.

**Alternatives considered**:
- React Context for drawer coordination — rejected per Principle VI (YAGNI), adds unnecessary abstraction for a single callback
- Event bus/pub-sub — rejected, over-engineering for simple parent→child callback
- Keeping both drawers in the same component — rejected, breaks existing separation of concerns

## R-003: API Route Handler for POST /account

**Decision**: Add a `POST` export to the existing `src/app/api/pages/accounts/route.ts` file. Extract request body with `req.json()` and forward via `flexxNextApiService().post()` to backend `account` endpoint.

**Rationale**: The existing `route.ts` already has `GET`. Next.js App Router supports multiple HTTP method exports in the same file. Following the two-hop proxy pattern (Constitution Principle I).

**Alternatives considered**:
- Separate route file — rejected, Next.js convention is to co-locate HTTP methods in same route.ts
- Direct backend call from client — rejected, violates Constitution Principle I

## R-004: Mutation Cache Invalidation Strategy

**Decision**: In `onSuccess` of `useMutation`, call `queryClient.invalidateQueries(QueryClientIds.ACCOUNTS)` to refetch the accounts list. No optimistic updates.

**Rationale**: Constitution Principle II (Server-Authoritative Financial Data) mandates server refetch after any financial mutation. The mutation response returns the created `Account` object — we use the `account_id` from it to open the detail drawer, but do NOT manually set cache data.

**Alternatives considered**:
- Optimistic update with rollback — rejected, violates Constitution Principle II (NON-NEGOTIABLE)
- Manual cache update with `setQueryData` — rejected, same reason

## R-005: Form Default Values for Non-User Fields

**Decision**: When submitting the form, hardcode `status: 'open'`, `balance: 0`, `bank_icon: ''` in the mutation payload. These are not shown to the user.

**Rationale**: The backend API requires these fields but they have sensible defaults for new accounts. The spec explicitly states these are not user-editable during creation.

**Alternatives considered**:
- Exposing status/balance fields in the form — rejected, spec explicitly excludes them
- Omitting them from payload — rejected, backend requires them per API contract
