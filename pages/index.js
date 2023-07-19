import HomePage from "../components/HomePage";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/assets/favicon.png" />
        <link href="./style.css" />
        <title>Summarist - The Best Online Library</title>
      </Head>
      <div>
        <HomePage />
      </div>
    </>
  );
}
