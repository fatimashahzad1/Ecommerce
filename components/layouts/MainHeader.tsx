'use client';
import React from 'react';
import { SearchIcon, HeartIcon, CartIcon } from '@/components/icons';
import AccountDropdown from '../home/AccountDropdown';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { NavLink } from '../navigation/NavLink';
import { NAV_CATEGORIES } from '@/mocks/categories';
import { ROUTE_LINKS, ROUTES } from '@/constants/routes';
import Link from 'next/link';

export const MainHeader: React.FC = () => {
  const accountBtnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <header className='flex flex-col md:flex-row justify-between items-center px-4 md:px-16 pt-6 md:pt-10 pb-4 w-full gap-4 md:gap-8'>
      {/* Left Section - Logo */}
      <div className='flex items-center w-full md:w-auto md:justify-start'>
        <Sheet>
          <SheetTrigger asChild>
            <button className='md:hidden p-2' aria-label='Menu'>
              <Menu className='w-6 h-6' />
            </button>
          </SheetTrigger>
          <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
            {/* Categories in Mobile Menu */}
            <nav className='flex flex-col gap-4 mt-8'>
              {ROUTES.map((item) => (
                <NavLink key={item.href} href={item.href} className='text-lg'>
                  {item.label}
                </NavLink>
              ))}
              <div className='text-lg font-semibold'>Categories</div>
              {NAV_CATEGORIES.map((category) => (
                <NavLink
                  key={category.href}
                  href={category.href}
                  className='text-base hover:text-red-500 transition-colors'
                >
                  {category.name}
                </NavLink>
              ))}
              <div className='h-px bg-gray-200 my-4' />
              {/* Navigation Items */}
            </nav>
          </SheetContent>
        </Sheet>

        <div className='text-2xl font-bold tracking-wider'>Exclusive</div>
      </div>

      {/* Middle Section - Navigation */}
      <nav className='hidden md:flex gap-8 lg:gap-12 items-center justify-center flex-1'>
        {ROUTES.map((item) => (
          <NavLink key={item.href} href={item.href}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Right Section - Search and Icons */}
      <div className='flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto items-center'>
        <div className='flex items-center px-4 md:px-5 py-2 bg-neutral-100 rounded w-full md:w-auto'>
          <input
            type='text'
            placeholder='What are you looking for?'
            className='w-full  bg-transparent outline-none text-sm'
          />
          <button className='ml-4 flex-shrink-0' aria-label='Search'>
            <SearchIcon className='w-5 h-5 md:w-6 md:h-6' />
          </button>
        </div>

        <div className='flex gap-4 items-center'>
          <Link
            href={ROUTE_LINKS.wishlist}
            aria-label='Wishlist'
            className='hover:opacity-80 transition-opacity'
          >
            <HeartIcon className='w-6 h-6 md:w-8 md:h-8' />
          </Link>
          <Link href={ROUTE_LINKS.cart} aria-label='Cart'>
            <CartIcon className='w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition-opacity' />
          </Link>
          <AccountDropdown triggerRef={accountBtnRef} />
        </div>
      </div>
    </header>
  );
};
