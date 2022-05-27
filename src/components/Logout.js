import React, { useEffect } from "react";
import { useAuth } from "./context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout()}>Logout</button>
    </div>
  );
};

export default Logout;
