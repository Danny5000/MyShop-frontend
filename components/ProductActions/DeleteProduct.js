import { useDeleteProduct } from "../../hooks/product";
import { useRouter } from "next/router";

//Logic for deleting a product
function DeleteProduct({ productId }) {
  const router = useRouter();
  const { deleteProduct, deleteProductLoading, deleteProductSuccess } =
    useDeleteProduct();

  const handleClick = async () => {
    const res = await deleteProduct(productId);
    if (res) {
      router.reload(window.location.pathname);
    }
  };

  return (
    <div className="">
      {deleteProductLoading || deleteProductSuccess ? (
        <p>Loading...</p>
      ) : (
        <button
          className="buttonRed"
          disabled={deleteProductLoading}
          onClick={handleClick}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default DeleteProduct;
