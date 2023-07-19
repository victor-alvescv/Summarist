import React from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openSignInModal } from "@/redux/modalReducer";

export default function MyLibraryPage() {
  const [userStatus, setUserStatus] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserStatus(true);
      }
    });
    return unsubscribe;
  }, []);

  function handleOpenModal() {
   dispatch(openSignInModal())
  }

  return (
    <div className="row">
      <div className="container">
        {userStatus ? (
          <>
            <div className="finished__books--block-wrapper">
              <div className="finished__books--title">
                This feature was not implemented yet!
              </div>
              <div className="finished__books--subtitle">
                When you click to save a book, it will appear here.
              </div>
            </div>
          </>
        ) : (
          <div className="settings__login--wrapper">
            <img src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogin.e313e580.png&w=1080&q=75" />
            <div className="settings__login--text">
              Log in to your account to see your library.
            </div>
            <button onClick={handleOpenModal} className="btn settings__login--btn">Login</button>
          </div>
        )}
      </div>
    </div>
  );
}
