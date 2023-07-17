import React, { useRef } from "react";
import SelectedBook from "../components/SelectedBook";
import RecommendedBooks from "../components/RecommendedBooks";
import SuggestedBooks from "../components/SuggestedBooks";


export default function ForYouPage() {
  const audioRef = useRef(null);
  const audioDuration = useRef(0);

  return (
    <div className="row">
      <div className="container">
        <div className="for-you__wrapper">
          <SelectedBook />
          <RecommendedBooks audioRef={audioRef} audioDuration={audioDuration} />
          <SuggestedBooks audioRef={audioRef} audioDuration={audioDuration} />
        </div>
      </div>
    </div>
  );
}
