import { StarRating } from "./StarRating";
import type { SellerRating } from "@/types";

export function SellerRatingBadge({ rating }: { rating: SellerRating | null }) {
  if (!rating || rating.total_ratings === 0) {
    return <span className="text-xs text-stone-400">Noch keine Bewertungen</span>;
  }
  return (
    <div className="flex items-center gap-2">
      <StarRating value={Math.round(rating.avg_stars)} readonly size={14} />
      <span className="text-sm font-semibold">{rating.avg_stars}</span>
      <span className="text-xs text-stone-400">({rating.total_ratings})</span>
    </div>
  );
}
