import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "راه‌های ارتباط با چهلتیکه؛ آدرس فروشگاه، شماره‌های تماس و اطلاعات ارتباطی.",
};

const contacts = [
  { name: "رضا عابدیان", phone: "09121393041" },
  { name: "فرهاد چهل امیرانی", phone: "09927253853" },
  { name: "فرزاد چهل امیرانی", phone: "09939021703" },
];

const instagramUrl = "https://instagram.com/cheheltike.sport";

export default function ContactPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-background">
      {" "}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-8">
        {" "}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          {" "}
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />{" "}
          <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          ```
          <div className="relative max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold text-primary">
              ارتباط با چهلتیکه
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight text-foreground sm:text-5xl lg:text-6xl">
              با ما
              <br />
              <span className="text-primary">در تماس باشید</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base">
              برای پرسش درباره محصولات، خرید، پیگیری یا هر موضوع دیگری می‌توانید
              از طریق شماره‌های تماس با ما در ارتباط باشید یا به فروشگاه حضوری
              چهلتیکه مراجعه کنید.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${contacts[0].phone}`}
                className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground transition-opacity hover:opacity-90"
              >
                تماس با ما
                <span className="material-symbols-outlined mr-2 text-lg">
                  call
                </span>
              </a>

              <Link
                href="/products"
                className="inline-flex items-center rounded-xl border border-border bg-secondary px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-tertiary"
              >
                مشاهده محصولات
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-7 sm:p-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-2xl">
                  location_on
                </span>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">فروشگاه حضوری</p>

                <h2 className="mt-1 text-2xl font-black text-foreground">
                  آدرس فروشگاه
                </h2>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-secondary p-6">
              <p className="text-sm font-bold leading-8 text-foreground">
                منیریه، پاساژ تابان، طبقه دو
              </p>
            </div>

            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              برای مراجعه حضوری می‌توانید به آدرس بالا مراجعه کنید.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 sm:p-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-2xl">call</span>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">ارتباط مستقیم</p>

                <h2 className="mt-1 text-2xl font-black text-foreground">
                  شماره‌های تماس
                </h2>
              </div>
            </div>

            <div className="mt-6 divide-y divide-border">
              {contacts.map((contact) => (
                <a
                  key={contact.phone}
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-between gap-4 py-5 transition-colors hover:text-primary"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl text-primary">
                      person
                    </span>

                    <span className="text-sm font-bold text-foreground">
                      {contact.name}
                    </span>
                  </div>

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
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold text-primary">راه‌های ارتباطی</p>

            <h2 className="mt-3 text-3xl font-black text-foreground">
              چطور با ما ارتباط بگیری؟
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              راه ارتباطی مناسب خودت را انتخاب کن و با چهلتیکه در تماس باش.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <a
              href={`tel:${contacts[0].phone}`}
              className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-2xl">
                  phone_in_talk
                </span>
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-foreground">
                تماس تلفنی
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                برای دریافت اطلاعات و پاسخ به سوالاتتان می‌توانید با ما تماس
                بگیرید.
              </p>

              <span
                dir="ltr"
                className="mt-5 block text-sm font-bold text-primary"
              >
                {contacts[0].phone}
              </span>
            </a>

            <div className="rounded-2xl border border-border bg-card p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-2xl">
                  store
                </span>
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-foreground">
                مراجعه حضوری
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                اگر ترجیح می‌دهید حضوری خرید کنید یا محصولات را از نزدیک ببینید،
                می‌توانید به فروشگاه مراجعه کنید.
              </p>

              <span className="mt-5 block text-sm font-bold text-primary">
                منیریه، پاساژ تابان، طبقه دو
              </span>
            </div>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="اینستاگرام چهلتیکه"
              className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-2xl">
                  photo_camera
                </span>
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-foreground">
                اینستاگرام
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                برای اطلاع از محصولات و اخبار چهلتیکه، صفحه اینستاگرام ما را
                دنبال کنید.
              </p>

              <span
                dir="ltr"
                className="mt-5 block text-sm font-bold text-primary"
              >
                @cheheltike.sport
              </span>
            </a>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-3xl border border-border bg-card p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-bold text-primary">
                نیاز به کمک داری؟
              </p>

              <h2 className="mt-3 text-2xl font-black text-foreground sm:text-3xl">
                خوشحال می‌شویم با شما صحبت کنیم
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {contacts.map((contact) => (
                <a
                  key={contact.phone}
                  href={`tel:${contact.phone}`}
                  className="rounded-2xl border border-border bg-secondary p-5 transition-colors hover:border-primary/40"
                >
                  <span className="material-symbols-outlined text-xl text-primary">
                    call
                  </span>

                  <p className="mt-4 text-xs text-muted-foreground">
                    {contact.name}
                  </p>

                  <p
                    dir="ltr"
                    className="mt-1 text-sm font-bold text-foreground"
                  >
                    {contact.phone}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-10">
          <h2 className="text-2xl font-black sm:text-3xl">آماده انتخابی؟</h2>

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
