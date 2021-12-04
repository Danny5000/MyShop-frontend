import { useState, useEffect } from "react";
import { getProducts } from "../lib/products";
import ProductCard from "../components/ProductCards/ProductCard";
import Page from "../components/PageTemplates/Page";

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS), //seconds
  };
}

function HomePage({ products }) {
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState(products);
  const [isNextPageEmpty, setIsNextPageEmpty] = useState(false);

  useEffect(async () => {
    const products = await getProducts(page);
    const nextPage = await getProducts(page + 1);

    if (nextPage.data.length === 0) {
      setIsNextPageEmpty(true);
    } else {
      setIsNextPageEmpty(false);
    }

    setAllProducts(products);
  }, [page]);

  const handleForward = () => {
    setPage(page + 1);
  };

  const handleBack = () => {
    if (page <= 1) {
      return;
    }
    setPage(page - 1);
  };

  return (
    <>
      <Page title="Products">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allProducts?.data.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <span className="flex items-center pt-4">
          <button
            onClick={handleBack}
            disabled={page === 1}
            className={`buttonGreen ${
              page === 1 ? "cursor-not-allowed" : null
            }`}
          >
            Previous Page
          </button>
          <p className="pl-4 pr-4">{`Page ${page}`}</p>
          <button
            disabled={isNextPageEmpty}
            onClick={handleForward}
            className={`buttonGreen ${
              isNextPageEmpty ? "cursor-not-allowed" : null
            }`}
          >
            Next Page
          </button>
        </span>
      </Page>
    </>
  );
}

export default HomePage;
