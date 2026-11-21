import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/freshcart-logo.svg";

import {
  FaTruck,
  FaRotateRight,
  FaShieldHalved,
  FaHeadset,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCreditCard,
} from "react-icons/fa6";


const features = [
  { icon: FaTruck, title: "Free Shipping", text: "On orders over 500 EGP" },
  { icon: FaRotateRight, title: "Easy Returns", text: "14-day return policy" },
  { icon: FaShieldHalved, title: "Secure Payment", text: "100% secure checkout" },
  { icon: FaHeadset, title: "24/7 Support", text: "Contact us anytime" },
];

const linkGroups = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      { label: "Electronics", href: "/categories/electronics" },
      { label: "Men's Fashion", href: "/categories/mens-fashion" },
      { label: "Women's Fashion", href: "/categories/womens-fashion" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Order History", href: "/allorders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/register" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Track Order", href: "/track-order" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const socials = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
];

const payments = ["Visa", "Mastercard", "PayPal"];


export default function Footer() {
  return (
    <>
      {/* Features strip */}
      <section className="border-y border-green-100 bg-green-50">
        <div className="mx-auto max-w-[1504px] px-4 py-6 lg:px-8 xl:px-[208px]">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100">
                  <Icon className="text-lg text-green-600" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
                  <p className="text-xs font-medium text-gray-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900 pt-12">
        <div className="mx-auto max-w-[1504px] px-4 lg:px-8 xl:px-[208px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-6 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link
                href="/"
                className="inline-flex rounded-lg bg-white px-4 py-2"
                aria-label="FreshCart home"
              >
                <Image
                  src={logo}
                  alt="FreshCart"
                  width={165}
                  height={32}
                  priority
                />
              </Link>

              <p className="mt-[30px] max-w-[431px] text-sm font-medium leading-[23px] text-gray-400">
                FreshCart is your one-stop destination for quality products. From
                fashion to electronics, we bring you the best brands at
                competitive prices with a seamless shopping experience.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-3 text-sm font-medium text-gray-400 transition-colors hover:text-green-500"
                >
                  <FaPhone className="shrink-0 text-green-500" />
                  <span>+1 (800) 123-4567</span>
                </a>
                <a
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-3 text-sm font-medium text-gray-400 transition-colors hover:text-green-500"
                >
                  <FaEnvelope className="shrink-0 text-green-500" />
                  <span>support@freshcart.com</span>
                </a>
                <div className="flex items-start gap-3 text-sm font-medium text-gray-400">
                  <FaLocationDot className="mt-0.5 shrink-0 text-green-500" />
                  <span>123 Commerce Street, New York, NY 10001</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-green-600 hover:text-white"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {linkGroups.map(({ title, links }) => (
              <div key={title}>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <ul className="mt-5 space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="block text-sm font-medium text-gray-400 transition-colors hover:text-green-500"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-800">
          <div className="mx-auto flex max-w-[1504px] flex-col items-center gap-4 px-4 py-6 lg:flex-row lg:justify-between lg:px-8 xl:px-[208px]">
            <p className="text-sm font-medium text-gray-500">
              © {new Date().getFullYear()} FreshCart. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {payments.map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-2 text-sm font-medium text-gray-500"
                >
                  <FaCreditCard />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}