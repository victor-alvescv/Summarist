import { auth } from "@/firebase";
import { openSignInModal } from "@/redux/modalReducer";
import usePremiumStatus from "@/stripe/usePremiumStatus";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

export default function SettingsPage() {
  const [userStatus, setUserStatus] = useState(null);
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [isUser, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(isUser);
  const checkUserStatus = usePremiumStatus(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserStatus(currentUser?.email);
      } else {
        setUserStatus(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {userStatus === false ? (
            <div className="settings__login--wrapper">
              <img src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogin.e313e580.png&w=1080&q=75" />
              <div className="settings__login--text">
                Log in to your account to see your library.
              </div>
              <button
                onClick={() => dispatch(openSignInModal())}
                className="btn settings__login--btn"
              >
                Login
              </button>
            </div>
          ) : (
            <>
              {userStatus === "guest37899072@gmail.com" ? (
                <div className="row error__row--wrapper">
                  <figure className="error__wrapper">
                    <img className="guest" src="/assets/guest.svg" />
                  </figure>
                  <div className="page__not__found">Guest Profile</div>
                  <div style={{maxWidth: '500px', margin: '0 auto', textAlign: 'center', color: '#6b757b'}} className="settings__text">This is a Guest Profile. To have information about your profile, you first need to create one!</div>
                </div>
              ) : (
                <>
                  <div className="section__title page__title">Settings</div>

                  <div className="setting__content">
                    <div className="settings__sub--title">
                      Your Subscription plan
                    </div>
                    {userIsPremium ? (
                      <div className="settings__text">{checkUserStatus}</div>
                    ) : (
                      <>
                        {" "}
                        <div className="settings__text">Basic</div>
                        <a
                          href="/choose-plan"
                          style={{ padding: "0 32px" }}
                          className="btn settings__upgrade--btn"
                        >
                          Upgrade to Premium
                        </a>
                      </>
                    )}
                  </div>
                </>
              )}
              {userStatus !== "guest37899072@gmail.com" && (
                <div className="setting__content">
                  <div className="settings__sub--title">Email</div>
                  <div className="settings__text">{userStatus}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
