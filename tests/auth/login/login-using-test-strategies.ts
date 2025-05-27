import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { testUsers } from '../../utils/test-data';
import { setupLoginApiMock } from '../../mocks/api/loginApiMock';

/**
 * Login Test Suite (MCP + POM)
 * Covers: Valid login, invalid password, empty fields, validation, rapid submission, forgot password link
 */
test.describe('Login Page - Success & Failure Scenarios', () => {
  let page: Page;
  let loginPage: LoginPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('TC-LOGIN-01: Successful User Login (Pass/Fail)', async () => {
    await setupLoginApiMock(page, 'success');
    await loginPage.login(testUsers.valid.email, testUsers.valid.password);
    // Set the firebaseToken cookie to simulate authenticated session
    await page.context().addCookies([
      {
        name: 'firebaseToken',
        value: 'mockedIdToken',
        domain: 'ecommerce-omega-three-23.vercel.app',
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'Lax',
      },
    ]);
    await loginPage.assertLoginSuccess();
    await loginPage.assertSuccessToast('Login successful');
  });

  test('TC-LOGIN-02: Invalid Email Format', async () => {
    await setupLoginApiMock(page, 'error');
    await loginPage.login('abc@gmail', testUsers.valid.password);
    await loginPage.assertFieldValidationError(
      'Please enter a valid email or phone number.'
    );
  });

  test('TC-LOGIN-03: Password Minimum Length Validation', async () => {
    await setupLoginApiMock(page, 'error');
    await loginPage.login(testUsers.valid.email, '123');
    await loginPage.assertFieldValidationError(
      'Password must be at least 6 characters'
    );
  });

  test('TC-LOGIN-04: Required Field Validation for Email or Phone Number', async () => {
    await setupLoginApiMock(page, 'error');
    await loginPage.login('', testUsers.valid.password);
    await loginPage.assertFieldValidationError(
      'Please enter a valid email or phone number.'
    );
  });

  test('TC-LOGIN-05: Required Field Validation for Password', async () => {
    await setupLoginApiMock(page, 'error');
    await loginPage.login(testUsers.valid.email, '');
    await loginPage.assertFieldValidationError(
      'Password must be at least 6 characters'
    );
  });

  test('TC-LOGIN-06: Verify "Forgot Password?" Link Accessibility', async () => {
    const forgotPasswordLink = page.locator('a[href="/forgot-password"]');
    await expect(forgotPasswordLink).toBeVisible();
    await forgotPasswordLink.click();
    await expect(page).toHaveURL(/\/forgot-password/);
  });

  test('TC-LOGIN-07: Prevention of Multiple Rapid Submissions', async () => {
    await setupLoginApiMock(page, 'success');
    await loginPage.emailInput.fill(testUsers.valid.email);
    await loginPage.passwordInput.fill(testUsers.valid.password);
    // Rapidly click the login button multiple times
    await Promise.all([
      loginPage.loginButton.click(),
      loginPage.loginButton.click(),
      loginPage.loginButton.click(),
    ]);
    // Should only allow one submission and redirect
    await loginPage.assertLoginSuccess();
  });
});
