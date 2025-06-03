## 🧪 Test Suite: Homepage Sidebar Categories Functionality

---

### ✅ Test Case ID: TC-HOME-SIDEBAR-01

**Test Case Name:** Verify Sidebar Category Navigation
**Test Item(s):** Sidebar Category Links

**Requirement(s) Covered:**
Clicking on a category link in the sidebar navigates to the corresponding listing page with specific products

**Input Specifications:**
User action: Click on a category link in the sidebar

**Preconditions:**

- User is on the homepage
- Categories are fetched and displayed from the backend API `api/categories`

**Test Data:**

- Category ID (dynamic)

**Output Specifications:**
Navigation to a listing page with products filtered by the selected category

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:**
None

**Intercase Dependencies:**
None

**Test Procedure Steps:**

1. Navigate to the homepage
2. Locate a category link in the sidebar
3. Click on the category link
4. Verify that the browser navigates to the listing page with URL format reflecting the category ID
5. Confirm that the listing page shows products related to the selected category

**Pass/Fail Criteria:**
✅ Pass: Browser navigates to the correct listing page with products filtered by the selected category
❌ Fail: Browser does not navigate correctly or filtering is incorrect

---

### ✅ Test Case ID: TC-HOME-SIDEBAR-02

**Test Case Name:** Verify Sidebar Subcategory Navigation
**Test Item(s):** Sidebar Subcategory Dropdown Links

**Requirement(s) Covered:**
Clicking on a subcategory link in the sidebar dropdown navigates to the corresponding listing page with specific products

**Input Specifications:**
User action: Click on a subcategory link in the sidebar dropdown

**Preconditions:**

- User is on the homepage
- Subcategories are fetched and displayed from the backend API `api/categories`

**Test Data:**

- Subcategory ID (dynamic)

**Output Specifications:**
Navigation to a listing page with products filtered by the selected subcategory

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:**
None

**Intercase Dependencies:**
None

**Test Procedure Steps:**

1. Navigate to the homepage
2. Locate a subcategory link in the sidebar dropdown
3. Click on the subcategory link
4. await page.goto('https://ecommerce-omega-three-23.vercel.app/');
5. Confirm that the listing page shows products related to the selected subcategory

**Pass/Fail Criteria:**
✅ Pass: Browser navigates to the correct listing page with products filtered by the selected subcategory
❌ Fail: Navigation or filtering fails
