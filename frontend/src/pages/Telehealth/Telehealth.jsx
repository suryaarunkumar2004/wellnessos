import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaVideo, FaUserMd, FaStar, FaClock, FaCheckCircle,
  FaShieldAlt, FaLock, FaArrowRight, FaArrowLeft, FaSearch, FaFilter,
  FaHeartbeat, FaCalendarAlt, FaPhoneAlt, FaMapMarkerAlt,
  FaRegClock, FaChevronRight, FaBolt, FaGlobe,
  FaRegHeart, FaHeart, FaBookmark, FaRegBookmark
} from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CustomDropdown from '../../components/CustomDropdown';
import EmeraldDatePicker from '../../components/EmeraldDatePicker';
import { useToast } from '../../contexts/ToastContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useBookmarks } from '../../contexts/BookmarksContext';

const ALL_DOCTORS = [
  { id: 1, name: 'Dr. Emily Carter', specialty: 'Cardiology', rating: 4.9, experience: 12, location: 'New York, NY', bio: 'Expert in heart health, cardiovascular diseases, and preventive cardiology.', image: 'https://randomuser.me/api/portraits/women/1.jpg', phone: '+1 (555) 101-0001', available: true },
  { id: 2, name: 'Dr. James Wilson', specialty: 'Cardiology', rating: 4.8, experience: 15, location: 'Los Angeles, CA', bio: 'Specializes in interventional cardiology and heart failure management.', image: 'https://randomuser.me/api/portraits/men/26.jpg', phone: '+1 (555) 101-0002', available: true },
  { id: 3, name: 'Dr. Michael Roberts', specialty: 'Cardiology', rating: 4.7, experience: 10, location: 'Chicago, IL', bio: 'Expert in electrophysiology and cardiac arrhythmia treatment.', image: 'https://randomuser.me/api/portraits/men/27.jpg', phone: '+1 (555) 101-0003', available: true },
  { id: 4, name: 'Dr. Sarah Mitchell', specialty: 'Cardiology', rating: 4.8, experience: 14, location: 'Houston, TX', bio: 'Specializes in pediatric cardiology and congenital heart defects.', image: 'https://randomuser.me/api/portraits/women/2.jpg', phone: '+1 (555) 101-0004', available: true },
  { id: 5, name: 'Dr. David Chen', specialty: 'Cardiology', rating: 4.6, experience: 18, location: 'San Francisco, CA', bio: 'Expert in cardiac imaging and non-invasive cardiology.', image: 'https://randomuser.me/api/portraits/men/28.jpg', phone: '+1 (555) 101-0005', available: true },
  { id: 6, name: 'Dr. Raj Patel', specialty: 'Nutrition & Dietetics', rating: 4.8, experience: 8, location: 'Chicago, IL', bio: 'Specialist in customized diet planning, weight management, and metabolic health.', image: 'https://randomuser.me/api/portraits/men/29.jpg', phone: '+1 (555) 102-0001', available: true },
  { id: 7, name: 'Dr. Sarah Johnson', specialty: 'Nutrition & Dietetics', rating: 4.9, experience: 10, location: 'Houston, TX', bio: 'Expert in clinical nutrition, sports nutrition, and wellness coaching.', image: 'https://randomuser.me/api/portraits/women/3.jpg', phone: '+1 (555) 102-0002', available: true },
  { id: 8, name: 'Dr. Lisa Park', specialty: 'Nutrition & Dietetics', rating: 4.7, experience: 6, location: 'Boston, MA', bio: 'Specializes in plant-based nutrition and gut health optimization.', image: 'https://randomuser.me/api/portraits/women/4.jpg', phone: '+1 (555) 102-0003', available: true },
  { id: 9, name: 'Dr. James Anderson', specialty: 'Nutrition & Dietetics', rating: 4.6, experience: 12, location: 'Denver, CO', bio: 'Expert in weight management, bariatric nutrition, and metabolic disorders.', image: 'https://randomuser.me/api/portraits/men/30.jpg', phone: '+1 (555) 102-0004', available: true },
  { id: 10, name: 'Dr. Maya Lee', specialty: 'Physical Therapy', rating: 4.9, experience: 10, location: 'San Francisco, CA', bio: 'Expert in physical rehabilitation, sports injury recovery, and pain management.', image: 'https://randomuser.me/api/portraits/women/5.jpg', phone: '+1 (555) 103-0001', available: true },
  { id: 11, name: 'Dr. Kevin Brown', specialty: 'Physical Therapy', rating: 4.7, experience: 14, location: 'Seattle, WA', bio: 'Specializes in neurological rehabilitation and stroke recovery.', image: 'https://randomuser.me/api/portraits/men/31.jpg', phone: '+1 (555) 103-0002', available: true },
  { id: 12, name: 'Dr. Amanda Green', specialty: 'Physical Therapy', rating: 4.8, experience: 9, location: 'Austin, TX', bio: 'Expert in orthopedic rehabilitation and post-surgical recovery.', image: 'https://randomuser.me/api/portraits/women/6.jpg', phone: '+1 (555) 103-0003', available: true },
  { id: 13, name: 'Dr. Arthur Pendelton', specialty: 'General Medicine', rating: 4.7, experience: 15, location: 'Boston, MA', bio: 'Comprehensive primary care with expertise in preventive medicine.', image: 'https://randomuser.me/api/portraits/men/32.jpg', phone: '+1 (555) 104-0001', available: true },
  { id: 14, name: 'Dr. Rachel Adams', specialty: 'General Medicine', rating: 4.8, experience: 11, location: 'Philadelphia, PA', bio: 'Expert in geriatric medicine and elderly care management.', image: 'https://randomuser.me/api/portraits/women/7.jpg', phone: '+1 (555) 104-0002', available: true },
  { id: 15, name: 'Dr. Thomas Wright', specialty: 'General Medicine', rating: 4.6, experience: 20, location: 'Phoenix, AZ', bio: 'Specializes in internal medicine and complex medical conditions.', image: 'https://randomuser.me/api/portraits/men/33.jpg', phone: '+1 (555) 104-0003', available: true },
  { id: 16, name: 'Dr. Laura Martinez', specialty: 'General Medicine', rating: 4.7, experience: 13, location: 'Miami, FL', bio: 'Expert in women\'s health and preventive care.', image: 'https://randomuser.me/api/portraits/women/8.jpg', phone: '+1 (555) 104-0004', available: true },
  { id: 17, name: 'Dr. Michael Chen', specialty: 'Neurology', rating: 4.8, experience: 14, location: 'Denver, CO', bio: 'Specialist in brain disorders, stroke management, and neurodegenerative diseases.', image: 'https://randomuser.me/api/portraits/men/34.jpg', phone: '+1 (555) 105-0001', available: true },
  { id: 18, name: 'Dr. Jessica Park', specialty: 'Neurology', rating: 4.9, experience: 12, location: 'Portland, OR', bio: 'Expert in multiple sclerosis, epilepsy, and cognitive disorders.', image: 'https://randomuser.me/api/portraits/women/9.jpg', phone: '+1 (555) 105-0002', available: true },
  { id: 19, name: 'Dr. Robert Kim', specialty: 'Neurology', rating: 4.6, experience: 16, location: 'Atlanta, GA', bio: 'Specializes in movement disorders and Parkinson\'s disease.', image: 'https://randomuser.me/api/portraits/men/35.jpg', phone: '+1 (555) 105-0003', available: true },
  { id: 20, name: 'Dr. Priya Sharma', specialty: 'Gynecology', rating: 4.9, experience: 13, location: 'Austin, TX', bio: 'Women\'s health expert specializing in reproductive health and obstetrics.', image: 'https://randomuser.me/api/portraits/women/10.jpg', phone: '+1 (555) 106-0001', available: true },
  { id: 21, name: 'Dr. Elizabeth White', specialty: 'Gynecology', rating: 4.8, experience: 11, location: 'Nashville, TN', bio: 'Specializes in minimally invasive gynecological surgery and fertility.', image: 'https://randomuser.me/api/portraits/women/11.jpg', phone: '+1 (555) 106-0002', available: true },
  { id: 22, name: 'Dr. Maria Garcia', specialty: 'Gynecology', rating: 4.7, experience: 15, location: 'Dallas, TX', bio: 'Expert in high-risk obstetrics and maternal-fetal medicine.', image: 'https://randomuser.me/api/portraits/women/12.jpg', phone: '+1 (555) 106-0003', available: true },
  { id: 23, name: 'Dr. Lisa Martinez', specialty: 'Dermatology', rating: 4.8, experience: 9, location: 'Miami, FL', bio: 'Specialist in skin cancer treatment and cosmetic procedures.', image: 'https://randomuser.me/api/portraits/women/13.jpg', phone: '+1 (555) 107-0001', available: true },
  { id: 24, name: 'Dr. James Taylor', specialty: 'Dermatology', rating: 4.6, experience: 14, location: 'San Diego, CA', bio: 'Expert in medical dermatology, psoriasis, and eczema treatment.', image: 'https://randomuser.me/api/portraits/men/36.jpg', phone: '+1 (555) 107-0002', available: true },
  { id: 25, name: 'Dr. Katherine Wright', specialty: 'Dermatology', rating: 4.7, experience: 11, location: 'Tampa, FL', bio: 'Specializes in aesthetic dermatology and anti-aging treatments.', image: 'https://randomuser.me/api/portraits/women/14.jpg', phone: '+1 (555) 107-0003', available: true },
  { id: 26, name: 'Dr. David Kim', specialty: 'Orthopedics', rating: 4.7, experience: 12, location: 'Portland, OR', bio: 'Specializes in joint replacement, sports medicine, and musculoskeletal disorders.', image: 'https://randomuser.me/api/portraits/men/37.jpg', phone: '+1 (555) 108-0001', available: true },
  { id: 27, name: 'Dr. Brian Thompson', specialty: 'Orthopedics', rating: 4.6, experience: 17, location: 'Salt Lake City, UT', bio: 'Expert in orthopedic trauma and fracture management.', image: 'https://randomuser.me/api/portraits/men/38.jpg', phone: '+1 (555) 108-0002', available: true },
  { id: 28, name: 'Dr. Jennifer Davis', specialty: 'Orthopedics', rating: 4.8, experience: 10, location: 'Charlotte, NC', bio: 'Specializes in pediatric orthopedics and scoliosis treatment.', image: 'https://randomuser.me/api/portraits/women/15.jpg', phone: '+1 (555) 108-0003', available: true },
  { id: 29, name: 'Dr. Mark Wilson', specialty: 'Orthopedics', rating: 4.5, experience: 20, location: 'Las Vegas, NV', bio: 'Expert in spine surgery and degenerative disc disease.', image: 'https://randomuser.me/api/portraits/men/39.jpg', phone: '+1 (555) 108-0004', available: true },
  { id: 30, name: 'Dr. Maria Garcia', specialty: 'Endocrinology', rating: 4.8, experience: 11, location: 'Phoenix, AZ', bio: 'Specialist in diabetes, thyroid disorders, and hormonal imbalances.', image: 'https://randomuser.me/api/portraits/women/16.jpg', phone: '+1 (555) 109-0001', available: true },
  { id: 31, name: 'Dr. John Miller', specialty: 'Endocrinology', rating: 4.7, experience: 14, location: 'Baltimore, MD', bio: 'Expert in metabolic disorders and pituitary gland disorders.', image: 'https://randomuser.me/api/portraits/men/40.jpg', phone: '+1 (555) 109-0002', available: true },
  { id: 32, name: 'Dr. Robert Taylor', specialty: 'Rheumatology', rating: 4.7, experience: 14, location: 'Philadelphia, PA', bio: 'Expert in autoimmune diseases, arthritis, and musculoskeletal disorders.', image: 'https://randomuser.me/api/portraits/men/41.jpg', phone: '+1 (555) 110-0001', available: true },
  { id: 33, name: 'Dr. Angela Clark', specialty: 'Rheumatology', rating: 4.8, experience: 10, location: 'Minneapolis, MN', bio: 'Specializes in lupus, rheumatoid arthritis, and inflammatory disorders.', image: 'https://randomuser.me/api/portraits/women/17.jpg', phone: '+1 (555) 110-0002', available: true },
  { id: 34, name: 'Dr. Amanda White', specialty: 'Psychiatry', rating: 4.9, experience: 10, location: 'San Diego, CA', bio: 'Specialist in mental health, anxiety disorders, and depression management.', image: 'https://randomuser.me/api/portraits/women/18.jpg', phone: '+1 (555) 111-0001', available: true },
  { id: 35, name: 'Dr. Daniel Lee', specialty: 'Psychiatry', rating: 4.7, experience: 12, location: 'St. Louis, MO', bio: 'Expert in PTSD, trauma therapy, and addiction psychiatry.', image: 'https://randomuser.me/api/portraits/men/42.jpg', phone: '+1 (555) 111-0002', available: true },
  { id: 36, name: 'Dr. Karen Scott', specialty: 'Psychiatry', rating: 4.8, experience: 14, location: 'Cleveland, OH', bio: 'Specializes in child and adolescent psychiatry.', image: 'https://randomuser.me/api/portraits/women/19.jpg', phone: '+1 (555) 111-0003', available: true },
  { id: 37, name: 'Dr. Thomas Brown', specialty: 'Urology', rating: 4.6, experience: 18, location: 'Detroit, MI', bio: 'Expert in urinary tract disorders, kidney stones, and prostate health.', image: 'https://randomuser.me/api/portraits/men/43.jpg', phone: '+1 (555) 112-0001', available: true },
  { id: 38, name: 'Dr. Patricia Miller', specialty: 'Urology', rating: 4.7, experience: 12, location: 'Sacramento, CA', bio: 'Specializes in female urology and pelvic health.', image: 'https://randomuser.me/api/portraits/women/20.jpg', phone: '+1 (555) 112-0002', available: true },
  { id: 39, name: 'Dr. Jessica Taylor', specialty: 'Ophthalmology', rating: 4.8, experience: 12, location: 'Minneapolis, MN', bio: 'Specialist in cataract surgery, LASIK, and comprehensive eye care.', image: 'https://randomuser.me/api/portraits/women/21.jpg', phone: '+1 (555) 113-0001', available: true },
  { id: 40, name: 'Dr. William Davis', specialty: 'Ophthalmology', rating: 4.6, experience: 16, location: 'Indianapolis, IN', bio: 'Expert in glaucoma treatment and retinal diseases.', image: 'https://randomuser.me/api/portraits/men/44.jpg', phone: '+1 (555) 113-0002', available: true },
  { id: 41, name: 'Dr. Susan Chen', specialty: 'Ophthalmology', rating: 4.7, experience: 10, location: 'Raleigh, NC', bio: 'Specializes in pediatric ophthalmology and strabismus.', image: 'https://randomuser.me/api/portraits/women/22.jpg', phone: '+1 (555) 113-0003', available: true },
  { id: 42, name: 'Dr. Laura Bennett', specialty: 'Pediatrics', rating: 4.9, experience: 11, location: 'Seattle, WA', bio: 'Specialist in child healthcare, developmental pediatrics, and adolescent medicine.', image: 'https://randomuser.me/api/portraits/women/23.jpg', phone: '+1 (555) 114-0001', available: true },
  { id: 43, name: 'Dr. Charles Evans', specialty: 'Pediatrics', rating: 4.7, experience: 13, location: 'Oklahoma City, OK', bio: 'Expert in pediatric emergency medicine and infectious diseases.', image: 'https://randomuser.me/api/portraits/men/45.jpg', phone: '+1 (555) 114-0002', available: true },
  { id: 44, name: 'Dr. William Parker', specialty: 'General Surgery', rating: 4.7, experience: 16, location: 'Nashville, TN', bio: 'Expert in minimally invasive procedures, laparoscopic surgery, and trauma care.', image: 'https://randomuser.me/api/portraits/men/46.jpg', phone: '+1 (555) 115-0001', available: true },
  { id: 45, name: 'Dr. Elizabeth Foster', specialty: 'General Surgery', rating: 4.8, experience: 12, location: 'New Orleans, LA', bio: 'Specializes in breast surgery and oncological surgery.', image: 'https://randomuser.me/api/portraits/women/24.jpg', phone: '+1 (555) 115-0002', available: true },
  { id: 46, name: 'Dr. Rachel Kim', specialty: 'Oncology', rating: 4.8, experience: 13, location: 'Baltimore, MD', bio: 'Expert in cancer treatment, chemotherapy, and immunotherapy.', image: 'https://randomuser.me/api/portraits/women/25.jpg', phone: '+1 (555) 116-0001', available: true },
  { id: 47, name: 'Dr. Peter Johnson', specialty: 'Oncology', rating: 4.6, experience: 15, location: 'Memphis, TN', bio: 'Specializes in radiation oncology and cancer research.', image: 'https://randomuser.me/api/portraits/men/47.jpg', phone: '+1 (555) 116-0002', available: true },
  { id: 48, name: 'Dr. Daniel Murphy', specialty: 'Emergency Medicine', rating: 4.6, experience: 14, location: 'Dallas, TX', bio: 'Expert in critical care, trauma management, and acute medical conditions.', image: 'https://randomuser.me/api/portraits/men/48.jpg', phone: '+1 (555) 117-0001', available: true },
  { id: 49, name: 'Dr. Christine Park', specialty: 'Emergency Medicine', rating: 4.7, experience: 10, location: 'Columbus, OH', bio: 'Specializes in emergency pediatrics and disaster medicine.', image: 'https://randomuser.me/api/portraits/women/26.jpg', phone: '+1 (555) 117-0002', available: true },
  { id: 50, name: 'Dr. Sophia Chen', specialty: 'Gastroenterology', rating: 4.8, experience: 11, location: 'Atlanta, GA', bio: 'Expert in digestive disorders, endoscopy, and liver diseases.', image: 'https://randomuser.me/api/portraits/women/27.jpg', phone: '+1 (555) 118-0001', available: true }
];

