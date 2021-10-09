import { useState } from "react";
import { useRouter } from "next/router";
import Field from "../components/Field";
import Input from "../components/Input";
import Page from "../components/PageTemplates/Page";
import { useSignIn, useUser } from "../hooks/user";
import { useEffect } from "react";

function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInError, signInLoading } = useSignIn();
  const user = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = await signIn(email, password);

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
    <Page title="Sign in">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        {signInError && <p className="text-red-700">Invalid Credentials</p>}
        {signInLoading && <p>Loading...</p>}
        <button className="buttonGreen" disabled={signInLoading} type="submit">
          Sign In
        </button>
      </form>
    </Page>
  );
}

export default SignInPage;
