"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Banknote,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  FileText,
  MapPin,
  Package,
  Phone,
  Truck,
} from "lucide-react";

export type OrderStatus = "processing" | "delivered";
export type PaymentMethod = "cash" | "card";

export interface OrderItemView {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface OrderView {
  id: string;
  status: OrderStatus;
  payment: PaymentMethod;
  isPaid: boolean;
  date: string;
  itemsCount: number;
  city: string;
  total: number;
  shipping: number;
  items: OrderItemView[];
  address?: { city: string; details: string; phone: string };
}

const STATUS = {
  processing: {
    label: "Processing",
    Icon: Clock,
    badge: "bg-amber-100 text-amber-700",
  },
  delivered: {
    label: "Delivered",
    Icon: CheckCircle2,
    badge: "bg-green-100 text-green-700",
  },
} as const;

const fmt = (n: number) => n.toLocaleString("en-US");

function OrderCard({
  order,
  open,
  onToggle,
}: {
  order: OrderView;
  open: boolean;
  onToggle: () => void;
}) {
  const status = STATUS[order.status];
  const StatusIcon = status.Icon;
  const PayIcon = order.payment === "card" ? CreditCard : Banknote;
  const panelId = `order-details-${order.id}`;

  const subtotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cover = order.items[0];
  const extraImages = Math.max(order.items.length - 1, 0);

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white transition-shadow ${
        open
          ? "border-green-200 shadow-lg shadow-green-100/50"
          : "border-gray-100 shadow-sm"
      }`}
    >
      {/* ===== Header ===== */}
      <div className="flex gap-4 p-4 sm:gap-5 sm:p-6">
        {/* thumbnail */}
        <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
          <div className="flex h-full w-full items-center justify-center rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-2.5">
            {cover ? (
              <Image
                src={cover.image}
                alt={cover.name}
                width={90}
                height={90}
                className="h-full w-full object-contain"
              />
            ) : (
              <Package className="h-8 w-8 text-gray-300" />
            )}
          </div>
          {extraImages > 0 && (
            <span className="absolute -right-2 -top-2 flex h-7 min-w-7 items-center justify-center rounded-full bg-gray-900 px-1 text-xs font-bold text-white shadow-lg">
              +{extraImages}
            </span>
          )}
        </div>

        {/* info */}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-col gap-2">
            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ${status.badge}`}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {status.label}
            </span>
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <span className="font-medium text-gray-400">#</span>
              {order.id}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              {order.date}
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5 text-gray-400" />
              {order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}
            </span>
            {order.city && (
              <>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  {order.city}
                </span>
              </>
            )}
          </div>

          <p className="mt-auto flex items-baseline gap-1.5 text-gray-900">
            <span className="text-2xl font-bold">{fmt(order.total)}</span>
            <span className="text-sm font-medium text-gray-400">EGP</span>
          </p>
        </div>

        {/* actions */}
        <div className="flex shrink-0 flex-col items-end justify-between">
          <div
            title={order.payment === "card" ? "Paid online" : "Cash on delivery"}
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              order.payment === "card"
                ? "bg-purple-100 text-purple-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <PayIcon className="h-4 w-4" />
            <span className="sr-only">
              {order.payment === "card" ? "Paid online" : "Cash on delivery"}
            </span>
          </div>

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={panelId}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              open
                ? "bg-green-600 text-white shadow-lg shadow-green-600/25 hover:bg-green-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {open ? "Hide" : "Details"}
            {open ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* ===== Expanded details ===== */}
      {open && (
        <div id={panelId} className="border-t border-gray-100 bg-gray-50/50">
          {order.items.length > 0 && (
            <div className="flex flex-col gap-4 p-4 sm:p-6">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <FileText className="h-3.5 w-3.5" />
                </span>
                Order Items
              </h4>

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {item.quantity} × {fmt(item.price)} EGP
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {fmt(item.price * item.quantity)}
                    </p>
                    <p className="text-xs font-medium text-gray-400">EGP</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            className={`grid gap-4 px-4 pb-4 sm:px-6 sm:pb-6 md:grid-cols-2 ${
              order.items.length > 0 ? "" : "pt-4 sm:pt-6"
            }`}
          >
            {order.address && (
              <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  Delivery Address
                </h4>
                <div className="space-y-1.5">
                  <p className="font-medium text-gray-900">
                    {order.address.city}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    {order.address.details}
                  </p>
                  <p className="flex items-center gap-2 pt-1 text-sm font-medium text-gray-600">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    {order.address.phone}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <h4 className="flex items-center justify-between gap-2 text-sm font-semibold text-gray-900">
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500 text-white">
                    <Truck className="h-3.5 w-3.5" />
                  </span>
                  Order Summary
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>
              </h4>
              <div className="space-y-2 text-sm font-medium text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {order.shipping === 0 ? "Free" : `${fmt(order.shipping)} EGP`}
                  </span>
                </div>
                <hr className="my-2 border-amber-200/60" />
                <div className="flex items-center justify-between pt-1">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">
                    {fmt(order.total)} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function OrdersList({ orders }: { orders: OrderView[] }) {
  const [openId, setOpenId] = useState<string | null>(orders[0]?.id ?? null);

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          open={openId === order.id}
          onToggle={() =>
            setOpenId((cur) => (cur === order.id ? null : order.id))
          }
        />
      ))}
    </div>
  );
}