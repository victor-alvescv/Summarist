import React, { useEffect, useState } from "react";
import ForYouSearch from "@/components/ForYouSearch";
import ForYouSideBar from "@/components/ForYouSideBar";
import axios from "axios";
import { useRouter } from "next/router";

import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";

export default function bookId() {
  const router = useRouter();
  const [bookData, setBookData] = useState(null);
  const { bookId } = router?.query;
  const [sideBarHeight, setSideBarHeight] = useState(true)

  async function getBookData() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`
    );
    setBookData(data);
  }

  useEffect(() => {
    if (bookId !== undefined) {
      getBookData();
    }
  }, [bookId]);

  return (
    <>
      <ForYouSearch  />
      <ForYouSideBar sideBarHeight={sideBarHeight}  />
      <div className="summary">
        <div className="audio__book--summary">
          <div className="audio__book--summary-title">{bookData?.title}</div>
          <div className="audio__book--summary-text">{bookData?.summary}</div>
        </div>
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
              <div className="audio__track--title">{bookData?.title}</div>
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
    </>
  );
}
