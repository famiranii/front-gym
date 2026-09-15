import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "قوانین مرجوعی",
  description: "شرایط بررسی و مرجوعی سفارش‌ها در فروشگاه چهلتیکه",
};

const sections = [
  {
    icon: "fact_check",
    title: "درخواست بررسی",
    text: "اگر کالای دریافت‌شده با سفارش شما مغایرت دارد یا هنگام تحویل با مشکل یا آسیب‌دیدگی مواجه شده است، در اولین فرصت با پشتیبانی چهلتیکه تماس بگیرید تا موضوع بررسی شود.",
  },
  {
    icon: "inventory_2",
    title: "وضعیت کالا",
    text: "برای بررسی درخواست مرجوعی، وضعیت کالا و شرایط آن اهمیت دارد. تا حد امکان کالا را در شرایط اولیه خود نگه دارید و از استفاده، شست‌وشو یا ایجاد تغییر در آن خودداری کنید.",
  },
  {
    icon: "verified",
    title: "کالاهای دارای گارانتی",
    text: "تمامی محصولاتی که دارای گارانتی هستند، طبق شرایط و ضوابط گارانتی مربوطه قابل عودت یا تعویض می‌باشند.",
  },
  {
    icon: "photo_camera",
    title: "مستندات سفارش",
    text: "در صورت وجود مغایرت یا آسیب‌دیدگی، ممکن است برای بررسی دقیق‌تر، ارائه عکس یا اطلاعات سفارش از شما درخواست شود.",
  },
  {
    icon: "support_agent",
    title: "بررسی توسط پشتیبانی",
    text: "هر درخواست پس از دریافت اطلاعات لازم بررسی می‌شود و نتیجه و نحوه ادامه فرایند از طریق راه ارتباطی ثبت‌شده با شما هماهنگ خواهد شد.",
  },
  {
    icon: "payments",
    title: "بازگشت وجه",
    text: "در صورت تأیید مرجوعی و استحقاق بازگشت وجه، روند بازپرداخت پس از تکمیل فرایند بررسی و دریافت کالا انجام خواهد شد.",
  },
];
export default function ReturnPolicyPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-background">
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <span className="material-symbols-outlined text-lg">
              assignment_return
            </span>
            قوانین مرجوعی
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            شرایط مرجوعی کالا
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base">
            تلاش ما این است که سفارش شما بدون مشکل به دستتان برسد. اگر مشکلی در
            سفارش وجود داشت، می‌توانید برای بررسی موضوع با پشتیبانی چهلتیکه تماس
            بگیرید.
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

        <div className="mt-8 rounded-2xl border border-warning/30 bg-warning/5 p-6">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-warning">info</span>

            <p className="text-sm leading-8 text-muted-foreground">
              شرایط هر درخواست ممکن است با توجه به نوع کالا و وضعیت سفارش متفاوت
              باشد و پس از بررسی توسط پشتیبانی مشخص می‌شود.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <span className="material-symbols-outlined text-lg">
              support_agent
            </span>
            درخواست بررسی
          </Link>
        </div>
      </section>
    </main>
  );
}
