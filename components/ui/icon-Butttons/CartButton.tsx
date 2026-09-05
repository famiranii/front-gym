import Link from "next/link";

export default function CartButton({ count }: { count: number }) {
  return (
    <Link
      href="/cart"
      className="relative w-9 h-9 flex items-center justify-center rounded-md border border-border bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
    >
      <span className="material-symbols-outlined text-[18px]">
        shopping_bag
      </span>
      {count > 0 && (
        <span className="absolute -top-1.5 -left-1.5 min-w-[16px] h-4 bg-destructive text-destructive-foreground text-[10px] font-semibold rounded-full flex items-center justify-center px-1 border-2 border-card">
          {count}
        </span>
      )}
    </Link>
  );
}
