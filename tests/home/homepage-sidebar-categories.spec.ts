import { test, expect } from '@playwright/test';
import { HomeSidebarCategoriesPage } from '../pages/HomeSidebarCategoriesPage';
import { CategoryListingPage } from '../pages/CategoryListingPage';
import { baseUrl, apiRoutes } from '../utils/test-data';
import { getRouteUrl } from '../utils/helper-functions';
import { Product } from '@/types/products';

// Example mock data for categories and subcategories
const mockCategoriesWithoutSubCategories = [
  {
    id: '93DwQEeAhKqAI1lQM0CM',
    name: 'Electronics',
    icon: 'Electronics',
  },
  {
    id: 'EoCWwRRsiQQg6SXcgGX5',
    name: 'Sports & Outdoor',
    icon: 'Sports & Outdoor',
  },

  {
    id: 'HDMuQm14M0gMMOh0ii97',
    name: 'Health & Beauty',
    icon: 'Health & Beauty',
  },

  {
    id: 'Ne8Q1l6OtM0sSdvAE1S0',
    icon: 'Medicine',
    name: 'Medicine',
  },

  {
    id: 'X0Rd5pjATay2hj7YwmoH',
    name: 'Phones',
    icon: 'Phones',
  },
  {
    id: 'anyBPFhEvtuhFMncZe4s',
    name: 'Groceries & Pets',
    icon: 'Groceries & Pets',
  },
  {
    id: 'bmJ1EbSSRNrxjzVt4NYm',
    name: 'Gaming',
    icon: 'Gaming',
  },
  {
    id: 'du6rdxCuf9WVe6AMnDmC',
    icon: 'Electronics',
    name: 'Computers',
  },
  {
    id: 'es6tsLllXfmBwXxObtUx',
    name: "Baby's & Toys",
    icon: "Baby's & Toys",
  },
  {
    id: 'glAuY7t8YVaxUaqrtwx4',
    icon: 'Camera',
    name: 'Camera',
  },
];

const mockCategoriesWithSubCategories = [
  {
    id: 'qcGgAKM9hafWNdCOqeZr',
    name: "Woman's Fashion",
    icon: "Woman's Fashion",
  },
  {
    id: 'gnPxiaD7751EhS66mDsJ',
    icon: "Men's Fashion",
    name: "Men's Fashion",
  },
  {
    id: 'ycZz9PK3p2WV9bGIv1i1',
    parentId: 'qcGgAKM9hafWNdCOqeZr',
    name: 'Tops',
    icon: "Woman's Fashion",
  },
  {
    id: '31g32gsDN8UvzNPqynKr',
    parentId: 'gnPxiaD7751EhS66mDsJ',
    icon: "Men's Fashion",
    name: 'Pants',
  },
  {
    id: 'AG2XEe6tz7wjlN95MNr6',
    name: 'Accessories',
    parentId: 'gnPxiaD7751EhS66mDsJ',
    icon: "Men's Fashion",
  },
  {
    id: 'CgNbSXO2lYuS706liPFE',
    name: 'Shirts',
    icon: "Men's Fashion",
    parentId: 'gnPxiaD7751EhS66mDsJ',
  },
  {
    id: 'GDj4D9S3LgqBct0FLTh0',
    icon: "Woman's Fashion",
    name: 'Dresses',
    parentId: 'qcGgAKM9hafWNdCOqeZr',
  },
  {
    id: 'NY4qgvMm4siVjdUAYaq6',
    icon: "Woman's Fashion",
    name: 'Accessories',
    parentId: 'qcGgAKM9hafWNdCOqeZr',
  },
  {
    id: 'OtQkAupeKOCP9OncpF1m',
    parentId: 'qcGgAKM9hafWNdCOqeZr',
    name: 'Shoes',
    icon: "Woman's Fashion",
  },

  {
    id: 'tOwP26EQB5sNAXxkUCrG',
    icon: "Men's Fashion",
    parentId: 'gnPxiaD7751EhS66mDsJ',
    name: 'Shoes',
  },
];

