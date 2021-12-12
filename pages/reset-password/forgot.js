import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Field from "../../components/Field";
import Input from "../../components/Input";
import Page from "../../components/PageTemplates/Page";
import { useForgotPassword } from "../../hooks/resetPassword";
import { useUser } from "../../hooks/user";

//Forgot password page
function ForgotPassword() {
  const router = useRouter();
  const user = useUser();

  const [formData, setFormData] = useState({
    email: "",
  });

  const changeHandler = (e) => {
    setFormData((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  //If user logged in, redirect to main page
  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0].type !== "reload") {
      if (user) {
        router.push("/");
      }
    }
  }, [user, router]);

  const { email } = formData;

  const {
    forgotPassword,
    forgotPasswordError,
    forgotPasswordSuccess,
    forgotPasswordLoading,
    forgotPasswordErrMessage,
  } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await forgotPassword(email);
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  return (
    <Page title="Forgot Password">
      <form onSubmit={handleSubmit}>
        <p className="pb-2 max-w-sm">
          Please enter the email you signed up with. You will recieve a link to
          reset your password.
        </p>
        {forgotPasswordError && (
          <p className="pb-2 pt-2 max-w-sm text-red-700">{`${forgotPasswordErrMessage}`}</p>
        )}
        {forgotPasswordSuccess && (
          <p className="pb-2 pt-2 max-w-sm text-green-500">
            Your password reset link was successfully sent to the email
            provided.
          </p>
        )}
        <Field label="Email:">
          <Input
            type="email"
            placeholder="example@example.com"
            required
            name="email"
            onChange={changeHandler}
          />
        </Field>
        {forgotPasswordLoading && <p>Loading...</p>}
        <button
          className={`buttonGreen ${
            forgotPasswordLoading ? "cursor-not-allowed" : null
          }`}
          disabled={forgotPasswordLoading}
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </Page>
  );
}

export default ForgotPassword;
