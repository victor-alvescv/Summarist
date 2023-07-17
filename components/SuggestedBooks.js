import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";

export default function SuggestedBooks() {
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [durations, setDurations] = useState({});
  const durationsRef = useRef({});

  async function getSuggestedBooks() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
    );
    setSuggestedBooks(data);

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
  }

  useEffect(() => {
    getSuggestedBooks();
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
    <div>
      <div className="for-you__title">Suggested Books</div>
      <div className="for-you__sub--title">Browse those books</div>
      <div className="for-you__recommended--books">
        {suggestedBooks.map((book) => (
          <a
            href={`/book/${book.id}`}
            className="for-you__recommended--books-link"
            key={book.id}
          >
            {book.subscriptionRequired && (
              <div className="book__pill">Premium</div>
            )}
            <figure className="book__image--wrapper">
              <img className="book__image" src={book.imageLink} />
            </figure>
            <div className="recommended__book--title">{book.title}</div>
            <div className="recommended__book--author">{book.author}</div>
            <div className="recommended__book--sub-title">{book.subTitle}</div>
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
  );
}
