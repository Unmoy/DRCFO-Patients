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
  const [locationInput, setLocationInput] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [filterLocation, setFilterLocation] = useState({});
  const [location, setLocation] = useState({});
  // const [address, setAddress] = useState("");
  console.log(suggestion);
  const navigate = useNavigate();
  const handleSearch = () => {
    const searchItems = {
      day: formatDay,
      text: searchText,
      location: filterLocation,
    };
    console.log(searchItems);
    if (searchText.length || formatDay.length || filterLocation) {
      localStorage.setItem("searchItems", JSON.stringify(searchItems));
      navigate("/doctors");
    } else {
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
  const apikey = process.env.REACT_APP_MAPS_API_KEY;
  async function getCoordinates(InputLocation) {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${InputLocation}&key=${apikey}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // console.log(data.results[0]);
        // setSuggestion(data.results[0]?.formatted_address);
        data.results.map((add) => {
          // setSuggestion([add.formatted_address]);
          setLocationInput(add.formatted_address);
          setFilterLocation(add.geometry.location);
        });
      });
  }
  async function getAddress(InputLocation) {
    fetch(
      // `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${InputLocation}&key=${apikey}`
      `https://reservefree-backend.herokuapp.com/other/places?query=${InputLocation}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setSuggestion(data.predictions.map((i) => i.description));
      });
  }
  const handleLocationInput = (e) => {
    console.log(e.target.value);
    setLocationInput(e.target.value);
    if (e.target.value) {
      getAddress(e.target.value);
    }
  };
  const onSuggestHandler = (value) => {
    // console.log(value);
    setLocationInput(value);
    // setFilterLocation(value);
    getCoordinates(value);
    console.log(suggestion);
    setSuggestion([]);
  };
  const locateMe = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };
  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${apikey}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          console.log(data.results[0].formatted_address);
          // setAddress(data.results[0].formatted_address);
          // setLocationInput(data.results[0].formatted_address);
          getCoordinates(data.results[0].formatted_address);
        });
    }
  }, [location]);
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
            <input
              placeholder="Your Location"
              type="text"
              onChange={handleLocationInput}
              value={locationInput}
            />
            {suggestion.length > 0 ? (
              <div className="home_location_suggestion">
                {suggestion.map((add, index) => (
                  <div
                    key={index}
                    className="location_suggestion_card"
                    onClick={() => onSuggestHandler(add)}
                    onBlur={() => {
                      setTimeout(() => {
                        setSuggestion([]);
                      }, 100);
                    }}
                  >
                    {add}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="input_right">
          <div>
            <button className="locate_btn" onClick={locateMe}>
              <img src={geolocationicon} alt="" />
              <span>locate me</span>
            </button>
          </div>
          <div className="calender">
            <img src={calendericon} alt="" />
            <span className="ps-2">
              <DatePicker
                value={selectedDay}
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
