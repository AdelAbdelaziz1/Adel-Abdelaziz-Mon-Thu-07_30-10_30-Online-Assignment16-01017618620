import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
}

export default function CategoriesHeader({ title, subtitle }: Props) {
  return (
    <section className="bg-gradient-to-br from-green-600 via-green-500 to-green-400">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-white/70 hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-white/40" />
          <span className="text-white font-medium">Categories</span>
        </nav>

        {/* Title block */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30 shadow-lg shrink-0">
            <Layers className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-white/80 text-base">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}