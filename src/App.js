import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
// Importing components
import DoctorDetails from "./components/DoctorDetails/DoctorDetails";
import DoctorListScreen from "./components/DoctorListScreen/DoctorListScreen";
import HomePage from "./components/HomePage/HomePage";
import UserLogin from "./components/DoctorDetails/UserLogin";
import PatientDetails from "./components/PatientDetails/PatientDetails";
import AboutPatients from "./components/AboutPatients/AboutPatients";
import Logout from "./components/Logout";
import MyAppointment from "./components/AppoinmentList/MyAppointments";
import Navbar from "./components/Navbar/Navbar";
import VideoConsultation from "./components/VideoConsultation/VideoConsultation";
import ChatScreen from "./components/VideoConsultation/ChatScreen";
import { useLocation } from "react-router-dom";
import Login from "./components/DoctorDetails/Login";
import PrivateRoute from "./components/context/PrivateRoute";
function App() {
  let location = useLocation();
  // console.log(location);
  return (
    <AuthProvider>
      {location.pathname === "/chat" ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route exact path="doctors/:text" element={<DoctorListScreen />} />
        <Route exact path="doctors" element={<DoctorListScreen />} />
        <Route exact path="detail/:id" element={<DoctorDetails />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/patientdetails"
          element={
            <PrivateRoute>
              <PatientDetails />
            </PrivateRoute>
          }
        />
        <Route exact path="confirmdetails" element={<AboutPatients />} />
        <Route exact path="appointmentlist" element={<MyAppointment />} />
        <Route exact path="logout" element={<Logout />} />
        <Route
          path="videoconsultation"
          element={
            <PrivateRoute>
              <VideoConsultation />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="chat"
          element={
            <PrivateRoute>
              <ChatScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
