# Feature Specification: Create Account

**Feature Branch**: `002-create-account`
**Created**: 2026-02-22
**Status**: Complete
**Input**: User description: "Implement a Create Account CTA on the accounts dashboard. When clicked it should open a drawer with text fields for all the attributes of an account and an Add Account button. After creating the account, the accounts dashboard should open the drawer to the newly created account."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create a New Account (Priority: P1)

As a user on the accounts dashboard, I want to create a new financial account by filling out a form in a drawer, so that I can add accounts to manage within the application.

**Why this priority**: This is the core feature — without the ability to create accounts, no other functionality in this feature is relevant. It delivers immediate value by allowing users to expand their financial portfolio within the app.

**Independent Test**: Can be fully tested by clicking "Add Account" on the accounts dashboard, filling out the form fields, and submitting. Delivers the value of a new account appearing in the accounts list.

**Acceptance Scenarios**:

1. **Given** the user is on the accounts dashboard, **When** they click the "Add Account" button, **Then** a drawer opens on the right side of the screen with a "Create Account" form.
2. **Given** the "Create Account" drawer is open, **When** the user fills in all required fields (Account Name, Bank Name, Routing Number, Account Number) and clicks "Add Account", **Then** the account is created and saved.
3. **Given** the user submits the form with valid data, **When** the account is successfully created, **Then** the "Create Account" drawer closes and the account detail drawer opens showing the newly created account.
4. **Given** the user submits the form with valid data, **When** the account is successfully created, **Then** the accounts list refreshes and displays the new account.

---

### User Story 2 - Form Validation (Priority: P2)

As a user filling out the "Create Account" form, I want to see clear validation messages when I miss required fields or enter invalid data, so that I can correct my input before submitting.

**Why this priority**: Validation prevents creation of malformed accounts and guides users to provide correct information. Important for data integrity but secondary to core creation flow.

**Independent Test**: Can be tested by attempting to submit the form with empty or invalid fields and verifying appropriate error messages appear.

**Acceptance Scenarios**:

1. **Given** the "Create Account" drawer is open, **When** the user clicks "Add Account" without filling in any fields, **Then** validation errors appear on all required fields.
2. **Given** the "Create Account" drawer is open, **When** the user leaves one or more required fields empty and attempts to submit, **Then** only the empty fields show validation errors.
3. **Given** the form has validation errors, **When** the user corrects a field, **Then** the validation error for that field clears.

---

### User Story 3 - Close Drawer Without Saving (Priority: P3)

As a user who opened the "Create Account" drawer, I want to close it without saving, so that I can cancel account creation if I change my mind.

**Why this priority**: Provides basic UX for canceling the operation. Lower priority because the drawer close mechanism (X button) is standard behavior.

**Independent Test**: Can be tested by opening the drawer, optionally entering some data, then clicking the close (X) button and verifying no account is created.

**Acceptance Scenarios**:

1. **Given** the "Create Account" drawer is open, **When** the user clicks the close (X) button, **Then** the drawer closes and no account is created.
2. **Given** the "Create Account" drawer is open with partially filled fields, **When** the user clicks the close (X) button, **Then** the drawer closes and the entered data is discarded.

---

### Edge Cases

- What happens when the user submits a form while a creation request is already in progress? The submit button should be disabled during submission to prevent duplicate accounts.
- What happens when the server returns an error during account creation? An error message should be displayed in the drawer and the form should remain open with user data intact.
- What happens when the user enters very long values for text fields? Fields should accept reasonable lengths without breaking the layout.
- What happens if the user tries to create an account with a duplicate account number? The system should relay the server error to the user.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display an "Add Account" button on the accounts dashboard toolbar.
- **FR-002**: System MUST open a right-side drawer titled "Create Account" when the "Add Account" button is clicked.
- **FR-003**: The "Create Account" drawer MUST contain input fields for: Account Name, Bank Name, Routing Number, and Account Number — all marked as required.
- **FR-004**: System MUST validate that all four fields are non-empty before allowing form submission.
- **FR-005**: The "Add Account" submit button MUST be displayed at the bottom of the drawer form.
- **FR-006**: System MUST send account data to the server when the form is submitted with valid data.
- **FR-007**: System MUST show a loading/disabled state on the submit button while the creation request is in progress.
- **FR-008**: Upon successful account creation, the system MUST close the "Create Account" drawer and open the account detail drawer for the newly created account.
- **FR-009**: Upon successful account creation, the accounts list MUST refresh to include the new account.
- **FR-010**: If account creation fails, the system MUST display an error message and keep the form open with user data preserved.
- **FR-011**: The drawer MUST be closable via a close (X) button without creating an account.

### Key Entities

- **Account**: Represents a financial account. Key attributes: name (display name), bank name (financial institution), routing number (bank routing identifier), account number (unique account identifier), status (defaults to "open" for new accounts), balance (defaults to 0 for new accounts).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create a new account from the dashboard in under 30 seconds (open drawer, fill 4 fields, submit).
- **SC-002**: After successful creation, the newly created account is visible in the accounts list without manual page refresh.
- **SC-003**: After successful creation, the account detail drawer automatically opens showing the new account's information.
- **SC-004**: 100% of form submissions with empty required fields are blocked with visible validation messages.
- **SC-005**: Failed creation attempts preserve all user-entered data so users do not have to re-enter information.

## Assumptions

- New accounts are created with a default status of "open" and a balance of 0 — these are not user-editable during creation.
- The `bank_icon` field is not required from the user and will be set to an empty string during creation.
- The "Add Account" button already exists on the accounts dashboard toolbar (as shown in screenshots) — this feature implements the drawer and creation logic behind it.
- The existing account detail drawer (from feature 001-account-drawer) is available and will be reused to display the newly created account after creation.
