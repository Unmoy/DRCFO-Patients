import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./NoslotsAnimation.json";
import "../DoctorDetails/DoctorDetails.css";
const NoSlotsAnimations = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={200} width={200} />
      <h1 className="nofoundslotstext">
        All slots are filled please look for another date
      </h1>
    </div>
  );
};

export default NoSlotsAnimations;
