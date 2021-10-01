const { useState } = require("react");
import { useRouter } from "next/router";
import Button from "./Button";
import { useAddToCart } from "../hooks/cart";

function AddToCart({ productId }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToCartLoading } = useAddToCart();

  const handleClick = async () => {
    await addToCart(productId, quantity);
    //router.push("/cart");
  };

  return (
    <div className="py-2">
      <input
        type="number"
        min="1"
        className="border rounded px-3 py-1 mr-2 w-16 text-right"
        value={quantity.toString()}
        onChange={(event) => setQuantity(parseInt(event.target.value))}
      />
      {addToCartLoading ? (
        <p>Loading...</p>
      ) : (
        <Button onClick={handleClick}>Add to cart</Button>
      )}
    </div>
  );
}

export default AddToCart;
