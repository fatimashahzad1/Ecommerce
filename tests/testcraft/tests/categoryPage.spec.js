// categoryPage.spec.js
import { test, expect } from '@playwright/test';
import { CategoryPage } from '../pages/CategoryPage';

test.describe('Category Page Tests', () => {
  let categoryPage;

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page);
    await page.goto('https://ecommerce-omega-three-23.vercel.app/');
  });

  test('should display the correct number of categories', async () => {
    const count = await categoryPage.getCategoryCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to Shoes category', async () => {
    await categoryPage.navigateToCategory('Shoes');
    expect(await page.url()).toContain('category=shoes');
  });

  test("should navigate to Woman's Fashion category", async () => {
    await categoryPage.navigateToCategory("Woman's Fashion");
    expect(await page.url()).toContain("category=woman's%20fashion");
  });

  test('should display Health & Beauty category', async () => {
    expect(
      await categoryPage.isCategoryDisplayed('Health & Beauty')
    ).toBeTruthy();
  });

  test('should display Electronics category', async () => {
    expect(await categoryPage.isCategoryDisplayed('Electronics')).toBeTruthy();
  });

  test('should display valid category link', async () => {
    expect(
      await categoryPage.isCategoryDisplayed('ValidCategoryTest')
    ).toBeTruthy();
  });

  test('should navigate to Electronics category', async () => {
    await categoryPage.navigateToCategory('Electronics');
    expect(await page.url()).toContain('category=electronics');
  });

  test("should navigate to Men's Fashion category", async () => {
    await categoryPage.navigateToCategory("Men's Fashion");
    expect(await page.url()).toContain("category=men's%20fashion");
  });

  test('should navigate to Groceries & Pets category', async () => {
    await categoryPage.navigateToCategory('Groceries & Pets');
    expect(await page.url()).toContain('category=groceries%20%26%20pets');
  });

  test('should navigate to Gaming category', async () => {
    await categoryPage.navigateToCategory('Gaming');
    expect(await page.url()).toContain('category=gaming');
  });

  test("should navigate to Baby's & Toys category", async () => {
    await categoryPage.navigateToCategory("Baby's & Toys");
    expect(await page.url()).toContain("category=baby's%20%26%20toys");
  });

  test('should navigate to SmartWatch category', async () => {
    await categoryPage.navigateToCategory('SmartWatch');
    expect(await page.url()).toContain('category=smartwatch');
  });

  test('should navigate to HeadPhones category', async () => {
    await categoryPage.navigateToCategory('HeadPhones');
    expect(await page.url()).toContain('category=headphones');
  });

  test('should navigate to Home & Lifestyle category', async () => {
    await categoryPage.navigateToCategory('Home & Lifestyle');
    expect(await page.url()).toContain('category=home%20%26%20lifestyle');
  });
});
