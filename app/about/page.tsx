import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "آشنایی با چهلتیکه، فروشگاه تخصصی تجهیزات ورزشی و راه‌های ارتباط با ما.",
};

const values = [
  {
    icon: "verified",
    title: "کیفیت",
    description:
      "تلاش می‌کنیم محصولات ورزشی باکیفیت را در اختیار شما قرار دهیم تا انتخاب مطمئن‌تری داشته باشید.",
  },
  {
    icon: "payments",
    title: "قیمت منصفانه",
    description:
      "هدف ما ارائه محصولات با قیمت منطقی و ایجاد ارزش مناسب برای مشتریان چهلتیکه است.",
  },
  {
    icon: "support_agent",
    title: "پشتیبانی",
    description:
      "اگر قبل یا بعد از خرید سوالی داشته باشید، می‌توانید از طریق راه‌های ارتباطی با ما در تماس باشید.",
  },
];

const contacts = [
  { name: "رضا عابدیان", phone: "09121393041" },
  { name: "فرهاد چهل امیرانی", phone: "09927253853" },
  { name: "فرزاد چهل امیرانی", phone: "09939021703" },
];

export default function AboutPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold text-primary">
              درباره چهلتیکه
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight text-foreground sm:text-5xl lg:text-6xl">
              چهلتیکه
              <br />
              <span className="text-primary">برای انتخاب بهتر</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base">
              چهلتیکه فروشگاه تخصصی تجهیزات ورزشی است؛ جایی برای پیدا کردن
              کفش، لباس و لوازم تمرینی مورد نیاز برای فعالیت‌های ورزشی.
              ما سال هاست که در تولید و پخش عمده محصولات ورزشی ایرانی فعالیت داریم 
              امیدواریم بتونیم در بخش تک فروشی هم خدماتمون رو بخوبی ارائه بدیم
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground transition-opacity hover:opacity-90"
              >
                مشاهده محصولات
                <span className="material-symbols-outlined mr-2 text-lg">
                  arrow_back
                </span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-border bg-secondary px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-tertiary"
              >
                تماس با ما
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-border bg-card p-7 sm:p-10">
            <p className="text-sm font-bold text-primary">درباره ما</p>

            <h2 className="mt-3 text-2xl font-black text-foreground sm:text-3xl">
              خرید تجهیزات ورزشی، ساده و مطمئن
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-8 text-muted-foreground">
              <p>
                انتخاب تجهیزات ورزشی مناسب فقط به ظاهر یک محصول محدود نمی‌شود.
                کیفیت، کاربرد، مشخصات و قیمت همگی در یک انتخاب خوب اهمیت دارند.
              </p>

              <p>
                ما در چهلتیکه تلاش می‌کنیم محصولات ورزشی را در یک فضای ساده و
                قابل دسترس ارائه کنیم تا بتوانید راحت‌تر محصول مورد نیازتان را
                پیدا و مقایسه کنید.
              </p>

              <p>
                هدف ما این است که تجربه خرید از چهلتیکه برای شما شفاف، راحت و
                قابل اعتماد باشد؛ از انتخاب محصول تا ارتباط با تیم ما.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl border border-border bg-card p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-2xl">
                  shopping_bag
                </span>
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-foreground">
                فروشگاه تخصصی ورزشی
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                از کفش و لباس ورزشی تا لوازم تمرینی، محصولات مورد نیازتان را در
                چهلتیکه پیدا کنید.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-2xl">
                  store
                </span>
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-foreground">
                فروشگاه حضوری
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                چهلتیکه در منیریه، پاساژ تابان، طبقه دو قرار دارد و امکان
                ارتباط و مراجعه حضوری نیز فراهم است.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold text-primary">چیزی که مهم است</p>

            <h2 className="mt-3 text-3xl font-black text-foreground">
              ارزش‌های چهلتیکه
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              برای ما تجربه خوب خرید فقط به خود محصول محدود نمی‌شود.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-border bg-card p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-2xl">
                    {value.icon}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-foreground">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-7 sm:p-9">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-2xl">
                  location_on
                </span>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  فروشگاه حضوری
                </p>

                <h2 className="mt-1 text-xl font-extrabold text-foreground">
                  آدرس ما
                </h2>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-secondary p-5">
              <p className="text-sm font-bold leading-7 text-foreground">
                منیریه، پاساژ تابان، طبقه دو
              </p>
            </div>

            <Link
              href="/contact"
              className="mt-5 inline-flex items-center text-sm font-bold text-primary transition-opacity hover:opacity-80"
            >
              اطلاعات تماس
              <span className="material-symbols-outlined mr-1 text-lg">
                arrow_back
              </span>
            </Link>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 sm:p-9">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-2xl">
                  contact_phone
                </span>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  ارتباط مستقیم
                </p>

                <h2 className="mt-1 text-xl font-extrabold text-foreground">
                  با ما در تماس باشید
                </h2>
              </div>
            </div>

            <div className="mt-6 divide-y divide-border">
              {contacts.map((contact) => (
                <a
                  key={contact.phone}
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-between gap-4 py-4 transition-colors hover:text-primary"
                >
                  <span className="text-sm font-bold text-foreground">
                    {contact.name}
                  </span>

                  <span
                    dir="ltr"
                    className="shrink-0 text-sm text-muted-foreground"
                  >
                    {contact.phone}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-10">
          <h2 className="text-2xl font-black sm:text-3xl">
            انتخابت رو شروع کن
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 opacity-80">
            محصولات چهلتیکه را ببین و تجهیزات ورزشی مورد نیازت را پیدا کن.
          </p>

          <Link
            href="/products"
            className="mt-7 inline-flex items-center rounded-xl bg-primary-foreground px-7 py-3 text-sm font-extrabold text-primary transition-opacity hover:opacity-90"
          >
            مشاهده محصولات
            <span className="material-symbols-outlined mr-2 text-lg">
              arrow_back
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
