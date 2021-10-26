import { useCheckout } from "../../hooks/checkout";
import Link from "next/link";
import { useRouter } from "next/router";

function PostCheckout({ cartItems }) {
  const { checkout, checkoutLoading, checkoutSuccess } = useCheckout();
  const router = useRouter();

  const handleClick = async () => {
    const res = await checkout();
    if (res) {
      router.reload(window.location.pathname);
    }
  };

  return (
    <div className="mr-2">
      {checkoutLoading ? (
        <p>Loading...</p>
      ) : (
        <Link href={""}>
          <button
            disabled={
              checkoutLoading ||
              checkoutSuccess ||
              cartItems.data.data.length === 0
            }
            className={`buttonGreen ${
              cartItems.data.data.length === 0 ? "cursor-not-allowed" : null
            }`}
            onClick={handleClick}
          >
            Checkout
          </button>
        </Link>
      )}
    </div>
  );
}

export default PostCheckout;