let mockProducts: any[] = [
  {
    id: '28ekDdakRmD33uebsRMF',
    rating: 4,
    price: 500,
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/20d353ac44b58ec5f72c8d04bb30c4c1d00e24a2',
    reviewCount: 145,
    title: 'Curology Product Set',
  },
  {
    id: 'FOMrYCg4jFRvcFK3nXyp',
    rating: 5,
    originalPrice: 1160,
    bestSelling: false,
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/a63f2121f90daf2ab08177b2c545287b6d96bcd8?placeholderIfAbsent=true',
    subcategoryId: 'NY4qgvMm4siVjdUAYaq6',
    colors: ['brown', 'black'],
    description:
      'Luxury duffle bag made with premium materials. Perfect for travel and daily use.',
    categoryId: 'qcGgAKM9hafWNdCOqeZr',
    stockStatus: 'In Stock',
    price: 960,
    gallery: [],
    reviewCount: 65,
    title: 'Gucci Duffle Bag',
    sizes: [],
    featured: true,
  },
  {
    id: 'KHU2qbAQ0qIvkuDkYGAB',
    title: 'Curology Product Set',
    rating: 4,
    price: 500,
    reviewCount: 145,
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/20d353ac44b58ec5f72c8d04bb30c4c1d00e24a2',
  },
  {
    id: 'QOWjpgTSh9ZeCXajcBOf',
    title: 'RGB Liquid CPU Cooler',
    stockStatus: 'In Stock',
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/cd8d81ae34c65d85c51a91e2c58adcef16f6fa28?placeholderIfAbsent=true',
    price: 160,
    colors: ['black'],
    description:
      'High-performance liquid CPU cooler with RGB lighting. Keeps your system cool and stylish.',
    rating: 5,
    gallery: [],
    reviewCount: 65,
    featured: true,
    originalPrice: 170,
    categoryId: 'du6rdxCuf9WVe6AMnDmC',
    bestSelling: false,
    sizes: [],
  },
  {
    id: 'S4Uk27AjL5acrehfHb6N',
    price: 100,
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/d026a43de889a045e41d702be35b797005481ad0',
    reviewCount: 35,
    title: 'Breed Dry Dog Food',
    rating: 4,
  },
  {
    id: 'Z8TYjUjoxBFjziW4dpqU',
    rating: 4,
    title: 'HAVIT HV-G92 Gamepad',
    description:
      'PlayStation 5 Controller Skin. High-quality vinyl with air channel adhesive for easy bubble-free install & mess-free removal. Pressure sensitive.',
    discount: 40,
    originalPrice: 160,
    sizes: [
      {
        size: 'XS',
        count: 10,
      },
      {
        count: 15,
        size: 'S',
      },
      {
        size: 'M',
        count: 20,
      },
      {
        count: 5,
        size: 'L',
      },
      {
        count: 2,
        size: 'XL',
      },
    ],
    stockStatus: 'In Stock',
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/588809589ffa0596f29be2fe0bc17a99982f7d41',
    colors: ['red', 'blue', 'black'],
    price: 120,
    reviewCount: 88,
    featured: true,
  },
  {
    id: 'ZL0RIuSBQhpVEn38poIY',
    sizes: [
      {
        size: 'S',
        count: 5,
      },
      {
        size: 'M',
        count: 10,
      },
      {
        size: 'L',
        count: 15,
      },
      {
        count: 20,
        size: 'XL',
      },
    ],
    reviewCount: 0,
    gallery: [],
    bestSelling: true,
    subcategoryId: '',
    originalPrice: 0,
    rating: 0,
    description: 'This is a test product.',
    featured: true,
    title: 'Updated Test Product',
    stockStatus: 'In Stock',
    categoryId: '93DwQEeAhKqAI1lQM0CM',
    price: 99.99,
    discount: 0,
    image:
      'https://res.cloudinary.com/dwwten9jp/image/upload/v1747987043/products/hxao9fypyfwvpdmuzumz.jpg',
  },
  {
    id: 'aU2smMl3LfBFh3x2j0wt',
    rating: 5,
    gallery: [],
    originalPrice: 360,
    price: 260,
    bestSelling: false,
    colors: ['red', 'blue', 'black'],
    stockStatus: 'In Stock',
    featured: true,
    categoryId: 'qcGgAKM9hafWNdCOqeZr',
    subcategoryId: 'ycZz9PK3p2WV9bGIv1i1',
    description:
      'Stylish and warm winter coat made with high-quality materials. Perfect for cold weather.',
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/e7432ac52b7277818e216f4cce703ac420b3cab8?placeholderIfAbsent=true',
    sizes: [
      {
        size: 'S',
        count: 12,
      },
      {
        count: 8,
        size: 'M',
      },
      {
        count: 5,
        size: 'L',
      },
      {
        count: 3,
        size: 'XL',
      },
    ],
    reviewCount: 65,
    title: 'The North Coat',
  },
  {
    id: 'cB1Ccj5kfYXNP3ehMLNh',
    reviewCount: 325,
    description: '',
    price: 700,
    featured: false,
    title: 'ASUS FHD Gaming Laptop',
    categoryId: 'du6rdxCuf9WVe6AMnDmC',
    gallery: [],
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/1576308dad6976ed06f0b14aabd09fb00cb43e78',
    bestSelling: false,
    rating: 5,
  },
  {
    id: 'gfLAD0kyDp6WIUvvC2Uu',
    categoryId: 'qcGgAKM9hafWNdCOqeZr',
    price: 7,
    image:
      'https://res.cloudinary.com/dwwten9jp/image/upload/v1748521857/products/bnahkdfpvwxvhwvw74pi.png',
    description: '',
    reviewCount: 0,
    featured: true,
    originalPrice: 0,
    subcategoryId: '',
    bestSelling: true,
    title: 'test product',
    discount: 0,
    rating: 0,
    stockStatus: 'In Stock',
    gallery: [],
  },
  {
    id: 'haYpRGQdnuh0ywsSVwVx',
    description:
      'Ergonomic design with mechanical keys for a smooth typing experience. Durable and long-lasting.',
    sizes: [],
    stockStatus: 'In Stock',
    categoryId: 'du6rdxCuf9WVe6AMnDmC',
    discount: 35,
    colors: ['black', 'white'],
    price: 960,
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/32e9a1600318286879ba42afbcf26b480ae071b0',
    title: 'AK-900 Wired Keyboard',
    featured: false,
    originalPrice: 1160,
    gallery: [],
    reviewCount: 75,
    rating: 4,
    bestSelling: true,
    subcategoryId: 'NY4qgvMm4siVjdUAYaq6',
  },
  {
    id: 'jNlZdZ4ByHIYE4FqET1x',
    featured: false,
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/05e7c1dcedafbdf9d1a898a97483cfcadcc01a2b',
    reviewCount: 95,
    description: '',
    title: 'CANON EOS DSLR Camera',
    gallery: [],
    price: 360,
    bestSelling: false,
    rating: 4,
    categoryId: 'glAuY7t8YVaxUaqrtwx4',
  },
  {
    id: 'x4s7zlrQKh1CZgpSZuku',
    stockStatus: 'In Stock',
    bestSelling: true,
    discount: 25,
    description:
      'Ergonomic office chair with lumbar support and adjustable height. Designed for long hours of comfort.',
    originalPrice: 400,
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/d9422fa273d9c73fa03429a1516009cf254f5c07',
    title: 'S-Series Comfort Chair',
    rating: 4.5,
    price: 375,
    sizes: [],
    colors: ['gray', 'black'],
    reviewCount: 99,
  },
  {
    id: 'xvhQoIRWTaD66DQJ8NcD',
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/690018693f67fd8cc4949c739b0c81478431edfe',
    rating: 5,
    description:
      '27-inch IPS LCD monitor with 144Hz refresh rate and 1ms response time. Perfect for gaming and productivity.',
    discount: 30,
    price: 370,
    originalPrice: 400,
    sizes: [],
    colors: ['black'],
    title: 'IPS LCD Gaming Monitor',
    stockStatus: 'Limited Stock',
    reviewCount: 99,
  },
];

