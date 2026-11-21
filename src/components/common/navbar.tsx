"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/freshcart-logo.svg";
import { ChevronDown, Headset, LogOut, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  navLinks,
  promoItems,
  contactInfo,
  authLinks,
  iconLinks,
  mobileQuickLinks,
} from "@/lib/nav-links";
import { signOut, useSession } from "next-auth/react";
import { Spinner } from "../ui/spinner";
import { Badge } from "../ui/badge";
import { CartContext } from "@/context/cartContext";
import { useWishlist } from "@/context/wishlistContext";

const CART_HREF = "/cart";
const WISHLIST_HREF = "/wishlist";
const SEARCH_HREF = "/products";

type CategoryItem = {
  _id: string;
  name: string;
};

type NavbarProps = {
  categories?: CategoryItem[];
};

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex shrink-0 items-center gap-2">
      <Image
        src={logo}
        alt="FreshCart"
        width={160}
        height={31}
        priority
        className="h-6 w-auto lg:h-8"
      />
    </Link>
  );
}

function CountBadge({ count, className = "" }: { count: number; className?: string }) {
  if (count <= 0) return null;
  return (
    <Badge
      variant="default"
      className={`absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px] text-white ${className}`}
    >
      {count > 99 ? "99+" : count}
    </Badge>
  );
}

