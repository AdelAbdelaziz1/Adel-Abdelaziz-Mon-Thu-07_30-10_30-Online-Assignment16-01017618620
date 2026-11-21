"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Settings, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/account/addresses", label: "My Addresses", icon: MapPin },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-72 lg:shrink-0">
      <nav className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-4">
          <h2 className="text-base font-bold text-gray-900">My Account</h2>
        </div>
        <ul className="space-y-1 p-2">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors",
                    active
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg",
                      active ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1">{label}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4",
                      active ? "text-green-500" : "text-gray-400"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}