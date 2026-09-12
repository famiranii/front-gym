// components/CopyButton.tsx
"use client";

export function CopyButton({ value }: { value: string }) {
  const copy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value).catch(console.error);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      <span className="material-symbols-outlined text-[18px]">
        content_copy
      </span>
    </button>
  );
}
