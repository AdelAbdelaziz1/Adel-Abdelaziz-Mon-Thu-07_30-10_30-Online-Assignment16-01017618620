"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight, PackageOpen, ShoppingCart, Trash2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CartItem from "@/components/cart/cartItem";
import OrderSummary from "@/components/cart/orderSummary";
import { clearUserCart, getLoggedUserCart } from "@/actions/cart.actions";
import { useContext, useEffect, useState } from "react";
import { CartDataI, CartProductI } from "@/types/cart.type";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { CartContext } from "@/context/cartContext";

export default function CartPage() {
  const [products, setProducts] = useState<CartProductI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cartData, setCartData] = useState<CartDataI | null>(null);
  const { handleCart } = useContext(CartContext)!;

  async function clearCart() {
    try {
      const response = await clearUserCart();

      if (response?.status === "fail") {
        throw new Error(response?.message ?? "Request failed");
      }

      setProducts([]);
      setCartData(null);
      handleCart();
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  }

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await getLoggedUserCart();

        if (cancelled) return;

        if (response?.status === "fail" || !response?.data) {
          setProducts([]);
        } else {
          setCartData(response);
          setProducts(response.data.products ?? []);
        }
      } catch (error) {
        if (cancelled) return;
        console.error("Error fetching cart:", error);
        toast.error("Failed to load cart");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <p className="text-lg font-semibold text-muted-foreground">
          Loading...
        </p>
        <Spinner className="ml-2 h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (products.length === 0 || !cartData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
              <PackageOpen className="w-12 h-12 text-gray-300" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Looks like you haven&apos;t added anything to your cart yet.
            <br />
            Start exploring our products!
          </p>

          <Link
            className="inline-flex items-center gap-2 text-white py-3.5 px-8 rounded-xl font-semibold bg-green-600 hover:bg-green-700 transition-all shadow-lg active:scale-[0.98]"
            href="/products"
          >
            Start Shopping
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-6 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">Shopping Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="my-6">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShoppingCart className="size-6" />
          </span>
          <h1 className="font-heading text-3xl font-bold">Shopping Cart</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          You have{" "}
          <span className="font-semibold text-primary">
            {products.length} {products.length === 1 ? "item" : "items"}
          </span>{" "}
          in your cart
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Cart items */}
        <div className="col-span-12 space-y-4 lg:col-span-8">
          {products.map((product) => (
            <CartItem
              key={product._id}
              setProducts={setProducts}
              product={product}
              setCartData={setCartData}
            />
          ))}
          <Separator />

          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="size-4" />
              Continue Shopping
            </Link>
            <Button
              onClick={clearCart}
              variant="ghost"
              className="text-muted-foreground"
            >
              <Trash2 />
              Clear all items
            </Button>
          </div>
        </div>

        {/* Order summary */}
        <OrderSummary cartData={cartData} isCheckOut={false} />
      </div>
    </div>
  );
}