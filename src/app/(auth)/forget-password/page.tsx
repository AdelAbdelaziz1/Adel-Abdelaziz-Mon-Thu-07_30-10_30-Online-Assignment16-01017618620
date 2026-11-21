import Link from "next/link";
import BrandPanel from "@/components/forgot-password/BrandPanel";
import ForgotPasswordForm from "@/components/forgot-password/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password | FreshCart",
  description: "Reset your FreshCart password securely",
};

export default function ForgetPassword() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-12">
        {/* Left: Brand / Illustration Panel */}
        <BrandPanel />

        {/* Right: Form Panel */}
        <ForgotPasswordForm />
      </div>
    </main>
  );
}