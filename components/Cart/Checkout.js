import Link from "next/link";
import { useRouter } from "next/router";
import { useStripeCheckout } from "../../hooks/stripe";
import { loadStripe } from "@stripe/stripe-js";

function formatCurrency(value) {
  return "$" + value.toFixed(2);
}

function Checkout({ cartItems }) {
  const router = useRouter();

  const {
    stripeCheckout,
    stripeCheckoutError,
    stripeCheckoutLoading,
    stripeCheckoutSuccess,
  } = useStripeCheckout();

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await stripeCheckout();
    const stripe = await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);
    stripe.redirectToCheckout({ sessionId: res?.data });
  };

  return (
    <>
      {stripeCheckoutError && (
        <div className="inline-block">
          <p className="text-red-700">`${errMessage}`</p>
        </div>
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
              <td className="px-4 py-2 text-center">{cartItem.quantity}</td>
              <td className="px-4 py-2 text-right">
                {formatCurrency(cartItem.total)}
              </td>
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
      <form onSubmit={submitHandler} className="ml-4">
        <div className="flex">
          <div className="mr-2">
            {stripeCheckoutLoading ? (
              <p>Loading...</p>
            ) : (
              <button
                disabled={
                  stripeCheckoutLoading ||
                  stripeCheckoutSuccess ||
                  cartItems.data.data.length === 0
                }
                className={`buttonGreen ${
                  cartItems.data.data.length === 0 ? "cursor-not-allowed" : null
                }`}
                type="submit"
              >
                Checkout
              </button>
            )}
          </div>
          <button onClick={() => router.back()} className="buttonGreen">
            Back
          </button>

          <Link href={"/"}>
            <button className="buttonGreen ml-2">Home</button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default Checkout;
