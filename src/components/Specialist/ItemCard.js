import React from "react";
import "./Specialist.css";
const ItemCard = ({ item }) => {
  const { title, icon } = item;
  return (
    <div className="item_card">
      <img src={icon} alt="icon" />
      <p>{title}</p>
    </div>
  );
};

export default ItemCard;
