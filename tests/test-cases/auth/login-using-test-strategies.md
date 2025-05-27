# Login Functionality Test Suite

## Test Case: TC-LOGIN-01 — Successful User Login

**Test Item(s):** Input fields, Buttons

**Requirement(s) Covered:**

- User can log in with valid credentials

**Input Specifications:**

- User action: Enter valid credentials and click "Log In"

**Preconditions:**

- User is on the login page

**Test Data:**
| Field | Value |
|------------------------|----------|
| Email or Phone Number | (valid) |
| Password | Abc123 |

**Output Specifications:**

- Success toast is shown
- User navigates to the home page

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:**

- None

**Intercase Dependencies:**

- None

**Test Procedure Steps:**

1. Navigate to the login page
2. Enter a valid email or phone number into the "Email or Phone Number" input field
3. Enter "Abc123" into the "Password" input field
4. Click the "Log In" button
5. Verify that a success toast is shown
6. Verify that the user is redirected to the home page

**Pass/Fail Criteria:**

- **Pass:** User is redirected to the home page with a success toast
- **Fail:** User is not redirected or no success toast is shown

---

## Test Case: TC-LOGIN-02 — Invalid Email Format

**Test Item(s):** Input fields, Validation messages

**Requirement(s) Covered:**

- Form validation error is shown on invalid email format

**Input Specifications:**

- User action: Enter invalid email format and click "Log In"

**Preconditions:**

- User is on the login page

**Test Data:**
| Field | Value |
|------------------------|------------|
| Email or Phone Number | abc@gmail |
| Password | Abc123 |

**Output Specifications:**

- Validation error message "Please enter a valid email or phone number." is displayed

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:**

- None

**Intercase Dependencies:**

- None

**Test Procedure Steps:**

1. Navigate to the login page
2. Enter "abc@gmail" into the "Email or Phone Number" input field
3. Enter "Abc123" into the "Password" input field
4. Click the "Log In" button
5. Verify that the validation error message "Please enter a valid email or phone number." is displayed

**Pass/Fail Criteria:**

- **Pass:** Validation error message is displayed for the email field
- **Fail:** No validation error message is displayed or incorrect message is shown

---

## Test Case: TC-LOGIN-03 — Password Minimum Length Validation

**Test Item(s):** Input fields, Validation messages

**Requirement(s) Covered:**

- Form validation error is shown on password field for input less than 6 characters

**Input Specifications:**

- User action: Enter a password less than 6 characters and click "Log In"

**Preconditions:**

- User is on the login page

**Test Data:**
| Field | Value |
|------------------------|----------|
| Email or Phone Number | (valid) |
| Password | 123 |

**Output Specifications:**

- Validation error message "Password must be at least 6 characters" is displayed

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:**

- None

**Intercase Dependencies:**

- None

**Test Procedure Steps:**

1. Navigate to the login page
2. Enter a valid email or phone number into the "Email or Phone Number" input field
3. Enter "123" into the "Password" input field
4. Click the "Log In" button
5. Verify that the validation error message "Password must be at least 6 characters" is displayed

**Pass/Fail Criteria:**

- **Pass:** Validation error message is displayed for the password field
- **Fail:** No validation error message is displayed or incorrect message is shown

---

## Test Case: TC-LOGIN-04 — Required Field Validation for Email or Phone Number

**Test Item(s):** Input fields, Validation messages

**Requirement(s) Covered:**

- Required field validation for the Email or Phone Number field

**Input Specifications:**

- User action: Leave the Email or Phone Number field empty and attempt to log in

**Preconditions:**

- User is on the login page

**Test Data:**
| Field | Value |
|------------------------|---------|
| Email or Phone Number | [Empty] |
| Password | Abc123 |

**Output Specifications:**

- Validation error message "Please enter a valid email or phone number." is displayed

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:**

- None

**Intercase Dependencies:**

- None

**Test Procedure Steps:**

1. Navigate to the login page
2. Leave the "Email or Phone Number" input field empty
3. Enter "Abc123" into the "Password" input field
4. Click the "Log In" button
5. Verify that the validation error message "Please enter a valid email or phone number." is displayed

**Pass/Fail Criteria:**

- **Pass:** Validation error message is displayed for the email or phone number field
- **Fail:** No validation error message is displayed or incorrect message is shown

---

## Test Case: TC-LOGIN-05 — Required Field Validation for Password

**Test Item(s):** Input fields, Validation messages

**Requirement(s) Covered:**

- Required field validation for the Password field

**Input Specifications:**

- User action: Leave the Password field empty and attempt to log in

**Preconditions:**

- User is on the login page

**Test Data:**
| Field | Value |
|------------------------|---------|
| Email or Phone Number | (valid) |
| Password | [Empty] |

**Output Specifications:**

- Validation error message "Password must be at least 6 characters" is displayed

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:**

- None

**Intercase Dependencies:**

- None

**Test Procedure Steps:**

1. Navigate to the login page
2. Enter a valid email or phone number into the "Email or Phone Number" input field
3. Leave the "Password" input field empty
4. Click the "Log In" button
5. Verify that the validation error message "Password must be at least 6 characters" is displayed

**Pass/Fail Criteria:**

- **Pass:** Validation error message is displayed for the password field
- **Fail:** No validation error message is displayed or incorrect message is shown

---

## Test Case: TC-LOGIN-06 — Verify "Forgot Password?" Link Accessibility

**Test Item(s):** Buttons, Links

**Requirement(s) Covered:**

- Accessibility of the "Forgot Password?" link

**Input Specifications:**

- User action: Click on the "Forgot Password?" link

**Preconditions:**

- User is on the login page

**Test Data:**

- None required

**Output Specifications:**

- User is redirected to the "Forgot Password?" page

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:**

- None

**Intercase Dependencies:**

- None

**Test Procedure Steps:**

1. Navigate to the login page
2. Locate and click on the "Forgot Password?" link
3. Verify that the user is redirected to the "Forgot Password?" page

**Pass/Fail Criteria:**

- **Pass:** User is redirected to the "Forgot Password?" page
- **Fail:** User is not redirected or the link is not accessible

---

## Test Case: TC-LOGIN-07 — Prevention of Multiple Rapid Submissions

**Test Item(s):** Buttons, Input fields

**Requirement(s) Covered:**

- Security measure to prevent multiple rapid submissions

**Input Specifications:**

- User action: Attempt to submit the login form multiple times rapidly

**Preconditions:**

- User is on the login page

**Test Data:**
| Field | Value |
|------------------------|----------|
| Email or Phone Number | (valid) |
| Password | Abc123 |

**Output Specifications:**

- The system prevents rapid multiple submissions, possibly by disabling the "Log In" button temporarily

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:**

- Rapidly click the "Log In" button multiple times

**Intercase Dependencies:**

- None

**Test Procedure Steps:**

1. Navigate to the login page
2. Enter a valid email or phone number into the "Email or Phone Number" input field
3. Enter "Abc123" into the "Password" input field
4. Rapidly click the "Log In" button multiple times
5. Verify that the system prevents multiple rapid submissions

**Pass/Fail Criteria:**

- **Pass:** System prevents multiple rapid submissions
- **Fail:** System allows multiple rapid submissions
