'use client';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProfileIcon, OrderIcon, CancelIcon, StarIcon, LogoutIcon, AdminPanelIcon } from '@/components/icons';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ROUTE_LINKS } from "@/constants/routes";

interface AccountDropdownProps {
  triggerRef?: React.RefObject<HTMLButtonElement>;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({ triggerRef }) => {
  const { signOut, isAdmin } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleMenuItemClick = async (action: string) => {
    if (action === 'logout') {
      await signOut();
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully.',
        variant: 'success',
      });
      router.push('/login');
      return;
    }
  };

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <button ref={triggerRef} className='w-8 aspect-square'>
          <ProfileIcon className='w-full h-full' />
          <span className='sr-only'>Toggle account menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56 text-sm text-neutral-50 bg-black  border-0 shadow-none'
        align='end'
      >
        {/* Admin Panel Option - only visible if user is admin */}
        {isAdmin && (
          <DropdownMenuItem
            className='flex items-center gap-4 px-5 py-2.5 hover:bg-white/10 focus:bg-white/10 cursor-pointer'
            asChild
          >
            <Link href={ROUTE_LINKS.adminDashboard}>
              <AdminPanelIcon width={24} height={24} className='object-contain' color='white' />
              <span>Admin Panel</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className='flex items-center gap-4 px-5 py-2.5 hover:bg-white/10 focus:bg-white/10 cursor-pointer'
          onClick={() => handleMenuItemClick('manage-account')}
        >
          <ProfileIcon width={24} height={24} className='object-contain' color='white' />
          <span>Manage My Account</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className='flex items-center gap-4 px-5 py-2.5 hover:bg-white/10 focus:bg-white/10 cursor-pointer'
          onClick={() => handleMenuItemClick('my-order')}
        >
          <OrderIcon width={24} height={24} className='object-contain' />
          <span>My Order</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className='flex items-center gap-4 px-5 py-2.5 hover:bg-white/10 focus:bg-white/10 cursor-pointer'
          onClick={() => handleMenuItemClick('my-cancellations')}
        >
          <CancelIcon width={24} height={24} className='object-contain' />
          <span>My Cancellations</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className='flex items-center gap-4 px-5 py-2.5 hover:bg-white/10 focus:bg-white/10 cursor-pointer'
          onClick={() => handleMenuItemClick('my-reviews')}
        >
          <StarIcon width={24} height={24} className='object-contain' />
          <span>My Reviews</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className='flex items-center gap-4 px-5 py-2.5 hover:bg-white/10 focus:bg-white/10 cursor-pointer'
          onClick={() => handleMenuItemClick('logout')}
        >
          <LogoutIcon width={24} height={24} className='object-contain' />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
