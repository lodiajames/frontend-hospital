import React from "react";
import "./DoctorCard.css";
const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  return (
    <div className="doctor-card">
      <p>
        {doctor.name} - {doctor.speciality}
      </p>
      <div className="btn-container">
        <button className="edit-button" onClick={() => onEdit(doctor)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(doctor._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
