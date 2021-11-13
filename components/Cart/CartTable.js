import DeleteFromCart from "../CartActions/DeleteFromCart";
import Link from "next/link";
import UpdateCart from "../CartActions/UpdateCart";
import { useRouter } from "next/router";

function formatCurrency(value) {
  return "$" + value.toFixed(2);
}

function CartTable({ cartItems }) {
  const router = useRouter();

  return (
    <>
      {cartItems.data.message && (
        <span className="text-red-600 pl-4">{cartItems.data.message}</span>
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
          {cartItems.data.data.map((cartItem) => (
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
              {formatCurrency(cartItems.data.cartTotal)}
            </th>
          </tr>
        </tfoot>
      </table>
      <div className="flex px-4">
        <Link href={"/checkout"}>
          <button
            disabled={cartItems.data.data.length === 0 ? true : false}
            className={`buttonGreen mr-2 ${
              cartItems.data.data.length === 0 ? "cursor-not-allowed" : null
            }`}
          >
            Review Purchase
          </button>
        </Link>

        <button onClick={() => router.back()} className="buttonGreen">
          Back
        </button>
      </div>
    </>
  );
}

export default CartTable;
