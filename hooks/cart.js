import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";
import axios from "axios";

const USE_QUERY_KEY = "cartItems";
const { API_URL } = process.env;

export function useAddToCart() {
  const queryClient = useQueryClient();
  const mutation = useMutation(({ productId, quantity, token, userId }) =>
    axios.post(
      `${API_URL}/cart/${userId}/${productId}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
  );

  return {
    addToCart: async (productId, quantity) => {
      try {
        const result = await axios.get("/api/tokenAndUserId");
        const token = result.data.token;
        const userId = result.data.userId;
        await mutation.mutateAsync(
          {
            productId,
            quantity,
            token,
            userId,
          },
          {
            onSuccess: (res) => {
              queryClient.setQueryData(USE_QUERY_KEY, res);
            },
          }
        );
        return true;
      } catch (err) {
        return false;
      }
    },
    errMessage: mutation.error?.response?.data?.errMessage,
    addToCartError: mutation.isError,
    addToCartLoading: mutation.isLoading,
    addToCartSuccess: mutation.isSuccess,
  };
}

export function useUpdateCart() {
  const queryClient = useQueryClient();
  const mutation = useMutation(({ productId, quantity, token, userId }) =>
    axios.put(
      `${API_URL}/cart/${userId}/${productId}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
  );

  return {
    updateCart: async (productId, quantity) => {
      try {
        const result = await axios.get("/api/tokenAndUserId");
        const token = result.data.token;
        const userId = result.data.userId;
        await mutation.mutateAsync(
          {
            productId,
            quantity,
            token,
            userId,
          },
          {
            onSuccess: (data) => {
              queryClient.setQueryData(USE_QUERY_KEY, data);
            },
          }
        );
        return true;
      } catch (err) {
        return false;
      }
    },
    updateCartError: mutation.isError,
    errMessage: mutation.error?.response?.data?.errMessage,
  };
}

export function useDeleteItemFromCart() {
  const queryClient = useQueryClient();
  const mutation = useMutation(({ productId, token, userId }) =>
    axios.delete(`${API_URL}/cart/${userId}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  );
  return {
    removeFromCart: async (productId) => {
      try {
        const result = await fetchJson("/api/tokenAndUserId");
        const token = result.token;
        const userId = result.userId;
        await mutation.mutateAsync(
          { productId, token, userId },
          {
            onSuccess: (data) => {
              queryClient.setQueryData(USE_QUERY_KEY, data);
            },
          }
        );
        return true;
      } catch (err) {
        return false;
      }
    },
    deleteFromCartError: mutation.isError,
    deleteFromCartLoading: mutation.isLoading,
  };
}

export function useGetCart() {
  const query = useQuery(
    USE_QUERY_KEY,
    async () => {
      try {
        const result = await axios.get("/api/tokenAndUserId");
        const userId = result.data.userId;
        const token = result.data.token;
        return await axios.get(`${API_URL}/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        return undefined;
      }
    },
    {
      cacheTime: Infinity,
    }
  );
  return query.data;
}
