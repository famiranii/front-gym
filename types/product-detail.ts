export interface ProductImage {
  url: string;
}

export interface ProductVariant {
  color: string;
  stock: number;
  label: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  variants: ProductVariant[];
  specs: ProductSpec[];
  description: string;
  reviews: Review[];
  tags: string[];
}
