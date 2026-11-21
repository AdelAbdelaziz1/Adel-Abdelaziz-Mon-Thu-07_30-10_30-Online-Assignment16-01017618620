"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ResetSteps from "./ResetSteps";
import { forgotPassword } from "@/services/auth.services";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const data = await forgotPassword(cleanEmail);

      if (data?.statusMsg === "success" || data?.message === "success") {
        toast.success("Reset code sent!");
        router.push(`/verify-code?email=${encodeURIComponent(cleanEmail)}`);
      } else {
        setError(data?.message ?? "Could not send reset code.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex w-full flex-col gap-8 rounded-2xl bg-white p-6 shadow-xl sm:p-10 lg:w-1/2">
      <div className="space-y-2 text-center">
        <Link href="/" className="inline-block text-3xl font-bold text-[#16A34A]">
          FreshCart
        </Link>
        <h1 className="text-2xl font-bold text-[#1E2939]">Forgot Password?</h1>
        <p className="text-base text-[#4A5565]">
          No worries, we&apos;ll send you a reset code
        </p>
      </div>

      <ResetSteps current="email" />

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-[#364153]">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-5 -translate-y-1/2 text-[#99A1AF]" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!error}
              className="w-full rounded-xl border-2 border-[#E5E7EB] py-3 pl-12 pr-4 text-[#364153] transition placeholder:text-[#364153]/50 focus:border-[#16A34A] focus:outline-none"
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-[#15803D] disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Reset Code"
          )}
        </button>

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#16A34A] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>
        </div>
      </form>
    </section>
  );
}