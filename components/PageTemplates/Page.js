import Head from "next/head";
import Title from "../Title";
import NavBar from "../NavUI/NavBar";

//The barebones page template
function Page({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} - MyShop</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,500&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="flex flex-col place-items-center px-6 py-4  ">
        <Title>{title}</Title>
        {children}
      </main>
    </>
  );
}

export default Page;
