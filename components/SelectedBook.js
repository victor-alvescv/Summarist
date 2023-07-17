import { openSignInModal } from "@/redux/modalReducer";
import axios from "axios";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useDispatch } from "react-redux";

export default function SelectedBook() {
  const [selectedBook, setSelectedBook] = useState("");
  const dispatch = useDispatch()
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);

  async function getSelectedBook() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    setSelectedBook(data[0]);
  }

  useEffect(() => {
    getSelectedBook();
  }, []);

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <>
      <div className="for-you__title">Selected just for you</div>
        <a href={`book/${selectedBook.id}`} className="selected__book">
          <div className="selected__book--sub-title">
            {selectedBook.subTitle}
          </div>
          <div className="selected__book--line"></div>
          <div className="selected__book--content">
            <figure
              style={{ height: "140px", width: "140px", minWidth: "140px" }}
            >
              <img className="book__image" src={selectedBook.imageLink} />
            </figure>
            <div style={{ width: "100%" }}>
              <div className="selected__book--title">{selectedBook.title}</div>
              <div className="selected__book--author">
                {selectedBook.author}
              </div>
              <div className="selected__book--duration-wrapper">
                <div className="selected__book--icon">
                  <TbPlayerPlayFilled className="player__icon" />
                </div>
                {selectedBook?.audioLink && (
                  <>
                  <audio className="no__display" src={selectedBook?.audioLink} ref={(audioRef) => audioRef?.current[selectedBook.id]} onLoadedMetadata={() => {
                    onLoadedMetaData(selectedBook?.id); 
                  }}  />
                  <div className="selected__book--duration">{formatTime(duration[selectedBook.id]) || 0}</div>
                  </>
                )}
                
              </div>
            </div>
          </div>
        </a>
    </>
  );
}
