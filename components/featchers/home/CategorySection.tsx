import { api } from "@/lib/api";
import { Category } from "@/types/category";

async function getCategories(): Promise<Category[]> {
  return api.get<Category[]>("/categories");
}

export default async function CategoriesSection() {
  const categories = await getCategories();
  console.log(categories);
  console.dir(categories, { depth: null });

  return (
    <section className="py-10 px-6">

      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            label={category.name}
            icon="category"
            image={category.image_url}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryItem({
  label,
  icon,
  image,
}: {
  label: string;
  icon: string;
  image: string;
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div className="flex flex-col items-center gap-3 min-w-[100px] cursor-pointer group">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center group-hover:bg-tertiary/10 transition-colors duration-300 border border-transparent group-hover:border-tertiary/30">
        {image ? (
          <img
            src={apiUrl + image}
            alt={label}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span
            className="material-symbols-outlined text-[32px] text-foreground group-hover:text-tertiary transition-colors"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            {icon}
          </span>
        )}
      </div>

      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
