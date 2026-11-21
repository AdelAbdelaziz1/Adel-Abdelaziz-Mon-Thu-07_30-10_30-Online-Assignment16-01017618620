"use client";

import { ReactNode, useState } from "react";
import { FaBox, FaCheck, FaStar, FaTruck } from "react-icons/fa";

type TabId = "details" | "reviews" | "shipping";

interface ProductTabsProps {
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  sold: number | string;
  reviewsCount?: number;
  features?: string[];
  reviewsContent?: ReactNode;
  shippingContent?: ReactNode;
}

const DEFAULT_FEATURES = [
  "Premium Quality Product",
  "100% Authentic Guarantee",
  "Fast & Secure Packaging",
  "Quality Tested",
];

export default function ProductTabs({
  description,
  category,
  subcategory,
  brand,
  sold,
  reviewsCount = 0,
  features = DEFAULT_FEATURES,
  reviewsContent,
  shippingContent,
}: ProductTabsProps) {
  const [active, setActive] = useState<TabId>("details");

  const tabs: { id: TabId; label: string; icon: ReactNode }[] = [
    { id: "details", label: "Product Details", icon: <FaBox /> },
    { id: "reviews", label: `Reviews (${reviewsCount})`, icon: <FaStar /> },
    { id: "shipping", label: "Shipping & Returns", icon: <FaTruck /> },
  ];

  const info = [
    { label: "Category", value: category },
    { label: "Subcategory", value: subcategory },
    { label: "Brand", value: brand },
    { label: "Items Sold", value: `${sold}+ sold` },
  ];

  return (
    <div className="bg-white rounded-lg shadow pb-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div
          role="tablist"
          className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                className={`flex shrink-0 items-center gap-2 whitespace-nowrap px-6 py-4 font-medium transition-colors border-b-2 ${
                  isActive
                    ? "bg-green-50/50 text-green-600 border-green-600"
                    : "text-gray-600 border-transparent hover:text-green-600"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6">
        {active === "details" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About this Product
              </h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">
                  Product Information
                </h4>
                <ul className="space-y-2 text-sm">
                  {info.map((item) => (
                    <li
                      key={item.label}
                      className="flex justify-between gap-4"
                    >
                      <span className="text-gray-500 shrink-0">
                        {item.label}
                      </span>
                      <span className="text-gray-900 break-words text-right md:text-right">
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Features */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
                <ul className="space-y-2 text-sm">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <FaCheck className="text-green-600 mr-2 shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {active === "reviews" &&
          (reviewsContent ?? (
            <p className="text-gray-600">No reviews to show yet.</p>
          ))}

        {active === "shipping" &&
          (shippingContent ?? (
            <p className="text-gray-600">
              Shipping and returns information is not available yet.
            </p>
          ))}
      </div>
    </div>
  );
}