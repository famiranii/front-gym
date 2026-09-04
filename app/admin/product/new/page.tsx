"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import ImageUpload from "@/components/ui/ImageUpload";
import AttributesPicker, { Variant } from "@/components/ui/AttributesPicker";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import FormTextarea from "@/components/ui/FormTextarea";
import InputCard from "@/components/ui/InputCard";

import { api } from "@/lib/api";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchCategories } from "@/store/slices/categorySlice";

type ProductFormData = {
  name: string;
  description: string;
  price: number | null;
  discount: number | null;
  category_id: string;
  is_active: boolean;
  variants: Variant[];
  images: { url: string; is_primary: boolean }[] | null;
};

const defaultValues: ProductFormData = {
  name: "",
  description: "",
  price: null,
  discount: null,
  category_id: "",
  is_active: true,
  variants: [],
  images: null,
};

export default function AddProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("id");
  const isEditMode = Boolean(productId);

  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) =>
    state.categories.items.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    defaultValues,
    mode: "onBlur",
  });

  // Fetch categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch product when editing
  useEffect(() => {
    if (!productId) return;

    async function getProduct() {
      try {
        const product = await api.get<ProductFormData>(
          `/products/${productId}`,
        );

        reset({
          name: product.name ?? "",
          description: product.description ?? "",
          price: product.price ?? null,
          discount: product.discount ?? null,
          category_id: product.category_id ?? "",
          is_active: product.is_active ?? true,
          variants: product.variants ?? [],
          images: product.images ?? null,
        });
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }

    getProduct();
  }, [productId, reset]);

  async function onSubmit(data: ProductFormData) {
    try {
      if (isEditMode && productId) {
        await api.put(`/products/${productId}`, data);
      } else {
        await api.post("/products", data);
      }

      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-5 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full p-2 text-foreground transition-colors hover:bg-muted"
          >
            <span className="material-symbols-outlined text-xl leading-none">
              arrow_forward
            </span>
          </button>

          <h1 className="text-base font-bold text-foreground">
            {isEditMode ? "ویرایش محصول" : "افزودن محصول جدید"}
          </h1>
        </div>

        {/* Desktop actions */}
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-border px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-secondary px-5 py-2 text-sm font-semibold text-secondary-foreground transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          >
            {isSubmitting
              ? "در حال ذخیره..."
              : isEditMode
                ? "ذخیره تغییرات"
                : "ثبت محصول"}
          </button>
        </div>
      </header>

      {/* Form */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 p-5 lg:grid-cols-12">
        {/* Left */}
        <div className="flex flex-col gap-5 lg:col-span-8">
          <InputCard title="اطلاعات عمومی">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <FormInput
                  label="نام محصول"
                  placeholder="مثال: کفش دویدن نایکی"
                  {...register("name", {
                    required: "نام محصول الزامی است.",
                  })}
                  error={errors.name?.message}
                />
              </div>

              <FormSelect
                label="دسته بندی"
                options={categories}
                {...register("category_id", {
                  required: "دسته بندی را انتخاب کنید.",
                })}
                error={errors.category_id?.message}
              />
            </div>
          </InputCard>

          <InputCard title="قیمت">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormInput
                label="قیمت واحد"
                type="text"
                dir="ltr"
                placeholder="0"
                suffix="تومان"
                {...register("price", {
                  required: "قیمت الزامی است.",
                  valueAsNumber: true,
                })}
                error={errors.price?.message}
              />

              <FormInput
                label="تخفیف"
                type="number"
                dir="ltr"
                placeholder="0"
                suffix="%"
                {...register("discount", {
                  valueAsNumber: true,
                })}
                error={errors.discount?.message}
              />
            </div>
          </InputCard>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-5 lg:col-span-4">
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <ImageUpload value={field.value} onChange={field.onChange} />
            )}
          />

          <Controller
            name="variants"
            control={control}
            rules={{
              validate: (value) =>
                value.length > 0 || "حداقل یک ترکیب اضافه کنید.",
            }}
            render={({ field }) => (
              <div>
                <AttributesPicker
                  variants={field.value}
                  onChange={field.onChange}
                />

                {errors.variants?.message && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.variants.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Description */}
        <div className="lg:col-span-12">
          <InputCard title="توضیحات محصول">
            <FormTextarea
              label=""
              rows={6}
              placeholder="ویژگی‌ها، جنس، کاربرد..."
              {...register("description")}
              error={errors.description?.message}
            />
          </InputCard>
        </div>
      </div>

      {/* Mobile actions */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-3 border-t border-border bg-card px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-foreground"
        >
          انصراف
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-[2] rounded-xl bg-secondary py-3 text-sm font-semibold text-secondary-foreground disabled:opacity-50"
        >
          {isSubmitting
            ? "در حال ذخیره..."
            : isEditMode
              ? "ذخیره تغییرات"
              : "ثبت محصول"}
        </button>
      </div>
    </form>
  );
}
