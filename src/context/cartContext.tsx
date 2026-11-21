"use client";
import { getLoggedUserCart } from "@/actions/cart.actions";
import { CartDataI } from "@/types/cart.type";
import { useSession } from "next-auth/react";
import React, { createContext, useCallback, useEffect, useState } from "react";

type CartContextType = {
  noOfCartItem: number;
  handleCart: () => Promise<void>;
};

export const CartContext = createContext<CartContextType | null>(null);

function getCount(response: CartDataI): number {
  const products = response?.data?.products;
  if (Array.isArray(products)) {
    return products.reduce((sum, p) => sum + Number(p.count ?? 0), 0);
  }
  return response?.numOfCartItems ?? 0;
}

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartCount, setCartCount] = useState<number>(0);
  const { status } = useSession();

  const handleCart = useCallback(async () => {
    try {
      const response: CartDataI = await getLoggedUserCart();
      setCartCount(getCount(response));
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  }, []);

  useEffect(() => {
    if (status !== "authenticated") return;

    let cancelled = false;

    (async () => {
      try {
        const response: CartDataI = await getLoggedUserCart();
        if (!cancelled) {
          setCartCount(getCount(response));
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status]);

  const noOfCartItem = status === "authenticated" ? cartCount : 0;

  return (
    <CartContext.Provider value={{ noOfCartItem, handleCart }}>
      {children}
    </CartContext.Provider>
  );
}