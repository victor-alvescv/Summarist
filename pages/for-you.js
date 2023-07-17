import React, { useRef, useState } from "react";
import ForYouSideBar from "../components/ForYouSideBar";
import ForYouPage from "../components/ForYouPage";
import ForYouSearch from "../components/ForYouSearch";
import SignInModal from "@/components/modals/SignInModal";
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer'



export default function forYou() {
  

  return (
    <>
      <div className="wrapper">
        <div className="no__display">
        <AudioPlayer  />
        </div>
        <SignInModal />
        <ForYouSearch />
        <ForYouSideBar />
        <ForYouPage />
      </div>
    </>
  );
}
