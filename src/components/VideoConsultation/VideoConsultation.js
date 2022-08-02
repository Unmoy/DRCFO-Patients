import SelectInput from "@mui/material/Select/SelectInput";
import React, { useState } from "react";
import Login from "../DoctorDetails/Login";
import "./VideoConsultation.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const VideoConsultation = () => {
  const { currentUser } = useAuth();
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [symptom, setSymptom] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [inputamount, setAmount] = useState(null);
  const [description, setDescription] = useState("");
  const patientId = localStorage.getItem("patientId");
  const [modalIsOpen, setIsOpen] = useState(false);
  // console.log(JSON.stringify(inputamount));
  // const amount = 359 * 100;
  const navigate = useNavigate();
  const getSpeacializationDetail = (e) => {
    setSelectedSpecialization(e.target.value);
    switch (e.target.value) {
      case "Paediatric":
        setAmount(359);
        break;
      case "General physician":
        setAmount(459);
        break;
      case "ENT":
        setAmount(699);
        break;
      default:
        setAmount("");
    }
  };
  const handleSymptomInput = (e) => {
    setSymptom(e.target.value);
  };
  const handleNameInput = (e) => {
    setName(e.target.value);
  };
  const handleAgeInput = (e) => {
    setAge(e.target.value);
  };
  const handleDescInput = (e) => {
    setDescription(e.target.value);
  };
  const patientConsultationData = [
    {
      patientId: patientId,
      name: name,
      age: age,
      symptoms: symptom,
      specialization: selectedSpecialization,
      description: description,
      session_cost: 359,
      paymentDetails: {},
    },
  ];
  function openModal() {
    if (currentUser?.user_phone?.length) {
      // console.log(currentUser?.user_phone);
      const totalAmount = inputamount * 100;
      fetch("https://reservefree-backend.herokuapp.com/payment/new", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
          notes: { patientId, videoConsultation: true },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          displayRazorpay(data);
        });
    }
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay(result) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result;

    const options = {
      key: "rzp_test_UYJNa41aNnBTG6", // Enter the Key ID generated from the Dashboard
      amount,
      currency: currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        // console.log(data);
        const patientConsultationData = {
          patientId: patientId,
          name: name,
          age: age,
          symptoms: symptom,
          specialization: selectedSpecialization,
          description: description,
          fees: JSON.stringify(inputamount),
          paymentDetails: data,
        };

        console.log(patientConsultationData);
        fetch(
          "https://reservefree-backend.herokuapp.com/add/videoConsultation",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(patientConsultationData),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.message === "SUCCESS") {
              navigate("/chat");
            }
            // localStorage.setItem("appointmentId", data.id);
          });
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <div>
      <div className="VideoConsultation">
        <div>
          <h1>Let’s book your consultation instantly</h1>
        </div>
        <div className="consultation_inputs">
          <div className="mb-3">
            <label htmlFor="">Fill your symtoms or health issue</label>
            <input
              className="symptom_input"
              type="text"
              placeholder="Neck Pain"
              onChange={handleSymptomInput}
            />
          </div>
          {symptom.length ? (
            <div className="relevants">
              <h2>Select a relevant specialization</h2>
              <ul>
                <li className="specialization_type_selector">
                  <input
                    type="radio"
                    id="test1"
                    name="radio-group"
                    className="relevant_radio_input"
                    value="Paediatric"
                    onClick={getSpeacializationDetail}
                  />
                  <label htmlFor="test1">Paediatric</label>
                  <span>₹359</span>
                </li>
                <li className="specialization_type_selector">
                  <input
                    type="radio"
                    id="test2"
                    name="radio-group"
                    className="relevant_radio_input"
                    value="ENT"
                    onClick={getSpeacializationDetail}
                  />
                  <label htmlFor="test2">ENT</label>
                  <span>₹699</span>
                </li>
                <li className="specialization_type_selector">
                  <input
                    type="radio"
                    id="test4"
                    name="radio-group"
                    className="relevant_radio_input"
                    value="General physician"
                    onClick={getSpeacializationDetail}
                  />
                  <label htmlFor="test4">General physician</label>
                  <span>₹459</span>
                </li>
              </ul>
            </div>
          ) : null}
          <div className="mb-3">
            <label htmlFor="">
              We would like to know more about your problem?
            </label>
            <textarea
              className="problem_input"
              placeholder="Write your problem here..."
              onChange={handleDescInput}
            />
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <div className="consult_name">
              <label htmlFor="">Full Name*</label>
              <input
                type="text"
                placeholder="Enter Name"
                onChange={handleNameInput}
              />
            </div>
            <div className="consult_age">
              <label htmlFor="">Age</label>
              <input type="text" placeholder="Age" onChange={handleAgeInput} />
            </div>
          </div>
        </div>
        <div className="patient_VideoDetails d-flex justify-content-center">
          <button onClick={openModal}>
            {currentUser?.user_phone && inputamount
              ? `Pay ₹${inputamount}`
              : "Confirm"}
          </button>
        </div>
        {/* <Login modalOpened={modalIsOpen} closeModal={closeModal} /> */}
      </div>
    </div>
  );
};

export default VideoConsultation;
