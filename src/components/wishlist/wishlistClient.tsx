"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { getWishlistAction } from "@/actions/wishlist.actions";
import { WishlistProductI } from "@/types/wishlist.type";
import AddToCartBtn from "@/components/cart/addToCartBtn";
import { Spinner } from "@/components/ui/spinner";
import { useWishlist } from "@/context/wishlistContext";

export default function WishlistClient() {
  const [products, setProducts] = useState<WishlistProductI[]>([]);
  const [loading, setLoading] = useState(true);
  const { removeFromWishlist, isPending } = useWishlist();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await getWishlistAction();
        if (cancelled) return;
        if (response?.status !== "success") {
          throw new Error(response?.message);
        }
        setProducts(response.data ?? []);
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error instanceof Error && error.message
              ? error.message
              : "Failed to load wishlist"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function removeItem(id: string) {
    const ok = await removeFromWishlist(id);
    if (ok) setProducts((prev) => prev.filter((p) => p._id !== id));
  }

  if (loading) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <Spinner className="h-8 w-8 text-green-600" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-10 text-center shadow-sm">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <Heart className="h-10 w-10 text-red-500" />
        </span>
        <h2 className="text-2xl font-bold text-gray-900">Your wishlist is empty</h2>
        <p className="text-gray-500">Save products you love and find them here later.</p>
        <Link
          href="/products"
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          <ShoppingCart className="h-4 w-4" />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const hasDiscount =
          !!product.priceAfterDiscount && product.priceAfterDiscount < product.price;
        const removing = isPending(product._id);

        return (
          <div
            key={product._id}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg"
          >
            <button
              type="button"
              onClick={() => removeItem(product._id)}
              disabled={removing}
              aria-label="Remove from wishlist"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:bg-red-50 disabled:opacity-50"
            >
              {removing ? <Spinner className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
            </button>

            <Link
              href={`/products/${product._id}`}
              className="relative block h-56 w-full overflow-hidden bg-gray-50"
            >
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain p-3"
              />
            </Link>

            <div className="flex flex-1 flex-col gap-2 p-4">
              <p className="text-xs font-medium text-gray-500">{product.category?.name}</p>
              <Link
                href={`/products/${product._id}`}
                className="line-clamp-2 font-medium text-gray-900 hover:text-green-600"
              >
                {product.title}
              </Link>

              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="text-xs text-gray-500">
                  {product.ratingsAverage} ({product.ratingsQuantity})
                </span>
              </div>

              <div className="mt-auto flex items-center justify-between">
                <div>
                  {hasDiscount ? (
                    <>
                      <span className="text-lg font-bold text-green-600">
                        {product.priceAfterDiscount} EGP
                      </span>
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        {product.price} EGP
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-800">
                      {product.price} EGP
                    </span>
                  )}
                </div>
                <AddToCartBtn productId={product._id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}