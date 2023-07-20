import ForYouSideBar from "../components/ForYouSideBar";
import ForYouPage from "../components/ForYouPage";
import ForYouSearch from "../components/ForYouSearch";
import SignInModal from "@/components/modals/SignInModal";
import React from "react";
import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";



export default function forYou() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init();
    }
  }, []);

  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/assets/favicon.png" />
        <link href="./style.css" />
        <title>Summarist - For you</title>
      </Head>
      <div data-aos="fade-left" data-aos-delay="50" data-aos-once="true">
        <div className="wrapper">
          <SignInModal />
          <ForYouSearch />
          <ForYouSideBar className="responsive__sidebar" />
          <ForYouPage />
        </div>
      </div>
    </>
  );
}
