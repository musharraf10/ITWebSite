import "../../assets/css/Homemin.css";
import slideimage from "../../assets/images/leftimage.png";
import React from "react";



export default function HomeMin() {

  
  return (
    <>
      <div className="home-container">
        <div className="home-minicontainer">
          <div className="home-imagediv">
            <div className="home-miniimagediv">
              <img src={slideimage} alt="" />
            </div>
          </div>

          <div className="home-righttext">
            <p className="home-headingtag">About Us</p>
            <p className="home-paratag">
            we are more than just a networking platform; we are a community of forward-thinking businesses 
            and professionals driven by a shared vision of growth, collaboration, 
            and innovation. Founded with a passion for connecting businesses and fostering relationships, 
            Busitron has evolved into a thriving ecosystem where opportunities flourish, knowledge flows, and connections thrive.
            </p>
            <button>contact us</button>
          </div>
        </div>
      </div>

   

    </> 
  )
}