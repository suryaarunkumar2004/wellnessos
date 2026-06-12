import React from "react";
import { Link } from "react-router-dom";
import './Doctors.css';

// Sample doctor data
const doctors = [
  {
    id: 1,
    name: "Dr. Emily Carter",
    specialty: "Cardiology",
    avatar: null,
    description: "Expert in heart health and preventive cardiology.",
  },
  {
    id: 2,
    name: "Dr. Raj Patel",
    specialty: "Nutrition",
    avatar: null,
    description: "Specialist in diet planning and metabolic health.",
  },
  {
    id: 3,
    name: "Dr. Maya Lee",
    specialty: "Physical Therapy",
    avatar: null,
    description: "Focuses on rehabilitation and mobility improvement.",
  },
];

export default function Doctors() {
  return (
    <section className="doctors-page">
      <div className="container">
        <h2 className="doctors-page__title">Our Doctors</h2>
        <div className="doctors-grid">
          {doctors.map((doc) => (
            <div key={doc.id} className="doctor-card">
              <div className="doctor-avatar">{doc.name.charAt(0)}</div>
              <h3 className="doctor-name">{doc.name}</h3>
              <p className="doctor-specialty">{doc.specialty}</p>
              <p className="doctor-description">{doc.description}</p>
              <Link to="#" className="doctor-link btn btn-primary">Book Appointment</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

