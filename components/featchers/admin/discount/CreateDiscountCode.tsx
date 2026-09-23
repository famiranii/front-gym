"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import { api } from "@/lib/api";

const discountSchema = z
  .object({
    code: z
      .string()
      .trim()
      .max(50, "کد تخفیف نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),

    discount_type: z.enum(["percentage", "fixed"]),

    discount_value: z
      .number({
        message: "مقدار تخفیف را وارد کنید",
      })
      .positive("مقدار تخفیف باید بیشتر از صفر باشد"),

    min_order_amount: z
      .number({
        message: "حداقل مبلغ سفارش را وارد کنید",
      })
      .min(0, "مبلغ نمی‌تواند منفی باشد"),

    max_discount_amount: z
      .number({
        message: "مبلغ سقف تخفیف نامعتبر است",
      })
      .min(0, "مبلغ نمی‌تواند منفی باشد")
      .nullable(),

    usage_limit: z
      .number({
        message: "محدودیت استفاده نامعتبر است",
      })
      .int("تعداد باید عدد صحیح باشد")
      .positive("تعداد باید بیشتر از صفر باشد")
      .nullable(),

    starts_at: z.custom<DateObject | null>(),

    expires_at: z.custom<DateObject | null>(),
  })
  .superRefine((data, ctx) => {
    if (data.discount_type === "percentage" && data.discount_value > 100) {
      ctx.addIssue({
        code: "custom",
        path: ["discount_value"],
        message: "درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد",
      });
    }

    if (data.starts_at && data.expires_at) {
      const start = data.starts_at.toDate();
      const end = data.expires_at.toDate();

      if (start >= end) {
        ctx.addIssue({
          code: "custom",
          path: ["expires_at"],
          message: "تاریخ پایان باید بعد از تاریخ شروع باشد",
        });
      }
    }
  });

type DiscountFormValues = z.infer<typeof discountSchema>;

type CreateDiscountCodeFormProps = {
  onCreated?: () => void;
};

const defaultValues: DiscountFormValues = {
  code: "",
  discount_type: "percentage",
  discount_value: 0,
  min_order_amount: 0,
  max_discount_amount: null,
  usage_limit: null,
  starts_at: null,
  expires_at: null,
};

export default function CreateDiscountCodeForm({
  onCreated,
}: CreateDiscountCodeFormProps) {
  const [serverError, setServerError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
    defaultValues,
  });

  const discountType = watch("discount_type");

  const onSubmit: SubmitHandler<DiscountFormValues> = async (data) => {
    setServerError("");

    try {
      const response = await api.post<{
        id: string;
        code: string;
      }>("/discount-codes", {
        code: data.code.trim() || undefined,

        discount_type: data.discount_type,

        discount_value: data.discount_value,

        min_order_amount: data.min_order_amount,

        max_discount_amount:
          data.max_discount_amount !== null ? data.max_discount_amount : null,

        usage_limit: data.usage_limit !== null ? data.usage_limit : null,

        starts_at: data.starts_at
          ? data.starts_at.toDate().toISOString()
          : null,

        expires_at: data.expires_at
          ? data.expires_at.toDate().toISOString()
          : null,
      });

      alert(`کد تخفیف ${response.code} با موفقیت ایجاد شد`);

      reset(defaultValues);

      onCreated?.();
    } catch (error: any) {
      console.error(error);

      setServerError(
        error?.response?.data?.error ||
          error?.message ||
          "خطا در ایجاد کد تخفیف",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
      dir="rtl"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          ایجاد کد تخفیف
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          یک کد تخفیف جدید ایجاد کنید
        </p>
      </div>

      {/* Server Error */}
      {serverError && (
        <div className="mb-5 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Code */}
        <div>
          <label className="mb-2 block text-sm font-medium">کد تخفیف</label>

          <input
            {...register("code")}
            type="text"
            placeholder="مثلاً HELLO20"
            className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm uppercase outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/20"
          />

          {errors.code && (
            <p className="mt-1 text-xs text-destructive">
              {errors.code.message}
            </p>
          )}

          <p className="mt-1 text-xs text-muted-foreground">
            اگر خالی باشد، سیستم به صورت خودکار کد می‌سازد.
          </p>
        </div>

        {/* Type */}
        <div>
          <label className="mb-2 block text-sm font-medium">نوع تخفیف</label>

          <select
            {...register("discount_type")}
            className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/20"
          >
            <option value="percentage">درصدی</option>
            <option value="fixed">مبلغ ثابت</option>
          </select>
        </div>

        {/* Discount Value */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            {discountType === "percentage" ? "درصد تخفیف" : "مبلغ تخفیف"}
          </label>

          <input
            type="number"
            min="0"
            {...register("discount_value", {
              setValueAs: (value) => (value === "" ? 0 : Number(value)),
            })}
            className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/20"
          />

          {errors.discount_value && (
            <p className="mt-1 text-xs text-destructive">
              {errors.discount_value.message}
            </p>
          )}
        </div>

        {/* Minimum Order */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            حداقل مبلغ سفارش
          </label>

          <input
            type="number"
            min="0"
            {...register("min_order_amount", {
              setValueAs: (value) => (value === "" ? 0 : Number(value)),
            })}
            placeholder="مثلاً ۵۰۰۰۰۰"
            className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/20"
          />

          {errors.min_order_amount && (
            <p className="mt-1 text-xs text-destructive">
              {errors.min_order_amount.message}
            </p>
          )}
        </div>

        {/* Max Discount */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            سقف مبلغ تخفیف
          </label>

          <input
            type="number"
            min="0"
            placeholder="اختیاری"
            {...register("max_discount_amount", {
              setValueAs: (value) => (value === "" ? null : Number(value)),
            })}
            className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/20"
          />

          {errors.max_discount_amount && (
            <p className="mt-1 text-xs text-destructive">
              {errors.max_discount_amount.message}
            </p>
          )}
        </div>

        {/* Usage Limit */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            محدودیت تعداد استفاده
          </label>

          <input
            type="number"
            min="1"
            placeholder="اختیاری"
            {...register("usage_limit", {
              setValueAs: (value) => (value === "" ? null : Number(value)),
            })}
            className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/20"
          />

          {errors.usage_limit && (
            <p className="mt-1 text-xs text-destructive">
              {errors.usage_limit.message}
            </p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="mb-2 block text-sm font-medium">تاریخ شروع</label>

          <Controller
            name="starts_at"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={(value) => {
                  field.onChange(value instanceof DateObject ? value : null);
                }}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                format="YYYY/MM/DD HH:mm"
                plugins={[<TimePicker key="start-time" position="bottom" />]}
                placeholder="تاریخ و ساعت شروع"
                inputClass="w-full h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            )}
          />

          {errors.starts_at && (
            <p className="mt-1 text-xs text-destructive">
              تاریخ شروع نامعتبر است
            </p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="mb-2 block text-sm font-medium">تاریخ پایان</label>

          <Controller
            name="expires_at"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={(value) => {
                  field.onChange(value instanceof DateObject ? value : null);
                }}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                format="YYYY/MM/DD HH:mm"
                plugins={[<TimePicker key="end-time" position="bottom" />]}
                placeholder="تاریخ و ساعت پایان"
                inputClass="w-full h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            )}
          />

          {errors.expires_at && (
            <p className="mt-1 text-xs text-destructive">
              {errors.expires_at.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "در حال ایجاد..." : "ایجاد کد تخفیف"}
        </button>
      </div>
    </form>
  );
}
