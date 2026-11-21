"use client";

import { useEffect, useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AddressCard } from "./AddressCard";
import {
  addAddressAction,
  getAddressesAction,
  removeAddressAction,
} from "@/actions/address.actions";
import { AddressI } from "@/types/address.type";
import { Spinner } from "@/components/ui/spinner";
import { addressSchema } from "@/lib/schemas/account.schema";

const emptyForm = { name: "", city: "", details: "", phone: "" };

const inputClasses =
  "w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-800 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100";

export function AddressList() {
  const [addresses, setAddresses] = useState<AddressI[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAddressesAction();
        if (Array.isArray(response?.data)) setAddresses(response.data);
      } catch {
        toast.error("Failed to load addresses");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const setField = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    const parsed = addressSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setSaving(true);
    try {
      const response = await addAddressAction(parsed.data);
      if (response?.status !== "success") {
        throw new Error(response?.message ?? "Request failed");
      }
      // الـ API بيرجّع كل العناوين بعد الإضافة
      if (Array.isArray(response.data)) setAddresses(response.data);
      setForm(emptyForm);
      setShowForm(false);
      toast.success("Address added");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add address"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const response = await removeAddressAction(id);
      if (response?.status !== "success") {
        throw new Error(response?.message ?? "Request failed");
      }
      setAddresses((prev) => prev.filter((a) => a._id !== id));
      toast.success("Address removed");
    } catch {
      toast.error("Failed to remove address");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your saved delivery addresses
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm((s) => !s)}
          aria-expanded={showForm}
          className="inline-flex items-center gap-2 self-start rounded-xl bg-green-600 px-5 py-2.5 text-base font-semibold text-white shadow-md shadow-green-600/25 transition hover:bg-green-700 sm:self-auto"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Address"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="grid gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2"
        >
          <div className="space-y-2">
            <label htmlFor="addr-name" className="block text-sm font-medium text-gray-700">
              Address Name
            </label>
            <input
              id="addr-name"
              value={form.name}
              onChange={(e) => setField("name")(e.target.value)}
              placeholder="Home, Work..."
              className={inputClasses}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="addr-city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              id="addr-city"
              value={form.city}
              onChange={(e) => setField("city")(e.target.value)}
              placeholder="Mansoura"
              className={inputClasses}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="addr-details" className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              id="addr-details"
              value={form.details}
              onChange={(e) => setField("details")(e.target.value)}
              placeholder="Street, building, floor"
              className={inputClasses}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="addr-phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="addr-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setField("phone")(e.target.value)}
              placeholder="01xxxxxxxxx"
              className={inputClasses}
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Address
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner className="h-8 w-8 text-green-600" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <p className="text-gray-500">No addresses saved yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={{
                id: address._id,
                title: address.name,
                city: address.city,
                phone: address.phone,
                details: address.details,
              }}
              deleting={deletingId === address._id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}