test.describe('Homepage Sidebar Categories Functionality', () => {
  let sidebarPage: HomeSidebarCategoriesPage;
  let listingPage: CategoryListingPage;

  test.beforeEach(async ({ page }) => {
    await page.route('**/api/products', async (route, request) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProducts),
      });
    });

    sidebarPage = new HomeSidebarCategoriesPage(page);
    listingPage = new CategoryListingPage(page);
    await page.goto(getRouteUrl('/'));
  });

  test('TC-HOME-SIDEBAR-01: Verify Sidebar Category Navigation (Pass)', async ({
    page,
  }) => {
    // Intercept categories API
    await page.route(`${baseUrl}${apiRoutes.categories}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCategoriesWithoutSubCategories),
      });
    });

    for (const category of mockCategoriesWithoutSubCategories) {
      await sidebarPage.clickCategoryByName(category.name, 'link');
      await sidebarPage.verifyNavigationToCategory(category.id);
      await listingPage.verifyProductsFilteredByCategory(category.name);
      await sidebarPage.goBackToHomePage();
    }
  });

  test('TC-HOME-SIDEBAR-02: Verify Sidebar Subcategory Navigation (Pass)', async ({
    page,
  }) => {
    // Intercept categories API
    await page.route(`${baseUrl}${apiRoutes.categories}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCategoriesWithSubCategories),
      });
    });
    await sidebarPage.clickSubcategoryLinkByName(
      mockCategoriesWithSubCategories[0].name,
      mockCategoriesWithSubCategories[2].name
    );
    await sidebarPage.verifyNavigationToSubcategory(
      mockCategoriesWithSubCategories[2].id
    );

    const filteredProducts = mockProducts.filter(
      (product) =>
        product.subcategoryId === mockCategoriesWithSubCategories[2].id
    );

    filteredProducts.forEach(async (product: Product) => {
      const text = await listingPage.verifyProductisPresent(product.title);
      await expect(text).toBeVisible();
    });
  });
});
