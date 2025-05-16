import { Page, Locator, expect } from '@playwright/test';

export class NavbarPage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly contactLink: Locator;
  readonly aboutLink: Locator;
  readonly signUpLink: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: /home/i });
    this.contactLink = page.getByRole('link', { name: /contact/i });
    this.aboutLink = page.getByRole('link', { name: /about/i });
    this.signUpLink = page.getByRole('link', { name: /sign up|signup/i });
    this.cartLink = page.getByRole('link', { name: /cart/i });
  }

  async clickHome() {
    await this.homeLink.click();
  }

  async clickContact() {
    await this.contactLink.click();
  }

  async clickAbout() {
    await this.aboutLink.click();
  }

  async clickSignUp() {
    await this.signUpLink.click();
  }

  async clickCart() {
    await this.cartLink.click();
  }

  async expectOnRoute(route: string) {
    await expect(this.page).toHaveURL(new RegExp(route));
  }
}
