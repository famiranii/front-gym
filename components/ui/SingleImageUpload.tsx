"use client";

import { useRef, useState } from "react";
import { api } from "@/lib/api";

interface SingleImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export default function SingleImageUpload({
  value,
  onChange,
}: SingleImageUploadProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await api.post<{ url: string }>("/upload", formData);
      onChange(res.url);
    } catch {
      alert("آپلود تصویر ناموفق بود");
    } finally {
      setLoading(false);
    }
  }

  function remove(e: React.MouseEvent) {
    e.stopPropagation();
    onChange(null);
    if (ref.current) ref.current.value = "";
  }

  return (
    <div
      onClick={() => ref.current?.click()}
      className="relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted transition-all hover:border-primary hover:bg-primary/10 group"
    >
      {loading ? (
        <span className="material-symbols-outlined animate-spin text-muted-foreground">
          progress_activity
        </span>
      ) : value ? (
        <>
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${value}`}
            alt="تصویر دسته‌بندی"
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={remove}
            className="absolute left-2 top-2 z-10 rounded-full bg-destructive p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
          >
            <span className="material-symbols-outlined text-sm leading-none">
              close
            </span>
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground transition-colors group-hover:text-primary">
          <span className="material-symbols-outlined text-4xl">
            add_photo_alternate
          </span>
          <span className="text-sm font-semibold">آپلود تصویر</span>
          <span className="text-xs">PNG, JPG تا ۵ مگابایت</span>
        </div>
      )}

      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={onFile}
        className="hidden"
      />
    </div>
  );
}
