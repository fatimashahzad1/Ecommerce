export const ROUTE_LINKS = {
  home: '/',
  contact: '/contact',
  about: '/about',
  signup: '/signup',
  login: '/login',
  cart: '/cart',
  checkout: '/checkout',
  wishlist: '/wishlist',
  shop: '/shop',
  privacy: '/privacy',
  terms: '/terms',
  faq: '/faq',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  flashSaleProducts: '/products/flash-sales',
  bestSellingProducts: '/products/best-selling',
  allProducts: '/products/all',
  adminDashboard: '/admin',
  adminCategories: '/admin/categories',
  adminProducts: '/admin/products',
  addCategory: '/admin/categories/add',
  addProduct: '/admin/products/add',
  productDetails: (id: string) => `/products/details?id=${id}`,
};
export const MAIN_HEADER_ROUTES = [
  { href: ROUTE_LINKS.home, label: 'Home', 'data-testid': 'home-link' },
  {
    href: ROUTE_LINKS.contact,
    label: 'Contact',
    'data-testid': 'contact-link',
  },
  { href: ROUTE_LINKS.about, label: 'About', 'data-testid': 'about-link' },
  { href: ROUTE_LINKS.signup, label: 'Sign Up', 'data-testid': 'signup-link' },
];

export const AUTH_PAGES = [
  ROUTE_LINKS.login,
  ROUTE_LINKS.signup,
  ROUTE_LINKS.forgotPassword,
  ROUTE_LINKS.resetPassword,
];
