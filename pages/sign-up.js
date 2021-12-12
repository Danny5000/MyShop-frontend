import { useState } from "react";
import { useRouter } from "next/router";
import Field from "../components/Field";
import Input from "../components/Input";
import Page from "../components/PageTemplates/Page";
import { useSignUp, useUser } from "../hooks/user";
import { useEffect } from "react";
import notify from "../utils/toasts";

//Sign in page
function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    password2: "",
  });
  const { signUp, signUpError, signUpLoading, errMessage } = useSignUp();
  console.log(errMessage);
  const user = useUser();
  const changeHandler = (e) => {
    setFormData((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  const { name, userName, email, password, password2 } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      notify("Please make sure the passwords you entered match.");
    } else {
      const valid = await signUp({ name, userName, email, password });

      if (valid) {
        router.push("/");
      }
    }
  };

  //If user is logged in, redirect to main page
  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0].type !== "reload") {
      if (user) {
        router.push("/");
      }
    }
  }, [user, router]);

  return (
    <Page title="Register">
      <form onSubmit={handleSubmit}>
        <Field label="Name">
          <Input
            required
            placeholder="Enter your full name."
            name="name"
            onChange={changeHandler}
          />
        </Field>
        <Field label="Username">
          <Input
            required
            placeholder="No more than 12 characters long."
            name="userName"
            onChange={changeHandler}
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            placeholder="example@example.com"
            required
            name="email"
            onChange={changeHandler}
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            placeholder="At least 8 characters long."
            required
            name="password"
            onChange={changeHandler}
          />
        </Field>
        <Field label="Confirm Password">
          <Input
            type="password"
            placeholder="At least 8 characters long."
            required
            name="password2"
            onChange={changeHandler}
          />
        </Field>
        {signUpError && <p className="text-red-700">{`${errMessage}`}</p>}
        {signUpLoading && <p>Loading...</p>}
        <button className="buttonGreen" disabled={signUpLoading} type="submit">
          Register Account
        </button>
      </form>
    </Page>
  );
}

export default SignInPage;
