"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ImageUpload from "@/components/ui/ImageUpload";
import FormInput from "@/components/ui/FormInput";
import { api } from "@/lib/api";
import SingleImageUpload from "@/components/ui/SingleImageUpload";
import { toast } from "sonner";
import { getImageUrl } from "@/lib/getImageUrl";

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  button_text: string;
  button_url: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
};

type BannerForm = {
  title: string;
  subtitle: string;
  button_text: string;
  button_url: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
};

export default function SettingPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BannerForm>({
    defaultValues: {
      title: "",
      subtitle: "",
      button_text: "",
      button_url: "",
      image_url: "",
      is_active: true,
      sort_order: 0,
    },
  });

  useEffect(() => {
    api.get<Banner[]>("/banners").then((data) => {
      setBanners(data);
      setLoading(false);
    });
  }, []);

  const onSubmit = async (data: BannerForm) => {
    if (!data.image_url) return alert("تصویر بنر الزامی است");
    setSubmitting(true);
    try {
      const banner = await api.post<Banner>("/banners", data);
      setBanners((prev) => [...prev, banner]);
      toast.success("با موفقیت اضافه شد")
      reset();
    } catch {
      toast.error("خطا در ثبت بنر");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteBanner = async (id: string) => {
    await api.delete(`/banners/${id}`);
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="p-5 max-w-4xl mx-auto flex flex-col gap-8">
      <h1 className="text-lg font-bold text-foreground">تنظیمات</h1>

      {/* بنرها */}
      <section className="bg-card rounded-2xl border border-border p-5 shadow-sm flex flex-col gap-5">
        <h2 className="text-sm font-bold text-foreground border-b border-border pb-3">
          مدیریت بنرها
        </h2>

        {/* فرم اضافه کردن */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            name="image_url"
            control={control}
            render={({ field }) => (
              <SingleImageUpload
                value={field.value || null}
                onChange={(url) => field.onChange(url ?? "")}
              />
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="عنوان"
              placeholder="مثال: کالکشن زمستان"
              {...register("title")}
            />
            <FormInput
              label="زیرعنوان"
              placeholder="توضیح کوتاه"
              {...register("subtitle")}
            />
            <FormInput
              label="متن دکمه"
              placeholder="مثال: مشاهده محصولات"
              {...register("button_text")}
            />
            <FormInput
              label="لینک دکمه"
              placeholder="/products"
              {...register("button_url")}
              dir="ltr"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              {...register("is_active")}
              className="w-4 h-4"
            />
            <label htmlFor="is_active" className="text-sm text-foreground">
              فعال
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="self-end px-6 py-2 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "در حال ثبت..." : "افزودن بنر"}
          </button>
        </form>

        {/* لیست بنرها */}
        {loading ? (
          <p className="text-sm text-muted-foreground">در حال بارگذاری...</p>
        ) : banners.length === 0 ? (
          <p className="text-sm text-muted-foreground">بنری ثبت نشده</p>
        ) : (
          <div className="flex flex-col gap-3">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="flex items-center gap-4 p-3 rounded-xl border border-border bg-muted"
              >
                <img
                  src={getImageUrl(banner.image_url)}
                  alt={banner.title}
                  className="w-20 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {banner.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {banner.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => deleteBanner(banner.id)}
                  className="text-destructive hover:opacity-70 transition-opacity"
                >
                  <span className="material-symbols-outlined text-sm">
                    delete
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
