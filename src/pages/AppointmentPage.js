import React, { useEffect, useState } from "react";
import AppointmentCard from "../components/cards/AppointmentCard";
import axios from "axios";
import "./AppointmentPage.css";

//format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};
const AppointmentPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorName: "",
    date: "",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("https://bakend-hospital-management.onrender.com/appointments")
      .then((response) => setAppointments(response.data))
      .catch((error) => console.log("Error fetching appointment", error));
  }, []);

  useEffect(() => {
    try {
      axios
        .get("https://bakend-hospital-management.onrender.com/doctors")
        .then((response) => setDoctors(response.data));
    } catch (error) {
      console.log("Error fetching doctors", error);
    }
  }, [doctors]);

  const handleAddAppointment = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://bakend-hospital-management.onrender.com/appointments/add",
        newAppointment
      )
      .then((response) => {
        console.log(response.data);
        setAppointments([...appointments, response.data]);
        setNewAppointment({
          patientName: "",
          doctorName: "",
          date: "",
        });
      })
      .catch((error) => console.log("Error adding appointment"));
  };

  const handleUpdateAppointment = (id, e) => {
    e.preventDefault();
    axios
      .put(
        `https://bakend-hospital-management.onrender.com/appointments/update/${id}`,
        selectedAppointment
      )
      .then((response) => {
        console.log(response.data);
        const updateApp = {
          ...selectedAppointment,
          _id: id,
        };
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === id ? updateApp : appointment
          )
        );
        setSelectedAppointment(null);
        setIsEditMode(false);
      })
      .catch((error) => console.log("Error updating appointment:", error));
  };

  const handleDeleteAppointment = (id) => {
    axios
      .delete(
        `https://bakend-hospital-management.onrender.com/appointments/delete/${id}`
      )
      .then((response) => {
        console.log(response.data);
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
      })
      .catch((error) => console.log("Error deleting appointment:", error));
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment({
      ...appointment,
      date: formatDate(appointment.date),
    });
    setIsEditMode(true);
  };

  return (
    <div className="main-content">
      <div className="appointment-page ">
        <div className="add-form">
          <h4>{isEditMode ? "Edit Appointment" : "Add New Appointment"}</h4>
          <form
            className="appointment-form"
            onSubmit={
              isEditMode
                ? (e) => handleUpdateAppointment(selectedAppointment._id, e)
                : handleAddAppointment
            }
          >
            <label>Patient Name:</label>
            <input
              type="text"
              value={
                isEditMode
                  ? selectedAppointment.patientName
                  : newAppointment.patientName
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      patientName: e.target.value,
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      patientName: e.target.value,
                    })
              }
            />
            <label>Doctor Name:</label>
            <select
              value={
                isEditMode
                  ? selectedAppointment.doctorName
                  : newAppointment.doctorName
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      doctorName: e.target.value,
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      doctorName: e.target.value,
                    })
              }
            >
              <option value="" disabled>
                Select a doctor
              </option>
              {doctors?.map((doctor) => (
                <option key={doctor._id} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>

            <label>Date:</label>
            <input
              type="date"
              value={
                isEditMode ? selectedAppointment.date : newAppointment.date
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      date: e.target.value,
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      date: e.target.value,
                    })
              }
            />
            <button type="submit">
              {isEditMode ? "Update Appointment" : "Add Appointment"}
            </button>
          </form>
        </div>

        <div className="appointment-list">
          <h3>Appointments ({appointments.length})</h3>

          <div className="appointments">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onEdit={handleEditAppointment}
                onDelete={handleDeleteAppointment}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
