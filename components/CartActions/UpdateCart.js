const { useState } = require("react");
import { useUpdateCart } from "../../hooks/cart";

function UpdateCart({ productId, quantity }) {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const { updateCart, updateCartError, errMessage } = useUpdateCart();

  const handleChange = async (e) => {
    setItemQuantity(parseInt(e.target.value));
    await updateCart(productId, parseInt(e.target.value));
  };

  return (
    <>
      <div className="relative">
        {updateCartError && (
          <p className="text-red-700 absolute whitespace-nowrap top-12">{`${errMessage}`}</p>
        )}
      </div>
      <div className="py-2">
        <input
          type="number"
          name="quantity"
          min="1"
          className="border rounded px-3 py-1 mr-2 w-20 text-center"
          value={itemQuantity.toString()}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default UpdateCart;
