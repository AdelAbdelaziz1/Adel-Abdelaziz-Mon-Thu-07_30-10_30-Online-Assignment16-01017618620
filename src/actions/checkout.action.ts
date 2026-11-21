"use server";
import { getOurToken } from "@/lib/auth";

const baseUrl = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

type ShippingAddress = {
  city: string;
  details: string;
  phone: string;
};

export async function onlinePayment(
  cartId: string,
  shippingAddress: ShippingAddress
) {
  const token = await getOurToken();

  if (!token) {
    return { status: "fail", message: "Unauthorized: please login first" };
  }

  try {
    const response = await fetch(
      `${baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token,
          "content-type": "application/json",
        },
        cache: "no-store",
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Online payment failed:", error);
    return { status: "fail", message: "Network error, please try again" };
  }
}

export async function cashPayment(
  cartId: string,
  shippingAddress: ShippingAddress
) {
  const token = await getOurToken();

  if (!token) {
    return { status: "fail", message: "Unauthorized: please login first" };
  }

  try {
    const response = await fetch(`${baseUrl}/api/v2/orders/${cartId}`, {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        token,
        "content-type": "application/json",
      },
      cache: "no-store",
    });

    return await response.json();
  } catch (error) {
    console.error("Cash payment failed:", error);
    return { status: "fail", message: "Network error, please try again" };
  }
}