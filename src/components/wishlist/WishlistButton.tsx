"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useWishlist } from "@/context/wishlistContext";

type WishlistButtonProps = {
  productId: string;
  variant?: "icon" | "full";
  className?: string;
};

export default function WishlistButton({
  productId,
  variant = "icon",
  className,
}: WishlistButtonProps) {
  const { isInWishlist, isPending, toggleWishlist } = useWishlist();
  const active = isInWishlist(productId);
  const pending = isPending(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  const label = active ? "Remove from wishlist" : "Add to wishlist";

  if (variant === "full") {
    return (
      <Button
        type="button"
        variant="outline"
        onClick={handleClick}
        disabled={pending}
        aria-pressed={active}
        className={cn(
          "h-[52px] flex-1 gap-2 rounded-xl border-2 text-base font-medium",
          active
            ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
            : "border-gray-200 text-gray-700",
          className
        )}
      >
        {pending ? (
          <Spinner className="size-4" />
        ) : (
          <Heart className={cn(active && "fill-red-500 text-red-500")} />
        )}
        {active ? "In Wishlist" : "Add to Wishlist"}
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={cn(
        "flex size-9 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-red-50 disabled:opacity-60",
        className
      )}
    >
      {pending ? (
        <Spinner className="size-4" />
      ) : (
        <Heart
          className={cn(
            "size-4 transition",
            active ? "fill-red-500 text-red-500" : "text-gray-500"
          )}
        />
      )}
    </button>
  );
}