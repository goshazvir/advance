# Implementation Plan: Move Money

**Branch**: `003-move-money` | **Date**: 2026-02-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-move-money/spec.md`

## Summary

Add a "Move Money" feature to the accounts dashboard. A new CTA button opens a right-side drawer with source/destination account dropdowns, an amount input, and a confirmation checkbox. The form submits via `POST /move-money` API, then invalidates account and transaction queries to show fresh data. The same drawer is accessible from the Account Drawer header with source pre-filled. Uses established patterns: `DrawerWrapper` + `useBoolean` + React Hook Form + `useMutation` with query invalidation.

## Technical Context

**Language/Version**: TypeScript (strict mode, `--noEmit --incremental`)
**Primary Dependencies**: Next.js 16 (App Router), React 19, MUI v5, react-query v3 (3.39.3), React Hook Form, react-toastify
**Storage**: N/A (external backend via two-hop API proxy)
**Testing**: `yarn test` = ESLint + TypeScript type-check (no Jest/Vitest)
**Target Platform**: Web (browser)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: Transfer completion < 30s, data refresh < 2s post-mutation
**Constraints**: No optimistic updates for financial data (Constitution Principle II)
**Scale/Scope**: Single feature addition — ~8 new files, ~3 modified files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Two-Hop API Proxy | PASS | New `POST /move-money` route in `src/app/api/pages/move-money/route.ts` + `moveMoney()` method in `flexxApiService.ts` |
| II. Server-Authoritative Financial Data | PASS | `useMoveMoneyMutation` will invalidate `ACCOUNTS`, `ACCOUNT`, `ACCOUNT_TRANSACTIONS` on success. No optimistic updates. |
| III. Flexx Component Library First | PASS | Uses `DrawerWrapper`, `FlexxTextField` (with `currency` prop), `FlexxAutocomplete` for dropdowns. No raw MUI TextField. |
| IV. React Query v3 Conventions | PASS | Imports from `'react-query'`. Hook naming: `useMoveMoneyMutation`. Query invalidation via `QueryClientIds` enum. |
| V. Type Safety & Lint Compliance | PASS | All types defined in `domain/`. No `any`. `'use client'` on all interactive components. |
| VI. Simplicity & YAGNI | PASS | No abstractions beyond what's needed. Follows existing `useCreateAccount` pattern directly. |

## Project Structure

### Documentation (this feature)

```text
specs/003-move-money/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/api/pages/move-money/
│   └── route.ts                              # NEW — API proxy for POST /move-money
├── flexxApi/
│   └── flexxApiService.ts                    # MODIFY — add moveMoney() method
├── domain/
│   └── MoveMoneyPayload.ts                   # NEW — MoveMoneyPayload interface
├── views/accounts/
│   ├── components/
│   │   ├── AccountsCtas.tsx                  # MODIFY — add "Move Money" CTA button
│   │   ├── AccountDrawerHeader.tsx           # MODIFY — wire "Move Money" button onClick
│   │   └── MoveMoneyForm.tsx                 # NEW — form with dropdowns, amount, checkbox
│   ├── hooks/
│   │   ├── useMoveMoney.tsx                  # NEW — drawer state + portal (like useCreateAccount)
│   │   └── useMoveMoneyMutation.tsx          # NEW — useMutation + invalidateQueries
│   └── domain/
│       └── MoveMoneyForm.types.ts            # NEW — form value types, default values
├── app/(client)/(dashboard)/accounts/
│   └── page.tsx                              # MODIFY — integrate useMoveMoney hook
```

**Structure Decision**: Follows established feature file layout under `src/views/accounts/`. New files mirror the `useCreateAccount` + `CreateAccountForm` pattern. API route follows existing `src/app/api/pages/` convention.

## Complexity Tracking

> No constitution violations — this section is intentionally empty.
