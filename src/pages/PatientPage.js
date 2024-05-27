import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PatientPage.css";
import PatientCard from "../components/cards/PatientCard";

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("https://bakend-hospital-management.onrender.com/patients")
      .then((response) => setPatients(response.data))
      .catch((error) => console.log("Error fetching patients:", error));
  }, []);

  const handleAddPatient = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://bakend-hospital-management.onrender.com/patients/add",
        newPatient
      )
      .then((response) => {
        console.log(response.data);
        setPatients([...patients, response.data]);
        setNewPatient({ name: "", age: "", gender: "" });
      })
      .catch((error) => console.error("Error adding patient:", error));
  };

  const handleUpdatePatient = (id, e) => {
    e.preventDefault();
    axios
      .put(
        `https://bakend-hospital-management.onrender.com/patients/update/${id}`,
        selectedPatient
      )
      .then((response) => {
        const updatePatient = {
          ...selectedPatient,
          _id: id,
        };
        console.log("update patient", updatePatient);
        setPatients(
          patients.map((patient) =>
            patient._id === id ? updatePatient : patient
          )
        );
        setSelectedPatient(null);
        setIsEditMode(false);
      })
      .catch((error) => console.log("Error updating patient:", error));
  };
  const handleDeletePatient = (id) => {
    axios
      .delete(
        `https://bakend-hospital-management.onrender.com/patients/delete/${id}`
      )
      .then((response) => {
        console.log(response.data);
        setSelectedPatient(null);
        setPatients(patients.filter((patient) => patient._id !== id));
      })
      .catch((error) => console.log("Error deleting patient:", error));
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsEditMode(true);
  };
  return (
    <div className="main-content">
      <div className="patient-main">
        <div className="form-sections">
          <h4>{isEditMode ? "Edit Patient" : "Add New Patient"}</h4>

          <form
            onSubmit={
              isEditMode
                ? (e) => handleUpdatePatient(selectedPatient._id, e)
                : handleAddPatient
            }
          >
            <label>Name:</label>
            <input
              type="text"
              value={isEditMode ? selectedPatient.name : newPatient.name}
              onChange={(e) =>
                isEditMode
                  ? setSelectedPatient({
                      ...selectedPatient,
                      name: e.target.value,
                    })
                  : setNewPatient({
                      ...newPatient,
                      name: e.target.value,
                    })
              }
            />
            <br />
            <label>Age:</label>
            <input
              type="text"
              value={isEditMode ? selectedPatient.age : newPatient.age}
              onChange={(e) =>
                isEditMode
                  ? setSelectedPatient({
                      ...selectedPatient,
                      age: e.target.value,
                    })
                  : setNewPatient({
                      ...newPatient,
                      age: e.target.value,
                    })
              }
            />
            <br />
            <label>Gender:</label>
            <input
              type="text"
              value={isEditMode ? selectedPatient.gender : newPatient.gender}
              onChange={(e) =>
                isEditMode
                  ? setSelectedPatient({
                      ...selectedPatient,
                      gender: e.target.value,
                    })
                  : setNewPatient({
                      ...newPatient,
                      gender: e.target.value,
                    })
              }
            />
            <br />
            <button type="submit">
              {isEditMode ? "Update Patient" : "Add patient"}
            </button>
          </form>
        </div>
        <div className="patients-section">
          <h3> Patients ({patients.length})</h3>

          <div className="patient-list">
            {patients.map((patient) => (
              <PatientCard
                key={patient._id}
                patient={patient}
                onEdit={handleEditPatient}
                onDelete={handleDeletePatient}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
