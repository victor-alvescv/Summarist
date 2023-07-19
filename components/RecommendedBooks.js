import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";

export default function RecommendedBooks({ checkUserStatus }) {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [durations, setDurations] = useState({});
  const durationsRef = useRef({});
  const [loading, setLoading] = useState(true);

  async function getRecommendedBooks() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    );
    setRecommendedBooks(data);

    const durationsObj = {};
    data.forEach((book) => {
      if (book.audioLink) {
        const audioElement = new Audio(book.audioLink);
        durationsRef.current[book.id] = audioElement;
        audioElement.addEventListener("loadedmetadata", () => {
          durationsObj[book.id] = audioElement.duration;
          setDurations({ ...durationsObj });
        });
      }
    });
      setLoading(false);
  }

  useEffect(() => {
    getRecommendedBooks();
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
      {loading ? (
        <div>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              borderRadius: "3px",
              width: "25%",
              height: "30px",
            }}
            className="for-you__title"
          ></div>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              borderRadius: "3px",
              width: "20%",
              height: "20px",
            }}
            className="for-you__sub--title"
          ></div>
          <div className="for-you__recommended--books">
            {new Array(4).fill(0).map((_, index) => (
              <a className="for-you__recommended--books-link" key={index}>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    borderRadius: "3px",
                    width: "30%",
                    height: "15px",
                  }}
                  className="book__pill"
                ></div>
                <figure
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    borderRadius: "3px",
                    maxWidth: "100%",
                    maxHeight: "170px",
                  }}
                  className="book__image--wrapper"
                ></figure>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    borderRadius: "3px",
                    width: "85%",
                    height: "15px",
                  }}
                  className="recommended__book--title"
                ></div>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    borderRadius: "3px",
                    width: "55%",
                    height: "10px",
                  }}
                  className="recommended__book--author"
                ></div>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    borderRadius: "3px",
                    width: "100%",
                    height: "10px",
                  }}
                  className="recommended__book--sub-title"
                ></div>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    borderRadius: "3px",
                    width: "20%",
                    height: "10px",
                  }}
                  className="recommended__book--details-wrapper"
                >
                  <div className="recommended__book--details">
                    <div className="recommended__book--details-text"></div>
                  </div>
                  <div className="recommended__book--details">
                    <div className="recommended__book--details-text"></div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="for-you__title">Recommended For You</div>
          <div className="for-you__sub--title">We think you’ll like these</div>
          <div className="for-you__recommended--books">
            {recommendedBooks.map((book) => (
              <a
                href={`/book/${book.id}`}
                className="for-you__recommended--books-link"
                key={book.id}
              >
                {!checkUserStatus && book.subscriptionRequired && (
                  <div className="book__pill">Premium</div>
                )}
                <figure className="book__image--wrapper">
                  <img className="book__image" src={book.imageLink} />
                </figure>
                <div className="recommended__book--title truncate__book--title">
                  {book.title}
                </div>
                <div className="recommended__book--author">{book.author}</div>
                <div className="recommended__book--sub-title">
                  {book.subTitle}
                </div>
                <div className="recommended__book--details-wrapper">
                  <div className="recommended__book--details">
                    <AiOutlineClockCircle className="recommended__book--details-icon" />
                    <div className="recommended__book--details-text">
                      {formatTime(durations[book.id]) || "0:00"}
                    </div>
                  </div>
                  <div className="recommended__book--details">
                    <AiOutlineStar className="recommended__book--details-icon" />
                    <div className="recommended__book--details-text">
                      {book.averageRating}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
