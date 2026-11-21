import { getOurToken } from "@/lib/auth";
import { WishlistDataI, WishlistMutationI } from "@/types/wishlist.type";

const baseUrl = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

type BaseResponse = { status: string; message?: string };

async function wishlistRequest<T extends BaseResponse>(
  path: string,
  method: "GET" | "POST" | "DELETE",
  body?: unknown
): Promise<T> {
  const token = await getOurToken();

  if (!token) {
    return { status: "fail", message: "Unauthorized: please login first" } as T;
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/wishlist${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!data) {
      return { status: "fail", message: "Invalid server response" } as T;
    }

    if (!response.ok) {
      return {
        status: "fail",
        message: data.message ?? "Request failed",
      } as T;
    }

    return data as T;
  } catch (error) {
    console.error(`Wishlist request failed (${method} ${path}):`, error);
    return { status: "fail", message: "Network error, please try again" } as T;
  }
}

export async function addProductToWishlist(productId: string) {
  return wishlistRequest<WishlistMutationI>("", "POST", { productId });
}

export async function getLoggedUserWishlist() {
  return wishlistRequest<WishlistDataI>("", "GET");
}

export async function removeProductFromWishlist(productId: string) {
  return wishlistRequest<WishlistMutationI>(`/${productId}`, "DELETE");
}