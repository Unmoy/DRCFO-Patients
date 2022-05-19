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
        console.log(user);
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
              localStorage.setItem("patient_id", data.id);
              if (data.patient) {
                console.log("old");
                document.location.replace("/"); // Redirect to dahboard
              } else {
                // redirect him to clicnic
                document.location.replace("/doctors");
                console.log("new");
              }
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
      console.log(user);
      if (user) {
        console.log(user);
        setCurrentUser({
          user_phone: user.phoneNumber,
          user_uid: user.uid,
        });
        console.log(currentUser);
        // fetch("https://reservefree-backend.herokuapp.com/auth/docter", {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     token: user.accessToken,
        //     phone: user.phoneNumber,
        //   }),
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log(data);
        //     if (data.message === "SUCCESS") {
        //       localStorage.setItem("doctor_id", data.id);
        //       if (data.docter) {
        //         console.log("docotr");
        //         document.location.replace("/dashboard"); // Redirect to dahboard
        //       } else {
        //         // redirect him to clicnic
        //         document.location.replace("/clinicdetails");
        //         console.log("not doc");
        //       }
        //     }
        //   });
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
