import { Page, Locator, expect } from '@playwright/test';
import { mockCategories } from '../mocks/categories';

export class HomePage {
  readonly page: Page;
  // Section selectors
  readonly navbar: Locator;
  readonly hero: Locator;
  readonly categoriesSection: Locator;
  readonly productsFeaturedSection: Locator;
  readonly productsFlashSaleSection: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = page.getByText('HomeContactAboutSign Up');
    this.hero = page.getByTestId('hero-section'); // fallback to locator if no testid
    this.categoriesSection = page.getByRole('region', { name: /categories/i });
    this.productsFeaturedSection = page.getByRole('region', {
      name: 'Featured products',
    });
    this.productsFlashSaleSection = page.getByRole('region', {
      name: 'Flash sale products',
    });
    this.footer = page.getByRole('contentinfo');
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async expectAllSectionsVisible() {
    await expect(this.navbar).toBeVisible();
    await expect(this.hero).toBeVisible();
    await expect(this.categoriesSection).toBeVisible();
    await expect(this.productsFeaturedSection).toBeVisible();
    await expect(this.productsFlashSaleSection).toBeVisible();
    await expect(this.footer).toBeVisible();
  }

  async scrollToProducts(feature = false) {
    if (feature) {
      await this.productsFeaturedSection.scrollIntoViewIfNeeded();
    } else {
      await this.productsFlashSaleSection.scrollIntoViewIfNeeded();
    }
  }

  async getCategoryNames(): Promise<string[]> {
    // Use Playwright's getByRole for each mock category name
    const categoryNames = mockCategories.map((c) => c.name);
    const visibleCategories: string[] = [];
    for (const name of categoryNames) {
      const locator = this.page.getByRole('link', {
        name: `View products in ${name}`,
      });
      if (await locator.isVisible()) {
        visibleCategories.push(name);
      }
    }
    return visibleCategories;
  }

  async getProductCards(feature = false): Promise<Locator[]> {
    if (feature) {
      return this.getSliderProducts();
    } else {
      return this.productsFlashSaleSection
        .locator('[data-testid="product-card"], article, .product-card')
        .all();
    }
  }

  async getProductCardDetails(card: Locator) {
    // Title: h3 heading
    const title = await card.locator('h3').first().textContent();
    // Price: first span with $ (not line-through)
    const priceText = await card
      .locator('span')
      .filter({ hasText: '$' })
      .first()
      .textContent();
    const price = Number(priceText?.split('$')[1]);
    return { title, price };
  }

  async clickViewAllProducts() {
    // Try button or link with text
    const btn = this.page.getByRole('button', { name: /all products/i });
    if (await btn.isVisible()) {
      await btn.click();
      return;
    }
    const link = this.page.getByRole('link', { name: /all products/i });
    if (await link.isVisible()) {
      await link.click();
      return;
    }
    // Fallback: try text
    await this.page
      .getByRole('link', { name: 'View all featured products' })
      .click();
  }

  async getSliderProducts(): Promise<Locator[]> {
    const slider = await this.page.getByRole('grid', {
      name: 'Featured products grid',
    });
    // Each product is a direct child div of the slider
    return slider.locator('> div').all();
  }
}
