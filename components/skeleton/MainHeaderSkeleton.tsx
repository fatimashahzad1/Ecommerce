import { Skeleton } from "../ui/skeleton";

export const MainHeaderSkeleton: React.FC = () => (
    <header className='max-w-[1170px] mx-auto max-md:px-5 flex flex-col md:flex-row justify-between items-center pt-6 md:pt-10 pb-4 w-full gap-4 md:gap-8'>
        {/* Left Section - Logo */}
        <div className='flex items-center w-full md:w-auto md:justify-start'>
            <div className='md:hidden p-2'>
                <Skeleton className='w-6 h-6 rounded' />
            </div>
            <Skeleton className='ml-4 w-28 h-8 rounded' />
        </div>

        {/* Middle Section - Navigation */}
        <nav className='hidden md:flex gap-8 lg:gap-12 items-center justify-center flex-1'>
            {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className='w-20 h-6 rounded' />
            ))}
        </nav>

        {/* Right Section - Search and Icons */}
        <div className='flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto items-center'>
            <div className='flex items-center px-4 md:px-5 py-2 bg-neutral-100 rounded w-full md:w-auto'>
                <Skeleton className='w-full h-6 md:w-40 rounded' />
                <Skeleton className='ml-4 w-6 h-6 rounded' />
            </div>
            <div className='flex gap-4 items-center'>
                <Skeleton className='w-8 h-8 rounded-full' />
                <Skeleton className='w-8 h-8 rounded-full' />
                <Skeleton className='w-8 h-8 rounded-full' />
            </div>
        </div>
    </header>)