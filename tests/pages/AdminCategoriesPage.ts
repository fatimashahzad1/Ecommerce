import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object for the Admin Categories Management Page
 * Encapsulates all actions and selectors for category CRUD and validation.
 */
export class AdminCategoriesPage {
  readonly page: Page;
  readonly manageCategoriesLink: Locator;
  readonly addCategoryButton: Locator;
  readonly categoryNameInput: Locator;
  readonly saveCategoryButton: Locator;
  readonly categoryList: Locator;
  readonly editCategoryButton: (name: string) => Locator;
  readonly deleteCategoryButton: (name: string) => Locator;
  readonly confirmDeleteButton: Locator;
  readonly validationError: Locator;
  readonly toast: Locator;
  readonly searchInput: Locator;
  readonly paginationControls: Locator;
  readonly iconDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.manageCategoriesLink = page.getByRole('link', {
      name: /Manage Categories/i,
    });
    this.addCategoryButton = page.getByRole('link', { name: 'Add Category' });
    this.categoryNameInput = page.getByLabel('Category Name');
    this.saveCategoryButton = page.getByRole('button', {
      name: /Save|Submit/i,
    });
    this.categoryList = page.getByText(
      'CategoriesAdd CategoryIconNameParentActions'
    );
    this.editCategoryButton = (name: string) =>
      page
        .locator('tr', { has: page.getByText(name) })
        .getByRole('link', { name: 'Edit' });
    this.deleteCategoryButton = (name: string) =>
      page
        .locator('tr', { hasText: name })
        .getByRole('button', { name: 'Delete' });
    this.confirmDeleteButton = page
      .locator('div')
      .filter({ hasText: /^CancelDelete$/ })
      .getByRole('button')
      .nth(1);
    this.validationError = page.locator('p.text-destructive');
    this.toast = page.getByRole('alert');
    this.searchInput = page.getByPlaceholder('Search categories');
    this.paginationControls = page.locator(
      '[data-testid="pagination-controls"]'
    );
    this.iconDropdown = page.getByLabel('Category Icon');
  }

  async goto() {
    await this.page.goto('/admin');
    await expect(this.manageCategoriesLink).toBeVisible();
    await this.manageCategoriesLink.click();
    await expect(this.categoryList).toBeVisible();
  }

  async addCategory(name: string, icon: string) {
    await this.addCategoryButton.click();
    await this.iconDropdown.selectOption(icon);
    await this.categoryNameInput.fill(name);
    await this.saveCategoryButton.click();
  }

  async editCategory(oldName: string, newName: string) {
    const button = this.editCategoryButton(oldName);
    if ((await button.count()) === 0) {
      throw new Error(`Edit button for category "${oldName}" not found`);
    }
    await button.first().click();
    await this.categoryNameInput.fill(newName);
    await this.saveCategoryButton.click();
  }

  async deleteCategory(name: string) {
    const button = this.deleteCategoryButton(name);
    if ((await button.count()) === 0) {
      throw new Error(`Delete button for category "${name}" not found`);
    }
    await button.first().click();
    await this.confirmDeleteButton.click();
  }

  async searchCategory(name: string) {
    await this.searchInput.fill(name);
  }
}
