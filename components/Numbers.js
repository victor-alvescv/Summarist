import React from "react";
import { BiCrown } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";

export default function Numbers() {
  return (
    <section id="numbers">
      <div className="container">
        <div className="row">
          <div data-aos="fade-down" data-aos-delay="50" data-aos-once="true">
            <div className="section__title">
              Start growing with Summarist now
            </div>
          </div>
          <div className="numbers__wrapper">
            <div data-aos="fade-right" data-aos-delay="150" data-aos-once="true">
              <div className="numbers">
                <div className="numbers__icon">
                  <BiCrown />
                </div>
                <div className="numbers__title">3 Million</div>
                <div className="numbers__sub--title">
                  Downloads on all platforms
                </div>
              </div>
            </div>
            <div data-aos="fade-right" data-aos-delay="300" data-aos-once="true">
              <div className="numbers">
                <div className="numbers__icon numbers__star--icon">
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarHalf />
                </div>
                <div className="numbers__title">4.5 Stars</div>
                <div className="numbers__sub--title">
                  Average ratings on iOS and Google Play
                </div>
              </div>
            </div>
            <div data-aos="fade-right" data-aos-delay="450" data-aos-once="true">
              <div className="numbers">
                <div className="numbers__icon">
                  <RiLeafLine />
                </div>
                <div className="numbers__title">97%</div>
                <div className="numbers__sub--title">
                  Of Summarist members create a better reading habit
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
