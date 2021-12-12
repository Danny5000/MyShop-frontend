import { useEffect } from "react";
import Page from "../../components/PageTemplates/Page";
import { useUser } from "../../hooks/user";
import { useStripeSuccess } from "../../hooks/stripe";

//The page that Stripe will redirect to after
//a successful checkout session
const StripeSuccess = () => {
  const user = useUser();

  const { stripeSuccess, stripeSuccessLoading } = useStripeSuccess();

  useEffect(async () => {
    if (user) {
      await stripeSuccess();
      window.location.href = "/order-history";
    }
  }, [user]);

  return (
    <Page title="Stripe">
      {stripeSuccessLoading && (
        <p className="flex justify-center">
          Processing - Do not click back or close page...
        </p>
      )}
    </Page>
  );
};

export default StripeSuccess;
