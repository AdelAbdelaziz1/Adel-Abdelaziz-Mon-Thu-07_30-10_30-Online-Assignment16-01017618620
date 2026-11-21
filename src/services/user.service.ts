import { getOurToken } from "@/lib/auth";

const baseUrl = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

export type ServiceResult = { success: boolean; message: string };

async function userRequest(
  path: string,
  method: "PUT",
  body: unknown
): Promise<ServiceResult> {
  const token = await getOurToken();
  if (!token) {
    return { success: false, message: "Unauthorized: please login first" };
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/users${path}`, {
      method,
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const data = await response.json().catch(() => ({}));

    const success = response.ok && data?.message === "success";
    return {
      success,
      message: success ? "success" : data?.message ?? "Request failed",
    };
  } catch (error) {
    console.error(`User request failed (${method} ${path}):`, error);
    return { success: false, message: "Network error, please try again" };
  }
}

export function changeMyPassword(payload: {
  currentPassword: string;
  password: string;
  rePassword: string;
}) {
  return userRequest("/changeMyPassword", "PUT", payload);
}

export function updateMyProfile(payload: {
  name: string;
  email: string;
  phone: string;
}) {
  return userRequest("/updateMe/", "PUT", payload);
}