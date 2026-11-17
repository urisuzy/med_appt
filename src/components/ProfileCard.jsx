import { useState } from "react";
import { getProfile, saveProfile } from "../api.js";

const fallbackProfile = {
  name: "Reza Maulana Alfitra",
  email: "reza@example.com",
  phone: "9876543210",
};

/**
 * Profile card (Task 12): read-only summary plus the edit form used to update
 * the name and phone number.
 */
function ProfileCard({ profile: initialProfile }) {
  const [profile, setProfile] = useState(initialProfile || getProfile() || fallbackProfile);
  const [draft, setDraft] = useState(profile);
  const [editing, setEditing] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    setProfile(draft);
    saveProfile(draft);
    setEditing(false);
  };

  return (
    <section className="profile-card">
      <header className="profile-head">
        <span className="avatar large" aria-hidden="true">
          {(profile.name || "?").slice(0, 1)}
        </span>
        <div>
          <h2>{profile.name}</h2>
          <p className="muted">{profile.email}</p>
          <p className="muted">{profile.phone}</p>
        </div>
        {!editing && (
          <button type="button" className="ghost-button" onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
      </header>

      {editing ? (
        <form className="form-grid" onSubmit={handleSave} noValidate>
          <label className="field">
            <span>Name</span>
            <input type="text" name="name" value={draft.name} onChange={handleChange} />
          </label>
          <label className="field">
            <span>Phone Number</span>
            <input type="tel" name="phone" value={draft.phone} onChange={handleChange} />
          </label>
          <div className="form-actions">
            <button type="submit" className="solid-button">
              Save
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() => {
                setDraft(profile);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <dl className="profile-meta">
          <div>
            <dt>Name</dt>
            <dd>{profile.name}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{profile.email}</dd>
          </div>
          <div>
            <dt>Phone Number</dt>
            <dd>{profile.phone}</dd>
          </div>
        </dl>
      )}
    </section>
  );
}

export default ProfileCard;
