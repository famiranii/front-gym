"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ui/ImageUpload";
import AttributesPicker from "@/components/ui/AttributesPicker";
import { ProductFormData , CATEGORIES ,BRANDS } from "@/types/product";

const initialForm: ProductFormData = {
  name: "",
  category: "",
  brand: "",
  price: "",
  discount: "",
  sku: "",
  stock: "",
  description: "",
  selectedSizes: ["40"],
  selectedColors: ["#1A1A1A"],
};

// Shared input className
const inputCls =
  "w-full bg-background rounded-xl border border-input focus:border-ring focus:ring-2 focus:ring-ring/20 text-foreground px-4 py-2.5 text-sm transition-all outline-none placeholder:text-muted-foreground";

const selectCls =
  "w-full bg-background rounded-xl border border-input focus:border-ring focus:ring-2 focus:ring-ring/20 text-foreground px-4 py-2.5 text-sm appearance-none transition-all outline-none";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <label className="text-xs font-semibold text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

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
  const [form, setForm] = useState<ProductFormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof ProductFormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleSize = (size: string) =>
    setForm((prev) => ({
      ...prev,
      selectedSizes: prev.selectedSizes.includes(size)
        ? prev.selectedSizes.filter((s) => s !== size)
        : [...prev.selectedSizes, size],
    }));

  const toggleColor = (color: string) =>
    setForm((prev) => ({
      ...prev,
      selectedColors: prev.selectedColors.includes(color)
        ? prev.selectedColors.filter((c) => c !== color)
        : [...prev.selectedColors, color],
    }));

  const handleSubmit = async () => {
    setSubmitting(true);
    // TODO: POST to /api/products
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    router.push("/admin/products");
  };

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────── */}
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
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="px-5 py-2 rounded-xl bg-secondary text-secondary-foreground hover:opacity-90 active:scale-95 transition-all text-sm font-semibold disabled:opacity-50"
          >
            {submitting ? "در حال ثبت..." : "ثبت محصول"}
          </button>
        </div>
      </header>

      {/* ── Grid ────────────────────────────────────────────────── */}
      <div className="p-5 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left (8 col) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <Card title="اطلاعات عمومی">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="نام محصول" className="md:col-span-2">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="مثال: کفش دویدن نایکی مدل Air Zoom"
                  className={inputCls}
                />
              </Field>

              <Field label="دسته بندی">
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    className={selectCls}
                  >
                    <option value="">انتخاب کنید...</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-lg">
                    expand_more
                  </span>
                </div>
              </Field>

              <Field label="برند">
                <div className="relative">
                  <select
                    value={form.brand}
                    onChange={(e) => set("brand", e.target.value)}
                    className={selectCls}
                  >
                    <option value="">انتخاب کنید...</option>
                    {BRANDS.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-lg">
                    expand_more
                  </span>
                </div>
              </Field>
            </div>
          </Card>

          <Card title="قیمت و موجودی">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="قیمت واحد">
                <div className="relative">
                  <input
                    type="number"
                    dir="ltr"
                    value={form.price}
                    onChange={(e) => set("price", e.target.value)}
                    placeholder="0"
                    className={`${inputCls} pl-14 text-left`}
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground pointer-events-none">
                    تومان
                  </span>
                </div>
              </Field>

              <Field label="تخفیف">
                <div className="relative">
                  <input
                    type="number"
                    dir="ltr"
                    value={form.discount}
                    onChange={(e) => set("discount", e.target.value)}
                    placeholder="0"
                    className={`${inputCls} pl-8 text-left`}
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground pointer-events-none">
                    %
                  </span>
                </div>
              </Field>

              <Field label="شناسه کالا (SKU)">
                <input
                  type="text"
                  dir="ltr"
                  value={form.sku}
                  onChange={(e) => set("sku", e.target.value)}
                  placeholder="NK-R-1204"
                  className={`${inputCls} text-left`}
                />
              </Field>

              <Field label="موجودی انبار">
                <input
                  type="number"
                  dir="ltr"
                  value={form.stock}
                  onChange={(e) => set("stock", e.target.value)}
                  placeholder="0"
                  className={`${inputCls} text-left`}
                />
              </Field>
            </div>
          </Card>
        </div>

        {/* Right (4 col) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <ImageUpload />
          <AttributesPicker
            selectedSizes={form.selectedSizes}
            selectedColors={form.selectedColors}
            onSizeToggle={toggleSize}
            onColorToggle={toggleColor}
          />
        </div>

        {/* Description — full width */}
        <div className="lg:col-span-12">
          <Card title="توضیحات محصول">
            <div className="flex flex-col">
              {/* Toolbar */}
              <div className="flex items-center gap-1 px-2 py-1.5 bg-muted rounded-t-xl border border-border border-b-0">
                {["format_bold", "format_italic"].map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm leading-none">
                      {icon}
                    </span>
                  </button>
                ))}
                <div className="w-px h-4 bg-border mx-1" />
                {["format_list_bulleted", "format_list_numbered"].map(
                  (icon) => (
                    <button
                      key={icon}
                      type="button"
                      className="p-1.5 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm leading-none">
                        {icon}
                      </span>
                    </button>
                  ),
                )}
              </div>
              <textarea
                rows={6}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="ویژگی‌ها، جنس، کاربرد و سایر توضیحات محصول را اینجا بنویسید..."
                className="w-full bg-background rounded-b-xl border border-border focus:border-ring focus:ring-2 focus:ring-ring/20 text-foreground px-4 py-3 text-sm transition-all outline-none resize-y placeholder:text-muted-foreground"
              />
            </div>
          </Card>
        </div>
      </div>

      {/* ── Mobile action bar ───────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex gap-3 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] z-40">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 py-3 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors"
        >
          انصراف
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="flex-[2] py-3 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
        >
          {submitting ? "در حال ثبت..." : "ثبت محصول"}
        </button>
      </div>
    </>
  );
}
