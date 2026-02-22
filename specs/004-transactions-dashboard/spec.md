# Feature Specification: Transactions Dashboard

**Feature Branch**: `004-transactions-dashboard`
**Created**: 2026-02-22
**Status**: Draft
**Input**: User description: "Add a transactions dashboard page accessible from the sidebar navigation. The page displays all transactions across all accounts in a FlexxTable with columns: Date, Account, Merchant, Amount, Direction, Status. Includes a search bar at the top for filtering transactions. Table has pagination with Rows per page selector. Uses GET /transaction endpoint to fetch all transactions. Amount displays with superscript cents format. Status shows as text labels (approved/pending). Direction shows as debit/credit. Date format: Mon DD YYYY. The page is at /transactions route in the sidebar nav alongside Home and Accounts."

## Clarifications

### Session 2026-02-22

- Q: Should table columns be sortable by clicking headers? → A: Yes, all columns are sortable. Default sort: Date descending (newest first).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View All Transactions (Priority: P1)

As a user, I want to see a consolidated list of all transactions across all my accounts on a dedicated Transactions page, so that I can get a complete overview of financial activity without navigating into individual accounts.

**Why this priority**: This is the core value of the feature — without the transaction table, there is no dashboard. It provides the primary read-only view that all other functionality builds upon.

**Independent Test**: Can be fully tested by navigating to /transactions from the sidebar and verifying that a table of transactions appears with correct columns and data. Delivers immediate value by showing all transactions in one place.

**Acceptance Scenarios**:

1. **Given** the user is on any page, **When** they click "Transactions" in the sidebar navigation, **Then** they are navigated to the /transactions page and see a table of all transactions.
2. **Given** transactions exist in the system, **When** the Transactions page loads, **Then** the table displays each transaction with Date, Account, Merchant, Amount, Direction, and Status columns.
3. **Given** a transaction has an amount of $4,703.44, **When** it is displayed in the table, **Then** the dollar amount shows with superscript cents format (e.g., "$4,703" with ".44" in smaller superscript text).
4. **Given** a transaction has a date of February 12, 2026, **When** it is displayed, **Then** the date column shows "Feb 12 2026".
5. **Given** a transaction has direction "credit", **When** displayed, **Then** the Direction column shows "credit". Same for "debit".
6. **Given** a transaction has status "approved", **When** displayed, **Then** the Status column shows "approved" as a text label. Same for "pending".
7. **Given** the transactions table is displayed, **When** the page first loads, **Then** transactions are sorted by Date descending (newest first).
8. **Given** the user clicks a column header, **When** the column is sortable, **Then** the table re-sorts by that column and displays a sort direction indicator.

---

### User Story 2 - Search Transactions (Priority: P2)

As a user, I want to search/filter transactions by keyword so that I can quickly find specific transactions by merchant name, account name, or other details.

**Why this priority**: Search is essential for usability when the transaction list grows, but the dashboard still provides value without it.

**Independent Test**: Can be tested by typing a search term in the search bar and verifying the table filters to show only matching transactions.

**Acceptance Scenarios**:

1. **Given** the user is on the Transactions page, **When** they type a search term in the search bar, **Then** the table filters to show only transactions matching the search term.
2. **Given** the user has entered a search term that matches no transactions, **When** results load, **Then** the table shows an empty state (no rows).
3. **Given** the user clears the search bar, **When** the field is empty, **Then** all transactions are displayed again.

---

### User Story 3 - Paginate Transactions (Priority: P2)

As a user, I want to paginate through transactions and control how many rows are displayed per page, so that I can browse large sets of data efficiently.

**Why this priority**: Pagination ensures the page remains performant and usable with large datasets. Same priority as search since both are standard table UX requirements.

**Independent Test**: Can be tested by verifying that the table shows a limited number of rows with pagination controls and a "Rows per page" selector.

**Acceptance Scenarios**:

1. **Given** there are more transactions than the current rows-per-page setting, **When** the page loads, **Then** pagination controls appear at the bottom of the table showing page information and navigation.
2. **Given** the user is viewing page 1 of results, **When** they click the next page button, **Then** the table updates to show the next page of transactions.
3. **Given** the "Rows per page" selector shows the current value, **When** the user changes it to a different value, **Then** the table re-renders showing the selected number of rows per page.

---

### Edge Cases

- What happens when no transactions exist in the system? The table should show an empty state.
- What happens when the API request fails? The user should see an appropriate error state.
- What happens when the page is loading? A loading indicator should be displayed.
- What happens with very long merchant or account names? Text should be handled gracefully (truncation or wrapping consistent with existing FlexxTable behavior).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a "Transactions" navigation item in the sidebar, alongside "Home" and "Accounts".
- **FR-002**: System MUST route the user to the /transactions page when they click the "Transactions" sidebar item.
- **FR-003**: System MUST display a page title "Transactions" at the top of the page.
- **FR-004**: System MUST display a search bar at the top of the transactions page for filtering transactions.
- **FR-005**: System MUST display all transactions in a table with columns: Date, Account, Merchant, Amount, Direction, Status.
- **FR-006**: System MUST fetch transactions from the GET /transaction endpoint.
- **FR-007**: System MUST format the Date column as "Mon DD YYYY" (e.g., "Feb 12 2026").
- **FR-008**: System MUST display the Amount column with superscript cents format (dollar amount with cents displayed in smaller superscript text).
- **FR-009**: System MUST display transaction direction as "debit" or "credit" text.
- **FR-010**: System MUST display transaction status as "approved" or "pending" text labels.
- **FR-011**: System MUST provide table pagination with "Rows per page" selector and page navigation controls.
- **FR-012**: System MUST filter the displayed transactions when the user types in the search bar, using the search_term query parameter.
- **FR-013**: System MUST show a loading state while transactions are being fetched.
- **FR-014**: System MUST display the Account column showing the account name associated with each transaction.
- **FR-015**: System MUST support column sorting by clicking column headers, with a visible sort direction indicator. Default sort: Date descending (newest first).

### Key Entities

- **Transaction**: A financial record associated with an account. Key attributes: transaction ID, merchant name, amount, direction (credit/debit), creation date, associated account, status (pending/approved), account name.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can view all transactions across all accounts on a single page within 2 seconds of navigation.
- **SC-002**: Users can search and find a specific transaction within 5 seconds using the search bar.
- **SC-003**: Users can navigate between pages of transactions and change rows per page without page reload.
- **SC-004**: All transaction data (date, account, merchant, amount, direction, status) is accurately displayed matching the source data.
- **SC-005**: The Transactions page is accessible from the sidebar on every page of the application.

## Assumptions

- The search functionality uses the `search_term` query parameter supported by the GET /transaction endpoint (server-side filtering).
- Default rows per page is 100, consistent with the screenshot reference.
- The superscript cents format follows the same pattern already used in the Account Drawer transactions table.
- The sidebar navigation order is: Home, Accounts, Transactions.
- No additional filtering (by date range, account, status, etc.) is required beyond the search bar — scope is limited to what is shown in the screenshot reference.
