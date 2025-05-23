import { Product } from '@/types/products';

export const mockProducts = [
  {
    id: '19',
    title: 'Curology Product Set',
    rating: 4,
    price: 500,
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/20d353ac44b58ec5f72c8d04bb30c4c1d00e24a2',
    reviewCount: 145,
  },
  {
    id: '16',
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/d026a43de889a045e41d702be35b797005481ad0',
    rating: 4,
    title: 'Breed Dry Dog Food',
    reviewCount: 35,
    price: 100,
  },
  {
    id: '3',
    reviewCount: 99,
    discount: 30,
    stockStatus: 'Limited Stock',
    title: 'IPS LCD Gaming Monitor',
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/690018693f67fd8cc4949c739b0c81478431edfe',
    price: 370,
    rating: 5,
    colors: ['black'],
    bestSelling: true,
    originalPrice: 400,
    sizes: [],
    description:
      '27-inch IPS LCD monitor with 144Hz refresh rate and 1ms response time. Perfect for gaming and productivity.',
  },
  {
    id: '8',
    description:
      'Luxury duffle bag made with premium materials. Perfect for travel and daily use.',
    sizes: [],
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/a63f2121f90daf2ab08177b2c545287b6d96bcd8?placeholderIfAbsent=true',
    title: 'Gucci Duffle Bag',
    stockStatus: 'In Stock',
    colors: ['brown', 'black'],
    originalPrice: 1160,
    price: 960,
    featured: true,
    reviewCount: 65,
    rating: 5,
  },
  {
    id: '7',
    reviewCount: 99,
    discount: 25,
    title: 'S-Series Comfort Chair 2',
    price: 375,
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/d9422fa273d9c73fa03429a1516009cf254f5c07',
    originalPrice: 400,
    rating: 4.5,
  },
  {
    id: '1',
    price: 120,
    stockStatus: 'In Stock',
    discount: 40,
    sizes: [
      { size: 'XS', count: 10 },
      { size: 'S', count: 15 },
      { size: 'M', count: 20 },
      { size: 'L', count: 5 },
      { size: 'XL', count: 2 },
    ],
    featured: true,
    colors: ['red', 'blue', 'black'],
    originalPrice: 160,
    title: 'HAVIT HV-G92 Gamepad',
    description:
      'PlayStation 5 Controller Skin. High-quality vinyl with air channel adhesive for easy bubble-free install & mess-free removal. Pressure sensitive.',
    reviewCount: 88,
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/588809589ffa0596f29be2fe0bc17a99982f7d41',
    rating: 4,
  },
  {
    id: '17',
    reviewCount: 95,
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/05e7c1dcedafbdf9d1a898a97483cfcadcc01a2b',
    price: 360,
    title: 'CANON EOS DSLR Camera',
    rating: 4,
  },
  {
    id: '5',
    sizes: [
      { size: 'S', count: 12 },
      { size: 'M', count: 8 },
      { size: 'L', count: 5 },
      { size: 'XL', count: 3 },
    ],
    description:
      'Stylish and warm winter coat made with high-quality materials. Perfect for cold weather.',
    price: 260,
    featured: true,
    stockStatus: 'In Stock',
    rating: 5,
    colors: ['red', 'blue', 'black'],
    title: 'The North Coat',
    originalPrice: 360,
    reviewCount: 65,
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/e7432ac52b7277818e216f4cce703ac420b3cab8?placeholderIfAbsent=true',
  },
  {
    id: '14',
    price: 700,
    reviewCount: 325,
    rating: 5,
    title: 'ASUS FHD Gaming Laptop',
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/1576308dad6976ed06f0b14aabd09fb00cb43e78',
  },
  {
    id: '2',
    discount: 35,
    stockStatus: 'In Stock',
    originalPrice: 1160,
    bestSelling: true,
    rating: 4,
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/32e9a1600318286879ba42afbcf26b480ae071b0',
    title: 'AK-900 Wired Keyboard',
    price: 960,
    reviewCount: 75,
    sizes: [],
    colors: ['black', 'white'],
    description:
      'Ergonomic design with mechanical keys for a smooth typing experience. Durable and long-lasting.',
  },
  {
    id: '4',
    colors: ['gray', 'black'],
    sizes: [],
    title: 'S-Series Comfort Chair 1',
    image:
      'https://cdn.builder.io/api/v1/image/assets/50863f29051940439648c044a13e82c2/d9422fa273d9c73fa03429a1516009cf254f5c07',
    bestSelling: true,
    description:
      'Ergonomic office chair with lumbar support and adjustable height. Designed for long hours of comfort.',
    originalPrice: 400,
    stockStatus: 'In Stock',
    rating: 4.5,
    price: 375,
    discount: 25,
    reviewCount: 99,
  },
];

export const mockProductsWithStock = {
  title: 'A Test Product',
  price: 99.99,
  description: 'This is a test product.',
  category: 'Electronics',
  imagePath: 'tests/mocks/test-image.jpg', // Ensure this file exists or mock
  bestSelling: true,
  featured: true,
  stockStatus: 'In Stock',
  sizes: [
    { size: 'Small (S)', stock: 5 },
    { size: 'Medium (M)', stock: 10 },
    { size: 'Large (L)', stock: 15 },
    { size: 'Extra Large (XL)', stock: 20 },
  ],
};

export const mockUpdatedProductsWithStock = {
  title: 'A Updated Test Product',
};
