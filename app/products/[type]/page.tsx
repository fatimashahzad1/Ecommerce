'use client';

import React, { useEffect } from 'react';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

import { useParams, useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { useAppSelector, useAppDispatch, } from '@/hooks/useRedux';
import { Pagination } from '@/components/ui/Pagination';
import { fetchProducts } from "@/store/productSlice";
import { ProductCardSkeleton } from "@/components/skeleton/ProductCardSkeleton";

const PRODUCTS_PER_PAGE = 5;

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (!products.length && loading) {
      dispatch(fetchProducts());
      console.log('fetching products');
    }
  }, [dispatch, products.length, loading]);

  const { t } = useTranslation('common'); // Translation hook
  const searchParams = useSearchParams(); // Get query parameters

  const type = useParams()?.type ?? ""; // Extract the "type" from the dynamic route
  const category = searchParams?.get('category'); // Extract "categoryId" from query params
  const subCategory = searchParams?.get('subCategory'); // Extract "subcategoryId" from query params


  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalProducts = products?.length || 0;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  // Get products for current page
  const paginatedProducts = products
    ? products.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE)
    : [];

  // Determine the page title based on the type and query params
  let pageTitle: string;
  if (type === 'all') {
    if (category || subCategory) {
      pageTitle = t('products.allFor', { name: (subCategory ?? category)?.split('-').join(' ') });
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
        {[...Array(5)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </section>
    );
  } else if (error) {
    content = <p>{error}</p>;
  } else {
    content = (
      <>
        <ProductGrid products={paginatedProducts} />
        <Pagination
          page={currentPage}
          pageCount={totalPages}
          onPageChange={setCurrentPage}
        />
      </>
    );
  }

  return (
    <MainLayout>
      <header className='mb-8'>
        <h1 className='text-4xl font-bold'>{pageTitle}</h1>
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
