import { Tag } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BrandsHero() {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#7F22FE] via-[#8E51FF] to-[#C27AFF]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/40" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-medium text-white">
                Brands
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-5">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-lg shadow-black/10 ring-1 ring-white/30 backdrop-blur-sm">
            <Tag className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
              Top Brands
            </h1>
            <p className="mt-1 text-base font-medium text-white/80">
              Shop from your favorite brands
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}