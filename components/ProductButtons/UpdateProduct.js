import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "react-modal";
import { useUpdateProduct } from "../../hooks/product";
import Field from "../../components/Field";
import Input from "../../components/Input";

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#__next");

function UpdateProduct({ productId }) {
  const {
    updateProduct,
    updateProductLoading,
    updateProductError,
    updateProductSuccess,
    errMessage,
  } = useUpdateProduct();

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    quantity: "",
  });

  const [file, setFile] = useState("");

  function handleUpload(e) {
    setFile(e.target.files[0]);
  }

  formData.imageUrl = file;

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProduct(formData, productId);
  };

  const changeHandler = (e) => {
    console.log(formData);
    setFormData((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
    router.reload(window.location.pathname);
  }

  return (
    <>
      <div>
        <button className="buttonYellow" onClick={openModal}>
          Edit
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Update Product Modal"
        >
          <div className="flex justify-center">Update Product</div>
          {updateProductSuccess && (
            <p className="text-green-600">{"Product updated."}</p>
          )}
          <form onSubmit={handleSubmit}>
            <Field label="Product Name">
              <Input
                placeholder="Enter the product name."
                name="name"
                onChange={changeHandler}
              />
            </Field>
            <Field label="Product Description">
              <textarea
                className="border rounded py-1 w-80"
                name="description"
                onChange={changeHandler}
              />
            </Field>
            <Field label="Product Image">
              <input type="file" name="file" onChange={handleUpload} />
            </Field>
            <Field label="Product Price">
              <input
                className="border rounded px-3 py-1 mr-2 w-28"
                name="price"
                onChange={changeHandler}
              />
            </Field>
            <Field label="Product Quantity">
              <input
                className="border rounded px-3 py-1 mr-2 w-16 text-right"
                type="number"
                min="1"
                name="quantity"
                onChange={changeHandler}
              />
            </Field>
            {updateProductError && (
              <p className="text-red-700">{`${errMessage}`}</p>
            )}
            {updateProductLoading && <p>Loading...</p>}
            <div className="flex justify-between">
              <button
                className="buttonGreen"
                disabled={updateProductLoading}
                type="submit"
              >
                Update Product
              </button>
              <button className="buttonRed" onClick={closeModal}>
                Close
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default UpdateProduct;
