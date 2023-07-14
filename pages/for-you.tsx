import React from "react";
import ForYouSideBar from "../components/ForYouSideBar";
import ForYouPage from "../components/ForYouPage";
import ForYouSearch from "../components/ForYouSearch";

export default function forYou() {
  return (
    <>
      <div className="wrapper">
        <ForYouSearch />
        <ForYouSideBar />
        <ForYouPage />
      </div>
    </>
  );
}
