import type { Metadata } from "next";
import getAllBrands from "@/services/brands.service";
import { BrandsHero } from "@/components/brands/brands-hero";
import { BrandCard } from "@/components/brands/brand-card";
import type { BrandI } from "@/types/brand.type";

export const metadata: Metadata = {
  title: "Top Brands | FreshCart",
  description: "Shop from your favorite brands",
};

export default async function BrandsPage() {
  let brands: BrandI[] = [];
  try {
    const res = await getAllBrands(1, 100);
    brands = res.data ?? [];
  } catch {
    brands = [];
  }

  return (
    <main className="min-h-screen bg-gray-50/50">
      <BrandsHero />

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {brands.length === 0 ? (
          <p className="py-20 text-center text-gray-500">No brands found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {brands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}