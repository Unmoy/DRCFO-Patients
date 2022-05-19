import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Login.css";
import loginlogo from "../../assets/images/login_logo.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { useAuth } from "../context/AuthContext";
import { authentication } from "../../firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

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

  const auth = getAuth();
  async function signInWithPhone(number) {
      console.log("Signin")
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        // callback: (response) => {
        //   // reCAPTCHA solved, allow signInWithPhoneNumber.
        //   //   return signInWithPhoneNumber(auth, number, recaptchaVerifier);
        // },
      },
      auth
    );
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }
  async function signInWithOtp(result, otp) {
    try {
      const res = await result.confirm(otp);
      const user = res.user;
      console.log(user)
    //   if (user) {
    //     console.log(user);
    //     setCurrentUser({
    //       user_phone: user.phoneNumber,
    //       user_token: user.accessToken,
    //     });
    //     fetch("https://reservefree-backend.herokuapp.com/auth/patient", {
    //       method: "POST",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         uid: user.accessToken,
    //         phone: user.phoneNumber,
    //       }),
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log(data);
    //         if (data.message === "SUCCESS") {
    //           localStorage.setItem("doctor_id", data.id);
    //           if (data.docter) {
    //             console.log("docotr");
    //             document.location.replace("/dashboard"); // Redirect to dahboard
    //           } else {
    //             // redirect him to clicnic
    //             document.location.replace("/clinicdetails");
    //             console.log("not doc");
    //           }
    //         }
    //       });
    //   }
    } catch (err) {
      console.log(err);
    }
  }

// const { signInWithPhone} = useAuth();
// const { signInWithOtp} = useAuth();

  const getOtp = async () => {
    console.log(phoneNumber);
    if (phoneNumber === "" || phoneNumber === undefined)
      return setStatus("login");
    try {
      let newNumber = "+" + phoneNumber;
      const response = await signInWithPhone(newNumber);
      setStatus("otp");
      console.log("getotp");
      setResult(response);
    } catch (err) {
      console.log(err);
    }
  };
  const verifyOtp = async () => {
    let otp1 = "";
    otp.map((o) => {
      otp1 += o;
    });
    if (otp1 === "" || otp1 === null) return;
    try {
      await signInWithOtp(result, otp1);
      setStatus("loggedIn");
    } catch (err) {
      console.log(err);
    }
  };
//   useEffect(() => {
//     const unsubscribe = authentication.onAuthStateChanged((user) => {
//       console.log(user);
//       if (user) {
//         // localStorage.setItem("token", user._delegate.accessToken);
//       }
//     });
//     return unsubscribe;
//   }, []);

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
          {status == "login" && (
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
          {status == "otp" && (
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
            {status == "login" && (
              <button
                className="booking_btn"
                onClick={() => {
                  getOtp();
                }}
              >
                Send OTP
              </button>
            )}
            {status == "otp" && (
              <button
                className="verify_btn"
                onClick={() => {
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
