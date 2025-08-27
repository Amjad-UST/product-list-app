import type { ProductsResponse } from "../types/product";

const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export const getProduct = async (
  limit: number = 10,
  skip: number = 0,
  term: string | '' = ''
): Promise<ProductsResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/products/search?q=${term}&limit=${limit}&skip=${skip}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const productList: ProductsResponse = await response.json();
    return productList;
  } catch (error) {
    console.error('Error fetching product list:', error);
    return {
      products: [],
      total: 0,
      limit,
      skip,
    };
  }
}