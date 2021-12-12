import { useState } from "react";
import { useRouter } from "next/router";
import Field from "../components/Field";
import Input from "../components/Input";
import Page from "../components/PageTemplates/Page";
import { useAddProduct } from "../hooks/product";
import { useUser } from "../hooks/user";
import { useAddSeller } from "../hooks/stripe";
import { useEffect } from "react";
import getLocalUser from "../utils/getLocalUser";

//The add products page
function AddProductPage() {
  const router = useRouter();
  //State for the form
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    quantity: "",
  });

  //State for the file upload
  const [file, setFile] = useState("");

  //Use the add product hook for adding the product data
  const {
    addProduct,
    addProductError,
    addProductLoading,
    errMessage,
    addProductSuccess,
  } = useAddProduct();

  const user = useUser();
  const localUser = getLocalUser();

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
    //If response successful, clear the input fields
    if (res) {
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
      Array.from(document.querySelectorAll("textarea")).forEach(
        (input) => (input.value = "")
      );
    }
  };

  //Use the add seller hook
  const {
    addSellerErrMessage,
    addSellerError,
    addSellerLoading,
    addSellerSuccess,
    addSeller,
  } = useAddSeller();

  //Will redirect user to Stripe's onboarding process
  const becomeSeller = async () => {
    const res = await addSeller();
    window.location.href = res.data;
  };

  //If user not logged in, redirect to main page
  useEffect(() => {
    if (!localUser) {
      router.push("/");
    }
  }, [localUser]);

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
            disabled={
              addSellerLoading || addSellerSuccess || user?.isSeller === true
            }
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
        <form className="items-center" onSubmit={handleSubmit}>
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
