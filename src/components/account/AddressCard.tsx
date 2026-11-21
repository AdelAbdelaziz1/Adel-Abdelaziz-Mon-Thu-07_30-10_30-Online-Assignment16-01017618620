"use client";

import { MapPin, Phone, Trash2, Loader2 } from "lucide-react";

export type Address = {
  id: string;
  title: string;
  city: string;
  phone: string;
  details?: string;
};

export function AddressCard({
  address,
  deleting = false,
  onDelete,
}: {
  address: Address;
  deleting?: boolean;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="group relative rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
            <MapPin className="h-5 w-5 text-green-600" />
          </div>

          <div className="min-w-0 space-y-1">
            <h3 className="truncate text-base font-bold text-gray-900">
              {address.title}
            </h3>
            <p className="text-sm font-medium text-gray-700">{address.city}</p>
            {address.details && (
              <p className="text-sm text-gray-500">{address.details}</p>
            )}
            <span className="flex items-center gap-1.5 pt-1 text-sm text-gray-500">
              <Phone className="h-3.5 w-3.5" />
              {address.phone}
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={deleting}
          onClick={() => onDelete(address.id)}
          aria-label={`Delete address ${address.title}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-red-100 hover:text-red-600 disabled:opacity-60"
        >
          {deleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}