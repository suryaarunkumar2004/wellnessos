import React, { useEffect, useState } from 'react';
import { usePrescription } from '../../contexts/PrescriptionContext';
import { Link } from 'react-router-dom';
import { Pill, Plus } from 'lucide-react';

export default function Prescription() {
  const { prescriptions, pendingCount, addPrescription } = usePrescription();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patient: '', medication: '', dosage: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addPrescription({ ...form, fulfilled: false });
    setForm({ patient: '', medication: '', dosage: '' });
    setShowForm(false);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Prescriptions</h1>
      <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
        <Plus size={16} /> New Prescription
      </button>
      {showForm && (
        <form className="card glass-card" onSubmit={handleSubmit}>
          <h2>New Prescription</h2>
          <input
            type="text"
            placeholder="Patient Name"
            value={form.patient}
            onChange={(e) => setForm({ ...form, patient: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Medication"
            value={form.medication}
            onChange={(e) => setForm({ ...form, medication: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Dosage"
            value={form.dosage}
            onChange={(e) => setForm({ ...form, dosage: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </form>
      )}
      <div className="prescription-list">
        {prescriptions.map((p) => (
          <Link
            key={p.id}
            to={`/prescription/${p.id}`}
            className="card glass-card prescription-card"
          >
            <Pill size={20} /> {p.patient} – {p.medication} ({p.dosage})
            {p.fulfilled ? <span className="badge badge-success">Done</span> : <span className="badge badge-warning">Pending</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

