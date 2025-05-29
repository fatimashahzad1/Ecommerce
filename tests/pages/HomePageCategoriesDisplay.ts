import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly browseByCategoryHeading: Locator;
  readonly categorySlider: Locator;
  readonly categoryCards: Locator;
  readonly categoriesSection: Locator;

  constructor(page: Page) {
    this.page = page;
    // Assuming "Categories" is a more general heading for the section
    this.categoriesSection = page.getByRole('region', {
      name: 'Category slider',
    });

    // "Browse By Category" is a specific heading within that section
    this.browseByCategoryHeading = this.page.getByRole('heading', {
      name: 'Browse By Category',
    });

    // Placeholder for category slider - this will likely need to be inspected and updated
    // Looking for a div that likely acts as a container for the category cards,
    // often sliders have classes like 'slider', 'carousel', or specific data attributes.
    this.categorySlider = this.page.getByRole('region', {
      name: 'Category slider',
    });

    // Placeholder for category cards - these are expected to be children of the slider
    // Common patterns include 'article', 'div' with class 'card', or items with a role.
    this.categoryCards = this.categorySlider.locator(
      'a[aria-label^="View products in "]'
    );
  }

  async navigate() {
    await this.page.goto('https://ecommerce-omega-three-23.vercel.app/');
  }

  async getCategoryCardByName(name: string): Promise<Locator> {
    // We'll look for a card that contains the category name.
    // This assumes the category name is visible text within the card.
    return this.page.getByRole('link', { name: `View products in ${name}` });
  }

  async verifyCategoryDisplayed(name: string) {
    const card = await this.getCategoryCardByName(name);
    await expect(card).toBeVisible();
  }
}
