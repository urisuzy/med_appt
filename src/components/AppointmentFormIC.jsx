import { useState } from "react";

/**
 * Instant consultation form (Task 10).
 * It intentionally contains only two fields: Name and Phone Number.
 */
function AppointmentFormIC() {
  const [form, setForm] = useState({ name: "", phoneNumber: "" });
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phoneNumber.trim()) {
      setStatus("Please fill in both fields so a doctor can call you back.");
      return;
    }
    localStorage.setItem(
      "stayhealthy-instant-consultation",
      JSON.stringify({ ...form, requestedAt: new Date().toISOString() })
    );
    setStatus(`Thanks ${form.name.split(" ")[0]}, a doctor will call you on ${form.phoneNumber} shortly.`);
    setForm({ name: "", phoneNumber: "" });
  };

  return (
    <form className="instant-form" onSubmit={handleSubmit} noValidate>
      <label className="field">
        <span>Name</span>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
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

      <button type="submit" className="solid-button">
        Request a call
      </button>

      {status && (
        <p className="form-hint" role="status">
          {status}
        </p>
      )}
    </form>
  );
}

export default AppointmentFormIC;
