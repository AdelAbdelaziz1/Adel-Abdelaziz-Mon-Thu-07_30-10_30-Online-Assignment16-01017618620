import ProductsSection from "@/components/products/productsSection";
import PageBreadcrumb from "@/components/wishlist/pageBreadcrumb";

export const metadata = {
  title: "Products",
  description: "Browse our wide selection of products",
};

interface SearchParams {
  page?: string;
  keyword?: string;
  category?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const { page = "1", keyword, category } = (await searchParams) ?? {};
  const currentPage = Math.max(1, Number(page) || 1);

  return (
    <main className="min-h-screen bg-gray-50/50">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <PageBreadcrumb
            className="mb-4"
            items={[
              { label: "Home", href: "/" },
              { label: "Products", isCurrent: true },
            ]}
          />
          <h1 className="text-3xl font-bold text-gray-900">
            {keyword ? `Results for "${keyword}"` : "All Products"}
          </h1>
          <p className="mt-1 text-gray-500">
            {keyword
              ? "Products matching your search"
              : "Browse our wide selection of products"}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <ProductsSection
          page={currentPage}
          keyword={keyword}
          category={category}
        />
      </div>
    </main>
  );
}