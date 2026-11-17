import { useState } from "react";
import { doctors } from "../data/doctors.js";

const REVIEWS_KEY = "stayhealthy-reviews";

const readReviews = () => {
  try {
    return JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
  } catch {
    return [];
  }
};

/**
 * Review form (Task 11).
 * After a review is submitted the form is disabled, so a visitor can only post
 * one review per consultation.
 */
function GiveReviews() {
  const [form, setForm] = useState({ doctorId: "", rating: "5", comment: "" });
  const [reviews, setReviews] = useState(readReviews);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.doctorId) return;

    const doctor = doctors.find((item) => String(item.id) === String(form.doctorId));
    const next = [
      ...reviews,
      {
        id: Date.now(),
        doctorId: form.doctorId,
        doctorName: doctor?.name || "Doctor",
        rating: Number(form.rating),
        comment: form.comment.trim(),
        createdAt: new Date().toISOString(),
      },
    ];

    localStorage.setItem(REVIEWS_KEY, JSON.stringify(next));
    setReviews(next);
    setSubmitted(true);
  };

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1>Give your review</h1>
          <p className="muted">Your feedback helps other patients choose the right doctor.</p>
        </div>
      </header>

      <section className="panel review-layout">
        <form className="form-grid" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Doctor</span>
            <select
              name="doctorId"
              value={form.doctorId}
              onChange={handleChange}
              disabled={submitted}
            >
              <option value="">Select the doctor you consulted</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} — {doctor.speciality}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Rating</span>
            <select name="rating" value={form.rating} onChange={handleChange} disabled={submitted}>
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} star{value > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Review</span>
            <textarea
              name="comment"
              rows={4}
              value={form.comment}
              onChange={handleChange}
              placeholder="How was your consultation?"
              disabled={submitted}
            />
          </label>

          <button type="submit" className="solid-button wide" disabled={submitted || !form.doctorId}>
            {submitted ? "Review submitted" : "Submit review"}
          </button>

          {submitted && (
            <p className="form-hint" role="status">
              Thanks! One review per consultation has already been recorded, so the form is now
              disabled.
            </p>
          )}
        </form>

        <aside className="review-list">
          <h2>Recent reviews</h2>
          {!reviews.length && <p className="muted">No reviews yet.</p>}
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <strong>{review.doctorName}</strong>
                <span className="rating">★ {review.rating}</span>
                <p>{review.comment || "No comment."}</p>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}

export default GiveReviews;
