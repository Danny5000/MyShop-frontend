import { useEffect } from "react";
import Page from "../components/PageTemplates/Page";
import { useGetOrderHistory } from "../hooks/checkout";
import ItemsPurchased from "../components/OrderHistories/ItemsPurchased";
import { useUser } from "../hooks/user";
import { useRouter } from "next/router";

function orderHistory() {
  const orderHistory = useGetOrderHistory();
  const orderItems = orderHistory?.data?.userData[0]?.orderHistory;

  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (
      performance.getEntriesByType("navigation")[0].type !== "navigate" &&
      performance.getEntriesByType("navigation")[0].type !== "reload" &&
      performance.getEntriesByType("navigation")[0].type !== "back_forward"
    ) {
      if (!user) {
        router.push("/");
      }
    }
  }, [user, router]);

  return (
    <Page title="Order History">
      <ItemsPurchased orders={orderItems} />
    </Page>
  );
}

export default orderHistory;
