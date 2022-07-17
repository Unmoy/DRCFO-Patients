import React from "react";
import "./CSSloader.css";
const CSSloader = () => {
  return (
    <div className="loader_wrapper">
      {" "}
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <span>Loading</span>
      </div>
    </div>
  );
};

export default CSSloader;
