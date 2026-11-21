import CategorySection from "@/components/common/categorySection";
import PromoBanners from "@/components/common/promoBanners";
import HeroSlider from "@/components/common/heroSlider";
import NewsletterSection from "@/components/common/newsletterSection";
import ProductsSection from "@/components/products/productsSection";
import FeaturesStrip from "@/components/common/featuresStrip";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <main className="mx-auto w-full max-w-[1200px] px-4 py-4">
        <HeroSlider />
        <FeaturesStrip />
        <CategorySection />
        <PromoBanners />
        <ProductsSection
          title="Featured Products"
          viewAllHref="/products"
          limit={10}
          showPagination={false}
        />
        <NewsletterSection />
      </main>
    </div>
  );
}