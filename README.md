# Advance

A financial management web application for managing accounts, transactions, and money transfers. Built with Next.js 16, React 19, and MUI v5.

**Live Demo**: [advance-orpin.vercel.app](https://advance-orpin.vercel.app/home)

## Pages & User Flows

### Home (`/home`)

Portfolio overview dashboard with financial summary widgets — total balance, account count, recent transactions, and quick-access cards.

### Accounts (`/accounts`)

Accounts list with search, **Add Account** and **Move Money** actions in the toolbar. Clicking an account row opens a detail drawer showing account info (masked account number, routing number, balance) and a paginated transactions table. From the drawer, users can initiate money transfers.

### Transactions (`/transactions`)

Global transactions table showing all transactions across all accounts. Supports search, column sorting, and pagination with configurable rows per page.

## Getting Started

### Prerequisites

- Node.js 22.9.0
- Yarn 1.22.22

### Setup

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/home` by default.

## Available Commands

| Command | Description |
|---------|-------------|
| `yarn dev` | Start dev server (Turbo mode) |
| `yarn build` | Production build |
| `yarn test` | Run lint + type check |
| `yarn lint` | ESLint |
| `yarn lint:fix` | ESLint autofix |
| `yarn fm:fix` | Prettier format |
| `yarn ts` | TypeScript type check |
| `yarn generate:component` | Scaffold a new component |
| `yarn generate:view` | Scaffold a new view |

## Architecture & Project Structure

### Tech Stack

- **Next.js 16** (App Router, Turbopack) — routing, layouts, API proxy routes
- **React 19** — UI components and hooks
- **TypeScript** — strict mode type safety
- **MUI v5** — component library and theming (`sx` prop for styling)
- **Tailwind CSS** — utility classes for layout (preflight disabled to avoid MUI conflicts)
- **React Query v3** — server state management and caching
- **React Hook Form + valibot** — form management and validation

### Folder Structure

```
src/
  app/                    # Next.js App Router (pages, layouts, API routes)
  components/             # Reusable UI components (FlexxTable, DrawerWrapper, etc.)
  views/                  # Feature views (accounts, transactions, home)
  @core/                  # Design system: theme, contexts, hooks, styles
  @layouts/               # Layout components (sidebar, dashboard chrome)
  @menu/                  # Navigation configuration
  flexxApi/               # API client layer (two-hop proxy pattern)
  QueryClient/            # React Query configuration and query keys
  hooks/                  # Shared custom hooks
  domain/                 # TypeScript interfaces and types
  utils/                  # Utility functions
  configs/                # App configuration
```

### API Architecture

The app uses a **two-hop proxy pattern**: client code calls Next.js API routes (`/api/...`), which proxy requests to the external backend with authentication. All API methods are accessed via the `flexxApiService()` singleton.

## Feature Specifications

Detailed design documents for each feature are in the `specs/` directory:

| Folder | Feature |
|--------|---------|
| `specs/001-account-drawer` | Account detail drawer with transaction history |
| `specs/002-create-account` | Account creation form and validation flow |
| `specs/003-move-money` | Money transfer between accounts with confirmation |
| `specs/004-transactions-dashboard` | Global transactions view with search and pagination |
| `specs/005-home-dashboard` | Home dashboard with portfolio overview widgets |

Each folder contains a spec, implementation plan, task breakdown, and research notes.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- MUI v5
- Tailwind CSS
- React Query v3
- React Hook Form
