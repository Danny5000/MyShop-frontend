import Image from "next/image";
import Link from "next/link";
import AddToCart from "../../components/CartActions/AddToCart";
import Page from "../../components/PageTemplates/Page";
import { useUser } from "../../hooks/user";
import { ApiError } from "../../lib/api";
import { getProduct, getProducts } from "../../lib/products";

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.data.map((product) => ({
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
    if ((err instanceof ApiError && err.status == 404) || 500) {
      return { notFound: true };
    }
    throw err;
  }
}

function ProductPage({
  product: {
    data: { id, name, description, imageUrl, price, quantity, userData },
  },
}) {
  const user = useUser();
  return (
    <Page title={name}>
      <div className="flex flex-col lg:flex-row">
        <div>
          <Image
            className="object-contain"
            src={`${process.env.IMG_URL}/${imageUrl}`}
            alt=""
            width={480}
            height={480}
            placeholder="blur"
            blurDataURL={`${process.env.IMG_URL}/${imageUrl}`}
          />
        </div>
        <div className="flex-1 lg:ml-4">
          <p className="text-sm pb-2">{description}</p>
          <p className="text-sm text-blue-900 hover:text-purple-700">
            <Link href={`/users/${userData[0].userName}`}>
              {`Seller: ${userData[0].userName}`}
            </Link>
          </p>
          <div className="inline-flex space-x-7">
            <p className="text-lg font-bold mt-2">${price}</p>
            <p className="text-lg mt-2">Quantity: {quantity}</p>
          </div>
          {user && <AddToCart productId={id} />}
        </div>
      </div>
    </Page>
  );
}

export default ProductPage;
