import React from "react";
// import Lottie from "react-lottie";
import * as animationData from "./noMatch.json";
import "./DoctorListScreen.css";
const NoMatch = () => {
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
      {/* <Lottie options={defaultOptions} height={200} width={200} /> */}
      <h1 className="nomatchtext">No Match Found</h1>
    </div>
  );
};

export default NoMatch;
