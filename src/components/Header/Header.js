import React from "react";
import "./Header.css";
import doctorImage1 from "../../assets/images/d1.png";
import doctorImage2 from "../../assets/images/d2.png";
import doctorImage3 from "../../assets/images/d3.png";
import searchicon from "../../assets/images/searchicon.png";
import geolocationicon from "../../assets/images/geolocation.png";
import mapmarkericon from "../../assets/images/map-marker.png";
import calendericon from "../../assets/images/calendericon.png";
import searcbtnicon from "../../assets/images/searcbtnicon.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header_wrapper">
      <div className="header_screen">
        <div className="header_left">
          <h1>Find Local Doctors</h1>
          <p>Who take care of You and your Family.</p>
        </div>
        <div className="header_right">
          <img src={doctorImage2} alt="doctorImage2" className="doctorImage2" />
          <img src={doctorImage1} alt="doctorImage1" className="doctorImage1" />
          <img src={doctorImage3} alt="doctorImage3" className="doctorImage3" />
        </div>
      </div>
      <div className="header_bottom">
        <div className="input_left">
          <div className="searchInput_1">
            <img src={searchicon} alt="" />
            <input
              placeholder="Condition,Procedure,Doctor..."
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="searchInput_1">
            <img src={mapmarkericon} alt="" />
            <input placeholder="Your Location" type="text" name="" id="" />
          </div>
        </div>
        <div className="input_right">
          <div>
            <button className="locate_btn">
              <img src={geolocationicon} alt="" />
              <span>locate me</span>
            </button>
          </div>
          <div className="calender">
            <img src={calendericon} alt="" />
            <span>Today</span>
          </div>
        </div>
        <Link to="/doctors" className="route_link">
          <button className="search_btn2">
            <img src={searcbtnicon} alt="searcbtnicon" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
