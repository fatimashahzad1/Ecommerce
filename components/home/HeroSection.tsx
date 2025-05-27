import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppSelector } from '@/hooks/useRedux';
import { NavCategory } from '@/types/categories';
import { Skeleton } from "../ui/skeleton";

/**
 * Category Item Component
 */
const CategoryItem: React.FC<{ category: NavCategory }> = ({ category }) => {
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
  const { categories, loading } = useAppSelector((state) => state.categories);

  // Transform categories into NavCategory[]
  function slugify(name: string) {
    return name
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  const navCategories: NavCategory[] = categories
    .filter((cat) => !cat.parentId)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((cat) => {
      const parentSlug = slugify(cat.name);
      const subCategories = categories
        .filter((sub) => sub.parentId === cat.id)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((sub) => ({
          name: sub.name,
          href: `/products/all?category=${parentSlug}&subCategory=${slugify(sub.name)}`,
        }));
      return {
        name: cat.name,
        href: `/products/all?category=${parentSlug}`,
        hasSubmenu: subCategories.length > 0,
        subCategories: subCategories.length > 0 ? subCategories : undefined,
      };
    });

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
              {loading
                ? [...Array(10)].map((_, i) => (
                  <div key={i} className='w-full mb-2'>
                    <Skeleton className='h-8 w-full rounded' />
                  </div>
                ))
                : navCategories.map((category) => (
                  <div key={category.href} className='w-full'>
                    <CategoryItem category={category} />
                  </div>
                ))}
            </div>
            <div className='shrink-0 w-px  border border-black border-solid' />
          </div>
        </nav>

        <div className='ml-5 w-[79%] md:w-[79%] max-md:ml-0 max-md:w-full'>
          <div className='overflow-hidden grow pt-4 pl-16 mt-10 w-full bg-black max-md:max-w-full'>
            <div className='flex gap-5 max-md:flex-col'>
              <div className='w-[37%] max-md:w-full'>
                <div className='flex flex-col items-start self-stretch my-auto w-full text-base text-neutral-50'>
                  <div className='flex gap-6 items-center text-center'>
                    <Image
                      src='https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/cacf23b2e4629b6854d4c62396778f71d94b1884?placeholderIfAbsent=true'
                      alt='Hero Image'
                      width={500}
                      height={500}
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
                    <Image
                      src='https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/0fe83527999bb9ea3e8046c3185af07bc43d1163?placeholderIfAbsent=true'
                      alt='Arrow Icon'
                      width={24}
                      height={24}
                      className='object-contain shrink-0 self-stretch my-auto w-6 aspect-square'
                    />
                  </a>
                </div>
              </div>
              <div className='ml-5 w-[63%] max-md:ml-0 max-md:w-full'>
                <div className='flex relative flex-col items-start pt-72 pb-3 w-full min-h-[328px] max-md:pt-24'>
                  <Image
                    src='https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/bf65a66b635333a8348587da7254d9c8ba14b0cd?placeholderIfAbsent=true'
                    alt='iPhone 14'
                    width={1200}
                    height={800}
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
