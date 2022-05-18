import React from "react";
import Doctor from "./Doctor";
import "./Doctors.css";
const doctorsList = [
  {
    id: 1,
    title: "DR. Vikash Kumar Mehta",
    specailist: "ENT Specialist",
    distance: "0.5",
    cost: "250",
  },
  {
    id: 2,
    title: "DR. Vikash Kumar Mehta",
    specailist: "ENT Specialist",
    distance: "0.5",
    cost: "250",
  },
];
const Doctors = () => {
  return (
    <div className="doctors_wrapper">
      <div className="container">
        <div className="row">
          <div className="top_left_doctors col-md-4">
            <h5>Top-rated primary care doctors</h5>
            <p>90% of patients gave these primary care doctors 5 stars</p>
            <button>See More</button>
          </div>
          <div className="top_right_doctors col-md-8">
            <div className="row">
              {doctorsList.map((doctor) => (
                <Doctor key={doctor.id} doctor={doctor} />
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
            <button>See More</button>
          </div>
          <div className="top_right_doctors col-md-8">
            <div className="row">
              {doctorsList.map((doctor) => (
                <Doctor key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
