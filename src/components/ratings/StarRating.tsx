"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value?: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: number;
}

export function StarRating({ value = 0, onChange, readonly = false, size = 20 }: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = (hover || value) >= star;
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onMouseEnter={() => !readonly && setHover(star)}
            onMouseLeave={() => !readonly && setHover(0)}
            onClick={() => onChange?.(star)}
            className={cn("transition", readonly ? "cursor-default" : "cursor-pointer hover:scale-110")}
          >
            <Star
              size={size}
              className={cn(
                "transition",
                filled ? "fill-amber-400 text-amber-400" : "text-stone-300"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
