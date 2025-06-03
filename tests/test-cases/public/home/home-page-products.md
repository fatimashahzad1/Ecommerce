## Test Suite: Homepage Products Sections

### Test Case ID: TC-HOME-FLASH-01

**Test Case Name:** Verify Flash Sales Timer and Product Listings
**Test Item(s):** Flash Sales Timer, Product Cards, Slider Navigation

**Requirement(s) Covered:**

- Flash Sales section displays a dynamic countdown timer and products with discounts

**Input Specifications:**

- User action: Observe the Flash Sales section and interact with the slider

**Preconditions:**

- User is on the homepage
- Flash Sale products are fetched from the backend API `api/products`

**Test Data:**

- None

**Output Specifications:**

- Countdown timer displays time left in Days\:Hours\:Minutes\:Seconds format
- Products with discounts are displayed in a slider

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:**

- None

**Intercase Dependencies:**

- None

**Test Procedure Steps:**

1. Navigate to homepage
2. Verify that the "Today's" and "Flash Sales" headings are present
3. Observe the countdown timer and confirm it is counting down in the correct format
4. Interact with the slider buttons to move left and right through the product cards
5. Confirm that each product card shows a discount, original price, and current price
6. Click on the "View All Products" button
7. Verify that the browser navigates to the Flash Sales products page

**Pass/Fail Criteria:**

- **Pass:** Timer is counting down correctly, product cards display the required information, and navigation works as expected
- **Fail:** Timer is not present or incorrect, product cards do not display the required information, or navigation does not work as expected

---

### Test Case ID: TC-HOME-BESTSELL-01

**Test Case Name:** Verify Best Selling Products Listings
**Test Item(s):** Best Selling Products Cards, Slider Navigation

**Requirement(s) Covered:**

- Best Selling Products section displays products marked as best-selling

**Input Specifications:**

- User action: Observe the Best Selling Products section and interact with the slider

**Preconditions:**

- User is on the homepage
- Best Selling products are fetched from the backend API `api/products`

**Test Data:**

- None

**Output Specifications:**

- Products marked as best-selling are displayed in a slider

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:**

- None

**Intercase Dependencies:**

- None

**Test Procedure Steps:**

1. Navigate to homepage
2. Verify that the "This Month" and "Best Selling Products" headings are present
3. Interact with the slider buttons to move left and right through the product cards
4. Confirm that each product card is marked as best-selling
5. Click on the "View All" button
6. Verify that the browser navigates to the Best Selling products page

**Pass/Fail Criteria:**

- **Pass:** Product cards display the best-selling mark, and navigation works as expected
- **Fail:** Product cards do not display the best-selling mark, or navigation does not work as expected

---

### Test Case ID: TC-HOME-EXPLORE-01

**Test Case Name:** Verify Explore Our Products Listings
**Test Item(s):** Explore Our Products Cards

**Requirement(s) Covered:**

- Explore Our Products section displays products marked as featured

**Input Specifications:**

- User action: Observe the Explore Our Products section

**Preconditions:**

- User is on the homepage
- Featured products are fetched from the backend API `api/products`

**Test Data:**

- None

**Output Specifications:**

- Products marked as featured are displayed in rows

**Environmental Needs:**

- Browser: Chrome v120.0
- OS: Windows 10

**Special Procedural Requirements:**

- None

**Intercase Dependencies:**

- None

**Test Procedure Steps:**

1. Navigate to homepage
2. Verify that the "Our Products" and "Explore Our Products" headings are present
3. Confirm that featured products are displayed in rows with a maximum of 4 products per row
4. Click on the "View All Products" button
5. Verify that the browser navigates to the All Products page

**Pass/Fail Criteria:**

- **Pass:** Product cards display the featured mark, and navigation works as expected
- **Fail:** Product cards do not display the featured mark, or navigation does not work as expected
