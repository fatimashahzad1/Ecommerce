# Admin Panel Product Management Test Cases

---

## TC-001: User Login with Valid Credentials

**Test Item(s):** Login Form  
**Requirement(s) Covered:** UC-AUTH-001 (User Authentication)

### Input Specifications

- **Email:** fatima.shahzad@bitsol.tech
- **Password:** Abc1234@

### Preconditions

- User is registered with the provided credentials
- Internet connection is active
- User is on the Login screen

### Test Data

- Valid registered email and password

### Output Specifications

- System logs in the user and redirects to the homepage

### Environmental Needs

- **Browser:** Chrome v120.0
- **OS:** Windows 10
- **Internet connection**

### Special Procedural Requirements

- None

### Intercase Dependencies

- None

### Test Procedure Steps

1. Navigate to home page(https://ecommerce-omega-three-23.vercel.app/)
2. Click on "Sign Up" from the main header
3. On the Sign-Up page, click on "Log In"
4. Enter `fatima.shahzad@bitsol.tech` in the email field
5. Enter `Abc1234@` in the password field
6. Click the "Login" button

### Pass/Fail Criteria

- ✅ **Pass:** User is redirected to the homepage and sees the contact icon in the header
- ❌ **Fail:** Error toast is displayed or user remains on the login page

---

## TC-002: Access Admin Panel from User Dropdown

**Test Item(s):** Admin Panel Navigation  
**Requirement(s) Covered:** UC-ADMIN-001 (Admin Panel Access)

### Input Specifications

- Logged-in user with admin privileges

### Preconditions

- User is logged in with admin credentials
- User is on the homepage

### Test Data

- Admin user session

### Output Specifications

- System navigates to the admin panel dashboard

### Environmental Needs

- **Browser:** Chrome v120.0
- **OS:** Windows 10
- **Internet connection**

### Special Procedural Requirements

- None

### Intercase Dependencies

- TC-001

### Test Procedure Steps

1. Ensure the user is logged in (refer to TC-001)
2. Click on the user icon in the header to open the dropdown menu
3. Click on "Admin Panel" from the dropdown

### Pass/Fail Criteria

- ✅ **Pass:** Admin panel dashboard is displayed with product management options
- ❌ **Fail:** User is denied access or redirected to an error page

---

## TC-003: Create a New Product in Admin Panel

**Test Item(s):** Product Creation Form  
**Requirement(s) Covered:** UC-PRODUCT-001 (Create Product)

### Input Specifications

- **Product Title:** "Test Product"
- **Description:** "This is a test product."
- **Price:** $99.99
- **Category:** "Electronics"
- **Image:** Valid image file

### Preconditions

- User is logged in as admin
- User is on the admin panel dashboard

### Test Data

- Valid product details

### Output Specifications

- New product is added and visible in the product list

### Environmental Needs

- **Browser:** Chrome v120.0
- **OS:** Windows 10
- **Internet connection**

### Special Procedural Requirements

- None

### Intercase Dependencies

- TC-002

### Test Procedure Steps

1. Navigate to the "Manage Products" section in the admin panel
2. Click on "Add Product"
3. Fill in the "Product Title", "Description" and "Price" as specified
4. Select Category
5. Upload a valid image file
6. Click the "Save Product" button

### Pass/Fail Criteria

- ✅ **Pass:** Product is added successfully and appears in the product list
- ❌ **Fail:** Form Validation Errors are being displayed and user remains on the same Add Product page

---

## TC-004: Edit an Existing Product in Admin Panel

**Test Item(s):** Product Edit Form  
**Requirement(s) Covered:** UC-PRODUCT-002 (Edit Product)

### Input Specifications

- **Updated Product Name:** "Updated Test Product"

### Preconditions

- User is logged in as admin
- At least one product exists in the product list

### Test Data

- Existing product details

### Output Specifications

- Product details are updated successfully

### Environmental Needs

- **Browser:** Chrome v120.0
- **OS:** Windows 10
- **Internet connection**

### Special Procedural Requirements

- None

### Intercase Dependencies

- TC-003

### Test Procedure Steps

1. Navigate to the "Manage Products" section in the admin panel
2. Locate the product named "Test Product"
3. Click on the "Edit" button next to the selected product
4. Update the product name to "Updated Test Product"
5. Click the "Save Changes" button

### Pass/Fail Criteria

- ✅ **Pass:** Product name is updated in the product list
- ❌ **Fail:** Changes are not saved or Form Validation Errors are being displayed and user remains on the same Edit Product page

---

## TC-005: Delete a Product in Admin Panel

**Test Item(s):** Product Deletion Functionality  
**Requirement(s) Covered:** UC-PRODUCT-003 (Delete Product)

### Input Specifications

- **Product to be deleted:** "Updated Test Product"

### Preconditions

- User is logged in as admin
- Product "Updated Test Product" exists in the product list

### Test Data

- Existing product details

### Output Specifications

- Product is removed from the product list

### Environmental Needs

- **Browser:** Chrome v120.0
- **OS:** Windows 10
- **Internet connection**

### Special Procedural Requirements

- None

### Intercase Dependencies

- TC-004

### Test Procedure Steps

1. Navigate to the "Manage Products" section in the admin panel
2. Locate the product named "Updated Test Product"
3. Click on the "Delete" button next to the product
4. Confirm the deletion in the prompt

### Pass/Fail Criteria

- ✅ **Pass:** Product is removed from the product list
- ❌ **Fail:** Product remains in the product list

---

## TC-006: Verify Pagination in Product List

**Test Item(s):** Pagination Controls  
**Requirement(s) Covered:** UC-PRODUCT-004 (Pagination Functionality)

### Input Specifications

- Multiple products exceeding the per-page limit

### Preconditions

- User is logged in as admin
- Product list contains more products than the per-page display limit

### Test Data

- Existing product entries

### Output Specifications

- Pagination controls function correctly, displaying appropriate products per page

### Environmental Needs

- **Browser:** Chrome v120.0
- **OS:** Windows 10
- **Internet connection**

### Special Procedural Requirements

- None

### Intercase Dependencies

- TC-003

### Test Procedure Steps

1. Navigate to the "Manage Products" section in the admin panel
2. Observe the pagination controls at the bottom of the product list
3. Click on the Next arrow icon button to navigate to the next page
4. Click on the Previous icon button to return to the previous page
5. Click on specific page numbers to navigate directly

### Pass/Fail Criteria

- ✅ **Pass:** Pagination controls navigate through product pages correctly
- ❌ **Fail:** Pagination controls are non-functional or display incorrect products

---

## TC-007: Verify Product Visibility on Main Page

**Test Item(s):** Product Display Sections  
**Requirement(s) Covered:** UC-PRODUCT-005 (Product Display on Homepage)

### Input Specifications

- Newly added product: "Test Product"

### Preconditions

- User is logged in as admin
- Product "Test Product" has been added via the admin panel along with "Featured" and "Best Selling" switch fields both set to true.

### Test Data

- Existing product details

### Output Specifications

- Product appears in relevant sections on the homepage

### Environmental Needs

- **Browser:** Chrome v120.0
- **OS:** Windows 10
- **Internet connection**

### Special Procedural Requirements

- None

### Intercase Dependencies

- TC-003

### Test Procedure Steps

1. Navigate to the homepage
2. Scroll to sections like "Best Selling Products" or "Explore Our Products"
3. Verify the presence of "Test Product" in these sections

### Pass/Fail Criteria

- ✅ **Pass:** "Test Product" is visible in the appropriate sections
- ❌ **Fail:** Product is not displayed or displayed incorrectly
