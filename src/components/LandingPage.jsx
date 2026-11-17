import { Link } from "react-router-dom";

const features = [
  {
    icon: "🩺",
    title: "Search doctors by speciality",
    text: "Find the right specialist in your city and compare experience and ratings.",
  },
  {
    icon: "🗓️",
    title: "Book in a few clicks",
    text: "Pick a date and a time slot that works for you and confirm instantly.",
  },
  {
    icon: "🏠",
    title: "Care at home",
    text: "Get medical care in the comfort of your home with our home visit service.",
  },
  {
    icon: "⭐",
    title: "Honest reviews",
    text: "Read and write reviews after every consultation so others can choose well.",
  },
];

function LandingPage() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">StayHealthy &middot; Go Digital initiative</p>
          <h1>Quality healthcare, anytime, anywhere.</h1>
          <p className="hero-text">
            Book medical appointments online with our user-friendly platform. StayHealthy connects
            patients in remote and underserved areas with trusted doctors, without the wait.
          </p>
          <div className="hero-actions">
            <Link to="/appointments" className="solid-button large">
              Book an appointment
            </Link>
            <Link to="/signup" className="ghost-button large">
              Create free account
            </Link>
          </div>
          <dl className="hero-stats">
            <div>
              <dt>1,200+</dt>
              <dd>Verified doctors</dd>
            </div>
            <div>
              <dt>48k</dt>
              <dd>Appointments booked</dd>
            </div>
            <div>
              <dt>4.8/5</dt>
              <dd>Average rating</dd>
            </div>
          </dl>
        </div>

        <div className="hero-card" aria-hidden="true">
          <div className="hero-card-head">
            <span className="dot" />
            Next available
          </div>
          <p className="hero-card-name">Dr. Aisha Verma</p>
          <p className="muted">General Physician &middot; 12 years experience</p>
          <div className="hero-slots">
            <span>09:30</span>
            <span className="active">10:00</span>
            <span>10:30</span>
            <span>11:00</span>
          </div>
          <div className="hero-card-foot">
            <span>₹400 / visit</span>
            <span className="badge">Available today</span>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Everything you need to stay healthy</h2>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <span className="feature-icon" aria-hidden="true">
                {feature.icon}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
