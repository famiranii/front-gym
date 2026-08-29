import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-5">
      <div className="flex flex-col items-center text-center gap-8 max-w-md w-full animate-fade-in-up">

        {/* Big 404 */}
        <div className="relative select-none">
          <span
            className="text-[clamp(7rem,30vw,11rem)] font-extrabold leading-none tracking-tighter text-muted"
            aria-hidden="true"
          >
            ۴۰۴
          </span>
          {/* floating dumbbell icon centered over the number */}
          <span
            className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-[clamp(3rem,12vw,5rem)] text-accent"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            fitness_center
          </span>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-extrabold text-foreground">
            این صفحه وجود ندارد
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            شاید آدرس اشتباه وارد کردید یا محصول حذف شده.
            <br />
            برگردید و دوباره امتحان کنید.
          </p>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-border" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-secondary text-secondary-foreground text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-base leading-none">home</span>
            صفحه اصلی
          </Link>
          <Link
            href="/products"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-border text-foreground text-sm font-bold hover:bg-muted transition-all"
          >
            <span className="material-symbols-outlined text-base leading-none">storefront</span>
            محصولات
          </Link>
        </div>

      </div>
    </main>
  );
}
