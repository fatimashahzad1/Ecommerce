'use client';

import { HeroSection } from './HeroSection';
import { FlashSales } from './FlashSales';
import { CategorySection } from './CategorySection';
import { FeaturedSection } from './FeaturedSection';
import { BestSellingProducts } from './BestSellingProducts';
import { NewArrival } from './NewArrival';
import CategoriesHeroSection from './CategoriesHeroSection';
import { Services } from '../common/Services';

export default function ECommerceHomePage() {
  return (
    <main className='flex z-10 flex-col items-center mx-auto w-full max-w-[1170px] max-md:max-w-full'>
      {/* Hero Section */}
      <HeroSection />

      {/* Flash Sales Section */}
      <FlashSales />

      {/* Categories Section */}
      <CategorySection />

      {/* Best Selling Products */}
      <BestSellingProducts />

      <CategoriesHeroSection />

      {/* Featured Products */}
      <FeaturedSection />

      {/* New Arrival */}
      <NewArrival />

      {/* Service Features */}
      <Services />
    </main>
  );
}
