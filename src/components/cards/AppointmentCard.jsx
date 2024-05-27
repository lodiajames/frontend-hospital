import React from "react";
import "./AppointmentCard.css";

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  return (
    <div className="appointment-card">
      <p>
        <span className="label">Patient:</span> {appointment.patientName}
      </p>
      <p>
        <span className="label">Doctor:</span> {appointment.doctorName}
      </p>
      <p>
        <span className="label">Date:</span>{" "}
        {new Date(appointment.date).toLocaleDateString()}
      </p>
      <div className="btn-container">
        <button className="edit-btn" onClick={() => onEdit(appointment)}>
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(appointment._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
