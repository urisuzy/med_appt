import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctors, specialities } from "../data/doctors.js";

/**
 * Doctor search used by the Appointment Booking page (Task 8).
 * The selected speciality and location are written to the URL query string so
 * the result page can read them back with useSearchParams.
 */
function FindDoctorSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [location, setLocation] = useState("");

  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return specialities.filter((item) => item.toLowerCase().includes(term)).slice(0, 5);
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const chosen = speciality || query;
    if (chosen) params.set("speciality", chosen);
    if (location) params.set("location", location);
    navigate(`/appointments?${params.toString()}`);
  };

  return (
    <form className="search-panel" onSubmit={handleSubmit}>
      <div className="search-field">
        <label htmlFor="speciality">Search by speciality</label>
        <input
          id="speciality"
          list="speciality-options"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cardiologist, Dermatologist..."
          autoComplete="off"
        />
        <datalist id="speciality-options">
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.speciality} />
          ))}
        </datalist>
        {!!suggestions.length && (
          <ul className="suggestions">
            {suggestions.map((item) => (
              <li key={item}>
                <button type="button" onClick={() => setQuery(item)}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="search-field">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Bengaluru"
        />
      </div>

      <button type="submit" className="solid-button">
        Search
      </button>

      <select
        className="visually-hidden"
        aria-hidden="true"
        tabIndex={-1}
        value={speciality}
        onChange={(event) => setSpeciality(event.target.value)}
      >
        <option value="">Any speciality</option>
        {specialities.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </form>
  );
}

export default FindDoctorSearch;
