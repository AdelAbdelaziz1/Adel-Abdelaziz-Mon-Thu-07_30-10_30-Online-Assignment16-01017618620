"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductCard from "@/components/products/ProductCard";
import { ProductI } from "@/types/product.type";

const SEARCH_HREF = "/search";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 12;

interface NamedItem {
  _id: string;
  name: string;
}

type SortKey = "relevance" | "price-asc" | "price-desc" | "rating";

async function fetchList<T>(path: string): Promise<T[]> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const json = await res.json();
  return json.data ?? [];
}

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();

  const [input, setInput] = useState(query);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [products, setProducts] = useState<ProductI[]>([]);
  const [categories, setCategories] = useState<NamedItem[]>([]);
  const [brands, setBrands] = useState<NamedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set());
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<SortKey>("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setInput(query);
  }, [query]);

  // تحميل البيانات مرة واحدة
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [p, c, b] = await Promise.all([
          fetchList<ProductI>("/api/v1/products?limit=100"),
          fetchList<NamedItem>("/api/v1/categories"),
          fetchList<NamedItem>("/api/v1/brands?limit=100"),
        ]);
        if (cancelled) return;
        setProducts(p);
        setCategories(c);
        setBrands(b);
      } catch (error) {
        if (cancelled) return;
        console.error("Error loading search data:", error);
        setHasError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query, selectedCats, selectedBrands, minPrice, maxPrice, sort]);

  const filteredProducts = useMemo(() => {
    const q = query.toLowerCase();
    const min = minPrice === "" ? 0 : Number(minPrice);
    const max = maxPrice === "" ? Infinity : Number(maxPrice);

    const result = products.filter((p) => {
      if (
        q &&
        !(
          p.title.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q) ||
          p.brand?.name?.toLowerCase().includes(q)
        )
      ) {
        return false;
      }
      if (selectedCats.size > 0 && !selectedCats.has(p.category?._id)) return false;
      if (selectedBrands.size > 0 && !selectedBrands.has(p.brand?._id)) return false;
      if (p.price < min || p.price > max) return false;
      return true;
    });

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.ratingsAverage - a.ratingsAverage);

    return result;
  }, [products, query, selectedCats, selectedBrands, minPrice, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = input.trim();
    router.push(q ? `${SEARCH_HREF}?q=${encodeURIComponent(q)}` : SEARCH_HREF);
  }

  function toggleInSet(
    current: Set<string>,
    id: string,
    setter: (next: Set<string>) => void
  ) {
    const next = new Set(current);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setter(next);
  }

  function clearFilters() {
    setSelectedCats(new Set());
    setSelectedBrands(new Set());
    setMinPrice("");
    setMaxPrice("");
  }

  const hasActiveFilters =
    selectedCats.size > 0 || selectedBrands.size > 0 || minPrice !== "" || maxPrice !== "";

  const currentTitle = query ? `Results for "${query}"` : "Search Results";

  const filtersPanel = (
    <div className="flex flex-col gap-6">
      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="self-start text-sm font-medium text-green-600 hover:underline"
        >
          Clear all filters
        </button>
      )}

      {/* Categories */}
      <div className="bg-white p-6 rounded-2xl border border-[#F3F4F6]">
        <h3 className="font-bold text-[#101828] mb-4 text-[16px]">Categories</h3>
        <div className="space-y-3 max-h-[208px] overflow-y-auto pr-2">
          {categories.map((cat) => (
            <label key={cat._id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCats.has(cat._id)}
                onChange={() => toggleInSet(selectedCats, cat._id, setSelectedCats)}
                className="h-4 w-4 border-[#767676] rounded-[2.5px] text-green-600 focus:ring-green-500"
              />
              <span className="text-[14px] text-[#4A5565] font-medium group-hover:text-gray-900">
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white p-6 rounded-2xl border border-[#F3F4F6]">
        <h3 className="font-bold text-[#101828] mb-4 text-[16px]">Price Range</h3>

        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="text-[12px] text-[#6A7282] mb-1 block font-medium">
              Min (EGP)
            </label>
            <input
              type="number"
              min={0}
              inputMode="numeric"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex-1">
            <label className="text-[12px] text-[#6A7282] mb-1 block font-medium">
              Max (EGP)
            </label>
            <input
              type="number"
              min={0}
              inputMode="numeric"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="No limit"
              className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { label: "Under 500", value: 500 },
            { label: "Under 1K", value: 1000 },
            { label: "Under 5K", value: 5000 },
            { label: "Under 10K", value: 10000 },
          ].map((range) => (
            <button
              key={range.label}
              type="button"
              onClick={() => {
                setMinPrice("");
                setMaxPrice(String(range.value));
              }}
              className="px-3 py-1.5 bg-[#F3F4F6] hover:bg-gray-200 text-[#4A5565] text-[12px] font-medium rounded-full transition-colors"
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="bg-white p-6 rounded-2xl border border-[#F3F4F6]">
        <h3 className="font-bold text-[#101828] mb-4 text-[16px]">Brands</h3>
        <div className="space-y-3 max-h-[208px] overflow-y-auto pr-2">
          {brands.map((brand) => (
            <label key={brand._id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.has(brand._id)}
                onChange={() => toggleInSet(selectedBrands, brand._id, setSelectedBrands)}
                className="h-4 w-4 border-[#767676] rounded-[2.5px] text-green-600 focus:ring-green-500"
              />
              <span className="text-[14px] text-[#4A5565] font-medium group-hover:text-gray-900">
                {brand.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]/50 pb-12 font-sans">
      {/* Header Section */}
      <div className="bg-white pt-6 pb-4 mb-8 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-[1536px]">
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="text-[#6A7282] hover:text-green-600 text-sm font-medium"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#D1D5DC]" />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/products"
                    className="text-[#6A7282] hover:text-green-600 text-sm font-medium"
                  >
                    Shop
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#D1D5DC]" />
                <BreadcrumbItem className="font-black">
                  <BreadcrumbPage className="text-[#101828] text-sm font-medium">
                    {currentTitle}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <form onSubmit={handleSearch} role="search" className="relative w-full max-w-[672px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#99A1AF]" />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 border border-[#E5E7EB] rounded-xl leading-5 bg-white placeholder-[rgba(54,65,83,0.5)] focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-[18px] transition duration-150 ease-in-out"
              placeholder="Search for products..."
            />
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-[1536px]">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-[256px] flex-shrink-0">{filtersPanel}</aside>

          {/* Main Content */}
          <main className="flex-1 w-full min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen((v) => !v)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 font-medium"
                >
                  <SlidersHorizontal size={18} />
                  Filters
                </button>

                <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setView("grid")}
                    aria-label="Grid view"
                    className={`p-2 rounded-md ${
                      view === "grid" ? "bg-[#16A34A] text-white" : "text-[#6A7282] hover:text-gray-600"
                    }`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("list")}
                    aria-label="List view"
                    className={`p-2 rounded-md ${
                      view === "list" ? "bg-[#16A34A] text-white" : "text-[#6A7282] hover:text-gray-600"
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>

                <p className="text-sm text-[#6A7282]">{filteredProducts.length} products</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-[14px] text-[#6A7282] font-medium">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-[14px] text-[#364153] font-medium focus:outline-none focus:border-green-500 bg-white min-w-[150px]"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Mobile filters */}
            {isMobileFiltersOpen && <div className="lg:hidden mb-6">{filtersPanel}</div>}

            {/* Results */}
            {isLoading ? (
              <div className="py-20 text-center text-[#6A7282]">Loading products...</div>
            ) : hasError ? (
              <div className="rounded-2xl border border-[#F3F4F6] bg-white py-16 text-center">
                <p className="text-lg font-semibold text-[#101828]">Something went wrong</p>
                <p className="mt-1 text-sm text-[#6A7282]">
                  We couldn&apos;t load the products. Please try again later.
                </p>
              </div>
            ) : pageProducts.length > 0 ? (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "grid grid-cols-1 gap-6"
                }
              >
                {pageProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#F3F4F6] bg-white py-16 text-center">
                <p className="text-lg font-semibold text-[#101828]">No products found</p>
                <p className="mt-1 text-sm text-[#6A7282]">
                  {query
                    ? `Try a different keyword for "${query}" or adjust your filters`
                    : "Try adjusting your filters"}
                </p>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-12 flex flex-wrap justify-center items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                  aria-label="Previous page"
                  className="p-2 border border-[#E5E7EB] bg-white rounded-lg hover:bg-gray-50 text-[#6A7282] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium text-sm ${
                      n === currentPage
                        ? "bg-[#16A34A] text-white"
                        : "border border-[#E5E7EB] bg-white text-[#364153] hover:bg-gray-50"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage(currentPage + 1)}
                  aria-label="Next page"
                  className="p-2 border border-[#E5E7EB] bg-white rounded-lg hover:bg-gray-50 text-[#6A7282] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={null}>
      <SearchResultsContent />
    </Suspense>
  );
}