import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";
import axios from "axios";

const USE_QUERY_KEY = "user";

export function useSignIn() {
  const queryClient = useQueryClient();
  const mutation = useMutation(({ email, password }) =>
    fetchJson(`${process.env.API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  );
  return {
    signIn: async (email, password) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueryData(USE_QUERY_KEY, user);
        return true;
      } catch (err) {
        return false;
      }
    },
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
  };
}

export function useSignUp() {
  const queryClient = useQueryClient();
  const mutation = useMutation((allValues) =>
    axios.post(`${process.env.API_URL}/register`, allValues, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allValues),
    })
  );
  return {
    signUp: async (allValues) => {
      try {
        await mutation.mutateAsync(allValues, {
          onSuccess: (result) => {
            queryClient.setQueryData(USE_QUERY_KEY, result.data);
          },
        });
        return true;
      } catch (err) {
        return false;
      }
    },
    errMessage: mutation.error?.response?.data?.message,
    signUpError: mutation.isError,
    signUpLoading: mutation.isLoading,
  };
}

export function useSignOut() {
  const queryClient = useQueryClient();
  const mutation = useMutation((token) =>
    fetchJson(`${process.env.API_URL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  );
  return async () => {
    try {
      const result = await fetchJson("/api/tokenAndUserId");
      const token = result.token;
      await mutation.mutateAsync(token);
    } catch (err) {
      return false;
    }
    queryClient.setQueryData(USE_QUERY_KEY, undefined);
  };
}

export function useUser() {
  const query = useQuery(
    USE_QUERY_KEY,
    async () => {
      try {
        const result = await fetchJson("/api/tokenAndUserId");
        const token = result.token;

        return await fetchJson(`${process.env.API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        return undefined;
      }
    },
    {
      cacheTime: Infinity,
      staleTime: 30_000,
    }
  );
  return query.data;
}
