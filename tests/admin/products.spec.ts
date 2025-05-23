import { test, expect, Page } from '@playwright/test';
import {
  AdminProductsPage,
  AdminProductFormPage,
} from '../pages/AdminProductsPage';
import { setupProductApiMocks } from '../mocks/api/productsMocker';
import { setupUploadImageMock } from '../mocks/api/uploadImage';
import {
  mockProductsWithStock,
  mockUpdatedProductsWithStock,
  mockProducts,
} from '../mocks/products';
import { updateCategory } from '@/store/categorySlice';
const adminEmail = 'fatima.shahzad@bitsol.tech';
const adminPassword = 'Abc1234@';

// Helper: login as admin
async function loginAsAdmin(page: Page) {
  await page.goto('/login');
  await page.fill('input[name="emailOrPhone"]', adminEmail);
  await page.fill('input[name="password"]', adminPassword);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\//); // Should redirect to home
}

test.describe('Admin Products CRUD & Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await setupProductApiMocks(page);
    await setupUploadImageMock(page);
    await loginAsAdmin(page);
    // Open user menu and go to admin panel
    await page.getByRole('button', { name: 'Toggle account menu' }).click();
    await page.click('a[href="/admin"]');
  });

  test('TC-003: Create a New Product', async ({ page }) => {
    const productsPage = new AdminProductsPage(page);
    await productsPage.goto();
    await productsPage.clickAddProduct();
    const formPage = new AdminProductFormPage(page);
    await formPage.fillProductForm(mockProductsWithStock);
    await formPage.save();
    // Should redirect to products list and show new product
    await expect(
      productsPage.productRows.filter({ hasText: 'A Test Product' })
    ).toHaveCount(1);
  });

  test('TC-004: Edit an Existing Product', async ({ page }) => {
    const productsPage = new AdminProductsPage(page);
    await productsPage.goto();

    //add a new product
    // await productsPage.clickAddProduct();
    // const formPageCreate = new AdminProductFormPage(page);
    // await formPageCreate.fillProductForm(mockProductsWithStock);
    // await formPageCreate.save();

    //edit the product
    await productsPage.clickEditByName(mockProductsWithStock.title);
    const formPageEdit = new AdminProductFormPage(page);
    await formPageEdit.titleInput.fill(mockUpdatedProductsWithStock.title);
    await formPageEdit.saveChanges();
    // Should show updated name in list
    await productsPage.page.reload();
    await expect(
      productsPage.productRows.filter({
        hasText: mockUpdatedProductsWithStock.title,
      })
    ).toHaveCount(1);
  });

  test('TC-005: Delete a Product', async ({ page }) => {
    const productsPage = new AdminProductsPage(page);
    await productsPage.goto();

    //add a new product
    // await productsPage.clickAddProduct();
    // const formPageCreate = new AdminProductFormPage(page);
    // await formPageCreate.fillProductForm(mockProductsWithStock);
    // await formPageCreate.save();

    await productsPage.clickDeleteByName(mockUpdatedProductsWithStock.title);
    // Confirm deletion if prompt appears (customize if modal is used)
    await page
      .locator('div')
      .filter({ hasText: /^CancelDelete$/ })
      .getByRole('button')
      .nth(1)
      .click();

    await expect(
      productsPage.productRows.filter({ hasText: mockProductsWithStock.title })
    ).toHaveCount(0);
  });

  test('TC-006: Verify Pagination in Product List', async ({ page }) => {
    const productsPage = new AdminProductsPage(page);
    await productsPage.goto();

    //sorting the mocked products because products are shown in alphabetical order
    //mockProducts have total of 10 products
    const expectedTitles = mockProducts
      .map((p) => p.title)
      .sort((a, b) => a.localeCompare(b));
    // Check that each expected title is present in the rows
    for (const title of expectedTitles.slice(0, 5)) {
      await expect(
        productsPage.productRows.filter({ hasText: title })
      ).toBeVisible();
    }

    // Click specific page
    await productsPage.paginateTo(2);
    for (const title of expectedTitles.slice(5, 10)) {
      await expect(
        productsPage.productRows.filter({ hasText: title })
      ).toBeVisible();
    }
    // Click previous page
    await productsPage.prevPage();

    // Click next page
    await productsPage.nextPage();
    await productsPage.nextPage();
    for (const title of expectedTitles.slice(10)) {
      await expect(
        productsPage.productRows.filter({ hasText: title })
      ).toBeVisible();
    }
  });
});
