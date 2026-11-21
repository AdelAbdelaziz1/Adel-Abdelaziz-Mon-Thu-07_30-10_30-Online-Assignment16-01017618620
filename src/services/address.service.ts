import { getOurToken } from "@/lib/auth";
import { AddressI } from "@/types/address.type";

const baseUrl = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

async function addressRequest(
  path: string,
  method: "GET" | "POST" | "DELETE",
  body?: unknown
) {
  const token = await getOurToken();
  if (!token) {
    return { status: "fail", message: "Unauthorized: please login first" };
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/addresses${path}`, {
      method,
      headers: { "Content-Type": "application/json", token },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    console.error(`Address request failed (${method} ${path}):`, error);
    return { status: "fail", message: "Network error, please try again" };
  }
}

export async function getUserAddresses() {
  return addressRequest("", "GET");
}

export async function addUserAddress(address: Omit<AddressI, "_id">) {
  return addressRequest("", "POST", address);
}

export async function removeUserAddress(id: string) {
  return addressRequest(`/${id}`, "DELETE");
}