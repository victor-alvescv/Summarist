import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";

export default function ForYouSearch() {
  return (
    <div className='search__background'>
                <div className='search__wrapper'>
                  <figure></figure>
                  <div className='search__content'>
                    <div className='search'>
                      <div className='search__input--wrapper'>
                        <input className="search__input" placeholder="Search for books" type="text"></input>
                        <div className="search__icon">
                          <AiOutlineSearch className="icon" />
                        </div>
                      </div>
                    </div>
                    <div className='sidebar__toggle--btn'></div>
                  </div>
                </div>
              </div>
  )
}
