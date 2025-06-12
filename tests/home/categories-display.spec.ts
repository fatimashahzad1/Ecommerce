import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePageCategoriesDisplay';
import { mockCategories } from '../mocks/categories';
import { server } from '../mocks/msw/server';
import { rest } from 'msw';

test.describe('Categories Display Functionality', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('Verify Categories Displayed in Slider', async () => {
    await expect(homePage.browseByCategoryHeading).toBeVisible();
    await expect(homePage.categorySlider).toBeVisible();

    for (const category of mockCategories) {
      await homePage.verifyCategoryDisplayed(category.name);
    }

    const cardCount = await homePage.categoryCards.count();
    expect(cardCount).toBe(mockCategories.length);
  });

  test('Verify Categories Display with API Error', async () => {
    // Override MSW handler to return an error

    await homePage.navigate(true);
    const errorMessage = homePage.page.getByText('Failed to fetch categories');
    await expect(errorMessage).toBeVisible();

    // Snapshot test: capture the error message area
    await expect(errorMessage).toHaveScreenshot('categories-error-message.png');
  });
});
