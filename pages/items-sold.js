import { useEffect } from "react";
import { useRouter } from "next/router";
import Page from "../components/PageTemplates/Page";
import { useGetProductsSold } from "../hooks/checkout";
import ItemsSold from "../components/OrderHistories/ItemsSold";
import getLocalUser from "../utils/getLocalUser";

function SellerPage() {
  const itemsSold = useGetProductsSold();
  const mySoldProducts = itemsSold?.data?.userData[0].myProductsPurchased;

  const router = useRouter();
  const user = getLocalUser();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  return (
    <Page title="Seller History">
      <ItemsSold orders={mySoldProducts} />
    </Page>
  );
}

export default SellerPage;
