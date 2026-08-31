import { Product } from "@/types/product-detail";
import ReviewsTab from "./ReviewsTab";

function SpecsTab({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-0 divide-y divide-border">
      <p className="text-sm text-muted-foreground pb-4 leading-relaxed">
        {product.description}
      </p>
      {/* {product.specs.map((spec) => (
        <div key={spec.label} className="flex justify-between py-3 text-sm">
          <span className="text-muted-foreground font-medium">{spec.label}</span>
          <span className="font-semibold text-foreground">{spec.value}</span>
        </div>
      ))} */}
    </div>
  );
}



import Link from "next/link";

const TABS = [
  { key: "specs", label: "مشخصات" },
  { key: "reviews", label: "نظرات" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

type ProductTabsProps = {
  product: Product;
  activeTab?: string;
};

export default function ProductTabs({ product, activeTab }: ProductTabsProps) {
  const active: TabKey = activeTab === "reviews" ? "reviews" : "specs";

  return (
    <div className="flex flex-col gap-0">
      <div className="flex border-b border-border">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={`/products/${product.id}?tab=${tab.key}`}
            className={[
              "px-5 py-3 text-sm font-bold transition-all border-b-2 -mb-px",
              active === tab.key
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="pt-5">
        {active === "specs" && <SpecsTab product={product} />}
        {active === "reviews" && <ReviewsTab product={product} />}
      </div>
    </div>
  );
}
