import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const APPOINTMENTS_KEY = "stayhealthy-appointments";

function nextAppointment() {
  try {
    const list = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || "[]");
    if (!list.length) return null;
    return [...list].sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))[0];
  } catch {
    return null;
  }
}

/**
 * Application-wide reminder. Mounted once in App.jsx so it is visible on every
 * page (Task 9) instead of being imported page by page.
 */
function Notification() {
  const [appointment, setAppointment] = useState(nextAppointment);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const refresh = () => setAppointment(nextAppointment());
    // useEffect with an empty dependency list runs once after the first
    // render, which is exactly when the reminder has to be loaded.
    refresh();
    window.addEventListener("stayhealthy:appointments", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("stayhealthy:appointments", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  if (!appointment || dismissed) return null;

  return (
    <aside className="notification" role="status">
      <span className="notification-icon" aria-hidden="true">
        ⏰
      </span>
      <p>
        Reminder: your appointment with <strong>{appointment.doctorName}</strong> is on{" "}
        <strong>{appointment.date}</strong> at <strong>{appointment.time}</strong>.
      </p>
      <Link to="/appointments" className="notification-link">
        View details
      </Link>
      <button
        type="button"
        className="notification-close"
        aria-label="Dismiss reminder"
        onClick={() => setDismissed(true)}
      >
        ×
      </button>
    </aside>
  );
}

export default Notification;
export { APPOINTMENTS_KEY };
