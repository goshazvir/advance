# Feature Specification: Move Money

**Feature Branch**: `003-move-money`
**Created**: 2026-02-22
**Status**: Draft
**Input**: User description: "Implement a Move Money CTA on the accounts dashboard. When clicked it should open a drawer with fields: source account, destination account, and amount. Add a checkbox that needs to be checked before being able to initiate the move money. Include a Move Money button to submit."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Transfer Money Between Accounts (Priority: P1)

A user wants to move funds from one account to another. They click the "Move Money" button on the accounts dashboard toolbar, which opens a right-side drawer. The drawer presents three fields: a source account dropdown, a destination account dropdown, and an amount input. The user selects the source and destination accounts, enters the transfer amount, checks the "I confirm this transfer" checkbox, and clicks the "Move Money" button to submit the transfer.

**Why this priority**: This is the core feature — without the ability to complete a transfer, the feature has no value.

**Independent Test**: Can be fully tested by opening the drawer, selecting two accounts, entering an amount, confirming, and submitting. Delivers the ability to move money between accounts.

**Acceptance Scenarios**:

1. **Given** a user is on the accounts dashboard, **When** they click the "Move Money" CTA button in the toolbar, **Then** a drawer opens on the right side with source account, destination account, amount fields, a confirmation checkbox, and a submit button.
2. **Given** the Move Money drawer is open, **When** the user selects a source account, a different destination account, enters a valid amount, checks the confirmation checkbox, and clicks "Move Money", **Then** the transfer is submitted successfully and the drawer closes.
3. **Given** a transfer has been submitted successfully, **When** the drawer closes, **Then** the accounts list refreshes to reflect updated balances and any new transactions are visible.
4. **Given** a user is viewing an account in the Account Drawer, **When** they click the "Move Money" button in the account header, **Then** the Move Money drawer opens with the source account pre-filled as read-only text (e.g., "Main Operating Account · Citibank"), and both the Account Drawer (left) and Move Money drawer (right) are visible simultaneously.

---

### User Story 2 - Form Validation and Error Prevention (Priority: P2)

A user must be prevented from submitting invalid or incomplete transfers. The "Move Money" button remains disabled until all required fields are filled and the confirmation checkbox is checked. The user cannot select the same account as both source and destination.

**Why this priority**: Validation prevents accidental or erroneous transfers, protecting users from costly mistakes.

**Independent Test**: Can be tested by attempting to submit with missing fields, same source/destination, zero/negative amounts, or unchecked confirmation — all should be blocked.

**Acceptance Scenarios**:

1. **Given** the Move Money drawer is open, **When** any required field is empty or the confirmation checkbox is unchecked, **Then** the "Move Money" submit button is disabled.
2. **Given** the user has selected a source account, **When** they attempt to select the same account as the destination, **Then** the system prevents the selection or displays a validation error.
3. **Given** the user enters a non-positive amount (zero or negative), **When** they attempt to submit, **Then** the system displays a validation error and blocks submission.
4. **Given** the user enters an amount exceeding the source account balance, **When** they attempt to submit, **Then** the system displays an appropriate validation error.

---

### User Story 3 - Drawer Interaction and Feedback (Priority: P3)

The user expects a smooth interaction with the Move Money drawer, including loading states during submission, error messages if the transfer fails, and the ability to close/cancel the drawer at any time.

**Why this priority**: Good UX ensures users trust the feature and can recover from errors gracefully.

**Independent Test**: Can be tested by observing loading indicators during submission, triggering a server error to see error messaging, and closing the drawer mid-flow.

**Acceptance Scenarios**:

1. **Given** the user has submitted a transfer, **When** the request is processing, **Then** a loading indicator is shown and the submit button is disabled to prevent duplicate submissions.
2. **Given** a transfer request fails on the server, **When** the error response is received, **Then** an error message is displayed within the drawer and the user can retry.
3. **Given** the Move Money drawer is open, **When** the user clicks the close button or clicks outside the drawer, **Then** the drawer closes and any entered data is discarded.
4. **Given** the user has closed the drawer, **When** they reopen it, **Then** the form fields are reset to their default empty state.

---

### Edge Cases

