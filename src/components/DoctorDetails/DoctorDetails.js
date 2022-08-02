import React, { useEffect, useState } from "react";
import "./DoctorDetails.css";
import docimage from "../../assets/images/docimage.png";
import blackmarker from "../../assets/images/black-marker.png";
import Login from "./Login";
import { useParams, useNavigate } from "react-router";
import DatePicker from "../DatePicker";
import { useAuth } from "../context/AuthContext";
import Loader from "../Loader/Loader";
import NoSlotsAnimations from "../Loader/NoSlotsAnimations";

const DoctorDetails = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [singleDoctor, setSingleDoctor] = useState({});
  const [distance, setDistance] = useState(0);
  // console.log(singleDoctor);
  const [docspecialities, setDocSpecialities] = useState([]);
  const [slots, setSlots] = useState([]);
  const [filterSlots, setFilterSlots] = useState([]);
  // console.log(filterSlots);
  const { id } = useParams();
  const speciality = Object.values(docspecialities)[0];
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setselectedTime] = useState("");
  const navigate = useNavigate();
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  var today = new Date();
  var day = today.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  var month = today.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var year = today.getFullYear();
  const startDate = year + "-" + month + "-" + day;
  var next60days = new Date(new Date().setDate(new Date().getDate() + 60));
  var endday = next60days.getDate();
  if (endday < 10) {
    endday = "0" + endday;
  }
  var endmonth = next60days.getMonth() + 1;
  if (endmonth < 10) {
    endmonth = "0" + endmonth;
  }
  var endyear = next60days.getFullYear();
  const endDate = endyear + "-" + endmonth + "-" + endday;
  var getDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      var dates = dt.getDate();
      if (dates < 10) {
        dates = "0" + dates;
      }
      var months = dt.getMonth() + 1;
      if (months < 10) {
        months = "0" + months;
      }
      var years = dt.getFullYear();
      const dummy = years + "-" + months + "-" + dates;
      arr.push(dummy);
    }
    return arr;
  };
  useEffect(() => {
    var daylist = getDaysArray(new Date(startDate), new Date(endDate));
    fetch(
      `https://reservefree-backend.herokuapp.com/get/subslots?clinicId=${id}&datesArray=${JSON.stringify(
        daylist
      )}&slots=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setSlots(data);
      });
  }, []);
  useEffect(() => {
    slots.filter((item) => {
      console.log(selectedDate);
      if (item.date == selectedDate) {
        console.log(item);
        setFilterSlots(item.slots);
        setLoading(false);
      }
    });
  }, [slots, selectedDate]);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(
      `https://reservefree-backend.herokuapp.com/get/list/docter-clinic?clinicId=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSingleDoctor(data);
        const propertyValues = Object.values(data.specialities);
        setDocSpecialities(propertyValues);
      });
  }, [id]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    if (singleDoctor.address) {
      if (singleDoctor.address && singleDoctor.address.location) {
        let d = getDistanceFromLatLonInKm(
          singleDoctor.address.location.latitude,
          singleDoctor.address.location.longitude,
          location.latitude,
          location.longitude
        );
        setDistance(Math.round(d * 100) / 100);
        // console.log("if");
      } else {
        // console.log("else");
        setDistance(-1);
      }
    }
  }, [singleDoctor]);

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
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
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  function openModal() {
    navigate("/patientdetails");
  }
  function closeModal() {
    setIsOpen(false);
  }

  const getValue = (e) => {
    localStorage.setItem("selectedTime", e.target.value);
    setselectedTime(e.target.value);
  };

  return (
    <>
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="doctor_header_card">
                <img
                  src={docimage}
                  alt="docimage"
                  className="docotr_card_image_2"
                />
                <div className="doctor_header_card_description">
                  <h5 className="doc_name mb-2">{singleDoctor.docterName}</h5>
                  <span className="mb-2 header_pointer">{speciality}</span>
                  <ul className="mb-2">
                    <li>{singleDoctor.clinicName}</li>
                  </ul>
                  <p className="experience">
                    {singleDoctor.experience} years experience overall
                  </p>
                  <div className="doctor_visit_info">
                    <div className="consultation">
                      <span className="fee">₹ {singleDoctor.fees}</span>
                      <p className="consult_text">Consultation fee</p>
                    </div>
                    <div className="kms_distance">
                      <p className="kmph">
                        <img src={blackmarker} alt="" className="mb-1" />{" "}
                        {distance > -1 ? `${distance} KM` : "- -"}
                      </p>
                      {singleDoctor?.address?.location?.latitude &&
                        singleDoctor?.address?.location?.longitude && (
                          <a
                            className="direction_btn"
                            target="_blank"
                            rel="noreferrer"
                            href={`https://www.google.com/maps/search/?api=1&query=${singleDoctor.address.location.latitude}%2C${singleDoctor.address.location.longitude}`}
                          >
                            Get Direction
                          </a>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="doctor_detail_card">
                <div className="doc_about">
                  <h3>About Dr. {singleDoctor.docterName}</h3>
                  <p>{singleDoctor.bio}</p>
                </div>
                <div className="doc_language">
                  <h3>Clinic Name</h3>
                  <p>{singleDoctor.clinicName}</p>
                </div>
                <div className="doc_speciality">
                  <h3>Specialties</h3>
                  <div>
                    {docspecialities.map((speciality) => (
                      <button key={speciality}>{speciality}</button>
                    ))}
                  </div>
                </div>
                <div className="doc_education">
                  <h3>Education and training</h3>
                  <ul>
                    <li>{singleDoctor.education}</li>
                  </ul>
                </div>

                <div className="doc_address">
                  <h3>Address</h3>
                  <p>
                    {singleDoctor?.address?.street},{" "}
                    {singleDoctor?.address?.area}, {singleDoctor?.address?.pin},{" "}
                    {singleDoctor?.address?.city},{" "}
                    {singleDoctor?.address?.state}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="booking_card">
                <div className="booking_card_header">
                  <h3>Book an appointment for free</h3>
                  <p>Select available time</p>
                </div>
                <div className="time_table">
                  <div className="date_picker_wrapper">
                    <DatePicker
                      clinicid={id}
                      getActiveDate={setSelectedDate}
                      slots={slots}
                    />
                  </div>
                  <div className="d-flex justify-content-evenly flex-wrap">
                    <div className="date_selector_wrapper">
                      {filterSlots.length ? (
                        filterSlots.map((slot, index) => (
                          <div className="radio_toolbar" key={index}>
                            <label
                              htmlFor={"slot" + (index + 1).toString()}
                              className={`date_input_label ${
                                selectedTime ===
                                `${slot?.from?.timefrom} ${slot?.from?.fromdayTime} ${slot?.to?.timeto} ${slot?.to?.todayTime}`
                                  ? "checkedSlot"
                                  : ""
                              }`}
                            >
                              {slot?.from?.timefrom}
                              {slot?.from?.fromdayTime}-{slot?.to?.timeto}
                              {slot?.to?.todayTime}
                            </label>
                            <input
                              className="booking_date_radio_input"
                              type="radio"
                              name="slot"
                              id={"slot" + (index + 1).toString()}
                              onChange={getValue}
                              value={`${slot?.from?.timefrom} ${slot?.from?.fromdayTime} ${slot?.to?.timeto} ${slot?.to?.todayTime}`}
                              checked={
                                selectedTime ===
                                `${slot?.from?.timefrom} ${slot?.from?.fromdayTime} ${slot?.to?.timeto} ${slot?.to?.todayTime}`
                                  ? true
                                  : false
                              }
                            />
                          </div>
                        ))
                      ) : loading ? (
                        <Loader />
                      ) : (
                        <NoSlotsAnimations />
                      )}
                    </div>
                  </div>
                </div>
                <button onClick={openModal} className="bookbtn">
                  Book Appointment
                </button>
                {/* <Login modalOpened={modalIsOpen} closeModal={closeModal} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDetails;
