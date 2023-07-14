import React from "react";
import SignInModal from './modals/SignInModal'

export default function LandingPage() {

  return (
    <section id="landing">
      <div className="container">
        <div className="row">
          <div className="landing__wrapper">
            <div className="landing__content">
              <div className="landing__content__title">
                Gain more knowledge <br className="remove--tablet" />
                in less time
              </div>
              <div className="landing__content__subtitle">
                Great summaries for busy people,
                <br className="remove--tablet" />
                individuals who barely have time to read,
                <br className="remove--tablet" />
                and even people who don’t like to read.
              </div>
              <SignInModal />
            </div>
            <figure className="landing__image--mask">
              <img
                src="https://summarist.vercel.app/_next/static/media/landing.e4787d01.png"
                alt="landing"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
