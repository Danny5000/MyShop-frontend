const { useState } = require("react");
import { useUpdateCart } from "../../hooks/cart";

function UpdateCart({ productId, quantity }) {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const { updateCart } = useUpdateCart();

  const handleChange = async (e) => {
    setItemQuantity(parseInt(e.target.value));
    await updateCart(productId, parseInt(e.target.value));
  };

  return (
    <div className="py-2">
      <input
        type="number"
        name="quantity"
        min="1"
        className="border rounded px-3 py-1 mr-2 w-16 text-right"
        value={itemQuantity.toString()}
        onChange={handleChange}
      />
    </div>
  );
}

export default UpdateCart;
