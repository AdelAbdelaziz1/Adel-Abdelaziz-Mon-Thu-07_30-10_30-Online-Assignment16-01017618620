const baseUrl = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface CategoriesResponse {
  results: number;
  data: Category[];
}

export async function getAllCategories(): Promise<Category[]> {
  const res = await fetch(`${baseUrl}/api/v1/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  const json: CategoriesResponse = await res.json();
  return json.data;
}

export async function getCategoryById(id: string): Promise<Category> {
  const res = await fetch(`${baseUrl}/api/v1/categories/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch category");
  const json: { data: Category } = await res.json();
  return json.data;
}