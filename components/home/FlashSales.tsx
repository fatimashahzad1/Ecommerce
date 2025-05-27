'use client';

import React from 'react';
import { ProductCard } from './ProductCard';
import { Timer } from './Timer';
import { Slider } from '@/components/ui/slider';
import Link from 'next/link';
import { ROUTE_LINKS } from '@/constants/routes';
import { useAppSelector } from '@/hooks/useRedux';
import { ProductCardSkeleton } from "../skeleton/ProductCardSkeleton";

/**
 * FlashSales Component
 * Displays flash sale products with countdown timer and navigation arrows
 */
export const FlashSales: React.FC = () => {
  const { products, loading, error } = useAppSelector((state) => state.products);

  let content;
  if (loading) {
    content = [...Array(5)].map((_, i) => <ProductCardSkeleton key={i} />);
  } else if (error) {
    content = <div className="w-full flex justify-center items-center h-32 text-red-500">{error}</div>;
  } else {
    content = products
      ?.filter(product => product.discount)
      .map((product, index) => (
        <ProductCard key={`flash-sale-${product.title}`} index={index} testid='flash-sale' {...product} />
      ));
  }

  return (
    <section className='mt-36 w-full max-md:mt-10' aria-label='Flash sales' data-testid='flash-sales'>
      <Slider
        cardWidth={270}
        gap={32}
        className='mt-10 pb-4'
        aria-label='Flash sale products'
        title={
          <div className='flex flex-wrap items-center gap-8'>
            <span>Flash Sales</span>
            <Timer endTime={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)} />
          </div>
        }
        subtitle="Today's"
      >
        {content}
      </Slider>

      <div className='flex justify-center w-full'>
        <Link
          href={ROUTE_LINKS.flashSaleProducts}
          className='px-12 py-4 mt-16 text-base h-14 font-medium bg-red-500 rounded text-neutral-50 hover:bg-red-600 transition-colors max-md:px-5 max-md:mt-10'
          aria-label='View all flash sale products'
          prefetch={false}
        >
          View All Products
        </Link>
      </div>

      <hr
        className='mt-16 h-px border-t border-black opacity-30 w-full max-md:mt-10'
        aria-label='Separator'
      />
    </section>
  );
};
