import Link from "next/link";
import Image from "next/image";

function ProductCardProfile({ product }) {
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
          />
          <div className="p-2 text-xs flex justify-between items-baseline">
            <h2 className="font-bold">{product.name}</h2>
            <span className="font-medium">Quantity: {product.quantity}</span>
            <span className="font-medium">Price: ${product.price}</span>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default ProductCardProfile;
