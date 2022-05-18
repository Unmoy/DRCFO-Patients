import React, { useState } from "react";
import Modal from "react-modal";
import "./BookingForm.css";
import loginlogo from "../../assets/images/login_logo.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OTPModal from "./OTPModal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
const BookingForm = ({ closeModal, modalOpened }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }
  return (
    <div className="booking_modal">
      <Modal
        isOpen={modalOpened}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="signup_header">
          <img src={loginlogo} alt="loginlogo" />
          <div>
            <h3>Login/Signup</h3>
            <p>One step away to confirm your appointment</p>
          </div>
        </div>
        <div className="sign_up_input_box"></div>
        <form>
          <div className="booking_input">
            <p className="phone_label">Phone Number*</p>
            <PhoneInput country={"in"} enableAreaCodes="true" />
          </div>
          <div className="mx-5">
            <button onClick={openModal} className="booking_btn">
              Send OTP
            </button>
            <OTPModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
            <p className="signup_terms">
              By continuing you are agreeing to our
              <span className="terms"> Terms & Conditions</span> and
              <span className="terms"> Privacy Policy</span>
            </p>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BookingForm;
