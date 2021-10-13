import { useState } from "react";
import { useRouter } from "next/router";
import Field from "../components/Field";
import Input from "../components/Input";
import Page from "../components/PageTemplates/Page";
import { useSignUp, useUser } from "../hooks/user";
import { useEffect } from "react";

function SignInPage() {
  const router = useRouter();
  const [allValues, setAllValues] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });
  const { signUp, signUpError, signUpLoading, errMessage } = useSignUp();
  const user = useUser();

  const changeHandler = (e) => {
    setAllValues((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = await signUp(allValues);

    if (valid) {
      router.push("/");
    }
  };

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
