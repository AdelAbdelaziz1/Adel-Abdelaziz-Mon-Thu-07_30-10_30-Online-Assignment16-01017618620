import PageBreadcrumb from "@/components/wishlist/pageBreadcrumb";
import WishlistClient from "@/components/wishlist/wishlistClient";

export const metadata = {
  title: "My Wishlist | FreshCart",
  description: "Your saved products",
};

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB]/50">
      <section className="bg-white">
        <div className="mx-auto max-w-[1536px] px-4 py-8">
          <PageBreadcrumb
            className="mb-4"
            items={[
              { label: "Home", href: "/" },
              { label: "Wishlist", isCurrent: true },
            ]}
          />

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FEF2F2]">
              <svg
                width="25"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 21s-7.5-4.35-9.6-8.4C.9 9.4 2.6 5.5 6.1 5.1c1.9-.2 3.6.8 4.6 2.2 1-1.4 2.7-2.4 4.6-2.2 3.5.4 5.2 4.3 3.7 7.5C19.5 16.65 12 21 12 21z"
                  fill="#FB2C36"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#101828]">My Wishlist</h1>
              <p className="text-sm font-medium text-[#6A7282]">Your saved products</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1536px] px-4 py-8">
        <WishlistClient />
      </section>
    </main>
  );
}