import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { RiBallPenLine } from "react-icons/ri";
import { FiHelpCircle, FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch } from "react-redux";
import { openSignInModal } from "@/redux/modalReducer";
import Link from "next/link";

export default function ForYouSideBar({ sideBarHeight }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userStatus, setUserStatus] = useState(null);

  async function handleLogOutandLogIn() {
    await signOut(auth);
    if (router.pathname === `/book/[id]`) {
      router.reload();
    }
  }

  function SettingsRoute() {
    router.push("/settings");
  }

  function closeSideBar() {
    const sideBar = document.querySelector(".sidebar");
    const sideBarOverlay = document.querySelector(".sidebar__overlay");
    sideBar.style.transform = "translateX(-100%)";
    sideBarOverlay.style.display = "none";
  }

  useEffect(() => {
    if (router.pathname === "/for-you") {
      const forYouSideLine = document.querySelector(".foryou");
      forYouSideLine.style.backgroundColor = "#2bd97c";
    } else if (router.pathname === "/my-library") {
      const forYouSideLineLibrary = document.querySelector(".library");
      forYouSideLineLibrary.style.backgroundColor = "#2bd97c";
    } else if (router.pathname === "/settings") {
      const forYouSideLineSettings = document.querySelector(".settings");
      forYouSideLineSettings.style.backgroundColor = "#2bd97c";
    }

    if (sideBarHeight !== undefined) {
      const sideBar = document.querySelector(".sidebar__wrapper");
      sideBar.style.height = "calc(100vh - 140px)";
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserStatus(true);
      } else {
        setUserStatus(false);
      }
    });

    return unsubscribe;
  }, [userStatus]);

  return (
    <>
      <div onClick={closeSideBar} className="sidebar__overlay"></div>
      <div className="sidebar">
        <div className="sidebar__logo">
          <img src="/assets/logo.png" />
        </div>
        <div className="sidebar__wrapper">
          <div className="sidebar__top">
            <Link href="/for-you" className="sidebar__link--wrapper">
              <div
                className="sidebar__link--line foryou"
                style={{ backgroundColor: "2bd97c" }}
              ></div>
              <div className="sidebar__icon--wrapper">
                <AiOutlineHome className="sidebar__icon" />
              </div>
              <div className="sidebar__link--text">For you</div>
            </Link>
            <Link href="/my-library" className="sidebar__link--wrapper">
              <div
                className="sidebar__link--line library"
                style={{ backgroundColor: "2bd97c" }}
              ></div>
              <div className="sidebar__icon--wrapper">
                <BsBookmark className="sidebar__icon" />
              </div>
              <div className="sidebar__link--text">My Library</div>
            </Link>
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
            <Link href="/settings" onClick={SettingsRoute} className="sidebar__link--wrapper">
              <div
                className="sidebar__link--line settings"
                style={{ backgroundColor: "2bd97c" }}
              ></div>
              <div className="sidebar__icon--wrapper">
                <FiSettings className="sidebar__icon--bottom" />
              </div>
              <div className="sidebar__link--text">Settings</div>
            </Link>
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
            {!userStatus ? (
              <div
                onClick={() => dispatch(openSignInModal())}
                className="sidebar__link--wrapper"
              >
                <div
                  className="sidebar__link--line"
                  style={{ backgroundColor: "2bd97c" }}
                ></div>
                <div className="sidebar__icon--wrapper">
                  <MdLogout className="sidebar__icon--bottom" />
                </div>
                <div className="sidebar__link--text">Login</div>
              </div>
            ) : (
              <div
                onClick={handleLogOutandLogIn}
                className="sidebar__link--wrapper"
              >
                <div
                  className="sidebar__link--line"
                  style={{ backgroundColor: "2bd97c" }}
                ></div>
                <div className="sidebar__icon--wrapper">
                  <MdLogout className="sidebar__icon--bottom" />
                </div>
                <div className="sidebar__link--text">Logout</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