- What happens when the user has only one account? The destination dropdown will have no valid options (source is already selected), so the user cannot complete a transfer.
- What happens when a transfer fails due to insufficient funds on the server side? An error message should be displayed within the drawer.
- What happens if the accounts list is still loading when the drawer opens? The dropdowns should show a loading state until accounts data is available.
- What happens if the user rapidly clicks the submit button? The button should be disabled after the first click to prevent duplicate transfers.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a "Move Money" CTA button on the accounts dashboard toolbar, next to the existing "Add Account" button.
- **FR-002**: System MUST open a right-side drawer when the "Move Money" button is clicked (from either the dashboard toolbar or the Account Drawer header).
- **FR-002a**: When opened from the Account Drawer header, the source account MUST be pre-filled with the currently viewed account, displayed as read-only text (e.g., "Main Operating Account · Citibank") instead of a dropdown.
- **FR-002b**: When opened from the Account Drawer header, both panels MUST be visible simultaneously — Account Drawer on the left and Move Money drawer on the right.
- **FR-003**: The drawer MUST contain a "Source Account" dropdown populated with the user's accounts. Each option MUST display: account name + bank name + masked account number (e.g., "Main Operating Account - Chase **4819").
- **FR-004**: The drawer MUST contain a "Destination Account" dropdown populated with the user's accounts, using the same display format as the source dropdown.
- **FR-005**: The drawer MUST contain an "Amount" input field that accepts dollar values.
- **FR-006**: The drawer MUST contain an "I confirm this transfer" checkbox.
- **FR-007**: The "Move Money" submit button MUST be disabled until all fields are completed and the confirmation checkbox is checked.
- **FR-008**: System MUST prevent the user from selecting the same account as both source and destination.
- **FR-009**: System MUST validate that the amount is a positive number greater than zero.
- **FR-009a**: System MUST validate client-side that the amount does not exceed the source account balance, and display a validation error if it does.
- **FR-010**: Upon successful submission, the system MUST close the drawer, display a success toast/snackbar notification (e.g., "Transfer completed successfully"), and refresh account balances and transaction data from the server.
- **FR-011**: During submission, the system MUST show a loading state and prevent duplicate submissions.
- **FR-012**: If the transfer fails, the system MUST display an error message within the drawer.
- **FR-013**: When the drawer is closed and reopened, the form MUST reset to its default empty state.

### Key Entities

- **Transfer Request**: Represents a money movement between two accounts. Attributes: source account, destination account, amount, merchant (auto-generated label such as "Internal Transfer").
- **Account** (existing): Source and destination for the transfer. Key attributes: account ID, name, bank name, balance, status.
- **Transaction** (existing): Created as a result of a successful transfer. Shows the movement of funds on both accounts.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete a money transfer in under 30 seconds from clicking "Move Money" to successful submission.
- **SC-002**: 100% of invalid submissions (missing fields, same account, non-positive amount) are blocked before reaching the server.
- **SC-003**: After a successful transfer, updated account balances are visible within 2 seconds without manual page refresh.
- **SC-004**: Users can identify and recover from transfer errors (server failures) without leaving the drawer.

## Clarifications

### Session 2026-02-22

- Q: What should each account option display in the Source/Destination dropdowns? → A: Account name + bank name + masked account number (e.g., "Main Operating Account - Chase **4819")
- Q: Should the "Move Money" button in the Account Drawer header also open the Move Money drawer? → A: Yes — both the dashboard toolbar CTA and the Account Drawer header button open the same Move Money drawer. When opened from the Account Drawer, the source account is pre-filled with the currently viewed account.
- Q: Should a success notification be shown after a successful transfer? → A: Yes — show a success toast/snackbar after the drawer closes (e.g., "Transfer completed successfully").
- Q: Should amount > source balance be validated client-side or server-side? → A: Client-side validation — block submission if amount exceeds source account balance.
- Q: (User-provided) Layout when opened from Account Drawer? → A: Both panels visible simultaneously — Account Drawer on the left (account details + transactions) and Move Money drawer on the right. Source account shown as read-only text (e.g., "Main Operating Account · Citibank"), not as a dropdown.

## Assumptions

- The "merchant" field in the API payload will be auto-populated with a label like "Internal Transfer" — the user does not need to enter it.
- Only accounts with "open" status should be available for selection in the source and destination dropdowns.
- The amount field uses standard dollar input formatting (e.g., allowing decimals for cents).
- The transfer creates transactions on both the source and destination accounts (the API handles this).
- No confirmation dialog is needed after clicking "Move Money" — the checkbox serves as the confirmation step.
