import React from "react";
import icon1 from "../../assets/images/pediatrics.png";
import icon2 from "../../assets/images/thyroid.png";
import icon3 from "../../assets/images/doctor.png";
import icon4 from "../../assets/images/pregnant.png";
import ItemCard from "./ItemCard";
const itemsList = [
  { id: 1, title: "Gynaecology", icon: icon4 },
  { id: 2, title: "Paediatric", icon: icon1 },
  { id: 3, title: "General Physician", icon: icon3 },
  { id: 4, title: "Endocrinology", icon: icon2 },
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
