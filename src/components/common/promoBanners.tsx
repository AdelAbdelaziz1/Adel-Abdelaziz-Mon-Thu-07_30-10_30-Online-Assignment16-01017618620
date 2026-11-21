import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Promo {
  id: string;
  badgeIcon: string;
  badgeText: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  buttonText: string;
  href: string;
  gradient: string;
  buttonColor: string;
}

const promos: Promo[] = [
  {
    id: "organic-fruits",
    badgeIcon: "🔥",
    badgeText: "Deal of the Day",
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    buttonText: "Shop Now",
    href: "/products",
    gradient: "from-[#00BC7D] to-[#007A55]",
    buttonColor: "text-[#009966]",
  },
  {
    id: "exotic-vegetables",
    badgeIcon: "✨",
    badgeText: "New Arrivals",
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    buttonText: "Explore Now",
    href: "/products",
    gradient: "from-[#FF8904] to-[#FF2056]",
    buttonColor: "text-[#FF6900]",
  },
];

function PromoCard({ promo }: { promo: Promo }) {
  return (
    <div
      className={`relative isolate flex-1 overflow-hidden rounded-2xl bg-gradient-to-br p-8 ${promo.gradient}`}
    >
      {/* Decorative circles */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-white/10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start gap-4 text-white">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
          <span>{promo.badgeIcon}</span>
          <span>{promo.badgeText}</span>
        </span>

        <h3 className="text-3xl font-bold leading-9">{promo.title}</h3>

        <p className="text-base text-white/80">{promo.description}</p>

        <div className="flex flex-wrap items-center gap-4">
          <div className="text-3xl font-bold leading-9">{promo.discount}</div>
          <div className="text-sm text-white/70">
            Use code: <span className="font-bold text-white">{promo.code}</span>
          </div>
        </div>

        <Link
          href={promo.href}
          className={`mt-2 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold transition hover:gap-3 hover:shadow-lg ${promo.buttonColor}`}
        >
          {promo.buttonText}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function PromoBanners() {
  return (
    <section className="mx-auto w-full max-w-screen-2xl px-4 py-8">
      <div className="flex flex-col gap-6 md:flex-row">
        {promos.map((promo) => (
          <PromoCard key={promo.id} promo={promo} />
        ))}
      </div>
    </section>
  );
}