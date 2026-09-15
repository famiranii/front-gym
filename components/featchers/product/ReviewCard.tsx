"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useAppSelector } from "@/store/hook";
import { ReviewType } from "@/types/reviewsType";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function ReviewCard({
  review,
  onDelete,
}: {
  review: ReviewType;
  onDelete?: (id: number) => void;
}) {
  const userId = useAppSelector((state) => state.users.me?.id);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    try {
      setDeleting(true);

      const res = await api.delete(
        `/products/${review.product_id}/reviews?user_id=${review.user_id}`,
      );
      console.log(res);
      // فقط بعد از موفقیت API، UI را تغییر بده
      onDelete?.(review.id);
      setConfirmOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  }

  const formattedDate = new Intl.DateTimeFormat("fa-IR", {
    calendar: "persian",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(review.created_at));

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border bg-muted/40 p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-sm font-bold text-foreground">
            {review.full_name}
          </span>

          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>

        {review.user_id === userId && (
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            aria-label="حذف نظر"
          >
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </button>
        )}
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {review.body}
      </p>

      <ConfirmModal
        open={confirmOpen}
        variant="danger"
        icon="delete"
        title="حذف نظر"
        description="آیا از حذف این نظر مطمئن هستید؟"
        confirmText="حذف"
        cancelText="انصراف"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
