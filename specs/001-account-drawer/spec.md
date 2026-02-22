# Feature Specification: Account Drawer

**Feature Branch**: `001-account-drawer`
**Created**: 2026-02-22
**Status**: Draft
**Input**: User description: "Account Drawer - When clicking on an account row in the accounts dashboard table, open a right-side drawer that displays account details header and transactions table"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Account Details (Priority: P1)

A user on the Accounts dashboard clicks on any account row to view that account's full details. A right-side drawer opens showing the account name, status badge, bank name, masked account number, routing number, and current balance. The accounts table remains visible on the left side of the screen.

**Why this priority**: This is the core interaction — without the drawer opening and displaying account details, no other functionality (transactions, move money) is accessible.

**Independent Test**: Can be fully tested by clicking any account row and verifying the drawer opens with correct account information displayed.

**Acceptance Scenarios**:

1. **Given** a user is on the Accounts dashboard with accounts listed, **When** they click on an account row, **Then** a right-side drawer opens displaying the account name, status badge, bank name, masked account number, routing number, and formatted balance.
2. **Given** the account drawer is open, **When** the user views the account number field, **Then** the account number is masked (e.g., `**3863`) by default.
3. **Given** the account drawer is open with a masked account number, **When** the user clicks the eye icon next to the account number, **Then** the full account number is revealed. Clicking again re-masks it.
4. **Given** the account drawer is open, **When** the user views the balance, **Then** it is formatted with a dollar sign, comma-separated thousands, and superscript cents (e.g., $48,000.15 with `.15` displayed smaller).

---

### User Story 2 - View Account Transactions (Priority: P1)

While viewing an account in the drawer, the user sees a transactions table below the account header showing all transactions for that account. The table includes date, merchant, amount, direction, and status columns with pagination.

**Why this priority**: Transaction visibility is a core part of the account detail view and is expected whenever the drawer opens.

**Independent Test**: Can be tested by opening an account drawer and verifying the transactions table loads with correct columns, data, and pagination controls.

**Acceptance Scenarios**:

1. **Given** the account drawer is open, **When** transactions have loaded, **Then** a table displays with columns: Date, Merchant, Amount, Direction, Status.
2. **Given** transactions are displayed, **When** the user views the Date column, **Then** dates are formatted as "MMM DD YYYY" (e.g., "Jan 27 2026").
3. **Given** transactions are displayed, **When** the user views the Amount column, **Then** amounts are formatted with a dollar sign, comma-separated thousands, and superscript cents (e.g., $4,647.07 with `.07` displayed smaller).
4. **Given** transactions are displayed, **When** the user views the Direction column, **Then** values show as "debit" or "credit" text labels.
5. **Given** transactions are displayed, **When** the user views the Status column, **Then** values show as "approved" or "pending" text labels.
6. **Given** more than 10 transactions exist, **When** the table loads, **Then** pagination is shown with a "Rows per page" selector defaulting to 10.

---

### User Story 3 - Close Account Drawer (Priority: P2)

The user can close the account drawer to return to the full accounts dashboard view. They can also switch between accounts by clicking a different row.

**Why this priority**: Closing and switching context is important for usability but secondary to viewing account details.

**Independent Test**: Can be tested by opening a drawer, closing it, and verifying the full dashboard is restored. Also by clicking a different account row while a drawer is open.

**Acceptance Scenarios**:

1. **Given** the account drawer is open, **When** the user clicks the close button (X), **Then** the drawer closes and the full accounts dashboard is visible.
2. **Given** the account drawer is open for Account A, **When** the user clicks on Account B in the accounts table, **Then** the drawer updates to show Account B's details and transactions.

---

### User Story 4 - Navigate to Move Money (Priority: P2)

The account drawer header includes a "Move Money" button that allows the user to initiate a money transfer from the currently viewed account.

**Why this priority**: This is a navigation action within the drawer but depends on the Move Money feature being implemented separately.

**Independent Test**: Can be tested by opening an account drawer and verifying the "Move Money" button is present and visible in the header.

**Acceptance Scenarios**:

1. **Given** the account drawer is open, **When** the user views the header area, **Then** a "Move Money" button is displayed.

---

### User Story 5 - API Integration for Account and Transaction Data (Priority: P1)

The system fetches account details and transaction data from the backend when the drawer opens. The integration layer must be extensible to support additional endpoints in the future.

**Why this priority**: Without data fetching, the drawer has no content to display. The integration layer is foundational for this and all future features.

**Independent Test**: Can be tested by opening the drawer and verifying that real account data and transactions are fetched and displayed (not mocked/hardcoded).

