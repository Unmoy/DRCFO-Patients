import React from "react";
import icon1 from "../../assets/images/s1.svg";
import icon2 from "../../assets/images/s2.svg";
import icon3 from "../../assets/images/s3.svg";
import icon4 from "../../assets/images/s4.svg";
import ItemCard from "./ItemCard";
const itemsList = [
  { id: 1, title: "Critical Care", icon: icon1 },
  { id: 2, title: "Primary  Care", icon: icon2 },
  { id: 3, title: "Orthopedics", icon: icon3 },
  { id: 4, title: "Neuro Surgen", icon: icon4 },
];
const Specialist = () => {
  return (
    <div className="specialist_wrapper">
      <div className="specialist_heading">
        <p>Top-searched specialties</p>
      </div>
      <div className="specialist_item_box">
        {itemsList.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Specialist;
