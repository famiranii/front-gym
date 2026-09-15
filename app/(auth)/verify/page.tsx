"use client";

import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpCodeSchema, OtpCodeSchema } from "@/lib/schemas/auth.schema";
import PrimaryInput from "@/components/ui/PrimaryInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Link from "next/link";
import { api } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useAppDispatch } from "@/store/hook";
import { GetMeApi } from "@/store/slices/getMeSlice";

const darkInput =
  "bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20";

function VerifyForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") ?? "";

  const [resendIn, setResendIn] = useState(120);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OtpCodeSchema>({
    resolver: zodResolver(otpCodeSchema),
  });

  // بدون شماره، برگرد به ثبت‌نام
  useEffect(() => {
    if (!phone) router.replace("/register");
  }, [phone, router]);

  // شمارش معکوس ارسال مجدد
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  const onSubmit = async (data: OtpCodeSchema) => {
    try {
      await api.post(
        "/register/verify",
        { phone, code: data.code },
        undefined,
        true,
      );
      // ثبت‌نام موفق و ورود خودکار (کوکی‌ها روی سرور ست شد)
      await dispatch(GetMeApi());
      router.replace("/");
    } catch (err) {
      setError("root", {
        message:
          err instanceof Error ? err.message : "کد تایید نامعتبر است",
      });
    }
  };

  const onResend = async () => {
    if (resendIn > 0) return;
    try {
      await api.post(
        "/otp/resend",
        { phone, purpose: "register" },
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

  return (
    <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:px-10 border border-white/15">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tighter drop-shadow-md">
          ARIA SPORT
        </h1>
        <div className="w-10 h-0.5 bg-white/40 mx-auto mt-2 rounded-full" />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">تایید شماره موبایل</h2>
        <p className="text-sm text-white/60">
          کد تایید به شماره{" "}
          <span dir="ltr" className="text-white/80">
            {phone}
          </span>{" "}
          ارسال شد
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

        {errors.root && (
          <p className="text-xs text-red-400 text-right">
            {errors.root.message}
          </p>
        )}

        <div className="pt-2">
          <PrimaryButton type="submit" icon="check" loading={isSubmitting}>
            تایید و ورود
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
          href="/register"
          className="text-sm text-white/50 hover:text-white underline decoration-white/20 underline-offset-4 transition-all"
        >
          ویرایش شماره
        </Link>
      </div>
    </div>
  );
}

export default function VerifyPage() {
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
        <VerifyForm />
      </Suspense>
    </main>
  );
}
