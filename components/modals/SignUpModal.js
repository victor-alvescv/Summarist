import { Modal } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  closeSignInModal,
  closeSignUpModal,
  openSignUpModal,
} from "@/redux/modalReducer";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { setUser } from "@/redux/userReducer";
import { useRouter } from "next/router";
import { Ring } from "@uiball/loaders";
import { auth, provider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";

export default function SignUpModal() {
  const isOpen = useSelector((state) => state.modals.SignUpModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignUp() {
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(closeSignUpModal());
      dispatch(closeSignInModal());
      setError("");
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  function handleCloseModal() {
    setError("");
    dispatch(closeSignUpModal());
    setEmail("");
    setPassword("");
  }

  function handleGoogleSignIn() {
    alert("Not implemented yet");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      dispatch(
        setUser({
          email: currentUser?.email,
        })
      );
      dispatch(closeSignUpModal());
      dispatch(closeSignInModal());
      router.push("/for-you");
    });

    return unsubscribe;
  });

  return (
    <>
      <div onClick={() => dispatch(openSignUpModal())} className="account__btn">
        Don't have an account?
      </div>
      <Modal className="modal" open={isOpen} onClose={handleCloseModal}>
        <div className="auth" style={{ minHeight: "initial" }}>
          <RxCross2 onClick={handleCloseModal} className="cross__btn" />
          <div className="modal__title">Sign Up to Summarist</div>
          {error && (
            <div style={{ color: "#f56c6c", marginBottom: "16px" }}>
              {error}
            </div>
          )}
          <button onClick={handleGoogleSignIn} className="google__btn--wrapper">
            <figure className="google__img--wrapper">
              <img
                className="google__img"
                src="https://img.freepik.com/icones-gratis/procurar_318-265146.jpg?w=360"
              />
            </figure>
            <div className="modal--google__btn">Sign up with Google</div>
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
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {loading ? (
              <div className="btn loader__btn">
                <Ring size={20} lineWeight={5} speed={2} color="white" />
              </div>
            ) : (
              <div
                onClick={handleSignUp}
                style={{ cursor: "pointer" }}
                className="btn input__btn"
              >
                Sign Up
              </div>
            )}
            <div onClick={handleCloseModal} className="account__btn">
              Already have an account?
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
