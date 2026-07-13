import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, FaStar, FaClock, FaUserMd, FaMapMarkerAlt,
  FaFilter, FaArrowLeft, FaArrowRight, FaPhone, FaVideo,
  FaCalendarCheck, FaHeart, FaRegHeart, FaBookmark, FaRegBookmark,
  FaPhoneAlt, FaVideo as FaVideoIcon, FaMicrophone,
  FaMicrophoneSlash, FaVolumeUp, FaVolumeMute, FaClipboardList, FaPhoneSlash
} from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CustomDropdown from '../../components/CustomDropdown';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useBookmarks } from '../../contexts/BookmarksContext';
import { useToast } from '../../contexts/ToastContext';

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

const Doctors = () => {
  const navigate = useNavigate();
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldDark = '#047857';
  
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [specialties, setSpecialties] = useState(['All']);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(8);
  
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { showToast } = useToast();

  // Audio Call States
  const [activeCallDoctor, setActiveCallDoctor] = useState(null);
  const [callState, setCallState] = useState('idle'); // 'idle', 'dialing', 'connecting', 'connected', 'summary'
  const [callDuration, setCallDuration] = useState(0);
  const [callMuted, setCallMuted] = useState(false);
  const [callSpeaker, setCallSpeaker] = useState(false);
  const [callNotes, setCallNotes] = useState('');

  useEffect(() => {
    let timer = null;
    if (callState === 'dialing') {
      timer = setTimeout(() => {
        setCallState('connecting');
      }, 2000);
    } else if (callState === 'connecting') {
      timer = setTimeout(() => {
        setCallState('connected');
        if (showToast) showToast('📞 Call connected.', 'success');
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [callState]);

  useEffect(() => {
    let interval = null;
    if (callState === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const handleHangUp = () => {
    setCallState('summary');
    if (showToast) {
      showToast('📞 Call ended.', 'info');
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    setDoctors(ALL_DOCTORS);
    setFilteredDoctors(ALL_DOCTORS);
    const specs = ['All', ...new Set(ALL_DOCTORS.map(d => d.specialty))];
    setSpecialties(specs);
    setLoading(false);
  }, []);

  useEffect(() => {
    let result = [...doctors];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(d => 
        d.name?.toLowerCase().includes(term) ||
        d.specialty?.toLowerCase().includes(term) ||
        d.bio?.toLowerCase().includes(term) ||
        d.location?.toLowerCase().includes(term)
      );
    }
    if (selectedSpecialty !== 'All') {
      result = result.filter(d => d.specialty === selectedSpecialty);
    }
    setFilteredDoctors(result);
    setCurrentPage(1);
  }, [searchTerm, selectedSpecialty, doctors]);

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Premium Call handler - shows toast and simulates call
  const handleCall = (e, doctor) => {
    e.stopPropagation();
    setActiveCallDoctor(doctor);
    setCallState('dialing');
    if (showToast) {
      showToast(`📞 Dialing ${doctor.name}...`, 'info');
    }
  };

  // Premium Video handler
  const handleVideoConsult = (e, doctor) => {
    e.stopPropagation();
    if (showToast) {
      showToast(`🎥 Starting video consultation with ${doctor.name}...`, 'info');
      setTimeout(() => {
        navigate(`/video-consultation/${doctor.id}`, { state: { doctor } });
      }, 500);
    } else {
      navigate(`/video-consultation/${doctor.id}`, { state: { doctor } });
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} style={{ color: '#f59e0b', fontSize: '0.7rem' }} />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={i} style={{ color: '#e2e8f0', fontSize: '0.7rem' }} />
        ))}
      </span>
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', border: `4px solid ${emeraldLight}`, borderTop: `4px solid ${emerald}`, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
            <p style={{ color: '#64748b', marginTop: '16px' }}>Loading doctors...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)',
            borderRadius: '24px',
            padding: '48px 40px',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden',
            color: 'white'
          }}>
            <div style={{ position: 'absolute', top: '-100px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-150px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <FaUserMd style={{ fontSize: '2rem', opacity: 0.9 }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '2.2rem', fontWeight: '700', letterSpacing: '-0.5px', margin: 0, textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
                    Find Doctors
                  </h1>
                  <p style={{ fontSize: '1rem', opacity: 0.9, margin: '2px 0 0 0', fontWeight: '300' }}>
                    Connect with top-tier accredited healthcare professionals
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '12px',
                marginTop: '16px'
              }}>
                {[
                  { label: 'Total Doctors', value: doctors.length, icon: FaUserMd },
                  { label: 'Specialties', value: specialties.length - 1, icon: FaFilter },
                  { label: 'Avg Rating', value: '4.8+', icon: FaStar },
                  { label: 'Available', value: '24/7', icon: FaClock },
                ].map((stat, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', padding: '6px', borderRadius: '8px' }}>
                      <stat.icon style={{ fontSize: '1rem', color: 'white' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '700', lineHeight: '1.2' }}>{stat.value}</div>
                      <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: '12px',
              padding: '0 16px',
              border: '2px solid #e2e8f0',
              minWidth: '200px',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = emerald; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; }}>
              <FaSearch style={{ color: '#94a3b8', fontSize: '0.9rem' }} />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: 'none',
                  padding: '12px 14px',
                  width: '100%',
                  outline: 'none',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  background: 'transparent'
                }}
              />
            </div>

            <div>
              <CustomDropdown
                options={specialties}
                value={selectedSpecialty}
                onChange={setSelectedSpecialty}
                placeholder="Filter Specialty"
              />
            </div>
          </div>

          {/* Results Count */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
              Found <span style={{ color: emerald, fontWeight: '700' }}>{filteredDoctors.length}</span> doctors
            </p>
          </div>

          {/* Doctors Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
            justifyContent: 'center'
          }}>
            {currentDoctors.map((doctor) => {
              const isFav = isFavorite(doctor.id);
              const isBookmark = isBookmarked(doctor.id);

              return (
                <div
                  key={doctor.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '300px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = emerald;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                  onClick={() => navigate(`/doctors/${doctor.id}`)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `3px solid ${emeraldLight}`,
                        backgroundColor: '#f1f5f9'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b', margin: '0 0 2px 0' }}>
                        {doctor.name}
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: emerald, fontWeight: '600', margin: '0 0 4px 0' }}>
                        {doctor.specialty || 'General Medicine'}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {renderStars(doctor.rating || 4.5)}
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                          {doctor.rating || 4.5}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '0.8rem',
                    color: '#64748b',
                    lineHeight: '1.4',
                    margin: '0 0 10px 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {doctor.bio || 'Experienced healthcare professional dedicated to patient care.'}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '10px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#94a3b8' }}>
                      <FaClock style={{ fontSize: '0.55rem', color: emerald }} />
                      {doctor.experience || 5} years exp
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#94a3b8' }}>
                      <FaMapMarkerAlt style={{ fontSize: '0.55rem', color: emerald }} />
                      {doctor.location || 'Remote'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#22c55e' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                      Available
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '12px',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginTop: 'auto',
                    flexShrink: 0
                  }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(doctor.id, { name: doctor.name, type: 'doctor', specialty: doctor.specialty }); }}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          background: isFav ? '#fef2f2' : 'white',
                          color: isFav ? '#ef4444' : '#94a3b8',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontSize: '0.9rem'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ef4444'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
                      >
                        {isFav ? <FaHeart /> : <FaRegHeart />}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleBookmark(doctor.id, { name: doctor.name, type: 'doctor', specialty: doctor.specialty }); }}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          background: isBookmark ? '#fffbeb' : 'white',
                          color: isBookmark ? '#f59e0b' : '#94a3b8',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontSize: '0.9rem'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#f59e0b'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
                      >
                        {isBookmark ? <FaBookmark /> : <FaRegBookmark />}
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={(e) => handleCall(e, doctor)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          background: '#f1f5f9',
                          color: '#1e293b',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.transform = 'scale(1)'; }}
                      >
                        <FaPhoneAlt style={{ fontSize: '0.7rem' }} /> Call
                      </button>
                      <button
                        onClick={(e) => handleVideoConsult(e, doctor)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          background: emerald,
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 10px rgba(5,150,105,0.3)'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = emeraldDark; e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,150,105,0.4)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = emerald; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(5,150,105,0.3)'; }}
                      >
                        <FaVideoIcon style={{ fontSize: '0.7rem' }} /> Video
                      </button>
                    </div>
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
              <button onClick={() => goToPage(1)} disabled={currentPage === 1} style={{
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

              <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} style={{
                padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0',
                background: 'transparent', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                color: currentPage === totalPages ? '#94a3b8' : '#1e293b', opacity: currentPage === totalPages ? 0.5 : 1
              }}>
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Premium Voice Call Overlay */}
      {callState !== 'idle' && activeCallDoctor && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(12px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: "'Inter', sans-serif"
        }}>
          {callState !== 'summary' ? (
          <div style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '28px',
              padding: '40px',
              maxWidth: '450px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#1e293b'
            }}>
              {/* Doctor avatar with pulsing ring */}
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-8px',
                  right: '-8px',
                  bottom: '-8px',
                  borderRadius: '50%',
                  border: `3px solid ${emerald}`,
                  animation: 'pulse 1.8s infinite',
                  opacity: callState === 'connected' ? 0.8 : 0.3
                }} />
                <img 
                  src={activeCallDoctor.image} 
                  alt={activeCallDoctor.name} 
                  style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #e2e8f0' }} 
                />
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a' }}>{activeCallDoctor.name}</h3>
              <p style={{ color: emerald, fontSize: '0.9rem', fontWeight: '600', margin: '0 0 20px 0' }}>{activeCallDoctor.specialty}</p>

              {/* Status & Timer */}
              <div style={{ marginBottom: '32px' }}>
                {callState === 'dialing' && <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.5px' }}>DIALING...</span>}
                {callState === 'connecting' && <span style={{ color: '#f59e0b', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.5px' }}>CONNECTING...</span>}
                {callState === 'connected' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.8rem', fontFamily: 'monospace', fontWeight: '700', color: '#10b981' }}>
                      {formatDuration(callDuration)}
                    </span>
                    <span style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      ● SECURE VOICE CALL
                    </span>
                    
                    {/* CSS Animated Sound Wave */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '30px', marginTop: '12px' }}>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(bar => (
                        <div 
                          key={bar} 
                          style={{
                            width: '4px',
                            background: emerald,
                            borderRadius: '2px',
                            height: '100%',
                            animation: 'bounceWave 1.2s ease-in-out infinite',
                            animationDelay: `${bar * 0.15}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Note taking text area */}
              {callState === 'connected' && (
                <div style={{ width: '100%', textAlign: 'left', marginBottom: '32px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Call Notes</label>
                  <textarea 
                    placeholder="Take notes during call..."
                    value={callNotes}
                    onChange={(e) => setCallNotes(e.target.value)}
                    style={{ width: '100%', height: '80px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '12px', color: '#1e293b', resize: 'none', outline: 'none', fontFamily: 'inherit', fontSize: '0.85rem' }}
                  />
                </div>
              )}

              {/* Controls bar */}
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                <button 
                  onClick={() => setCallMuted(!callMuted)}
                  style={{
                    width: '48px', height: '48px', borderRadius: '50%', border: 'none',
                    background: callMuted ? '#ef4444' : '#f1f5f9', color: callMuted ? 'white' : '#475569',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', transition: 'all 0.2s'
                  }}
                  title={callMuted ? "Unmute" : "Mute"}
                >
                  {callMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                </button>
                <button 
                  onClick={handleHangUp}
                  style={{
                    width: '64px', height: '64px', borderRadius: '50%', border: 'none',
                    background: '#ef4444', color: 'white', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                    boxShadow: '0 4px 20px rgba(239, 68, 68, 0.3)', transition: 'all 0.2s'
                  }}
                  title="Hang Up"
                >
                  <FaPhoneSlash />
                </button>
                <button 
                  onClick={() => setCallSpeaker(!callSpeaker)}
                  style={{
                    width: '48px', height: '48px', borderRadius: '50%', border: 'none',
                    background: callSpeaker ? emerald : '#f1f5f9', color: callSpeaker ? 'white' : '#475569',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', transition: 'all 0.2s'
                  }}
                  title="Speakerphone"
                >
                  {callSpeaker ? <FaVolumeUp /> : <FaVolumeMute />}
                </button>
              </div>
            </div>
          ) : (
            /* Call Summary Card */
            <div style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '28px',
              padding: '40px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              color: '#1e293b'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '3rem' }}>🩺</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: '12px 0 4px 0', color: '#0f172a' }}>Consultation Summary</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Dr. {activeCallDoctor.name.split(' ').slice(1).join(' ')} • Voice Call Completed</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.85rem' }}>
                  <span style={{ color: '#64748b' }}>Call Duration</span>
                  <span style={{ fontWeight: '700', color: '#1e293b' }}>{formatDuration(callDuration)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.85rem' }}>
                  <span style={{ color: '#64748b' }}>Diagnostic Code</span>
                  <span style={{ fontWeight: '700', fontFamily: 'monospace', color: '#1e293b' }}>ICD-10-CM / R07.9</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Clinical Instructions</span>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: '1.4' }}>
                    Patient experienced minor palpitations. Advised rest, hydration, and monitoring vitals. Follow-up consultation scheduled.
                  </p>
                </div>
                {callNotes && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Your Notes</span>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#1e293b', lineHeight: '1.3' }}>{callNotes}</p>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => {
                    setCallState('idle');
                    setActiveCallDoctor(null);
                    setCallNotes('');
                  }}
                  className="settings-btn"
                  style={{ flex: 1, padding: '12px', background: emerald, border: 'none', color: 'white', fontWeight: '600', borderRadius: '10px', cursor: 'pointer' }}
                >
                  Finalize Consultation
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(5, 150, 105, 0.5); }
          70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(5, 150, 105, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(5, 150, 105, 0); }
        }
        @keyframes bounceWave {
          0%, 100% { transform: scaleY(0.2); }
          50% { transform: scaleY(1); }
        }
      `}</style>
      <Footer />
    </>
  );
};

export default Doctors;
