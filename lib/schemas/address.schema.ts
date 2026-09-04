import { z } from "zod";

export const addressSchema = z.object({
  title: z.string().min(1, "عنوان آدرس الزامی است."),
  province: z.string().min(1, "استان الزامی است."),
  city: z.string().min(1, "شهر الزامی است."),
  address: z.string().min(1, "آدرس الزامی است."),
  postal_code: z.string().regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد."),
  is_default: z.boolean(),
  lat: z.number().nullable(),
  lng: z.number().nullable(),
});