import { Modal } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closePasswordModal, openPasswordModal } from "@/redux/modalReducer";
import { useState } from "react";
import { Ring } from "@uiball/loaders";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";

export default function PasswordModal() {
  const isOpen = useSelector((state) => state.modals.PasswordModalOpen);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleModalPassword() {
    setSend(false);
    setEmail("");
    dispatch(closePasswordModal());
    setError("");
  }

  async function handleForgotPassword() {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setTimeout(() => {
        setEmail("");
      }, 2000);
      setTimeout(() => {
        setSend(true);
        setLoading(false);
        setError(false);
      }, 2000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      <div
        onClick={() => dispatch(openPasswordModal())}
        className="forgot__password--btn"
      >
        Forgot your password?
      </div>
      <Modal className="modal" open={isOpen} onClose={handleModalPassword}>
        <div className="auth" style={{ minHeight: "initial" }}>
          <RxCross2 onClick={handleModalPassword} className="cross__btn" />
          <div className="modal__title">Reset your password</div>
          <form className="modal__form">
            {send && (
              <div style={{ color: "#2bd97c", marginBottom: "2px" }}>
                Your reset email has been sent!
              </div>
            )}
            {error && (
              <div style={{ color: "#f56c6c", marginBottom: "2px" }}>
                {error}
              </div>
            )}
            <input
              className="modal__input"
              type={"email"}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            {loading ? (
              <div className="btn loader__btn">
                <Ring size={20} lineWeight={5} speed={2} color="white" />
              </div>
            ) : (
              <div
                onClick={handleForgotPassword}
                style={{ cursor: "pointer" }}
                className="btn input__btn"
              >
                Send reset password link
              </div>
            )}
            <div onClick={handleModalPassword} className="account__btn">
              Go to login
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
