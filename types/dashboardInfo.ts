export type DashboardInfoType = {
  stats: state;
  sales: [sale];
  recent_orders: OrdersType[];
  low_stock_products: Low_stock_product[];
  top_products:Top_product [];
  shipping_cost: number
};

export type state = {
  paid_orders: number;
  pending_orders: number;
  today_orders: number;
  today_sales: number;
};

export type sale = {
  date: string;
  amount: number;
};

export type OrdersType = {
  created_at: string;
  customer_name: string;
  id: string;
  status: string;
  total_price: number;
  user_id: string;
};

export type Low_stock_product = {
  id: string;
  name: string;
  stock: number;
};
export type Top_product = {
  id: string;
  name: string;
  stock: number;
};
