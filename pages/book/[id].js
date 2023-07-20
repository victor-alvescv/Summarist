import ForYouSearch from "@/components/ForYouSearch";
import ForYouSideBar from "@/components/ForYouSideBar";
import React, { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import Head from "next/head";
import { HiOutlineMicrophone, HiOutlineLightBulb } from "react-icons/hi";
import { VscBook } from "react-icons/vsc";
import { TbPremiumRights } from "react-icons/tb";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openSignInModal } from "@/redux/modalReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { VscVerifiedFilled } from "react-icons/vsc";
import { useAuthState } from "react-firebase-hooks/auth";
import usePremiumStatus from "@/stripe/usePremiumStatus";
import SignInModal from "@/components/modals/SignInModal";
import AOS from "aos";
import "aos/dist/aos.css";

export default function id() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router?.query;
  const [bookData, setBookData] = useState([]);
  const [user, setUser] = useState(null);
  const [savedBook, setSavedBook] = useState(null);
  const [userStatus, setUserStatus] = useState("");
  const [isUser, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(isUser);
  const checkUserStatus = usePremiumStatus(userStatus);
  const [loading, setLoading] = useState(true);

  async function getBookById() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setBookData(data);
    setLoading(false);
  }

  function saveBookInLibrary() {
    if (!user) {
      dispatch(openSignInModal());
    } else {
      setSavedBook(true);
    }
    if (savedBook === true) {
      setSavedBook(null);
    }
  }

  function modalOpenOnUserStatus() {
    if (user?.email === "guest37899072@gmail.com" || !user) {
      dispatch(openSignInModal());
      return;
    }
    if (userIsPremium && user) {
      router.push(`/player/${id}`);
    } else if (
      !userIsPremium &&
      user?.email !== "guest37899072@gmail.com" &&
      bookData?.subscriptionRequired
    ) {
      router.push(`/choose-plan`);
    } else if (user && !bookData?.subscriptionRequired) {
      router.push(`/player/${id}`);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init();
    }
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      getBookById();
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserStatus(currentUser);
      }
    });
    return unsubscribe;
  }, [id, userStatus, user]);

  return (
    <>
      <div data-aos="fade-left" data-aos-delay="50" data-aos-once="true">
        <SignInModal />
        <Head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="shortcut icon" href="/assets/favicon.png" />
          <link href="./style.css" />
          <title>Summarist - Book Detail</title>
        </Head>
        <ForYouSearch />
        <ForYouSideBar />
        <div className="row">
          <div className="container">
            {!loading ? (
              <div className="inner__wrapper">
                <div className="inner__book">
                  <div className="inner__book--premium">
                    <div className="inner-book__title">{bookData.title}</div>
                    {bookData.subscriptionRequired && <TbPremiumRights />}
                  </div>
                  <div className="inner-book__author">{bookData.author}</div>
                  <div className="inner-book__sub--title">
                    {bookData.subTitle}
                  </div>
                  <div className="inner-book__wrapper">
                    <div className="inner-book__description--wrapper">
                      <div className="inner-book__description">
                        <div className="inner-book__icon">
                          <AiOutlineStar className="inner__icon" />
                        </div>
                        <div className="inner-book__overall--rating">
                          {bookData.averageRating}({bookData.totalRating})
                        </div>
                      </div>
                      <div className="inner-book__description">
                        <div className="inner-book__icon">
                          <VscVerifiedFilled className="inner__icon" />
                        </div>
                        <div className="inner-book__duration">
                          Verified By Professionals
                        </div>
                      </div>
                      <div className="inner-book__description">
                        <div className="inner-book__icon">
                          <HiOutlineMicrophone className="inner__icon" />
                        </div>
                        <div className="inner-book__type">{bookData.type}</div>
                      </div>
                      <div className="inner-book__description">
                        <div className="inner-book__icon">
                          <HiOutlineLightBulb className="inner__icon" />
                        </div>
                        <div className="inner-book__key--ideas">
                          {bookData.keyIdeas} Key Ideas
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inner-book__read--btn-wrapper">
                    <button
                      onClick={modalOpenOnUserStatus}
                      className="inner-book__read--btn"
                    >
                      <div className="inner-book__read--icon">
                        <VscBook className="inner__btn--icon" />
                      </div>
                      <div className="inner-book__read--text">Read</div>
                    </button>
                    <button
                      onClick={modalOpenOnUserStatus}
                      className="inner-book__read--btn"
                    >
                      <div className="inner-book__read--icon">
                        <HiOutlineMicrophone className="inner__btn--icon" />
                      </div>
                      <div className="inner-book__read--text">Listen</div>
                    </button>
                  </div>
                  <div className="inner-book__bookmark">
                    <div className="inner-book__bookmark--icon">
                      {savedBook ? (
                        <BsFillBookmarkFill className="bookmark__icon" />
                      ) : (
                        <BsBookmark className="bookmark__icon" />
                      )}
                    </div>
                    <div
                      onClick={saveBookInLibrary}
                      className="inner-book__bookmark--text"
                    >
                      {savedBook ? (
                        <span>Saved in My Library</span>
                      ) : (
                        <span>Add title to My Library</span>
                      )}
                    </div>
                  </div>
                  <div className="inner-book__secondary--title">
                    What's it about?
                  </div>
                  <div className="inner-book__tags--wrapper">
                    <div className="inner-book__tag">{bookData.tags?.[0]}</div>
                    <div className="inner-book__tag"> {bookData.tags?.[1]}</div>
                  </div>
                  <div className="inner-book__book--description">
                    {bookData.bookDescription}
                  </div>
                  <h2 className="inner-book__secondary--title">
                    About the author
                  </h2>
                  <div className="inner-book__author--description">
                    {bookData.authorDescription}
                  </div>
                </div>
                <div className="inner-book--img-wrapper">
                  <figure
                    className="book__image--wrapper"
                    style={{
                      height: "300px",
                      width: "300px",
                      minWidth: "300px",
                    }}
                  >
                    <img className="book__image" src={bookData.imageLink} />
                  </figure>
                </div>
              </div>
            ) : (
              <div className="inner__wrapper">
                <div className="inner__book">
                  <div className="inner__book--premium">
                    <div
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                        borderRadius: "3px",
                        width: "90%",
                        height: "45px",
                      }}
                      className="inner-book__title"
                    ></div>
                    {bookData.subscriptionRequired && <TbPremiumRights />}
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      borderRadius: "3px",
                      width: "20%",
                      height: "20px",
                    }}
                    className="inner-book__author"
                  ></div>
                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      borderRadius: "3px",
                      width: "400px",
                      height: "30px",
                    }}
                    className="inner-book__sub--title"
                  ></div>
                  <div className="inner-book__wrapper">
                    <div
                      style={{ maxWidth: "500px" }}
                      className="inner-book__description--wrapper"
                    >
                      <div
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.08)",
                          borderRadius: "3px",
                          width: "200px",
                          height: "20px",
                          marginRight: "30px",
                        }}
                        className="inner-book__description"
                      >
                        <div className="inner-book__icon"></div>
                        <div className="inner-book__overall--rating"></div>
                      </div>
                      <div
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.08)",
                          borderRadius: "3px",
                          width: "200px",
                          height: "20px",
                        }}
                        className="inner-book__description"
                      >
                        <div className="inner-book__icon"></div>
                        <div className="inner-book__duration"></div>
                      </div>
                      <div
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.08)",
                          borderRadius: "3px",
                          width: "200px",
                          height: "20px",
                          marginRight: "30px",
                        }}
                        className="inner-book__description"
                      >
                        <div className="inner-book__icon"></div>
                        <div className="inner-book__type"></div>
                      </div>
                      <div
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.08)",
                          borderRadius: "3px",
                          width: "200px",
                          height: "20px",
                        }}
                        className="inner-book__description"
                      >
                        <div className="inner-book__icon"></div>
                        <div className="inner-book__key--ideas"></div>
                      </div>
                    </div>
                  </div>
                  <div className="inner-book__read--btn-wrapper">
                    <button
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                        borderRadius: "3px",
                        width: "144px",
                        height: "48px",
                      }}
                      className="inner-book__read--btn"
                    >
                      <div className="inner-book__read--icon"></div>
                      <div className="inner-book__read--text"></div>
                    </button>
                    <button
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                        borderRadius: "3px",
                        width: "144px",
                        height: "48px",
                      }}
                      className="inner-book__read--btn"
                    >
                      <div className="inner-book__read--icon"></div>
                      <div className="inner-book__read--text"></div>
                    </button>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      borderRadius: "3px",
                      width: "40%",
                      height: "20px",
                    }}
                    className="inner-book__bookmark"
                  ></div>
                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      borderRadius: "3px",
                      width: "20%",
                      height: "20px",
                    }}
                    className="inner-book__secondary--title"
                  ></div>
                  <div className="inner-book__tags--wrapper">
                    <div
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                        borderRadius: "3px",
                        height: "48px",
                        width: "220px",
                        padding: "0px 16px",
                      }}
                      className="inner-book__tag"
                    ></div>
                    <div
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                        borderRadius: "3px",
                        height: "48px",
                        width: "220px",
                        padding: "0px 16px",
                      }}
                      className="inner-book__tag"
                    ></div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      borderRadius: "3px",
                      width: "40%",
                      height: "20px",
                    }}
                    className="inner-book__book--description"
                  ></div>
                  <h2
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      borderRadius: "3px",
                      width: "20%",
                      height: "20px",
                    }}
                    className="inner-book__secondary--title"
                  ></h2>
                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      borderRadius: "3px",
                      width: "40%",
                      height: "20px",
                    }}
                    className="inner-book__author--description"
                  ></div>
                </div>
                <div className="inner-book--img-wrapper">
                  <figure
                    className="book__image--wrapper"
                    style={{
                      height: "300px",
                      width: "300px",
                      minWidth: "300px",
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      borderRadius: "3px",
                    }}
                  >
                    <img className="book__image" style={{ width: "initial" }} />
                  </figure>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
