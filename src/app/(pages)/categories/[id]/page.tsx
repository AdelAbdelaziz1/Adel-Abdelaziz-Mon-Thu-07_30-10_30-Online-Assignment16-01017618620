import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getCategoryById } from "@/services/category.service";
import { getProductsByCategory } from "@/services/product.service";
import ProductCard from "@/components/products/ProductCard";
import { ProductI } from "@/types/product.type";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const category = await getCategoryById(id);
    return { title: `${category.name} | FreshCart` };
  } catch {
    return { title: "Category | FreshCart" };
  }
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;

  let category;
  try {
    category = await getCategoryById(id);
  } catch {
    notFound();
  }

  let products: ProductI[] = [];
  try {
    products = await getProductsByCategory(id);
  } catch {
    products = [];
  }

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 via-green-500 to-green-400">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-white/70 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link href="/categories" className="text-white/70 hover:text-white transition-colors">
              Categories
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">{category.name}</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="relative w-16 h-16 rounded-2xl bg-white/20 ring-1 ring-white/30 overflow-hidden shrink-0">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {category.name}
              </h1>
              <p className="text-white/80 mt-1">
                Browse products in this category
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <div className="container mx-auto px-4 py-10">
        {products.length === 0 ? (
          <div className="rounded-2xl bg-white border border-gray-100 p-10 text-center">
            <p className="text-gray-500">
              No products found in this category.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 font-medium text-white hover:bg-green-700"
            >
              Browse all products
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {products.length} {products.length === 1 ? "Product" : "Products"}
              </h2>
              <Link
                href={`/products?category=${id}`}
                className="text-sm font-medium text-green-600 hover:underline"
              >
                View with filters →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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