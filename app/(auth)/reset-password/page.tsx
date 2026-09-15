"use client";

import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/lib/schemas/auth.schema";
import PrimaryInput from "@/components/ui/PrimaryInput";
import PasswordInput from "@/components/ui/PasswordInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Link from "next/link";
import { api } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const darkInput =
  "bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20";

function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") ?? "";

  const [resendIn, setResendIn] = useState(120);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // بدون شماره، برگرد به مرحله قبل
  useEffect(() => {
    if (!phone) router.replace("/forgot-password");
  }, [phone, router]);

  // شمارش معکوس ارسال مجدد
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  const onResend = async () => {
    if (resendIn > 0) return;
    try {
      await api.post(
        "/otp/resend",
        { phone, purpose: "reset_password" },
        undefined,
        true,
      );
      setResendIn(120);
    } catch (err) {
      setError("root", {
        message:
          err instanceof Error ? err.message : "ارسال مجدد کد ناموفق بود",
      });
    }
  };

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      await api.post(
        "/password/reset",
        {
          phone,
          code: data.code,
          new_password: data.new_password,
        },
        undefined,
        true,
      );
      router.replace("/login");
    } catch (err) {
      setError("root", {
        message: err instanceof Error ? err.message : "کد تایید نامعتبر است",
      });
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:px-10 border border-white/15">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tighter drop-shadow-md">
          ARIA SPORT
        </h1>
        <div className="w-10 h-0.5 bg-white/40 mx-auto mt-2 rounded-full" />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">تعیین رمز جدید</h2>
        <p className="text-sm text-white/60">
          کد ارسال‌شده به شماره{" "}
          <span dir="ltr" className="text-white/80">
            {phone}
          </span>{" "}
          و رمز جدید را وارد کنید
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <PrimaryInput
          {...register("code")}
          type="text"
          inputMode="numeric"
          dir="ltr"
          maxLength={6}
          placeholder="- - - - - -"
          icon="sms"
          error={errors.code?.message}
          inputClassName={`${darkInput} tracking-[0.5em] text-center`}
        />

        <PasswordInput
          {...register("new_password")}
          dir="ltr"
          placeholder="رمز عبور جدید"
          error={errors.new_password?.message}
          inputClassName={darkInput}
        />

        <PasswordInput
          {...register("confirm_password")}
          dir="ltr"
          placeholder="تکرار رمز عبور جدید"
          error={errors.confirm_password?.message}
          inputClassName={darkInput}
        />

        {errors.root && (
          <p className="text-xs text-red-400 text-right">
            {errors.root.message}
          </p>
        )}

        <div className="pt-2">
          <PrimaryButton type="submit" icon="check" loading={isSubmitting}>
            تغییر رمز عبور
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-4 flex items-center justify-between">
        {resendIn > 0 ? (
          <span className="text-sm text-white/50">
            ارسال مجدد کد تا {resendIn} ثانیه دیگر
          </span>
        ) : (
          <button
            type="button"
            onClick={onResend}
            className="text-sm text-white/70 hover:text-white underline decoration-white/20 underline-offset-4 transition-all"
          >
            ارسال مجدد کد
          </button>
        )}

        <Link
          href="/login"
          className="text-sm text-white/50 hover:text-white underline decoration-white/20 underline-offset-4 transition-all"
        >
          بازگشت به ورود
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
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

      <Suspense fallback={null}>
        <ResetForm />
      </Suspense>
    </main>
  );
}
