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
  clinicid,
}) {
  var Tommorow = new Date(new Date().setDate(new Date().getDate() + 1));
  // var Today = new Date();
  // var DayAfterTommorow = new Date(new Date().setDate(new Date().getDate() + 2));
  // localhost:8000/get/subslots?clinicId=6291b02a9b4c04f98b24fd9a&datesArray=["2022-07-23","2022-07-24"]
  // console.log(Tommorow, Today, DayAfterTommorow);
  const [selectedDate, setSelectedDate] = useState(Tommorow);
  const [DateTommorow, setDateTommorow] = useState("");
  const [DateToday, setDateToday] = useState("");
  const [DateDayAfterTommorow, setDateDayAfterTommorow] = useState("");
  const firstSection = { marginLeft: "40px" };
  const startDate = new Date();
  const lastDate = addDays(startDate, endDate || 90);
  const primaryColor = color || "#000";
  const selectedStyle = {
    fontWeight: "600",
    // width: "45px",
    // height: "45px",
    // borderRadius: "50%",
    color: "#194AF5",
  };
  // const datesArray []
  const getTommorow = () => {
    // console.log(selectedDate);
    // var Tommorow = new Date(new Date().setDate(new Date().getDate() + 1));
    var day = selectedDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = selectedDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year = selectedDate.getFullYear();
    setDateTommorow(year + "-" + month + "-" + day);
    console.log("T", year + "-" + month + "-" + day);
  };
  const getToday = () => {
    var Today = new Date(new Date().setDate(selectedDate.getDate() - 1));
    var day = Today.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = Today.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year = Today.getFullYear();
    console.log("to", year + "-" + month + "-" + day);
    setDateToday(year + "-" + month + "-" + day);
  };
  const getDayAfterTommorow = () => {
    var DayAfterTommorow = new Date(
      new Date().setDate(selectedDate.getDate() + 1)
    );
    var day = DayAfterTommorow.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = DayAfterTommorow.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year = DayAfterTommorow.getFullYear();
    setDateDayAfterTommorow(`${year + "-" + month + "-" + day}`);
  };
  useEffect(() => {
    getToday();
    getDayAfterTommorow();
    getTommorow();
    const DatesArray = [DateToday, DateTommorow, DateDayAfterTommorow];
    const stringifyDatesArray = JSON.stringify(DatesArray);
    if (DateToday && DateTommorow && DateDayAfterTommorow) {
      fetch(
        `https://reservefree-backend.herokuapp.com/get/subslots?clinicId=${clinicid}&datesArray=${stringifyDatesArray}`
      )
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [selectedDate]);
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
      console.log(days);
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
      // console.log(days);
    }
    return (
      <div id={"container"} className={styles.dateListScrollable}>
        {months}
      </div>
    );
  }

  const onDateClick = (day) => {
    // console.log(day);
    // console.log(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
    setSelectedDate(day);
    getSelectedDay(day);
  };
  const onNextArrowClick = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
    getSelectedDay(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
  };
  const onPrevArrowClick = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
    getSelectedDay(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
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
    onNextArrowClick();
    const e = document.getElementById("container");
    const width = e ? e.getBoundingClientRect().width : null;
    // console.log(width);
    e.scrollLeft += width - 403;
  };

  const prevWeek = () => {
    onPrevArrowClick();
    const e = document.getElementById("container");
    const width = e ? e.getBoundingClientRect().width : null;
    // console.log(width);
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
