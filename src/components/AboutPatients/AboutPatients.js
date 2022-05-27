import React, { useEffect, useState } from "react";
import "./AboutPatients.css";
import patientImage from "../../assets/images/docimage.png";
import clock from "../../assets/images/appt_clock.png";
import calender from "../../assets/images/appt-calender.png";
import { useNavigate } from "react-router-dom";
const AboutPatients = () => {
  const [appointmentId, setAppointmentId] = useState("");
  const [appointmentData, setAppointmentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [payType, setPayType] = useState("");
  const navigate = useNavigate();
  console.log(appointmentData);
  useEffect(() => {
    setAppointmentId(localStorage.getItem("appointmentId"));
    fetch(`
      https://reservefree-backend.herokuapp.com/get/appointment?appointmentId=${appointmentId}`).then(
      (res) =>
        res.json().then((data) => {
          setAppointmentData(data);
          setLoading(true);
        })
    );
  }, [appointmentId]);

  return (
    <div className="container">
      <div className="patient_details_header row">
        <div className="patient_detail_column_1 col-4">
          <img
            className="patient_image_small"
            src={patientImage}
            alt="patientImage"
          />
          <div className="patient_description">
            <h5>Dr. Krishnanand</h5>
            <span className="dr_speciality mb-2">Orthopedist</span>
            <ul className="mb-2">
              <li>Own Clinic</li>
            </ul>
            <p className="">14 years experience overall</p>
          </div>
        </div>
        <div className="patient_detail_column_2 col-4 px-5">
          <h6 className="ps-5">location</h6>
          <p className="px-5">
            Ardee city, Sec-52, Block c, gurugram, Haryana India-170003
          </p>
        </div>
        <div className="patient_detail_column_3 col-4">
          <div>
            <h5 className="book_time">Booking Date & Time</h5>
            <p>
              <img className="appt_logo" src={calender} alt="" /> On Apr 16,
              2022
            </p>
          </div>
          <div>
            <h5 className="change_time">Change Date & Time</h5>
            <p>
              <img className="appt_logo" src={clock} alt="" /> 11:30 AM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPatients;
