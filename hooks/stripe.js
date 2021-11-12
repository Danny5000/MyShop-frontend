import { useMutation } from "react-query";
import axios from "axios";

const { API_URL } = process.env;

export function useAddSeller() {
  const mutation = useMutation(({ token }) =>
    axios.post(
      `${API_URL}/make-seller/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );

  return {
    addSeller: async () => {
      try {
        const result = await axios.get("/api/tokenAndUserId");
        const token = result.data.token;

        const res = await mutation.mutateAsync({ token });
        return res;
      } catch (err) {
        return false;
      }
    },
    addSellerErrMessage: mutation.error?.response?.data?.errMessage,
    addSellerSuccess: mutation.isSuccess,
    addSellerError: mutation.isError,
    addSellerLoading: mutation.isLoading,
  };
}

export function useManageAccount() {
  const mutation = useMutation(({ token }) =>
    axios.post(
      `${API_URL}/get-account-status/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );

  return {
    manageAccount: async () => {
      try {
        const result = await axios.get("/api/tokenAndUserId");
        const token = result.data.token;

        await mutation.mutateAsync({ token });
        return true;
      } catch (err) {
        return false;
      }
    },
    manageAccountErrMessage: mutation.error?.response?.data?.errMessage,
    manageAccountSuccess: mutation.isSuccess,
    manageAccountError: mutation.isError,
    manageAccountLoading: mutation.isLoading,
  };
}

export function useStripeCheckout() {
  const mutation = useMutation(({ token }) =>
    axios.post(
      `${process.env.API_URL}/stripe-checkout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );

  return {
    stripeCheckout: async () => {
      try {
        const result = await axios.get("/api/tokenAndUserId");
        const token = result.data.token;

        const res = await mutation.mutateAsync({ token });
        return res;
      } catch (err) {
        return false;
      }
    },
    stripeCheckoutErrMessage: mutation.error?.response?.data?.errMessage,
    stripeCheckoutSuccess: mutation.isSuccess,
    stripeCheckoutError: mutation.isError,
    stripeCheckoutLoading: mutation.isLoading,
  };
}

export function useStripeSuccess() {
  const mutation = useMutation(({ token }) =>
    axios.post(
      `${process.env.API_URL}/stripe-success`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );

  return {
    stripeSuccess: async () => {
      try {
        const result = await axios.get("/api/tokenAndUserId");
        const token = result.data.token;

        await mutation.mutateAsync({ token });
        return true;
      } catch (err) {
        return false;
      }
    },
    stripeSuccessErrMessage: mutation.error?.response?.data?.errMessage,
    stripeSuccessSuccess: mutation.isSuccess,
    stripeSuccessError: mutation.isError,
    stripeSuccessLoading: mutation.isLoading,
  };
}
