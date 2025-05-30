'use client';

import React, { useEffect } from 'react';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/ui/skeleton';

import { useParams, useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { useAppSelector, useAppDispatch, } from '@/hooks/useRedux';
import { Pagination } from '@/components/ui/Pagination';
import { fetchProducts } from "@/store/productSlice";
import { ProductCardSkeleton } from "@/components/skeleton/ProductCardSkeleton";
import { fetchCategories } from "@/store/categorySlice";
const PRODUCTS_PER_PAGE = 8;

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);
  const { categories, loading: categoriesLoading } = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (!products.length && loading) {
      dispatch(fetchProducts());
      console.log('fetching products');
    }
    if (!categories.length && categoriesLoading) {
      dispatch(fetchCategories());
      console.log('fetching categories');
    }
  }, [dispatch, products.length, loading, categories.length, categoriesLoading]);

  const { t } = useTranslation('common'); // Translation hook
  const searchParams = useSearchParams(); // Get query parameters

  const type = useParams()?.type ?? ""; // Extract the "type" from the dynamic route
  const categoryId = searchParams?.get('category'); // Extract "categoryId" from query params
  const subCategory = searchParams?.get('subCategory'); // Extract "subcategoryId" from query params


  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1);

  // Filter products based on type
  const filteredProducts = React.useMemo(() => {
    if (type === 'flash-sales') {
      return products.filter((product) => product.discount);
    }
    if (type === 'best-selling') {
      return products.filter((product) => product.bestSelling);
    }
    if (type === 'all') {
      if (subCategory) {
        console.log("subCategory", subCategory)
        console.log("filtered products", products.filter((product) => product.subcategoryId === subCategory))
        return products.filter((product) => product.subcategoryId === subCategory);
      }
      else if (categoryId) {
        return products.filter((product) => product.categoryId === categoryId || product.subcategoryId === categoryId);
      }

    }
    return products;
  }, [products, type, categoryId, subCategory]);

  // Get products for current page
  const paginatedProducts = filteredProducts
    ? filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE)
    : [];

  const totalProducts = filteredProducts?.length || 0;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);



  // Determine the page title based on the type and query params
  let pageTitle: string;
  if (type === 'all') {
    if (categoryId) {
      console.log("categoryId", categoryId)
      console.log("categories", categories)
      const category = categories.find((c) => c.id === categoryId);
      console.log("category", category)
      pageTitle = t('products.allFor', { name: category?.name });
    } else {
      pageTitle = t('products.all');
    }
  } else {
    pageTitle = t('products.type', { type: (type as string).split('-').join(' ') });
  }

  let content;
  if (loading) {
    content = (
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' aria-label='Product Grid Skeleton'>
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </section>
    );
  } else if (error) {
    content = <p>{error}</p>;
  } else {
    content = (
      <>
        {paginatedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
              {t('products.noProducts', 'No products available.')}
            </span>
          </div>
        ) : (
          <>
            <ProductGrid products={paginatedProducts} />
            <Pagination
              page={currentPage}
              pageCount={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </>
    );
  }

  return (
    <MainLayout>
      <header className='mb-8'>
        {loading || categoriesLoading ? (
          <div className="h-12 w-64">
            <Skeleton className="h-full w-full rounded" />
          </div>
        ) : (
          <h1 className='text-4xl font-bold'>{pageTitle}</h1>
        )}
      </header>

      {/* Product Grid */}
      {content}

      {/* Back to Home Button */}
      <div className='mt-10 flex justify-center'>
        <Button
          onClick={() => (window.location.href = '/')}
          className='px-8 py-4 bg-red-500 text-white rounded hover:bg-red-600'
          aria-label={t('breadcrumb.home')}
        >
          {t('breadcrumb.home')}
        </Button>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
