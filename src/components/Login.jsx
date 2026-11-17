import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, isNetworkError, localLogin, setToken } from "../api.js";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);

    try {
      // Authentication API request (Task 6)
      const response = await api.post("/api/auth/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      const token = response.data?.token || response.data?.authToken;
      if (token) setToken(token);
      window.dispatchEvent(new Event("stayhealthy:auth"));
      navigate("/appointments");
    } catch (err) {
      if (isNetworkError(err)) {
        try {
          localLogin({ email: form.email.trim().toLowerCase(), password: form.password });
          window.dispatchEvent(new Event("stayhealthy:auth"));
          navigate("/appointments");
        } catch (localErr) {
          setError(localErr.message);
        }
      } else {
        setError(err.response?.data?.message || "Invalid email or password.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card narrow">
        <h1>Login</h1>
        <p className="muted">Welcome back. Sign in to manage your appointments.</p>

        <form className="form-grid" onSubmit={handleSubmit} noValidate>
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
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="solid-button wide" disabled={busy}>
            {busy ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="muted center">
          New to StayHealthy? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
