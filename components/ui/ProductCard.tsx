import Image from "next/image";

interface ProductCardProps {
  name: string;
  category: string;
  price: string;
  image: string;
  badge?: string;
  showWishlist?: boolean;
}

export default function ProductCard({
  name,
  category,
  price,
  image,
  badge,
  showWishlist,
}: ProductCardProps) {
  return (
    <div className="min-w-[280px] md:min-w-[320px] bg-card rounded-xl overflow-hidden border border-border shadow-sm group hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col">
      <div className="relative h-72 bg-muted overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />

        {badge && (
          <div className="absolute top-3 left-3 bg-card text-foreground text-[12px] font-medium px-2 py-1 rounded-md shadow-sm">
            {badge}
          </div>
        )}

        {showWishlist && (
          <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors backdrop-blur-sm">
            <span className="material-symbols-outlined text-[18px]">favorite</span>
          </button>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col justify-between text-right">
        <div>
          <div className="text-xs text-tertiary mb-1">{category}</div>
          <h3 className="text-sm font-semibold text-foreground mb-2">{name}</h3>
        </div>

        <div className="flex justify-between items-center mt-4 flex-row-reverse">
          <span className="text-sm text-foreground">{price}</span>
          <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:border-secondary transition-colors">
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
