import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "قوانین ارسال",
  description: "اطلاعات مربوط به ارسال سفارش‌ها در فروشگاه چهلتیکه",
};

const sections = [
  {
    icon: "local_shipping",
    title: "پردازش سفارش",
    text: "پس از ثبت سفارش، اطلاعات آن بررسی و مراحل آماده‌سازی و ارسال انجام می‌شود. وضعیت سفارش از طریق حساب کاربری قابل پیگیری خواهد بود.",
  },
  {
    icon: "location_on",
    title: "آدرس تحویل",
    text: "مسئولیت ثبت صحیح اطلاعات مقصد هنگام ثبت سفارش بر عهده خریدار است. در صورت نیاز به اصلاح اطلاعات، بهتر است پیش از ارسال سفارش با پشتیبانی تماس بگیرید.",
  },
  {
    icon: "payments",
    title: "هزینه ارسال",
    text: "هزینه ارسال، در صورت وجود، هنگام ثبت سفارش و پیش از نهایی کردن خرید به شما نمایش داده می‌شود.",
  },
  {
    icon: "package_2",
    title: "تحویل سفارش",
    text: "سفارش به آدرس ثبت‌شده ارسال می‌شود. هنگام دریافت، در صورت مشاهده آسیب ظاهری جدی در بسته‌بندی یا کالا، موضوع را در اولین فرصت به پشتیبانی اطلاع دهید.",
  },
  {
    icon: "support_agent",
    title: "پیگیری ارسال",
    text: "اگر درباره وضعیت سفارش یا ارسال آن سؤالی دارید، می‌توانید با پشتیبانی چهلتیکه تماس بگیرید تا اطلاعات سفارش بررسی شود.",
  },
];

export default function ShippingPolicyPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-background">
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <span className="material-symbols-outlined text-lg">
              local_shipping
            </span>
            قوانین ارسال
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            شرایط ارسال سفارش
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base">
            در این صفحه اطلاعات کلی مربوط به آماده‌سازی، ثبت آدرس و ارسال
            سفارش‌های چهلتیکه را مشاهده می‌کنید.
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
            نکته مهم
          </h2>

          <p className="text-sm leading-8 text-muted-foreground">
            اطلاعات مربوط به هزینه و وضعیت سفارش در فرایند خرید و حساب کاربری
            نمایش داده می‌شود. برای اطلاع از وضعیت یک سفارش مشخص، اطلاعات همان
            سفارش ملاک بررسی خواهد بود.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <span className="material-symbols-outlined text-lg">
              receipt_long
            </span>
            سفارش‌های من
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold text-card-foreground transition-colors hover:bg-secondary"
          >
            تماس با ما
          </Link>
        </div>
      </section>
    </main>
  );
}
