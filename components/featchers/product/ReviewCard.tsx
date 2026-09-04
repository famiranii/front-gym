"use client";

import { api } from "@/lib/api";
import { ReviewType } from "@/types/reviewsType";

export default function ReviewCard({
  review,
  onDelete,
}: {
  review: ReviewType;
  onDelete?: (id: number) => void;
}) {
  async function handleDelete() {
    const confirmed = window.confirm("آیا از حذف این نظر مطمئن هستید؟");

    if (!confirmed) return;

    try {
      const res = await api.delete(
        `/products/${review.product_id}/reviews?user_id=${review.user_id}`,
      );
      console.log(res);
      // فقط بعد از موفقیت API، UI را تغییر بده
      onDelete?.(review.id);
    } catch (error) {
      console.error(error);
      alert("حذف نظر با خطا مواجه شد.");
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

        <button
          type="button"
          onClick={handleDelete}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          aria-label="حذف نظر"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {review.body}
      </p>
    </div>
  );
}
