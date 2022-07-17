import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Doctor from "./Doctor";
import "./Doctors.css";

const Doctors = () => {
  const [topratedDoctors, setTopRatedDoctors] = useState([]);
  const [doctorsAround, setDoctorsAround] = useState([]);
  const navigate = useNavigate();
  const seemore = (value) => {
    navigate("/doctors");
    localStorage.setItem("doctorfilter", value);
  };
  const seearound = (value) => {
    navigate("/doctors");
    localStorage.setItem("seearound", value);
  };
  useEffect(() => {
    fetch(
      "https://reservefree-backend.herokuapp.com/get/list/docter-clinic?active=true"
    )
      .then((res) => res.json())
      .then((data) => {
        setTopRatedDoctors(data.slice(0, 2));
        setDoctorsAround(data.slice(2, 4));
      });
  }, []);
  return (
    <div className="doctors_wrapper">
      <div className="container">
        <div className="row">
          <div className="top_left_doctors col-md-4">
            <h5>Top-rated doctors</h5>
            <p>90% of patients gave these primary care doctors 5 stars</p>
            <button onClick={() => seemore("top")}>See More</button>
          </div>
          <div className="top_right_doctors col-md-8">
            <div className="row">
              {topratedDoctors.map((doctor) => (
                <Doctor key={doctor._id} doctor={doctor} />
              ))}
            </div>
          </div>
        </div>
        <div className="row doctors_bottom">
          <div className="top_left_doctors col-md-4">
            <h5>Doctors around you</h5>
            <p>
              91% of patients spent less than 30 minutes in the waiting room for
              these Doctor
            </p>
            <button onClick={() => seearound("around")}>See More</button>
          </div>
          <div className="top_right_doctors col-md-8">
            <div className="row">
              {doctorsAround.map((doctor) => (
                <Doctor key={doctor._id} doctor={doctor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
