import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, isNetworkError, localRegister, setToken } from "../api.js";

const initialState = {
  role: "patient",
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

function Sign_Up() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email address.";
    if (!/^[0-9]{10}$/.test(form.phone.replace(/\D/g, ""))) return "Please enter a 10 digit phone number.";
    if (form.password.length < 6) return "The password must be at least 6 characters long.";
    if (form.password !== form.confirmPassword) return "The two passwords do not match.";
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const message = validate();
    if (message) {
      setError(message);
      return;
    }

    setBusy(true);
    const payload = {
      role: form.role,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
    };

    try {
      // Registration API request (Task 5)
      const response = await api.post("/api/auth/register", payload);
      const token = response.data?.token || response.data?.authToken;
      if (token) {
        setToken(token);
        window.dispatchEvent(new Event("stayhealthy:auth"));
      }
      navigate("/login");
    } catch (err) {
      if (isNetworkError(err)) {
        // Demo/offline mode: keep the account in the browser so the flow works.
        try {
          localRegister(payload);
          window.dispatchEvent(new Event("stayhealthy:auth"));
          navigate("/profile");
        } catch (localErr) {
          setError(localErr.message);
        }
      } else {
        setError(err.response?.data?.message || "We could not create your account. Please try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Create your StayHealthy account</h1>
        <p className="muted">Book appointments, keep your records and consult doctors online.</p>

        <form className="form-grid" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Role</span>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </label>

          <label className="field">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Reza Maulana"
              autoComplete="name"
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label className="field">
            <span>Phone Number</span>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              autoComplete="tel"
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              autoComplete="new-password"
            />
          </label>

          <label className="field">
            <span>Confirm Password</span>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              autoComplete="new-password"
            />
          </label>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="solid-button wide" disabled={busy}>
            {busy ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="muted center">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Sign_Up;
