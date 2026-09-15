import { Vazirmatn } from "next/font/google";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "700", "900"],
});

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5">
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-border border-t-primary" />

          <span className="material-symbols-outlined text-[24px] text-primary">
            shopping_bag
          </span>
        </div>

        <h1
          className={`${vazir.className} text-2xl font-black tracking-tight text-gray-400`}
        >
          چهل<span className="text-[#FF9F0A]">تیکه</span>
        </h1>

        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            در حال بارگذاری
          </span>

          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
