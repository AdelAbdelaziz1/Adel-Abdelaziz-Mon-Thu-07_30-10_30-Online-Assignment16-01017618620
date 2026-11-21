import { redirect } from "next/navigation";
import BrandPanel from "@/components/forgot-password/BrandPanel";
import ResetPasswordForm from "@/components/forgot-password/ResetPasswordForm";

export const metadata = {
  title: "Reset Password | FreshCart",
  description: "Set a new password for your account",
};

export default async function ResetPasswordPage({
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
        <ResetPasswordForm email={email} />
      </div>
    </main>
  );
}