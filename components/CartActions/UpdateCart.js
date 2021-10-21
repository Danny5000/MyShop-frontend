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
      <div className="py-2 relative">
        <input
          type="number"
          name="quantity"
          min="1"
          className="border rounded px-3 py-1 mr-2 w-20 text-center"
          value={itemQuantity.toString()}
          onChange={handleChange}
        />
        <div className="absolute whitespace-nowrap bottom-24 right-0 w-68 h-8">
          {updateCartError && <p className="text-red-700">{`${errMessage}`}</p>}
        </div>
      </div>
    </>
  );
}

export default UpdateCart;
