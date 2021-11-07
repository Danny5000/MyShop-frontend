import { useEffect } from "react";
import Page from "../../components/PageTemplates/Page";
import { useUser } from "../../hooks/user";
import { useManageAccount } from "../../hooks/stripe";

const StripeCallback = () => {
  const user = useUser();

  const { manageAccount, manageAccountLoading } = useManageAccount();

  useEffect(async () => {
    if (user) {
      await manageAccount();
      window.location.href = "/add-product";
    }
  }, [user]);

  return (
    <Page title="Stripe">
      {manageAccountLoading && (
        <p className="flex justify-center">Loading...</p>
      )}
    </Page>
  );
};

export default StripeCallback;
