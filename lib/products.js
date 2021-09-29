import { fetchJson } from "../lib/api";

const { CMS_URL } = process.env;

export async function getProduct(id) {
  const product = await fetchJson(`${CMS_URL}/products/${id}`);
  return stripProduct(product);
}

export async function getProducts() {
  const products = await fetchJson(`${CMS_URL}/products`);
  return products.map((product) => stripProduct(product));
}

function stripProduct({ id, title, description, price, picture }) {
  return {
    id,
    title,
    description,
    price: "$" + price.toFixed(2),
    pictureUrl: CMS_URL + picture.url,
  };
}
