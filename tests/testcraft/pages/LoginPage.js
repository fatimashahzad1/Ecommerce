// loginPage.js
export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  get emailInput() {
    return this.page.locator('input[name="emailOrPhone"]');
  }

  get passwordInput() {
    return this.page.locator('input[name="password"]');
  }

  get loginButton() {
    return this.page.getByRole('button', { name: 'Log In' });
  }

  get forgotPasswordLink() {
    return this.page.locator('a[href="/forgot-password"]');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async isLoginButtonVisible() {
    return await this.loginButton.isVisible();
  }

  async isForgotPasswordLinkVisible() {
    return await this.forgotPasswordLink.isVisible();
  }
}