export default function Navbar({ categories = [] }: NavbarProps) {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [query, setQuery] = useState("");
  const { noOfCartItem } = useContext(CartContext)!;
  const { count: wishlistCount } = useWishlist();

  const links = useMemo(
    () =>
      navLinks.map((link) =>
        link.href === "/categories" || link.label === "Categories"
          ? {
              ...link,
              children: categories.map((c) => ({
                label: c.name,
                href: `/categories/${c._id}`,
              })),
            }
          : link
      ),
    [categories]
  );

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  const badgeCountFor = (href: string) => {
    if (!isAuthenticated) return 0;
    if (href === CART_HREF) return noOfCartItem;
    if (href === WISHLIST_HREF) return wishlistCount;
    return 0;
  };
  const badgeColorFor = (href: string) =>
    href === WISHLIST_HREF ? "bg-red-500" : "bg-green-600";

  function signoutUser() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`${SEARCH_HREF}?keyword=${encodeURIComponent(q)}`);
    setOpen(false);
  }

  const isActive = (href: string) => {
    if (!href || href === "#") return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);
  const SignInIcon = authLinks.signIn.icon;
  const SignUpIcon = authLinks.signUp.icon;
  const PhoneIcon = contactInfo.phone.icon;
  const MailIcon = contactInfo.email.icon;

  return (
    <>
      <div className="hidden border-b border-gray-100 text-sm lg:block">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-10 items-center justify-between">
            <div className="flex items-center gap-6 text-gray-500">
              {promoItems.map(({ label, icon: Icon }) => (
                <span key={label} className="flex items-center gap-2">
                  <Icon className="size-3.5 text-green-600" />
                  <span>{label}</span>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-gray-500">
                <a
                  href={contactInfo.phone.href}
                  className="flex items-center gap-1.5 transition-colors hover:text-green-600"
                >
                  <PhoneIcon className="size-3.5" />
                  <span>{contactInfo.phone.label}</span>
                </a>
                <a
                  href={contactInfo.email.href}
                  className="flex items-center gap-1.5 transition-colors hover:text-green-600"
                >
                  <MailIcon className="size-3.5" />
                  <span>{contactInfo.email.label}</span>
                </a>
              </div>

              {!isAuthenticated && (
                <>
                  <span className="h-4 w-px bg-gray-200" />

                  <div className="flex items-center gap-4">
                    <Link
                      href={authLinks.signIn.href}
                      aria-current={isActive(authLinks.signIn.href) ? "page" : undefined}
                      className={`flex items-center gap-1.5 transition-colors hover:text-green-600 ${
                        isActive(authLinks.signIn.href)
                          ? "font-semibold text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      <SignInIcon className="size-3.5" />
                      <span>{authLinks.signIn.label}</span>
                    </Link>
                    <Link
                      href={authLinks.signUp.href}
                      aria-current={isActive(authLinks.signUp.href) ? "page" : undefined}
                      className={`flex items-center gap-1.5 transition-colors hover:text-green-600 ${
                        isActive(authLinks.signUp.href)
                          ? "font-semibold text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      <SignUpIcon className="size-3.5" />
                      <span>{authLinks.signUp.label}</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-[72px] lg:gap-8">
            <Logo />

            <form
              role="search"
              onSubmit={handleSearch}
              className="hidden max-w-2xl flex-1 lg:flex"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50/50 px-5 py-3 pr-12 text-sm transition-all focus:border-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
                <Button
                  type="submit"
                  size="icon"
                  aria-label="Search"
                  className="absolute right-1.5 top-1/2 size-9 -translate-y-1/2 rounded-full bg-green-600 text-white hover:bg-green-700"
                >
                  <Search className="size-4" />
                </Button>
              </div>
            </form>

            <nav className="hidden items-center gap-6 xl:flex">
              {links.map((link) => {
                const hasChildren = !!link.children && link.children.length > 0;
                const active = hasChildren
                  ? isActive(link.href) || link.children!.some((c) => isActive(c.href))
                  : isActive(link.href);

                const linkClass = `relative font-medium transition-colors hover:text-green-600 ${
                  active
                    ? "text-green-600 after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-green-600"
                    : "text-gray-700"
                }`;

                return hasChildren ? (
                  <div key={link.label} className="group relative">
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-1.5 py-2 ${linkClass}`}
                    >
                      {link.label}
                      <ChevronDown className="size-3 transition-transform group-hover:rotate-180" />
                    </Link>

                    <div className="invisible absolute left-0 top-full pt-1 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <div className="max-h-96 min-w-[200px] overflow-y-auto rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                        {link.children!.map((child) => {
                          const childActive = isActive(child.href);
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              aria-current={childActive ? "page" : undefined}
                              className={`block px-4 py-2.5 transition-colors hover:bg-green-50 hover:text-green-600 ${
                                childActive
                                  ? "bg-green-50 font-medium text-green-600"
                                  : "text-gray-600"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={linkClass}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1 lg:gap-2">
              {/* Support (desktop) */}
              <Link
                href={contactInfo.helpHref}
                className="mr-2 hidden items-center gap-2 border-r border-gray-200 pr-3 transition-opacity hover:opacity-80 lg:flex"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-green-50">
                  <Headset className="size-5 text-green-600" />
                </div>
                <div className="text-xs">
                  <div className="text-gray-400">Support</div>
                  <div className="font-semibold text-gray-700">24/7 Help</div>
                </div>
              </Link>

              {iconLinks.map(({ label, href, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <Button
                    key={label}
                    asChild
                    variant="ghost"
                    size="icon"
                    className={`group relative size-10 rounded-full hover:bg-gray-100 ${
                      active ? "bg-green-50" : ""
                    }`}
                  >
                    <Link
                      href={href}
                      title={label}
                      aria-label={label}
                      aria-current={active ? "page" : undefined}
                    >
                      <Icon
                        className={`size-5 transition-colors group-hover:text-green-600 ${
                          active ? "text-green-600" : "text-gray-500"
                        }`}
                      />
                      <CountBadge
                        count={badgeCountFor(href)}
                        className={badgeColorFor(href)}
                      />
                    </Link>
                  </Button>
                );
              })}

              {isLoading ? (
                <Spinner />
              ) : isAuthenticated ? (
                <Button
                  variant="destructive"
                  onClick={signoutUser}
                  className="ml-2 hidden rounded-full lg:inline-flex"
                >
                  <LogOut className="size-4" />
                  Logout
                </Button>
              ) : (
                <Button
                  asChild
                  className="ml-2 hidden h-auto rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-green-600/20 hover:bg-green-700 lg:inline-flex"
                >
                  <Link href={authLinks.signIn.href}>
                    <SignInIcon className="size-3.5" />
                    {authLinks.signIn.label}
                  </Link>
                </Button>
              )}

              <Button
                type="button"
                size="icon"
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen(true)}
                className="ml-1 size-10 rounded-full bg-green-600 text-white hover:bg-green-700 xl:hidden"
              >
                <Menu className="size-5" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-50 transition-[visibility] xl:hidden ${
            open ? "visible" : "pointer-events-none invisible delay-300"
          }`}
          inert={!open}
        >
          <div
            onClick={close}
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Panel */}
          <aside
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className={`absolute right-0 top-0 flex h-full w-[92%] max-w-sm flex-col overflow-y-auto bg-white shadow-xl transition-transform duration-300 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <Logo onClick={close} />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label="Close menu"
                onClick={close}
                className="size-11 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <X className="size-5" />
              </Button>
            </div>

            {/* Search */}
            <div className="border-b border-gray-100 px-5 py-4">
              <form
                role="search"
                onSubmit={handleSearch}
                className="flex h-12 items-center rounded-full border border-gray-200 bg-gray-50 pl-5 pr-1.5"
              >
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="h-full w-full bg-transparent text-[15px] text-gray-700 outline-none placeholder:text-gray-400"
                />
                <Button
                  type="submit"
                  size="icon"
                  aria-label="Search"
                  className="size-9 shrink-0 rounded-full bg-green-600 text-white hover:bg-green-700"
                >
                  <Search className="size-4" />
                </Button>
              </form>
            </div>

            {/* Links */}
            <nav className="px-5 py-3">
              {links.map((link) => {
                const hasChildren = !!link.children && link.children.length > 0;
                const active = hasChildren
                  ? isActive(link.href) || link.children!.some((c) => isActive(c.href))
                  : isActive(link.href);

                return (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`block border-l-4 py-4 pl-3 text-[17px] font-medium transition-colors hover:text-green-600 ${
                        active
                          ? "border-green-600 bg-green-50/60 text-green-600"
                          : "border-transparent text-slate-700"
                      }`}
                    >
                      {link.label}
                    </Link>

                    {hasChildren && (
                      <div className="mb-2 ml-4 border-l border-gray-100 pl-3">
                        {link.children!.map((child) => {
                          const childActive = isActive(child.href);
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={close}
                              aria-current={childActive ? "page" : undefined}
                              className={`block py-2.5 text-[15px] transition-colors hover:text-green-600 ${
                                childActive
                                  ? "font-medium text-green-600"
                                  : "text-slate-500"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Wishlist / Cart */}
            <div className="mx-5 border-t border-gray-100 py-3">
              {mobileQuickLinks.map(({ label, href, icon: Icon, bg, color }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-4 py-3 text-[17px] font-medium ${
                      active ? "text-green-600" : "text-slate-700"
                    }`}
                  >
                    <span
                      className={`relative flex size-12 items-center justify-center rounded-full ${bg} ${
                        active ? "ring-2 ring-green-600" : ""
                      }`}
                    >
                      <Icon className={`size-5 ${color}`} />
                      <CountBadge
                        count={badgeCountFor(href)}
                        className={badgeColorFor(href)}
                      />
                    </span>
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Auth buttons */}
            <div className="mx-5 border-t border-gray-100 py-5">
              {isLoading ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : isAuthenticated ? (
                <Button
                  variant="destructive"
                  onClick={() => {
                    close();
                    signoutUser();
                  }}
                  className="h-12 w-full rounded-xl text-base font-semibold"
                >
                  <LogOut className="size-4" />
                  Logout
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    asChild
                    onClick={close}
                    className="h-12 rounded-xl bg-green-600 text-base font-semibold text-white hover:bg-green-700"
                  >
                    <Link href={authLinks.signIn.href}>{authLinks.signIn.label}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    onClick={close}
                    className="h-12 rounded-xl border-2 border-green-600 bg-transparent text-base font-semibold text-green-600 hover:bg-green-50 hover:text-green-600"
                  >
                    <Link href={authLinks.signUp.href}>{authLinks.signUp.label}</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Help card */}
            <div className="mx-5 mb-6 mt-auto flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100">
                <Headset className="size-5 text-green-600" />
              </span>
              <div className="leading-snug">
                <p className="text-sm font-semibold text-slate-800">Need Help?</p>
                <Link
                  href={contactInfo.helpHref}
                  onClick={close}
                  className="text-[15px] font-medium text-green-600 hover:underline"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </header>
    </>
  );
}