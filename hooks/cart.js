import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";
//import axios from "axios";

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

  console.log(mutation);

  return {
    addToCart: async (productId, quantity) => {
      try {
        const result = await fetchJson("/api/tokenAndUserId");
        const token = result.data.token;
        const userId = result.data.userId;
        console.log(token, userId);
        await mutation.mutateAsync({ productId, quantity, token, userId });
        return true;
      } catch (err) {
        return false;
      }
    },
    addToCartError: mutation.isError,
    addToCartLoading: mutation.isLoading,
  };
}

export function useDeleteItemFromCart() {
  const queryClient = useQueryClient();
  const mutation = useMutation(({ productId }) =>
    fetchJson("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    })
  );
  return {
    removeFromCart: async (productId) => {
      try {
        await mutation.mutateAsync(
          { productId },
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
        return await fetchJson("/api/cart");
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
