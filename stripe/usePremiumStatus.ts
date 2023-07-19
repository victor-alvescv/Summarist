import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import isUserPremiumPlus from "./isUserPremiumPlus";

export default function usePremiumStatus(user: User) {
  const [premiumStatus, setPremiumStatus] = useState(false);

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        setPremiumStatus(await isUserPremiumPlus());
      };
      checkPremiumStatus();
    }
  }, [user]);

  return premiumStatus;
}