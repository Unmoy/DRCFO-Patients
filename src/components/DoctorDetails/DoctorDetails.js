import React, { useEffect, useState } from "react";
import "./DoctorDetails.css";
import docimage from "../../assets/images/docimage.png";
import blackmarker from "../../assets/images/black-marker.png";
import Carousel from "react-elastic-carousel";
import TimeCard from "./TimeCard";
import Login from "./Login";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router";
const carouselItem = [
  {
    id: 1,
    title: "Today",
    spots: 0,
  },
  {
    id: 2,
    title: "Tomorrow",
    spots: 1,
  },
  {
    id: 3,
    title: "Wed, 13 Apr",
    spots: 1,
  },
  {
    id: 4,
    title: "Thu, 14 Apr",
    spots: 3,
  },
  {
    id: 5,
    title: "Fri, 15 Apr",
    spots: 0,
  },
  {
    id: 6,
    title: "Sat, 16 Apr",
    spots: 8,
  },
];
const detailText =
  "Dr. Ziwei Gao grew up on Long Island, she then received Doctorate of Dental Surgery from Stony Brook School of Dental Medicine. Following dental school, she completed a one-year advanced training in General Practice Dentistry at Health  Dr. Ziwei Gao grew up on Long Island, she then received Doctorate of Dental Surgery from Stony Brook School of Dental Medicine. Following dental school, she completed a one-year advanced training in General Practice Dentistry at Health in";
const DoctorDetails = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [singleDoctor, setSingleDoctor] = useState({});
  const [docspecialities, setDocSpecialities] = useState([]);

  const { id } = useParams();
  console.log(singleDoctor);

  const [showMore, setShowMore] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`https://reservefree-backend.herokuapp.com/get/docter?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleDoctor(data);

        const propertyValues = Object.values(data.specialities);
        setDocSpecialities(propertyValues);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="doctor_header_card">
                <img src={docimage} alt="docimage" />
                <div className="doctor_header_card_description">
                  <h5 className="doc_name mb-2">{singleDoctor.name}</h5>
                  <span className="mb-2 header_pointer">Orthopedist</span>
                  <ul className="mb-2">
                    <li>Own Clinic</li>
                  </ul>
                  <p className="mb-5">14 years experience overall</p>
                  <div className="doctor_visit_info">
                    <div className="consultation">
                      <span className="fee">₹600</span>
                      <p className="consult_text">Consultation fee</p>
                    </div>
                    <div className="kms_distance">
                      <p className="kmph mb-2">
                        <img src={blackmarker} alt="" className="mb-1" /> 5.2 KM
                      </p>
                      <p className="direction_btn">Get Direction</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="doctor_detail_card">
                <div className="doc_about">
                  <h3>About Dr. Krishnanand</h3>
                  <p>
                    {showMore
                      ? detailText
                      : `${detailText.substring(0, 200)}...`}
                  </p>
                  <button onClick={() => setShowMore(!showMore)}>
                    {showMore ? "show less" : "show more"}
                  </button>
                </div>
                <div className="doc_speciality">
                  <h3>Specialties</h3>
                  <div>
                    {docspecialities.map((speciality) => (
                      <button key={speciality}>{speciality}</button>
                    ))}
                  </div>
                </div>
                <div className="doc_education">
                  <h3>Education and training</h3>
                  <ul>
                    <li>
                      State University of New York, Stony Brook, MBBS in
                      Orthopedist
                    </li>
                    <li>
                      State University of New York, Stony Brook, MS in
                      Orthopedist Surgery
                    </li>
                  </ul>
                </div>
                <div className="doc_language">
                  <h3>Language</h3>
                  <p>English,Hindi,Kanada,Marathi</p>
                </div>
                <div className="doc_address">
                  <h3>Address</h3>
                  <span>IHM Hospital 7 Ressearch Center</span>
                  <p>
                    Ardee city, Sec-52, Block c, gurugram, Haryana India-170003
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="booking_card">
                <div className="booking_card_header">
                  <h3>Book an appointment for free</h3>
                  <p>Select available time</p>
                </div>
                <div className="time_table">
                  <div className="time_table_carousel">
                    <Carousel
                      itemsToShow={3}
                      showArrows={true}
                      pagination={false}
                    >
                      {carouselItem?.map((timestamp) => {
                        return (
                          <TimeCard key={timestamp.id} timestamp={timestamp} />
                        );
                      })}
                    </Carousel>
                  </div>
                  <div className="time_box">
                    <div>
                      <h2>Morning (6 slots)</h2>
                    </div>
                    <div className="d-flex justify-content-evenly flex-wrap time_wrapper">
                      <p>10:30AM-11:30AM</p>
                      <p>10:30AM-11:30AM</p>
                      <p>10:30AM-11:30AM</p>
                      <p>10:30AM-11:30AM</p>
                    </div>
                  </div>
                  <div className="time_box">
                    <div>
                      <h2>Evening (6 slots)</h2>
                    </div>
                    <div className="d-flex justify-content-evenly flex-wrap time_wrapper">
                      <p>10:30AM-11:30AM</p>
                      <p>10:30AM-11:30AM</p>
                      <p>10:30AM-11:30AM</p>
                      <p>10:30AM-11:30AM</p>
                    </div>
                  </div>
                </div>
                <button onClick={openModal} className="bookbtn">
                  Book Appointment
                </button>
                <Login
                  modalOpened={modalIsOpen}
                  closeModal={closeModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDetails;
