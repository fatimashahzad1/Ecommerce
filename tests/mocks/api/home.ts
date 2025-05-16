import { apiRoutes } from '@/tests/utils/test-data';
import { Category } from '@/types/categories';
import { mockCategories } from '../categories';
import { mockProducts } from '../products';
import { Product } from '@/types/products';

export async function mockApiRoutes(
  page: import('@playwright/test').Page,
  {
    categories = mockCategories,
    products = mockProducts,
    categoriesStatus = 200,
    productsStatus = 200,
  }: {
    categories?: Category[];
    products?: Product[];
    categoriesStatus?: number;
    productsStatus?: number;
  } = {}
) {
  await page.route(
    apiRoutes.categories,
    (route: import('@playwright/test').Route) => {
      route.fulfill({
        status: categoriesStatus,
        contentType: 'application/json',
        body: JSON.stringify(categories),
      });
    }
  );
  await page.route(
    apiRoutes.products,
    (route: import('@playwright/test').Route) => {
      route.fulfill({
        status: productsStatus,
        contentType: 'application/json',
        body: JSON.stringify(products),
      });
    }
  );
}
