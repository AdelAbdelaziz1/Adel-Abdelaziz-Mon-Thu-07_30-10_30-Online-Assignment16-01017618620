import { redirect } from "next/navigation";
import BrandPanel from "@/components/forgot-password/BrandPanel";
import VerifyCodeForm from "@/components/forgot-password/VerifyCodeForm";

export const metadata = {
  title: "Check Your Email | FreshCart",
  description: "Enter the 6-digit code sent to your email",
};

export default async function VerifyCodePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  if (!email) redirect("/forgot-password");

  return (
    <main className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-12">
        <BrandPanel />
        <VerifyCodeForm email={email} />
      </div>
    </main>
  );
}