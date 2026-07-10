import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import { FaCalendarCheck, FaClock, FaUserMd, FaCheckCircle, FaTimesCircle, FaClock as FaClockIcon } from 'react-icons/fa';

const getMockAppointments = () => [
  {
    id: 1,
    doctorName: 'Dr. Emily Carter',
    doctorSpecialty: 'Cardiologist',
    status: 'confirmed',
    appointmentDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    appointmentTime: '10:00 AM',
    patientName: 'John Doe',
    patientEmail: 'johndoe@example.com',
    notes: 'Routine cardiovascular follow-up.'
  },
  {
    id: 2,
    doctorName: 'Dr. Michael Chen',
    doctorSpecialty: 'Neurologist',
    status: 'pending',
    appointmentDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    appointmentTime: '11:30 AM',
    patientName: 'John Doe',
    patientEmail: 'johndoe@example.com',
    notes: 'Chronic migraine consult.'
  },
  {
    id: 3,
    doctorName: 'Dr. Priya Sharma',
    doctorSpecialty: 'Gynecologist',
    status: 'completed',
    appointmentDate: new Date(Date.now() - 86400000 * 3).toISOString(),
    appointmentTime: '02:00 PM',
    patientName: 'John Doe',
    patientEmail: 'johndoe@example.com',
    notes: 'Annual health screening.'
  }
];

const Appointments = () => {
  const [appointments, setAppointments] = useState(() => {
    const local = localStorage.getItem('wn_appointments');
    return local ? JSON.parse(local) : getMockAppointments();
  });
  const [loading, setLoading] = useState(false);
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    try {
      const response = await fetch('http://localhost:8080/api/appointments/user/1', { signal: controller.signal });
      clearTimeout(timeoutId);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setAppointments(data);
          localStorage.setItem('wn_appointments', JSON.stringify(data));
        }
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#22c55e';
      case 'pending': return '#f59e0b';
      case 'completed': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <FaCheckCircle style={{ color: '#22c55e' }} />;
      case 'pending': return <FaClockIcon style={{ color: '#f59e0b' }} />;
      case 'completed': return <FaCheckCircle style={{ color: '#3b82f6' }} />;
      case 'cancelled': return <FaTimesCircle style={{ color: '#ef4444' }} />;
      default: return null;
    }
  };

  return (
    <div style={{
      paddingTop: '80px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)',
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 24px'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)',
          borderRadius: '24px',
          padding: '48px 40px',
          marginBottom: '40px',
          position: 'relative',
          overflow: 'hidden',
          color: 'white'
        }}>
          <div style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            pointerEvents: 'none'
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <FaCalendarCheck style={{ fontSize: '2.5rem', opacity: 0.9 }} />
              <h1 style={{
                fontSize: '2.8rem',
                fontWeight: '800',
                letterSpacing: '-1px',
                margin: 0,
                textShadow: '0 2px 20px rgba(0,0,0,0.1)'
              }}>
                My Appointments
              </h1>
            </div>
            <p style={{
              fontSize: '1.2rem',
              opacity: 0.9,
              margin: 0,
              fontWeight: '300'
            }}>
              View and manage your upcoming appointments
            </p>
          </div>
        </div>

        {/* Appointments List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: '#64748b' }}>Loading appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '60px 40px',
            textAlign: 'center',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: '#f1f5f9'
          }}>
            <FaCalendarCheck style={{ color: '#e2e8f0', fontSize: '4rem', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
              No Appointments Yet
            </h3>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              You haven't booked any appointments yet.
            </p>
            <a href="/book-appointment" style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: `linear-gradient(135deg, ${emerald}, #047857)`,
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontWeight: '600',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(5,150,105,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(5,150,105,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,150,105,0.3)';
            }}>
              Book an Appointment
            </a>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px'
          }}>
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  borderColor: '#f1f5f9',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(5,150,105,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#1e293b',
                      margin: 0
                    }}>
                      {appointment.doctorName}
                    </h4>
                    <p style={{
                      fontSize: '0.85rem',
                      color: emerald,
                      margin: '4px 0 0 0',
                      fontWeight: '500'
                    }}>
                      {appointment.doctorSpecialty}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: `${getStatusColor(appointment.status)}15`,
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    borderColor: `${getStatusColor(appointment.status)}30`,
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: getStatusColor(appointment.status),
                    textTransform: 'capitalize'
                  }}>
                    {getStatusIcon(appointment.status)}
                    {appointment.status || 'pending'}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap',
                  marginBottom: '12px',
                  padding: '12px 0',
                  borderTopStyle: 'solid',
                  borderTopWidth: '1px',
                  borderTopColor: '#f1f5f9',
                  borderBottomStyle: 'solid',
                  borderBottomWidth: '1px',
                  borderBottomColor: '#f1f5f9'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748b' }}>
                    <FaCalendarCheck style={{ color: emerald }} />
                    {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : ''}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748b' }}>
                    <FaClock style={{ color: emerald }} />
                    {appointment.appointmentTime}
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  <div><strong>Patient:</strong> {appointment.patientName}</div>
                  <div><strong>Email:</strong> {appointment.patientEmail}</div>
                  {appointment.notes && (
                    <div style={{ marginTop: '8px', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px', fontSize: '0.8rem' }}>
                      <strong>Notes:</strong> {appointment.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
      </div>
  );
};

export default Appointments;
