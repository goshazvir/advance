# Feature Specification: Home Dashboard Redesign

**Feature Branch**: `005-home-dashboard`
**Created**: 2026-02-22
**Status**: Draft
**Input**: User description: "Replace the current static home page with a dynamic, data-driven financial dashboard displaying insights: top banks by accounts, top banks by funds, recent transactions, account status summary, portfolio overview, and transaction volume by direction."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Portfolio Overview at a Glance (Priority: P1)

A user navigates to the Home page and immediately sees a high-level financial summary: total balance across all accounts, total number of accounts, and total number of transactions. This gives them instant awareness of their financial position without clicking into any sub-pages.

**Why this priority**: This is the single most important piece of information on a financial dashboard — the user's total financial position. It anchors the entire page and provides immediate value.

**Independent Test**: Can be fully tested by navigating to `/home` and verifying that the hero section displays the correct aggregated totals matching the sum of all account balances, account count, and transaction count from the API.

**Acceptance Scenarios**:

1. **Given** the user has multiple accounts with balances, **When** they navigate to `/home`, **Then** they see a prominent hero widget showing total balance (formatted as currency with superscript cents), total account count, and total transaction count.
2. **Given** the user has no accounts, **When** they navigate to `/home`, **Then** the hero widget shows $0.00 balance, 0 accounts, and 0 transactions.
3. **Given** data is loading, **When** the user lands on `/home`, **Then** skeleton placeholders are shown in place of the hero metrics until data loads.

---

### User Story 2 - Top Banks by Number of Accounts (Priority: P2)

A user wants to see which banks hold the most accounts. The dashboard displays a ranked widget showing the top 3 banks by account count, with each bank's name, icon, and number of accounts.

**Why this priority**: Understanding account distribution across banks is a core financial insight — it reveals concentration and banking relationships.

**Independent Test**: Can be tested by verifying the widget groups accounts by bank name, counts them, sorts descending, and displays the top 3 with correct bank names, icons, and counts.

**Acceptance Scenarios**:

1. **Given** accounts are spread across multiple banks, **When** the user views the dashboard, **Then** they see the top 3 banks ranked by account count with visual ranking indicators (1st, 2nd, 3rd).
2. **Given** there are fewer than 3 distinct banks, **When** the user views the widget, **Then** only the available banks are shown (e.g., 1 or 2 entries).
3. **Given** two banks have the same number of accounts, **When** ranking is determined, **Then** alphabetical order by bank name breaks the tie.

---

### User Story 3 - Top Banks by Total Funds (Priority: P2)

A user wants to see which banks hold the most money. The dashboard displays a ranked widget showing the top 3 banks by total balance, with each bank's name, total funds (formatted currency), and number of contributing accounts.

**Why this priority**: Equal priority to account count — knowing where the majority of funds are concentrated is critical for financial oversight.

**Independent Test**: Can be tested by summing balances per bank name, sorting descending, and verifying the top 3 entries display correct totals and account counts.

**Acceptance Scenarios**:

1. **Given** accounts have varying balances across banks, **When** the user views the widget, **Then** they see the top 3 banks by total funds with formatted currency amounts and contributing account counts.
2. **Given** a bank has only one account, **When** displayed, **Then** the total funds equal that single account's balance and the account count shows 1.

---

### User Story 4 - Recent Transactions (Priority: P2)

A user wants a quick view of the latest financial activity. The dashboard shows the 5 most recent transactions with date, merchant, amount, direction, status, and account name.

**Why this priority**: Recent activity is one of the most commonly checked financial data points — it helps users stay aware of money movement without navigating to the full transactions page.

**Independent Test**: Can be tested by fetching all transactions, sorting by date descending, taking the first 5, and verifying each row displays the correct date, merchant, amount (with superscript cents), direction (credit/debit), status badge, and account name.

**Acceptance Scenarios**:

1. **Given** there are 10+ transactions across accounts, **When** the user views the widget, **Then** they see exactly 5 rows showing the most recent transactions sorted by date descending.
2. **Given** there are fewer than 5 transactions, **When** the user views the widget, **Then** all available transactions are shown.
3. **Given** there are no transactions, **When** the user views the widget, **Then** an empty state message is displayed (e.g., "No transactions yet").
4. **Given** a transaction row is displayed, **When** the user clicks on it, **Then** they navigate to the Accounts page and open the account drawer for the associated account.

---

### User Story 5 - Account Status Summary (Priority: P3)

A user wants to understand the health of their accounts. The dashboard shows a summary of account statuses: how many are Open, Closed, and Invalid, along with the total count.

**Why this priority**: Account health monitoring is important but less urgent than financial totals and recent activity — it's a secondary insight.

**Independent Test**: Can be tested by grouping accounts by status, counting each group, and verifying the widget displays correct counts with appropriate visual indicators for each status.

**Acceptance Scenarios**:

