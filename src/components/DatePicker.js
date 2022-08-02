import React, { useEffect, useState } from "react";
import styles from "./DatePicker.module.css";
import {
  addDays,
  addMonths,
  differenceInMonths,
  format,
  isSameDay,
  lastDayOfMonth,
  startOfMonth,
} from "date-fns";
import rightarrow from ".././assets/images/rightarrow.png";
import leftarrow from ".././assets/images/leftarrow.png";
import SlotStatus from "./DoctorDetails/SlotStatus";
export default function DatePicker({
  endDate,
  selectDate,
  getSelectedDay,
  color,
  labelFormat,
  clinicid,
  getActiveDate,
}) {
  var Tommorow = new Date(new Date().setDate(new Date().getDate() + 1));
  const [selectedDate, setSelectedDate] = useState(Tommorow);
  const firstSection = { marginLeft: "40px" };
  const startDate = new Date();
  const lastDate = addDays(startDate, endDate || 60);
  const primaryColor = color || "#000";
  const selectedStyle = {
    fontWeight: "600",
    color: "#194AF5",
  };
  var gsDayNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const selectedDay = (val) => {
    var monthName = gsDayNames[val.getMonth()];
    var day = val.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = val.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year = val.getFullYear();
    getActiveDate(year + "-" + month + "-" + day);
    localStorage.setItem("selectedDate", monthName + +day + "," + year);
  };

  const labelColor = { color: primaryColor };

  const getStyles = (day) => {
    if (isSameDay(day, selectedDate)) {
      return selectedStyle;
    }
    return null;
  };

  const getId = (day) => {
    if (isSameDay(day, selectedDate)) {
      return "selected";
    } else {
      return "";
    }
  };

  function renderDays() {
    const dayFormat = "E";
    const dateFormat = "d";
    const months = [];
    let days = [];
    for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
      let start, end;
      const month = startOfMonth(addMonths(startDate, i));
      start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
      end =
        i === differenceInMonths(lastDate, startDate)
          ? Number(format(lastDate, "d"))
          : Number(format(lastDayOfMonth(month), "d"));
      for (let j = start; j < end; j++) {
        days.push(
          <div
            id={`${getId(addDays(startDate, j))}`}
            className={styles.dateDayItem}
            style={getStyles(addDays(month, j))}
            key={addDays(month, j)}
            onClick={() => onDateClick(addDays(month, j))}
          >
            <div className={styles.dayLabel}>
              {format(addDays(month, j), dayFormat)},
              {format(month, labelFormat || "MMMM")}{" "}
              {format(addDays(month, j), dateFormat)}
            </div>
            <SlotStatus day={addDays(month, j)} clinicid={clinicid} />
          </div>
        );
      }

      months.push(
        <div className={styles.monthContainer} key={month}>
          <span className={styles.monthYearLabel} style={labelColor}>
            {format(month, labelFormat || "MMMM yyyy")}
          </span>
          <div
            className={styles.daysContainer}
            style={i === 0 ? firstSection : null}
          >
            {days}
          </div>
        </div>
      );
      days = [];
    }
    return (
      <div id={"container"} className={styles.dateListScrollable}>
        {months}
      </div>
    );
  }

  const onDateClick = (day) => {
    setSelectedDate(day);
    selectedDay(day);
  };
  const onNextArrowClick = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
  };
  const onPrevArrowClick = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
  };
  useEffect(() => {
    if (selectedDate) {
      selectedDay(selectedDate);
    } else {
      selectedDay(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectDate) {
      if (!isSameDay(selectedDate, selectDate)) {
        setSelectedDate(selectDate);
        setTimeout(() => {
          let view = document.getElementById("selected");
          if (view) {
            view.scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest",
            });
          }
        }, 20);
      }
    }
  }, [selectDate, selectedDate]);

  const nextWeek = () => {
    onNextArrowClick();
    const e = document.getElementById("container");
    const width = e ? e.getBoundingClientRect().width : null;
    e.scrollLeft += width - 403;
  };

  const prevWeek = () => {
    onPrevArrowClick();
    const e = document.getElementById("container");
    const width = e ? e.getBoundingClientRect().width : null;
    e.scrollLeft -= width - 403;
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={prevWeek}>
          <img src={leftarrow} alt="" />
        </button>
      </div>
      {renderDays()}

      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={nextWeek}>
          <img src={rightarrow} alt="" />
        </button>
      </div>
    </div>
  );
}
