import { apiRoutes } from '@/tests/utils/test-data';
import { mockCategories as initialMockCategories } from '../categories';
import { Page, Route, Request } from '@playwright/test';

export type MockMode = 'success' | 'error';

export async function mockCategoriesApi(
  page: Page,
  { mode = 'success' }: { mode?: MockMode } = {}
) {
  // In-memory categories state for this test run
  let categories = [...initialMockCategories];

  // GET /api/categories
  await page.route(
    apiRoutes.categories,
    async (route: Route, request: Request) => {
      if (request.method() === 'GET') {
        if (mode === 'success') {
          route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(categories),
          });
        } else {
          route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Server error' }),
          });
        }
      } else if (request.method() === 'POST') {
        if (mode === 'success') {
          const body = request.postDataJSON?.() ?? {};
          const newCategory = { id: `mock_${Date.now()}`, ...body };
          categories.push(newCategory);
          route.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify(newCategory),
          });
        } else {
          route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Bad request' }),
          });
        }
      } else {
        route.continue();
      }
    }
  );

  // PUT/DELETE /api/categories/:id
  await page.route(
    /\/api\/categories\/([^/]+)$/,
    async (route: Route, request: Request) => {
      const match = request.url().match(/\/api\/categories\/([^/]+)$/);
      const id = match ? match[1] : undefined;
      if (!id) return route.continue();
      if (request.method() === 'PUT' || request.method() === 'PATCH') {
        if (mode === 'success') {
          const body = request.postDataJSON?.() ?? {};
          let updated = false;
          categories = categories.map((cat) => {
            if (cat.id === id) {
              updated = true;
              return { ...cat, ...body };
            }
            return cat;
          });
          if (updated) {
            route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify({ id, ...body }),
            });
          } else {
            route.fulfill({
              status: 404,
              contentType: 'application/json',
              body: JSON.stringify({ error: 'Not found' }),
            });
          }
        } else {
          route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Not found' }),
          });
        }
      } else if (request.method() === 'DELETE') {
        if (mode === 'success') {
          const before = categories.length;
          categories = categories.filter((cat) => cat.id !== id);
          if (categories.length < before) {
            route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify({ id }),
            });
          } else {
            route.fulfill({
              status: 404,
              contentType: 'application/json',
              body: JSON.stringify({ error: 'Not found' }),
            });
          }
        } else {
          route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Not found' }),
          });
        }
      } else {
        route.continue();
      }
    }
  );
}
