"use server";
import {
  addUserAddress,
  getUserAddresses,
  removeUserAddress,
} from "@/services/address.service";
import { AddressI } from "@/types/address.type";

export async function getAddressesAction() {
  return getUserAddresses();
}

export async function addAddressAction(address: Omit<AddressI, "_id">) {
  return addUserAddress(address);
}

export async function removeAddressAction(id: string) {
  return removeUserAddress(id);
}