"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import { useParams } from "next/navigation";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Link from "next/link";
import { api } from "@/lib/api";
import { ReviewType } from "@/types/reviewsType";

export default function ReviewForm({
  onClose,
  onSuccess,
  onAddReview,
}: {
  onClose: () => void;
  onSuccess?: () => void;
  onAddReview: (review: ReviewType) => void;
}) {
  const params = useParams();
  const productId = params.slug;
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("id");
  const currentPath = window.location.pathname + window.location.search;

  if (!token) {
    return (
      <Link href={`/login?redirect=${encodeURIComponent(currentPath)}`}>
        <PrimaryButton>باید وارد شوید</PrimaryButton>
      </Link>
    );
  }

  const handleSubmit = async () => {
    if (!rating || !body.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res: ReviewType = await api.post(`/products/${productId}/reviews`, {
        user_id,
        rating,
        body,
      });
      onAddReview(res);
      setSubmitted(true);
      onSuccess?.();
    } catch (e: unknown) {
      setError("error");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <span className="material-symbols-outlined text-4xl text-success">
          check_circle
        </span>
        <p className="font-bold text-foreground">نظر شما ثبت شد</p>
        <button
          onClick={onClose}
          className="mt-2 text-sm font-semibold text-accent hover:underline"
        >
          بستن
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full bg-background rounded-xl border border-input focus:border-ring focus:ring-2 focus:ring-ring/20 text-foreground px-4 py-2.5 text-sm transition-all outline-none placeholder:text-muted-foreground";

  return (
    <div className="flex flex-col gap-4 p-4 rounded-2xl bg-muted/40 border border-border animate-fade-in-up">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground">
          امتیاز شما
        </label>
        <StarRating
          rating={rating}
          size="lg"
          interactive
          onChange={setRating}
        />
        {rating > 0 && (
          <span className="text-xs text-muted-foreground">
            {["", "خیلی بد", "بد", "متوسط", "خوب", "عالی"][rating]}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground">
          متن نظر <span className="text-destructive">*</span>
        </label>
        <textarea
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="تجربه خود را با دیگران به اشتراک بگذارید..."
          className={`${inputCls} resize-none`}
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={!rating || !body.trim() || loading}
          className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground text-sm font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "در حال ارسال..." : "ارسال نظر"}
        </button>
        <button
          onClick={onClose}
          className="px-4 py-3 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
        >
          انصراف
        </button>
      </div>
    </div>
  );
}
