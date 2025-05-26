import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EN_LOGIN_PAGE, FR_LOGIN_PAGE } from '@/tests/mocks/language-switch';

/**
 * TC-005: Language Switch from English to French (Login Page)
 * Covers: UI language switching, selector state, and visible text
 */

test.describe('Login Page - Language Switch (TC-005)', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('should switch language from English to French and update all UI text (PASS)', async () => {
    // Initial state: English
    await loginPage.assertLanguageSelector(EN_LOGIN_PAGE.selector);
    await loginPage.assertLoginHeading(EN_LOGIN_PAGE.heading);

    // Open language dropdown and select French
    await loginPage.openLanguageDropdown(EN_LOGIN_PAGE.selector);
    await loginPage.selectLanguage(FR_LOGIN_PAGE.selector);

    // Assert selector and heading update
    await loginPage.assertLanguageSelector(FR_LOGIN_PAGE.selector);
    await loginPage.assertLoginHeading(FR_LOGIN_PAGE.heading);
    // Optionally, check other UI text (e.g., button, subtitle)
    await expect(
      loginPage.page.getByRole('button', { name: FR_LOGIN_PAGE.button })
    ).toBeVisible();
    await expect(
      loginPage.page.getByText(FR_LOGIN_PAGE.subtitle)
    ).toBeVisible();
  });

  test('should fail if UI text does not update after switching to French (FAIL)', async () => {
    // Switch to French
    await loginPage.openLanguageDropdown(EN_LOGIN_PAGE.selector);
    await loginPage.selectLanguage(FR_LOGIN_PAGE.selector);

    // Intentionally assert English heading (should fail)
    let errorCaught = false;
    try {
      await loginPage.assertLoginHeading(EN_LOGIN_PAGE.heading);
    } catch (e) {
      errorCaught = true;
    }
    expect(errorCaught).toBe(true);
  });

  test('should switch back to English and update UI text', async () => {
    // Switch to French first
    await loginPage.openLanguageDropdown(EN_LOGIN_PAGE.selector);
    await loginPage.selectLanguage(FR_LOGIN_PAGE.selector);
    await loginPage.assertLanguageSelector(FR_LOGIN_PAGE.selector);
    await loginPage.assertLoginHeading(FR_LOGIN_PAGE.heading);

    // Switch back to English
    await loginPage.openLanguageDropdown(FR_LOGIN_PAGE.selector);
    await loginPage.selectLanguage(EN_LOGIN_PAGE.selector);
    await loginPage.assertLanguageSelector(EN_LOGIN_PAGE.selector);
    await loginPage.assertLoginHeading(EN_LOGIN_PAGE.heading);
  });
});
