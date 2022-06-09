import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/d2.png";
import "./DoctorCard.css";
import directionicon from "../../assets/images/directionicon.png";
import likeicon from "../../assets/images/likeicon.png";
import { useNavigate } from "react-router-dom";
const DoctorCard = ({ doctor, location }) => {
  const [distance, setDistance] = useState(0);
  // console.log(location, doctor);
  const { specialities } = doctor;
  const speciality = Object.values(specialities)[0];
  let navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem("clinicId", doctor.clinicId);
    localStorage.setItem("docterId", doctor.docterId);
    const url = `/detail/${doctor.clinicId}`;
    navigate(url);
  };
  useEffect(() => {
    if (doctor.address.location) {
      let d = getDistanceFromLatLonInKm(
        doctor.address.location.latitude,
        doctor.address.location.longitude,
        location.latitude,
        location.longitude
      );
      setDistance(Math.round(d * 100) / 100);
    } else {
      setDistance(-1);
    }
  }, []);
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
              <p className="mb-2">
                {doctor.experience} years experience overall
              </p>
              <p className="distance_kms">
                {distance > -1 ? `${distance} KM` : "- -"}
              </p>
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
