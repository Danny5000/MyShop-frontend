import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Input from "../../components/Input";
import Page from "../../components/PageTemplates/Page";
import { useResetPassword } from "../../hooks/resetPassword";
import notify from "../../utils/toasts";
import { useUser } from "../../hooks/user";

//The page that will be rendered after a user
//clicks the reset link in their email
function ResetPassword() {
  const router = useRouter();
  const user = useUser();
  const { token } = router.query;

  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });

  const changeHandler = (e) => {
    setFormData((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0].type !== "reload") {
      if (user) {
        router.push("/");
      }
    }
  }, [user, router]);

  const { password, password2 } = formData;

  const {
    resetPassword,
    resetPasswordError,
    resetPasswordSuccess,
    resetPasswordLoading,
    resetPasswordErrMessage,
  } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      notify("Please make sure the passwords you entered match.");
    } else {
      await resetPassword(password, token);
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    }
  };

  return (
    <Page title="Update Password">
      <form onSubmit={handleSubmit}>
        <p className="pb-2 max-w-sm">Please enter your new password.</p>
        {resetPasswordError && (
          <p className="pb-2 pt-2 max-w-sm text-red-700">{`${resetPasswordErrMessage}`}</p>
        )}
        {resetPasswordSuccess && (
          <>
            <p className="pb-2 pt-2 max-w-sm text-green-500">
              Your password was successfully updated.
            </p>
          </>
        )}
        <label
          hidden={resetPasswordSuccess}
          className={`${
            resetPasswordSuccess
              ? ""
              : "flex flex-col my-2 text-sm text-gray-600"
          }`}
        >
          Password:
          <Input
            type={resetPasswordSuccess ? "hidden" : "password"}
            placeholder="At least 8 characters long."
            required
            name="password"
            onChange={changeHandler}
          />
        </label>
        <label
          hidden={resetPasswordSuccess}
          className={`${
            resetPasswordSuccess
              ? ""
              : "flex flex-col my-2 text-sm text-gray-600"
          }`}
        >
          Confirm Password:
          <Input
            type={resetPasswordSuccess ? "hidden" : "password"}
            placeholder="At least 8 characters long."
            required
            name="password2"
            onChange={changeHandler}
          />
        </label>
        {resetPasswordLoading && <p>Loading...</p>}
        <button
          className={`buttonGreen ${
            resetPasswordLoading ? "cursor-not-allowed" : null
          }`}
          disabled={resetPasswordLoading}
          hidden={resetPasswordSuccess}
          type="submit"
        >
          Change Password
        </button>
        <Link href={"/sign-in"}>
          <button
            className={`buttonGreen ${
              resetPasswordLoading ? "cursor-not-allowed" : null
            }`}
            disabled={resetPasswordLoading}
            hidden={!resetPasswordSuccess}
            type="submit"
          >
            Log In
          </button>
        </Link>
      </form>
    </Page>
  );
}

export default ResetPassword;