1. **Given** accounts have mixed statuses, **When** the user views the widget, **Then** they see counts for each status (Open, Closed, Invalid) with distinct colored indicators and a total count.
2. **Given** all accounts are Open, **When** the user views the widget, **Then** only the Open count is non-zero, and Closed/Invalid show 0.

---

### User Story 6 - Transaction Volume by Direction (Priority: P3)

A user wants to understand the flow of money — how much is coming in vs. going out. The dashboard shows a summary of credit vs. debit transactions: total amounts and counts for each direction.

**Why this priority**: Credit/debit split is a useful analytical view but is supplementary to the core metrics — users who want deeper analysis will benefit from this.

**Independent Test**: Can be tested by partitioning transactions by direction, summing amounts and counting for each, and verifying the widget displays correct totals and counts for credit and debit.

**Acceptance Scenarios**:

1. **Given** transactions include both credits and debits, **When** the user views the widget, **Then** they see total credit amount, total debit amount, credit count, and debit count with clear visual distinction.
2. **Given** all transactions are credits, **When** the user views the widget, **Then** debit total shows $0.00 and count shows 0.

---

### Edge Cases

- What happens when the API returns an error for accounts or transactions? The dashboard shows an error state for the affected widget(s) while still rendering widgets with available data.
- What happens when the user has no accounts and no transactions? All widgets show appropriate empty states (zero values, "no data" messages) rather than broken layouts.
- What happens when data is partially loaded (accounts loaded, transactions still loading)? Widgets render independently — loaded widgets show data, still-loading widgets show skeletons.
- What happens when a bank has no icon? The widget shows the bank name without an icon, using a default placeholder.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST replace the current static home page content with a dynamic dashboard that fetches live data from the accounts and transactions endpoints.
- **FR-002**: System MUST display a Portfolio Overview hero widget showing total balance (formatted currency with superscript cents), total account count, and total transaction count.
- **FR-003**: System MUST display a "Top 3 Banks by Accounts" widget showing bank name, bank icon, and account count, ranked descending by count.
- **FR-004**: System MUST display a "Top 3 Banks by Total Funds" widget showing bank name, total balance (formatted currency), and contributing account count, ranked descending by total balance.
- **FR-005**: System MUST display a "Recent Transactions" widget showing the 5 most recent transactions with date, merchant, amount, direction, status, and account name.
- **FR-006**: System MUST display an "Account Status Summary" widget showing counts of accounts grouped by status (Open, Closed, Invalid) with colored indicators.
- **FR-007**: System MUST display a "Transaction Volume by Direction" widget showing total credit amount, total debit amount, credit transaction count, and debit transaction count.
- **FR-008**: System MUST show skeleton loading placeholders for each widget while data is being fetched.
- **FR-009**: System MUST render widgets independently — if accounts data loads before transactions, account-based widgets render immediately while transaction-based widgets continue showing skeletons.
- **FR-010**: System MUST handle empty data gracefully — showing zero values and appropriate empty state messages rather than broken layouts.
- **FR-011**: Recent transactions rows MUST be clickable, navigating the user to the Accounts page and opening the relevant account drawer.
- **FR-012**: System MUST use a responsive grid layout: 2-3 columns on desktop, 1 column on mobile.
- **FR-013**: All currency values MUST use the existing superscript cents formatting pattern.
- **FR-014**: System MUST display the dashboard page title as "Dashboard" (replacing the old static heading).

### Key Entities

- **Account**: Represents a financial account with account ID, name, bank name, bank icon, status (open/closed/invalid), and balance. Accounts are grouped by bank for ranking widgets.
- **Transaction**: Represents a financial transaction with transaction ID, merchant, amount, direction (credit/debit), date, status (pending/approved), account ID, and account name. Transactions are sorted by date for recency and partitioned by direction for volume analysis.
- **Bank Summary** (derived): An aggregation of accounts by bank name, producing total account count and total balance per bank. Not a stored entity — computed from the accounts list.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can see their total financial position (balance, account count, transaction count) within 2 seconds of navigating to the Home page.
- **SC-002**: The dashboard displays all 6 widgets with correct, up-to-date data matching the values visible on the Accounts and Transactions pages.
- **SC-003**: The dashboard is fully usable on both desktop (multi-column layout) and mobile (single-column layout) screen sizes.
- **SC-004**: When data is loading, users see skeleton placeholders for every widget — no blank spaces, jumpy layouts, or unstyled content flashes.
- **SC-005**: Users can navigate from a recent transaction row to the relevant account drawer in a single click.
- **SC-006**: The dashboard correctly handles edge cases (no data, partial data, errors) without breaking the page layout.

## Assumptions

- All data for the dashboard is derived from the existing accounts and transactions list endpoints — no new backend endpoints are needed.
- Bank grouping and ranking are computed client-side from the accounts list (grouping by bank name).
- The "top 3" limit is fixed and not configurable by the user.
- The "recent 5 transactions" limit is fixed and not configurable by the user.
- Transaction sorting by recency uses the date field.
- The existing currency formatting component handles the superscript cents pattern.
- The sidebar navigation item "Home" already exists and points to `/home`.
