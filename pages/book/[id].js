import ForYouSearch from "@/components/ForYouSearch";
import ForYouSideBar from "@/components/ForYouSideBar";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineStar, AiOutlineClockCircle } from "react-icons/ai";
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

export default function id() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router?.query;
  const [bookData, setBookData] = useState([]);
  const [user, setUser] = useState(null);
  const [savedBook, setSavedBook] = useState(null);

  async function getBookById() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setBookData(data);
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
    if (!user) {
      dispatch(openSignInModal());
    } else if (bookData.subscriptionRequired) {
      router.push("/choose-plan");
    } else if (!bookData.subscriptionRequired) {
      router.push(`/player/${id}`);
    }
  }


  useEffect(() => {
    if (id !== undefined) {
      getBookById();
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, [id]);

  return (
    <>
      <ForYouSearch />
      <ForYouSideBar />
      <div className="row">
        <div className="container">
          <div className="inner__wrapper">
            <div className="inner__book">
              <div className="inner__book--premium">
                <div className="inner-book__title">{bookData.title}</div>
                {bookData.subscriptionRequired && <TbPremiumRights />}
              </div>
              <div className="inner-book__author">{bookData.author}</div>
              <div className="inner-book__sub--title">{bookData.subTitle}</div>
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
              <h2 className="inner-book__secondary--title">About the author</h2>
              <div className="inner-book__author--description">
                {bookData.authorDescription}
              </div>
            </div>
            <div className="inner-book--img-wrapper">
              <figure
                className="book__image--wrapper"
                style={{ height: "300px", width: "300px", minWidth: "300px" }}
              >
                <img className="book__image" src={bookData.imageLink} />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
