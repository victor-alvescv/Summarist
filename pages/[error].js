import React from "react";
import ForYouSideBar from "../components/ForYouSideBar";
import ForYouSearch from "../components/ForYouSearch";

export default function errorPage() {
  return (
    <>
      <ForYouSideBar />
      <ForYouSearch />
      <div className="container">
        <div className="row error__row--wrapper">
          <figure className="error__wrapper">
            <img className="error" src="/assets/error.svg" />
          </figure>
          <div className="page__not__found">Page not Found</div>
        </div>
      </div>
    </>
  );
}
