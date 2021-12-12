import { useEffect } from "react";
import { useRouter } from "next/router";
import Page from "../components/PageTemplates/Page";
import { useGetOrderHistory } from "../hooks/checkout";
import ItemsPurchased from "../components/OrderHistories/ItemsPurchased";
import getLocalUser from "../utils/getLocalUser";

//Order history page for buyers
function orderHistory() {
  const orderHistory = useGetOrderHistory();
  const orderItems = orderHistory?.data?.userData[0]?.orderHistory;

  const router = useRouter();
  const user = getLocalUser();

  //If user not logged in, redirect to main page
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  return (
    <Page title="Order History">
      <ItemsPurchased orders={orderItems} />
    </Page>
  );
}

export default orderHistory;
