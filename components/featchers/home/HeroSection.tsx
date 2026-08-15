import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] bg-muted overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/woman.jpg"
          alt="Athletes in premium activewear"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end items-start p-6 md:p-12 md:w-2/3 lg:w-1/2 rtl text-right">
        <span className="text-sm text-tertiary bg-tertiary/10 px-3 py-1 rounded-full mb-4 inline-block">
          کالکشن جدید زمستان ۲۰۲۴
        </span>

        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          قدرت را با ظرافت <br /> تجربه کنید.
        </h1>

        <p className="text-base text-muted-foreground mb-8 max-w-md">
          جدیدترین تجهیزات ورزشی و لباس‌های حرفه‌ای برای ارتقای عملکرد شما.
          طراحی شده برای پیروزی، ساخته شده برای ماندگاری.
        </p>

        <button className="bg-secondary text-secondary-foreground text-sm font-medium px-8 py-4 rounded-xl hover:opacity-90 transition-all active:scale-95 duration-200 flex items-center gap-2">
          مشاهده محصولات
          <span className="material-symbols-outlined text-sm rotate-180">
            arrow_back
          </span>
        </button>
      </div>
    </section>
  );
}
