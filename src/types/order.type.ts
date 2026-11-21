export interface OrderItemI {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
}

export interface OrderI {
  _id: string;
  id?: number;
  cartItems: OrderItemI[];
  shippingAddress?: {
    city: string;
    details: string;
    phone: string;
  };
  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}