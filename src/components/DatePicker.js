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
export default function DatePicker({
  endDate,
  selectDate,
  getSelectedDay,
  color,
  labelFormat,
  slots,
}) {
  var Tommorow = new Date(new Date().setDate(new Date().getDate() + 1));
  const [selectedDate, setSelectedDate] = useState(Tommorow);
  const firstSection = { marginLeft: "40px" };
  const startDate = new Date();
  const lastDate = addDays(startDate, endDate || 90);
  const primaryColor = color || "#000";
  const selectedStyle = {
    fontWeight: "600",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    color: "#194AF5",
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
            <p className={styles.slots}>Slots available</p>
            {/* {slots.length > 0 ? (
              <p className={styles.slots}>Slots available</p>
            ) : (
              <p className={styles.Noslots}>No Slots available</p>
            )} */}
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
    console.log(day);
    setSelectedDate(day);
    getSelectedDay(day);
  };

  useEffect(() => {
    if (selectedDate) {
      getSelectedDay(selectedDate);
    } else {
      getSelectedDay(selectedDate);
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
    const e = document.getElementById("container");
    const width = e ? e.getBoundingClientRect().width : null;
    e.scrollLeft += width - 60;
  };

  const prevWeek = () => {
    const e = document.getElementById("container");
    const width = e ? e.getBoundingClientRect().width : null;
    e.scrollLeft -= width - 60;
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
