"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { changePasswordAction } from "@/actions/user.actions";
import { changePasswordSchema } from "@/lib/schemas/account.schema";

function PasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  helper,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  helper?: string;
  autoComplete: "current-password" | "new-password";
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-base text-gray-800 placeholder-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      {helper && <p className="text-xs text-gray-500">{helper}</p>}
    </div>
  );
}

export function ChangePasswordCard() {
  const [form, setForm] = useState({
    currentPassword: "",
    password: "",
    rePassword: "",
  });
  const [loading, setLoading] = useState(false);

  const setField = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = changePasswordSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const result = await changePasswordAction(parsed.data);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success("Password updated. Please sign in again.");
      await signOut({ callbackUrl: "/login" });
    } catch {
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
          <Lock className="h-6 w-6 text-orange-500" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">Change Password</h3>
          <p className="text-sm text-gray-500">Update your account password</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <PasswordInput
          id="current-password"
          label="Current Password"
          value={form.currentPassword}
          onChange={setField("currentPassword")}
          placeholder="Enter your current password"
          autoComplete="current-password"
        />
        <PasswordInput
          id="new-password"
          label="New Password"
          value={form.password}
          onChange={setField("password")}
          placeholder="Enter your new password"
          helper="Must be at least 6 characters"
          autoComplete="new-password"
        />
        <PasswordInput
          id="confirm-password"
          label="Confirm New Password"
          value={form.rePassword}
          onChange={setField("rePassword")}
          placeholder="Confirm your new password"
          autoComplete="new-password"
        />

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-md shadow-orange-500/25 transition hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
            Change Password
          </button>
        </div>
      </form>
    </section>
  );
}