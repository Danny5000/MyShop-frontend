import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";
import axios from "axios";

const USE_QUERY_KEY = "cartItems";
const { API_URL } = process.env;

export function useAddToCart() {
  const mutation = useMutation(({ productId, quantity, token, userId }) =>
    fetchJson(`${API_URL}/cart/${userId}/${productId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    })
  );

  return {
    addToCart: async (productId, quantity) => {
      try {
        const result = await fetchJson("/api/tokenAndUserId");
        const token = result.token;
        const userId = result.userId;
        await mutation.mutateAsync({
          productId,
          quantity,
          token,
          userId,
        });
        return true;
      } catch (err) {
        return false;
      }
    },
    addToCartError: mutation.isError,
    addToCartLoading: mutation.isLoading,
  };
}

export function useUpdateCart() {
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
        await mutation.mutateAsync({
          productId,
          quantity,
          token,
          userId,
        });
        return true;
      } catch (err) {
        return false;
      }
    },
  };
}

export function useDeleteItemFromCart() {
  const queryClient = useQueryClient();
  const mutation = useMutation(({ productId, token, userId }) =>
    fetchJson(`${API_URL}/cart/${userId}/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
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
        const result = await fetchJson("/api/tokenAndUserId");
        const userId = result.userId;
        const token = result.token;
        return await fetchJson(`${API_URL}/cart/${userId}`, {
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
