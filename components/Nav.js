import { openSignInModal } from "@/redux/modalReducer";
import { useDispatch } from "react-redux";

export default function Nav() {
  const dispatch = useDispatch();

  return (
    <nav className="nav">
      <div data-aos="fade-down" data-aos-delay="300" data-aos-once="true">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <img className="nav__img" src="/assets/logo.png" alt="logo" />
          </figure>
          <ul className="nav__list--wrapper">
            <li
              onClick={() => dispatch(openSignInModal())}
              className="nav__list nav__list--login"
            >
              Login
            </li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
