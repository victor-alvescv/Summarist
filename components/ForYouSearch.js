import axios from "axios";
import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineStar } from "react-icons/ai";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

export default function ForYouSearch() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState([]);

  async function fetchData(value) {
    try {
      if (value) {
        const { data } = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${input}`
        );
        setSearch(data);
      }
    } catch (error) {
      alert(error);
    }
  }

  function handleSideBar() {
    
  }

  function handleChange(value) {
    setInput(value);
    fetchData(value);
  }

  function handleClearSearch() {
    setSearch([]);
    setInput("");
  }

  return (
    <div className="search__background">
      <div className="search__wrapper">
        <figure></figure>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                onChange={(e) => handleChange(e?.target?.value)}
                value={input}
                className="search__input"
                placeholder="Search for books"
                type="text"
              ></input>
              {input ? (
                <div
                  onClick={handleClearSearch}
                  style={{ cursor: "pointer" }}
                  className="search__icon"
                >
                  <RxCross2 className="icon cross__icon" />
                </div>
              ) : (
                <div className="search__icon">
                  <AiOutlineSearch className="icon" />
                </div>
              )}
            </div>
          </div>
          <div className="sidebar__toggle--btn">
          <RxHamburgerMenu onClick={handleSideBar} className="sidebar__toggle" />
          </div>
        </div>
        {input && search.length === 0 ? (
          <div className="search__books--wrapper">No book found</div>
        ) : (
          input && (
            <div className="search__books--wrapper">
              {search.map((book) => (
                <a
                  href={`/book/${book.id}`}
                  className="search__book--link"
                  key={book?.id}
                >
                  <figure
                    className="book__image--wrapper"
                    style={{ height: "80px", width: "80px", minWidth: "80px" }}
                  >
                    <img className="book__image" src={book?.imageLink} />
                  </figure>
                  <div>
                    <div className="search__book--title truncate">
                      {book?.title}
                    </div>
                    <div className="search__book--author">{book?.author}</div>
                    <div className="search__book--star-wrapper">
                      <AiOutlineStar />
                      <div className="search__book--star">
                        {book?.averageRating}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
