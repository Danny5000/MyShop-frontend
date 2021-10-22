import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const USE_QUERY_KEY = "checkoutItems";
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
