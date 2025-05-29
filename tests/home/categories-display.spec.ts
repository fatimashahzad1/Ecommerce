import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePageCategoriesDisplay';
import { mockCategories } from '../mocks/categories';

test.describe('Categories Display Functionality', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    // Mock the categories API endpoint
    await page.route('**/api/categories', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCategories),
      });
    });

    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('Verify Categories Displayed in Slider', async () => {
    // Verify the heading is visible
    await expect(homePage.browseByCategoryHeading).toBeVisible();

    // Verify the slider is visible
    await expect(homePage.categorySlider).toBeVisible();

    // Verify each category from the mock data is displayed
    for (const category of mockCategories) {
      await homePage.verifyCategoryDisplayed(category.name);
    }

    // Verify the total number of category cards matches the mock data
    const cardCount = await homePage.categoryCards.count();
    expect(cardCount).toBe(mockCategories.length);
  });

  test('Verify Categories Display with API Error', async ({ page }) => {
    // Mock API error
    await page.route('**/api/categories', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    // Reload the page to trigger the error
    await homePage.navigate();

    // Verify error handling (assuming there's an error message displayed)
    const errorMessage = page.getByRole('alert');
    await expect(errorMessage).toBeVisible();
  });
});