**Acceptance Scenarios**:

1. **Given** a user clicks on an account row, **When** the drawer opens, **Then** the system fetches the account details from the backend and displays them.
2. **Given** a user clicks on an account row, **When** the drawer opens, **Then** the system fetches the account's transactions from the backend and displays them in the table.
3. **Given** the backend is slow to respond, **When** data is loading, **Then** the drawer displays a loading indicator until data arrives.
4. **Given** the backend returns an error, **When** fetching account or transaction data, **Then** the drawer handles the error gracefully without crashing.

---

### Edge Cases

- What happens when an account has zero transactions? The transactions table should display an empty state (no rows, or a "No transactions" message).
- What happens if account data fails to load? The drawer should show an appropriate error state or loading indicator.
- What happens if transactions fail to load but account details succeed? The account header should still display; the transactions section should show an error or empty state independently.
- What happens when the user rapidly clicks different account rows? The drawer should update to reflect the most recently clicked account without visual glitches.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST open a right-side drawer panel when a user clicks on an account row in the accounts dashboard table.
- **FR-002**: The drawer MUST display the account name and a status badge indicating open, closed, or invalid.
- **FR-003**: The drawer MUST display the bank name below the account name.
- **FR-004**: The drawer MUST display the account number in a masked format (e.g., `**3863`) by default, with a toggle icon to reveal/hide the full number.
- **FR-005**: The drawer MUST display the routing number.
- **FR-006**: The drawer MUST display the account balance formatted with dollar sign, comma-separated thousands, and superscript cents.
- **FR-007**: The drawer MUST include a "Move Money" button in the header area.
- **FR-008**: The drawer MUST display a transactions table with columns: Date, Merchant, Amount, Direction, Status.
- **FR-009**: Transaction dates MUST be formatted as "MMM DD YYYY" (e.g., "Jan 27 2026").
- **FR-010**: Transaction amounts MUST be formatted with dollar sign, comma-separated thousands, and superscript cents.
- **FR-011**: The Direction column MUST display "debit" or "credit" as text labels.
- **FR-012**: The Status column MUST display "approved" or "pending" as text labels.
- **FR-013**: The transactions table MUST include pagination with a "Rows per page" selector, defaulting to 10 rows per page.
- **FR-014**: The accounts table MUST remain visible on the left side of the screen while the drawer is open.
- **FR-015**: The drawer MUST include a close mechanism (X button) to dismiss it.
- **FR-016**: Clicking a different account row while the drawer is open MUST update the drawer to show the newly selected account's details and transactions.
- **FR-017**: The drawer MUST show a loading state while account data and transactions are being fetched.
- **FR-018**: The drawer MUST handle empty transaction lists gracefully with an appropriate empty state.
- **FR-019**: The system MUST provide a reusable integration layer for fetching data from the backend, supporting the account detail and account transactions endpoints, and designed to be extensible for additional endpoints.
- **FR-020**: Data fetching for account details and transactions MUST be independent — a failure in one MUST NOT prevent the other from displaying.

### Key Entities

- **Account**: Represents a financial account with attributes: name, bank name, account number, routing number, status (open/closed/invalid), and balance.
- **Transaction**: Represents a financial transaction associated with an account, with attributes: date, merchant, amount, direction (credit/debit), and status (pending/approved).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can view any account's full details (name, bank, numbers, balance) within 1 second of clicking the account row.
- **SC-002**: Account transactions load and display within 2 seconds of the drawer opening.
- **SC-003**: Users can toggle account number visibility (mask/reveal) instantly with no perceptible delay.
- **SC-004**: Users can navigate between different accounts by clicking rows, with the drawer updating correctly 100% of the time.
- **SC-005**: The accounts dashboard table remains interactive and visible while the drawer is open.
- **SC-006**: The integration layer supports adding new endpoints without modifying existing data-fetching logic.

## Assumptions

- The "Move Money" button in the drawer header will trigger the Move Money feature, which is specified and implemented separately. For this feature, the button only needs to be present and positioned correctly.
- Account data and transactions are fetched independently — if one fails, the other should still display.
- The drawer width and positioning follow the existing DrawerWrapper component patterns already established in the codebase.
- Pagination defaults (10 rows per page) match the standard table behavior used elsewhere in the application.
- The backend API is available at the documented endpoints (`GET /account/{account_id}` and `GET /account/{account_id}/transactions`) and the integration layer will proxy through Next.js API routes following the existing two-hop proxy pattern.
- The integration layer will follow the existing singleton API service pattern to maintain consistency and allow easy addition of new endpoints.
