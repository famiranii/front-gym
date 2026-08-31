import StarRating from "./StarRating";
import { api } from "@/lib/api";
import { Product, Review } from "@/types/product-detail";
import { notFound } from "next/navigation";
import WritingReview from "./WritingReview";

export default async function ReviewsTab({ product }: { product: Product }) {
  console.log("first");
  let reviews: any[] = [];
  let dist: { star: number; count: number }[] = [];
  try {
    const response = await api.get<any>(`/products/${product.id}/reviews`);
    reviews = Array.isArray(response) ? response : [];
    dist = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r: any) => r.rating === star).length,
    }));
    console.log("REVIEWS JSON:", JSON.stringify(reviews, null, 2));
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    reviews = [];
    dist = [5, 4, 3, 2, 1].map((star) => ({ star, count: 0 }));
  }
  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="flex gap-6 items-center p-5 bg-muted/40 rounded-2xl border border-border">
        <div className="flex flex-col items-center gap-1 shrink-0">
          <span className="text-4xl font-extrabold text-foreground">
            {product.average_rating}
          </span>
          {/* <StarRating rating={product.average_rating} size="sm" /> */}
          <span className="text-xs text-muted-foreground">
            {product.reviewCount} نظر
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          {dist.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-4 text-left">
                {star}
              </span>
              <span
                className="material-symbols-outlined text-warning text-sm leading-none"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning rounded-full transition-all"
                  style={{
                    width: `${(count / reviews.length) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-4">{count}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Write review button */}
      <WritingReview />
      نظرات کاربران
      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const formattedDate = new Intl.DateTimeFormat("fa-IR", {
    calendar: "persian",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(review.created_at));
  return (
    <div className="flex flex-col gap-2 p-4 rounded-2xl bg-muted/40 border border-border">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-foreground">
                {review.full_name}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {formattedDate}
            </span>
          </div>
        </div>
        {/* <StarRating rating={review.rating} size="sm" /> */}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {review.body}
      </p>
    </div>
  );
}
