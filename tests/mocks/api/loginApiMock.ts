import { Page, Route } from '@playwright/test';
import {
  mockFirebaseLoginSuccess,
  mockFirebaseLoginError,
  mockFirebaseAccountLookupSuccess,
} from '../mock-responses';

export type LoginMockMode = 'success' | 'error';

/**
 * Sets up Playwright route mocks for Firebase Auth endpoints used in login.
 * @param page Playwright Page
 * @param mode 'success' for valid login, 'error' for invalid login
 */
export async function setupLoginApiMock(
  page: Page,
  mode: LoginMockMode = 'success'
) {
  // Mock signInWithPassword
  await page.route(
    /https:\/\/identitytoolkit\.googleapis\.com\/v1\/accounts:signInWithPassword\?key=.*/,
    async (route: Route) => {
      if (route.request().method() === 'POST') {
        if (mode === 'success') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockFirebaseLoginSuccess),
          });
        } else {
          await route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify(mockFirebaseLoginError),
          });
        }
      } else {
        await route.continue();
      }
    }
  );

  // Mock accounts:lookup
  await page.route(
    /https:\/\/identitytoolkit\.googleapis\.com\/v1\/accounts:lookup\?key=.*/,
    async (route: Route) => {
      if (route.request().method() === 'POST') {
        if (mode === 'success') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockFirebaseAccountLookupSuccess),
          });
        } else {
          await route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify(mockFirebaseLoginError),
          });
        }
      } else {
        await route.continue();
      }
    }
  );
}
