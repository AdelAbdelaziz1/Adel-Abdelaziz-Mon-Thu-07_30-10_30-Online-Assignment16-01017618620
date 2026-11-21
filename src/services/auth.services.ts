import { loginSchemaType, registerSchemaType } from "@/lib/schemas/auth.schema";

const baseUrl = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

export async function SignupUser(formData: registerSchemaType) {
  const response = await fetch(`${baseUrl}/api/v1/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return response.json();
}

export async function SigninUser(formData: loginSchemaType) {
  const response = await fetch(`${baseUrl}/api/v1/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return response.json();
}

export async function forgotPassword(email: string) {
  const response = await fetch(`${baseUrl}/api/v1/auth/forgotPasswords`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return response.json();
}

export async function verifyResetCode(code: string) {
  const response = await fetch(`${baseUrl}/api/v1/auth/verifyResetCode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resetCode: code }),
  });
  return response.json();
}

export async function resetPassword(email: string, newPassword: string) {
  const response = await fetch(`${baseUrl}/api/v1/auth/resetPassword`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword }),
  });
  return response.json();
}