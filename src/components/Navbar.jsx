import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearToken, isLoggedIn } from "../api.js";

function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  // Keep the bar in sync with the session after sign up / login / logout.
  useEffect(() => {
    const sync = () => setLoggedIn(isLoggedIn());
    window.addEventListener("storage", sync);
    window.addEventListener("stayhealthy:auth", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("stayhealthy:auth", sync);
    };
  }, []);

  /**
   * Logout clears the authentication token from the browser storage and sends
   * the visitor back to the public landing page.
   */
  const handleLogout = () => {
    clearToken();
    window.dispatchEvent(new Event("stayhealthy:auth"));
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            +
          </span>
          StayHealthy
        </Link>

        <nav className="navbar-links" aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/appointments">Appointment</NavLink>
          <NavLink to="/reviews">Reviews</NavLink>
        </nav>

        <div className="navbar-actions">
          {loggedIn ? (
            <>
              <NavLink to="/profile" className="ghost-button">
                My Profile
              </NavLink>
              <button type="button" className="solid-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signup" className="ghost-button">
                Sign Up
              </NavLink>
              <NavLink to="/login" className="solid-button">
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
