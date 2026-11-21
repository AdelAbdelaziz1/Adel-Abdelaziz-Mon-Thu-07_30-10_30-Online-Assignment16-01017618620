import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";

export async function getOurToken(): Promise<string | null> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    console.error("[auth] NEXTAUTH_SECRET is missing");
    return null;
  }

  const cookieStore = await cookies();
  const all = cookieStore.getAll();
  console.log(
    "[auth] cookies:",
    all.map((c) => c.name)
  );

  try {
    const decoded = await getToken({
      req: {
        headers: { cookie: cookieStore.toString() },
        cookies: Object.fromEntries(all.map((c) => [c.name, c.value])),
      } as any,
      secret,
      secureCookie: (process.env.NEXTAUTH_URL ?? "").startsWith("https"),
    });

    console.log("[auth] decoded keys:", decoded ? Object.keys(decoded) : null);

    const apiToken = decoded?.token as string | undefined;
    if (!apiToken) {
      console.error("[auth] session exists but has no API token");
      return null;
    }

    return apiToken;
  } catch (error) {
    console.error("[auth] failed to decode:", error);
    return null;
  }
}