import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";

const products = [
  {
    id: 1,
    badge: "جدید",
    category: "کفش دویدن مردانه",
    name: "آریا پرو X-1",
    price: "۴,۵۰۰,۰۰۰ تومان",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD1g5OZppLQ1JDOgQEQibTc3s_IbTd3OEwiKtpRnHG10sFWuWBHWpEpT5T40DrCvcoFzcNG36mv5dnPVrw4AHuX-MkoKk4amPoZdRs8CiQJqV8T-msR39dKnqCc0qfsAqSaE6HiH9Dkfa_AEQrY6eeptNEkb2Sd85mNwuGC5d5rcKQ-H-wUWDOWa--KPeyOt_FPrIvnqqBlC8Co3coymTMsffxCMPDVZcFCc-xv7W8dwgoz4aEiG2nrw",
    showWishlist: true,
  },
  {
    id: 2,
    category: "تجهیزات ورزشی",
    name: "ساک ورزشی نخبگان",
    price: "۲,۸۰۰,۰۰۰ تومان",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2D773-Gt-Jihr6xbPY7oWVlAxuEpunpQKwQlLceDoWY2EyLaGbfMGTzswJoVUk3hex4CcOF6yavZwSxEAR4rf4WFvuVVnBKQMgeMOIXwWd-x37mFfK5ZDqoO2tCckq4jyMfsNIdNzZcGd0HQ1PeAQ8j6r4TbPqkFi5Tig21axnuNT71txXdFC2It5G2mreO4P66mVCYRWg0A0bAP3sBP-KjyDu3MbaNJEIkJCURoOgevRG_aLYtN0YQ",
  },
  {
    id: 3,
    badge: "محدود",
    category: "پوشاک مردانه",
    name: "ژاکت ضدباد وکتور",
    price: "۵,۲۰۰,۰۰۰ تومان",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY1ZIj3WdkfIrTB8o6W5_XMiZ8sLVpR4Vp3-6q2dQ_GZPt552Q_ScIY2TRWMaBONX8rfj8ox4gFZgKvOUOWzR7rTcn716dPWx17JdApfMDm2yZieQ2YkMz1FVgMeDsgz2vxUZdhYA9tPFGfBjLB68OfnNo0OUkfKtqd9HAC59mLpcgGfuizT3zW_gTYSb3hyw4zh1PJSgyfJBfHDndGY9CWwWG4MMYYEbNjliMZpIWF-q-gQuMChoucQ",
  },
];

export default function NewArrivalsSection() {
  return (
    <section className="py-10 px-6 bg-muted/30">
      <div className="flex justify-between items-center mb-8 flex-row-reverse">
        <h2 className="text-xl font-semibold text-foreground">تازه‌های فروشگاه</h2>
        <Link
          href="#"
          className="text-sm text-tertiary hover:text-foreground transition-colors flex items-center gap-1"
        >
          مشاهده همه
          <span className="material-symbols-outlined text-[16px] rotate-180">arrow_back</span>
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-5 pb-6 scrollbar-hide flex-row-reverse">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
