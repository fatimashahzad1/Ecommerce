import { EnhanceMusicHero } from './EnhanceMusicHero';
import { WomensCollection } from './WomensCollection';
import Image from 'next/image';

export const NewArrival = () => {
  return (
    <section
      className='flex flex-col mt-36 max-md:mt-10 max-md:max-w-full'
      aria-label='New arrivals'
    >
      <header className='flex flex-col self-start'>
        <div className='flex gap-4 items-center self-start'>
          <div className='self-stretch my-auto w-5'>
            <div className='flex shrink-0 h-10 bg-red-500 rounded' />
          </div>
          <h2 className='self-stretch my-auto text-base font-semibold leading-none text-red-500'>
            Featured
          </h2>
        </div>
        <h3 className='mt-5 text-4xl font-semibold tracking-widest leading-none text-black'>
          New Arrival
        </h3>
      </header>

      <div className='flex flex-wrap gap-8 items-start mt-16 max-md:mt-10 max-md:max-w-full'>
        <EnhanceMusicHero />
        <div className='flex flex-col items-center min-w-60 w-[570px] max-md:max-w-full'>
          <WomensCollection />
          <div className='flex flex-wrap gap-8 justify-center items-center mt-8 max-md:max-w-full'>
            <Image
              src='https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/14a0de098df8fa673dc072e8c1b7c2680793ea24?placeholderIfAbsent=true'
              alt='Featured Product 1'
              width={270}
              height={270}
              className='object-contain self-stretch my-auto aspect-[0.95] min-w-60 w-[270px]'
            />
            <Image
              src='https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/2e0aa78abdc689ecbbb60849670185d870c65c89?placeholderIfAbsent=true'
              alt='Featured Product 2'
              width={270}
              height={270}
              className='object-contain self-stretch my-auto aspect-[0.95] min-w-60 w-[270px]'
            />
          </div>
        </div>
      </div>
    </section>
  );
};
