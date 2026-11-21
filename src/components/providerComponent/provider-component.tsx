"use client";
import React from "react";
import Navbar from "@/components/common/navbar";
import { Toaster } from "sonner";
import AuthContextProvider from "@/context/AuthContext";
import CartContextProvider from "@/context/cartContext";
import { WishlistContextProvider } from "@/context/wishlistContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Footer from "../common/footer";

type ProviderComponentProps = {
  children: React.ReactNode;
  categories?: { _id: string; name: string }[];
};

export default function ProviderComponent({
  children,
  categories = [],
}: ProviderComponentProps) {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <Provider store={store}>
            <Navbar categories={categories} />
            <Toaster position="top-right" richColors />
            {children}
            <Footer />
          </Provider>
        </WishlistContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}