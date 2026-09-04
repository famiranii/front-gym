"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import SingleImageUpload from "@/components/ui/SingleImageUpload";
import { Category } from "@/types/category";

type CategoryFormData = {
  name: string;
  parent_id: string;
  image_url: string;
};

const defaultForm: CategoryFormData = {
  name: "",
  parent_id: "",
  image_url: "",
};

export default function CategoriesPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CategoryFormData>(defaultForm);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await api.get<Category[]>("/categories");
        setCategories(data);
      } catch {
        setError("خطا در دریافت دسته‌بندی‌ها");
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;

    setSubmitting(true);
    setError("");
    try {
      await api.post("/categories", {
        name: form.name,
        ...(form.parent_id ? { parent_id: form.parent_id } : {}),
        ...(form.image_url ? { image_url: form.image_url } : {}),
      });
      setForm(defaultForm);
      setShowForm(false);
    } catch {
      setError("خطا در ایجاد دسته‌بندی");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("خطا در حذف دسته‌بندی");
    } finally {
      setDeletingId(null);
    }
  }

  const parentName = (parentId: string | null) =>
    categories.find((c) => c.id === parentId)?.name ?? null;

  return (
    <div className="mx-auto max-w-4xl p-5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">دسته‌بندی‌ها</h1>
        <button
          onClick={() => {
            setShowForm((p) => !p);
            setForm(defaultForm);
            setError("");
          }}
          className="flex items-center gap-1.5 rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-all hover:opacity-90 active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">
            {showForm ? "close" : "add"}
          </span>
          {showForm ? "انصراف" : "دسته‌بندی جدید"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-2xl border border-border bg-card p-5"
        >
          <h2 className="mb-4 text-sm font-semibold text-foreground">
            افزودن دسته‌بندی
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                نام دسته‌بندی <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="مثال: فوتبال"
                className="rounded-xl border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
            </div>

            {/* Parent */}
            {/* <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                دسته‌بندی والد
              </label>
              <select
                value={form.parent_id}
                onChange={(e) =>
                  setForm((p) => ({ ...p, parent_id: e.target.value }))
                }
                className="rounded-xl border border-border bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              >
                <option value="">بدون والد</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Image URL */}
            <div className="flex flex-col gap-1.5 md:col-span-2 w-100">
              <label className="text-xs font-medium text-muted-foreground">
                تصویر دسته‌بندی
              </label>
              <SingleImageUpload
                value={form.image_url || null}
                onChange={(url) =>
                  setForm((p) => ({ ...p, image_url: url ?? "" }))
                }
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={submitting || !form.name.trim()}
              className="rounded-xl bg-secondary px-5 py-2 text-sm font-semibold text-secondary-foreground transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
              {submitting ? "در حال ذخیره..." : "ذخیره"}
            </button>
          </div>
        </form>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <span className="material-symbols-outlined animate-spin text-3xl">
            progress_activity
          </span>
        </div>
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
          <span className="material-symbols-outlined text-4xl">folder_off</span>
          <p className="text-sm">هیچ دسته‌بندی‌ای وجود ندارد</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-3"
            >
              {/* Image */}
              {cat.image_url ? (
                <img
                  src={apiUrl+ cat.image_url}
                  alt={cat.name}
                  className="h-10 w-10 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <span className="material-symbols-outlined text-[20px]">
                    folder
                  </span>
                </div>
              )}

              {/* Info */}
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold text-foreground">
                  {cat.name}
                </span>
                {parentName(cat.parent_id) && (
                  <span className="text-xs text-muted-foreground">
                    زیرمجموعه {parentName(cat.parent_id)}
                  </span>
                )}
              </div>

              {/* Delete */}
              <button
                onClick={() => handleDelete(cat.id)}
                disabled={deletingId === cat.id}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                aria-label="حذف"
              >
                {deletingId === cat.id ? (
                  <span className="material-symbols-outlined animate-spin text-[18px]">
                    progress_activity
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">
                    delete
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
