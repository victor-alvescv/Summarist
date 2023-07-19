import React from "react";
import ForYouSearch from "@/components/ForYouSearch";
import ForYouSideBar from "@/components/ForYouSideBar";
import SettingsPage from "@/components/SettingsPage";
import Head from "next/head";
import SignInModal from "@/components/modals/SignInModal";

export default function settings() {
  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/assets/favicon.png" />
        <link href="./style.css" />
        <title>Summarist - Settings</title>
      </Head>
      <SignInModal />
      <ForYouSearch />
      <ForYouSideBar />
      <SettingsPage />
    </>
  );
}
