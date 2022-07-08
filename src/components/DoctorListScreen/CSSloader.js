import React from "react";
import "./CSSloader.css";
const CSSloader = () => {
  return (
    <div className="loader_wrapper">
      {" "}
      <div class="wrapper">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <span>Loading</span>
      </div>
    </div>
  );
};

export default CSSloader;
