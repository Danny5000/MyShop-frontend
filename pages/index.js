import { getProducts } from "../lib/products";
import ProductCard from "../components/ProductCard";
import Page from "../components/Page";

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS), //seconds
  };
}

function HomePage({ products }) {
  return (
    <Page title="Indoor Plants">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  );
}

export default HomePage;
