import { Page, Route } from '@playwright/test';
import { mockCloudinaryResponse } from '../mock-responses';

/**
 * Mocks the Cloudinary upload API for image uploads.
 * @param page Playwright Page
 */
export async function setupUploadImageMock(page: Page) {
  await page.route(
    'https://api.cloudinary.com/v1_1/dwwten9jp/upload',
    async (route: Route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockCloudinaryResponse),
        });
      } else {
        await route.continue();
      }
    }
  );
}
