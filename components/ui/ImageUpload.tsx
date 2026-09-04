"use client";

import { useRef, useState } from "react";

import { api } from "@/lib/api";

type ProductImage = {
  url: string;
  is_primary: boolean;
};

interface SlotProps {
  isMain?: boolean;
  image: string | null;
  onChange: (value: string | null) => void;
}

function Slot({ isMain = false, image, onChange }: SlotProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const remove = (e: React.MouseEvent) => {
    e.stopPropagation();

    onChange(null);

    if (ref.current) {
      ref.current.value = "";
    }
  };

  const base =
    "relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted transition-all hover:border-accent hover:bg-primary/30 group";

  return (
    <div
      onClick={() => ref.current?.click()}
      className={isMain ? `${base} w-full` : base}
    >
      {loading ? (
        <span className="material-symbols-outlined animate-spin text-muted-foreground">
          progress_activity
        </span>
      ) : image ? (
        <>
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
            alt="تصویر محصول"
            className="h-full w-full object-cover"
          />

          <button
            type="button"
            onClick={remove}
            className="absolute left-1.5 top-1.5 z-10 rounded-full bg-destructive p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
          >
            <span className="material-symbols-outlined text-sm leading-none">
              close
            </span>
          </button>
        </>
      ) : isMain ? (
        <div className="flex flex-col items-center gap-2 text-muted-foreground transition-colors group-hover:text-accent">
          <span className="material-symbols-outlined text-4xl">
            add_photo_alternate
          </span>

          <span className="text-sm font-semibold">آپلود تصویر اصلی</span>

          <span className="text-xs text-neutral">PNG, JPG تا ۵ مگابایت</span>
        </div>
      ) : (
        <span className="material-symbols-outlined text-xl text-neutral">
          add
        </span>
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

interface ImageUploadProps {
  value?: ProductImage[] | null;
  onChange: (images: ProductImage[]) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  /*
   * value مستقیماً از react-hook-form میاد.
   * بنابراین state جدا برای main/gallery لازم نیست.
   */

  const main = value?.find((image) => image.is_primary)?.url ?? null;

  const gallery =
    value?.filter((image) => !image.is_primary).map((image) => image.url) ?? [];

  const updateMain = (url: string | null) => {
    const nextImages = [
      ...(url
        ? [
            {
              url,
              is_primary: true,
            },
          ]
        : []),

      ...gallery.map((image) => ({
        url: image,
        is_primary: false,
      })),
    ];

    onChange(nextImages);
  };

  const updateGallery = (index: number, url: string | null) => {
    const nextGallery = [...gallery];

    if (url) {
      nextGallery[index] = url;
    } else {
      nextGallery.splice(index, 1);
    }

    const nextImages: ProductImage[] = [];

    if (main) {
      nextImages.push({
        url: main,
        is_primary: true,
      });
    }

    nextGallery.forEach((image) => {
      if (image) {
        nextImages.push({
          url: image,
          is_primary: false,
        });
      }
    });

    onChange(nextImages);
  };

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-sm font-bold text-foreground">تصاویر محصول</h2>

        <span className="text-xs text-muted-foreground">حداکثر ۵ تصویر</span>
      </div>

      <Slot isMain image={main} onChange={updateMain} />

      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((index) => (
          <Slot
            key={index}
            image={gallery[index] ?? null}
            onChange={(url) => updateGallery(index, url)}
          />
        ))}
      </div>
    </section>
  );
}
