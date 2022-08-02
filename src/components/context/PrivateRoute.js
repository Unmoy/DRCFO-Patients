import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  // console.log(currentUser);
  const location = useLocation();
  // return currentUser?.user_phone?.length > 0 ? (
  //   children
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
  if (!currentUser?.user_phone?.length) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
