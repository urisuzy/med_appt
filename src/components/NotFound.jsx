import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page">
      <h1>Page not found</h1>
      <p className="muted">The page you were looking for does not exist.</p>
      <Link to="/" className="solid-button">
        Back to home
      </Link>
    </div>
  );
}

export default NotFound;
