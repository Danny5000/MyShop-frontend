import { useMutation } from "react-query";
import axios from "axios";

const { API_URL } = process.env;

export function useForgotPassword() {
  const mutation = useMutation(({ email }) =>
    axios.post(
      `${API_URL}/password/forgot`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  );

  return {
    forgotPassword: async (email) => {
      try {
        await mutation.mutateAsync({ email });
        return true;
      } catch (err) {
        return false;
      }
    },
    forgotPasswordErrMessage: mutation.error?.response?.data?.errMessage,
    forgotPasswordSuccess: mutation.isSuccess,
    forgotPasswordError: mutation.isError,
    forgotPasswordLoading: mutation.isLoading,
  };
}

export function useResetPassword() {
  const mutation = useMutation(({ password, resetToken }) =>
    axios.put(
      `${API_URL}/password/reset/${resetToken}`,
      { password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  );

  return {
    resetPassword: async (password, resetToken) => {
      try {
        await mutation.mutateAsync({ password, resetToken });
        return true;
      } catch (err) {
        return false;
      }
    },
    resetPasswordErrMessage: mutation.error?.response?.data?.errMessage,
    resetPasswordSuccess: mutation.isSuccess,
    resetPasswordError: mutation.isError,
    resetPasswordLoading: mutation.isLoading,
  };
}
