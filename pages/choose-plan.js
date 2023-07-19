import React, { useEffect, useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import Footer from "@/components/Footer";
import Head from "next/head";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { openSignInModal } from "@/redux/modalReducer";
import SignInModal from "@/components/modals/SignInModal";
import { auth } from "@/firebase";


export default function choosePlan() {

  const [div1, setDiv1] = useState(false);
  const [div2, setDiv2] = useState(false);
  const [div3, setDiv3] = useState(false);
  const [div4, setDiv4] = useState(false);
  const dispatch = useDispatch();
  const [activePlanYear, setActivePlanYear] = useState(true);
  const [activePlanMonth, setActivePlanMonth] = useState(false);
  const [userStatus, setUserStatus] = useState(null);
  
  function handleClickMonth() {
    setActivePlanYear(false);
    setActivePlanMonth(true);
  }

  function handleClickYear() {
    setActivePlanMonth(false);
    setActivePlanYear(true);
  }

  function handleDiv1() {
    setDiv1((div1) => !div1);
    setDiv2(false);
    setDiv3(false);
    setDiv4(false);
  }

  function handleDiv2() {
    setDiv1(false);
    setDiv2((div2) => !div2);
    setDiv3(false);
    setDiv4(false);
  }

  function handleDiv3() {
    setDiv1(false);
    setDiv2(false);
    setDiv3((div3) => !div3);
    setDiv4(false);
  }

  function handleDiv4() {
    setDiv1(false);
    setDiv2(false);
    setDiv3(false);
    setDiv4((div4) => !div4);
  }

  function handleUserStatus() {
    if (!userStatus) {
      console.log("dhia");
      dispatch(openSignInModal());
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserStatus(true);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <SignInModal />
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/assets/favicon.png" />
        <link href="./style.css" />
        <title>Summarist - Choose Plan</title>
      </Head>
      <div className="wrapper wrapper__full">
        <div style={{ width: "100%" }} className="plan">
          <div className="plan__header--wrapper">
            <div className="plan__header">
              <div className="plan__title">
                Get unlimited access to many amazing books to read
              </div>
              <div className="plan__sub--title">
                Turn ordinary moments into amazing learning opportunities
              </div>
              <figure className="plan__img--mask">
                <img src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpricing-top.4d86e93a.png&w=1080&q=75" />
              </figure>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <div className="plan__features--wrapper">
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <AiFillFileText className="plan__icon" />
                  </figure>
                  <div className="plan__features--text">
                    <b>Key ideas in few min</b> with many books to read
                  </div>
                </div>
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <RiPlantFill className="plan__icon" />
                  </figure>
                  <div className="plan__features--text">
                    <b>3 million</b> people growing with Summarist everyday
                  </div>
                </div>
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <FaHandshake className="plan__icon" />
                  </figure>
                  <div className="plan__features--text">
                    <b>Precise recommendations</b> collections curated by
                    experts
                  </div>
                </div>
              </div>
              <div className="section__title">
                Choose the plan that fits you
              </div>
              {!activePlanYear ? (
                <div onClick={handleClickYear} className={`plan__card`}>
                  <div className="plan__card--circle">
                    <div className={`plan__card--dot`}></div>
                  </div>
                  <div className="plan__card--content">
                    <div className="plan__card--title">Premium Plus Yearly</div>
                    <div className="plan__card--price">$120.99/year</div>
                    <div className="plan__card--text">
                      7-day free trial included
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{ borderColor: "#2bd97c" }}
                  className={`plan__card`}
                >
                  <div className="plan__card--circle">
                    <div
                      style={{ display: "flex" }}
                      className={`plan__card--dot`}
                    ></div>
                  </div>
                  <div className="plan__card--content">
                    <div className="plan__card--title">Premium Plus Yearly</div>
                    <div className="plan__card--price">$9.99/month</div>
                    <div className="plan__card--text">
                      7-day free trial included
                    </div>
                  </div>
                </div>
              )}

              <div className="plan__card--separator">
                <div className="plan__separator">or</div>
              </div>
              {!activePlanMonth ? (
                <div onClick={handleClickMonth} className="plan__card">
                  <div className="plan__card--circle">
                    <div className="plan__card--dot"></div>
                  </div>
                  <div className="plan__card--content">
                    <div className="plan__card--title">Premium Monthly</div>
                    <div className="plan__card--price">$14.99/month</div>
                    <div className="plan__card--text">No trial included</div>
                  </div>
                </div>
              ) : (
                <div style={{ borderColor: "#2bd97c" }} className="plan__card">
                  <div className="plan__card--circle">
                    <div
                      style={{ display: "flex" }}
                      className="plan__card--dot"
                    ></div>
                  </div>
                  <div className="plan__card--content">
                    <div className="plan__card--title">Premium Monthly</div>
                    <div className="plan__card--price">$14.99/month</div>
                    <div className="plan__card--text">No trial included</div>
                  </div>
                </div>
              )}
              {activePlanYear && (
                <div className="plan__card--cta">
                  <span className="btn--wrapper" onClick={handleUserStatus}>
                    <button className="btn" style={{ width: "300px" }}>
                      Start your free 7-day trial
                    </button>
                  </span>
                  <div className="plan__disclaimer">
                    Cancel your trial at any time before it ends, and you won’t
                    be charged.
                  </div>
                </div>
              )}
              {activePlanMonth && (
                <div className="plan__card--cta">
                  <span className="btn--wrapper" onClick={handleUserStatus}>
                    <button className="btn" style={{ width: "300px" }}>
                      Start your first month
                    </button>
                  </span>
                  <div className="plan__disclaimer">
                    30-day money back guarantee, no questions asked.
                  </div>
                </div>
              )}

              <div className="faq__wrapper">
                <div className="accordion__card" onClick={handleDiv1}>
                  <div className="accordion__header">
                    <div className="accordion__title">
                      How does the free 7-day trial work?
                    </div>
                    {div1 ? (
                      <SlArrowDown
                        style={{ transform: "rotate(180deg)" }}
                        className="accordion__icon rotate"
                      />
                    ) : (
                      <SlArrowDown className="accordion__icon" />
                    )}
                  </div>
                  {div1 ? (
                    <div style={{ height: "96px" }} className="collapse">
                      <div className="accordion__body">
                        Begin your complimentary 7-day trial with a Summarist
                        annual membership. You are under no obligation to
                        continue your subscription, and you will only be billed
                        when the trial period expires. With Premium access, you
                        can learn at your own pace and as frequently as you
                        desire, and you may terminate your subscription prior to
                        the conclusion of the 7-day free trial.
                      </div>
                    </div>
                  ) : (
                    <div style={{ height: "0px" }} className="collapse">
                      <div className="accordion__body">
                        Begin your complimentary 7-day trial with a Summarist
                        annual membership. You are under no obligation to
                        continue your subscription, and you will only be billed
                        when the trial period expires. With Premium access, you
                        can learn at your own pace and as frequently as you
                        desire, and you may terminate your subscription prior to
                        the conclusion of the 7-day free trial.
                      </div>
                    </div>
                  )}
                </div>
                <div className="accordion__card" onClick={handleDiv2}>
                  <div className="accordion__header">
                    <div className="accordion__title">
                      Can I switch subscriptions from monthly to yearly, or
                      yearly to monthly?
                    </div>
                    {div2 ? (
                      <SlArrowDown
                        style={{ transform: "rotate(180deg)" }}
                        className="accordion__icon rotate"
                      />
                    ) : (
                      <SlArrowDown className="accordion__icon" />
                    )}
                  </div>
                  {div2 ? (
                    <div style={{ height: "96px" }} className="collapse">
                      <div className="accordion__body">
                        While an annual plan is active, it is not feasible to
                        switch to a monthly plan. However, once the current
                        month ends, transitioning from a monthly plan to an
                        annual plan is an option.
                      </div>
                    </div>
                  ) : (
                    <div style={{ height: "0px" }} className="collapse">
                      <div className="accordion__body">
                        While an annual plan is active, it is not feasible to
                        switch to a monthly plan. However, once the current
                        month ends, transitioning from a monthly plan to an
                        annual plan is an option.
                      </div>
                    </div>
                  )}
                </div>
                <div className="accordion__card" onClick={handleDiv3}>
                  <div className="accordion__header">
                    <div className="accordion__title">
                      What's included in the Premium plan?
                    </div>
                    {div3 ? (
                      <SlArrowDown
                        style={{ transform: "rotate(180deg)" }}
                        className="accordion__icon rotate"
                      />
                    ) : (
                      <SlArrowDown className="accordion__icon" />
                    )}
                  </div>
                  {div3 ? (
                    <div style={{ height: "96px" }} className="collapse">
                      <div className="accordion__body">
                        Premium membership provides you with the ultimate
                        Summarist experience, including unrestricted entry to
                        many best-selling books high-quality audio, the ability
                        to download titles for offline reading, and the option
                        to send your reads to your Kindle.
                      </div>
                    </div>
                  ) : (
                    <div style={{ height: "0px" }} className="collapse">
                      <div className="accordion__body">
                        Premium membership provides you with the ultimate
                        Summarist experience, including unrestricted entry to
                        many best-selling books high-quality audio, the ability
                        to download titles for offline reading, and the option
                        to send your reads to your Kindle.
                      </div>
                    </div>
                  )}
                </div>
                <div className="accordion__card" onClick={handleDiv4}>
                  <div className="accordion__header">
                    <div className="accordion__title">
                      Can I cancel during my trial or subscription?
                    </div>
                    {div4 ? (
                      <SlArrowDown
                        style={{ transform: "rotate(180deg)" }}
                        className="accordion__icon rotate"
                      />
                    ) : (
                      <SlArrowDown className="accordion__icon" />
                    )}
                  </div>
                  {div4 ? (
                    <div style={{ height: "96px" }} className="collapse">
                      <div className="accordion__body">
                        You will not be charged if you cancel your trial before
                        its conclusion. While you will not have complete access
                        to the entire Summarist library, you can still expand
                        your knowledge with one curated book per day.
                      </div>
                    </div>
                  ) : (
                    <div style={{ height: "0px" }} className="collapse">
                      <div className="accordion__body">
                        You will not be charged if you cancel your trial before
                        its conclusion. While you will not have complete access
                        to the entire Summarist library, you can still expand
                        your knowledge with one curated book per day.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
