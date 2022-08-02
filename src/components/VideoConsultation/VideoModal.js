import { faTruckPlane } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Modal from "react-modal";
import image from "../../assets/images/video_bg.png";
import "./VideoModal.css";
Modal.setAppElement("#root");
const VideoModal = ({ closeModal, modalOpened }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "800px",
      height: "400px",
      boxShadow: "0px 5px 50px rgba(0, 0, 0, 0.25)",
      borderRadius: "20px",
    },
  };

  return (
    <div>
      <Modal
        isOpen={modalOpened}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="Modal"
      >
        <div className="video_info_wrapper">
          <div className="video_left">
            <div>
              <img src={image} alt="video_png" />
            </div>
            <div className="video_icons">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2432 27.1059C12.2004 27.0829 12.1589 27.058 12.1154 27.0371C11.7843 26.8752 11.598 26.5161 11.6647 26.1669C11.7384 25.777 12.0286 25.5096 12.4132 25.5064C13.2668 25.4991 14.1204 25.5031 14.9739 25.5024C15.0507 25.5024 15.1275 25.5024 15.2169 25.5024V23.3741C14.8732 23.2987 14.5226 23.2397 14.182 23.1441C12.6159 22.7044 11.345 21.7988 10.3787 20.4483C9.47223 19.1823 9.02341 17.7453 9.00012 16.166C8.99445 15.7755 9.1896 15.48 9.5207 15.3614C9.8323 15.25 10.1943 15.3469 10.373 15.6372C10.4668 15.7899 10.5266 15.9911 10.5335 16.1732C10.5801 17.4465 10.9377 18.6024 11.7 19.6062C12.5939 20.7838 13.7521 21.5236 15.1836 21.7208C17.3855 22.0242 19.1632 21.2176 20.4757 19.3553C21.1473 18.4025 21.4331 17.3049 21.4639 16.1287C21.4778 15.6012 21.8706 15.2585 22.3559 15.3293C22.7361 15.385 23.0062 15.7309 22.9999 16.166C22.9766 17.7531 22.5246 19.1967 21.6081 20.466C20.5355 21.9508 19.1128 22.8807 17.3628 23.2594C17.1696 23.3013 16.9738 23.3289 16.7762 23.3636V25.5031C16.8548 25.5031 16.9298 25.5031 17.0047 25.5031C17.8299 25.5031 18.6552 25.5018 19.4804 25.5031C19.95 25.5037 20.2547 25.7423 20.3353 26.1669C20.4083 26.5528 20.2056 26.887 19.7851 27.0751C19.7738 27.0803 19.7662 27.0954 19.7568 27.1059H12.2432Z"
                  fill="black"
                />
                <path
                  d="M20.0475 12.7508C20.0475 13.8744 20.0523 14.9974 20.0464 16.121C20.0357 18.0443 18.991 19.6013 17.2873 20.2447C15.1689 21.0444 12.6837 19.6694 12.1223 17.3678C12.0217 16.9551 11.9649 16.5187 11.962 16.0929C11.9466 13.8532 11.9395 11.6134 11.9596 9.37434C11.9762 7.53918 12.7701 6.18546 14.3442 5.38887C16.5378 4.27839 19.2968 5.65398 19.889 8.14756C19.9854 8.55399 20.0328 8.98292 20.041 9.40248C20.0617 10.5186 20.0481 11.6347 20.0481 12.7508H20.0475Z"
                  fill="black"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="15"
                  stroke="black"
                  stroke-width="2"
                />
              </svg>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26 9.91629V22.1198C25.9491 22.207 25.91 22.3028 25.8464 22.3799C25.5573 22.7288 25.0877 22.7335 24.7365 22.39C23.3131 20.9981 21.8921 19.6048 20.4696 18.212C20.4217 18.165 20.3698 18.1219 20.2906 18.051C20.2906 18.4463 20.2964 18.8013 20.2891 19.1559C20.2803 19.5631 20.293 19.9747 20.2372 20.3767C20.0567 21.6809 18.7933 23.01 17.0152 22.9999C14.4378 22.9851 11.8609 23.0023 9.28356 22.9889C8.91816 22.987 8.53711 22.9381 8.19127 22.8265C6.88718 22.4063 6.02578 21.2353 6.0067 19.8913C5.99398 19.0184 6.00328 18.1449 6.00328 17.2714C6.00328 15.595 6.00474 13.9185 6.0023 12.2415C6.00181 11.7638 6.061 11.2962 6.28014 10.8669C6.89697 9.65899 7.888 9.0069 9.2816 9.00354C11.859 8.99683 14.4358 9.00163 17.0132 9.0021C17.0846 9.0021 17.1565 9.0045 17.228 9.00833C18.8686 9.09458 20.1585 10.3173 20.269 11.9239C20.3096 12.5141 20.2852 13.1087 20.2901 13.7014C20.2906 13.7675 20.2901 13.8341 20.2901 13.942C20.3762 13.8624 20.428 13.8174 20.4769 13.7695C21.8867 12.392 23.295 11.0125 24.7091 9.63887C24.8206 9.53059 24.963 9.42901 25.1102 9.38541C25.4947 9.2709 25.8078 9.47117 25.9995 9.91677L26 9.91629Z"
                  fill="black"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="15"
                  stroke="black"
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>

          <div className="video_right">
            <div className="doc_content">
              Dr.Krishnanand Inviting you for video consultation
            </div>
            <div>
              <button className="video_decline">Decline</button>
              <button className="video_accept">Join</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VideoModal;
