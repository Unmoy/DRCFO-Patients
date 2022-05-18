import React from "react";
import "./Listing.css";
import mascot from "../../assets/images/mascot.png";

const Listing = () => {
  return (
    <section className="container listing">
      <div className="row d-flex align-items-center">
        <div className="image col-md-12 col-lg-6">
          <img src={mascot} alt="banner" />
        </div>
        <div className="content col-md-12 col-lg-6">
          <h3>DR CFO for private practices</h3>
          <h1>Are you a provider interested in reaching new patients?</h1>
          <ul>
            <li>Reach patients in your area looking for a new provider</li>
            <li>Fill last-minute openings in your schedule</li>
            <li>Strengthen your online reputation with verified reviews</li>
          </ul>
          <button>List yourself on DR.CFO</button>
        </div>
      </div>
    </section>
  );
};

export default Listing;
