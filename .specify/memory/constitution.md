<!--
  Sync Impact Report
  ==================
  Version change: 0.0.0 (template) → 1.0.0 (initial ratification)

  Modified principles: N/A (first fill from template)

  Added sections:
    - Principle I: Two-Hop API Proxy
    - Principle II: Server-Authoritative Financial Data
    - Principle III: Flexx Component Library First
    - Principle IV: React Query v3 Conventions
    - Principle V: Type Safety & Lint Compliance
    - Principle VI: Simplicity & YAGNI
    - Section: Technology Stack
    - Section: Development Workflow & Quality Gates
    - Governance rules

  Removed sections: None

  Templates requiring updates:
    - .specify/templates/plan-template.md         ✅ compatible (Constitution Check section exists)
    - .specify/templates/spec-template.md          ✅ compatible (no constitution-specific references)
    - .specify/templates/tasks-template.md         ✅ compatible (phase structure aligns)
    - .specify/templates/constitution-template.md  ✅ source template (no update needed)

  Follow-up TODOs: None
-->

# Advance Constitution

## Core Principles

### I. Two-Hop API Proxy

Client code MUST never call the external backend directly.
All requests follow the two-hop path:

1. Client calls `/api/...` (Next.js API routes) via `flexxApiService()`
2. Server-side API route proxies to the external backend, attaching auth

- Every new backend endpoint requires BOTH a Next.js API route handler
  in `src/app/api/` AND a corresponding method in
  `src/flexxApi/flexxApiService.ts`
- The `FlexxApiClientService` is the sole HTTP client for browser-side
  code; direct `fetch` to external URLs is prohibited
- API service methods MUST use the singleton factory pattern
  (`let instance = null; const service = () => {...}`)

### II. Server-Authoritative Financial Data (NON-NEGOTIABLE)

**After ANY mutation that moves money, creates accounts, or modifies
financial data, the UI MUST show fresh server data. Never use
optimistic updates for financial operations.**

#### Required pattern for all money-related mutations:

1. **Invalidate** the relevant query keys after mutation succeeds
2. **Refetch** — let React Query refetch from the server (do NOT
   manually set cache data)
3. **Verify** the UI reflects the latest server response (balances,
   transaction lists, account data)

```typescript
// CORRECT pattern — invalidate & refetch after mutation
const queryClient = useQueryClient();

const mutation = useMutation(
  (data) => flexxApiService().moveMoneyOrCreateOrWhatever(data),
  {
    onSuccess: () => {
      // Invalidate all affected queries — React Query will refetch
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
    // NO optimistic updates for money movements
    queryClient.setQueryData(key, optimisticData);
  },
});
```

#### Screens that MUST reflect fresh data after money movements:

- Account balance display
- Transactions list/table (account drawer + transactions dashboard)
- Payout history and status
- Any summary or aggregate showing monetary values

#### Checklist for every financial mutation:

- [ ] `invalidateQueries` called for ALL affected query keys in
      `onSuccess`
- [ ] No `onMutate` optimistic cache manipulation for money data
- [ ] UI shows loading/refetching state while fresh data loads
- [ ] After refetch completes, balances and transaction lists match
      server state

### III. Flexx Component Library First

Features MUST use the project's component wrappers instead of raw
MUI or HTML elements.

- **Tables**: use `FlexxTable` — define `FlexxColumn[]` and transform
  data to `FlexxTableRow[]` via a custom hook
- **Text inputs**: use `FlexxTextField` — raw MUI `TextField` is
  prohibited
- **Drawers**: use `DrawerWrapper` + `useBoolean` — portaled to
  `document.body`
- **Loading**: use `AdvanceLoaderCenter` for full-screen loading states
- **Forms**: use React Hook Form + valibot for schema validation
- New shared components MUST live in `src/components/[Name]/` with a
  `domain/` subdirectory for types

### IV. React Query v3 Conventions

This project uses `react-query` v3 (3.39.3). TanStack Query v4/v5
APIs MUST NOT be used.

