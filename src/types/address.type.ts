export interface AddressI {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressesResponseI {
  status: string;
  message?: string;
  results?: number;
  data: AddressI[];
}