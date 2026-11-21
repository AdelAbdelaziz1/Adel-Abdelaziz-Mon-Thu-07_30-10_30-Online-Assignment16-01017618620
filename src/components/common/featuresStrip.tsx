"use client";
import type { ComponentType, SVGProps } from "react";
import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  iconColor: string;
  iconBg: string;
};

const features: Feature[] = [
  {
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    Icon: Truck,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    title: "Secure Payment",
    description: "100% secure transactions",
    Icon: ShieldCheck,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    title: "Easy Returns",
    description: "14-day return policy",
    Icon: RotateCcw,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
  {
    title: "24/7 Support",
    description: "Dedicated support team",
    Icon: Headset,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
  },
];

export default function FeaturesStrip() {
  return (
    <section className="bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {features.map(({ title, description, Icon, iconColor, iconBg }) => (
          <li
            key={title}
            className="flex min-h-20 items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md lg:p-5"
          >
            <span
              className={`flex size-12 shrink-0 items-center justify-center rounded-full lg:size-14 ${iconBg} ${iconColor}`}
            >
              <Icon size={22} aria-hidden="true" />
            </span>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold leading-5 text-gray-800 lg:text-base lg:leading-6">
                {title}
              </h3>
              <p className="text-xs leading-4 text-gray-500 lg:text-sm lg:leading-5">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}