import React, { useEffect, useState } from "react";
import "./SlotStatus.css";
const SlotStatus = ({ day, clinicid }) => {
  const [DateToday, setDateToday] = useState("");
  const [d, setd] = useState(null);
  const getToday = () => {
    var Today = new Date(day);
    var slotdate = Today.getDate();
    if (slotdate < 10) {
      slotdate = "0" + slotdate;
    }
    var month = Today.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year = Today.getFullYear();
    setDateToday(year + "-" + month + "-" + slotdate);
  };
  useEffect(() => {
    getToday();
    if (DateToday) {
      fetch(
        `https://reservefree-backend.herokuapp.com/get/availability?date=${DateToday}&clinicId=${clinicid}&slots=true`
      )
        .then((res) => res.json())
        .then((data) => {
          setd(data.slots);
        });
    }
  }, [DateToday]);
  return (
    <div>
      {d > 0 ? (
        <p className="avaiable_stat">{d} Slots Available </p>
      ) : (
        <p className="not_avaiable_stat">No Slot Available</p>
      )}
    </div>
  );
};

export default SlotStatus;
