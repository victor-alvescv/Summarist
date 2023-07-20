import axios from "axios";
import React, { useEffect, useState } from "react";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useDispatch } from "react-redux";

export default function SelectedBook() {
  const [selectedBook, setSelectedBook] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  async function getSelectedBook() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    setSelectedBook(data[0]);
    setLoading(false);
  }

  useEffect(() => {
    getSelectedBook();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              borderRadius: "3px",
              width: "25%",
              height: "30px",
            }}
            className="for-you__title"
          ></div>
          <a
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              borderRadius: "3px",
            }}
            href={`book/${selectedBook.id}`}
            className="selected__book"
          >
            <div className="selected__book--sub-title"></div>
            <div className="selected__book--content">
              <figure
                style={{ height: "140px", width: "140px", minWidth: "140px" }}
              ></figure>
              <div style={{ width: "100%" }}>
                <div className="selected__book--title truncate__book--title"></div>
                <div className="selected__book--author"></div>
                <div className="selected__book--duration-wrapper">
                  <div className="selected__book--icon"></div>
                </div>
              </div>
            </div>
          </a>
        </>
      ) : (
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
                <div className="selected__book--title truncate__book--title">
                  {selectedBook.title}
                </div>
                <div className="selected__book--author">
                  {selectedBook.author}
                </div>
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
      )}
    </>
  );
}
