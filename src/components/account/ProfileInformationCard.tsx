"use client";

import { useEffect, useState } from "react";
import { User, Save, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { updateProfileAction } from "@/actions/user.actions";
import { profileSchema } from "@/lib/schemas/account.schema";

const inputClasses =
  "w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-800 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100";

export function ProfileInformationCard({
  initialName = "",
  initialEmail = "",
  initialPhone = "",
}: {
  initialName?: string;
  initialEmail?: string;
  initialPhone?: string;
}) {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    name: initialName,
    email: initialEmail,
    phone: initialPhone,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = session?.user;
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      name: prev.name || user.name || "",
      email: prev.email || user.email || "",
    }));
  }, [session]);

  const setField = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = profileSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const result = await updateProfileAction(parsed.data);
      if (result.success) {
        toast.success("Profile updated");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
            <User className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Profile Information
            </h3>
            <p className="text-sm text-gray-500">Update your personal details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="profile-name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="profile-name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setField("name")(e.target.value)}
              className={inputClasses}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="profile-email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="profile-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setField("email")(e.target.value)}
              placeholder="Enter your email"
              className={inputClasses}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="profile-phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="profile-phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => setField("phone")(e.target.value)}
              placeholder="01xxxxxxxxx"
              className={inputClasses}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-md shadow-green-600/25 transition hover:bg-green-700 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}