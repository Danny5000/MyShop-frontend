import Page from "../components/PageTemplates/Page";
import CartTable from "../components/CartTable";
import { useGetCart } from "../hooks/cart";
import { useUser } from "../hooks/user";
import { useRouter } from "next/router";
import { useEffect } from "react";

function CartPage() {
  const cartItems = useGetCart();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0].type !== "reload") {
      if (!user) {
        router.push("/");
      }
    }
  }, [user, router]);

  return (
    <Page title="Cart">
      {user && cartItems && <CartTable cartItems={cartItems} />}
    </Page>
  );
}

export default CartPage;
