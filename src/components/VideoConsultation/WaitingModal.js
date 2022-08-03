import React from "react";
import Modal from "react-modal";
const WaitingModal = () => {
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
        isOpen={true}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="Modal"
      >
        <div className="video_info_wrapper">
          <div className="video_right">
            <div className="doc_content">Please Wiat</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WaitingModal;
