export type CartItemType = {
  id: string;
  quantity: number;
  variant_id: string;
  label: string;
  color: string;
  name: string;
  price: number;
  image_url?: string;
  final_price: number;
  discount: number;
  stock: number;
};

export type CartSummary = {
  total: number;
  discount: number;
  payable: number;
  count: number;
};
