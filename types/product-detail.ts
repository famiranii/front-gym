import { ReviewType } from "./reviewsType";

export interface ProductImage {
  url: string;
}

export interface ProductVariant {
  color: string;
  stock: number;
  label: string;
  id: string;
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
  average_rating: number;
  reviewCount: number;
  images: ProductImage[];
  variants: ProductVariant[];
  specs: ProductSpec[];
  description: string;
  reviews: ReviewType[];
  tags: string[];
  final_price: number;
  discount: number;
}
