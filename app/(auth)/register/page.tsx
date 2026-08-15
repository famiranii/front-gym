"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/lib/schemas/auth.schema";
import PasswordInput from "@/components/ui/PasswordInput";
import PrimaryInput from "@/components/ui/PrimaryInput";
import Link from "next/link";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await api.post("/register", {
        fullName: data.fullName,
        mobile: data.mobile,
        password: data.password,
      });
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-8 relative overflow-hidden">
      {/* Background Image */}
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

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:px-10 border border-white/15">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tighter drop-shadow-md">
            ARIA SPORT
          </h1>
          <div className="w-10 h-0.5 bg-white/40 mx-auto mt-2 rounded-full" />
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-1">
            ایجاد حساب کاربری
          </h2>
          <p className="text-sm text-white/60">
            به جمع ورزشکاران آریا بپیوندید
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <PrimaryInput
            {...register("fullName")}
            placeholder="نام و نام خانوادگی"
            icon="person"
            error={errors.fullName?.message}
            inputClassName="bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20"
          />

          <PrimaryInput
            {...register("mobile")}
            type="tel"
            dir="ltr"
            placeholder="شماره موبایل"
            icon="smartphone"
            error={errors.mobile?.message}
            inputClassName="bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20"
          />

          <PasswordInput
            {...register("password")}
            dir="ltr"
            placeholder="رمز عبور"
            error={errors.password?.message}
            inputClassName="bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20"
          />

          {/* Terms */}
          <div className="flex flex-col gap-1 pt-1">
            <div className="flex items-center gap-2">
              <input
                {...register("terms")}
                id="terms"
                type="checkbox"
                className="w-5 h-5 rounded border-white/30 bg-white/10 cursor-pointer accent-white"
              />
              <label
                htmlFor="terms"
                className="text-sm text-white/60 cursor-pointer hover:text-white transition-colors"
              >
                قوانین و مقررات را می‌پذیرم
              </label>
            </div>
            <div className="h-4">
              {errors.terms && (
                <p className="text-xs text-red-400">{errors.terms.message}</p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <PrimaryButton
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-foreground font-bold text-sm py-4 px-6 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
              ) : (
                <>
                  <span>ثبت‌نام</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
                    arrow_back
                  </span>
                </>
              )}
            </PrimaryButton>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <Link
            href="/login"
            className="text-sm text-white/50 hover:text-white underline decoration-white/20 underline-offset-4 transition-all"
          >
            قبلاً عضو شده‌اید؟ وارد شوید
          </Link>
        </div>
      </div>
    </main>
  );
}
