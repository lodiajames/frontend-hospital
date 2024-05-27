import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DoctorPage.css";
import DoctorCard from "../components/cards/DoctorCard";

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    speciality: "",
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("https://bakend-hospital-management.onrender.com/doctors")
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors", error));
  }, []);

  const handleAddDoctor = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://bakend-hospital-management.onrender.com/doctors/add",
        newDoctor
      )
      .then((response) => {
        console.log(response.data);
        setDoctors([...doctors, response.data]);
        setNewDoctor({
          name: "",
          speciality: "",
        });
      })
      .catch((error) => console.log("Error adding doctor:", error));
  };

  const handleUpdateDoctor = (id, e) => {
    e.preventDefault();
    axios
      .put(
        `https://bakend-hospital-management.onrender.com/doctors/update/${id}`,
        selectedDoctor
      )
      .then((response) => {
        const updateDoc = {
          ...selectedDoctor,
          _id: id,
        };
        console.log("update doc", updateDoc);
        setDoctors(
          doctors.map((doctor) => (doctor._id === id ? updateDoc : doctor))
        );
        setSelectedDoctor(null);
        setIsEditMode(false);
      })
      .catch((error) => console.log("Error updating doctor", error));
  };

  const handleDeleteDoctor = (id) => {
    axios
      .delete(
        `https://bakend-hospital-management.onrender.com/doctors/delete/${id}`
      )
      .then((response) => {
        console.log(response.data);
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
      })
      .catch((error) => console.log("Error deleting doctor:", error));
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditMode(true);
  };

  return (
    <div className="main-content">
      <div className="main-doc-container">
        <div className="form-sections">
          <h4>{isEditMode ? "Edit Doctor" : "Add new Doctor"}</h4>
          <form
            onSubmit={
              isEditMode
                ? (e) => handleUpdateDoctor(selectedDoctor._id, e)
                : handleAddDoctor
            }
          >
            <label>Name:</label>
            <input
              type="text"
              value={isEditMode ? selectedDoctor.name : newDoctor.name}
              onChange={(e) =>
                isEditMode
                  ? setSelectedDoctor({
                      ...selectedDoctor,
                      name: e.target.value,
                    })
                  : setNewDoctor({ ...newDoctor, name: e.target.value })
              }
            />
            <br />
            <label>Speciality:</label>
            <input
              type="text"
              value={
                isEditMode ? selectedDoctor.speciality : newDoctor.speciality
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedDoctor({
                      ...selectedDoctor,
                      speciality: e.target.value,
                    })
                  : setNewDoctor({ ...newDoctor, speciality: e.target.value })
              }
            />
            <br />
            <button type="submit">
              {isEditMode ? "Update Doctor" : "Add Doctor"}
            </button>
          </form>
        </div>
        <div className="doctors-section">
          <h3>Doctors ({doctors.length})</h3>
          <div className="doctor-list">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
                onEdit={handleEditDoctor}
                onDelete={handleDeleteDoctor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
