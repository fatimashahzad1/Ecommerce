'use client';
import React from 'react';
import { SearchIcon, HeartIcon, CartIcon } from '@/components/icons';
import AccountDropdown from './AccountDropdown';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { NavLink } from '../navigation/NavLink';

/**
 * Navigation items configuration
 */
const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },
  { href: '/sign-up', label: 'Sign Up' },
];

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
            <nav className='flex flex-col gap-4 mt-8'>
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.href} href={item.href} className='text-lg'>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className='text-2xl font-bold tracking-wider'>Exclusive</div>
      </div>

      {/* Middle Section - Navigation */}
      <nav className='hidden md:flex gap-8 lg:gap-12 items-center justify-center flex-1'>
        {NAV_ITEMS.map((item) => (
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
          <button
            aria-label='Wishlist'
            className='hover:opacity-80 transition-opacity'
          >
            <HeartIcon className='w-6 h-6 md:w-8 md:h-8' />
          </button>
          <button
            aria-label='Cart'
            className='hover:opacity-80 transition-opacity'
          >
            <CartIcon className='w-6 h-6 md:w-8 md:h-8' />
          </button>
          <AccountDropdown triggerRef={accountBtnRef} />
        </div>
      </div>
    </header>
  );
};
