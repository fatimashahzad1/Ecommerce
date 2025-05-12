# 🧠 Copilot Custom Review Instructions for Playwright MCP Test Cases

These are the guidelines and expectations for writing and reviewing Playwright test cases in projects using the **Modular Component Pattern (MCP)**. Please ensure all test cases follow the structure and practices outlined below.

---

## 1. ✅ General Expectations

- Use **Playwright** with the **MCP (Modular Component Pattern)** structure.
- Ensure test cases are **modular**, **readable**, and **maintainable**.
- Use **clear, descriptive names** for test files, functions, and assertions.
- Eliminate **duplicated logic** by using shared components or helpers.

---

## 2. 🔁 Lifecycle Hook Usage

- Use **`beforeAll`** for global setup.

  - Example: launch browser, open base URL.

- Use **`beforeEach`** for per-test setup.

  - Example: navigate to homepage, reset wishlist.

- Use **`afterEach` / `afterAll`** for teardown and cleanup.
  - Example: clear session/local storage, logout, close browser.

---

## 3. 🎯 Element Selection

- Get elements by using identifiers such as visible text, tag, class, or id.
- If the element is not found using these methods, then fall back to using XPath.

---

## 4. 🧱 Test Structure & Modularity

- Write small, focused test cases using: **Setup → Action → Assertion**.
- Group reusable logic into:

  - Utility functions
  - Page objects
  - Component classes (if applicable)

- Avoid deeply nested or inline logic inside test bodies.

---

## 5. 📦 Modular Component Pattern (MCP)

- Group UI actions into **modular components** or **page objects**.
- Separate:

  - UI logic from test logic
  - Setup logic from assertions

- Reuse shared UI logic across test suites.

---

## 6. 🧪 Assertions and Readability

- Use `await expect(...)` syntax for clarity and stability.
- Make assertions:
  - Descriptive
  - Focused on behavior
  - Explicit (e.g., `toBeVisible`, `toHaveAttribute`, etc.)

---

## 7. 🧼 Clean Code Practices

- Remove:

  - Unused variables
  - Console logs
  - Commented-out code

- Keep tests focused on **one behavior or user journey**.
- Follow linting rules from `.eslintrc` or other configs.

---

## 8. 💡 Suggestions

When reviewing, suggest:

- Grouping logic into components or shared helpers
- Improving naming for readability
- Refactoring flaky or brittle selectors
- Removing redundant or unclear logic

---

## 🧹 How to Use This

When writing or reviewing Playwright tests:

- Follow lifecycle structure: `beforeAll`, `beforeEach`, `afterEach`, `afterAll`
- Ensure all UI interaction is MCP-based and modular
- Use clear and stable identifiers such as visible text, tag, class, or id. If these are not reliable or available, then use XPath as a fallback.
- Keep code clean, consistent, and maintainable
- Always make new testcase file that too with the name of textSuite ForExample: Test Suite Name="Patients Directory Listing and Filtering" then the generated file name would be patients-directory-listing-and-filtering.test.ts
