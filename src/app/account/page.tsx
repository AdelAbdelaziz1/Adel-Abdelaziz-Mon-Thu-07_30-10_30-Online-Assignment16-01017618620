import Link from "next/link";
import { MapPin, Settings, ChevronRight } from "lucide-react";

export default function AccountDashboardPage() {
  const tiles = [
    {
      href: "/account/settings",
      label: "Account Settings",
      description: "Update your profile, email, phone and password",
      icon: Settings,
    },
    {
      href: "/account/addresses",
      label: "My Addresses",
      description: "Manage your saved delivery addresses",
      icon: MapPin,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">My Account</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your profile, addresses and security
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {tiles.map(({ href, label, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Icon className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-700">
                {label}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
            <ChevronRight className="mt-1 h-5 w-5 text-gray-400 group-hover:text-green-600" />
          </Link>
        ))}
      </div>
    </div>
  );
}