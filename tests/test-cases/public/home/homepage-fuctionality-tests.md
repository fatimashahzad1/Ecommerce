# Test Suite: Homepage Functionality

---

## Test Case ID: TC-HOME-01

**Test Case Name:** Change Website Language to Français
**Test Item(s):** Language Dropdown
**Requirement(s) Covered:**

- User can switch website language from English to Français

**Input Specifications:**

- User action: Select "Français" from the language dropdown

**Preconditions:**

- User is on the homepage
- Default language is English

**Test Data:**

- Languages: English, Français

**Output Specifications:**

- First header text and dropdown update to Français
- Services section content updates to Français

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:**

- Wait for the page to re-render after language switch

**Intercase Dependencies:** None

**Test Procedure Steps:**

1. Navigate to homepage
2. Locate the language dropdown in the first header
3. Select "Français" from the dropdown
4. Wait for the first header and services section content to update
5. Verify that the language of the first header and services section content is now in Français

**Pass/Fail Criteria:**

- **Pass:** First header and services section content are updated to Français
- **Fail:** Content does not update or only partially updates to Français

---

## Test Case ID: TC-HOME-02

**Test Case Name:** Verify Header Navigation Links
**Test Item(s):** Header Links
**Requirement(s) Covered:**

- Header contains links to Home, Contact, About

**Input Specifications:**

- User action: Click on each link in the header

**Preconditions:**

- User is on the homepage

**Test Data:**

- Links: Home, Contact, About

**Output Specifications:**

- Clicking on each link navigates to the corresponding page or section

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:** None

**Intercase Dependencies:** None

**Test Procedure Steps:**

1. Navigate to homepage
2. Locate and click the "Home" link in the second header
3. Verify that the page refreshes or remains on the homepage
4. Locate and click the "Contact" link
5. Verify that the page navigates to the Contact section or page
6. Locate and click the "About" link
7. Verify that the page navigates to the About section or page

**Pass/Fail Criteria:**

- **Pass:** Each link navigates to the correct page or section
- **Fail:** Any link does not navigate as expected or is missing

---

## Test Case ID: TC-HOME-03

**Test Case Name:** Navigate to Wishlist Page
**Test Item(s):** Wishlist Icon Button
**Requirement(s) Covered:**

- Clicking the Wishlist icon navigates to the Wishlist page

**Input Specifications:**

- User action: Click the Wishlist icon button with aria-label "Wishlist"

**Preconditions:**

- User is on the homepage

**Test Data:** None

**Output Specifications:**

- User is navigated to the Wishlist page

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:** None

**Intercase Dependencies:** None

**Test Procedure Steps:**

1. Navigate to homepage
2. Locate the Wishlist icon button with aria-label "Wishlist" and click it
3. Verify that the browser navigates to the Wishlist page

**Pass/Fail Criteria:**

- **Pass:** Browser navigates to the Wishlist page
- **Fail:** Browser does not navigate to the Wishlist page or navigates to an incorrect page

---

## Test Case ID: TC-HOME-04

**Test Case Name:** Navigate to Cart Page
**Test Item(s):** Cart Icon Button
**Requirement(s) Covered:**

- Clicking the Cart icon navigates to the Cart page

**Input Specifications:**

- User action: Click the Cart icon button with aria-label "Cart"

**Preconditions:**

- User is on the homepage

**Test Data:** None

**Output Specifications:**

- User is navigated to the Cart page

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:** None

**Intercase Dependencies:** None

**Test Procedure Steps:**

1. Navigate to homepage
2. Locate the Cart icon button with aria-label "Cart" and click it
3. Verify that the browser navigates to the Cart page

**Pass/Fail Criteria:**

- **Pass:** Browser navigates to the Cart page
- **Fail:** Browser does not navigate to the Cart page or navigates to an incorrect page

---

## Test Case ID: TC-HOME-05 (Updated)

**Test Case Name:** Contact Dropdown Navigation and Logout (Updated)
**Test Item(s):** Contact Icon Dropdown
**Requirement(s) Covered:**

- Contact dropdown provides navigation to the admin panel and logout option

**Input Specifications:**

- User action: Click the Contact icon dropdown and select "Manage My Account" or "Logout"

**Preconditions:**

- User is logged in as admin on the homepage

**Test Data:**

- Dropdown options: Manage My Account, Logout

**Output Specifications:**

- Selecting "Manage My Account" navigates to the admin panel
- Selecting "Logout" logs the user out

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:** None

**Intercase Dependencies:** TC-HOME-07 (Admin Login Process)

**Test Procedure Steps:**

1. Navigate to homepage and log in with admin credentials
2. Locate the Contact icon dropdown and click it
3. Select "Manage My Account" and verify navigation to admin panel
4. Click the Contact icon dropdown again and select "Logout"
5. Verify that the user is logged out and Contact icon dropdown is no longer visible

**Pass/Fail Criteria:**

- **Pass:** User is navigated to the admin panel and can log out successfully
- **Fail:** User is not navigated correctly or cannot log out

---

## Test Case ID: TC-HOME-06

**Test Case Name:** Verify Sign Up Link and Contact Icon Visibility Based on Login State
**Test Item(s):** Sign Up Link, Contact Icon Dropdown
**Requirement(s) Covered:**

- Sign Up link and Contact icon visibility changes based on user login state

**Input Specifications:**

- User action: Observe the visibility of Sign Up link and Contact icon

**Preconditions:**

- User is on the homepage

**Test Data:**

- Login credentials: fatima.shahzad@bitsol.tech, Abc1234@

**Output Specifications:**

- When logged in, Contact icon is visible, and Sign Up link is not
- When not logged in, Contact icon is not visible, and Sign Up link is

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:** None

**Intercase Dependencies:** None

**Test Procedure Steps:**

1. Navigate to homepage without logging in
2. Verify that the Sign Up link is visible and the Contact icon is not
3. Log in with provided admin credentials
4. Verify that the Sign Up link is no longer visible and the Contact icon is visible
5. Log out
6. Verify that the Sign Up link is visible again and the Contact icon is not

**Pass/Fail Criteria:**

- **Pass:** Sign Up link and Contact icon visibility changes correctly based on login state
- **Fail:** Sign Up link and Contact icon do not display as expected based on login state

---

## Test Case ID: TC-HOME-07

**Test Case Name:** Admin Login Process
**Test Item(s):** Login Fields, Login Button
**Requirement(s) Covered:**

- Admin user can log in through the Sign Up page

**Input Specifications:**

- User action: Enter credentials and click "Log in"

**Preconditions:**

- User is on the Sign Up page with a "Log in" link

**Test Data:**

- Email: fatima.shahzad@bitsol.tech
- Password: Abc1234@

**Output Specifications:**

- User is logged in and redirected to the homepage with admin access

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:** None

**Intercase Dependencies:** None

**Test Procedure Steps:**

1. Navigate to Sign Up page
2. Click on the "Log in" link
3. Enter email in the input field with placeholder "Email or Phone Number"
4. Enter "Abc1234@" in the input field with placeholder "Password"
5. Click the "Log in" button
6. Verify that the user is redirected to the homepage with admin access visible

**Pass/Fail Criteria:**

- **Pass:** User is logged in and has admin access on the homepage
- **Fail:** User is not logged in or does not have admin access
