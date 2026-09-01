export type Address = {
  id: string;
  user_id: string;
  title: string | null;
  province: string | null;
  city: string | null;
  address: string | null;
  postal_code: string | null;
  lat: number | null;
  lng: number | null;
  is_default: boolean;
};

