import { test, expect, Page } from '@playwright/test';
import { AdminCategoriesPage } from '../pages/AdminCategoryPageForCRUDMocks';
import { getRouteUrl } from '../utils/helper-functions';
import { categoryNames, testIcons, testRoutes } from '../utils/test-data';
import { mockCategoriesApi } from '../mocks/api/categoriesMocker';

async function loginAsAdmin(page: Page) {
  await page.goto(getRouteUrl(testRoutes.adminDashboard));
}

test.describe('Admin Categories Management', () => {
  test.beforeEach(async ({ page }) => {
    await mockCategoriesApi(page, { mode: 'success' });
    await loginAsAdmin(page);
  });

  test('TC-001: Access Categories Management Page (pass/fail)', async ({
    page,
  }) => {
    const categoriesPage = new AdminCategoriesPage(page);
    // Pass: Should load categories page and show categories
    await categoriesPage.goto();
    await expect(
      page.getByRole('heading', { name: /categories/i })
    ).toBeVisible();
    await expect(page.getByText('Add Category')).toBeVisible();
  });

  test('TC-002: Add New Category with Valid Data (pass/fail)', async ({
    page,
  }) => {
    const categoriesPage = new AdminCategoriesPage(page);
    await categoriesPage.goto();
    // Pass: Add valid category
    await categoriesPage.addCategory(categoryNames.valid, testIcons.valid);
    await categoriesPage.expectCategoryVisible(categoryNames.valid);
  });

  test('TC-003: Edit Existing Category Name (pass/fail)', async ({ page }) => {
    const categoriesPage = new AdminCategoriesPage(page);
    await categoriesPage.goto();
    await categoriesPage.addCategory(categoryNames.valid, testIcons.valid);
    // Pass: Edit category name
    await categoriesPage.editCategory(
      categoryNames.valid,
      categoryNames.updated
    );
    await categoriesPage.expectCategoryVisible(categoryNames.updated);
    // Fail: Edit to empty name (should show validation error)
    await categoriesPage.editCategory(
      categoryNames.updated,
      categoryNames.empty
    );
    await categoriesPage.expectValidationError('Name is required');
  });

  test('TC-004: Delete Existing Category (pass/fail)', async ({ page }) => {
    const categoriesPage = new AdminCategoriesPage(page);
    await categoriesPage.goto();
    await categoriesPage.addCategory(categoryNames.valid, testIcons.valid);
    // Pass: Delete category
    await categoriesPage.deleteCategory(categoryNames.valid);
    await categoriesPage.expectCategoryNotVisible(categoryNames.updated);
    // Fail: Try to delete non-existent category (should show error toast)
    await expect(
      categoriesPage.deleteCategory('NonExistentCategory')
    ).rejects.toThrow();
  });

  test('TC-005: Validate Empty Category Name on Addition (pass/fail)', async ({
    page,
  }) => {
    const categoriesPage = new AdminCategoriesPage(page);
    await categoriesPage.goto();
    await categoriesPage.clickAddCategory();
    // Pass: Leave name empty, try to save
    await page.getByRole('button', { name: /save|submit/i }).click();
    await categoriesPage.expectValidationError('Name is required');
    await categoriesPage.expectValidationError('Icon is required');
  });

  test('TC-006: Verify Category Visibility on Frontend (pass/fail)', async ({
    page,
  }) => {
    // Pass: Category added in admin should be visible on homepage
    const categoriesPage = new AdminCategoriesPage(page);
    await categoriesPage.goto();
    await categoriesPage.addCategory(categoryNames.valid, testIcons.valid);
    await categoriesPage.page.goto(getRouteUrl(testRoutes.homepage));
    await expect(page.getByText(categoryNames.valid)).toBeVisible();
    // Fail: Deleted category should not be visible
    await expect(page.getByText(categoryNames.updated)).not.toBeVisible();
  });
});
