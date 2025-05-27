'use client';

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { ROUTE_LINKS } from '@/constants/routes';
import { CATEGORIES as ICON_CATEGORIES } from '@/mocks/categories';
import { useAppSelector } from "@/hooks/useRedux";
import { CategoryCard } from "./CategoryCard";
import { CategoryCardSkeleton } from "../skeleton/CategoryCardSkeleton";
/**
 * CategorySection Component
 * Displays categories in a slider format with navigation
 */
export const CategorySection: React.FC = () => {
  const { categories, loading, error } = useAppSelector((state) => state.categories);


  // Map icon string or name to icon component using the mock CATEGORIES array
  const getIconComponent = (category: { icon?: string; name: string }) => {
    // Try to match by icon string first, then by name
    const found = ICON_CATEGORIES.find(
      (mockCat) =>
        (category.icon && mockCat.Icon?.displayName === category.icon) ||
        mockCat.name.toLowerCase() === category.name.toLowerCase()
    );
    return found?.Icon ?? ICON_CATEGORIES[0].Icon;
  };

  let content;
  if (loading) {
    content = ([...Array(7)].map((_, i) => (
      <CategoryCardSkeleton key={i} />
    ))
    );
  } else if (error) {
    content = <div className="w-full flex justify-center items-center h-32 text-red-500">{error}</div>;
  } else {
    content = categories
      .filter((category) => !category?.parentId)
      .map((category) => (
        <CategoryCard
          key={`category-${category.id}`}
          Icon={getIconComponent(category)}
          name={category.name}
          className='flex-shrink-0 w-[170px]'
          link={`${ROUTE_LINKS.allProducts}?category=${encodeURIComponent(category.name.toLowerCase())}`}
        />
      ));
  }

  return (
    <section
      className='w-full mt-20 max-md:mt-10'
      aria-label='Browse by category'
    >
      <Slider
        cardWidth={170}
        gap={32}
        className='mt-16 pb-4 max-md:mt-10'
        aria-label='Category slider'
        title='Browse By Category'
        subtitle='Categories'
      >
        {content}
      </Slider>

      <hr
        className='mt-16 h-px border-t border-black opacity-30 w-full max-md:mt-10'
        aria-label='Separator'
      />
    </section>
  );
};
