import { Page, Locator, expect } from '@playwright/test';
import { getRouteUrl } from '../utils/helper-functions';
import { apiRoutes, testRoutes } from '../utils/test-data';

export class HomeSidebarCategoriesPage {
  readonly page: Page;
  readonly sidebarNav: Locator;
  readonly categoryLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    // Sidebar navigation is the <nav> with aria-label="Product categories"
    this.sidebarNav = page.getByRole('navigation', {
      name: 'Product categories',
    });
    // All category links are direct children <a> inside the sidebar
    this.categoryLinks = this.sidebarNav.locator('a');
  }

  async clickCategoryByName(name: string, type: 'button' | 'link') {
    // Clicks a sidebar category link by visible text
    const link = this.sidebarNav.getByRole(type, { name });
    await expect(link).toBeVisible();
    await link.click();
  }

  async clickCategoryByIndex(index: number) {
    // Clicks a sidebar category link by index (0-based)
    const link = this.categoryLinks.nth(index);
    await expect(link).toBeVisible();
    await link.click();
  }

  async clickSubcategoryDropdownByName(name: string) {
    // Clicks a sidebar dropdown button by visible text (for categories with subcategories)
    const button = this.sidebarNav.getByRole('link', { name });
    await expect(button).toBeVisible();
    await button.click();
  }

  async clickSubcategoryLinkByName(
    parentCategory: string,
    subcategory: string
  ) {
    // Clicks a subcategory link after expanding the parent dropdown
    await this.clickCategoryByName(parentCategory, 'button');
    const subLink = this.page.getByRole('menuitem', {
      name: subcategory,
    });
    await expect(subLink).toBeVisible();
    await subLink.click();
  }

  async verifyNavigationToCategory(categoryId: string) {
    // Verifies the URL contains the correct category ID
    await expect(this.page).toHaveURL(new RegExp(`category=${categoryId}`));
  }

  async verifyNavigationToSubcategory(subcategoryId: string) {
    // Verifies the URL contains the correct subcategory ID
    await expect(this.page).toHaveURL(
      getRouteUrl(`${testRoutes.allProducts}?subCategory=${subcategoryId}`)
    );
  }

  async goBackToHomePage() {
    // Clicks the "Home" link in the sidebar
    await this.page.getByTestId('home-link').click();
  }
}
