'use client';

import { HeroSection } from './HeroSection';
import { FlashSales } from './FlashSales';
import { CategorySection } from './CategorySection';
import { FeaturedSection } from './FeaturedSection';
import { BestSellingProducts } from './BestSellingProducts';
import { NewArrival } from './NewArrival';
import CategoriesHeroSection from './CategoriesHeroSection';
import { Services } from '../common/Services';
import MainLayout from '../layouts/MainLayout';
import { fetchProducts } from "@/store/productSlice";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { fetchCategories } from "@/store/categorySlice";

export default function ECommerceHomePage() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);
  const { categories } = useAppSelector((state) => state.categories);
  useEffect(() => {
    if (!products.length && loading) {
      dispatch(fetchProducts());
      console.log('fetching products');
    }
  }, [dispatch, products.length, loading]);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);


  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection />

      {/* Flash Sales Section */}
      <FlashSales />

      {/* Categories Section */}
      <CategorySection />

      {/* Best Selling Products */}
      <BestSellingProducts />

      {/* <CategoriesHeroSection /> */}

      {/* Featured Products */}
      <FeaturedSection />

      {/* New Arrival */}
      {/* <NewArrival /> */}

      {/* Service Features */}
      <Services />
    </MainLayout>
  );
}
