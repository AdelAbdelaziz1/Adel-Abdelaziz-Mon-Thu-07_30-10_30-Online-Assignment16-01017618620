import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getBrandById } from "@/services/brands.service";
import { getProductsByBrand } from "@/services/product.service";
import ProductCard from "@/components/products/ProductCard";
import { ProductI } from "@/types/product.type";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const brand = await getBrandById(id);
    return { title: `${brand.name} | FreshCart` };
  } catch {
    return { title: "Brand | FreshCart" };
  }
}

export default async function BrandPage({ params }: Props) {
  const { id } = await params;

  let brand;
  try {
    brand = await getBrandById(id);
  } catch {
    notFound();
  }

  let products: ProductI[] = [];
  try {
    products = await getProductsByBrand(id);
  } catch {
    products = [];
  }

  return (
    <main className="min-h-screen bg-gray-50/50">
      <section className="bg-gradient-to-br from-green-600 via-green-500 to-green-400">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="mb-6 flex items-center gap-2 text-sm">
            <Link href="/" className="text-white/70 transition-colors hover:text-white">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link href="/brands" className="text-white/70 transition-colors hover:text-white">
              Brands
            </Link>
            <span className="text-white/40">/</span>
            <span className="font-medium text-white">{brand.name}</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-white/30">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                sizes="64px"
                className="object-contain p-2"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                {brand.name}
              </h1>
              <p className="mt-1 text-white/80">Browse products from this brand</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
            <p className="text-gray-500">No products found for this brand.</p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 font-medium text-white hover:bg-green-700"
            >
              Browse all products
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {products.length} {products.length === 1 ? "Product" : "Products"}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}