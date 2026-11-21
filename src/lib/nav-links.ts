import {
  Heart,
  Mail,
  Phone,
  ShoppingCart,
  Truck,
  ShieldCheck,
  Tag,
  LogIn,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  {
    label: "Categories",
    href: "/categories",
    children: [
      { label: "All Categories", href: "/categories" },
      {
        label: "Electronics",
        href: "/products?category=6439d58a0049ad0b52b9003f",
      },
      {
        label: "Women's Fashion",
        href: "/products?category=6439d5b90049ad0b52b90048",
      },
      {
        label: "Men's Fashion",
        href: "/products?category=6439d2d167d9aa4ca970649f",
      },
      {
        label: "Beauty & Health",
        href: "/products?category=6439d40367d9aa4ca97064a8",
      },
    ],
  },
  { label: "Brands", href: "/brands" },
];

export const promoItems: { label: string; icon: LucideIcon }[] = [
  { label: "Free shipping over $50", icon: Truck },
  { label: "Secure payment", icon: ShieldCheck },
  { label: "Daily deals", icon: Tag },
];

export const contactInfo = {
  phone: { label: "+20 100 000 0000", href: "tel:+201000000000", icon: Phone },
  email: {
    label: "support@freshcart.com",
    href: "mailto:support@freshcart.com",
    icon: Mail,
  },
  helpHref: "/contact",
};

export const authLinks = {
  signIn: { label: "Sign In", href: "/login", icon: LogIn },
  signUp: { label: "Sign Up", href: "/register", icon: UserPlus },
};

export const iconLinks: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
];

export const mobileQuickLinks: {
  label: string;
  href: string;
  icon: LucideIcon;
  bg: string;
  color: string;
}[] = [
  { label: "Wishlist", href: "/wishlist", icon: Heart, bg: "bg-red-50", color: "text-red-500" },
  { label: "Cart", href: "/cart", icon: ShoppingCart, bg: "bg-green-50", color: "text-green-600" },
];