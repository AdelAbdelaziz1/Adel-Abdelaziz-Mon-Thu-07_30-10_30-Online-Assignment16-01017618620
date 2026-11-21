export interface WishlistProductI {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category?: { _id: string; name: string; slug?: string };
  brand?: { _id: string; name: string; slug?: string };
}

interface BaseResponseI {
  status: string;
  message?: string;
}

export interface WishlistDataI extends BaseResponseI {
  count?: number;
  data?: WishlistProductI[];
}

export interface WishlistMutationI extends BaseResponseI {
  data?: string[];
}