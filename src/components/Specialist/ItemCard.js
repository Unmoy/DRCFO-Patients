import React from "react";
import { useNavigate } from "react-router-dom";
import "./Specialist.css";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  const { title, icon } = item;
  const handleSpecialitySearch = (value) => {
    console.log(value);
    navigate("/doctors");
    localStorage.setItem("speciality_search_item", value);
  };
  return (
    <div className="item_card" onClick={() => handleSpecialitySearch(title)}>
      <img src={icon} alt="icon" />
      <p>{title}</p>
    </div>
  );
};

export default ItemCard;
