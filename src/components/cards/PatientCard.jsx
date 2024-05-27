import React from "react";
import "./PatientCard.css";

const PatientCard = ({ patient, onEdit, onDelete }) => {
  return (
    <div className="patient-card">
      <h4>{patient.name}</h4>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>
      <div className="btn-container">
        <button onClick={() => onEdit(patient)}>Edit</button>
        <button onClick={() => onDelete(patient._id)}>Delete</button>
      </div>
    </div>
  );
};

export default PatientCard;
