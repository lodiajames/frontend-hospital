import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AppointmentPage from "./pages/AppointmentPage";
import PatientPage from "./pages/PatientPage";
import DoctorPage from "./pages/DoctorPage";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/patient" element={<PatientPage />} />
      <Route path="/doctor" element={<DoctorPage />} />
    </Routes>
  );
}

export default App;
