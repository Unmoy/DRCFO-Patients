import React from "react";
import Loader from "../Loader/Loader";
import CSSloader from "./CSSloader";
import DoctorCard from "./DoctorCard";

const DoctorPage = ({ doctorsList, loading, location }) => {
  // console.log(doctorsList);
  return (
    <div>
      {loading ? (
        <CSSloader />
      ) : (
        doctorsList.map((doctor) => (
          <DoctorCard
            key={doctor.clinicId}
            doctor={doctor}
            location={location}
          />
        ))
      )}
    </div>
  );
};

export default DoctorPage;
