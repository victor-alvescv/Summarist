import React, { useEffect, useRef, useState } from "react";
import SelectedBook from "../components/SelectedBook";
import RecommendedBooks from "../components/RecommendedBooks";
import SuggestedBooks from "../components/SuggestedBooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import usePremiumStatus from "@/stripe/usePremiumStatus";
import { onAuthStateChanged } from "firebase/auth";

export default function ForYouPage() {
  const audioRef = useRef(null);
  const audioDuration = useRef(0);
  const [user, setUser] = useState("");
  const [isUser, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(isUser);
  const checkUserStatus = usePremiumStatus(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="row">
      <div className="container">
        <div className="for-you__wrapper">
          <SelectedBook />
          <RecommendedBooks
            checkUserStatus={checkUserStatus}
            audioRef={audioRef}
            audioDuration={audioDuration}
          />
          <SuggestedBooks
            checkUserStatus={checkUserStatus}
            audioRef={audioRef}
            audioDuration={audioDuration}
          />
        </div>
      </div>
    </div>
  );
}
