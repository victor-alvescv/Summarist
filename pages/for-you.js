import ForYouSideBar from "../components/ForYouSideBar";
import ForYouPage from "../components/ForYouPage";
import ForYouSearch from "../components/ForYouSearch";
import SignInModal from "@/components/modals/SignInModal";
import React from "react";
import Head from "next/head";

export default function forYou() {
  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/assets/favicon.png" />
        <link href="./style.css" />
        <title>Summarist - For you</title>
      </Head>
      <div className="wrapper">
        <SignInModal />
        <ForYouSearch />
        <ForYouSideBar />
        <ForYouPage />
      </div>
    </>
  );
}
