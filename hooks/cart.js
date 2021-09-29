import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";

const USE_QUERY_KEY = "cartItems";

export function useGetCart() {
  const query = useQuery(USE_QUERY_KEY, async () => {
    try {
      return await fetchJson("/api/cart");
    } catch (err) {
      return undefined;
    }
  });

  return query.data;
}

export function useAddToCart() {
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
