// login.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Page Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('https://ecommerce-omega-three-23.vercel.app/login');
  });

  test('should display login button', async () => {
    expect(await loginPage.isLoginButtonVisible()).toBe(true);
  });

  test('should display forgot password link', async () => {
    expect(await loginPage.isForgotPasswordLinkVisible()).toBe(true);
  });

  test('should login with valid credentials', async () => {
    await loginPage.login('fatima.shahzad@bitsol.tech', 'Abc1234@');
    // Add assertion for successful login, e.g., check for a specific URL or element
    await expect(loginPage.page).toHaveURL(
      'https://ecommerce-omega-three-23.vercel.app/'
    ); // Replace with actual URL after login
  });

  test('should not login with invalid credentials', async () => {
    await loginPage.login('wrong@example.com', 'wrongpassword');
    // Add assertion for failed login, e.g., check for an error message
    await expect(
      page.locator('[id="\\:Rmlttda\\:-form-item-message"]')
    ).toBeVisible(); // Replace with actual error message
  });
});
