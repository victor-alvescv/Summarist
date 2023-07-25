import { Modal } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { BsFillPersonFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openSignInModal } from "@/redux/modalReducer";
import SignUpModal from "./SignUpModal";
import PasswordModal from "./ForgotPasswordModal";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "@/firebase";
import { setUser } from "@/redux/userReducer";
import { Ring } from "@uiball/loaders";
import { useRouter } from "next/router";

export default function SignInModal() {
  const isOpen = useSelector((state) => state.modals.SignInModalOpen);
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [guestAuth, setGuestAuth] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false)
      setError('')
      dispatch(openSignInModal());
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }


  function handleCloseModal() {
    setLoading(false);
    if (error) {
      setError("");
    }
    setEmail("");
    setPassword("");
    dispatch(openSignInModal());
  }

  async function handleGoogleSignIn() {
    setGoogleAuth(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      dispatch(openSignInModal());
    } catch (error) {
      alert(error);
      setGoogleAuth(false);
    }
  }

  async function handleGuestSignIn(email, password) {
    setGuestAuth(true);
    await signInWithEmailAndPassword(
      auth,
      "guest37899072@gmail.com",
      "GDhdfug9dgiowhd"
    );
    setGuestAuth(false)
    dispatch(openSignInModal());
  }



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setValue(localStorage.getItem("email"));
      if (router.pathname === "/") {
        if (currentUser) {
          router.push("/for-you");
        }
      }
      if (!currentUser) return;
      dispatch(
        setUser({
          email: currentUser?.email,
        })
      );
    });
    return unsubscribe;
  }, []);


  return (
    <>
      <Modal className="modal" open={isOpen} onClose={handleCloseModal}>
        <div className="auth">
          <RxCross2 onClick={handleCloseModal} className="cross__btn" />
          <div className="modal__title">Log In to Summarist</div>
          {error && (
            <div
              style={{
                color: "#f56c6c",
                marginBottom: "16px",
                textAlign: "start",
              }}
            >
              {error}
            </div>
          )}
          <button onClick={handleGuestSignIn} className="guest__btn--wrapper">
            <figure className="guest__img--wrapper">
              <BsFillPersonFill className="guest__img" />
            </figure>
            {guestAuth ? (
              <div className="modal--guest__btn">
                <Ring size={20} lineWeight={5} speed={2} color="white" />
              </div>
            ) : (
              <div className="modal--guest__btn">
                Login as a Guest
              </div>
            )}
          </button>
          <div className="btn__separator">
            <span className="btn__separator--text">or</span>
          </div>
          <button onClick={handleGoogleSignIn} className="google__btn--wrapper">
            <figure className="google__img--wrapper">
              <img
                className="google__img"
                src="https://img.freepik.com/icones-gratis/procurar_318-265146.jpg?w=360"
              />
            </figure>
            {googleAuth ? (
              <div className="modal--guest__btn">
                <Ring size={20} lineWeight={5} speed={2} color="white" />
              </div>
            ) : (
              <div className="modal--google__btn">
                Login with Google
              </div>
            )}
          </button>
          <div className="btn__separator">
            <span className="btn__separator--text">or</span>
          </div>
          <form className="modal__form">
            <input
              className="modal__input"
              type={"email"}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              className="modal__input"
              type={"password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {loading ? (
              <div className="btn loader__btn">
                <Ring size={20} lineWeight={5} speed={2} color="white" />
              </div>
            ) : (
              <div
                onClick={handleSignIn}
                style={{ cursor: "pointer" }}
                className="btn input__btn"
              >
                Login
              </div>
            )}
            <PasswordModal />
            <SignUpModal />
          </form>
        </div>
      </Modal>
    </>
  );
}
