import Link from "next/link";
import Image from "next/image";

//Renders the product cart on the main page
function ProductCard({ product }) {
  const userName = product.userData[0]?.userName;
  return (
    <div className="border w-80 shadow hover:shadow-lg">
      <span className="pl-2 pr-2 bg-gray-100 text-blue-900 flex justify-between font-medium">
        Seller: {userName}
        <Link href={`/users/${product.userData[0].userName}`}>
          View Profile
        </Link>
      </span>
      <Link href={`/products/${product.id}`}>
        <a>
          <Image
            className="object-contain"
            src={`${process.env.IMG_URL}/${product.imageUrl}`}
            alt=""
            width={320}
            height={240}
            placeholder="blur"
            blurDataURL={`${process.env.IMG_URL}/${product.imageUrl}`}
          />
          <div className="p-2 flex justify-between items-baseline">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <span className="font-medium">Quantity: {product.quantity}</span>
            <span className="font-medium">Price: ${product.price}</span>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default ProductCard;
