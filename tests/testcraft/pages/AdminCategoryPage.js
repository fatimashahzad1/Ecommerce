// categoryPage.js
export class CategoryPage {
  constructor(page) {
    this.page = page;
    this.categoryNameInput = 'input[name="name"]';
    this.categoryIconSelect = 'select[name="icon"]';
    this.parentCategorySelect = 'select[name="parentId"]';
    this.saveButton = 'button[type="submit"]';
  }

  async navigate() {
    await this.page.goto(
      'https://ecommerce-omega-three-23.vercel.app/admin/categories/add'
    );
  }

  async enterCategoryName(name) {
    await this.page.fill(this.categoryNameInput, name);
  }

  async selectCategoryIcon(icon) {
    await this.page.selectOption(this.categoryIconSelect, icon);
  }

  async selectParentCategory(parentId) {
    await this.page.selectOption(this.parentCategorySelect, parentId);
  }

  async clickSaveButton() {
    await this.page.click(this.saveButton);
  }

  async getCategoryNameValue() {
    return await this.page.inputValue(this.categoryNameInput);
  }

  async getSelectedCategoryIcon() {
    return await this.page.inputValue(this.categoryIconSelect);
  }

  async getSelectedParentCategory() {
    return await this.page.inputValue(this.parentCategorySelect);
  }
}
