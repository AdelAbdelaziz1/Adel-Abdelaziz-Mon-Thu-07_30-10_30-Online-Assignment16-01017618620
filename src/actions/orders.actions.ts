"use server";
import { getOurToken } from "@/lib/auth";
import { OrderI } from "@/types/order.type";

const baseUrl = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

function getUserIdFromToken(token: string): string | null {
  try {
    const payload = token.split(".")[1];
    const json = Buffer.from(payload, "base64url").toString("utf-8");
    return JSON.parse(json).id ?? null;
  } catch {
    return null;
  }
}

export async function getUserOrders(): Promise<{
  orders: OrderI[];
  error?: string;
}> {
  const token = await getOurToken();

  if (!token) {
    return { orders: [], error: "Please login to see your orders" };
  }

  const userId = getUserIdFromToken(token as string);

  if (!userId) {
    return { orders: [], error: "Invalid session, please login again" };
  }

  try {
    const response = await fetch(
      `${baseUrl}/api/v1/orders/user/${userId}`,
      {
        method: "GET",
        headers: { token: token as string },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!Array.isArray(data)) {
      return {
        orders: [],
        error: data?.message ?? "Could not load your orders",
      };
    }

    const orders = (data as OrderI[]).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return { orders };
  } catch (error) {
    console.error("Get orders failed:", error);
    return { orders: [], error: "Network error, please try again" };
  }
}