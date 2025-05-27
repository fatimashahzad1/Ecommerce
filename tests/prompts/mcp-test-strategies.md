## ✅ Generalized & Extensible Testing Strategies by Page Type

### 1. Listing (Index) Page

**Mocking:**

- Intercept all relevant API calls (`GET /items`, `GET /filters`, etc.).
- Use static datasets (5–10 items) with controlled values for filters/sorting.
- Support pagination/infinite scroll with paginated mocks.

**Validation:**

- Initial default item render.
- Filtering: single/multiple, combined, edge values.
- Sorting: ascending/descending, alpha, date, numeric.
- Pagination or scroll-based loading.
- Loading and empty states.
- Error handling for failed API.

**Extensible Features:**

- Bookmarking, bulk actions, column toggling.
- Role-based visibility of items/actions.

---

### 2. Detail Page

**Mocking:**

- Mock detail API by ID with unique attributes per item.
- Optional: Mock nested or dependent APIs (reviews, specs, activity).

**Validation:**

- Accurate rendering of all fields and nested data.
- Error handling: invalid/missing ID (e.g., 404 fallback).
- Dynamic sections (tabs, collapsibles, modals).
- Action buttons (e.g., Edit, Delete) behavior.

**Extensible Features:**

- Tabs, step flows, linked modals.
- Role-based access or editing.

---

### 3. Form Page (Create / Update)

**Mocking:**

- Intercept submission endpoints (`POST`, `PUT`).
- Use editable mocks for update flows.

**Validation:**

- Required field validation, regex, range checks.
- Server/client-side error messages.
- Conditional field rendering (e.g., show field if option selected).
- Submission flow: success toast, redirect, modal close.

**Extensible Features:**

- Multi-step forms.
- File uploads, dynamic fields, autosave.

---

### 4. Dashboard Page

**Mocking:**

- Metrics APIs (`GET /stats`, `GET /analytics`, etc.).
- Filters (e.g., time range, user role, tags).

**Validation:**

- KPI card values and consistency.
- Chart rendering and interactions (zoom, filter).
- Responsive layout and widgets visibility.
- Empty, loading, and error states.

**Extensible Features:**

- Custom widget drag-and-drop.
- Role-based data visibility.

---

### 5. Static Page

**Mocking:**

- Usually not required unless dynamic content (e.g., markdown injection).

**Validation:**

- Presence of core content (headers, paragraphs).
- Meta tags, SEO elements.
- Accessibility compliance (ARIA roles, contrast, landmarks).

**Extensible Features:**

- Expandable content sections.
- Embedded components or feeds.

---

### 6. Authentication Pages

**Mocking:**

- Login/signup/password APIs (`POST /auth/*`).
- Mock user sessions and tokens.

**Validation:**

- Client-side validation (email format, password length).
- Server-side error handling (e.g., 401, validation error).
- Success: redirect, session cookie/token, welcome UI.

**Extensible Features:**

- 2FA, social login, magic links.
- Forgot/reset password flow.

---

### 7. Error Pages (404, 500, etc.)

**Mocking:**

- Trigger client route not found (404) or backend error (500).

**Validation:**

- Correct error visuals, message text, iconography.
- Navigation buttons (e.g., “Go Home”, “Retry”).
- Error telemetry/tracking triggered if applicable.

**Extensible Features:**

- Custom illustrations, contextual help.

---

### 8. Profile / Settings Page

**Mocking:**

- Mock profile data fetch and update.
- Optional: API for preferences, security settings.

**Validation:**

- Field rendering with current user data.
- Update flow: validation, PUT request, confirmation.
- Sensitive actions (e.g., email/password change) with confirmation modals.

**Extensible Features:**

- Avatar upload, 2FA settings, notification prefs.

---

### 9. Search Results Page

**Mocking:**

- Search API (`GET /search?q=...`) with various response shapes.

**Validation:**

- Results render correctly for different queries.
- Sorting, pagination, relevance scores.
- "No results" empty state.
- URL reflects query state (deep-linkable).

**Extensible Features:**

- Autosuggest, search filters.
- Category or tag refinement.

---

### 10. Landing Page

**Mocking:**

- Optional: track interactions or form submissions.

**Validation:**

- Hero section, CTAs, testimonials, benefits sections render properly.
- CTA click behavior (scroll, modal, redirect).
- Responsive layout across breakpoints.

**Extensible Features:**

- A/B variant testing.
- Media/video playback validation.

---

### 11. Home Page

**Mocking:**

- APIs for dynamic blocks (e.g., banners, recommended products, user cards).

**Validation:**

- Header, nav, footer visibility.
- Render dynamic cards/blocks (e.g., personalized feeds).
- Role-based conditional sections.

**Extensible Features:**

- Banners with dismiss or carousel.
- Location-based rendering (e.g., region-specific cards).

---

## 🔁 Shared Best Practices (Reusable Across All Pages)

| Category           | Practice                                                                |
| ------------------ | ----------------------------------------------------------------------- |
| **Mocking**        | Use `page.route()` or `MCP intercept()` for stable mocks                |
| **Assertions**     | Prefer `getByRole`,`getByText`,`locator`, or semantic selectors         |
| **Visual Tests**   | Snapshot UI states for visual regression (optional, per feature)        |
| **Structure**      | Use Page Object Model (POM) to isolate selectors and flows              |
| **Reusability**    | Maintain prompt snippets in `mcp-prompt-library.md` for common patterns |
| **Accessibility**  | Check ARIA, keyboard nav, and screen reader roles                       |
| **Responsiveness** | Validate layout at key breakpoints (mobile, tablet, desktop)            |
