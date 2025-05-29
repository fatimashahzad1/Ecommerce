import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePageApiMock';
import { NavbarPage } from '../pages/NavbarPage';
import { getRouteUrl } from '../utils/helper-functions';
import { testRoutes } from '../utils/test-data';
import { mockCategories, mockCategoriesEmpty } from '../mocks/categories';
import { mockProducts } from '../mocks/products';
import { mockApiRoutes } from '../mocks/api/home';

// Home Page Test Suite
// Home Page Test Suite

test.describe('Home Page', () => {
  let homePage: HomePage;
  let navbar: NavbarPage;

  test.beforeEach(async ({ page }) => {
    await mockApiRoutes(page); // Default: success mocks
    homePage = new HomePage(page);
    navbar = new NavbarPage(page);
    await homePage.goto(getRouteUrl(testRoutes.home));
  });

  test('TC-037: Verify Categories from API are Displayed (pass)', async () => {
    // Already mocked in beforeEach
    const uiCategories = await homePage.getCategoryNames();
    const mockCategoriesNames = mockCategories.map((c) => c.name);
    expect(uiCategories).toEqual(expect.arrayContaining(mockCategoriesNames));
  });

  test('TC-037: Verify Categories from API are Displayed (fail - missing category)', async ({
    page,
  }) => {
    // Remock with empty categories
    await mockApiRoutes(page, { categories: mockCategoriesEmpty });
    await homePage.goto(getRouteUrl(testRoutes.home));
    const uiCategories = await homePage.getCategoryNames();
    expect(uiCategories.length).toBe(0);
  });

  test('TC-038: Verify Featured Products Section Displays Products (pass)', async () => {
    await homePage.scrollToProducts(true);
    const cards = await homePage.getProductCards(true);
    expect(cards.length).toBeGreaterThan(0);
    const featuredProducts = mockProducts.filter((p) => p.featured === true);
    for (const [i, card] of Array.from(cards.entries())) {
      const { title, price } = await homePage.getProductCardDetails(card);
      expect(title).toBe(featuredProducts[i].title);
      expect(price).toBe(featuredProducts[i].price);
    }
  });

  test('TC-038: Verify Featured Products Section Displays Products (fail - section empty)', async ({
    page,
  }) => {
    await mockApiRoutes(page, { products: [] });
    await homePage.goto(getRouteUrl(testRoutes.home));
    await homePage.scrollToProducts(true);
    const cards = await homePage.getProductCards();
    expect(cards.length).toBe(0);
  });

  test('TC-039: Navigate to "All Products" from Home Page (pass)', async () => {
    await homePage.clickViewAllProducts();
    await expect(homePage.page).toHaveURL(new RegExp(testRoutes.allProducts));
  });

  test('TC-039: Navigate to "All Products" from Home Page (fail - navigation fails)', async ({
    page,
  }) => {
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(
        (el) => /all products/i.test(el.textContent || '')
      );
      if (btn) btn.setAttribute('onclick', 'event.preventDefault()');
    });
    await homePage.clickViewAllProducts();
    await expect(page).not.toHaveURL(new RegExp(testRoutes.allProducts));
  });
});
