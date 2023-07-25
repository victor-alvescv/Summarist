import React, { useEffect, useState } from "react";
import ForYouSearch from "@/components/ForYouSearch";
import ForYouSideBar from "@/components/ForYouSideBar";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import AOS from "aos";
import "aos/dist/aos.css";
import { Ring } from "@uiball/loaders";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import usePremiumStatus from "@/stripe/usePremiumStatus";
import SignInModal from "@/components/modals/SignInModal";

export default function bookId() {
  const router = useRouter();
  const [bookData, setBookData] = useState(null);
  const { bookId } = router?.query;
  const [sideBarHeight, setSideBarHeight] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [isUser, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(isUser);

  async function getBookData() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`
    );
    setBookData(data);
    setLoading(false);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init();
    }
  }, []);

  useEffect(() => {
    if (bookId !== undefined) {
      getBookData();
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return unsubscribe;
  }, [bookId, user]);

  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/assets/favicon.png" />
        <link href="./style.css" />
        <title>Summarist - Choose Plan</title>
      </Head>
      <div className="wrapper">
        <SignInModal />
        <div data-aos="fade-left" data-aos-delay="50" data-aos-once="true">
          <ForYouSearch />
        </div>
        <div data-aos="fade-left" data-aos-delay="50" data-aos-once="true">
          <ForYouSideBar sideBarHeight={sideBarHeight} />
        </div>
        <div className="summary">
          {!loading ? (
            <div className="audio__book--summary">
              <div
                data-aos="fade-down"
                data-aos-delay="200"
                data-aos-once="true"
              >
                <div className="audio__book--summary-title">
                  {bookData?.title}
                </div>
              </div>
              <div data-aos="fade-in" data-aos-delay="400" data-aos-once="true">
                <div className="audio__book--summary-text">
                  {bookData?.summary}
                </div>
              </div>
            </div>
          ) : (
            <div className="loading__icon">
              <Ring size={50} lineWeight={5} speed={2} color="#032b41" />
            </div>
          )}
          <div className="audio__wrapper">
            <div className="audio__track--wrapper">
              <figure className="audio__track--image-mask">
                <figure
                  className="book__image--wrapper"
                  style={{
                    height: "48px",
                    width: "48px",
                    minWidth: "48px",
                    marginBottom: "initial",
                  }}
                >
                  <img className="book__image" src={bookData?.imageLink} />
                </figure>
              </figure>
              <div className="audio__track--details-wrapper">
                <div className="audio__track--title truncate-player">
                  {bookData?.title}
                </div>
                <div className="audio__track--author">{bookData?.author}</div>
              </div>
            </div>
            <div className="audio__controls--wrapper">
              <div className="audio__controls">
                <AudioPlayer AudioData={bookData?.audioLink} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
