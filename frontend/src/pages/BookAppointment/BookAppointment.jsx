import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUserMd, FaEnvelope, FaPhone, FaNotesMedical } from 'react-icons/fa';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', doctor: '', date: '', time: '', notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const doctors = ['Dr. Smith (Cardiology)', 'Dr. Johnson (Dermatology)', 'Dr. Williams (Orthopedics)', 'Dr. Brown (Pediatrics)', 'Dr. Jones (General Medicine)'];

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.doctor || !formData.date || !formData.time) {
      alert('Please fill all required fields');
      return;
    }
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push({ ...formData, id: Date.now(), createdAt: new Date().toISOString() });
    localStorage.setItem('appointments', JSON.stringify(appointments));
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', doctor: '', date: '', time: '', notes: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ paddingTop: '80px', maxWidth: '800px', margin: '0 auto', padding: '80px 24px 40px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#064e3b', marginBottom: '8px' }}>Book an Appointment</h1>
      <p style={{ color: "#059669" }}>Schedule a consultation with our expert doctors.</p>

      {submitted && <div style={{ background: '#d1fae5', color: '#065f46', padding: '12px', borderRadius: '12px', marginBottom: '24px', textAlign: 'center' }}>✅ Appointment booked successfully! We'll contact you soon.</div>}

      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'grid', gap: '20px' }}>
          <div><label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Full Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1' }} /></div>
          <div><label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1' }} /></div>
          <div><label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1' }} /></div>
          <div><label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Select Doctor *</label><select name="doctor" value={formData.doctor} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
            <option value="">-- Choose a doctor --</option>
            {doctors.map(doc => <option key={doc} value={doc}>{doc}</option>)}
          </select></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Date *</label><input type="date" name="date" value={formData.date} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1' }} /></div>
            <div><label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Time *</label><input type="time" name="time" value={formData.time} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1' }} /></div>
          </div>
          <div><label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Additional Notes</label><textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1' }}></textarea></div>
          <button type="submit" style={{ background: '#059669', color: 'white', border: 'none', padding: '14px', borderRadius: '40px', fontWeight: 'bold', cursor: 'pointer' }}>Confirm Appointment</button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;

