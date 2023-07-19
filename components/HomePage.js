import Nav from "./Nav";
import LandingPage from "./LandingPage";
import Features from "./Features";
import Reviews from "./Reviews";
import Numbers from "./Numbers";
import Footer from "./Footer";

export default function HomePage() {
  return (
    <>
      <div
        data-aos="fade-left"
        data-aos-delay="50"
        data-aos-once="true"
      >
        <Nav />
        <LandingPage />
        <Features />
        <Reviews />
        <Numbers />
        <Footer />
      </div>
    </>
  );
}
