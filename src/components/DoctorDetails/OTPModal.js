import React, { useState } from "react";
import Modal from "react-modal";
import loginlogo from "../../assets/images/login_logo.png";
import "./BookingForm.css";
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
const OTPModal = ({ closeModal, modalIsOpen }) => {
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  return (
    <div className="booking_modal">
      <Modal
        isOpen={modalIsOpen}
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
            <p className="otp_pass">
              Please enter the password, we have sended you on
            </p>
            <div className="d-flex justify-content-between mb-0">
              <p className="num">+91-7488902311</p>
              <p className="change_num ">Change Number</p>
            </div>
          </div>
          <div className="otp_box d-flex justify-content-center">
            {otp.map((data, index) => {
              return (
                <input
                  className="otp-field"
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              );
            })}
          </div>
          <div className="mx-5">
            <button className="verify_btn">Verify OTP</button>
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

export default OTPModal;
