import HomePage from "../components/HomePage";
import Head from "next/head";

export default function Home() {

  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="./style.css" />
        <title>Summarist</title>
      </Head>
      <div>
        <HomePage />
      </div>
    </>
  );
}
