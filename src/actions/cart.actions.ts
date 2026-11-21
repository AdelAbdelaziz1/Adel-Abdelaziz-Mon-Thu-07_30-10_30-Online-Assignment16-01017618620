"use server";
import { getOurToken } from "@/lib/auth";

const baseUrl = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

async function cartRequest(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: unknown
) {
  const token = await getOurToken();

  if (!token) {
    return { status: "fail", message: "Unauthorized: please login first" };
  }

  try {
    const response = await fetch(`${baseUrl}/api/v2/cart${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    return await response.json();
  } catch (error) {
    console.error(`Cart request failed (${method} ${path}):`, error);
    return { status: "fail", message: "Network error, please try again" };
  }
}

export async function addProductToCart(productId: string) {
  return cartRequest("", "POST", { productId });
}

export async function getLoggedUserCart() {
  return cartRequest("", "GET");
}

export async function removeProductFromCart(productId: string) {
  return cartRequest(`/${productId}`, "DELETE");
}

export async function updateCartProductQuantity(
  productId: string,
  count: number
) {
  return cartRequest(`/${productId}`, "PUT", { count });
}

export async function clearUserCart() {
  return cartRequest("", "DELETE");
}