"use server";
import {
  addProductToWishlist,
  getLoggedUserWishlist,
  removeProductFromWishlist,
} from "@/services/wishlist.service";

export async function addToWishlistAction(productId: string) {
  return addProductToWishlist(productId);
}

export async function getWishlistAction() {
  return getLoggedUserWishlist();
}

export async function removeFromWishlistAction(productId: string) {
  return removeProductFromWishlist(productId);
}