import { cache } from "react";
import { ProductI } from "@/types/product.type";

const baseUrl = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

export default async function getAllProducts() {
  const response = await fetch(`${baseUrl}/api/v1/products`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(`Error fetching products: ${response.status}`);
  }
  return response.json();
}

export const getProductDetails = cache(async (productId: string) => {
  const response = await fetch(`${baseUrl}/api/v1/products/${productId}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(`Error fetching product details: ${response.status}`);
  }
  return response.json();
});

export async function getProductsByCategory(
  categoryId: string
): Promise<ProductI[]> {
  const url = `${baseUrl}/api/v1/products?category[in]=${categoryId}&limit=100`;

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Error fetching products by category: ${response.status}`);
  }

  const json: { data: ProductI[] } = await response.json();
  return json.data.filter((p) => p.category?._id === categoryId);
}


export async function getProductsByBrand(
  brandId: string
): Promise<ProductI[]> {
  const url = `${baseUrl}/api/v1/products?brand=${brandId}&limit=100`;

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Error fetching products by brand: ${response.status}`);
  }

  const json: { data: ProductI[] } = await response.json();
  return json.data.filter((p) => p.brand?._id === brandId);
}