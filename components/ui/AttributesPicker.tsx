"use client";

import { useState } from "react";
import {  COLORS } from "@/types/product";

export type Variant = {
  label: string;
  color: string;
  stock: number;
};

interface Props {
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
}

export default function AttributesPicker({ variants, onChange }: Props) {
  const [label, setLabel] = useState("");
  const [color, setColor] = useState<string>(COLORS[0].value);
  const [stock, setStock] = useState(1);

  const addVariant = () => {
    const exists = variants.find((v) => v.label === label && v.color === color);
    if (exists) return;
    onChange([...variants, { label, color, stock }]);
  };

  const removeVariant = (index: number) => {
    onChange(variants.filter((_, i) => i !== index));
  };

  return (
    <section className="bg-card rounded-2xl p-5 border border-border shadow-sm flex flex-col gap-4">
      <h2 className="text-sm font-bold text-foreground border-b border-border pb-3">
        ویژگی‌ها
      </h2>

      {/* Add variant */}
      <div className="flex flex-col gap-3">
        {/* Size */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-muted-foreground">
            سایز
          </label>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="مثال: XL یا 42"
              className="w-full px-3 py-2 rounded-xl border border-border bg-muted text-sm"
              dir="ltr"
            />
          </div>
        </div>

        {/* Color */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-muted-foreground">
            رنگ
          </label>
          <div className="flex flex-wrap gap-3">
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                aria-label={c.label}
                onClick={() => setColor(c.value)}
                style={{ backgroundColor: c.value }}
                className={[
                  "w-8 h-8 rounded-full transition-all",
                  c.value === "#FFFFFF" || c.value === "#F5F5DC"
                    ? "border border-border"
                    : "",
                  color === c.value
                    ? "ring-2 ring-offset-2 ring-accent scale-110"
                    : "hover:scale-110",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        {/* Stock */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-muted-foreground">
            موجودی
          </label>
          <input
            type="number"
            min={0}
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-border bg-muted text-sm text-left"
            dir="ltr"
          />
        </div>

        <button
          type="button"
          onClick={addVariant}
          className="w-full py-2 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          + افزودن ترکیب
        </button>
      </div>

      {/* Variant list */}
      {variants.length > 0 && (
        <div className="flex flex-col gap-2">
          {variants.map((v, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-muted border border-border"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full border border-border"
                  style={{ backgroundColor: v.color }}
                />
                <span className="text-sm font-semibold">{v.label}</span>
                <span className="text-xs text-muted-foreground">
                  موجودی: {v.stock}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeVariant(i)}
                className="text-destructive hover:opacity-70 transition-opacity"
              >
                <span className="material-symbols-outlined text-sm leading-none">
                  close
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
