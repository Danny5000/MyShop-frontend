import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Field from "../Field";
import Input from "../Input";
import { useCheckout } from "../../hooks/checkout";

function formatCurrency(value) {
  return "$" + value.toFixed(2);
}

function Checkout({ cartItems }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const {
    checkout,
    checkoutLoading,
    checkoutSuccess,
    checkoutError,
    errMessage,
  } = useCheckout();

  const changeHandler = (e) => {
    setFormData((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await checkout(formData);
    if (res) {
      router.push("/order-history");
      //router.reload(window.location.pathname);
    }
  };

  return (
    <>
      {cartItems.message && (
        <span className="text-red-600 pl-4">{cartItems.message}</span>
      )}
      <div className="inline-block">
        {checkoutError && <p className="text-red-700">{`${errMessage}`}</p>}
      </div>
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
        <Field label="Name">
          <Input
            required
            placeholder="Enter your full name."
            name="name"
            onChange={changeHandler}
          />
        </Field>
        <Field label="Street Address">
          <Input
            required
            placeholder="Please enter a valid street address."
            name="streetAddress"
            onChange={changeHandler}
          />
        </Field>
        <Field label="City">
          <Input
            placeholder="Please enter a valid city name."
            required
            name="city"
            onChange={changeHandler}
          />
        </Field>
        <Field label="State">
          <Input
            placeholder="Please enter a valid state."
            required
            name="state"
            onChange={changeHandler}
          />
        </Field>
        <Field label="Zip Code">
          <Input
            placeholder="Please enter a valid zip code."
            required
            name="zipCode"
            onChange={changeHandler}
          />
        </Field>

        <div className="flex px-4">
          <div className="mr-2">
            {checkoutLoading ? (
              <p>Loading...</p>
            ) : (
              <button
                disabled={
                  checkoutLoading ||
                  checkoutSuccess ||
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
        </div>
      </form>

      <button onClick={() => router.back()} className="buttonGreen">
        Back
      </button>

      <Link href={"/"}>
        <button className="buttonGreen ml-2">Home</button>
      </Link>
    </>
  );
}

export default Checkout;
