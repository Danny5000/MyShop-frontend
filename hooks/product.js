import { useMutation } from "react-query";
import axios from "axios";

const { API_URL } = process.env;

export function useAddProduct() {
  const mutation = useMutation(({ data, token }) =>
    axios.post(`${API_URL}/product/new`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
  );

  return {
    addProduct: async (formValues) => {
      try {
        const result = await axios.get("/api/tokenAndUserId");
        const token = result.data.token;
        const data = new FormData();

        for (const property in formValues) {
          data.append(`${property}`, formValues[property]);
        }
        await mutation.mutateAsync({ data, token });
        return true;
      } catch (err) {
        return false;
      }
    },
    errMessage: mutation.error?.response?.data?.message,
    addProductError: mutation.isError,
    addProductLoading: mutation.isLoading,
  };
}
