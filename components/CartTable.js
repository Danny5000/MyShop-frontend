import DeleteFromCart from "./CartActions/DeleteFromCart";
import Link from "next/link";
import UpdateCart from "./CartActions/UpdateCart";

function formatCurrency(value) {
  return "$" + value.toFixed(2);
}

function CartTable({ cartItems }) {
  return (
    <>
      {cartItems.message && (
        <span className="text-red-600 pl-4">{cartItems.message}</span>
      )}
      <table className="mt-3">
        <thead>
          <tr>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.data.map((cartItem) => (
            <tr key={cartItem.productId}>
              <td className="px-4 py-2 text-blue-500 hover:text-purple-500">
                <Link
                  href={`/products/${cartItem.productId}`}
                  as={`/products/${cartItem.productId}`}
                  to={`/products/${cartItem.productId}`}
                >
                  {cartItem.productName}
                </Link>
              </td>
              <td className="px-4 py-2 text-right">
                {formatCurrency(cartItem.productPrice)}
              </td>
              <td className="px-4 py-2 text-right">
                <UpdateCart
                  productId={cartItem.productId}
                  quantity={cartItem.quantity}
                />
              </td>
              <td className="px-4 py-2 text-right">
                {formatCurrency(cartItem.total)}
              </td>
              <td>{<DeleteFromCart productId={cartItem.productId} />}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th className="px-4 py-2 text-left">Total</th>
            <th></th>
            <th></th>
            <th className="px-4 py-2 text-right">
              {formatCurrency(cartItems.cartTotal)}
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default CartTable;
