'use client';
import React from 'react';
import Image from 'next/image';
import { HeartIcon, EyeIcon, StarIcon, FilledHeartIcon } from '../icons';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ROUTE_LINKS } from '@/constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addToWishlist, removeFromWishlist } from '@/store/wishlistSlice';

interface ProductCardProps {
  id: number | string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  discount?: number;
  showAddToCart?: boolean;
  index?: number;
  testid?: string;
  categoryId: string
}

/**
 * ProductCard Component
 * Displays product information in a card format
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price,
  originalPrice,
  rating,
  reviewCount,
  discount,
  categoryId,
  showAddToCart = false,
  index,
  testid,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const inWishlist = wishlist.some((item) => item.id === id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      dispatch(removeFromWishlist(id.toString()));
    } else {
      dispatch(
        addToWishlist({
          id: id,
          title,
          price,
          originalPrice,
          rating,
          reviewCount,
          discount,
          image,
          categoryId
        })
      );
    }
  };

  return (
    <div className='relative flex flex-col group min-w-[270px]' data-testid={`${testid}-${index}`}>
      {/* Product Image Container */}
      <div className='relative aspect-square bg-neutral-100 rounded-md overflow-hidden'>
        <Image
          src={image}
          alt={title}
          fill
          className='object-contain p-5'
          sizes='(max-width: 768px) 100vw, 270px'
        />

        {/* Discount Badge */}
        {discount && (
          <div className='absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded'>
            -{discount}%
          </div>
        )}

        {/* Action Buttons */}
        <div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
          <button
            className={`p-2 bg-white rounded-full shadow-md hover:bg-gray-50 ${inWishlist ? 'text-red-500' : 'text-gray-500'}`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={handleWishlistToggle}
          >
            {inWishlist ? (
              <FilledHeartIcon className='w-5 h-5' />
            ) : (
              <HeartIcon className='w-5 h-5' />
            )}
          </button>
          <button
            className='p-2 bg-white rounded-full shadow-md hover:bg-gray-50'
            aria-label='Quick view'
            onClick={() =>
              router.push(ROUTE_LINKS.productDetails(id as string))
            }
          >
            <EyeIcon width={20} height={20} className='text-black' />
          </button>
        </div>

        {/* Add to Cart Button */}
        {showAddToCart && (
          <div className='absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-80 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'>
            Add To Cart
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className='mt-4 space-y-2'>
        <h3 className='font-medium text-base'>{title}</h3>
        <div className='flex gap-3 items-center'>
          <span className='text-red-500 font-medium'>${price}</span>
          {originalPrice && (
            <span className='text-black text-opacity-50 line-through'>
              ${originalPrice}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className='flex items-center gap-2'>
          <div className='flex'>
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={cn('w-4 h-4', {
                  'text-yellow-400': index < rating,
                  'text-gray-300': index >= rating,
                })}
              ></StarIcon>
            ))}
          </div>
          <span className='text-black text-opacity-50'>({reviewCount})</span>
        </div>
      </div>
    </div>
  );
};
