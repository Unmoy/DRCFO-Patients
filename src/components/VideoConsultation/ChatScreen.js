import React, { useState } from "react";
import "./VideoConsultation";
import "./ChatScreen.css";
import image from "../../assets/images/demo_doc.png";
import VideoModal from "./VideoModal";
const ChatScreen = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="ChatScreen">
      <div className="chat_nav">
        <div className="d-flex align-items-center doctor_info">
          <img src={image} alt="" />
          <h5>Dr.Krishnanand </h5>
        </div>
        <div className="call_button">
          <button onClick={openModal}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 44 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M42 6L30 14L42 22V6Z"
                stroke="#F8F8F8"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26 2H6C3.79086 2 2 3.79086 2 6V22C2 24.2091 3.79086 26 6 26H26C28.2091 26 30 24.2091 30 22V6C30 3.79086 28.2091 2 26 2Z"
                stroke="#F8F8F8"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Request Video Call
          </button>
          <VideoModal modalOpened={modalIsOpen} />
        </div>
      </div>
      <div className="chat_body">
        {/* <ScrollToBottom className="message-container"> */}
        {[1, 2].map((messageContent, i) => {
          return (
            <div
              className="message"
              id="other"
              key={i}
              // id={username === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>messageContent.message</p>
                </div>
                <div className="message-meta">
                  <p id="time">messageContent.time</p>
                  <p id="author">messageContent.author</p>
                </div>
              </div>
            </div>
          );
        })}
        {/* </ScrollToBottom> */}
      </div>
      <div className="chat_footer">
        <form action="" className="message_Form">
          <svg
            width="20"
            height="20"
            viewBox="0 0 26 29"
            fill="none"
            className="input_svg"
          >
            <path
              d="M23.2808 2.65378C19.6577 -0.884593 13.7577 -0.884593 10.1385 2.65378L0.100036 12.45C0.0346511 12.5139 3.55572e-05 12.6003 3.55572e-05 12.6904C3.55572e-05 12.7806 0.0346511 12.867 0.100036 12.9308L1.51926 14.3169C1.58414 14.38 1.67195 14.4154 1.76349 14.4154C1.85504 14.4154 1.94285 14.38 2.00772 14.3169L12.0462 4.52063C13.2923 3.30361 14.95 2.635 16.7115 2.635C18.4731 2.635 20.1308 3.30361 21.3731 4.52063C22.6192 5.73765 23.3038 7.35658 23.3038 9.07318C23.3038 10.7935 22.6192 12.4087 21.3731 13.6257L11.1423 23.6136L9.48463 25.2325C7.93464 26.7463 5.41541 26.7463 3.86541 25.2325C3.11541 24.5 2.70388 23.5272 2.70388 22.4904C2.70388 21.4537 3.11541 20.4809 3.86541 19.7484L14.0154 9.83945C14.2731 9.59154 14.6115 9.45256 14.9731 9.45256H14.9769C15.3385 9.45256 15.6731 9.59154 15.9269 9.83945C16.1846 10.0911 16.3231 10.4217 16.3231 10.7748C16.3231 11.1241 16.1808 11.4546 15.9269 11.7025L7.63079 19.7972C7.56541 19.8611 7.53079 19.9475 7.53079 20.0376C7.53079 20.1278 7.56541 20.2142 7.63079 20.278L9.05002 21.6641C9.11489 21.7272 9.20271 21.7626 9.29425 21.7626C9.38579 21.7626 9.47361 21.7272 9.53848 21.6641L17.8308 13.5656C18.5962 12.8181 19.0154 11.8265 19.0154 10.771C19.0154 9.7155 18.5923 8.72009 17.8308 7.97636C16.25 6.43255 13.6808 6.4363 12.1 7.97636L11.1154 8.94171L1.95388 17.8853C1.33207 18.489 0.839183 19.2073 0.503786 19.9984C0.168389 20.7896 -0.00283719 21.6379 3.55572e-05 22.4942C3.55572e-05 24.2333 0.696188 25.8673 1.95388 27.0956C3.25772 28.3652 4.96541 29 6.6731 29C8.38079 29 10.0885 28.3652 11.3885 27.0956L23.2808 15.4888C25.0308 13.776 26 11.496 26 9.07318C26.0038 6.64665 25.0346 4.36662 23.2808 2.65378Z"
              fill="#545B74"
            />
          </svg>
          <input type="text" className="messegeInput" placeholder="Type Here" />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
