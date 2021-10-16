import Link from "next/link";
import Image from "next/image";
import DeleteProduct from "../ProductActions/DeleteProduct";
import UpdateProduct from "../ProductActions/UpdateProduct";
import { useUser } from "../../hooks/user";

function ProductCardProfile({ product }) {
  const user = useUser();
  const prodData = {
    name: product.name,
    description: product.description,
    imageUrl: "",
    price: product.price,
    quantity: product.quantity,
  };
  return (
    <div className="border w-60 shadow hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <a>
          <Image
            className="object-contain"
            src={`${process.env.IMG_URL}/${product.imageUrl}`}
            alt=""
            width={250}
            height={150}
            placeholder="blur"
            blurDataURL={`${process.env.IMG_URL}/${product.imageUrl}`}
          />
          <div className="p-2 text-xs flex justify-between items-baseline">
            <h2 className="font-bold">{product.name}</h2>
            <span className="font-medium">Quantity: {product.quantity}</span>
            <span className="font-medium">Price: ${product.price}</span>
          </div>
        </a>
      </Link>
      {user?.id === product.user ? (
        <div className="flex justify-between pl-2 pr-2">
          <DeleteProduct productId={product.id} />
          <UpdateProduct productId={product.id} productData={prodData} />
        </div>
      ) : null}
    </div>
  );
}

export default ProductCardProfile;