- Import from `'react-query'`, never from `'@tanstack/react-query'`
- Query keys MUST be defined in `QueryClientIds` enum
  (`src/QueryClient/queryClient.ids.ts`)
- Custom hooks follow the naming pattern `use[Feature][Action]`
  (e.g., `useFetchAccounts`, `useCreateAccount`)
- Server state is managed exclusively through React Query;
  global client state uses React Context; local state uses `useState`

### V. Type Safety & Lint Compliance

All code MUST pass `yarn test` (ESLint + TypeScript type-check) with
zero errors before merging.

- `no-explicit-any`: usage of `any` type is an error
- `no-console`: `console.log` / `console.warn` are errors
  (exceptions: `console.error` in hooks, `console.error` +
  `console.log` in route files only)
- `no-nested-ternary`: nested ternaries are errors
- `unused-imports/no-unused-imports`: dead imports are errors
- `perfectionist/sort-imports`: import order MUST follow
  style > type > builtin/external > internal
- `prefer-destructuring` for objects is enforced
- Prefer `const` over `let`; prefer `interface` over `type`
- All interactive components MUST have `'use client'` directive

### VI. Simplicity & YAGNI

Build only what is needed for the current task. Do not over-engineer.

- Do not add features, refactoring, or improvements beyond what was
  requested
- Do not create helper utilities or abstractions for one-time operations
- Ask before creating new directories, files, or adding external
  libraries
- No feature flags or backwards-compatibility shims — change the code
  directly
- Three similar lines of code is preferable to a premature abstraction
- Do not add docstrings, comments, or type annotations to code that
  was not changed as part of the current task

## Technology Stack

The following versions and libraries are locked for this project.
Changes require explicit justification and approval.

| Layer | Technology | Version / Notes |
|-------|-----------|----------------|
| Framework | Next.js (App Router, Turbo) | 16 |
| UI library | React | 19 |
| Language | TypeScript | strict mode, `--noEmit --incremental` |
| Component kit | MUI | v5 |
| Utility CSS | Tailwind CSS | `preflight: false`, `important: '#__next'` |
| Server state | react-query | v3 (3.39.3) |
| Forms | React Hook Form + valibot | — |
| Styling | MUI `sx` prop (primary) + Tailwind (utility only) | — |
| Design tokens | CSS custom properties (`--advance-*`) | `src/app/globals.css` |
| Test gate | `yarn test` = ESLint + tsc | No Jest/Vitest configured |

## Development Workflow & Quality Gates

### Quality gates (every PR)

1. `yarn lint` — zero ESLint errors
2. `yarn ts` — zero TypeScript errors
3. UI reference screenshots MUST be reviewed before modifying any page
   (see `CLAUDE.md` screenshot table)
4. Financial mutation checklist MUST be verified for any money-related
   change (see Principle II)

### Feature file structure

New features MUST follow the established layout:

```
src/views/flexx-apps/[feature]/
├── components/     # Feature UI components
├── hooks/          # Business logic hooks
├── domain/         # TypeScript interfaces
└── Feature.tsx     # Entry component
```

### Commit discipline

- Commit after each logical unit of work
- Commit messages MUST be concise and descriptive
- Do not commit files containing secrets (`.env`, credentials)

## Governance

- This constitution supersedes conflicting ad-hoc decisions.
  When in doubt, follow these principles.
- Amendments require: (1) documented rationale, (2) review of
  downstream impact on templates and `CLAUDE.md`, (3) version bump
  per semver rules below.
- Versioning: MAJOR for principle removals or incompatible
  redefinitions; MINOR for new principles or material expansions;
  PATCH for wording clarifications.
- All PRs MUST verify compliance with Principles I-VI.
- Runtime development guidance lives in `CLAUDE.md` at the
  repository root; this constitution captures the non-negotiable
  rules that `CLAUDE.md` guidance is built upon.

**Version**: 1.0.0 | **Ratified**: 2026-02-22 | **Last Amended**: 2026-02-22
