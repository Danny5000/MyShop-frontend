import Page from "../components/PageTemplates/Page";
import { useGetProductsSold } from "../hooks/checkout";
import ItemsSold from "../components/OrderHistories/ItemsSold";

function SellerPage() {
  const itemsSold = useGetProductsSold();
  const mySoldProducts = itemsSold?.data?.userData[0].myProductsPurchased;

  return (
    <Page title="Seller History">
      <ItemsSold orders={mySoldProducts} />
    </Page>
  );
}

export default SellerPage;
