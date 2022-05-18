import { Routes, Route } from "react-router-dom";

// Importing components
import DoctorDetails from "./components/DoctorDetails/DoctorDetails";
import DoctorListScreen from "./components/DoctorListScreen/DoctorListScreen";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route exact path="doctors" element={<DoctorListScreen />} />
      <Route exact path="detail/:id" element={<DoctorDetails />} />
    </Routes>
  );
}

export default App;
