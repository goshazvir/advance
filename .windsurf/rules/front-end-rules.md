---
trigger: manual
description:
globs:
---

You are an expert in TypeScript, Node.js, Next.js App Router, React, MUI material UI, Next, React Query, and Tailwind.

Code Style and Structure

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes unless specified otherwise.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError, handleChange, onClick).
- Directory structuer - directory/ components, domain, hooks. components should be in views/flexx-apps/
- Hooks that appear through out the app and are not dedicated for a specific component should be in the hooks directory.

Naming Conventions

- component - name the file with the component name (e.g., AuthWizard.tsx).
- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.

TypeScript Usage

- Use TypeScript for all code; prefer interfaces over types.
- Use Record for mapping strings to values.
- Use functional components with TypeScript interfaces.
- Avoid using let unless absolutely necessary.

UI and Styling

- Use Mui Material UI, Next, React Query, and Tailwind for components and styling.
- Do not style components with Tailwind, use MUI for styling.
- Make sure to take into account different screen sizes, desktop is priority.

Performance Optimization

- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP format, include size data, implement lazy loading.

Key Conventions

- Use 'nuqs' for URL search parameter state management.
- Optimize Web Vitals (LCP, CLS, FID).
- Limit 'use client':
  - Favor server components and Next.js SSR.
  - Use only for Web API access in small components.
  - Avoid for data fetching or state management.

External Libraries

- add external libraries only from trusted sources like MIT and apache licenses
- before adding a new library, check if it is already in the package.json
- ask for permission before adding a new library

General Components to use:

- do not use TextInput from MUI, instead use FlexxTextField
- always use the FlexxTable when creating tables
- When using loader for full screen use AdvanceLoaderCenter

  Follow Next.js docs for Data Fetching, Rendering, and Routing.
