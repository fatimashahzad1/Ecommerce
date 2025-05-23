# Playwright MCP + POM Test Script Generator Prompt (for {{PROJECT\_NAME}})

---

You are generating Playwright test scripts using:

- ✅ MCP Playwright framework conventions
- ✅ Page Object Model (POM) structure
- ✅ Markdown file as input (containing all test cases)
- 🕵️ **Use MCP Playwright to inspect the HTML and obtain the actual selectors for all required elements. Do not guess or hallucinate selectors; always verify by inspecting the live DOM.**

---

## 🛠️ Project Conventions (Required)

- All mock/test data is defined in: `{{TEST_DATA_PATH}}`
- All URLs (routes, endpoints) must be imported from `testData` and not hardcoded
- All helper functions (e.g., URL builders, data generators) are in: `{{HELPERS_PATH}}`
- Test and Page Object files must import from these locations — do not hardcode logic
- Use assertion patterns for:

  - Toasts
  - Validation messages
  - Dropdowns

As specified in: `mcp-prompt-library.md`

---

## 🔗 Website Under Test

- **URL:** https://ecommerce-omega-three-23.vercel.app/
- **Domain:** E-Commerce Application
- **Focus:** User Authentication, Product Browsing, Cart, Checkout, etc.

---

## 📄 Input Format

You will receive a `.md` file with IEEE-style test cases including:

- Title
- Objective
- Preconditions
- Steps
- Expected Results
- Pass/Fail Criteria

---

## 🧭 Responsibilities

For each test case:

- Generate a Playwright `.spec.ts` test file with:

  - ✅ A passing scenario
  - ❌ A failing scenario

- Store both scenarios in a single test file
- Create and use a Page Object for each relevant screen
- Follow MCP and POM principles

---

## 🧱 Test Script Format

Each test must contain:

- Title (same as test case)
- Objective
- Preconditions (e.g., login, navigation)
- Steps using:

  - POM methods
  - `await`, `getByRole`, `getByText`, `locator()`

- Assertions

  - ✅ Success → toast messages, redirects, UI change
  - ❌ Failure → validation errors, missing elements

- Edge cases if applicable
- Traceability tag if required

---

## 🧩 Page Object Model Requirements

Each logical screen (e.g., Login, Cart, ProductList) must have its own class:

- Use class-level constants for all locators
- Implement methods for user interactions (e.g., `login()`, `addToCart()`)
- ✅ Prefer:

  - `getByRole`, `getByText`, `locator`, `id`, `class`

- ❌ Avoid:

  - `data-testid` (unless necessary)

### Supported Behaviors:

- Dropdowns:

  - Native: use `selectOption()`
  - Custom: click trigger + select option via text

- Date pickers:

  - Click input → select visible date

- Toasts:

  - Use `getByRole('alert')` and assert message/class

- Form Validation:

  - Detect errors using `.text-destructive` or `getByText()`

---

## 🧪 Output Directory Structure

```
/tests/{{MODULE}}/
  ├── {{feature}}.spec.ts

/tests/pages/
  ├── {{FeaturePage}}.ts

/tests/utils/
  ├── testData.ts
  ├── helper-functions.ts

/tests/fixtures/
  ├── customFixtures.ts
```

---

## ⚠️ Selector & Wait Rules

- ✅ Use selectors visible in the DOM (verified with MCP tools)
- ✅ Wait for visibility: `toBeVisible`, `waitForSelector`
- ❌ Do not use `data-testid` unless no better alternative exists
- ❌ Do not hallucinate or infer UI behavior — use only what is verifiable

---

## 📥 Once the `.md` file is provided:

For each test case:

- ✅ Generate `.spec.ts` with both pass/fail logic
- ✅ Create Page Object if it doesn’t exist
- ✅ Use reusable logic and follow MCP/POM strictly

---
