import Page from "../components/PageTemplates/Page";
import Checkout from "../components/Cart/Checkout";
import { useGetCart } from "../hooks/cart";
import { useUser } from "../hooks/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import getLocalUser from "../utils/getLocalUser";

function CartPage() {
  const cartItems = useGetCart();
  const user = useUser();
  const localUser = getLocalUser();
  const router = useRouter();

  useEffect(() => {
    if (!localUser) {
      router.push("/");
    }
  }, [localUser]);

  return (
    <Page title="Checkout">
      {user && cartItems && <Checkout cartItems={cartItems} />}
    </Page>
  );
}

export default CartPage;
