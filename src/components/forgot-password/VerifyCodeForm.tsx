"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import ResetSteps from "./ResetSteps";
import { forgotPassword, verifyResetCode } from "@/services/auth.services";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN = 30;

const emptyCode = () => Array<string>(CODE_LENGTH).fill("");

export default function VerifyCodeForm({ email }: { email: string }) {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(emptyCode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError(null);
    if (value && index < CODE_LENGTH - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < CODE_LENGTH - 1)
      inputsRef.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const newCode = emptyCode();
    pasted.split("").forEach((d, i) => (newCode[i] = d));
    setCode(newCode);
    inputsRef.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const fullCode = code.join("");
    if (fullCode.length !== CODE_LENGTH) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    try {
      setLoading(true);
      const data = await verifyResetCode(fullCode);

      if (data?.status === "Success" || data?.statusMsg === "success") {
        toast.success("Code verified!");
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        setError(data?.message ?? "Invalid or expired code.");
      }
    } catch {
      setError("Invalid or expired code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resending || cooldown > 0) return;
    setResending(true);
    setError(null);
    try {
      const data = await forgotPassword(email);
      if (data?.statusMsg === "success" || data?.message === "success") {
        toast.success("A new code has been sent");
        setCode(emptyCode());
        inputsRef.current[0]?.focus();
        setCooldown(RESEND_COOLDOWN);
      } else {
        toast.error(data?.message ?? "Could not resend the code.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <section className="flex w-full flex-col gap-8 rounded-2xl bg-white p-6 shadow-xl sm:p-10 lg:w-1/2">
      <div className="space-y-2 text-center">
        <Link href="/" className="inline-block text-3xl font-bold text-[#16A34A]">
          FreshCart
        </Link>
        <h1 className="text-2xl font-bold text-[#1E2939]">Check Your Email</h1>
        <p className="text-base text-[#4A5565]">
          Enter the 6-digit code sent to{" "}
          <span className="font-medium text-[#364153]">{email}</span>
        </p>
      </div>

      <ResetSteps current="key" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#364153]">
            Verification Code
          </label>

          <div className="relative">
            <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#E5E7EB] px-4 py-3 transition focus-within:border-[#16A34A] sm:gap-3">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputsRef.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={idx === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                  className="h-9 w-9 bg-transparent text-center text-xl font-semibold text-[#364153] caret-[#16A34A] focus:outline-none sm:h-10 sm:w-10"
                  aria-label={`Digit ${idx + 1}`}
                />
              ))}
            </div>
            <ShieldCheck className="absolute -bottom-1 -left-1 h-4 w-4 bg-white text-[#99A1AF]" />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>

        <p className="flex items-center justify-center gap-1.5 text-sm text-[#6A7282]">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resending || cooldown > 0}
            className="font-semibold text-[#16A34A] hover:underline disabled:opacity-60 disabled:no-underline"
          >
            {resending
              ? "Sending..."
              : cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Resend Code"}
          </button>
        </p>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-[#15803D] disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Code"
          )}
        </button>

        <div className="text-center">
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6A7282] transition hover:text-[#16A34A]"
          >
            <ArrowLeft className="h-4 w-4" />
            Change email address
          </Link>
        </div>
      </form>
    </section>
  );
}