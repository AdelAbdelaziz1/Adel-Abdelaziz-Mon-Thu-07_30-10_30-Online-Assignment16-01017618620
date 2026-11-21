import { cache } from "react";
import { BrandI } from "@/types/brand.type";

const baseUrl = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

export type BrandsResponse = {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: BrandI[];
};

export default async function getAllBrands(
  page: number = 1,
  limit: number = 40
): Promise<BrandsResponse> {
  const url = `${baseUrl}/api/v1/brands?page=${page}&limit=${limit}`;

  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error(`Error fetching brands: ${response.status}`);
  }

  return response.json();
}

export const getBrandBySlug = cache(
  async (slug: string): Promise<BrandI | null> => {
    const { data } = await getAllBrands(1, 100);
    return data.find((b) => b.slug === slug) ?? null;
  }
);

export async function getBrandById(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Brand not found");
  const json = await res.json();
  return json.data;
}