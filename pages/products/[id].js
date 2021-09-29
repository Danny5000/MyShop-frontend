import Image from "next/image";
import AddToCart from "../../components/AddToCart";
import Page from "../../components/Page";
import { useUser } from "../../hooks/user";
import { ApiError } from "../../lib/api";
import { getProduct, getProducts } from "../../lib/products";

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { id } }) {
  try {
    const product = await getProduct(id);
    return {
      props: {
        product,
      },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (err) {
    if (err instanceof ApiError && err.status == 404) {
      return { notFound: true };
    }
    throw err;
  }
}

function ProductPage({
  product: { id, title, description, pictureUrl, price },
}) {
  const user = useUser();
  return (
    <Page title={title}>
      <div className="flex flex-col lg:flex-row">
        <div>
          <Image
            className="object-cover"
            src={pictureUrl}
            alt=""
            width={640}
            height={480}
          />
        </div>
        <div className="flex-1 lg:ml-4">
          <p className="text-sm">{description}</p>
          <p className="text-lg font-bold mt-2">{price}</p>
          {user && <AddToCart productId={id} />}
        </div>
      </div>
    </Page>
  );
}

export default ProductPage;
