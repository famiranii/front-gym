"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/store/hook";
import { api } from "@/lib/api";
import PrimaryInput from "@/components/ui/PrimaryInput";

interface EditProfileFormValues {
  full_name: string;
  phone: string;
  password?: string;
}

export default function EditProfileForm() {
  const me = useAppSelector((state) => state.users.me);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormValues>({
    defaultValues: {
      full_name: "",
      phone: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!me) return;

    reset({
      full_name: me.full_name ?? "",
      phone: me.phone ?? "",
      password: "",
    });
  }, [me, reset]);

  const onSubmit = async (data: EditProfileFormValues) => {
    try {
      const payload = {
        full_name: data.full_name,
        phone: data.phone,
        ...(data.password ? { password: data.password } : {}),
      };

      await api.put("/users/me", payload);

      console.log("اطلاعات با موفقیت تغییر کرد");
    } catch (error) {
      console.error("خطا در تغییر اطلاعات:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-border rounded-2xl p-6 space-y-5 w-[520px]"
      dir="rtl"
    >
      <div>
        <h2 className="text-xl font-bold text-foreground">ویرایش اطلاعات</h2>

        <p className="text-sm text-muted-foreground mt-1">
          اطلاعات حساب کاربری خود را ویرایش کنید.
        </p>
      </div>

      <PrimaryInput
        placeholder="نام و نام خانوادگی"
        {...register("full_name", {
          required: "نام و نام خانوادگی الزامی است",
          minLength: {
            value: 3,
            message: "نام باید حداقل ۳ کاراکتر باشد",
          },
        })}
        error={errors.full_name?.message}
      />

      <PrimaryInput
        type="tel"
        placeholder="شماره موبایل"
        {...register("phone", {
          required: "شماره موبایل الزامی است",
        })}
        error={errors.phone?.message}
      />

      <PrimaryInput
        type="password"
        placeholder="اگر نمی‌خواهید تغییر دهید خالی بگذارید"
        {...register("password", {
          minLength: {
            value: 6,
            message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
          },
        })}
        error={errors.password?.message}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-primary text-primary-foreground py-3 font-semibold transition-opacity disabled:opacity-50"
      >
        {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </form>
  );
}
