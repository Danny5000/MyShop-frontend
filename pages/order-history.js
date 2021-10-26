import Page from "../components/PageTemplates/Page";
import { useGetOrderHistory } from "../hooks/checkout";
import ItemsPurchased from "../components/OrderHistories/ItemsPurchased";

function orderHistory() {
  const orderHistory = useGetOrderHistory();
  const orderItems = orderHistory?.data?.userData[0]?.orderHistory;

  return (
    <Page title="Order History">
      <ItemsPurchased orders={orderItems} />
    </Page>
  );
}

export default orderHistory;
