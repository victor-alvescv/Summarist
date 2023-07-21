import { auth } from "@/firebase";
import { openSignInModal } from "@/redux/modalReducer";
import usePremiumStatus from "@/stripe/usePremiumStatus";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserStatus(currentUser?.email);
      } else {
        setUserStatus(false);
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return unsubscribe;
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {!loading ? (
            userStatus === false ? (
              <div className="settings__login--wrapper settings__row--user">
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
                    <div
                      style={{
                        maxWidth: "500px",
                        margin: "0 auto",
                        textAlign: "center",
                        color: "#6b757b",
                      }}
                      className="settings__text"
                    >
                      This is a Guest Profile. To have information about your
                      profile, you first need to create one!
                    </div>
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
                          <Link
                            href="/choose-plan"
                            style={{ padding: "0 32px" }}
                            className="btn settings__upgrade--btn"
                          >
                            Upgrade to Premium
                          </Link>
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
            )
          ) : (
            <>
              <div
                style={{ paddingBottom: "initial" }}
                className="setting__content"
              >
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    borderRadius: "3px",
                    width: "14%",
                    height: "45px",
                  }}
                  className="section__title page__title"
                ></div>
              </div>
              <div className="setting__content">
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    borderRadius: "3px",
                    width: "20%",
                    height: "25px",
                  }}
                  className="settings__sub--title"
                ></div>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    borderRadius: "3px",
                    width: "10%",
                    height: "15px",
                  }}
                  className="settings__sub--title"
                ></div>
              </div>
              <div className="setting__content">
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    borderRadius: "3px",
                    width: "10%",
                    height: "25px",
                    margin: "initial",
                  }}
                  className="setting__content"
                ></div>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    borderRadius: "3px",
                    width: "30%",
                    height: "15px",
                  }}
                  className="settings__sub--title"
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
