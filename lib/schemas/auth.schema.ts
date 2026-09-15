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

// کد تایید ۶ رقمی
export const otpCodeSchema = z.object({
  code: z.string().regex(/^[0-9]{6}$/, "کد تایید باید ۶ رقم باشد"),
});

export type OtpCodeSchema = z.infer<typeof otpCodeSchema>;

// درخواست بازیابی رمز — فقط شماره موبایل
export const forgotPasswordSchema = z.object({
  phone: z.string().regex(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

// تعیین رمز جدید با کد تایید
export const resetPasswordSchema = z
  .object({
    code: z.string().regex(/^[0-9]{6}$/, "کد تایید باید ۶ رقم باشد"),
    new_password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    confirm_password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "رمز عبور و تکرار آن یکسان نیست",
    path: ["confirm_password"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
