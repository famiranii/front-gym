"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface SlotProps {
  isMain?: boolean;
  image: string | null;
  onChange: (v: string | null) => void;
}

function Slot({ isMain = false, image, onChange }: SlotProps) {
  const ref = useRef<HTMLInputElement>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  const remove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (ref.current) ref.current.value = "";
  };

  const base =
    "relative bg-muted border-2 border-dashed border-border rounded-xl flex items-center justify-center cursor-pointer hover:border-accent hover:bg-primary/30 transition-all group overflow-hidden";

  return (
    <div
      onClick={() => ref.current?.click()}
      className={isMain ? `${base} w-full aspect-square` : `${base} aspect-square`}
    >
      {image ? (
        <>
          <Image src={image} alt="تصویر" fill className="object-cover" />
          <button
            onClick={remove}
            className="absolute top-1.5 left-1.5 bg-destructive text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <span className="material-symbols-outlined text-sm leading-none">close</span>
          </button>
        </>
      ) : isMain ? (
        <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-accent transition-colors">
          <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
          <span className="text-sm font-semibold">آپلود تصویر اصلی</span>
          <span className="text-xs text-neutral">PNG, JPG تا ۵ مگابایت</span>
        </div>
      ) : (
        <span className="material-symbols-outlined text-neutral text-xl">add</span>
      )}
      <input ref={ref} type="file" accept="image/*" onChange={onFile} className="hidden" />
    </div>
  );
}

export default function ImageUpload() {
  const [main, setMain] = useState<string | null>(null);
  const [gallery, setGallery] = useState<(string | null)[]>([null, null, null, null]);

  const updateGallery = (i: number, v: string | null) =>
    setGallery((prev) => prev.map((x, idx) => (idx === i ? v : x)));

  return (
    <section className="bg-card rounded-2xl p-5 border border-border shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-sm font-bold text-foreground">تصاویر محصول</h2>
        <span className="text-xs text-muted-foreground">حداکثر ۵ تصویر</span>
      </div>
      <Slot isMain image={main} onChange={setMain} />
      <div className="grid grid-cols-4 gap-2">
        {gallery.map((img, i) => (
          <Slot key={i} image={img} onChange={(v) => updateGallery(i, v)} />
        ))}
      </div>
    </section>
  );
}
