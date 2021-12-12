import Head from "next/head";
import Title from "../Title";
import NavBar from "../NavUI/NavBar";

//Modified page template for the profile page
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
