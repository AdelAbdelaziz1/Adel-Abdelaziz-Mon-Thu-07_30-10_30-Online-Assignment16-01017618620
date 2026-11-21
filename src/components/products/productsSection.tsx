import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";

const baseUrl = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

type ProductsSectionProps = {
  page?: number;
  keyword?: string;
  category?: string;
  limit?: number;
  showPagination?: boolean;
  title?: string;
  viewAllHref?: string;
};

async function getProducts(
  page: number,
  limit: number,
  keyword?: string,
  category?: string
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (keyword) params.set("keyword", keyword);
  if (category) params.set("category", category);

  try {
    const res = await fetch(`${baseUrl}/api/v1/products?${params}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    const json = await res.json();
    return {
      products: (json?.data ?? []) as any[],
      numberOfPages: (json?.metadata?.numberOfPages ?? 1) as number,
      error: false,
    };
  } catch (error) {
    console.error("getProducts failed:", error);
    return { products: [], numberOfPages: 1, error: true };
  }
}

export function buildPageHref(page: number, keyword?: string, category?: string) {
  const params = new URLSearchParams({ page: String(page) });
  if (keyword) params.set("keyword", keyword);
  if (category) params.set("category", category);
  return `/products?${params.toString()}`;
}

export default async function ProductsSection({
  page = 1,
  keyword,
  category,
  limit = 20,
  showPagination = true,
  title,
  viewAllHref,
}: ProductsSectionProps) {
  const { products, numberOfPages, error } = await getProducts(
    page,
    limit,
    keyword,
    category
  );

  return (
    <section>
      {title && (
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-sm font-semibold text-green-600 hover:underline"
            >
              View all
            </Link>
          )}
        </div>
      )}

      {error ? (
        <p className="py-20 text-center text-gray-500">
          Couldn&apos;t load products right now. Please try again later.
        </p>
      ) : products.length === 0 ? (
        <p className="py-20 text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {showPagination && numberOfPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {Array.from({ length: numberOfPages }).map((_, i) => (
            <Link
              key={i}
              href={buildPageHref(i + 1, keyword, category)}
              aria-current={page === i + 1 ? "page" : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium ${
                page === i + 1
                  ? "bg-green-600 text-white"
                  : "border bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}