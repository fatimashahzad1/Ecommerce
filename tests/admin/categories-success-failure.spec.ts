import { test, expect } from '@playwright/test';
import { AdminCategoriesPage } from '../pages/AdminCategoriesPage';
import {
  categoryNames,
  testRoutes,
  testIcons,
  apiRoutes,
} from '../utils/test-data';
import { getRouteUrl } from '../utils/helper-functions';

test.describe('Admin Categories Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(getRouteUrl(testRoutes.adminDashboard));
    await expect(page).toHaveURL(testRoutes.adminDashboard);
  });

  test('TC-001: Access Categories Management Page (Pass)', async ({ page }) => {
    const adminCategories = new AdminCategoriesPage(page);
    await adminCategories.goto();
    await expect(adminCategories.categoryList).toBeVisible();
  });

  test('TC-001: Access Categories Management Page (Fail)', async ({ page }) => {
    // Simulate fail by navigating to a wrong URL
    await page.goto('/admin/nonexistent');
    await expect(
      page.getByRole('heading', { name: 'Not Found' })
    ).toBeVisible();
  });

  test('TC-002: Add New Category with Valid Data (Pass)', async ({ page }) => {
    const adminCategories = new AdminCategoriesPage(page);
    await adminCategories.goto();
    await adminCategories.addCategory(categoryNames.valid, testIcons.valid);
    await expect(
      adminCategories.categoryList
        .getByRole('cell', {
          name: categoryNames.valid,
        })
        .first()
    ).toBeVisible();
  });

  test('TC-002: Add New Category with Valid Data (Fail)', async ({ page }) => {
    const adminCategories = new AdminCategoriesPage(page);
    await adminCategories.goto();
    // Try to add a category with an empty name
    await adminCategories.addCategory(categoryNames.empty, testIcons.valid);
    await expect(adminCategories.validationError).toBeVisible();
  });

  test('TC-003: Edit Existing Category Name (Pass)', async ({ page }) => {
    const adminCategories = new AdminCategoriesPage(page);
    await adminCategories.goto();
    await adminCategories.editCategory(
      categoryNames.valid,
      categoryNames.updated
    );
    await expect(
      adminCategories.categoryList.getByText(categoryNames.updated).first()
    ).toBeVisible();

    //Change back the updated name to the original name
    // await adminCategories.editCategory(
    //   categoryNames.updated,
    //   categoryNames.valid
    // );
    // await expect(adminCategories.page).toHaveURL(testRoutes.adminCategories);
    // await expect(
    //   adminCategories.page.getByRole('cell', { name: 'Computers' }).first()
    // ).toBeVisible();
  });

  test('TC-003: Edit Existing Category Name (Fail)', async ({ page }) => {
    const adminCategories = new AdminCategoriesPage(page);
    await adminCategories.goto();
    // Try to edit a non-existent category
    await expect(async () => {
      await adminCategories.editCategory('NonExistent', categoryNames.updated);
    }).rejects.toThrow();
  });

  test('TC-004: Delete Existing Category (Pass)', async ({ page }) => {
    const adminCategories = new AdminCategoriesPage(page);
    await adminCategories.goto();
    await adminCategories.deleteCategory(categoryNames.updated);
    await expect(
      adminCategories.categoryList.getByText(categoryNames.updated)
    ).not.toBeVisible();
  });

  test('TC-004: Delete Existing Category (Fail)', async ({ page }) => {
    const adminCategories = new AdminCategoriesPage(page);
    await adminCategories.goto();
    // Try to delete a non-existent category
    await expect(async () => {
      await adminCategories.deleteCategory('NonExistent');
    }).rejects.toThrow();
  });

  test('TC-005: Validate Empty Category Name on Addition (Pass)', async ({
    page,
  }) => {
    const adminCategories = new AdminCategoriesPage(page);
    await adminCategories.goto();
    await adminCategories.addCategory(categoryNames.empty, testIcons.valid);
    await expect(adminCategories.validationError).toBeVisible();
  });

  test('TC-005: Validate Empty Category Name on Addition (Fail)', async ({
    page,
  }) => {
    const adminCategories = new AdminCategoriesPage(page);
    await adminCategories.goto();
    await adminCategories.addCategory(categoryNames.valid, testIcons.valid);
    await expect(adminCategories.validationError).not.toBeVisible();
  });

  test('TC-006: Verify Category Visibility on Frontend (Pass)', async ({
    page,
    context,
  }) => {
    // Add category as admin
    const adminCategories = new AdminCategoriesPage(page);
    await adminCategories.goto();
    await adminCategories.addCategory(categoryNames.valid, testIcons.valid);
    // Go to homepage as a new user
    await adminCategories.page.goto(testRoutes.homepage);

    const slider = adminCategories.page.getByRole('region', {
      name: 'Category slider',
    });
    await expect(slider).toContainText(categoryNames.valid);
    await expect(
      slider
        .getByRole('link', {
          name: `View products in ${categoryNames.valid}`,
        })
        .first()
    ).toBeVisible();
  });

  test('TC-006: Verify Category Visibility on Frontend (Fail)', async ({
    page,
    context,
  }) => {
    // Ensure category does not exist
    const userPage = await context.newPage();
    await userPage.goto(testRoutes.homepage);
    await expect(userPage.getByText('NonExistentCategory')).not.toBeVisible();
  });
});
