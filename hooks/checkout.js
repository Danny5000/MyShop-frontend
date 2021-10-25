import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const { API_URL } = process.env;

export function useCheckout() {
  const queryClient = useQueryClient();
  const mutation = useMutation(({ token, userId }) =>
    axios.post(
      `${API_URL}/checkout/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
  );

  return {
    checkout: async () => {
      try {
        const result = await axios.get("/api/tokenAndUserId");
        const token = result.data.token;
        const userId = result.data.userId;
        //console.log("token", token, "user", userId);
        await mutation.mutateAsync({
          token,
          userId,
        });
        return true;
      } catch (err) {
        return false;
      }
    },
    errMessage: mutation.error?.response?.data?.errMessage,
    checkoutError: mutation.isError,
    checkoutLoading: mutation.isLoading,
    checkoutSuccess: mutation.isSuccess,
  };
}

export function useGetOrderHistory() {
  const QUERY_KEY = "orderHistory";
  const query = useQuery(QUERY_KEY, async () => {
    try {
      const result = await axios.get("/api/tokenAndUserId");
      const token = result.data.token;
      const userId = result.data.userId;

      return await axios.get(
        `${process.env.API_URL}/user/orderhist/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      return undefined;
    }
  });

  return query.data;
}

export function useGetProductsSold() {
  const QUERY_KEY = "productsSold";
  const query = useQuery(QUERY_KEY, async () => {
    try {
      const result = await axios.get("/api/tokenAndUserId");
      const token = result.data.token;
      const userId = result.data.userId;

      return await axios.get(`${process.env.API_URL}/itemssold/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      return undefined;
    }
  });
  return query.data;
}
