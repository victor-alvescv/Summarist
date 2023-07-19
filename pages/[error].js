import React from "react";
import ForYouSideBar from "../components/ForYouSideBar";
import ForYouSearch from "../components/ForYouSearch";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function errorPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init();
    }
  }, []);

  return (
    <>
      <div data-aos="fade-left" data-aos-delay="50" data-aos-once="true">
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
      </div>
    </>
  );
}
