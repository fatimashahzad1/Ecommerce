# Current Sprint Tasks

## AUTH-001: Implement Firebase Authentication

Status: In Progress
Priority: High
Dependencies: None

### Requirements

- Firebase email/password authentication
- Protected routes for authenticated users
- Authentication state persistence
- Role-based access control

### Acceptance Criteria

1. Users can register with email/password
2. Users can login with email/password
3. Users can reset forgotten passwords
4. Protected routes are inaccessible without authentication
5. Authentication state persists across page reloads
6. Admin role is properly implemented

### Technical Notes

- Use Firebase Authentication SDK
- Implement protected routes using middleware
- Store authentication state in Redux
- Use Firebase security rules for role-based access

## AUTH-002: Implement Protected Routes and Features

Status: Pending
Priority: High
Dependencies: AUTH-001

### Requirements

- Protect wishlist page
- Protect cart functionality
- Protect user dashboard
- Implement route guards

### Acceptance Criteria

1. Unauthenticated users cannot access wishlist
2. Unauthenticated users cannot add items to wishlist
3. Cart items persist after page reload
4. Protected routes redirect to login page

### Technical Notes

- Use Next.js middleware for route protection
- Implement persistent cart using localStorage
- Add loading states for protected routes
- Handle authentication errors gracefully

## ADMIN-001: Implement Admin Dashboard

Status: In Progress
Priority: Medium
Dependencies: AUTH-001

### Requirements

- Admin authentication
- Product CRUD operations
- Category management (type updated for subcategories, hierarchical CRUD in progress)
- Sales tracking
- Admin dashboard UI

### Acceptance Criteria

1. Admin can login to dashboard
2. Admin can create, read, update, delete products
3. Admin can manage product categories (including subcategories)
4. Admin can view sales reports
5. Dashboard UI is responsive and user-friendly
6. Removed reviewCount field from admin product add/edit form. Field is no longer present in the UI or form data.

### Technical Notes

- Use Firebase Admin SDK
- Implement role-based access control
- Use Firestore for data storage
- Implement proper data validation

## DATA-001: Replace Mock Data with Firebase

Status: Pending
Priority: High
Dependencies: AUTH-001

### Requirements

- Remove all mock data
- Implement Firestore data fetching
- Add real-time updates
- Implement proper error handling

### Acceptance Criteria

1. All product data comes from Firestore
2. Real-time updates for product changes
3. Proper error handling for failed requests
4. Loading states for data fetching

### Technical Notes

- Use Firestore SDK for data operations
- Implement proper caching strategy
- Add error boundaries
- Use proper TypeScript types

## CART-001: Implement Persistent Cart

Status: Pending
Priority: Medium
Dependencies: AUTH-001

### Requirements

- Cart persistence across sessions
- Sync cart with Firebase
- Handle cart conflicts
- Implement cart cleanup

### Acceptance Criteria

1. Cart items remain after page reload
2. Cart syncs with user account when logged in
3. Handle multiple device cart conflicts
4. Implement cart expiration

### Technical Notes

- Use localStorage for guest cart
- Sync with Firestore for authenticated users
- Implement conflict resolution strategy
- Add cart cleanup mechanism

## Timeline and Priorities

### Phase 1: Authentication (Week 1-2)

- AUTH-001: Implement Firebase Authentication
- AUTH-002: Implement Protected Routes and Features

### Phase 2: Admin Dashboard (Week 3-4)

- ADMIN-001: Implement Admin Dashboard

### Phase 3: Data Migration (Week 5-6)

- DATA-001: Replace Mock Data with Firebase

### Phase 4: Cart Implementation (Week 7)

- CART-001: Implement Persistent Cart

## Notes

- All tasks require proper testing
- Documentation updates required for each task
- Code review required before merging
- Follow TypeScript best practices
- Implement proper error handling
- Add loading states for all async operations
