import React from "react";

const Doctor = ({ doctor }) => {
  return (
    <div className="col-md-6">
      <div className="doctor_card">
        <div className="doctor_img"></div>
        <div className="d-flex justify-content-end">
          <h1 className="recommended">Highly recommended</h1>
        </div>
        <div className="doctors_description">
          <h1 className="doctor_title">{doctor.title}</h1>
          <h5 className="specialist">{doctor.specailist}</h5>
          <p className="distance">
            <span className="distance_span">{doctor.distance} kms</span> from
            your location
          </p>
          <p className="doctor_cost">Rs.{doctor.cost}</p>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
