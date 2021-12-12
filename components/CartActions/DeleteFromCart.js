import { useDeleteItemFromCart } from "../../hooks/cart";

//Logic for the user to delete from their cart
function DeleteFromCart({ productId }) {
  const { removeFromCart, deleteFromCartLoading } = useDeleteItemFromCart();

  const handleClick = async () => {
    await removeFromCart(productId);
  };

  return (
    <div className="py-2">
      {deleteFromCartLoading ? (
        <p>Loading...</p>
      ) : (
        <button className="buttonRed" onClick={handleClick}>
          Remove
        </button>
      )}
    </div>
  );
}

export default DeleteFromCart;
