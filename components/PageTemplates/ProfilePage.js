import Head from "next/head";
import Title from "../Title";
import NavBar from "../NavBar";
function Page({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} - MyShop</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="px-6 py-4">
        <Title>{title}'s Profile</Title>
        {children}
      </main>
    </>
  );
}

export default Page;
