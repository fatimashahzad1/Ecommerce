export interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number; // Optional for products without discounts
  discount?: number; // Optional if no discount is applied
  bestSelling?: boolean; // Optional for products that are not best sellers
  featured?: boolean; // Optional for products that are not featured
  rating: number;
  reviewCount: number;
  description?: string; // Optional for products without descriptions
  colors?: string[]; // Optional for products without color options
  sizes?: { size: string; count: number }[]; // Optional for products without size options
  stockStatus?: 'In Stock' | 'Out of Stock' | 'Limited Stock'; // Optional for products that are always in stock
}
