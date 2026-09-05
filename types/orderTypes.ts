export type Order = {
  id: string;
  user_id: string;
  status: string;
  shipping_cost: number;
  total_price: number;
  address_title: string | null;
  address_province: string | null;
  address_city: string | null;
  address_detail: string | null;
  address_postal_code: string | null;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  variant_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_name: string;
  label: string;
  color: string;
  image_url: string | null;
};
export type OrderDetail = {
  order: Order;
  items: OrderItem[];
};
