import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Notification from "./components/Notification.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Sign_Up from "./components/Sign_Up.jsx";
import Login from "./components/Login.jsx";
import Appointments from "./components/Appointments.jsx";
import Profile from "./components/Profile.jsx";
import GiveReviews from "./components/GiveReviews.jsx";
import NotFound from "./components/NotFound.jsx";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      {/*
        The Notification component sits outside <Routes> on purpose: it is
        mounted once for the whole application so the reminder about the next
        appointment stays visible on every page (Task 9).
      */}
      <Notification />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/signup" element={<Sign_Up />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reviews" element={<GiveReviews />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>StayHealthy &middot; Quality healthcare, anytime, anywhere.</p>
        <p className="muted">A non-profit initiative for remote and underserved communities.</p>
      </footer>
    </div>
  );
}

export default App;
