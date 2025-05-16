// category.spec.js
import { test, expect } from '@playwright/test';
import { CategoryPage } from '../pages/AdminCategoryPage';

test.describe('Category Management', () => {
  let categoryPage;

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page);
    await categoryPage.navigate();
  });

  test('should add a new category successfully', async () => {
    await categoryPage.enterCategoryName('New Category');
    await categoryPage.selectCategoryIcon('Electronics');
    await categoryPage.selectParentCategory('No Parent');

    await categoryPage.clickSaveButton();

    const categoryName = await categoryPage.getCategoryNameValue();
    expect(categoryName).toBe('New Category');

    //const selectedIcon = await categoryPage.getSelectedCategoryIcon();
    //expect(selectedIcon).toBe('Electronics');

    const selectedParent = await categoryPage.getSelectedParentCategory();
    expect(selectedParent).toBe('No Parent');
  });

  test('should not allow empty category name', async () => {
    await categoryPage.enterCategoryName('');
    await categoryPage.selectCategoryIcon('Electronics');
    await categoryPage.selectParentCategory('No Parent');

    await categoryPage.clickSaveButton();

    const categoryName = await categoryPage.getCategoryNameValue();
    expect(categoryName).toBe('');
  });

  test('should allow selecting a parent category', async () => {
    await categoryPage.enterCategoryName('Child Category');
    await categoryPage.selectCategoryIcon('Health & Beauty');
    await categoryPage.selectParentCategory('4aks2WkKQDVbZGKREjSf'); // Selecting Woman's Fashion

    await categoryPage.clickSaveButton();

    const selectedParent = await categoryPage.getSelectedParentCategory();
    expect(selectedParent).toBe('4aks2WkKQDVbZGKREjSf');
  });

  test('should have default option for category icon', async () => {
    await categoryPage.enterCategoryName('Test Category');
    await categoryPage.selectCategoryIcon('Select Icon');

    await categoryPage.clickSaveButton();

    //const selectedIcon = await categoryPage.getSelectedCategoryIcon();
    // expect(selectedIcon).toBe('Select Icon');
  });
});
