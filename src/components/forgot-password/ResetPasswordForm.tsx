"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ResetSteps from "./ResetSteps";
import { resetPassword } from "@/services/auth.services";

export default function ResetPasswordForm({ email }: { email: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const data = await resetPassword(email, password);

      if (data?.token || data?.statusMsg === "success") {
        toast.success("Password reset! Please sign in.");
        router.push("/login");
      } else {
        setError(data?.message ?? "Could not reset password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-6 sm:p-10 flex flex-col gap-8">
      <div className="text-center space-y-2">
        <Link href="/" className="inline-block text-3xl font-bold text-[#16A34A]">
          FreshCart
        </Link>
        <h1 className="text-2xl font-bold text-[#1E2939]">Set New Password</h1>
        <p className="text-base text-[#4A5565]">
          Choose a strong password to secure your account
        </p>
      </div>

      <ResetSteps current="lock" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="new-pass" className="block text-sm font-semibold text-[#364153]">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99A1AF]" />
            <input
              id="new-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#E5E7EB] focus:border-[#16A34A] focus:outline-none transition text-[#364153] placeholder:text-[#364153]/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirm-pass" className="block text-sm font-semibold text-[#364153]">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99A1AF]" />
            <input
              id="confirm-pass"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#E5E7EB] focus:border-[#16A34A] focus:outline-none transition text-[#364153] placeholder:text-[#364153]/50"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-70 text-white font-semibold text-lg py-3 rounded-xl shadow-lg transition"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </section>
  );
}