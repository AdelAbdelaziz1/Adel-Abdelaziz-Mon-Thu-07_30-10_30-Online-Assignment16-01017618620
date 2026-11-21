import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllCategories } from "@/services/category.service";

export default async function CategorySection() {
  const categories = await getAllCategories();

  return (
    <section className="mx-auto w-full max-w-screen-2xl px-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-3 py-8 sm:flex-row sm:items-center">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
            <span className="h-6 w-1 rounded-full bg-green-600" />
            <span>
              Shop By <span className="text-green-600">Category</span>
            </span>
          </h2>

          <Link
            href="/categories"
            className="flex items-center gap-2 text-sm font-medium text-green-600 transition hover:text-green-700"
          >
            View All Categories
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="flex flex-col items-center gap-3 rounded-lg bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <span className="text-center text-sm text-slate-700">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}