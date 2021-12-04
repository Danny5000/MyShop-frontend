import { useQuery, useMutation } from "react-query";
import axios from "axios";

const { API_URL } = process.env;
const USE_QUERY_KEY = "products";

export function useGetProduct(page) {
  const query = useQuery(USE_QUERY_KEY, async () => {
    try {
      return await axios.get(
        `${process.env.API_URL}/products?limit=2&page=${page}`
      );
    } catch (err) {
      return undefined;
    }
  });
  return {
    products: query.data?.data?.data,
  };
}

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
        const res = await mutation.mutateAsync({ data, token });
        return true;
      } catch (err) {
        return false;
      }
    },
    errMessage: mutation.error?.response?.data?.errMessage,
    addProductSuccess: mutation.isSuccess,
    addProductError: mutation.isError,
    addProductLoading: mutation.isLoading,
  };
}

export function useDeleteProduct() {
  const mutation = useMutation(({ productId, token }) =>
    axios.delete(`${API_URL}/product/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  );

  return {
    deleteProduct: async (productId) => {
      try {
        const result = await axios.get("/api/tokenAndUserId");
        const token = result.data.token;

        await mutation.mutateAsync({ productId, token });
        return true;
      } catch (err) {
        return false;
      }
    },
    deleteProductSuccess: mutation.isSuccess,
    deleteProductError: mutation.isError,
    deleteProductLoading: mutation.isLoading,
  };
}

export function useUpdateProduct() {
  const mutation = useMutation(({ data, productId, token }) =>
    axios.put(`${API_URL}/product/${productId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
  );

  return {
    updateProduct: async (formValues, productId) => {
      try {
        const result = await axios.get("/api/tokenAndUserId");
        const token = result.data.token;

        const data = new FormData();

        for (const property in formValues) {
          if (formValues[property] !== "") {
            data.append(`${property}`, formValues[property]);
          }
        }

        await mutation.mutateAsync({ data, productId, token });
        return true;
      } catch (err) {
        return false;
      }
    },
    errMessage: mutation.error?.response?.data?.errMessage,
    updateProductSuccess: mutation.isSuccess,
    updateProductError: mutation.isError,
    updateProductLoading: mutation.isLoading,
  };
}
