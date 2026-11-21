import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Category } from "@/services/category.service";

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  return (
    <Link
      href={`/categories/${category._id}`}
      className="group relative bg-white border border-gray-100 rounded-2xl p-5 transition-all duration-200 hover:shadow-xl hover:border-green-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
    >
      <div className="relative aspect-square rounded-xl bg-gray-50 overflow-hidden mb-4">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="text-center text-base font-bold text-gray-900 group-hover:text-green-600 transition-colors">
        {category.name}
      </h3>

      <div className="mt-2 flex items-center justify-center gap-1 text-xs font-medium text-green-600 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
        <span>View Subcategories</span>
        <ArrowRight className="w-3 h-3" />
      </div>
    </Link>
  );
}