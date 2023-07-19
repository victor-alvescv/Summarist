import ForYouSearch from "@/components/ForYouSearch";
import ForYouSideBar from "@/components/ForYouSideBar";
import MyLibraryPage from "@/components/MyLibraryPage.js";
import Head from "next/head";
import React from "react";

export default function MyLibrary() {
  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/assets/favicon.png" />
        <link href="./style.css" />
        <title>Summarist - My Library</title>
      </Head>
      <ForYouSearch />
      <ForYouSideBar />
      <MyLibraryPage />
    </>
  );
}
