import { cn } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";

export const CategoryCardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div
        className={cn(
            'flex flex-col items-center justify-center min-w-[170px] h-[145px] rounded border border-black/30',
            className
        )}
        aria-label='Category skeleton'
    >
        <Skeleton className='w-14 h-14 mb-4' />
        <Skeleton className='h-5 w-20' />
    </div>
);