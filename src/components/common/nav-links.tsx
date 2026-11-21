"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/nav-links";

type NavLinksProps = {
  className?: string;
  onNavigate?: () => void;
};

export default function NavLinks({ className, onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex gap-6", className)}>
      {navLinks.map(({ label, href }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                isActive ? "text-green-600" : "text-gray-700"
              )}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}