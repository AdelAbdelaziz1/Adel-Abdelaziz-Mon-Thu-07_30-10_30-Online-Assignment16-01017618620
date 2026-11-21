"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  removeProductFromCart,
  updateCartProductQuantity,
} from "@/actions/cart.actions";
import { CartDataI, CartProductI } from "@/types/cart.type";
import { CartContext } from "@/context/cartContext";

interface CartItemProps {
  product: CartProductI;
  setCartData: (cartData: CartDataI) => void;
  setProducts: Dispatch<SetStateAction<CartProductI[]>>;
}

export default function CartItem({ product, setProducts, setCartData }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { handleCart } = useContext(CartContext)!;

  const unitPrice = Number(product.price ?? 0);
  const quantity = Number(product.count ?? 0);
  const total = unitPrice * quantity;

  async function changeQuantity(newCount: number) {
    if (newCount < 1 || isUpdating) return;
    setIsUpdating(true);
    try {
      const response = await updateCartProductQuantity(
        product.product._id,
        newCount
      );
      if (response?.status !== "success") {
        throw new Error(response?.message ?? "Request failed");
      }

      setCartData(response);

      setProducts((prev) =>
        prev.map((item) =>
          item._id === product._id ? { ...item, count: newCount } : item
        )
      );
      handleCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    } finally {
      setIsUpdating(false);
    }
  }

  async function removeItem() {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const response = await removeProductFromCart(product.product._id);
      if (response?.status !== "success") {
        throw new Error(response?.message ?? "Request failed");
      }

      setCartData(response);
      setProducts((prev) => prev.filter((item) => item._id !== product._id));
      handleCart();
      toast.success("Product removed from cart");
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Failed to remove product");
      setIsUpdating(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="flex gap-4">
        <div className="relative size-28 shrink-0 overflow-hidden rounded-xl bg-muted">
          <Image
            src={product.product.imageCover}
            alt={product.product.title}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold">{product.product.title}</h3>
            <p className="text-sm text-muted-foreground">
              {product.product.category?.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {unitPrice} EGP per unit
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={isUpdating || quantity <= 1}
                onClick={() => changeQuantity(quantity - 1)}
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </Button>

              <span className="w-6 text-center font-semibold">{quantity}</span>

              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={isUpdating}
                onClick={() => changeQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-bold">{total} EGP</p>
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isUpdating}
          onClick={removeItem}
          aria-label="Remove item"
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}