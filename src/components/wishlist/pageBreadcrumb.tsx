import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = {
  label: string;
  href?: string;
  isCurrent?: boolean;
};

type PageBreadcrumbProps = {
  items: Crumb[];
  className?: string;
};

export default function PageBreadcrumb({ items, className }: PageBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.isCurrent ?? isLast;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {isCurrent || !item.href ? (
                <span
                  className={cn(
                    "text-sm leading-5",
                    isCurrent
                      ? "font-bold text-[#101828]"
                      : "font-medium text-[#6A7282]"
                  )}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-medium leading-5 text-[#6A7282] transition-colors hover:text-[#101828]"
                >
                  {item.label}
                </Link>
              )}

              {!isLast && (
                <ChevronRight className="h-4 w-4 text-[#6A7282]" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}