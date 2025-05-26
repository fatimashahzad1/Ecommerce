import { test, expect, Page, BrowserContext } from '@playwright/test';
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

let context: BrowserContext;
let page: Page;
let adminProductsPage: AdminProductsPage;
let adminProductsFormPage: AdminProductFormPage;

test.describe('Admin Products CRUD & Pagination', () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await setupProductApiMocks(page);
    await setupUploadImageMock(page);
    await loginAsAdmin(page);
    // Open user menu and go to admin panel
    await page.getByRole('button', { name: 'Toggle account menu' }).click();
    await page.click('a[href="/admin"]');
    adminProductsPage = new AdminProductsPage(page);
    adminProductsFormPage = new AdminProductFormPage(page);
  });

  test.beforeEach(async () => {
    await adminProductsPage.goto();
  });

  test('TC-003: Create a New Product', async () => {
    await adminProductsPage.clickAddProduct();
    await adminProductsFormPage.fillProductForm(mockProductsWithStock);
    await adminProductsFormPage.save();
    // Should redirect to products list and show new product
    await expect(
      adminProductsPage.productRows.filter({ hasText: 'A Test Product' })
    ).toHaveCount(1);
  });

  test('TC-004: Edit an Existing Product', async () => {
    await adminProductsPage.clickEditByName(mockProductsWithStock.title);
    //add a new product
    // await productsPage.clickAddProduct();
    // const formPageCreate = new AdminProductFormPage(page);
    // await formPageCreate.fillProductForm(mockProductsWithStock);
    // await formPageCreate.save();

    //edit the product
    await adminProductsPage.clickEditByName(mockProductsWithStock.title);
    await adminProductsFormPage.titleInput.fill(
      mockUpdatedProductsWithStock.title
    );
    await adminProductsFormPage.saveChanges();
    // Should show updated name in list
    await adminProductsPage.page.reload();
    await expect(
      adminProductsPage.productRows.filter({
        hasText: mockUpdatedProductsWithStock.title,
      })
    ).toHaveCount(1);
  });

  test('TC-005: Delete a Product', async () => {
    //const productsPage = new AdminProductsPage(page);
    // await productsPage.goto();

    //add a new product
    // await productsPage.clickAddProduct();
    // const formPageCreate = new AdminProductFormPage(page);
    // await formPageCreate.fillProductForm(mockProductsWithStock);
    // await formPageCreate.save();

    await adminProductsPage.clickDeleteByName(
      mockUpdatedProductsWithStock.title
    );
    // Confirm deletion if prompt appears (customize if modal is used)
    await page
      .locator('div')
      .filter({ hasText: /^CancelDelete$/ })
      .getByRole('button')
      .nth(1)
      .click();

    await expect(
      adminProductsPage.productRows.filter({
        hasText: mockProductsWithStock.title,
      })
    ).toHaveCount(0);
  });

  test('TC-006: Verify Pagination in Product List', async () => {
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
