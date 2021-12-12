import { useState, useEffect } from "react";
import { getProducts } from "../lib/products";
import ProductCard from "../components/ProductCards/ProductCard";
import Page from "../components/PageTemplates/Page";
import Pagination from "../components/UtilityComponents/Pagination";
import Search from "../components/UtilityComponents/Search";

//Renders the index page
export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS), //seconds
  };
}

function HomePage({ products }) {
  //State for search and pagination
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState(products);
  const [isNextPageEmpty, setIsNextPageEmpty] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(async () => {
    //Render products based on pagination and search inputs
    const products = await getProducts(page, searchValue);
    const nextPage = await getProducts(page + 1, searchValue);

    if (nextPage.data.length === 0) {
      setIsNextPageEmpty(true);
    } else {
      setIsNextPageEmpty(false);
    }

    setAllProducts(products);
  }, [page, searchValue]);

  const handleForward = () => {
    setPage(page + 1);
  };

  const handleBack = () => {
    if (page <= 1) {
      return;
    }
    setPage(page - 1);
  };

  const handleSearch = async (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Page title="Products">
        <Search searchValue={searchValue} handleSearch={handleSearch} />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allProducts?.data.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <Pagination
          handleBack={handleBack}
          handleForward={handleForward}
          page={page}
          isNextPageEmpty={isNextPageEmpty}
        />
      </Page>
    </>
  );
}

export default HomePage;
