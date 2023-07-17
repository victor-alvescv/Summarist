import axios from "axios";
import React, { useEffect, useState } from "react";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useDispatch } from "react-redux";

export default function SelectedBook() {
  const [selectedBook, setSelectedBook] = useState("");
  const dispatch = useDispatch();

  async function getSelectedBook() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    setSelectedBook(data[0]);
  }

  useEffect(() => {
    getSelectedBook();
  }, []);

  return (
    <>
      <div className="for-you__title">Selected just for you</div>
      <a href={`book/${selectedBook.id}`} className="selected__book">
        <div className="selected__book--sub-title">{selectedBook.subTitle}</div>
        <div className="selected__book--line"></div>
        <div className="selected__book--content">
          <figure
            style={{ height: "140px", width: "140px", minWidth: "140px" }}
          >
            <img className="book__image" src={selectedBook.imageLink} />
          </figure>
          <div style={{ width: "100%" }}>
            <div className="selected__book--title">{selectedBook.title}</div>
            <div className="selected__book--author">{selectedBook.author}</div>
            <div className="selected__book--duration-wrapper">
              <div className="selected__book--icon">
                <TbPlayerPlayFilled className="player__icon" />
              </div>
              <div> Acess Now!</div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
