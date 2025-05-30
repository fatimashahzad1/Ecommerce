import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePageCategoriesDisplay';
import { extractCategoriesFromHAR } from '../utils/har-files'; // dynamically fetch from HAR

test.describe('Categories Display Functionality', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }, testInfo) => {
    // Use HAR mocking only for the relevant test
    if (testInfo.title.includes('Verify Categories Displayed in Slider')) {
      await page.context().routeFromHAR('./hars/categories.har', {
        url: '**/api/categories',
        update: true,
        updateContent: 'embed',
      });
    }

    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('Verify Categories Displayed in Slider', async ({ page }) => {
    const categoriesWithSubCategories = extractCategoriesFromHAR(
      './hars/categories.har'
    );
    const categories = categoriesWithSubCategories.filter(
      (category) => !category.parentId
    );

    await expect(homePage.browseByCategoryHeading).toBeVisible();
    await expect(homePage.categorySlider).toBeVisible();

    for (const category of categories) {
      await homePage.verifyCategoryDisplayed(category.name);
    }

    const cardCount = await homePage.categoryCards.count();
    expect(cardCount).toBe(categories.length);
  });

  test('Verify Categories Display with API Error', async ({ page }) => {
    await page.route('**/api/categories', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await homePage.navigate();

    const errorMessage = page.getByRole('alert');
    await expect(errorMessage).toBeVisible();
  });
});
