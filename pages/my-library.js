import ForYouSearch from "@/components/ForYouSearch";
import ForYouSideBar from "@/components/ForYouSideBar";
import MyLibraryPage from "@/components/MyLibraryPage.js";
import Head from "next/head";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function MyLibrary() {
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
        <title>Summarist - My Library</title>
      </Head>
      <div data-aos="fade-left" data-aos-delay="50" data-aos-once="true">
        <ForYouSearch />
        <ForYouSideBar />
        <MyLibraryPage />
      </div>
    </>
  );
}
