import React, { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();
  let navigate = useNavigate();
  const logoutUser = () => {
    logout();
  };

  return (
    <div>
      <button onClick={logout()}>Logout</button>
    </div>
  );
};

export default Logout;
