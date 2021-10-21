import { useCheckout } from "../../hooks/checkout";
import Link from "next/link";
import { useRouter } from "next/router";

function PostCheckout() {
  const { checkout, checkoutLoading } = useCheckout();
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
          <button className="buttonGreen" onClick={handleClick}>
            Checkout
          </button>
        </Link>
      )}
    </div>
  );
}

export default PostCheckout;
