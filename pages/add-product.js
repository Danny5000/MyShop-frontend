import { useState } from "react";
import { useRouter } from "next/router";
import Field from "../components/Field";
import Input from "../components/Input";
import Page from "../components/PageTemplates/Page";
import { useAddProduct } from "../hooks/product";
import { useUser } from "../hooks/user";
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

  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0].type !== "reload") {
      if (!user) {
        router.push("/");
      }
    }
  }, [user, router]);

  return (
    <Page title="Sell a Product">
      {addProductSuccess && (
        <p className="text-green-600">{"Product added successfully."}</p>
      )}
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
          className="buttonGreen"
          disabled={addProductLoading}
          type="submit"
        >
          Add Product
        </button>
      </form>
    </Page>
  );
}

export default AddProductPage;
