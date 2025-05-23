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
  // PUT (Edit product)
  await page.route('**/api/products', async (route: Route) => {
    console.log('in **/api/products/*');
    // GET all products
    if (route.request().method() === 'GET') {
      console.log('in GET route');
      route.fulfill({ json: mockProducts });
    }

    // POST (Create product)
    else if (route.request().method() === 'POST') {
      console.log('in POST route');
      const newProduct = await route.request().postDataJSON();
      newProduct.id = (Math.random() * 1e8).toFixed(0); // simple id
      mockProducts.push(newProduct);
      route.fulfill({ json: newProduct });
    } else if (route.request().method() === 'PUT') {
      console.log('PUT request received');
      const updatedProduct = await route.request().postDataJSON();
      const id = extractIdFromUrl(route.request().url());
      const idx = mockProducts.findIndex((p) => p.id === id);
      if (idx !== -1)
        mockProducts[idx] = { ...mockProducts[idx], ...updatedProduct };
      route.fulfill({ json: updatedProduct });
    } else {
      route.continue();
    }
  });

  // DELETE (Delete product)
  await page.route('**/api/products/*', (route: Route) => {
    console.log('in **/api/products/*');
    if (route.request().method() === 'DELETE') {
      console.log('in DELETE route');
      const id = extractIdFromUrl(route.request().url());
      const idx = mockProducts.findIndex((p) => p.id === id);
      if (idx !== -1) mockProducts.splice(idx, 1);
      route.fulfill({ status: 200 });
    } else if (route.request().method() === 'PUT') {
      console.log('PUT request received');
      const updatedProduct = route.request().postDataJSON();
      console.log('updatedProduct', updatedProduct);
      const id = extractIdFromUrl(route.request().url());
      console.log('id', id);
      const idx = mockProducts.findIndex((p) => p.id === id);
      console.log('idx', idx);
      if (idx !== -1)
        mockProducts[idx] = { ...mockProducts[idx], ...updatedProduct };

      console.log('mockProducts', mockProducts);
      route.fulfill({ json: updatedProduct });
    } else {
      route.continue();
    }
  });
}
