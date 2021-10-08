import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";

const USE_QUERY_KEY = "cartItems";

export function useAddToCart() {
  //const queryClient = useQueryClient();
  const mutation = useMutation(({ productId, quantity }) =>
    fetchJson("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    })
  );

  return {
    addToCart: async (productId, quantity) => {
      try {
        await mutation.mutateAsync({ productId, quantity });
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
    deleteFromError: mutation.isError,
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
