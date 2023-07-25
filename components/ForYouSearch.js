import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineStar } from "react-icons/ai";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

export default function ForYouSearch() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState([]);
  const [debounce, setDebounce] = useState("");

  async function fetchData(input) {
    try {
        const { data } = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${input}`
        );
        setSearch(data);
      } catch (error) {
      alert(error);
    }
  }

  function handleSideBar() {
    const sideBar = document.querySelector(".sidebar");
    const sideBarOverlay = document.querySelector(".sidebar__overlay");''
    sideBar.style.transform = "initial";
    sideBarOverlay.style.display = "flex";
  }

  function handleChange(value) {
    setInput(value);
    setTimeout(() => {
      setDebounce(true)
      fetchData(value);
    }, 5000)
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
            <RxHamburgerMenu
              onClick={handleSideBar}
              className="sidebar__toggle"
            />
          </div>
        </div>
        {debounce && input && search.length === 0 ? (
          <div className="search__books--wrapper">No book found</div>
        ) : (
          input && (
            <div className="search__books--wrapper">
              {search.map((book) => (
                <Link
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
                </Link>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
