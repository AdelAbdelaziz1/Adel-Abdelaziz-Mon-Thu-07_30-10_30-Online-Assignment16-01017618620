import { notFound } from "next/navigation";
import { getProductDetails } from "@/services/product.service";
import { ProductDetailsI } from "@/types/productDetails.type";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  RotateCcw, Share2, ShieldCheck, Star, Truck, Zap,
} from "lucide-react";
import ProductSlider from "@/components/products/productSlider";
import ProductTabs from "@/components/products/productTabs";
import AddToCartBtn from "@/components/cart/addToCartBtn";
import WishlistButton from "@/components/wishlist/WishlistButton";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  let product: ProductDetailsI | undefined;
  try {
    const response = await getProductDetails(productId);
    product = response?.data;
  } catch {
    product = undefined;
  }

  if (!product) notFound();

  const inStock = product.quantity > 0;

  return (
    <div className="container mx-auto my-5 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="font-black">
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="py-5">
        <div className="flex flex-col gap-8 lg:flex-row">
          <ProductSlider images={product.images} />

          <div className="min-w-0 lg:w-3/4">
            <Card className="gap-0 rounded-xl py-0 shadow-sm ring-0">
              <CardContent className="flex flex-col gap-6 p-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                      {product.category?.name}
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                      {product.brand?.name}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h1 className="font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
                      {product.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3">
                      <div
                        className="flex items-center text-yellow-400"
                        aria-label={`${product.ratingsAverage} out of 5 stars`}
                      >
                        {[0, 1, 2, 3, 4].map((star) => (
                          <Star
                            key={star}
                            className={`size-5 ${
                              star < Math.floor(product.ratingsAverage) ? "fill-current" : ""
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {product.ratingsAverage.toFixed(1)} ({product.ratingsQuantity} reviews)
                      </span>
                    </div>
                  </div>

                  <p className="font-heading text-3xl font-bold text-gray-900">
                    {product.price} EGP
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${
                      inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                    }`}
                  >
                    <span className={`size-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
                    {inStock ? "In Stock" : "Out of Stock"}
                  </span>
                  {inStock && (
                    <span className="text-sm font-medium text-gray-500">
                      {product.quantity} available
                    </span>
                  )}
                </div>

                <div className="space-y-5">
                  <Separator className="bg-gray-100" />
                  <p className="text-base font-medium leading-relaxed text-gray-600">
                    {product.description}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <AddToCartBtn productId={product._id} variant="full" disabled={!inStock} />
                  <Button
                    size="lg"
                    className="h-[52px] gap-2 rounded-xl bg-gray-900 text-base font-medium text-white hover:bg-gray-800"
                    disabled={!inStock}
                  >
                    <Zap />
                    Buy Now
                  </Button>
                </div>

                <div className="flex gap-3">
                  <WishlistButton productId={product._id} variant="full" />
                  <Button
                    variant="outline"
                    size="icon-lg"
                    className="h-[52px] w-14 rounded-xl border-2 border-gray-200 text-gray-700"
                    aria-label="Share product"
                  >
                    <Share2 />
                  </Button>
                </div>

                <Separator className="bg-gray-100" />

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Truck className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                      <p className="text-xs font-medium text-gray-500">On all orders</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <RotateCcw className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">30 Days Return</p>
                      <p className="text-xs font-medium text-gray-500">Money back</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <ShieldCheck className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                      <p className="text-xs font-medium text-gray-500">100% Protected</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ProductTabs
        description={product.description}
        category={product.category?.name}
        subcategory={product.subcategory?.[0]?.name}
        brand={product.brand?.name}
        sold={product.sold ?? 0}
      />
    </div>
  );
}