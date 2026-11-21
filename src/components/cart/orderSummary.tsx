"use client";
import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, ShoppingBag, Tag, Truck } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button, buttonVariants } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";
import { CartDataI } from "@/types/cart.type";
import { CartContext } from "@/context/cartContext";

export default function OrderSummary({
  cartData,
  isCheckOut = false,
  isSubmitting = false,
}: {
  cartData: CartDataI;
  isCheckOut?: boolean;
  isSubmitting?: boolean;
}) {
  const { noOfCartItem } = useContext(CartContext)!;

  return (
    <>
      <div className="col-span-12 lg:col-span-4">
        <Card className="gap-0 overflow-hidden rounded-2xl py-0 shadow-sm">
          <div className="bg-primary p-5 text-primary-foreground">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShoppingBag className="size-5" />
              Order Summary
            </h2>
            <p className="mt-1 text-sm">
              {noOfCartItem} {noOfCartItem === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <CardContent className="space-y-4 p-5">
            {isCheckOut ? (
              <>
                {cartData.data.products.map((product) => (
                  <div
                    className="bg-gray-200 rounded-2xl my-2 p-3"
                    key={product._id}
                  >
                    <div className="flex justify-between items-center h-[100px] overflow-y-auto ">
                      <Image
                        className="w-[15%]"
                        src={product.product.imageCover}
                        width={200}
                        height={200}
                        alt={product.product.title}
                      />

                      <div className="flex flex-col">
                        <h2>
                          {product.product.title
                            .split(" ")
                            .slice(0, 2)
                            .join(" ")}
                        </h2>
                        <p>
                          {product.count} x {product.price}
                        </p>
                      </div>
                      <h2 className="font-black">
                        {product.count * product.price} EGP
                      </h2>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="rounded-xl bg-green-50 p-4">
                <p className="flex items-center gap-2 text-sm text-green-700">
                  <Truck className="size-4" />
                  You qualify for free shipping
                </p>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{cartData.data.totalCartPrice} EGP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold">
                {cartData.data.totalCartPrice}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  EGP
                </span>
              </span>
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-12 w-full border-dashed"
            >
              <Tag />
              Apply Promo Code
            </Button>

            {isCheckOut ? (
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner /> : <Lock />}
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            ) : (
              <Link
                href="/checkout"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 w-full gap-2"
                )}
              >
                <Lock className="size-4" />
                Secure Checkout
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}