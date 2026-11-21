"use client";
import { addProductToCart } from "@/actions/cart.actions";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaPlus } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { CartContext } from "@/context/cartContext";

interface AddToCartBtnProps {
  productId: string;
  variant?: "icon" | "full";
  disabled?: boolean;
}

export default function AddToCartBtn({
  productId,
  variant = "icon",
  disabled = false,
}: AddToCartBtnProps) {
  const { handleCart } = useContext(CartContext)!;
  const { status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function addToCart(id: string) {
    if (isLoading) return;

    // المستخدم غير مسجل: نعرض رسالة ثم نحوله لصفحة الدخول
    if (status !== "authenticated") {
      toast.info("Please login first to add products to your cart");
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const response = await addProductToCart(id);

      if (response?.status !== "success") {
        throw new Error(response?.message ?? "Request failed");
      }

      handleCart();
      toast.success(response.message ?? "Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    } finally {
      setIsLoading(false);
    }
  }

  if (variant === "full") {
    return (
      <button
        onClick={() => addToCart(productId)}
        type="button"
        aria-label="Add to cart"
        disabled={isLoading || disabled}
        className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-green-600 text-base font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? <Spinner className="size-5 animate-spin" /> : <ShoppingCart className="size-5" />}
        Add to Cart
      </button>
    );
  }

  return (
    <button
      onClick={() => addToCart(productId)}
      type="button"
      title="Add to cart"
      aria-label="Add to cart"
      disabled={isLoading || disabled}
      className="h-10 w-10 rounded-full flex items-center justify-center transition bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? <Spinner className="h-4 w-4 animate-spin" /> : <FaPlus />}
    </button>
  );
}