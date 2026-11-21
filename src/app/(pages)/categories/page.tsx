import { getAllCategories } from "@/services/category.service";
import CategoriesHeader from "@/components/categories/CategoriesHeader";
import CategoryCard from "@/components/categories/CategoryCard";

export const metadata = {
  title: "All Categories | FreshCart",
  description: "Browse our wide range of product categories",
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="min-h-screen bg-gray-50/50">
      <CategoriesHeader
        title="All Categories"
        subtitle="Browse our wide range of product categories"
      />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </main>
  );
}