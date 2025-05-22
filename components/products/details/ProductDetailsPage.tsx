'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import { Slider } from '@/components/ui/slider';
import { ProductCard } from '@/components/home/ProductCard';
import { PRODUCTS } from '@/mocks/products';
import MainLayout from '@/components/layouts/MainLayout';
import { useAppSelector } from "@/hooks/useRedux";

export default function ProductDetailsPage() {
  const searchParams = useSearchParams();
  const { products } = useAppSelector((state) => state.products);
  const productId = searchParams?.get('id'); // Get the product ID from the query params
  const product = products.find((p) => p.id === productId); // Find the product by ID

  if (!product) {
    return <div className='text-center mt-20'>Product not found</div>;
  }

  return (
    <MainLayout>
      <section className='w-full max-md:mt-10 max-md:max-w-full'>
        <div className='flex gap-5 max-md:flex-col'>
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
      </section>

      {/* Related Items Slider */}
      <section className='w-full mt-[140px] max-md:mt-20'>
        <Slider
          cardWidth={270}
          gap={32}
          className='mt-10 pb-4'
          aria-label='Related products'
          title='Related Items'
        >
          {products.filter((p) => p.id !== productId && p.featured).map(
            (relatedProduct) => (
              <ProductCard
                key={`related-${relatedProduct.id}`}
                {...relatedProduct}
              />
            )
          )}
        </Slider>
      </section>
    </MainLayout>
  );
}
