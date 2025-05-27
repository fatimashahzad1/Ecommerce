'use client';

import React from 'react';
import { ProductCard } from './ProductCard';
import { Slider } from '@/components/ui/slider';
import Link from 'next/link';
import { ROUTE_LINKS } from '@/constants/routes';
import { useAppSelector } from "@/hooks/useRedux";
import { ProductCardSkeleton } from "../skeleton/ProductCardSkeleton";

/**
 * BestSellingProducts Component
 * Displays best selling products in a slider format without navigation arrows
 */
export const BestSellingProducts: React.FC = () => {
  const { products, loading, error } = useAppSelector((state) => state.products);




  if (error) return <p>{error}</p>;

  return (
    <section
      className='w-full mt-16 max-md:mt-10'
      aria-label='Best selling products'
    >
      <Slider
        cardWidth={270}
        gap={30}
        className='mt-16 pb-4 max-md:mt-10'
        aria-label='Best selling products slider'
        showArrows={false} // Disable navigation arrows
        title='Best Selling Products'
        subtitle='This Month'
        rightContent={
          <Link
            href={ROUTE_LINKS.bestSellingProducts}
            className='px-12 h-14 py-4 text-base font-medium bg-red-500 rounded text-neutral-50 hover:bg-red-600 transition-colors max-md:px-5'
            aria-label='View all best selling products'
            prefetch={false}
          >
            View All
          </Link>
        }
      >

        {loading && [...Array(5)].map((_, i) => <ProductCardSkeleton key={i} />)}
        {products?.map((product, index) => {
          if (!product.bestSelling) return null; // Skip if not best selling
          return (
            <ProductCard
              key={`best-selling-${product.title}`}
              {...product}
              testid='best-selling'
              index={index}
            />
          );
        })}
      </Slider>

      <hr
        className='mt-16 h-px border-t border-black opacity-30 w-full max-md:mt-10'
        aria-label='Separator'
      />
    </section>
  );
};
