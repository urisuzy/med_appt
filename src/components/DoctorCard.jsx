import { doctors } from "../data/doctors.js";

const initials = (name) =>
  name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

/**
 * Doctor card used inside the booking grid (Task 19).
 * When the visitor already booked this doctor the card switches to the
 * appointment summary and exposes the cancel action, which deletes the
 * appointment from the browser storage and from the parent state.
 */
function DoctorCard({ doctor = doctors[0], appointment = null, onBook, onCancel }) {
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
          <button type="button" className="danger-button" onClick={onCancel}>
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
