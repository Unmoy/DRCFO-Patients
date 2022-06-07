import React from "react";
import Loader from "../Loader/Loader";
import DoctorCard from "./DoctorCard";

const DoctorPage = ({ doctorsList, loading }) => {
  console.log(doctorsList, loading);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        doctorsList.map((doctor) => (
          <DoctorCard key={doctor.clinicId} doctor={doctor} />
        ))
      )}
    </div>
  );
};

export default DoctorPage;
