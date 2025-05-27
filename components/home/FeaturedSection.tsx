'use client';

import React from 'react';
import { ProductCard } from './ProductCard';
import { SectionHeader } from '@/components/ui/section-header';
import Link from 'next/link';
import { ROUTE_LINKS } from '@/constants/routes';
import { useAppSelector } from "@/hooks/useRedux";
import { ProductCardSkeleton } from "../skeleton/ProductCardSkeleton"; // adjust path as needed


/**
 * FeaturedSection Component
 */
export const FeaturedSection = () => {
  const { products, loading, error } = useAppSelector((state) => state.products);

  let content;
  if (loading) {
    content = [...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />);
  } else if (error) {
    content = <div className="w-full flex justify-center items-center h-32 text-red-500">{error}</div>;
  } else {
    content = products
      .filter(product => product.featured)
      .map((product, index) => (
        <ProductCard
          key={`featured-${product.title}`}
          {...product}
          testid='featured'
          index={index}
        />
      ));
  }

  return (
    <section
      className='w-full mt-36 max-md:mt-10'
      aria-label='Featured products'
    >
      <SectionHeader title='Explore Our Products' subtitle='Our Products' />

      {/* Products Grid */}
      <div
        className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 mt-16 pb-4 max-md:mt-10'
        role='grid'
        aria-label='Featured products grid'
      >
        {content}
      </div>

      <div className='flex justify-center w-full'>
        <Link
          href={ROUTE_LINKS.allProducts} // Update the href to the correct route
          className='px-12 h-14 py-4 mt-16 text-base font-medium bg-red-500 rounded text-neutral-50 hover:bg-red-600 transition-colors max-md:px-5 max-md:mt-10'
          aria-label='View all featured products'
          prefetch={false}
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};
