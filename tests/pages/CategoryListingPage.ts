import { Page, Locator, expect } from '@playwright/test';

export class CategoryListingPage {
  readonly page: Page;
  readonly productGrid: Locator;

  constructor(page: Page) {
    this.page = page;
    // The product grid is the main region for product cards
    this.productGrid = page.getByRole('region', { name: /products/i });
  }

  async verifyProductsFilteredByCategory(categoryName: string) {
    // Verifies that all visible product cards are for the selected category
    const cards = this.productGrid.locator('.product-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card).toContainText(categoryName);
    }
  }

  async verifyProductisPresent(subcategoryName: string) {
    // Verifies that all visible product cards are for the selected subcategory
    return this.page.getByRole('heading', {
      name: subcategoryName,
    });
  }
}
