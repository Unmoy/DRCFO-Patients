import React, { useEffect, useState } from "react";
import "./DoctorDetails.css";
import docimage from "../../assets/images/docimage.png";
import blackmarker from "../../assets/images/black-marker.png";
import Login from "./Login";
import { useParams, useNavigate } from "react-router";
import DatePicker from "../DatePicker";
import { useAuth } from "../context/AuthContext";

const DoctorDetails = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [singleDoctor, setSingleDoctor] = useState({});
  const [docspecialities, setDocSpecialities] = useState([]);
  const [slots, setSlots] = useState([]);
  const { id } = useParams();
  const speciality = Object.values(docspecialities)[0];
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setselectedTime] = useState("");
  const navigate = useNavigate();

  function openModal() {
    if (currentUser.user_phone) {
      navigate("/patientdetails");
    } else {
      setIsOpen(true);
    }
  }
  function closeModal() {
    setIsOpen(false);
  }
  var gsDayNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const selectedDay = (val) => {
    var monthName = gsDayNames[val.getMonth()];
    var day = val.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = val.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year = val.getFullYear();
    setSelectedDate(year + "-" + month + "-" + day);
    localStorage.setItem("selectedDate", monthName + +day + "," + year);
  };
  const getValue = (e) => {
    localStorage.setItem("selectedTime", e.target.value);
    setselectedTime(e.target.value);
  };

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
    console.log(selectedDate);
    fetch(
      `https://reservefree-backend.herokuapp.com/get/subslots?clinicId=${id}&date=${selectedDate}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSlots(data);
        console.log(data);
      });
  }, [id, selectedDate]);

  return (
    <>
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="doctor_header_card">
                <img src={docimage} alt="docimage" className="docotr_card_image_2"/>
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
                        <img src={blackmarker} alt="" className="mb-1" /> 5.2 KM
                      </p>
                      <p className="direction_btn">Get Direction</p>
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
                  <span>IHM Hospital 7 Ressearch Center</span>
                  <p>
                    Ardee city, Sec-52, Block c, gurugram, Haryana India-170003
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
                    <DatePicker getSelectedDay={selectedDay} slots={slots} />
                  </div>
                  <div className="d-flex justify-content-evenly flex-wrap">
                    <div className="date_selector_wrapper">
                      {slots.length
                        ? slots.map((slot, index) => (
                            <div className="radio_toolbar" key={index}>
                              <label
                                htmlFor={"slot" + (index + 1).toString()}
                                className="date_input_label"
                              >
                                {slot.from.timefrom}
                                {slot.from.fromdayTime}-{slot.to.timeto}
                                {slot.to.todayTime}
                              </label>
                              <input
                                className="booking_date_radio_input"
                                type="radio"
                                name="slot"
                                id={"slot" + (index + 1).toString()}
                                onChange={getValue}
                                value={`${slot.from.timefrom} ${slot.from.fromdayTime} ${slot.to.timeto} ${slot.to.todayTime}`}
                                checked={
                                  selectedTime ===
                                  `${slot.from.timefrom} ${slot.from.fromdayTime} ${slot.to.timeto} ${slot.to.todayTime}`
                                    ? true
                                    : false
                                }
                              />
                            </div>
                          ))
                        : "No Slots available"}
                    </div>
                  </div>
                </div>
                <button onClick={openModal} className="bookbtn">
                  Book Appointment
                </button>
                <Login modalOpened={modalIsOpen} closeModal={closeModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDetails;
