import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// const app = firebase.initializeApp({
//   apiKey: "AIzaSyDIpTltkKRYnnrx5z3ZQmyPXh8HKLr5WkU",
//   authDomain: "reservefree-2827c.firebaseapp.com",
//   projectId: "reservefree-2827c",
//   storageBucket: "reservefree-2827c.appspot.com",
//   messagingSenderId: "156255074174",
//   appId: "1:156255074174:web:c56ae1b294e2ff08e1652f",
// });

const app = firebase.initializeApp({
    apiKey: "AIzaSyAUtVZIizhld7K5crmNbp1Oi3-Q5mmXRBY",
    authDomain: "reservefree-patients.firebaseapp.com",
    projectId: "reservefree-patients",
    storageBucket: "reservefree-patients.appspot.com",
    messagingSenderId: "637814495794",
    appId: "1:637814495794:web:4d7c73f831cb7acc84fa2b",
    measurementId: "G-8N3P3ECH2Q"
  });

export const authentication = app.auth();
export default app;

//  Connected to sampras acoount
