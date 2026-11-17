import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { doctors as allDoctors } from "../data/doctors.js";
import FindDoctorSearch from "./FindDoctorSearch.jsx";
import DoctorCard from "./DoctorCard.jsx";
import AppointmentForm from "./AppointmentForm.jsx";
import AppointmentFormIC from "./AppointmentFormIC.jsx";
import { APPOINTMENTS_KEY } from "./Notification.jsx";

const readAppointments = () => {
  try {
    return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || "[]");
  } catch {
    return [];
  }
};

function Appointments() {
  const [searchParams] = useSearchParams();
  const [appointments, setAppointments] = useState(readAppointments);
  const [selected, setSelected] = useState(null);

  const speciality = searchParams.get("speciality") || "";
  const location = searchParams.get("location") || "";

  const filtered = useMemo(() => {
    return allDoctors.filter((doctor) => {
      const bySpeciality = speciality
        ? doctor.speciality.toLowerCase() === speciality.toLowerCase()
        : true;
      const byLocation = location
        ? doctor.location.toLowerCase().includes(location.toLowerCase())
        : true;
      return bySpeciality && byLocation;
    });
  }, [speciality, location]);

  const persist = (next) => {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(next));
    setAppointments(next);
    window.dispatchEvent(new Event("stayhealthy:appointments"));
  };

  const bookAppointment = (payload) => {
    const next = [...appointments, { ...payload, id: Date.now() }];
    persist(next);
    setSelected(null);
  };

  const cancelAppointment = (appointmentId) => {
    persist(appointments.filter((item) => item.id !== appointmentId));
  };

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1>Appointment booking</h1>
          <p className="muted">
            Search by speciality and location, then book a slot with the doctor you trust.
          </p>
        </div>
      </header>

      <section className="panel">
        <div className="panel-head">
          <h2>Instant consultation</h2>
          <p className="muted">Leave your name and phone number and a doctor will call you back.</p>
        </div>
        <AppointmentFormIC />
      </section>

      <FindDoctorSearch />

      <section className="doctor-grid">
        {filtered.map((doctor) => {
          const booked = appointments.find((item) => item.doctorId === doctor.id);
          return (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              appointment={booked}
              onBook={() => setSelected(doctor)}
              onCancel={() => booked && cancelAppointment(booked.id)}
            />
          );
        })}
        {!filtered.length && (
          <p className="empty-state">No doctors match that speciality and location yet.</p>
        )}
      </section>

      {selected && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="modal-head">
              <h2>Book with {selected.name}</h2>
              <button
                type="button"
                className="notification-close"
                aria-label="Close"
                onClick={() => setSelected(null)}
              >
                ×
              </button>
            </div>
            <AppointmentForm
              doctor={selected}
              onSubmit={(payload) =>
                bookAppointment({
                  ...payload,
                  doctorId: selected.id,
                  doctorName: selected.name,
                  speciality: selected.speciality,
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
