"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/lib/schemas/auth.schema";
import PrimaryInput from "@/components/ui/PrimaryInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Link from "next/link";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";

const darkInput =
  "bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
      await api.post(
        "/password/forgot",
        { phone: data.phone },
        undefined,
        true,
      );
      // پاسخ سرور همیشه موفق است تا شماره‌های ثبت‌شده لو نروند
      router.push(`/reset-password?phone=${encodeURIComponent(data.phone)}`);
    } catch (err) {
      setError("root", {
        message: err instanceof Error ? err.message : "خطایی رخ داد",
      });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7R0i99gD58zNdLnvuBifZEMjSE2A_PXAafA6TRvS5ENeti4IYg5jgOdc5Dl4mm4j2xIuHjXfSrAtei7RYYyZ1hANP6dKgJ1DH6JjdRhTNYEW8aosM0M3-8LCd93y3mL5D1jnZ5mn8QyUAi_6jCXGUXka7n51pknD5XmN7SUvBWSOLiPqtpfFfsGcyeRAw2c9MaLH1PWt3bgU59WtutfMlvN53F0w5fNJI_bFujetXMFBJgUzou1JHEg"
          alt="background"
          fill
          className="object-cover scale-105 blur-sm brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-[#6b705c]/40" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:px-10 border border-white/15">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tighter drop-shadow-md">
            ARIA SPORT
          </h1>
          <div className="w-10 h-0.5 bg-white/40 mx-auto mt-2 rounded-full" />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-1">بازیابی رمز عبور</h2>
          <p className="text-sm text-white/60">
            شماره موبایل خود را وارد کنید تا کد تایید ارسال شود
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <PrimaryInput
            {...register("phone")}
            type="tel"
            dir="ltr"
            placeholder="شماره موبایل"
            icon="smartphone"
            error={errors.phone?.message}
            inputClassName={darkInput}
          />

          {errors.root && (
            <p className="text-xs text-red-400 text-right">
              {errors.root.message}
            </p>
          )}

          <div className="pt-2">
            <PrimaryButton type="submit" icon="arrow_back" loading={isSubmitting}>
              ارسال کد تایید
            </PrimaryButton>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-white/50 hover:text-white underline decoration-white/20 underline-offset-4 transition-all"
          >
            بازگشت به ورود
          </Link>
        </div>
      </div>
    </main>
  );
}
