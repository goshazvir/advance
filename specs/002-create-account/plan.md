# Implementation Plan: Create Account

**Branch**: `002-create-account` | **Date**: 2026-02-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-create-account/spec.md`

## Summary

Implement a "Create Account" drawer form on the accounts dashboard. The "Add Account" button and drawer skeleton already exist (`AccountsCtas.tsx`, `useCreateAccount.tsx`, `CreateAccountForm.tsx` placeholder). This feature fills in the form with React Hook Form + FlexxTextField, adds a `POST /account` API route + `flexxApiService` method, and wires the `useMutation` to invalidate accounts cache and auto-open the account detail drawer for the newly created account.

## Technical Context

**Language/Version**: TypeScript (strict mode, `--noEmit --incremental`)
**Primary Dependencies**: Next.js 16 (App Router), React 19, MUI v5, react-query v3 (3.39.3), React Hook Form 7.49.3, valibot 0.25.0
**Storage**: N/A (external backend via two-hop proxy)
**Testing**: `yarn test` = ESLint + tsc (no Jest/Vitest)
**Target Platform**: Web (browser)
**Project Type**: Web application (Next.js)
**Performance Goals**: Account creation in under 30 seconds (SC-001)
**Constraints**: No optimistic updates for financial mutations (Constitution Principle II)
**Scale/Scope**: Single drawer form, 4 text fields, 1 API endpoint, ~6 files modified/created

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Two-Hop API Proxy | PASS | Will create Next.js API route (`POST /api/pages/accounts`) + `flexxApiService().createAccount()` method |
| II. Server-Authoritative Financial Data | PASS | `useMutation` with `onSuccess` → `invalidateQueries(QueryClientIds.ACCOUNTS)`. No optimistic updates. |
| III. Flexx Component Library First | PASS | Uses `FlexxTextField`, `DrawerWrapper`, `useBoolean`, `AdvanceActionButtons` (all existing) |
| IV. React Query v3 Conventions | PASS | Import from `'react-query'`, key in `QueryClientIds` enum, hook named `useCreateAccountMutation` |
| V. Type Safety & Lint Compliance | PASS | Typed interface for `CreateAccountPayload`, `'use client'` on interactive components |
| VI. Simplicity & YAGNI | PASS | Only 4 form fields (spec-required), no extra abstractions |

All gates pass. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/002-create-account/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── api-contract.md
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── api/pages/accounts/
│       └── route.ts                          # ADD: POST handler (alongside existing GET)
├── domain/
│   └── Account.ts                            # EXISTS: Account interface + AccountStatus enum
├── flexxApi/
│   └── flexxApiService.ts                    # MODIFY: add createAccount() method
├── hooks/
│   └── (existing fetch hooks)                # NO CHANGES
├── views/accounts/
│   ├── components/
│   │   ├── AccountsCtas.tsx                  # MODIFY: pass onAccountCreated callback
│   │   ├── CreateAccountForm.tsx             # REWRITE: placeholder → full form
│   │   └── AccountsDashboardTable.tsx        # MODIFY: expose openDrawer for post-creation
│   └── hooks/
│       ├── useCreateAccount.tsx              # MODIFY: accept onSuccess callback, pass to form
│       └── useCreateAccountMutation.tsx      # NEW: useMutation hook for POST /account
└── (client)/(dashboard)/accounts/
    └── page.tsx                              # MODIFY: wire create → detail drawer flow
```

**Structure Decision**: Uses existing feature structure at `src/views/accounts/`. New mutation hook follows naming convention `use[Feature][Action]`. No new directories needed.
