import { useState } from "react";
import { timeSlots } from "../data/doctors.js";

const today = () => new Date().toISOString().split("T")[0];

/**
 * Full appointment form (Task 18): Name, Phone Number, Date and Time.
 */
function AppointmentForm({ doctor, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    date: today(),
    time: timeSlots[0],
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return setError("Please enter the patient name.");
    if (!/^[0-9]{10}$/.test(form.phoneNumber.replace(/\D/g, "")))
      return setError("Please enter a 10 digit phone number.");
    if (!form.date) return setError("Please choose a date.");
    setError("");
    onSubmit?.({ ...form, doctorName: doctor?.name, speciality: doctor?.speciality });
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      <label className="field">
        <span>Name</span>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Patient name" />
      </label>

      <label className="field">
        <span>Phone Number</span>
        <input
          type="tel"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="9876543210"
        />
      </label>

      <label className="field">
        <span>Date</span>
        <input type="date" name="date" value={form.date} min={today()} onChange={handleChange} />
      </label>

      <label className="field">
        <span>Time</span>
        <select name="time" value={form.time} onChange={handleChange}>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </label>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="solid-button wide">
        Confirm appointment
      </button>
    </form>
  );
}

export default AppointmentForm;
