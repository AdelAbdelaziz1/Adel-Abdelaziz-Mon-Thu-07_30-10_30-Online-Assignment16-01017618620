"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaArrowsRotate,
  FaRegEye,
  FaRegStar,
  FaRegStarHalfStroke,
  FaStar,
} from "react-icons/fa6";
import { ProductI } from "@/types/product.type";
import AddToCartBtn from "../cart/addToCartBtn";
import WishlistButton from "@/components/wishlist/WishlistButton";

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  return (
    <div className="flex text-yellow-400" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <FaStar key={i} />;
        if (i === full && hasHalf) return <FaRegStarHalfStroke key={i} />;
        return <FaRegStar key={i} />;
      })}
    </div>
  );
}

export default function ProductCard({ product }: { product: ProductI }) {
  const {
    _id,
    title,
    imageCover,
    category,
    ratingsAverage = 0,
    ratingsQuantity = 0,
    price,
    priceAfterDiscount,
  } = product;

  const href = `/products/${_id}`;
  const hasDiscount = !!priceAfterDiscount && priceAfterDiscount < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - priceAfterDiscount!) / price) * 100)
    : 0;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image + badge + floating actions */}
      <div className="relative">
        <Link href={href} className="relative block h-60 w-full bg-white">
          <Image
            src={imageCover}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
            className="object-contain"
          />
        </Link>

        {hasDiscount && (
          <div className="absolute left-3 top-3">
            <span className="rounded bg-red-500 px-2 py-1 text-xs text-white">
              -{discountPercent}%
            </span>
          </div>
        )}

        <div className="absolute right-3 top-3 z-10 flex flex-col space-y-2">
          <WishlistButton
            productId={_id}
            className="size-8 shadow-sm"
          />

          <button
            type="button"
            title="Compare (coming soon)"
            aria-label="Compare"
            disabled
            className="flex size-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaArrowsRotate />
          </button>

          <Link
            href={href}
            title="View details"
            aria-label="View details"
            className="flex size-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm hover:text-emerald-600"
          >
            <FaRegEye />
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="mb-1 text-xs text-gray-500">{category?.name}</div>

        <h3 className="mb-1 font-medium" title={title}>
          <Link className="line-clamp-2 hover:text-emerald-600" href={href}>
            {title}
          </Link>
        </h3>

        <div
          className="mb-2 flex items-center"
          aria-label={`${ratingsAverage} out of 5 stars`}
        >
          <div className="mr-2">
            <Stars rating={ratingsAverage} />
          </div>
          <span className="text-xs text-gray-500">
            {Number(ratingsAverage).toFixed(1)} ({ratingsQuantity})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-emerald-600">
                  {priceAfterDiscount} EGP
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {price} EGP
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-800">
                {price} EGP
              </span>
            )}
          </div>

          <AddToCartBtn productId={_id} />
        </div>
      </div>
    </div>
  );
}