import ForYouSearch from "@/components/ForYouSearch";
import ForYouSideBar from "@/components/ForYouSideBar";
import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlineMicrophone, HiOutlineLightBulb } from "react-icons/hi";
import { VscBook } from "react-icons/vsc";
import { BsBookmark } from "react-icons/bs";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openSignInModal } from "@/redux/modalSlice";

export default function id() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router?.query;
  const [bookData, setBookData] = useState([]);

  async function getBookById() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setBookData(data);
  }

  useEffect(() => {
    if (id !== undefined) {
      getBookById();
    }
  }, [id]);

  return (
    <>
      <ForYouSearch />
      <ForYouSideBar />
      <div className="row">
        <div className="container">
          <div className="inner__wrapper">
            <div className="inner__book">
              <div className="inner-book__title">{bookData.title}</div>
              <div className="inner-book__author">{bookData.author}</div>
              <div className="inner-book__sub--title">{bookData.subTitle}</div>
              <div className="inner-book__wrapper">
                <div className="inner-book__description--wrapper">
                  <div className="inner-book__description">
                    <div className="inner-book__icon">
                      <AiOutlineStar className="inner__icon" />
                    </div>
                    <div className="inner-book__overall--rating">
                      {bookData.averageRating}
                    </div>
                    <div className="inner-book__total--rating">
                      ({bookData.totalRating})
                    </div>
                  </div>
                  <div className="inner-book__description">
                    <div className="inner-book__icon">
                      <AiOutlineClockCircle className="inner__icon" />
                    </div>
                    <div className="inner-book__duration">03:24</div>
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
                  onClick={() => dispatch(openSignInModal())}
                  className="inner-book__read--btn"
                >
                  <div className="inner-book__read--icon">
                    <VscBook className="inner__btn--icon" />
                  </div>
                  <div className="inner-book__read--text">Read</div>
                </button>
                <button className="inner-book__read--btn">
                  <div className="inner-book__read--icon">
                    <HiOutlineMicrophone className="inner__btn--icon" />
                  </div>
                  <div className="inner-book__read--text">Listen</div>
                </button>
              </div>
              <div className="inner-book__bookmark">
                <div className="inner-book__bookmark--icon">
                  <BsBookmark className="bookmark__icon" />
                </div>
                <div className="inner-book__bookmark--text">
                  Add title to My Library
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
