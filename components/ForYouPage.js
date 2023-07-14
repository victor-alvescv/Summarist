import React from "react";
import SelectedBook from "../components/SelectedBook";
import RecommendedBooks from "../components/RecommendedBooks";
import SuggestedBooks from "../components/SuggestedBooks";

export default function ForYouPage() {
  return (
    <div className="row">
      <div className="container">
        <div className="for-you__wrapper">
          <SelectedBook />
          <RecommendedBooks />
          <SuggestedBooks />
        </div>
      </div>
    </div>
  );
}
