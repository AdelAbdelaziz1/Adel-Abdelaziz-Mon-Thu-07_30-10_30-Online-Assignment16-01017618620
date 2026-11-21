export interface CartProductDetailsI {
  _id: string;
  title: string;
  imageCover: string;
  category?: { _id: string; name: string };
}

export interface CartProductI {
  _id: string;
  count: number;
  price: number;
  product: CartProductDetailsI;
}

export interface CartDataI {
  status: string;
  message?: string;
  numOfCartItems?: number;
  cartId: string;
  data: {
    _id: string;
    totalCartPrice: number;
    products: CartProductI[];
  };
}