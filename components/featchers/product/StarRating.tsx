interface Props {
  rating: number;   // 0–5
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (r: number) => void;
}

export default function StarRating({ rating, size = "md", interactive, onChange }: Props) {
  const sizes = { sm: "text-sm", md: "text-xl", lg: "text-2xl" };

  return (
    <div className={`flex flex-row-reverse gap-0.5 ${sizes[size]}`} dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(rating);
        const half = !filled && star === Math.ceil(rating) && rating % 1 >= 0.5;
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange?.(star)}
            className={[
              "transition-transform",
              interactive ? "hover:scale-125 cursor-pointer" : "cursor-default",
              filled ? "text-warning" : half ? "text-warning/60" : "text-border",
            ].join(" ")}
            disabled={!interactive}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
          </button>
        );
      })}
    </div>
  );
}
