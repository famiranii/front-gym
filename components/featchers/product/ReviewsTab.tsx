import { api } from "@/lib/api";
import { Product } from "@/types/product-detail";
import { ReviewType } from "@/types/reviewsType";
import ReviewsClient from "./ReviewsClient";

export default async function ReviewsTab({ product }: { product: Product }) {
  let reviews: ReviewType[] = [];
  let dist: { star: number; count: number }[] = [];
  try {
    const response = await api.get<ReviewType>(
      `/products/${product.id}/reviews`,
    );
    reviews = Array.isArray(response) ? response : [];
    dist = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r: ReviewType) => r.rating === star).length,
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
      نظرات کاربران
      <div className="flex flex-col gap-3">
        <ReviewsClient reviews={reviews} />
      </div>
    </div>
  );
}
