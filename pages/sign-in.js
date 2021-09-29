import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Field from "../components/Field";
import Input from "../components/Input";
import Page from "../components/Page";
import { useSignIn } from "../hooks/user";

function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInError, signInLoading } = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = await signIn(email, password);
    if (valid) {
      router.push("/");
    }
  };

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
        <Button disabled={signInLoading} type="submit">
          Sign In
        </Button>
      </form>
    </Page>
  );
}

export default SignInPage;
