import React, { useEffect, useState } from "react";
import "./DoctorListScreen.css";
import SideFilter from "./SideFilter";
import DoctorCard from "./DoctorCard";
import Listing from "../Listing/Listing";
import searchicon from "../../assets/images/searchicon.png";
import mapmarkericon from "../../assets/images/map-marker.png";
import calendericon from "../../assets/images/calendericon.png";
import searcbtnicon from "../../assets/images/searcbtnicon.png";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const DoctorListScreen = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  useEffect(() => {
    fetch("https://reservefree-backend.herokuapp.com/get/docters")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDoctorsList(data);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="doctor_screen">
        <div className="container-fluid">
          <div className="row">
            {/* Page Heading */}
            <div className="col-md-12 top_doctor_search_heading">
              <div className="top_doctor_search">
                <div className="top_doctor_search_input">
                  <img src={searchicon} alt="searcbtnicon" />
                  <input
                    placeholder="Orthopedics Doctor"
                    type="text"
                    name=""
                    id=""
                  />
                </div>
                <div className="top_doctor_search_input">
                  <img src={mapmarkericon} alt="searcbtnicon" />
                  <span className="ps-2">
                    Ardee city, Sec-52, Block c, gurugram...
                  </span>
                </div>
                <div className="top_doctor_search_calender_input">
                  <img src={calendericon} alt="searcbtnicon" />

                  <span className="ps-2">Today</span>
                </div>
                <button className="search_btn2">
                  <img src={searcbtnicon} alt="searcbtnicon" />
                </button>
              </div>
            </div>
            {/* Left Side Filters Start */}
            <div className="col-12 col-md-4">
              <SideFilter />
            </div>
            {/* Left Side Filters Ends */}
            {/* Properties Lists Start */}
            <div className="col-12 col-md-8">
              <div className="doctors_list_header">
                <h1>241 Orthopedics Doctor Around me</h1>
                <p>
                  Book appointments with minimum wait-time & verified doctor
                  details
                </p>
              </div>
              {doctorsList.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
            {/* Properties Lists End */}
          </div>
        </div>
        <Listing />
        <Footer />
      </div>
    </>
  );
};

export default DoctorListScreen;
