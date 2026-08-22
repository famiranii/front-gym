"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PrimaryInput from "@/components/ui/PrimaryInput";
import PasswordInput from "@/components/ui/PasswordInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Link from "next/link";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

const loginSchema = z.object({
  phone: z.string().regex(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست"),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await api.post<{
        session_id: string;
        access_token: string;
        refresh_token: string;
        access_token_expires_at: string;
        refresh_token_expires_at: string;
        user: {
          full_name: string;
          phone: string;
          created_at: string;
        };
      }>("/login", {
        phone: data.phone,
        password: data.password,
      });

      Cookies.set("access_token", res.access_token, { expires: 7 });
      Cookies.set("refresh_token", res.refresh_token, { expires: 7 });
      router.push("/");
    } catch {
      setError("root", { message: "شماره موبایل یا رمز عبور اشتباه است" });
    }
  };

  const darkInput =
    "bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20";

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
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

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/15">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tighter drop-shadow-md">
            ARIA SPORT
          </h1>
          <div className="w-10 h-0.5 bg-white/40 mx-auto mt-2 rounded-full" />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-1">ورود به حساب</h2>
          <p className="text-sm text-white/60">خوش برگشتی</p>
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

          <PasswordInput
            {...register("password")}
            dir="ltr"
            placeholder="رمز عبور"
            error={errors.password?.message}
            inputClassName={darkInput}
          />

          {errors.root && (
            <p className="text-xs text-red-400 text-right">
              {errors.root.message}
            </p>
          )}

          <div className="pt-2">
            <PrimaryButton
              type="submit"
              icon="arrow_back"
              loading={isSubmitting}
            >
              ورود
            </PrimaryButton>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/register"
            className="text-sm text-white/50 hover:text-white underline decoration-white/20 underline-offset-4 transition-all"
          >
            حساب ندارید؟ ثبت‌نام کنید
          </Link>
        </div>
      </div>
    </main>
  );
}
