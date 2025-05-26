import { Page, Locator, expect } from '@playwright/test';
import { testRoutes } from '../utils/test-data';
import { getRouteUrl } from '../utils/helper-functions';

/**
 * Page Object Model for the Login Page
 * Follows MCP and strict TypeScript typing
 */
export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly signUpLink: Locator;
  readonly toast: Locator;
  readonly validationError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator(
      'input[placeholder="Email or Phone Number"]'
    );
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.loginButton = page.getByRole('button', { name: /log in/i });
    this.signUpLink = page.getByRole('link', { name: /sign up/i });
    this.toast = page.getByRole('alert');
    this.validationError = page.locator('p.text-destructive');
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto(getRouteUrl(testRoutes.login));
  }

  /**
   * Perform login with given credentials
   */
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Assert successful login by checking for dashboard redirect
   */
  async assertLoginSuccess() {
    await this.page.waitForURL(getRouteUrl(testRoutes.home), {
      timeout: 5000,
    });
    await expect(this.page).not.toHaveURL(getRouteUrl(testRoutes.login));
  }

  /**
   * Assert a success toast with expected message
   */
  async assertSuccessToast(message: string) {
    await expect(this.toast).toHaveClass(/bg-green-500 text-white/);
    await expect(this.toast).toHaveText(new RegExp(message, 'i'));
  }

  /**
   * Assert an error toast with expected message
   */
  async assertErrorToast(message: string) {
    await expect(this.toast).toHaveClass(
      /border-destructive bg-destructive text-destructive-foreground/
    );
    await expect(this.toast).toHaveText(new RegExp(message, 'i'));
  }

  /**
   * Assert login failure by checking for error toast
   */
  async assertLoginFailure(expectedMessage?: string) {
    if (expectedMessage) {
      await this.assertErrorToast(expectedMessage);
    } else {
      await expect(this.toast).toBeVisible();
    }
  }

  /**
   * Click the sign up link
   */
  async goToSignUp() {
    await this.signUpLink.click();
  }

  /**
   * Assert navigation to sign up page
   */
  async assertSignUpPage() {
    await this.page.waitForURL(getRouteUrl(testRoutes.signup), {
      timeout: 5000,
    });
    await expect(this.page).toHaveURL(getRouteUrl(testRoutes.signup));
  }

  /**
   * Submit login form with empty fields
   */
  async submitEmptyLogin() {
    await this.loginButton.click();
  }

  /**
   * Assert any field validation error is visible
   */
  async assertAnyValidationError() {
    await expect(this.validationError).toBeVisible();
  }

  /**
   * Assert a specific field validation error message (optional)
   */
  async assertFieldValidationError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  /**
   * Assert the count of validation errors
   */
  async assertValidationErrorCount(expectedCount: number) {
    await expect(this.validationError).toHaveCount(expectedCount);
  }

  /**
   * Open the language selector dropdown (header)
   */
  async openLanguageDropdown(language: 'English' | 'Français') {
    await this.page.getByRole('button', { name: language }).click();
  }

  /**
   * Select a language from the dropdown by visible text
   */
  async selectLanguage(language: 'English' | 'Français') {
    await this.page.getByRole('menuitem', { name: language }).click();
  }

  /**
   * Assert that the login page heading is in the expected language
   */
  async assertLoginHeading(expected: string) {
    await expect(
      this.page.getByRole('heading', { name: expected })
    ).toBeVisible();
  }

  /**
   * Assert that the language selector button shows the expected language
   */
  async assertLanguageSelector(expected: string) {
    await expect(
      this.page.getByRole('button', { name: expected })
    ).toBeVisible();
  }
}
