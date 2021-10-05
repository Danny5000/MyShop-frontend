import Link from "next/link";
import Image from "next/image";

function ProductCard({ product }) {
  return (
    <div className="border w-80 shadow hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <a>
          <Image
            className="object-contain"
            src={`${process.env.IMG_URL}/${product.imageUrl}`}
            alt=""
            width={320}
            height={240}
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
