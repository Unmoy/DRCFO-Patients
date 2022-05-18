import React from "react";
import "./TimeCard.css";
const TimeCard = ({ timestamp }) => {
  return (
    <div className="timestamp">
      <h3>{timestamp.title}</h3>
      {timestamp.spots > 0 ? (
        <p className="slots_present">Slots Available</p>
      ) : (
        <p className="slots_absent">No Slots Available</p>
      )}
    </div>
  );
};

export default TimeCard;
