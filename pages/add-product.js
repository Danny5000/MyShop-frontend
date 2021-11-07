import { useState } from "react";
import { useRouter } from "next/router";
import Field from "../components/Field";
import Input from "../components/Input";
import Page from "../components/PageTemplates/Page";
import { useAddProduct } from "../hooks/product";
import { useUser } from "../hooks/user";
import { useAddSeller } from "../hooks/stripe";
import { useEffect } from "react";

function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    quantity: "",
  });

  const [file, setFile] = useState("");

  const {
    addProduct,
    addProductError,
    addProductLoading,
    errMessage,
    addProductSuccess,
  } = useAddProduct();

  const user = useUser();

  function handleUpload(e) {
    setFile(e.target.files[0]);
  }

  formData.imageUrl = file;

  const changeHandler = (e) => {
    setFormData((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addProduct(formData);
    if (res) {
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
      Array.from(document.querySelectorAll("textarea")).forEach(
        (input) => (input.value = "")
      );
    }
  };

  const {
    addSellerErrMessage,
    // addSellerSuccess,
    addSellerError,
    addSellerLoading,
    addSeller,
  } = useAddSeller();

  const becomeSeller = async () => {
    const res = await addSeller();
    window.location.href = res.data;
  };

  useEffect(() => {
    if (
      performance.getEntriesByType("navigation")[0].type !== "navigate" &&
      performance.getEntriesByType("navigation")[0].type !== "reload"
    ) {
      if (!user) {
        router.push("/");
      }
    }
  }, [user, router]);

  return (
    <Page title="Sell a Product">
      {addSellerError && (
        <p className="text-red-700">{`${addSellerErrMessage}`}</p>
      )}
      {user?.isSeller === false || !user ? (
        <>
          <p className="pb-2 max-w-sm">
            Before selling a product, you must create a payout account with
            Stripe. MyShop partners with Stripe to transfer earnings from
            selling your products directly into your bank account. Click the
            button below to begin the Stripe onboarding process.
          </p>
          <button
            className="buttonYellow"
            disabled={addSellerLoading}
            onClick={becomeSeller}
          >
            Become a Seller
          </button>
        </>
      ) : (
        ""
      )}
      {addProductSuccess && (
        <p className="text-green-600">{"Product added successfully."}</p>
      )}
      <fieldset
        disabled={addProductLoading || user?.isSeller === false || !user}
      >
        <form onSubmit={handleSubmit}>
          <Field label="Product Name">
            <Input
              required
              placeholder="Enter the product name."
              name="name"
              onChange={changeHandler}
            />
          </Field>
          <Field label="Product Description">
            <textarea
              className="border rounded py-1 w-80"
              required
              name="description"
              onChange={changeHandler}
            />
          </Field>
          <Field label="Product Image">
            <input type="file" required name="file" onChange={handleUpload} />
          </Field>
          <Field label="Product Price">
            <input
              className="border rounded px-3 py-1 mr-2 w-28"
              required
              name="price"
              onChange={changeHandler}
            />
          </Field>
          <Field label="Product Quantity">
            <input
              className="border rounded px-3 py-1 mr-2 w-16 text-right"
              type="number"
              min="1"
              required
              name="quantity"
              onChange={changeHandler}
            />
          </Field>
          {addProductError && <p className="text-red-700">{`${errMessage}`}</p>}
          {addProductLoading && <p>Loading...</p>}
          <button
            className={`buttonGreen ${
              user?.isSeller === false ? "cursor-not-allowed" : null
            }`}
            type="submit"
          >
            Add Product
          </button>
        </form>
      </fieldset>
    </Page>
  );
}

export default AddProductPage;
