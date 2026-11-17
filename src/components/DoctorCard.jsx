import { useEffect, useState } from "react";
import { doctors } from "../data/doctors.js";

const APPOINTMENTS_KEY = "stayhealthy-appointments";

const initials = (name) =>
  name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

/** Read the appointments currently stored in the browser. */
const readAppointments = () => {
  try {
    return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || "[]");
  } catch {
    return [];
  }
};

const findAppointment = (doctorId) =>
  readAppointments().find((item) => String(item.doctorId) === String(doctorId)) || null;

/**
 * Doctor card used inside the booking grid (Task 19).
 *
 * The card owns the appointment state for its doctor: it reads the stored
 * appointment on mount, and cancelling removes the record from localStorage
 * and re-renders the card so the "Book appointment" action comes back.
 */
function DoctorCard({ doctor = doctors[0], appointment: incoming = null, onBook, onCancel }) {
  const [appointment, setAppointment] = useState(() => incoming || findAppointment(doctor.id));

  // Keep the card in sync when the parent reloads the appointment list.
  useEffect(() => {
    setAppointment(incoming || findAppointment(doctor.id));
  }, [incoming, doctor.id]);

  const cancelAppointment = () => {
    const remaining = readAppointments().filter(
      (item) => String(item.doctorId) !== String(doctor.id)
    );
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(remaining));
    setAppointment(null);
    window.dispatchEvent(new Event("stayhealthy:appointments"));
    onCancel?.();
  };

  return (
    <article className="doctor-card">
      <header className="doctor-card-head">
        <span className="avatar" aria-hidden="true">
          {initials(doctor.name)}
        </span>
        <div>
          <h3>{doctor.name}</h3>
          <p className="muted">{doctor.speciality}</p>
        </div>
        <span className="rating">★ {doctor.rating}</span>
      </header>

      <ul className="doctor-meta">
        <li>{doctor.experience} years experience</li>
        <li>{doctor.location}</li>
        <li>₹{doctor.fee} per visit</li>
      </ul>

      {appointment ? (
        <div className="booked-box">
          <p>
            <strong>Booked</strong> for {appointment.date} at {appointment.time}
          </p>
          <button type="button" className="danger-button" onClick={cancelAppointment}>
            Cancel appointment
          </button>
        </div>
      ) : (
        <button type="button" className="solid-button" onClick={onBook}>
          Book appointment
        </button>
      )}
    </article>
  );
}

export default DoctorCard;
export { APPOINTMENTS_KEY };
