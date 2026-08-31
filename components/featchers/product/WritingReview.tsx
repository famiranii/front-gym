"use client";

import { useState } from "react";
import ReviewForm from "./ReviewForm";

export default function WritingReview() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => setShowForm((v) => !v)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border py-3 text-sm font-semibold text-muted-foreground transition-all hover:border-accent hover:text-accent"
      >
        <span className="material-symbols-outlined text-base leading-none">
          edit
        </span>

        {showForm ? "بستن فرم" : "ثبت نظر شما"}
      </button>

      {showForm && (
        <ReviewForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
