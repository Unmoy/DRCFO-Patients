import React, { useEffect, useState } from "react";
import "./SideFilter.css";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "0.00 KM",
  },
  {
    value: 100,
    label: "Maximum",
  },
];

const SideFilter = ({
  changeChecked,
  changedPrice,
  selectedPrice,
  setSelectedPrice,
  setSort
}) => {
  const [price, setPrice] = useState([0, 5000]);
  const [value, setValue] = useState([0, 100]);
  // console.log(value);
  const [data, setData] = useState([]);

  const pricefilter = (e) => {
    if (e.target.value == 0) {
      setSelectedPrice([0, 0]);
    } else if (e.target.value == 1) {
      setSelectedPrice([1, 200]);
    } else if (e.target.value == 2) {
      setSelectedPrice([200, 500]);
    } else if (e.target.value == 3) {
      setSelectedPrice([500, 5000]);
    } else {
      setSelectedPrice([0, 5000]);
    }
    // console.log(price);
  };

  const sortfilter = (e) => {
    if(e.target.value == 1 || e.target.value ==2 || e.target.value==3|| e.target.value==4){
      setSort(e.target.value);
    } else {
      setSort(0);
    }
  }

  useEffect(() => {
    fetch("https://reservefree-backend.herokuapp.com/get/docters")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="side_filter">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="filter_header">Filters</h1>
        <h6 className="clear_filter">Clear All</h6>
      </div>
      <div className="location_filter">
        <p>location</p>
        <Slider value={value} onChange={handleOnChange} marks={marks} />
      </div>
      <hr />
      <div className="price_filter">
        <p className="mb-4">Price</p>
        <form>
          <div className="d-flex justify-content-start mb-2">
            <input
              type="radio"
              id="price0"
              name="price"
              value="0"
              onChange={(e) => {
                pricefilter(e);
                console.log(e.target.value);
              }}
            />
            <label htmlFor="price0">Free</label>
            <br />
          </div>
          <div className="d-flex justify-content-start mb-2">
            <input
              type="radio"
              id="price1"
              name="price"
              value="1"
              onChange={(e) => {
                pricefilter(e);
                console.log(e.target.value);
              }}
            />
            <label htmlFor="price1">₹01-₹200</label>
            <br />
          </div>
          <div className="d-flex justify-content-start mb-2">
            <input
              type="radio"
              id="price2"
              name="price"
              value="2"
              onChange={(e) => {
                pricefilter(e);
                console.log(e.target.value);
              }}
            />
            <label htmlFor="price2">₹200-₹500</label>
            <br />
          </div>
          <div className="d-flex justify-content-start">
            <input
              type="radio"
              id="price3"
              name="price"
              value="3"
              onChange={(e) => {
                pricefilter(e);
                console.log(e.target.value);
              }}
            />
            <label htmlFor="price3">₹501+</label>
          </div>
        </form>
      </div>
      <hr />
      <div className="speciality_filter">
        <p className="mb-4">Speciality</p>
        <form>
          <div className="d-flex justify-content-start mb-2">
            <input
              className="checkmark"
              type="checkbox"
              id="input1"
              name="input1"
              value="Orthopedics"
              onChange={changeChecked}
            />
            <label htmlFor="input1">Orthopedics</label>
          </div>
          <div className="d-flex justify-content-start mb-2">
            <input
              className="checkmark"
              type="checkbox"
              id="input2"
              name="input2"
              value="Neck bone surgery"
              onChange={changeChecked}
            />
            <label htmlFor="input2">Neck bone surgery</label>
          </div>
          <div className="d-flex justify-content-start mb-2">
            <input
              className="checkmark"
              type="checkbox"
              id="input3"
              name="input3"
              value="Joint Replacement Surgeon"
              onChange={changeChecked}
            />
            <label htmlFor="input3">Joint Replacement Surgeont</label>
          </div>
        </form>
        <button>+View More</button>
      </div>
      <hr />
      <div className="sort_filter">
        <p className="mb-4">Sort by</p>
        <form>
          <div className="d-flex justify-content-start mb-2">
            <input
              className="checkmark"
              type="radio"
              id="sort1"
              name="sort"
              value="1"
              onChange={(e) => {
                sortfilter(e);
                // console.log(e.target.value);
              }}
            />
            <label htmlFor="sort1">Price- Low to High</label>
          </div>
          <div className="d-flex justify-content-start mb-2">
            <input
              className="checkmark"
              type="radio"
              id="sort2"
              name="sort"
              value="2"
              onChange={(e) => {
                sortfilter(e);
                // console.log(e.target.value);
              }}
            />
            <label htmlFor="sort2">Price- High to Low</label>
          </div>
          <div className="d-flex justify-content-start mb-2">
            <input
              className="checkmark"
              type="radio"
              id="sort3"
              name="sort"
              value="3"
              onChange={(e) => {
                sortfilter(e);
                // console.log(e.target.value);
              }}
            />
            <label htmlFor="sort3">Year of Experience</label>
          </div>
          <div className="d-flex justify-content-start mb-2">
            <input
              className="checkmark"
              type="radio"
              id="sort4"
              name="sort"
              value="4"
              onChange={(e) => {
                sortfilter(e);
                // console.log(e.target.value);
              }}
            />
            <label htmlFor="sort4">Recommendation</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SideFilter;
