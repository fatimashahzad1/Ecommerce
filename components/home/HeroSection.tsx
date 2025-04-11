import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * Category type definitions
 */
interface SubCategory {
  name: string;
  href: string;
}

interface Category {
  name: string;
  href: string;
  hasSubmenu?: boolean;
  subCategories?: SubCategory[];
}

/**
 * Category data with subcategories
 */
const CATEGORIES: Category[] = [
  {
    name: "Woman's Fashion",
    href: '/category/womens-fashion',
    hasSubmenu: true,
    subCategories: [
      { name: 'Dresses', href: '/category/womens-fashion/dresses' },
      { name: 'Tops', href: '/category/womens-fashion/tops' },
      { name: 'Shoes', href: '/category/womens-fashion/shoes' },
      { name: 'Accessories', href: '/category/womens-fashion/accessories' },
    ],
  },
  {
    name: "Men's Fashion",
    href: '/category/mens-fashion',
    hasSubmenu: true,
    subCategories: [
      { name: 'Shirts', href: '/category/mens-fashion/shirts' },
      { name: 'Pants', href: '/category/mens-fashion/pants' },
      { name: 'Shoes', href: '/category/mens-fashion/shoes' },
      { name: 'Accessories', href: '/category/mens-fashion/accessories' },
    ],
  },
  { name: 'Electronics', href: '/category/electronics' },
  { name: 'Home & Lifestyle', href: '/category/home-lifestyle' },
  { name: 'Medicine', href: '/category/medicine' },
  { name: 'Sports & Outdoor', href: '/category/sports-outdoor' },
  { name: "Baby's & Toys", href: '/category/babies-toys' },
  { name: 'Groceries & Pets', href: '/category/groceries-pets' },
  { name: 'Health & Beauty', href: '/category/health-beauty' },
];

/**
 * Category Item Component
 */
const CategoryItem: React.FC<{ category: Category }> = ({ category }) => {
  if (category.hasSubmenu) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center justify-between w-full px-4 py-2 hover:text-red-500 transition-colors'>
          <span>{category.name}</span>
          <ChevronRight className='h-4 w-4' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-48' align='end' side='right'>
          {category.subCategories?.map((subCategory) => (
            <DropdownMenuItem key={subCategory.href} asChild>
              <Link
                href={subCategory.href}
                className='w-full px-4 py-2 hover:text-red-500 transition-colors'
              >
                {subCategory.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={category.href}
      className='block px-4 py-2 hover:text-red-500 transition-colors'
    >
      {category.name}
    </Link>
  );
};

/**
 * HeroSection Component
 */
export const HeroSection = () => {
  return (
    <section className='w-full' aria-label='Hero banner'>
      <div className='flex gap-5 max-md:flex-col'>
        {/* Categories Navigation - Hidden on Mobile */}
        <nav
          className='w-[21%] hidden md:block'
          aria-label='Product categories'
        >
          <div className='flex grow gap-4 text-base text-black'>
            <div className='flex flex-col w-full'>
              {CATEGORIES.map((category) => (
                <div key={category.href} className='w-full'>
                  <CategoryItem category={category} />
                </div>
              ))}
            </div>
            <div className='shrink-0 w-px h-96 border border-black border-solid' />
          </div>
        </nav>

        <div className='ml-5 w-[79%] md:w-[79%] max-md:ml-0 max-md:w-full'>
          <div className='overflow-hidden grow pt-4 pl-16 mt-10 w-full bg-black max-md:max-w-full'>
            <div className='flex gap-5 max-md:flex-col'>
              <div className='w-[37%] max-md:w-full'>
                <div className='flex flex-col items-start self-stretch my-auto w-full text-base text-neutral-50'>
                  <div className='flex gap-6 items-center text-center'>
                    <img
                      src='https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/cacf23b2e4629b6854d4c62396778f71d94b1884?placeholderIfAbsent=true'
                      alt=''
                      className='object-contain shrink-0 self-stretch my-auto w-10 aspect-[0.82]'
                    />
                    <p className='self-stretch my-auto w-[126px]'>
                      iPhone 14 Series
                    </p>
                  </div>
                  <h2 className='self-stretch mt-5 text-5xl font-semibold tracking-widest leading-[60px] max-md:text-4xl max-md:leading-[56px]'>
                    Up to 10% off Voucher
                  </h2>
                  <a
                    href='#'
                    className='flex gap-2 items-center mt-6 font-medium text-center group'
                  >
                    <span className='flex flex-col self-stretch my-auto w-[81px]'>
                      <span className='self-start'>Shop Now</span>
                      <span className='mt-1 border border-solid bg-neutral-50 border-neutral-50 min-h-px w-[81px] group-hover:bg-red-500 transition-colors' />
                    </span>
                    <img
                      src='https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/0fe83527999bb9ea3e8046c3185af07bc43d1163?placeholderIfAbsent=true'
                      alt=''
                      className='object-contain shrink-0 self-stretch my-auto w-6 aspect-square'
                    />
                  </a>
                </div>
              </div>
              <div className='ml-5 w-[63%] max-md:ml-0 max-md:w-full'>
                <div className='flex relative flex-col items-start pt-72 pb-3 w-full min-h-[328px] max-md:pt-24'>
                  <img
                    src='https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/bf65a66b635333a8348587da7254d9c8ba14b0cd?placeholderIfAbsent=true'
                    alt='iPhone 14'
                    className='object-cover absolute inset-0 size-full'
                  />
                  <div className='flex relative gap-3 items-center z-10'>
                    {[1, 2, 3, 4].map((i) => (
                      <button
                        key={i}
                        className='flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition-opacity'
                        aria-label={`Slide ${i}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
