import React from "react";

import { AiFillFileText } from "react-icons/ai";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import Footer from "@/components/Footer";

export default function choosePlan() {
  return (
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
                  <b>Precise recommendations</b> collections curated by experts
                </div>
              </div>
            </div>
            <div className="section__title">Choose the plan that fits you</div>
            <div className="plan__card">
              <div className="plan__card--circle">
                <div className="plan__card--dot"></div>
              </div>
              <div className="plan__card--content">
                <div className="plan__card--title">Premium Plus Yearly</div>
                <div className="plan__card--price">$120.99/year</div>
                <div className="plan__card--text">
                  7-day free trial included
                </div>
              </div>
            </div>
            <div className="plan__card--separator">
              <div className="plan__separator">or</div>
            </div>
            <div className="plan__card ">
              <div className="plan__card--circle">
                <div className="plan__card--dot"></div>
              </div>
              <div className="plan__card--content">
                <div className="plan__card--title">Premium Monthly</div>
                <div className="plan__card--price">$14.99/month</div>
                <div className="plan__card--text">No trial included</div>
              </div>
            </div>
            <div className="plan__card--cta">
              <span className="btn--wrapper">
                <button className="btn" style={{ width: "300px" }}>
                  Start your free 7-day trial
                </button>
              </span>
              <div className="plan__disclaimer">
                Cancel your trial at any time before it ends, and you won’t be
                charged.
              </div>
            </div>
            <div className="faq__wrapper">
              <div className="accordion__card">
                <div className="accordion__header">
                  <div className="accordion__title">
                    How does the free 7-day trial work?
                  </div>
                  <SlArrowDown className="accordion__icon" />
                </div>
              </div>
              <div className="accordion__card">
                <div className="accordion__header">
                  <div className="accordion__title">
                    Can I switch subscriptions from monthly to yearly, or yearly
                    to monthly?
                  </div>
                  <SlArrowDown className="accordion__icon" />
                </div>
              </div>
              <div className="accordion__card">
                <div className="accordion__header">
                  <div className="accordion__title">
                    What's included in the Premium plan?
                  </div>
                  <SlArrowDown className="accordion__icon" />
                </div>
              </div>
              <div className="accordion__card">
                <div className="accordion__header">
                  <div className="accordion__title">
                    Can I cancel during my trial or subscription?
                  </div>
                  <SlArrowDown className="accordion__icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
