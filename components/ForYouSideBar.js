import React from "react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { RiBallPenLine } from "react-icons/ri";
import { FiHelpCircle, FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default function ForYouSideBar() {
  const router = useRouter();

  async function handleLogOutandLogIn() {
    console.log('dhawio')
    await signOut(auth);
  }

  function forYouBtn() {
    router.push("/for-you");
  }

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src="https://summarist.vercel.app/_next/static/media/logo.1b1c490b.png" />
      </div>
      <div className="sidebar__wrapper">
        <div className="sidebar__top">
          <a className="sidebar__link--wrapper">
            <div
              className="sidebar__link--line"
              style={{ backgroundColor: "2bd97c" }}
            ></div>
            <div className="sidebar__icon--wrapper">
              <AiOutlineHome className="sidebar__icon" />
            </div>
            <div onClick={forYouBtn} className="sidebar__link--text">For you</div>
          </a>
          <a className="sidebar__link--wrapper">
            <div
              className="sidebar__link--line"
              style={{ backgroundColor: "2bd97c" }}
            ></div>
            <div className="sidebar__icon--wrapper">
              <BsBookmark className="sidebar__icon" />
            </div>
            <div className="sidebar__link--text">My Library</div>
          </a>
          <div className="sidebar__link--wrapper sidebar__link--not-allowed">
            <div
              className="sidebar__link--line"
              style={{ backgroundColor: "2bd97c" }}
            ></div>
            <div className="sidebar__icon--wrapper">
              <RiBallPenLine className="sidebar__icon" />
            </div>
            <div className="sidebar__link--text">Highlights</div>
          </div>
          <div className="sidebar__link--wrapper sidebar__link--not-allowed">
            <div
              className="sidebar__link--line"
              style={{ backgroundColor: "2bd97c" }}
            ></div>
            <div className="sidebar__icon--wrapper">
              <AiOutlineSearch className="sidebar__icon" />
            </div>
            <div className="sidebar__link--text">Search</div>
          </div>
        </div>
        <div className="sidebar__bottom">
          <a className="sidebar__link--wrapper">
            <div
              className="sidebar__link--line"
              style={{ backgroundColor: "2bd97c" }}
            ></div>
            <div className="sidebar__icon--wrapper">
              <FiSettings className="sidebar__icon--bottom" />
            </div>
            <div className="sidebar__link--text">Settings</div>
          </a>
          <div className="sidebar__link--wrapper sidebar__link--not-allowed">
            <div
              className="sidebar__link--line"
              style={{ backgroundColor: "2bd97c" }}
            ></div>
            <div className="sidebar__icon--wrapper">
              <FiHelpCircle className="sidebar__icon--bottom" />
            </div>
            <div className="sidebar__link--text">Help & Support</div>
          </div>
          <div className="sidebar__link--wrapper">
            <div
              className="sidebar__link--line"
              style={{ backgroundColor: "2bd97c" }}
            ></div>
            <div className="sidebar__icon--wrapper">
              <MdLogout style={{}} className="sidebar__icon--bottom" />
            </div>
            <div onClick={handleLogOutandLogIn} className="sidebar__link--text">
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
