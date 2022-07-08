import React, { useEffect, useState } from "react";
import "./PatientDetails.css";
import patientImage from "../../assets/images/docimage.png";
import clock from "../../assets/images/appt_clock.png";
import calender from "../../assets/images/appt-calender.png";
import usericon from "../../assets/images/patient_icon.png";
import emailicon from "../../assets/images/emailicon.png";
import phoneicon from "../../assets/images/phone.png";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PatientDetails = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [gender, setGender] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [clinicId, setClinicId] = useState(localStorage.getItem("clinicId"));
  const [patientId, setPatientId] = useState(localStorage.getItem("patientId"));
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [apptdata, setApptData] = useState("");
  const [doctorData, setDoctorData] = useState({});
  const [disableBtn, setDisableBtn] = useState(false);
  const { currentUser } = useAuth();
  const [page, setPage] = useState(true);
  const [payType, setPayType] = useState("");
  const navigate = useNavigate();
  window.scrollTo(0, 0);
  useEffect(() => {
    setDate(localStorage.getItem("selectedDate"));
    setTime(localStorage.getItem("selectedTime"));
    setDoctorId(localStorage.getItem("docterId"));
    fetch(
      `https://reservefree-backend.herokuapp.com/get/list/docter-clinic?clinicId=${clinicId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDoctorData(data);
      });
  }, [clinicId]);

  const getGender = (e) => {
    setGender(e.target.value);
  };
  const onSubmit = (data) => {
    setName(data.name);
    setNumber(data.phone);
    setEmail(data.email);
    data.gender = gender;
    data.time = time;
    data.date = date;
    data.clinicId = clinicId;
    data.docterId = doctorId;
    data.patientId = localStorage.getItem("patientId");
    setApptData(data);
    setPage(false);
  };
  const getPaymentDetail = (e) => {
    setPayType(e.target.value);
  };
  // const socket = io.connect("https://reservefree-backend.herokuapp.com");
  // const [message, setMessage] = useState("");
  // const joinRoom = () => {
  //   if (doctorId !== "") {
  //     socket.emit("join_room", doctorId);
  //   }
  // };
  // const sendMessage = () => {
  //   socket.emit("send_message", { message, doctorId });
  // };

  const proceedtoPay = () => {
    setDisableBtn(true);
    apptdata.payment = payType;
    apptdata.fees = doctorData.fees;
    apptdata.booking = "Online";
    console.log(apptdata);
    fetch("https://reservefree-backend.herokuapp.com/add/appointment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apptdata),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.message === "SUCCESS") {
          navigate("/appointmentlist");
        }
        localStorage.setItem("appointmentId", data.id);
      });
  };

  const { register, handleSubmit } = useForm();
  const displayTime = time.substring(0, 8) + " - " + time.substring(9, 17);
  const displayDate =
    date.substring(0, 4) + " " + date.substring(4, 6) + date.substring(6, 11);
  return (
    <div className="container py-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="patient_details_header row d-flex justify-content-center">
          <div className="patient_detail_column_1 col-md-4 col-sm-6">
            <img
              className="patient_image_small"
              src={patientImage}
              alt="patientImage"
            />
            <div className="patient_description">
              <h5>{doctorData.docterName}</h5>
              <span className="dr_speciality mb-2">
                {doctorData.speciality}
              </span>
              <ul className="mb-2">
                <li>{doctorData.clinicName}</li>
              </ul>
              <p className="">14 years experience overall</p>
            </div>
          </div>
          <div className="patient_detail_column_2 col-md-4 col-sm-6">
            <h6 className="patientLocation_res">Location</h6>
            <p className="patientLocation_res">
              {doctorData?.address?.street}, {doctorData?.address?.area},{" "}
              {doctorData?.address?.city}, {doctorData?.address?.state}-
              {doctorData?.address?.pincode}
            </p>
          </div>
          <div className="patient_detail_column_3 col-md-4 col-sm-6">
            <div>
              <h5 className="book_time">Booking Date & Time</h5>
              <p>
                <img className="appt_logo" src={calender} alt="" /> On{" "}
                {displayDate}
              </p>
            </div>
            <div>
              <h5 className="change_time" onClick={() => navigate(-1)}>
                Change Date & Time
              </h5>
              <p>
                <img className="appt_logo" src={clock} alt="" /> {displayTime}
              </p>
            </div>
          </div>
        </div>
        {page ? (
          <div className=" d-flex justify-content-center flex-column align-items-center py-5">
            <div className="appt_form_header">
              <h3>Tell us a bit about you</h3>
              <p className="subHeader">
                To book your appointment, we need to verify a few things for Dr.{" "}
                {doctorData.docterName}'s office.
              </p>
            </div>
            <div className="patient_details_form">
              <div className="patient_inputs">
                <label htmlFor="name">Full Name*</label>
                <div className="patient_input_icon">
                  <img src={usericon} alt="" className="input_icon_patient" />
                </div>
                <input
                  {...register("name")}
                  type="text"
                  className="patient_details_input"
                  placeholder="Please enter full name"
                />
              </div>
              <div>
                <label htmlFor="age">Age</label>
                <div className="patient_input_icon">
                  <img
                    src={emailicon}
                    alt=""
                    className="input_icon_patient_2"
                  />
                </div>
                <input
                  {...register("age")}
                  type="text"
                  className="patient_details_input"
                  placeholder="Please enter Age"
                />
              </div>
              <div className="gender_box">
                <label htmlFor="gender">Gender</label>
                <input
                  onChange={getGender}
                  className="checkbox-tools"
                  type="radio"
                  name="tools"
                  id="tool-1"
                  value="Male"
                />
                <label className="for-checkbox-tools" htmlFor="tool-1">
                  Male
                </label>
                <input
                  onChange={getGender}
                  className="checkbox-tools"
                  type="radio"
                  name="tools"
                  id="tool-2"
                  value="Female"
                />
                <label className="for-checkbox-tools" htmlFor="tool-2">
                  Female
                </label>
                <input
                  onChange={getGender}
                  className="checkbox-tools"
                  type="radio"
                  name="tools"
                  id="tool-3"
                  value="Others"
                />
                <label className="for-checkbox-tools" htmlFor="tool-3">
                  Others
                </label>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <div className="patient_input_icon">
                  <img
                    src={emailicon}
                    alt=""
                    className="input_icon_patient_2"
                  />
                </div>
                <input
                  {...register("email")}
                  type="text"
                  className="patient_details_input"
                  placeholder="Please enter email"
                />
              </div>
              <div>
                <label htmlFor="phone">Phone Number</label>
                <div className="patient_input_icon">
                  <img
                    src={phoneicon}
                    alt=""
                    className="input_icon_patient_3"
                  />
                </div>
                <input
                  {...register("phone")}
                  type="text"
                  className="patient_details_input"
                  placeholder="Please enter phone number"
                  defaultValue={currentUser.user_phone}
                />
              </div>
              <button className="appt_confirm_btn" type="submit">
                Confirm
              </button>
              <div className="appt_footer">
                <p>
                  1.Updates will be sent to{" "}
                  <span className="highlight_span">
                    {currentUser.user_phone}
                  </span>
                </p>
                <p className="terms_condition">
                  By booking this appointment, you agree to DR CFO{" "}
                  <span className="highlight_span">Terms and Conditions.</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="confirmation_wrapper">
              <div className="confirm_header d-flex justify-content-between align-items-center">
                <h1>Your Details</h1>
                <p onClick={() => setPage(true)}>Change Details</p>
              </div>
              <div className="confimation_details d-flex justify-content-around ">
                <div className="detail_col_1">
                  <h6>Full name</h6>
                  {name}
                </div>
                <div className="detail_col_2">
                  <h6>Email</h6>
                  {email}
                </div>
                <div className="detail_col_3">
                  <h6>Phone Number*</h6>
                  <p>{number}</p>
                </div>
                <div className="detail_col_4">
                  <h6>Gender</h6>
                  {gender}
                </div>
              </div>
            </div>
            <div className="pay_wrapper">
              <h1>Payment Details</h1>
              <div className="pay_type_selector">
                <p>
                  <input
                    type="radio"
                    id="test1"
                    name="radio-group"
                    className="payment_radio_input"
                    value="PAY_ON_VISIT"
                    onClick={getPaymentDetail}
                  />
                  <label htmlFor="test1">Pay On Visit</label>
                </p>
                <p>
                  <input
                    type="radio"
                    id="test2"
                    name="radio-group"
                    className="payment_radio_input"
                    value="PAID_ONLINE"
                    onClick={getPaymentDetail}
                  />
                  <label htmlFor="test2">Online payment</label>
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-5">
              <button
                disabled={disableBtn}
                className="proceed_pay_btn"
                onClick={proceedtoPay}
              >
                {disableBtn ? "Please Wait..." : "Confirm Booking"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default PatientDetails;
