import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { BrandI } from "@/types/brand.type";

type BrandCardProps = {
  brand: BrandI;
};

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link
      href={`/brands/${brand._id}`}
      aria-label={`View ${brand.name} products`}
      className="group relative block overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg hover:shadow-green-100/50 sm:p-5"
    >
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={brand.image}
          alt={`${brand.name} logo`}
          width={160}
          height={160}
          className="h-3/4 w-3/4 object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <h3 className="mt-4 text-center text-sm font-semibold text-gray-900">
        {brand.name}
      </h3>

      <span className="pointer-events-none mt-1 flex items-center justify-center gap-1 text-xs font-medium text-green-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        View Products
        <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}