// types/product.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  discount: number;
  category_name: string;
  primary_image: string | null;
  is_active: boolean;
  created_at: string;
};
export type VariantFormData = {
  label: string;
  color: string;
  stock: number;
};

export type ProductFormData = {
  name: string;
  description: string;
  price: number;
  discount: number;
  category_id: string;
  is_active: boolean;
  variants: VariantFormData[];
};

export type SelectOption = {
  value: string;
  label: string;
};

export const CATEGORIES: SelectOption[] = [
  {
    value: "shoes",
    label: "کفش",
  },
  {
    value: "clothing",
    label: "پوشاک",
  },
  {
    value: "accessories",
    label: "اکسسوری",
  },
  {
    value: "bags",
    label: "کیف",
  },
];

export const BRANDS: SelectOption[] = [
  {
    value: "nike",
    label: "Nike",
  },
  {
    value: "adidas",
    label: "Adidas",
  },
  {
    value: "puma",
    label: "Puma",
  },
  {
    value: "reebok",
    label: "Reebok",
  },
];

// src/types/product.ts


export const COLORS = [
  {
    label: "مشکی",
    value: "#000000",
  },
  {
    label: "سفید",
    value: "#FFFFFF",
  },
  {
    label: "قرمز",
    value: "#EF4444",
  },
  {
    label: "آبی",
    value: "#3B82F6",
  },
  {
    label: "سبز",
    value: "#22C55E",
  },
  {
    label: "زرد",
    value: "#EAB308",
  },
  {
    label: "نارنجی",
    value: "#F97316",
  },
  {
    label: "بنفش",
    value: "#8B5CF6",
  },
  {
    label: "صورتی",
    value: "#EC4899",
  },
  {
    label: "کرم",
    value: "#F5F5DC",
  },
] as const;


export type ProductColor = (typeof COLORS)[number]["value"];
