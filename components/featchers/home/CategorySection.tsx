const categories = [
  { label: "دویدن", icon: "directions_run" },
  { label: "بدنسازی", icon: "fitness_center" },
  { label: "تنیس", icon: "sports_tennis" },
  { label: "بسکتبال", icon: "sports_basketball" },
  { label: "شنا", icon: "pool" },
];

export default function CategoriesSection() {
  return (
    <section className="py-10 px-6">
      <h2 className="text-xl font-semibold text-foreground mb-8 text-right">
        دسته‌بندی‌های محبوب
      </h2>

      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide flex-row-reverse">
        {categories.map((cat) => (
          <CategoryItem key={cat.label} {...cat} />
        ))}
      </div>
    </section>
  );
}

function CategoryItem({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="flex flex-col items-center gap-3 min-w-[100px] cursor-pointer group">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center group-hover:bg-tertiary/10 transition-colors duration-300 border border-transparent group-hover:border-tertiary/30">
        <span
          className="material-symbols-outlined text-[32px] text-foreground group-hover:text-tertiary transition-colors"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          {icon}
        </span>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
