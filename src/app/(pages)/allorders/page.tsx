import Link from "next/link";
import { Package, ShoppingBag } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getUserOrders } from "@/actions/orders.actions";
import OrdersList, { type OrderView } from "@/components/orders/OrdersList";

export const metadata = { title: "My Orders" };

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Cairo",
  });

export default async function AllOrdersPage() {
  const { orders: rawOrders, error } = await getUserOrders();

  const orders: OrderView[] = [...(rawOrders ?? [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .map((order) => ({
      id: String(order.id ?? order._id.slice(-6).toUpperCase()),
      status: order.isDelivered ? "delivered" : "processing",
      payment: order.paymentMethodType === "cash" ? "cash" : "card",
      isPaid: order.isPaid,
      date: formatDate(order.createdAt),
      itemsCount: order.cartItems.reduce((sum, i) => sum + i.count, 0),
      city: order.shippingAddress?.city ?? "",
      total: order.totalOrderPrice,
      shipping: order.shippingPrice ?? 0,
      items: order.cartItems.map((item) => ({
        id: item._id,
        name: item.product.title,
        image: item.product.imageCover,
        quantity: item.count,
        price: item.price,
      })),
      address: order.shippingAddress
        ? {
            city: order.shippingAddress.city,
            details: order.shippingAddress.details,
            phone: order.shippingAddress.phone,
          }
        : undefined,
    }));

  return (
    <div className="container mx-auto my-6 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">My Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="my-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-emerald-600 to-primary text-primary-foreground">
              <Package className="size-6" />
            </span>
            <h1 className="font-heading text-3xl font-bold">My Orders</h1>
          </div>
          <p className="mt-2 text-muted-foreground">
            {orders.length > 0
              ? `You have ${orders.length} ${
                  orders.length === 1 ? "order" : "orders"
                }`
              : "Track and review all your purchases"}
          </p>
        </div>

        {orders.length > 0 && (
          <Link
            href="/products"
            className="flex items-center gap-2 self-start rounded-xl px-4 py-2 text-sm font-medium text-green-600 transition hover:bg-green-50"
          >
            <ShoppingBag className="size-4" />
            Continue Shopping
          </Link>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      {!error && orders.length === 0 && (
        <Card className="rounded-2xl py-0 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <span className="flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ShoppingBag className="size-9" />
            </span>
            <h2 className="text-2xl font-bold">No orders yet</h2>
            <p className="max-w-sm text-muted-foreground">
              When you place an order, it will show up here so you can track it.
            </p>
            <Link href="/" className={cn(buttonVariants({ size: "lg" }), "h-12")}>
              Start Shopping
            </Link>
          </CardContent>
        </Card>
      )}

      {orders.length > 0 && <OrdersList orders={orders} />}
    </div>
  );
}