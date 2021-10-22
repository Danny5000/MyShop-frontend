const { useState } = require("react");
import { useRouter } from "next/router";
import { useAddToCart } from "../../hooks/cart";

function AddToCart({ productId }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const {
    addToCart,
    addToCartSuccess,
    addToCartLoading,
    addToCartError,
    errMessage,
  } = useAddToCart();

  const handleClick = async () => {
    await addToCart(productId, quantity);
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
        <button className="buttonGreen" onClick={handleClick}>
          Add to cart
        </button>
      )}
      {addToCartSuccess && (
        <p className="text-green-700">{`Item added to cart.`}</p>
      )}
      {addToCartError && <p className="text-red-700">{`${errMessage}`}</p>}
    </div>
  );
}

export default AddToCart;
