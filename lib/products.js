import { fetchJson } from "../lib/api";

const { API_URL } = process.env;

export async function getProduct(id) {
  const product = await fetchJson(`${API_URL}/product/${id}`);
  return product;
}

export async function getProducts() {
  const products = await fetchJson(`${API_URL}/products`);
  return products;
}
