// Centralized test data for Playwright E2E tests

export const baseUrl = 'https://ecommerce-omega-three-23.vercel.app';

export const testRoutes = {
  login: '/login',
  home: '/', // Update if dashboard route changes
  signup: '/signup',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  contact: '/contact',
  about: '/about',
  cart: '/cart',
  allProducts: '/products/all',
  // Add more named routes as needed
};

export const apiRoutes = {
  categories: '/api/categories',
  products: '/api/products',
};

export const testUsers = {
  valid: {
    email: 'fatima.shahzad@bitsol.tech',
    password: 'Abc1234@',
  },
  invalid: {
    email: 'fatima.shahzad@bitsol.tech',
    password: 'WrongPassword',
  },
  forgotPassword: {
    valid: 'testuser@example.com',
    unregistered: 'notregistered@example.com',
    invalidFormat: 'invalidemail.com',
    empty: '',
  },
};

export const newUser = {
  name: 'test user',
  email: 'testUser1@example.com',
  password: 'SecurePass123',
};
