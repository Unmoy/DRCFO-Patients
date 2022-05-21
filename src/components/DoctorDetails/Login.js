import React, { useState } from "react";
import Modal from "react-modal";
import "./Login.css";
import loginlogo from "../../assets/images/login_logo.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "../context/AuthContext";

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

const Login = ({ closeModal, modalOpened }) => {
  const [status, setStatus] = useState("login");
  const [result, setResult] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const { signInWithPhone } = useAuth();
  const { signInWithOtp } = useAuth();

  const getOtp = async () => {
    console.log(phoneNumber);
    if (phoneNumber === "" || phoneNumber === undefined) {
      return setStatus("login");
    }
    try {
      let newNumber = "+" + phoneNumber;
      const response = await signInWithPhone(newNumber);
      setStatus("otp");
      console.log("getotp");
      console.log(response);
      setResult(response);
    } catch (err) {
      console.log(err);
      console.log("Error");
    }
  };
  const verifyOtp = async () => {
    let otp1 = "";
    otp.map((o) => (otp1 += o));
    if (otp1 === "" || otp1 === null) return;
    try {
      await signInWithOtp(result, otp1);
      setStatus("loggedIn");
    } catch (err) {
      console.log(err);
    }
  };

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
          {status === "login" && (
            <div className="booking_input">
              <p className="phone_label">Phone Number*</p>
              <PhoneInput
                country={"in"}
                enableAreaCodes="true"
                onChange={(phone) => {
                  setPhoneNumber(phone);
                }}
              />
              <div id="recaptcha-container" />
            </div>
          )}
          {status === "otp" && (
            <div>
              <div className="booking_input">
                <p className="otp_pass">
                  Please enter the password, we have sended you on
                </p>
                <div className="d-flex justify-content-between mb-0">
                  <p className="num">+{phoneNumber}</p>
                  <p
                    className="change_num "
                    onClick={() => {
                      setStatus("login");
                    }}
                  >
                    Change Number
                  </p>
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
            </div>
          )}
          <div className="mx-5">
            {status === "login" && (
              <button
                className="booking_btn"
                onClick={(e) => {
                  e.preventDefault();
                  getOtp();
                }}
              >
                Send OTP
              </button>
            )}
            {status === "otp" && (
              <button
                className="verify_btn"
                onClick={(e) => {
                  e.preventDefault();
                  verifyOtp();
                }}
              >
                Verify OTP
              </button>
            )}
            <p className="signup_terms">
              By continuing you are agreeing to our
              <span className="terms"> Terms &amp; Conditions</span> and
              <span className="terms"> Privacy Policy</span>
            </p>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Login;
