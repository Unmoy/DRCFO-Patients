import React, { useEffect, useState } from "react";
import "./DoctorListScreen.css";
import SideFilter from "./SideFilter";
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
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
const DoctorListScreen = () => {
  const { text } = useParams();
  const [doctorsList, setDoctorsList] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [datefilterData, setDateFilterData] = useState([]);
  const [list, setList] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([0, 5000]);
  const [sort, setSort] = useState(0);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({});
  const [locationRange, setLocationRange] = useState([0, 100]);
  const [searchSpeaciality, setSearchSpeaciality] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [categoryText, setCategorytext] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
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
          console.log(data);
        });
    }
  }, [text]);
  useEffect(() => {
    const searchSpecialityfromhome = localStorage.getItem(
      "speciality_search_item"
    );
    setSearchSpeaciality(searchSpecialityfromhome);
    if (searchSpeaciality && list.length) {
      let result = list.filter((item) => {
        console.log(item.speciality);
        if (item.specialities.includes(searchSpeaciality)) {
          return item;
        }
      });
      setDoctorsList(result);
    } else {
      setDoctorsList(list);
    }
    localStorage.removeItem("speciality_search_item");
  }, [list]);
  useEffect(() => {
    if (list.length) {
      const locationData = localStorage.getItem("seearound");
      if (locationData) {
        setLocationRange([0, 20]);
        localStorage.removeItem("seearound");
      }
      const recommendationData = localStorage.getItem("doctorfilter");
      if (recommendationData) {
        setSort(4);
        localStorage.removeItem("doctorfilter");
      }
    }
  }, [list]);

  const handleChangeChecked = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSpeciality([...speciality, value]);
    } else {
      setSpeciality(speciality.filter((e) => e !== value));
    }
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
    let result = list;
    // Distance Filter
    const mind = locationRange[0] * 20;
    const maxd = locationRange[1] * 20;
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];
    result = newList.filter(
      (item) =>
        item.fees >= minPrice &&
        item.fees <= maxPrice &&
        (item.address.location
          ? distanceResult(item?.address?.location) >= mind &&
            distanceResult(item?.address?.location) <= maxd
          : true)
    );
    if (sort != 0) {
      result = result.sort((a, b) => {
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
        if (sort == 4) {
          if (a?.recommendation?.count > b?.recommendation?.count) {
            // console.log(a.experience, b.experience);
            return -1;
          } else if (a?.recommendation?.count < b?.recommendation?.count) {
            // console.log(a.experience, b.experience);
            return 1;
          } else {
            // console.log(a.recommendation?.count, b?.recommendation?.count);
            return 0;
          }
        }
      });
    }
    if (speciality.length) {
      let res = false;
      result = result.filter((item) => {
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
    }
    if (datefilterData.length) {
      result = result.filter((item) => {
        return datefilterData.includes(item.clinicId);
      });
    }
    setDoctorsList(result);
  };
  useEffect(() => {
    applyFilters();
  }, [
    speciality,
    selectedPrice,
    sort,
    selectedPrice,
    locationRange,
    datefilterData,
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(
      `https://reservefree-backend.herokuapp.com/search?query=${e.target.value}&search=all`
    )
      .then((res) => res.json())
      .then((data) => {
        setDoctorsList(data);
        setLoading(false);
      });
  };
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
  useEffect(() => {
    if (selectedDay) {
      const month = selectedDay?.month;
      let day = selectedDay?.day;
      let year = selectedDay?.year;
      const formatDate = `${year}-${month > 10 ? month : `0${month}`}-${
        day > 10 ? day : `0${day}`
      }`;
      console.log(formatDate);
      fetch(
        `https://reservefree-backend.herokuapp.com/get/availability?date=${formatDate}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDateFilterData(data);
        });
    }
  }, [selectedDay]);
  useEffect(() => {
    if (sort !== 0) {
      setCategorytext("Doctors Sorted for you");
    } else if (locationRange[0] !== 0 || locationRange[1] !== 100) {
      setCategorytext("Doctors Near You");
    } else if (
      (selectedPrice[0] == 0 && selectedPrice[1] == 0) ||
      (selectedPrice[0] == 1 && selectedPrice[1] == 200) ||
      (selectedPrice[0] == 200 && selectedPrice[1] == 500) ||
      (selectedPrice[0] == 500 && selectedPrice[1] == 5000)
    ) {
      console.log(selectedPrice);
      setCategorytext("Low cost doctors for you");
    } else if (speciality.length) {
      setCategorytext("Specialist Doctors Around You");
    } else {
      setCategorytext("Doctors Around You");
    }
  }, [sort, locationRange, selectedPrice, speciality]);
  const resetDateFilter = () => {
    setSelectedDay(null);
    setDoctorsList(list);
  };

  // function getCoordinates(address) {
  //   fetch(
  //     "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  //       address +
  //       "&key=" +
  //       API_KEY
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const latitude = data.results.geometry.location.lat;
  //       const longitude = data.results.geometry.location.lng;
  //       console.log({ latitude, longitude });
  //     });
  // }
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
                    placeholder="Paediatric Doctor"
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
                  <span className="ps-2">
                    <DatePicker
                      value={selectedDay}
                      inputPlaceholder="Select a date"
                      onChange={setSelectedDay}
                      renderInput={renderCustomInput}
                    />
                    {selectedDay && (
                      <span className="reset_btn" onClick={resetDateFilter}>
                        x
                      </span>
                    )}
                  </span>
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
                setSort={setSort}
                setLocationRange={setLocationRange}
                locationRange={locationRange}
              />
            </div>
            {/* Left Side Filters Ends */}
            {/* Properties Lists Start */}
            <div className="col-12 col-md-8">
              <div className="doctors_list_header">
                <h1>
                  {doctorsList.length} {categoryText}
                </h1>
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
