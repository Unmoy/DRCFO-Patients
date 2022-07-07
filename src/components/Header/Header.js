import React, { useEffect, useState } from "react";
import "./Header.css";
import doctorImage1 from "../../assets/images/d1.png";
import doctorImage2 from "../../assets/images/d2.png";
import doctorImage3 from "../../assets/images/d3.png";
import searchicon from "../../assets/images/searchicon.png";
import geolocationicon from "../../assets/images/geolocation.png";
import mapmarkericon from "../../assets/images/map-marker.png";
import calendericon from "../../assets/images/calendericon.png";
import searcbtnicon from "../../assets/images/searcbtnicon.png";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [formatDay, setFormatDay] = useState("");

  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchText.length) {
      navigate(`/doctors/${searchText}`);
    }
    // else if (formatDay) {
    //   navigate(`/doctors/${{ id: "fd", formatDay }}`);
    // }
    else {
      document.getElementById("myTextField").focus();
    }
  };
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    if (selectedDay) {
      const month = selectedDay?.month;
      let day = selectedDay?.day;
      let year = selectedDay?.year;
      const formatDate = `${year}-${month > 10 ? month : `0${month}`}-${
        day > 10 ? day : `0${day}`
      }`;
      setFormatDay(formatDate);
    }
  }, [selectedDay]);
  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref}
      placeholder="Today"
      value={
        selectedDay
          ? `${
              selectedDay.day > 10 ? selectedDay.day : `0${selectedDay.day}`
            }-${
              selectedDay.month > 10
                ? selectedDay.month
                : `0${selectedDay.month}`
            }-${selectedDay.year}`
          : ""
      }
      style={{
        textAlign: "left",
        padding: "8px",
        fontSize: "14px",
        border: "none",
        cursor: "pointer",
        color: "#000",
        outline: "none",
      }}
      className="custom-input-class"
    />
  );
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
          <div className="searchInput_1 ms-4">
            <img src={searchicon} alt="" />
            <input
              id="myTextField"
              placeholder="Condition,Procedure,Doctor.."
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="searchInput_1 header_location">
            <img src={mapmarkericon} alt="" />
            <input placeholder="Your Location" type="text" />
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
            <span className="ps-2">
              <DatePicker
                value={selectedDay}
                inputPlaceholder="Select a date"
                onChange={setSelectedDay}
                renderInput={renderCustomInput}
              />
            </span>
          </div>
        </div>
        {/* <Link to="/doctors" className="route_link"> */}
        <button className="search_btn2" onClick={handleSearch}>
          <img src={searcbtnicon} alt="searcbtnicon" />
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Header;
