import React from "react";
import { useNavigate } from "react-router-dom";
import defaultdoctor from "../../assets/images/defaultdoctor.png";
const Doctor = ({ doctor }) => {
  console.log(doctor);
  let navigate = useNavigate();
  const handleNavigation = () => {
    const url = `/detail/${doctor.clinicId}`;
    navigate(url);
  };
  return (
    <div className="col-md-6">
      <div className="doctor_card" onClick={handleNavigation}>
        <div className="doctor_img">
          {doctor?.image ? (
            <img
              className="onview_images"
              src={`https://reservefree-backend.herokuapp.com/image/display?name=${doctor?.image}`}
              alt=""
            />
          ) : (
            <img className="onview_default_images" src={defaultdoctor} alt="" />
          )}
        </div>

        <div className="d-flex justify-content-end">
          <h1 className="recommended">Highly recommended</h1>{" "}
        </div>
        <div className="doctors_description">
          <h1 className="doctor_title">{doctor.docterName}</h1>
          <h5 className="specialist">{doctor.speciality}</h5>
          <p className="distance">
            <span className="distance_span">0.5 kms</span> from your location
          </p>
          <p className="doctor_cost">Rs.{doctor.fees}</p>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