const TELEHEALTH_DOCTORS = ALL_DOCTORS.map(doc => ({
  ...doc,
  waitTime: ['< 2 min', '< 5 min', '< 8 min', '< 10 min', '< 15 min', 'No wait'][doc.id % 6],
  fee: ['$30', '$35', '$40', '$45', '$50', '$55', '$60'][doc.id % 7],
  languages: doc.id % 3 === 0 ? ['English', 'Spanish'] : doc.id % 3 === 1 ? ['English', 'French'] : ['English'],
  nextAvailable: doc.id % 3 === 0 ? 'In 15 min' : doc.id % 3 === 1 ? 'In 10 min' : 'Now'
}));

const SPECIALTY_FILTERS = [
  'All', 'Cardiology', 'Nutrition & Dietetics', 'Physical Therapy', 'General Medicine', 'Neurology', 'Gynecology', 'Dermatology', 'Orthopedics', 'Endocrinology', 'Rheumatology', 'Psychiatry', 'Urology', 'Ophthalmology', 'Pediatrics', 'General Surgery', 'Oncology', 'Emergency Medicine', 'Gastroenterology'
];

const Telehealth = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldDark = '#047857';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [startingSession, setStartingSession] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 12;

  const [upcomingSessions, setUpcomingSessions] = useState([
    {
      id: 1,
      doctor: 'Dr. Emily Carter',
      specialty: 'Cardiology',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      date: 'Today, July 8',
      time: '4:30 PM',
      duration: '30 min',
      status: 'Starting Soon',
      statusColor: '#059669',
      statusBg: '#ecfdf5'
    },
    {
      id: 17,
      doctor: 'Dr. Michael Chen',
      specialty: 'Neurology',
      image: 'https://randomuser.me/api/portraits/men/34.jpg',
      date: 'Thu, July 10',
      time: '11:00 AM',
      duration: '45 min',
      status: 'Confirmed',
      statusColor: '#3b82f6',
      statusBg: '#eff6ff'
    }
  ]);

  const [rescheduleSession, setRescheduleSession] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [rescheduleReason, setRescheduleReason] = useState('');

  const handleConfirmReschedule = async () => {
    if (!rescheduleSession || !rescheduleDate || !rescheduleTime) {
      if (showToast) showToast('Please select both a date and a time slot', 'error');
      return;
    }

    let dateFormatted = rescheduleDate;
    try {
      const parts = rescheduleDate.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        dateFormatted = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      }
    } catch (e) {
      console.warn('Date parsing fallback:', e);
    }

    setUpcomingSessions(prev => prev.map(s => {
      if (s.id === rescheduleSession.id) {
        return {
          ...s,
          date: dateFormatted,
          time: rescheduleTime,
          status: 'Rescheduled',
          statusColor: '#059669',
          statusBg: '#ecfdf5'
        };
      }
      return s;
    }));

    try {
      await fetch(`/api/appointments/${rescheduleSession.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentDate: rescheduleDate,
          appointmentTime: rescheduleTime,
          notes: rescheduleReason || 'Rescheduled via Telehealth portal'
        })
      });
    } catch (e) {
      console.warn('Backend update failed:', e);
    }

    if (showToast) showToast(`✅ Session with ${rescheduleSession.doctor} rescheduled to ${dateFormatted} at ${rescheduleTime}`, 'success');
    setRescheduleSession(null);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSpecialty]);

  const filtered = TELEHEALTH_DOCTORS.filter(doc => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const totalPages = Math.ceil(filtered.length / doctorsPerPage);
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filtered.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartConsultation = (doctor) => {
    setStartingSession(doctor.id);
    showToast(`🎥 Connecting to ${doctor.name}...`, 'info');
    setTimeout(() => {
      navigate(`/video-consultation/${doctor.id}`, {
        state: { doctor, from: 'telehealth' }
      });
    }, 800);
  };

  return (
    <>
      <Navbar />
      <div style={{
        paddingTop: '80px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)',
        fontFamily: "'Inter', system-ui, sans-serif"
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>

          {/* Hero Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)',
            borderRadius: '28px',
            padding: '52px 48px',
            marginBottom: '40px',
            position: 'relative',
            overflow: 'hidden',
            color: 'white'
          }}>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '16px', borderRadius: '16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <FaVideo style={{ fontSize: '2.2rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '2.4rem', fontWeight: '800', letterSpacing: '-0.5px', margin: 0 }}>
                    WellNest Telehealth
                  </h1>
                  <p style={{ fontSize: '1rem', opacity: 0.9, margin: '4px 0 0 0', fontWeight: '400' }}>
                    Connect instantly with certified doctors — from anywhere, anytime
                  </p>
                </div>
              </div>

              {/* Trust badges */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
                {[
                  { icon: FaShieldAlt, label: 'HIPAA Compliant', sub: 'End-to-End Encrypted' },
                  { icon: FaBolt, label: 'Instant Connect', sub: 'Average wait < 5 min' },
                  { icon: FaGlobe, label: 'Multilingual', sub: '12+ Languages Supported' },
                  { icon: FaRegClock, label: 'Available 24/7', sub: 'Nights, weekends & holidays' },
                ].map((badge, idx) => (
                  <div key={idx} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 18px', borderRadius: '14px',
                    transition: 'all 0.25s'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    <badge.icon style={{ fontSize: '1.1rem', opacity: 0.9 }} />
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>{badge.label}</div>
                      <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>{badge.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>
              How Telehealth Works
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { step: '01', icon: FaSearch,       title: 'Choose a Doctor',   desc: 'Browse certified specialists and pick the right fit for your concern.' },
                { step: '02', icon: FaCalendarAlt,  title: 'Start Instantly',   desc: 'No appointment needed. Connect immediately or schedule for later.' },
                { step: '03', icon: FaVideo,        title: 'Video Consultation', desc: 'Secure, HD video call with full chat, notes and prescription support.' },
                { step: '04', icon: FaCheckCircle,  title: 'Receive Care Plan',  desc: 'Get your diagnosis, e-prescription and follow-up plan instantly.' },
              ].map((s, idx) => (
                <div key={idx} style={{
                  background: 'white', borderRadius: '20px', padding: '24px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = emerald; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '800', color: emerald, background: emeraldLight, padding: '3px 8px', borderRadius: '20px', border: `1px solid ${emerald}30` }}>
                      STEP {s.step}
                    </span>
                  </div>
                  <div style={{ background: emeraldLight, width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                    <s.icon style={{ color: emerald, fontSize: '1.2rem' }} />
                  </div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', fontWeight: '800', color: '#1e293b' }}>{s.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b', lineHeight: '1.5' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Sessions Panel */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', margin: 0 }}>Your Scheduled Sessions</h2>
              <span style={{ fontSize: '0.75rem', background: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontWeight: '700', border: '1px solid #a7f3d0' }}>
                {upcomingSessions.length} Upcoming
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {upcomingSessions.map((session, i) => (
                <div key={i} style={{
                  background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)', overflow: 'hidden'
                }}>
                  <div style={{ background: session.statusBg, padding: '8px 18px', borderBottom: `1px solid ${session.statusColor}20`, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: session.statusColor }} />
                    <span style={{ fontSize: '0.72rem', fontWeight: '800', color: session.statusColor }}>{session.status}</span>
                  </div>
                  <div style={{ padding: '16px 18px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <img src={session.image} alt={session.doctor} style={{ width: '52px', height: '52px', borderRadius: '14px', objectFit: 'cover', border: '2px solid #ecfdf5' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#0f172a' }}>{session.doctor}</div>
                      <div style={{ fontSize: '0.78rem', color: emerald, fontWeight: '700' }}>{session.specialty}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', display: 'flex', gap: '10px' }}>
                        <span><FaCalendarAlt style={{ marginRight: '4px', verticalAlign: 'middle' }} />{session.date}</span>
                        <span><FaClock style={{ marginRight: '4px', verticalAlign: 'middle' }} />{session.time} • {session.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '0 18px 16px', display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => {
                        showToast(`🎥 Joining session with ${session.doctor}...`, 'info');
                        const docObj = ALL_DOCTORS.find(d => d.id === session.id) || { id: session.id, name: session.doctor, specialty: session.specialty, image: session.image };
                        setTimeout(() => {
                          navigate(`/video-consultation/${session.id}`, {
                            state: { doctor: docObj, from: 'telehealth' }
                          });
                        }, 800);
                      }}
                      style={{ flex: 2, padding: '9px', background: emerald, border: 'none', borderRadius: '10px', color: 'white', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      <FaVideo /> Join Session
                    </button>
                    <button
                      onClick={() => {
                        setRescheduleSession(session);
                        setRescheduleDate(new Date().toISOString().split('T')[0]);
                        setRescheduleTime('10:30 AM');
                        setRescheduleReason('');
                      }}
                      style={{ flex: 1, padding: '9px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#475569', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer' }}
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search + Filter */}

          <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{
              flex: 1, minWidth: '220px',
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'white', borderRadius: '14px',
              padding: '0 16px', border: '1.5px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'border-color 0.2s'
            }}
              onFocus={e => e.currentTarget.style.borderColor = emerald}
              onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
              <FaSearch style={{ color: '#94a3b8', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search doctor name or specialty..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ border: 'none', outline: 'none', padding: '13px 0', width: '100%', fontSize: '0.9rem', background: 'transparent' }}
              />
            </div>

            <div>
              <CustomDropdown
                options={SPECIALTY_FILTERS}
                value={selectedSpecialty}
                onChange={setSelectedSpecialty}
                placeholder="Filter Specialty"
              />
            </div>

            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>
              <span style={{ color: emerald, fontWeight: '800' }}>{filtered.length}</span> doctors available
            </span>
          </div>

          {/* Doctors Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
            justifyContent: 'center'
          }}>
            {currentDoctors.map(doctor => {
              const isFav = isFavorite(doctor.id);
              const isBook = isBookmarked(doctor.id);
              const isStarting = startingSession === doctor.id;

              return (
                <div key={doctor.id} style={{
                  background: 'white',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                  transition: 'all 0.25s',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '300px'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = emerald; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                >
                  {/* Top availability banner */}
                  <div style={{
                    background: doctor.nextAvailable === 'Now' ? emeraldLight : '#fffbeb',
                    padding: '8px 20px',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    borderBottom: `1px solid ${doctor.nextAvailable === 'Now' ? '#a7f3d0' : '#fef3c7'}`,
                    flexShrink: 0
                  }}>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: doctor.nextAvailable === 'Now' ? '#22c55e' : '#f59e0b',
                      animation: 'pulse 2s infinite'
                    }} />
                    <span style={{
                      fontSize: '0.75rem', fontWeight: '700',
                      color: doctor.nextAvailable === 'Now' ? emeraldDark : '#92400e'
                    }}>
                      {doctor.nextAvailable === 'Now' ? '● Available Now' : `⏱ Next: ${doctor.nextAvailable}`}
                    </span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: '800', color: doctor.nextAvailable === 'Now' ? emerald : '#d97706' }}>
                      Wait: {doctor.waitTime}
                    </span>
                  </div>

                  {/* Doctor info */}
                  <div style={{ padding: '12px 16px 0 16px' }}>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          style={{ width: '56px', height: '56px', borderRadius: '16px', objectFit: 'cover', border: `3px solid ${emeraldLight}` }}
                        />
                        <div style={{
                          position: 'absolute', bottom: '-4px', right: '-4px',
                          background: '#22c55e', width: '14px', height: '14px',
                          borderRadius: '50%', border: '2px solid white'
                        }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ margin: '0 0 2px 0', fontSize: '0.92rem', fontWeight: '800', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doctor.name}</h3>
                        <p style={{ margin: '0 0 4px 0', fontSize: '0.78rem', color: emerald, fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doctor.specialty}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <FaStar style={{ color: '#f59e0b', fontSize: '0.7rem' }} />
                          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#1e293b' }}>{doctor.rating}</span>
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>• {doctor.experience} yrs exp</span>
                        </div>
                      </div>
                      {/* Favorite/bookmark icons */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(doctor.id, { name: doctor.name, type: 'doctor', specialty: doctor.specialty }); }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: isFav ? '#ef4444' : '#cbd5e1', padding: '2px', transition: 'color 0.2s' }}
                        >
                          {isFav ? <FaHeart /> : <FaRegHeart />}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleBookmark(doctor.id, { name: doctor.name, type: 'doctor', specialty: doctor.specialty }); }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: isBook ? '#f59e0b' : '#cbd5e1', padding: '2px', transition: 'color 0.2s' }}
                        >
                          {isBook ? <FaBookmark /> : <FaRegBookmark />}
                        </button>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '10px' }}>
                      <div style={{ background: '#f8fafc', padding: '6px', borderRadius: '10px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                        <div style={{ fontSize: '0.58rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Session Fee</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#1e293b', marginTop: '2px' }}>{doctor.fee}</div>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '6px', borderRadius: '10px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                        <div style={{ fontSize: '0.58rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Wait Time</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: '800', color: emerald, marginTop: '2px' }}>{doctor.waitTime}</div>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '6px', borderRadius: '10px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                        <div style={{ fontSize: '0.58rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Languages</div>
                        <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#475569', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doctor.languages[0]}{doctor.languages.length > 1 ? ` +${doctor.languages.length - 1}` : ''}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action footer */}
                  <div style={{ padding: '0 16px 16px 16px', display: 'flex', gap: '10px', marginTop: 'auto', flexShrink: 0 }}>
                    <button
                      onClick={() => navigate(`/doctors/${doctor.id}`)}
                      style={{
                        flex: 1, padding: '9px', background: '#f8fafc',
                        border: '1px solid #e2e8f0', borderRadius: '12px',
                        color: '#475569', fontWeight: '700', fontSize: '0.78rem',
                        cursor: 'pointer', transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = emerald; e.currentTarget.style.color = emerald; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569'; }}
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleStartConsultation(doctor)}
                      disabled={isStarting}
                      style={{
                        flex: 2, padding: '9px',
                        background: isStarting ? '#a7f3d0' : emerald,
                        border: 'none', borderRadius: '12px',
                        color: 'white', fontWeight: '700', fontSize: '0.8rem',
                        cursor: isStarting ? 'default' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        boxShadow: isStarting ? 'none' : '0 4px 12px rgba(5,150,105,0.25)',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isStarting ? (
                        <>
                          <span style={{ width: '12px', height: '12px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <FaVideo style={{ fontSize: '0.75rem' }} />
                          Start Video Call
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px',
              flexWrap: 'wrap',
              marginBottom: '40px'
            }}>
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} style={{
                padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0',
                background: 'transparent', cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                color: currentPage === 1 ? '#94a3b8' : '#1e293b', opacity: currentPage === 1 ? 0.5 : 1
              }}>
                <FaArrowLeft />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;
                return (
                  <button key={pageNum} onClick={() => goToPage(pageNum)} style={{
                    padding: '8px 14px', borderRadius: '8px',
                    border: currentPage === pageNum ? `2px solid ${emerald}` : '1px solid #e2e8f0',
                    background: currentPage === pageNum ? emerald : 'transparent',
                    color: currentPage === pageNum ? 'white' : '#1e293b',
                    cursor: 'pointer', fontWeight: currentPage === pageNum ? '700' : '500'
                  }}>
                    {pageNum}
                  </button>
                );
              })}

              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} style={{
                padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0',
                background: 'transparent', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                color: currentPage === totalPages ? '#94a3b8' : '#1e293b', opacity: currentPage === totalPages ? 0.5 : 1
              }}>
                <FaArrowRight />
              </button>
            </div>
          )}

          {/* Info section */}
          <div style={{
            background: 'white', borderRadius: '24px', padding: '36px 40px',
            border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px'
          }}>
            {[
              { icon: FaLock,        title: 'Bank-Level Encryption',    desc: '256-bit SSL encryption on all telehealth sessions. Your health data is always private.' },
              { icon: FaHeartbeat,   title: 'Live Vitals Monitoring',   desc: 'Real-time ECG, heart rate and biometric monitoring during your video consultation.' },
              { icon: FaPhoneAlt,    title: 'Audio Call Fallback',      desc: 'If video drops, instantly switch to a secure HD audio call with no interruption.' },
              { icon: FaCheckCircle, title: 'e-Prescription Delivery',  desc: 'Prescriptions are sent directly to your phone and nearest partner pharmacy.' },
            ].map((info, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '14px' }}>
                <div style={{ background: emeraldLight, width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <info.icon style={{ color: emerald, fontSize: '1.1rem' }} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '0.9rem', fontWeight: '800', color: '#1e293b' }}>{info.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', lineHeight: '1.5' }}>{info.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Reschedule Modal */}
      {rescheduleSession && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            maxWidth: '520px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>
                Reschedule Consultation
              </h3>
              <button
                onClick={() => setRescheduleSession(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: '#94a3b8', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Doctor Summary */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#f8fafc',
              borderRadius: '16px',
              padding: '12px 16px',
              marginBottom: '20px',
              border: '1px solid #e2e8f0'
            }}>
              <img
                src={rescheduleSession.image}
                alt={rescheduleSession.doctor}
                style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#1e293b' }}>{rescheduleSession.doctor}</div>
                <div style={{ fontSize: '0.78rem', color: emerald, fontWeight: '600' }}>{rescheduleSession.specialty}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Current: {rescheduleSession.date}</div>
              </div>
            </div>

            {/* Step 1: Calendar Date Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                Select New Date
              </label>
              <EmeraldDatePicker value={rescheduleDate} onChange={setRescheduleDate} />
            </div>

            {/* Step 2: Time Slots Grid */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                Select Available Time Slot
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  '09:00 AM', '09:30 AM', '10:00 AM',
                  '10:30 AM', '11:00 AM', '11:30 AM',
                  '02:00 PM', '02:30 PM', '03:00 PM',
                  '03:30 PM', '04:00 PM', '05:00 PM',
                  '05:30 PM', '06:00 PM', '06:30 PM'
                ].map(slot => (
                  <button
                    key={slot}
                    onClick={() => setRescheduleTime(slot)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '10px',
                      border: rescheduleTime === slot ? `2px solid ${emerald}` : '1px solid #e2e8f0',
                      background: rescheduleTime === slot ? emeraldLight : 'white',
                      color: rescheduleTime === slot ? emeraldDark : '#475569',
                      fontWeight: rescheduleTime === slot ? '700' : '500',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Optional Reason */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                Reason for Rescheduling (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Schedule conflict, work commitment..."
                value={rescheduleReason}
                onChange={(e) => setRescheduleReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.85rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setRescheduleSession(null)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  background: 'white',
                  color: '#64748b',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReschedule}
                style={{
                  flex: 2,
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  background: emerald,
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Confirm New Time
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
      <Footer />
      </>
  );
};

export default Telehealth;
