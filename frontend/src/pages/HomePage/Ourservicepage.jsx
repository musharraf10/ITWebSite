import React from "react";

import "./Ourservicepage.css";
export default function Ourservicespage() {
  return (
    <>
      <div className="ourservicespage">
        <h1 className="ourservicesheadline">Our Services</h1>
        <div className="allserviceitems">

          <div className="items   ">
            <div className="itemicons  ">
              <i className="fa-solid fa-computer"></i>
            </div>

            <div className="itemtext">
              <h5 className="pctext">Software</h5>
              <p>(4000+ Openings)</p>
            </div>
          </div>

          <div className="items   ">
            <div className="itemicons  ">
              <i className="fa-solid fa-coins"></i>
            </div>

            <div className="itemtext">
              <h5 className="pctext">Finance</h5>
              <p>(400+ Openings)</p>
            </div>
          </div>

          <div className="items   ">
            <div className="itemicons  ">
              <i className="fa-solid fa-square-poll-vertical"></i>
            </div>

            <div className="itemtext">
              <h5 className="pctext">Marketing</h5>
              <p>(900+ Openings)</p>
            </div>
          </div>

          <div className="items   ">
            <div className="itemicons  ">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>

            <div className="itemtext">
              <h5 className="pctext">Design</h5>
              <p>(900+ Openings)</p>
            </div>
          </div>

          <div className="items   ">
            <div className="itemicons  ">
              <i className="fa-solid fa-code"></i>
            </div>

            <div className="itemtext">
              <h5 className="pctext">Development</h5>
              <p>(8000+ Openings)</p>
            </div>
          </div>

          <div className="items   ">
            <div className="itemicons  ">
              <i className="fa-solid fa-gamepad"></i>
            </div>

            <div className="itemtext">
              <h5 className="pctext">Gaming</h5>
              <p>(4000+ Openings)</p>
            </div>
          </div>

          <div className="items   ">
            <div className="itemicons  ">
              <i className="fa-solid fa-stethoscope"></i>
            </div>

            <div className="itemtext">
              <h5 className="pctext">Health</h5>
              <p>(200+ Openings)</p>
            </div>
          </div>

          <div className="items   ">
            <div className="itemicons  ">
              <i className="fa-solid fa-fingerprint"></i>
            </div>

            <div className="itemtext">
              <h5 className="pctext">Security</h5>
              <p>(1000+ Openings)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}