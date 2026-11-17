import ProfileCard from "./ProfileCard.jsx";

function Profile() {
  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1>My profile</h1>
          <p className="muted">Keep your contact details up to date so doctors can reach you.</p>
        </div>
      </header>
      <ProfileCard />
    </div>
  );
}

export default Profile;
