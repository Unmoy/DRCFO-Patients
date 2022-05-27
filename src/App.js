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

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route exact path="doctors" element={<DoctorListScreen />} />
        <Route exact path="detail/:id" element={<DoctorDetails />} />
        <Route exact path="login" element={<UserLogin />} />
        <Route exact path="patientdetails" element={<PatientDetails />} />
        <Route exact path="confirmdetails" element={<AboutPatients />} />
        <Route exact path="appointmentlist" element={<MyAppointment />} />
        <Route exact path="logout" element={<Logout />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
