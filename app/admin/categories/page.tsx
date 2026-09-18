"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";

import SingleImageUpload from "@/components/ui/SingleImageUpload";
import ConfirmModal from "@/components/ui/ConfirmModal";

import { Category } from "@/types/category";
import { toast } from "sonner";
import { getImageUrl } from "@/lib/getImageUrl";

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

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CategoryFormData>(defaultForm);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await api.get<Category[]>("/categories");
        setCategories(data);
      } catch {
        toast.error("خطا در دریافت دسته‌بندی‌ها");
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
      const res = await api.post<Category>("/categories", {
        name: form.name,
        ...(form.parent_id ? { parent_id: form.parent_id } : {}),
        ...(form.image_url ? { image_url: form.image_url } : {}),
      });

      setCategories((prev) => [...prev, res]);

      setForm(defaultForm);
      setShowForm(false);
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        err.message === "category name already exists"
      ) {
        setError("این دسته‌بندی تکراری می‌باشد");
      } else {
        setError("خطا در ایجاد دسته‌بندی");
      }
    } finally {
      setSubmitting(false);
    }
  }

  function openDeleteModal(category: Category) {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
    setError("");
  }

  function closeDeleteModal() {
    if (deletingId) return;

    setDeleteModalOpen(false);
    setCategoryToDelete(null);
  }

  async function handleDelete() {
    if (!categoryToDelete) return;

    const id = categoryToDelete.id;

    setDeletingId(id);
    setError("");

    try {
      await api.delete(`/categories/${id}`);

      setCategories((prev) => prev.filter((c) => c.id !== id));

      setDeleteModalOpen(false);
      setCategoryToDelete(null);
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

      {/* Error */}
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
                  setForm((p) => ({
                    ...p,
                    name: e.target.value,
                  }))
                }
                placeholder="مثال: فوتبال"
                className="rounded-xl border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
            </div>

            {/* Image */}
            <div className="flex w-100 flex-col gap-1.5 md:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">
                تصویر دسته‌بندی
              </label>

              <SingleImageUpload
                value={form.image_url || null}
                onChange={(url) =>
                  setForm((p) => ({
                    ...p,
                    image_url: url ?? "",
                  }))
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
                  src={getImageUrl(cat.image_url)}
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
                type="button"
                onClick={() => openDeleteModal(cat)}
                disabled={deletingId === cat.id}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                aria-label={`حذف ${cat.name}`}
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={deleteModalOpen}
        title="حذف دسته‌بندی"
        description="آیا از حذف این دسته‌بندی مطمئن هستید؟ این عملیات قابل بازگشت نیست."
        confirmText="حذف"
        cancelText="انصراف"
        variant="danger"
        icon="delete"
        loading={deletingId !== null}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      >
        {categoryToDelete && (
          <div className="rounded-xl bg-muted px-4 py-3">
            <span className="font-semibold">{categoryToDelete.name}</span>
          </div>
        )}
      </ConfirmModal>
    </div>
  );
}
