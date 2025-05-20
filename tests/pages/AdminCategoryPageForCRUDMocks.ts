import { Page, Locator, expect } from '@playwright/test';
import { getRouteUrl } from '../utils/helper-functions';
import { testRoutes } from '../utils/test-data';

export class AdminCategoriesPage {
  readonly page: Page;
  readonly addCategoryButton: Locator;
  readonly categoryTable: Locator;
  readonly toast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addCategoryButton = page.locator("a[href='/admin/categories/add']");
    this.categoryTable = page.locator('table');
    this.toast = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto(getRouteUrl(testRoutes.adminCategories));
    await expect(this.page).toHaveURL(getRouteUrl(testRoutes.adminCategories));
  }

  async clickAddCategory() {
    await this.addCategoryButton.click();
  }

  async getCategoryRowByName(name: string) {
    return this.page
      .locator('tbody tr')
      .filter({ has: this.page.getByText(name) });
  }

  async clickEditCategory(name: string) {
    const row = await this.getCategoryRowByName(name);
    await row.getByRole('link', { name: 'Edit' }).click();
  }

  async clickDeleteCategory(name: string) {
    const row = await this.getCategoryRowByName(name);
    if (!(await row.isVisible())) {
      throw new Error(`Category ${name} not found`);
    }
    await row.getByRole('button', { name: 'Delete' }).click();
  }

  async expectCategoryVisible(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async expectCategoryNotVisible(name: string) {
    await expect(this.page.getByText(name)).not.toBeVisible();
  }

  async expectValidationError(message?: string) {
    if (message) {
      await expect(this.page.getByText(message)).toBeVisible();
    } else {
      await expect(this.page.locator('p.text-destructive')).toBeVisible();
    }
  }

  async addCategory(name: string, icon: string) {
    await this.clickAddCategory();
    // Select icon (assume native <select> for now)
    await this.page.getByLabel('Category Icon').selectOption(icon);
    await this.page.getByLabel('Category Name').fill(name);
    await this.page.getByRole('button', { name: /save|submit/i }).click();
  }

  async editCategory(oldName: string, newName: string) {
    await this.clickEditCategory(oldName);
    await this.page.getByLabel('Category Name').fill(newName);
    await this.page.getByRole('button', { name: /save|submit/i }).click();
  }

  async deleteCategory(name: string) {
    await this.clickDeleteCategory(name);
    // Confirm in modal (assume button with text 'Delete' is the confirm)
    await this.page
      .getByRole('button', { name: /^delete$/i })
      .last()
      .click();
  }
}
