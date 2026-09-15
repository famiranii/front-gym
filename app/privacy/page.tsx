import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "حریم خصوصی",
  description: "سیاست حفظ حریم خصوصی کاربران در فروشگاه آنلاین چهلتیکه",
};

const sections = [
  {
    icon: "person",
    title: "اطلاعاتی که دریافت می‌کنیم",
    text: "برای ایجاد حساب کاربری و پردازش سفارش، ممکن است اطلاعاتی مانند نام، شماره تلفن، آدرس و اطلاعات مربوط به سفارش شما دریافت شود.",
  },
  {
    icon: "shopping_bag",
    title: "نحوه استفاده از اطلاعات",
    text: "اطلاعات شما برای مدیریت حساب کاربری، ثبت و پیگیری سفارش‌ها، ارسال کالا و ارائه پشتیبانی استفاده می‌شود.",
  },
  {
    icon: "lock",
    title: "حفاظت از اطلاعات",
    text: "ما تلاش می‌کنیم اطلاعات حساب و سفارش‌های شما را با استفاده از روش‌های مناسب فنی و امنیتی محافظت کنیم و دسترسی به اطلاعات را محدود نگه داریم.",
  },
  {
    icon: "visibility_off",
    title: "عدم فروش اطلاعات شخصی",
    text: "اطلاعات شخصی کاربران برای فروش یا واگذاری تجاری به اشخاص دیگر در اختیار دیگران قرار نمی‌گیرد، مگر در مواردی که برای انجام خدمات سفارش یا طبق الزامات قانونی لازم باشد.",
  },
  {
    icon: "support_agent",
    title: "پشتیبانی",
    text: "در صورت وجود سؤال یا نگرانی درباره اطلاعات شخصی خود، می‌توانید از طریق راه‌های ارتباطی چهلتیکه با ما در تماس باشید.",
  },
];

export default function PrivacyPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-background">
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <span className="material-symbols-outlined text-lg">shield</span>
            حریم خصوصی
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            حریم خصوصی کاربران
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base">
            حفظ حریم خصوصی و اطلاعات کاربران برای چهلتیکه اهمیت دارد. در این صفحه
            نحوه دریافت، استفاده و حفاظت از اطلاعات شما را توضیح داده‌ایم.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <div className="grid gap-4">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <span className="material-symbols-outlined">
                    {section.icon}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-card-foreground">
                  {section.title}
                </h2>
              </div>

              <p className="text-sm leading-8 text-muted-foreground">
                {section.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-secondary p-6">
          <h2 className="mb-3 text-lg font-bold text-secondary-foreground">
            تغییرات این سیاست
          </h2>

          <p className="text-sm leading-8 text-muted-foreground">
            ممکن است با تغییر خدمات یا روندهای فروشگاه، این سیاست به‌روزرسانی
            شود. نسخه جدید در همین صفحه منتشر خواهد شد.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <span className="material-symbols-outlined text-lg">
              support_agent
            </span>
            تماس با ما
          </Link>

          <Link
            href="/terms"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold text-card-foreground transition-colors hover:bg-secondary"
          >
            قوانین و مقررات
          </Link>
        </div>
      </section>
    </main>
  );
}
