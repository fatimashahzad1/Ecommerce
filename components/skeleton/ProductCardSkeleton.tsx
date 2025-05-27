import { Skeleton } from "../ui/skeleton";

export const ProductCardSkeleton: React.FC = () => (
    <div className='relative flex flex-col w-[270px]'>
        {/* Image Skeleton */}
        <div className='relative aspect-square bg-neutral-100 rounded-md overflow-hidden'>
            <Skeleton className='absolute inset-0 w-full h-full' />
            {/* Discount badge skeleton */}
            <Skeleton className='absolute top-3 left-3 w-12 h-6 rounded' />
            {/* Action buttons skeleton */}
            <div className='absolute top-3 right-3 flex flex-col gap-2'>
                <Skeleton className='w-8 h-8 rounded-full' />
                <Skeleton className='w-8 h-8 rounded-full' />
            </div>
            {/* Add to cart button skeleton */}
            <Skeleton className='absolute bottom-0 left-0 right-0 h-8 rounded-b-md' />
        </div>
        {/* Details Skeleton */}
        <div className='mt-4 space-y-2'>
            <Skeleton className='h-5 w-3/4' />
            <div className='flex gap-3 items-center'>
                <Skeleton className='h-5 w-16' />
                <Skeleton className='h-5 w-12' />
            </div>
            <div className='flex items-center gap-2'>
                <div className='flex gap-1'>
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className='w-4 h-4 rounded' />
                    ))}
                </div>
                <Skeleton className='h-4 w-8' />
            </div>
        </div>
    </div>
);