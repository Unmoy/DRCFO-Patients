import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/d2.png";
import "./DoctorCard.css";
import directionicon from "../../assets/images/directionicon.png";
import likeicon from "../../assets/images/likeicon.png";
import { useNavigate } from "react-router-dom";
const DoctorCard = ({ doctor }) => {
  // console.log(doctor);
  const { specialities } = doctor;
  const speciality = Object.values(specialities)[0];
  let navigate = useNavigate();
  const handleClick = () => {
    const url = `/detail/${doctor.clinicId}`;
    navigate(url);
  };
  useEffect(() => {
    localStorage.setItem("clinicId", doctor.clinicId);
    localStorage.setItem("docterId", doctor.docterId);
  }, []);
  return (
    <div>
      <div className="mb-3 single_doctors_card">
        <div className="row g-0">
          <div className="col-md-3">
            <div className="doctor_card_img">
              <img src={image} className="img-fluid" alt="..." />
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="doctor_card_detail">
              <h5 className="doctor_name mb-2">{doctor.docterName}</h5>
              <span className="mb-2">{speciality}</span>
              <ul className="mb-2">
                <li>{doctor.clinicName}</li>
              </ul>
              <p className="mb-2">14 years experience overall</p>
              <p className="distance_kms">5.2 KM</p>
              <h5 className="consult">
                Consultation fee at clinic
                <span className="distance_kms"> ₹{doctor.fees} </span>
              </h5>
              <button className="doctor_rating">
                <img src={likeicon} alt="likeicon"></img> 60%
              </button>
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <div className="doctor_card_right">
              <button className="direction_btn">
                <img src={directionicon} alt="directionicon"></img>
                Get Direction
              </button>
              <button className="book_appt_btn" onClick={handleClick}>
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
