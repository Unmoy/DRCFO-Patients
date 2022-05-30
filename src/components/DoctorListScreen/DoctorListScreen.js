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

const DoctorListScreen = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [list, setList] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([0, 5000]);

  useEffect(() => {
    fetch(
      "https://reservefree-backend.herokuapp.com/get/list/docter-clinic?active=true"
    )
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setDoctorsList(data);
      });
  }, []);
  const handleChangeChecked = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSpeciality([...speciality, value]);
    } else {
      setSpeciality(speciality.filter((e) => e !== value));
    }
  };
  const handleChangePrice = (event, value) => {
    setSelectedPrice(event.target.value);
    const usingSplit = event.target.value.split("-");
    console.log(usingSplit);
  };
  const applyFilters = () => {
    const newList = list;
    if (speciality.length) {
      let res = false;
      let result = newList.filter((item) => {
        speciality.map((obj) => {
          if (item.specialities.includes(obj)) {
            res = true;
          }
        });
        if (res) {
          res = false;
          return item;
        }
      });
      setDoctorsList(result);
    } else {
      setDoctorsList(newList);
    }
    // const minPrice = selectedPrice[0];
    // const maxPrice = selectedPrice[1];
    // console.log("min", minPrice);
    // console.log("max", maxPrice);
    // let priceResult = newList.filter(
    //   (item) => item.fees >= minPrice && item.fees <= maxPrice
    // );
    // console.log(priceResult);
  };
  useEffect(() => {
    applyFilters();
  }, [speciality, selectedPrice]);
  return (
    <>
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
              <SideFilter
                changeChecked={handleChangeChecked}
                selectedPrice={selectedPrice}
                changedPrice={handleChangePrice}
              />
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
                <DoctorCard key={doctor.clinicId} doctor={doctor} />
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
