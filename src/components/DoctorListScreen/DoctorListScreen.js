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
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import DoctorPage from "./DoctorPage";
import NoMatch from "./NoMatch";

const DoctorListScreen = () => {
  const { text } = useParams();
  const [doctorsList, setDoctorsList] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [list, setList] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([0, 5000]);
  const [sort, setSort] = useState(0);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({});
  const [locationRange, setLocationRange] = useState([0, 100]);
  console.log(locationRange);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);
  useEffect(() => {
    setLoading(true);
    if (text) {
      fetch(
        `https://reservefree-backend.herokuapp.com/search?query=${text}&search=all`
      )
        .then((res) => res.json())
        .then((data) => {
          setList(data);
          setDoctorsList(data);
          setLoading(false);
        });
    } else {
      setLoading(true);
      fetch(
        "https://reservefree-backend.herokuapp.com/get/list/docter-clinic?active=true"
      )
        .then((res) => res.json())
        .then((data) => {
          setList(data);
          setDoctorsList(data);
          setLoading(false);
        });
    }
  }, [text]);
  const handleChangeChecked = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSpeciality([...speciality, value]);
    } else {
      setSpeciality(speciality.filter((e) => e !== value));
    }
  };
  const handleChangePrice = (event) => {
    setSelectedPrice(event.target.value);
  };
  const distanceResult = (clinicLocation) => {
    let lat2 = clinicLocation.latitude;
    let lon2 = clinicLocation.longitude;
    let lat1 = location.latitude;
    let lon1 = location.longitude;
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const applyFilters = () => {
    const newList = list;

    // Distance Filter
    const mind = locationRange[0] * 20;
    const maxd = locationRange[1] * 20;
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];
    let priceResult = newList.filter(
      (item) =>
        item.fees >= minPrice &&
        item.fees <= maxPrice &&
        (item.address.location
          ? distanceResult(item?.address?.location) >= mind &&
            distanceResult(item?.address?.location) <= maxd
          : true)
    );
    let sortlist = [];
    if (sort != 0) {
      sortlist = priceResult.sort((a, b) => {
        if (sort == 1) {
          if (a.fees > b.fees) {
            return 1;
          } else if (a.fees < b.fees) {
            return -1;
          } else {
            return 0;
          }
        } else if (sort == 2) {
          if (a.fees > b.fees) {
            return -1;
          } else if (a.fees < b.fees) {
            return 1;
          } else {
            return 0;
          }
        }
        if (sort == 3) {
          if (a.experience > b.experience) {
            console.log(a.experience, b.experience);
            return -1;
          } else if (a.experience < b.experience) {
            console.log(a.experience, b.experience);
            return 1;
          } else {
            console.log(a.experience, b.experience);
            return 0;
          }
        }
      });
    } else {
      sortlist = priceResult;
    }
    if (speciality.length) {
      let res = false;
      let result = sortlist.filter((item) => {
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
      setDoctorsList(sortlist);
    }
  };
  useEffect(() => {
    applyFilters();
  }, [speciality, selectedPrice, sort, selectedPrice, locationRange]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(e.target.value);
    fetch(
      `https://reservefree-backend.herokuapp.com/search?query=${e.target.value}&search=all`
    )
      .then((res) => res.json())
      .then((data) => {
        setDoctorsList(data);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="doctor_screen">
        <div className="container-fluid">
          <div className="row">
            {/* Page Heading */}
            <div className="col-md-12 top_doctor_search_heading">
              <div className="top_doctor_search">
                <div className="top_doctor_search_input">
                  <img
                    src={searchicon}
                    alt="searcbtnicon"
                    className="searchicon"
                  />
                  <input
                    placeholder="Orthopedics Doctor"
                    type="text"
                    defaultValue={text}
                    onChange={(e) =>
                      e.target.value != ""
                        ? handleSearch(e)
                        : setDoctorsList(list)
                    }
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
                <div className="search_btn_wrap">
                  <button className="search_btn2">
                    <img src={searcbtnicon} alt="searcbtnicon" />
                  </button>
                </div>
              </div>
            </div>
            {/* Left Side Filters Start */}
            <div className="col-12 col-md-4">
              <SideFilter
                changeChecked={handleChangeChecked}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
                changedPrice={handleChangePrice}
                setSort={setSort}
                setLocationRange={setLocationRange}
                locationRange={locationRange}
              />
            </div>
            {/* Left Side Filters Ends */}
            {/* Properties Lists Start */}
            <div className="col-12 col-md-8">
              <div className="doctors_list_header">
                <h1>{doctorsList.length} Orthopedics Doctor Around you</h1>
                <p>
                  Book appointments with minimum wait-time & verified doctor
                  details
                </p>
              </div>
              {doctorsList.length ? (
                <DoctorPage
                  doctorsList={doctorsList}
                  loading={loading}
                  location={location}
                />
              ) : (
                <>{!loading ? <NoMatch /> : <Loader />}</>
              )}
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
