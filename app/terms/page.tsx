import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "قوانین و مقررات",
  description: "قوانین و شرایط استفاده از فروشگاه آنلاین چهلتیکه",
};

const sections = [
  {
    icon: "gavel",
    title: "پذیرش قوانین",
    text: "استفاده از وب‌سایت و ثبت سفارش در چهلتیکه به منزله پذیرش قوانین و شرایط استفاده از فروشگاه است. توصیه می‌شود پیش از ثبت سفارش این صفحه را مطالعه کنید.",
  },
  {
    icon: "shopping_bag",
    title: "ثبت سفارش",
    text: "کاربر مسئول صحت اطلاعاتی است که هنگام ایجاد حساب و ثبت سفارش وارد می‌کند. اطلاعات نادرست ممکن است باعث ایجاد مشکل در پردازش یا ارسال سفارش شود.",
  },
  {
    icon: "sell",
    title: "قیمت و موجودی",
    text: "قیمت، تخفیف و موجودی محصولات ممکن است تغییر کند. اطلاعات نمایش‌داده‌شده در زمان ثبت سفارش مبنای بررسی سفارش خواهد بود.",
  },
  {
    icon: "account_circle",
    title: "حساب کاربری",
    text: "کاربر مسئول حفظ امنیت اطلاعات ورود به حساب خود است و نباید اطلاعات دسترسی خود را در اختیار دیگران قرار دهد.",
  },
  {
    icon: "copyright",
    title: "محتوای وب‌سایت",
    text: "محتوای منتشرشده در وب‌سایت، از جمله متن‌ها، تصاویر، طراحی و سایر عناصر، متعلق به چهلتیکه یا صاحبان قانونی آن‌هاست و استفاده تجاری یا بازنشر آن‌ها بدون اجازه مجاز نیست.",
  },
  {
    icon: "update",
    title: "به‌روزرسانی قوانین",
    text: "ممکن است قوانین و شرایط استفاده با توجه به تغییر خدمات یا فرایندهای فروشگاه به‌روزرسانی شوند. نسخه جدید قوانین در همین صفحه منتشر خواهد شد.",
  },
];

export default function TermsPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-background">
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <span className="material-symbols-outlined text-lg">gavel</span>
            قوانین و مقررات
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            قوانین و شرایط استفاده
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base">
            این قوانین برای ایجاد یک فرایند شفاف و منظم در استفاده از خدمات و
            ثبت سفارش در فروشگاه چهلتیکه تهیه شده‌اند.
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
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary">
              info
            </span>

            <p className="text-sm leading-8 text-muted-foreground">
              در صورت وجود سؤال درباره قوانین خرید، سفارش یا خدمات فروشگاه،
              می‌توانید پیش از ثبت سفارش با پشتیبانی چهلتیکه در تماس باشید.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <span className="material-symbols-outlined text-lg">
              shopping_bag
            </span>
            مشاهده محصولات
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
