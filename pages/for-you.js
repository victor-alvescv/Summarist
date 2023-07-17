import ForYouSideBar from "../components/ForYouSideBar";
import ForYouPage from "../components/ForYouPage";
import ForYouSearch from "../components/ForYouSearch";
import SignInModal from "@/components/modals/SignInModal";
import React from "react";


export default function forYou() {

  return (
    <>
      <div className="wrapper">
        <SignInModal />
        <ForYouSearch />
        <ForYouSideBar />
        <ForYouPage />
      </div>
    </>
  );
}
