import { products } from "./productsData";

export async function getProducts() {
  return products;
}

export async function getProductById(id: string) {
  const product = products.find((p) => p.id === Number(id));
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

  