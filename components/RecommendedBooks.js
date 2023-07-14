import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";

export default function RecommendedBooks() {
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  async function getRecommendedBooks() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    );
    setRecommendedBooks(data);
  }

  useEffect(() => {
    getRecommendedBooks();
  }, []);


  return (
    <div>
      <div className="for-you__title">Recommended For You</div>
      <div className="for-you__sub--title">We think you’ll like these</div>
      <div className="for-you__recommended--books">
        {recommendedBooks.map((book) => (
          <a href={`/book/${book.id}`} className="for-you__recommended--books-link" key={book.id}>
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
                <div className="recommended__book--details-text">3:24</div>
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
