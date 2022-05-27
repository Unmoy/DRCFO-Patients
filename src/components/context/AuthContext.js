import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { authentication } from "../../firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  async function signInWithPhone(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
    console.log(number);
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
    // return "Success";
  }
  async function signInWithOtp(result, otp) {
    try {
      const res = await result.confirm(otp);
      const user = res.user;
      if (user) {
        setCurrentUser({
          user_phone: user.phoneNumber,
          user_uid: user.uid,
        });
        console.log(currentUser);
        fetch("https://reservefree-backend.herokuapp.com/auth/patient", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            phone: user.phoneNumber,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.message === "SUCCESS") {
              localStorage.setItem("patientId", data.id);
            }
          });
      }
    } catch (err) {
      console.log(err);
    }
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          user_phone: user._delegate.phoneNumber,
          user_uid: user._delegate.auth.currentUser.uid,
        });
        console.log(
          user._delegate.phoneNumber,
          user._delegate.auth.currentUser.uid
        );
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInWithPhone,
    signInWithOtp,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
