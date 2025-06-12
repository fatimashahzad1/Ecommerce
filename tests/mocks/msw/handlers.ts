import { mockCategories } from '@/tests/mocks/categories';
import { mockProducts } from '@/tests/mocks/products';
import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3000/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts));
  }),
  rest.get('http://localhost:3000/api/categories', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCategories));
  }),
];
export { rest };
