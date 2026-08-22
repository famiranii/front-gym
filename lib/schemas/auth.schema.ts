import { z } from "zod";

export const registerSchema = z.object({
  full_name: z.string().min(3, "نام باید حداقل ۳ کاراکتر باشد"),
  phone: z.string().regex(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست"),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
  terms: z.literal(true, {
    message: "پذیرش قوانین الزامی است",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
