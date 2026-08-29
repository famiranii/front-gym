"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import ImageUpload from "@/components/ui/ImageUpload";
import AttributesPicker, { Variant } from "@/components/ui/AttributesPicker";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import FormTextarea from "@/components/ui/FormTextarea";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useEffect } from "react";
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

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-card rounded-2xl p-5 border border-border shadow-sm flex flex-col gap-4 animate-fade-in-up">
      <h2 className="text-sm font-bold text-foreground border-b border-border pb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function AddProductForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) =>
    state.categories.items.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  );
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({ defaultValues, mode: "onBlur" });

  const onSubmit = async (data: ProductFormData) => {
    await api.post("/products", data);
    router.push("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <header className="flex items-center justify-between px-5 py-3.5 sticky top-0 bg-background/80 backdrop-blur-md z-30 border-b border-border">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
          >
            <span className="material-symbols-outlined text-xl leading-none">
              arrow_forward
            </span>
          </button>
          <h1 className="text-base font-bold text-foreground">
            افزودن محصول جدید
          </h1>
        </div>

        <div className="hidden md:flex gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2 rounded-xl border border-border text-foreground hover:bg-muted transition-colors text-sm font-semibold"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 rounded-xl bg-secondary text-secondary-foreground hover:opacity-90 active:scale-95 transition-all text-sm font-semibold disabled:opacity-50"
          >
            {isSubmitting ? "در حال ثبت..." : "ثبت محصول"}
          </button>
        </div>
      </header>

      <div className="p-5 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 flex flex-col gap-5">
          <Card title="اطلاعات عمومی">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <FormInput
                  label="نام محصول"
                  placeholder="مثال: کفش دویدن نایکی"
                  {...register("name", { required: "نام محصول الزامی است." })}
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
          </Card>

          <Card title="قیمت">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {...register("discount", { valueAsNumber: true })}
                error={errors.discount?.message}
              />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-5">
          <Controller
            name="images"
            control={control}
            render={({ field }) => <ImageUpload onChange={field.onChange} />}
          />{" "}
          <Controller
            name="variants"
            control={control}
            rules={{
              validate: (v) => v.length > 0 || "حداقل یک ترکیب اضافه کنید.",
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

        <div className="lg:col-span-12">
          <Card title="توضیحات محصول">
            <FormTextarea
              label=""
              rows={6}
              placeholder="ویژگی‌ها، جنس، کاربرد..."
              {...register("description")}
              error={errors.description?.message}
            />
          </Card>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex gap-3 z-40">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 py-3 rounded-xl border border-border text-foreground text-sm font-semibold"
        >
          انصراف
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-[2] py-3 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "در حال ثبت..." : "ثبت محصول"}
        </button>
      </div>
    </form>
  );
}
