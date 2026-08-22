"use client";

import { COLORS, SIZES } from "@/types/product";


interface Props {
  selectedSizes: string[];
  selectedColors: string[];
  onSizeToggle: (s: string) => void;
  onColorToggle: (c: string) => void;
}

export default function AttributesPicker({
  selectedSizes,
  selectedColors,
  onSizeToggle,
  onColorToggle,
}: Props) {
  return (
    <section className="bg-card rounded-2xl p-5 border border-border shadow-sm flex flex-col gap-4">
      <h2 className="text-sm font-bold text-foreground border-b border-border pb-3">ویژگی‌ها</h2>

      {/* Sizes */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-muted-foreground">سایز</label>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const active = selectedSizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => onSizeToggle(size)}
                className={[
                  "px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all",
                  active
                    ? "bg-secondary text-secondary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-neutral/30 hover:text-foreground border border-border",
                ].join(" ")}
              >
                {size}
              </button>
            );
          })}
          <button
            type="button"
            className="px-2.5 py-1.5 rounded-full border border-dashed border-border text-neutral hover:bg-muted transition-colors"
          >
            <span className="material-symbols-outlined text-sm leading-none">add</span>
          </button>
        </div>
      </div>

      {/* Colors */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-muted-foreground">رنگ</label>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => {
            const active = selectedColors.includes(color.value);
            return (
              <button
                key={color.value}
                type="button"
                aria-label={color.label}
                onClick={() => onColorToggle(color.value)}
                style={{ backgroundColor: color.value }}
                className={[
                  "w-8 h-8 rounded-full transition-all",
                  color.value === "#FFFFFF" || color.value === "#F5F5DC"
                    ? "border border-border"
                    : "",
                  active
                    ? "ring-2 ring-offset-2 ring-accent scale-110"
                    : "hover:scale-110",
                ].join(" ")}
              />
            );
          })}
          <button
            type="button"
            className="w-8 h-8 rounded-full border border-dashed border-border text-neutral flex items-center justify-center hover:bg-muted transition-colors"
          >
            <span className="material-symbols-outlined text-sm leading-none">add</span>
          </button>
        </div>
      </div>
    </section>
  );
}
