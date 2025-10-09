export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}
 
export interface ProductsResponse {
  products: Product[],
  total: number,
  skip: number,
  limit: number
}

export interface PropductProps {
  productList:Product[],
}
