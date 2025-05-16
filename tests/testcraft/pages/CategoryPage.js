// categoryPage.js
export class CategoryPage {
  constructor(page) {
    this.page = page;
  }

  get categorySlider() {
    return this.page.locator(
      'div[role="region"][aria-label="Category slider"]'
    );
  }

  get categories() {
    return this.categorySlider.locator('a');
  }

  async navigateToCategory(categoryName) {
    const categoryLink = this.categories
      .locator(`span:text("${categoryName}")`)
      .first();
    await categoryLink.click();
  }

  async isCategoryDisplayed(categoryName) {
    const categoryLink = this.categories.locator(
      `span:text("${categoryName}")`
    );
    return await categoryLink.isVisible();
  }

  async getCategoryCount() {
    return await this.categories.count();
  }
}
