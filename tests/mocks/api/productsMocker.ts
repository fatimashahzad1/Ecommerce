import { Page, Route } from '@playwright/test';
import { mockProducts } from '../products';

function extractIdFromUrl(url: string): string | undefined {
  const match = url.match(/\/api\/products\/?([\w-]+)?$/);
  return match && match[1] ? match[1] : undefined;
}

/**
 * Sets up Playwright route mocks for all product CRUD endpoints.
 * @param page Playwright Page
 */
export async function setupProductApiMocks(page: Page) {
  let mockProductsResponse = [...mockProducts];
  // PUT (Edit product)
  await page.route('**/api/products', async (route: Route) => {
    // GET all products
    if (route.request().method() === 'GET') {
      route.fulfill({ json: mockProductsResponse });
    }

    // POST (Create product)
    else if (route.request().method() === 'POST') {
      const newProduct = await route.request().postDataJSON();
      newProduct.id = (Math.random() * 1e8).toFixed(0); // simple id
      mockProductsResponse.push(newProduct);
      route.fulfill({ json: newProduct });
    } else if (route.request().method() === 'PUT') {
      const updatedProduct = await route.request().postDataJSON();
      const id = extractIdFromUrl(route.request().url());
      const idx = mockProductsResponse.findIndex((p) => p.id === id);
      if (idx !== -1)
        mockProductsResponse[idx] = {
          ...mockProductsResponse[idx],
          ...updatedProduct,
        };
      route.fulfill({ json: updatedProduct });
    } else {
      route.continue();
    }
  });

  // DELETE (Delete product)
  await page.route('**/api/products/*', (route: Route) => {
    if (route.request().method() === 'DELETE') {
      const id = extractIdFromUrl(route.request().url());
      const idx = mockProductsResponse.findIndex((p) => p.id === id);
      if (idx !== -1) mockProductsResponse.splice(idx, 1);
      route.fulfill({ status: 200 });
    } else if (route.request().method() === 'PUT') {
      const updatedProduct = route.request().postDataJSON();
      const id = extractIdFromUrl(route.request().url());
      const idx = mockProductsResponse.findIndex((p) => p.id === id);
      if (idx !== -1)
        mockProductsResponse[idx] = {
          ...mockProductsResponse[idx],
          ...updatedProduct,
        };

      route.fulfill({ json: updatedProduct });
    } else {
      route.continue();
    }
  });
}
