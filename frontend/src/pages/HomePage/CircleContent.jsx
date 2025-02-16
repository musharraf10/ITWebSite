import React from "react";
import "./CircleContent.css";
import circle1 from "../../../src/assets/circle1.jpg"; 
import circle2 from "../../assets/circle2.jpg"; 
import circle3 from "../../assets/circle3.jpg"; 
import circle4 from "../../assets/circle4.jpg"; 
import circle5 from "../../assets/circle5.jpg"; 

const CircleContent = () => {
  return (
    <div className="circle-container">
      <div className="circle">
        <div className="content">
          <h1>
            Award Winning Software, <br />
            Customer Service & <br />
            Company Culture
          </h1>
          <button className="recognize-btn">Who Recognize Us</button>
        </div>

        <div className="image-container">
          <div className="award-top">
            <img src={circle1} alt="Award Logo" />
          </div>
          <div className="award-left">
            <img src={circle2} alt="Left Award" />
          </div>
          <div className="award-bottom-left">
            <img src={circle4} alt="Bottom Left Award" />
          </div>
          <div className="award-right">
            <img src={circle3} alt="Right Award" />
          </div>
          <div className="award-bottom-right">
            <img src={circle5} alt="Bottom Right Award" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleContent;