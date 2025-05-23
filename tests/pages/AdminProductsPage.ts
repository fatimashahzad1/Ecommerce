import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Admin Products Page
 * Selectors are based on the live site as of 2024-06
 */
export class AdminProductsPage {
  readonly page: Page;
  // Navigation
  readonly addProductButton: Locator;
  // Product Table
  readonly productTable: Locator;
  readonly productRows: Locator;
  // Actions
  readonly editButtons: Locator;
  readonly deleteButtons: Locator;
  // Pagination
  readonly paginationNext: Locator;
  readonly paginationPrev: Locator;
  readonly paginationPage: (pageNum: number) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.addProductButton = page.locator('a[href="/admin/products/add"]');
    this.productTable = page.locator('table.min-w-full');
    this.productRows = page.locator('tbody > tr');
    this.editButtons = page.locator('a.inline-block.bg-blue-600');
    this.deleteButtons = page.locator('button.bg-destructive');
    this.paginationNext = page.locator('button[aria-label="Next page"]');
    this.paginationPrev = page.locator('button[aria-label="Previous page"]');
    this.paginationPage = (pageNum: number) =>
      page.locator(`button[aria-label="Page ${pageNum}"]`);
  }

  async goto() {
    await this.page.goto('/admin/products');
  }

  async clickAddProduct() {
    await this.addProductButton.click();
  }

  async getProductRowByName(name: string) {
    return this.productRows.filter({ hasText: name });
  }

  async clickEditByName(name: string) {
    const row = await this.getProductRowByName(name);
    await row.locator('a.inline-block.bg-blue-600').first().click();
  }

  async clickDeleteByName(name: string) {
    const row = await this.getProductRowByName(name);
    await row.locator('button.bg-destructive').first().click();
  }

  async paginateTo(pageNum: number) {
    await this.paginationPage(pageNum).click();
  }

  async nextPage() {
    await this.paginationNext.click();
  }

  async prevPage() {
    await this.paginationPrev.click();
  }
}

/**
 * Page Object Model for Add/Edit Product Form
 * Used for both add and edit product flows
 */
export class AdminProductFormPage {
  readonly page: Page;
  readonly imageInput: Locator;
  readonly galleryInputs: Locator;
  readonly titleInput: Locator;
  readonly priceInput: Locator;
  readonly originalPriceInput: Locator;
  readonly discountInput: Locator;
  readonly ratingInput: Locator;
  readonly descriptionInput: Locator;
  readonly bestSellingSwitch: Locator;
  readonly featuredSwitch: Locator;
  readonly colorInputs: Locator;

  readonly sizeCheckboxes: Locator;
  readonly sizeCheckboxesSmall: Locator;
  readonly sizeCheckboxesMedium: Locator;
  readonly sizeCheckboxesLarge: Locator;
  readonly sizeCheckboxesXLarge: Locator;

  readonly stockStatusSelect: Locator;
  readonly categorySelect: Locator;
  readonly subcategorySelect: Locator;
  readonly saveButton: Locator;
  readonly saveChangesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.imageInput = page.locator(
      'div[aria-label="Upload image"] input[type="file"]'
    );
    this.galleryInputs = page.locator(
      'div[aria-label="Upload gallery image"] input[type="file"]'
    );
    this.titleInput = page.locator('input[name="title"]');
    this.priceInput = page.locator('input[name="price"]');
    this.originalPriceInput = page.locator('input[name="originalPrice"]');
    this.discountInput = page.locator('input[name="discount"]');
    this.ratingInput = page.locator('input[name="rating"]');
    this.descriptionInput = page.locator('textarea[name="description"]');
    this.bestSellingSwitch = page.getByRole('switch', { name: 'Best Selling' });
    this.featuredSwitch = page.getByRole('switch', { name: 'Featured' });
    this.colorInputs = page.locator('input[type="color"]');

    this.sizeCheckboxes = page.locator('label');
    this.sizeCheckboxesSmall = page
      .locator('label')
      .filter({ hasText: 'Small (S)' });
    this.sizeCheckboxesMedium = page
      .locator('label')
      .filter({ hasText: 'Medium (M)' });
    this.sizeCheckboxesLarge = page
      .locator('label')
      .filter({ hasText: 'Large (L)' });
    this.sizeCheckboxesXLarge = page
      .locator('label')
      .filter({ hasText: 'XLarge (XL)' });
    this.stockStatusSelect = page.locator('select[name="stockStatus"]');

    this.categorySelect = page.getByRole('combobox').nth(1);
    this.subcategorySelect = page.locator(
      'label:has-text("Subcategory") + select'
    );
    this.saveButton = page.locator(
      'button[type="submit"]:has-text("Save Product")'
    );
    this.saveChangesButton = page.locator(
      'button[type="submit"]:has-text("Save Changes")'
    );
  }

  async fillProductForm({
    title,
    price,
    originalPrice,
    discount,
    rating,
    description,
    bestSelling,
    featured,
    stockStatus,
    category,
    subcategory,
    sizes,
    colors,
    imagePath,
    galleryPaths = [],
  }: {
    title: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating?: number;
    description?: string;
    bestSelling?: boolean;
    featured?: boolean;
    stockStatus?: string;
    category?: string;
    subcategory?: string;
    sizes?: { size: string; stock: number }[];
    colors?: string[];
    imagePath?: string;
    galleryPaths?: string[];
  }) {
    if (imagePath) {
      await this.imageInput.setInputFiles(imagePath);
    }
    if (galleryPaths.length) {
      for (let i = 0; i < galleryPaths.length; i++) {
        await this.galleryInputs.nth(i).setInputFiles(galleryPaths[i]);
      }
    }
    await this.titleInput.fill(title);
    await this.priceInput.fill(price.toString());
    if (originalPrice !== undefined)
      await this.originalPriceInput.fill(originalPrice.toString());
    if (discount !== undefined)
      await this.discountInput.fill(discount.toString());
    if (rating !== undefined) await this.ratingInput.fill(rating.toString());
    if (description) await this.descriptionInput.fill(description);
    if (typeof bestSelling === 'boolean') {
      expect(this.bestSellingSwitch).toBeVisible();
      const checked = await this.bestSellingSwitch.getAttribute('aria-checked');
      if (
        (bestSelling && checked === 'false') ||
        (!bestSelling && checked === 'true')
      ) {
        await this.bestSellingSwitch.click();
      }
    }
    if (typeof featured === 'boolean') {
      const checked = await this.featuredSwitch.getAttribute('aria-checked');
      if (
        (featured && checked === 'false') ||
        (!featured && checked === 'true')
      ) {
        await this.featuredSwitch.click();
      }
    }
    if (stockStatus)
      await this.stockStatusSelect.selectOption({ label: stockStatus });
    if (category) await this.categorySelect.selectOption({ label: category });
    if (subcategory)
      await this.subcategorySelect.selectOption({ label: subcategory });
    if (sizes && sizes.length) {
      for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i];
        const checkbox = this.sizeCheckboxes.filter({ hasText: size.size });
        if (checkbox) await checkbox.check();
        await this.page
          .getByPlaceholder('Stock')
          .nth(i)
          .fill(size.stock.toString());
      }
    }
    // Color selection is not fully automated due to custom UI, but can be extended here
  }

  async save() {
    await this.saveButton.click();
  }

  async saveChanges() {
    await this.saveChangesButton.click();
  }
}
