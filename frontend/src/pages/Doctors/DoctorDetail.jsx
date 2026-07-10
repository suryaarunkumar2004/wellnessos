import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaStar, FaClock, FaMapMarkerAlt, FaPhone, 
  FaVideo, FaCalendarCheck, FaHeart, FaRegHeart, 
  FaBookmark, FaRegBookmark, FaUserMd, FaEnvelope,
  FaShare, FaPrint, FaWhatsapp, FaTwitter, FaFacebook,
  FaMicrophoneSlash, FaMicrophone, FaPhoneSlash, FaVolumeUp, FaVolumeMute
} from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useBookmarks } from '../../contexts/BookmarksContext';
import { useToast } from '../../contexts/ToastContext';

// Same doctor data as Doctors.jsx
const ALL_DOCTORS = [
  { id: 1, name: 'Dr. Emily Carter', specialty: 'Cardiology', rating: 4.9, experience: 12, location: 'New York, NY', gender: 'female', bio: 'Expert in heart health, cardiovascular diseases, and preventive cardiology. Published author in leading medical journals.', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 2, name: 'Dr. James Wilson', specialty: 'Cardiology', rating: 4.8, experience: 15, location: 'Los Angeles, CA', gender: 'male', bio: 'Specializes in interventional cardiology and heart failure management. Over 15 years of experience.', image: 'https://randomuser.me/api/portraits/men/26.jpg' },
  { id: 3, name: 'Dr. Michael Roberts', specialty: 'Cardiology', rating: 4.7, experience: 10, location: 'Chicago, IL', gender: 'male', bio: 'Expert in electrophysiology and cardiac arrhythmia treatment. Published in multiple cardiology journals.', image: 'https://randomuser.me/api/portraits/men/27.jpg' },
  { id: 4, name: 'Dr. Sarah Mitchell', specialty: 'Cardiology', rating: 4.8, experience: 14, location: 'Houston, TX', gender: 'female', bio: 'Specializes in pediatric cardiology and congenital heart defects. Dedicated to children\'s heart health.', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 5, name: 'Dr. David Chen', specialty: 'Cardiology', rating: 4.6, experience: 18, location: 'San Francisco, CA', gender: 'male', bio: 'Expert in cardiac imaging and non-invasive cardiology. Leader in cardiovascular research.', image: 'https://randomuser.me/api/portraits/men/28.jpg' },
  { id: 6, name: 'Dr. Raj Patel', specialty: 'Nutrition & Dietetics', rating: 4.8, experience: 8, location: 'Chicago, IL', gender: 'male', bio: 'Specialist in customized diet planning, weight management, and metabolic health. Certified nutritionist.', image: 'https://randomuser.me/api/portraits/men/29.jpg' },
  { id: 7, name: 'Dr. Sarah Johnson', specialty: 'Nutrition & Dietetics', rating: 4.9, experience: 10, location: 'Houston, TX', gender: 'female', bio: 'Expert in clinical nutrition, sports nutrition, and wellness coaching. Published in multiple nutrition journals.', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: 8, name: 'Dr. Lisa Park', specialty: 'Nutrition & Dietetics', rating: 4.7, experience: 6, location: 'Boston, MA', gender: 'female', bio: 'Specializes in plant-based nutrition and gut health optimization. Passionate about sustainable eating.', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 9, name: 'Dr. James Anderson', specialty: 'Nutrition & Dietetics', rating: 4.6, experience: 12, location: 'Denver, CO', gender: 'male', bio: 'Expert in weight management, bariatric nutrition, and metabolic disorders. Leader in obesity medicine.', image: 'https://randomuser.me/api/portraits/men/30.jpg' },
  { id: 10, name: 'Dr. Maya Lee', specialty: 'Physical Therapy', rating: 4.9, experience: 10, location: 'San Francisco, CA', gender: 'female', bio: 'Expert in physical rehabilitation, sports injury recovery, and pain management. Works with professional athletes.', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { id: 11, name: 'Dr. Kevin Brown', specialty: 'Physical Therapy', rating: 4.7, experience: 14, location: 'Seattle, WA', gender: 'male', bio: 'Specializes in neurological rehabilitation and stroke recovery. Certified in neuro-rehabilitation techniques.', image: 'https://randomuser.me/api/portraits/men/31.jpg' },
  { id: 12, name: 'Dr. Amanda Green', specialty: 'Physical Therapy', rating: 4.8, experience: 9, location: 'Austin, TX', gender: 'female', bio: 'Expert in orthopedic rehabilitation and post-surgical recovery. Specializes in sports medicine.', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
  { id: 13, name: 'Dr. Arthur Pendelton', specialty: 'General Medicine', rating: 4.7, experience: 15, location: 'Boston, MA', gender: 'male', bio: 'Comprehensive primary care with expertise in preventive medicine and chronic disease management. Board certified.', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 14, name: 'Dr. Rachel Adams', specialty: 'General Medicine', rating: 4.8, experience: 11, location: 'Philadelphia, PA', gender: 'female', bio: 'Expert in geriatric medicine and elderly care management. Dedicated to senior health and wellness.', image: 'https://randomuser.me/api/portraits/women/7.jpg' },
  { id: 15, name: 'Dr. Thomas Wright', specialty: 'General Medicine', rating: 4.6, experience: 20, location: 'Phoenix, AZ', gender: 'male', bio: 'Specializes in internal medicine and complex medical conditions. Over 20 years of clinical experience.', image: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { id: 16, name: 'Dr. Laura Martinez', specialty: 'General Medicine', rating: 4.7, experience: 13, location: 'Miami, FL', gender: 'female', bio: 'Expert in women\'s health and preventive care. Committed to comprehensive patient wellness.', image: 'https://randomuser.me/api/portraits/women/8.jpg' },
  { id: 17, name: 'Dr. Michael Chen', specialty: 'Neurology', rating: 4.8, experience: 14, location: 'Denver, CO', gender: 'male', bio: 'Specialist in brain disorders, stroke management, and neurodegenerative diseases. Leading researcher in neurology.', image: 'https://randomuser.me/api/portraits/men/34.jpg' },
  { id: 18, name: 'Dr. Jessica Park', specialty: 'Neurology', rating: 4.9, experience: 12, location: 'Portland, OR', gender: 'female', bio: 'Expert in multiple sclerosis, epilepsy, and cognitive disorders. Published in top neurology journals.', image: 'https://randomuser.me/api/portraits/women/9.jpg' },
  { id: 19, name: 'Dr. Robert Kim', specialty: 'Neurology', rating: 4.6, experience: 16, location: 'Atlanta, GA', gender: 'male', bio: 'Specializes in movement disorders and Parkinson\'s disease. Pioneer in advanced neurological treatments.', image: 'https://randomuser.me/api/portraits/men/35.jpg' },
  { id: 20, name: 'Dr. Priya Sharma', specialty: 'Gynecology', rating: 4.9, experience: 13, location: 'Austin, TX', gender: 'female', bio: 'Women\'s health expert specializing in reproductive health, obstetrics, and gynecological surgery.', image: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { id: 21, name: 'Dr. Elizabeth White', specialty: 'Gynecology', rating: 4.8, experience: 11, location: 'Nashville, TN', gender: 'female', bio: 'Specializes in minimally invasive gynecological surgery and fertility. Compassionate women\'s health advocate.', image: 'https://randomuser.me/api/portraits/women/11.jpg' },
  { id: 22, name: 'Dr. Maria Garcia', specialty: 'Gynecology', rating: 4.7, experience: 15, location: 'Dallas, TX', gender: 'female', bio: 'Expert in high-risk obstetrics and maternal-fetal medicine. Dedicated to safe pregnancies and deliveries.', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: 23, name: 'Dr. Lisa Martinez', specialty: 'Dermatology', rating: 4.8, experience: 9, location: 'Miami, FL', gender: 'female', bio: 'Specialist in skin cancer treatment, cosmetic procedures, and pediatric dermatology. Expert in medical dermatology.', image: 'https://randomuser.me/api/portraits/women/13.jpg' },
  { id: 24, name: 'Dr. James Taylor', specialty: 'Dermatology', rating: 4.6, experience: 14, location: 'San Diego, CA', gender: 'male', bio: 'Expert in medical dermatology, psoriasis, and eczema treatment. Published in dermatology research.', image: 'https://randomuser.me/api/portraits/men/36.jpg' },
  { id: 25, name: 'Dr. Katherine Wright', specialty: 'Dermatology', rating: 4.7, experience: 11, location: 'Tampa, FL', gender: 'female', bio: 'Specializes in aesthetic dermatology and anti-aging treatments. Leader in cosmetic dermatology.', image: 'https://randomuser.me/api/portraits/women/14.jpg' },
  { id: 26, name: 'Dr. David Kim', specialty: 'Orthopedics', rating: 4.7, experience: 12, location: 'Portland, OR', gender: 'male', bio: 'Specializes in joint replacement, sports medicine, and musculoskeletal disorders. Expert orthopedic surgeon.', image: 'https://randomuser.me/api/portraits/men/37.jpg' },
  { id: 27, name: 'Dr. Brian Thompson', specialty: 'Orthopedics', rating: 4.6, experience: 17, location: 'Salt Lake City, UT', gender: 'male', bio: 'Expert in orthopedic trauma and fracture management. Leader in advanced orthopedic procedures.', image: 'https://randomuser.me/api/portraits/men/38.jpg' },
  { id: 28, name: 'Dr. Jennifer Davis', specialty: 'Orthopedics', rating: 4.8, experience: 10, location: 'Charlotte, NC', gender: 'female', bio: 'Specializes in pediatric orthopedics and scoliosis treatment. Dedicated to children\'s bone health.', image: 'https://randomuser.me/api/portraits/women/15.jpg' },
  { id: 29, name: 'Dr. Mark Wilson', specialty: 'Orthopedics', rating: 4.5, experience: 20, location: 'Las Vegas, NV', gender: 'male', bio: 'Expert in spine surgery and degenerative disc disease. Pioneer in minimally invasive spine surgery.', image: 'https://randomuser.me/api/portraits/men/39.jpg' },
  { id: 30, name: 'Dr. Maria Garcia', specialty: 'Endocrinology', rating: 4.8, experience: 11, location: 'Phoenix, AZ', gender: 'female', bio: 'Specialist in diabetes, thyroid disorders, and hormonal imbalances. Comprehensive endocrine care provider.', image: 'https://randomuser.me/api/portraits/women/16.jpg' },
  { id: 31, name: 'Dr. John Miller', specialty: 'Endocrinology', rating: 4.7, experience: 14, location: 'Baltimore, MD', gender: 'male', bio: 'Expert in metabolic disorders and pituitary gland disorders. Leader in endocrine research.', image: 'https://randomuser.me/api/portraits/men/40.jpg' },
  { id: 32, name: 'Dr. Robert Taylor', specialty: 'Rheumatology', rating: 4.7, experience: 14, location: 'Philadelphia, PA', gender: 'male', bio: 'Expert in autoimmune diseases, arthritis, and musculoskeletal disorders. Comprehensive rheumatology care.', image: 'https://randomuser.me/api/portraits/men/41.jpg' },
  { id: 33, name: 'Dr. Angela Clark', specialty: 'Rheumatology', rating: 4.8, experience: 10, location: 'Minneapolis, MN', gender: 'female', bio: 'Specializes in lupus, rheumatoid arthritis, and inflammatory disorders. Dedicated to autoimmune disease management.', image: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { id: 34, name: 'Dr. Amanda White', specialty: 'Psychiatry', rating: 4.9, experience: 10, location: 'San Diego, CA', gender: 'female', bio: 'Specialist in mental health, anxiety disorders, and depression management. Expert in cognitive behavioral therapy.', image: 'https://randomuser.me/api/portraits/women/18.jpg' },
  { id: 35, name: 'Dr. Daniel Lee', specialty: 'Psychiatry', rating: 4.7, experience: 12, location: 'St. Louis, MO', gender: 'male', bio: 'Expert in PTSD, trauma therapy, and addiction psychiatry. Leader in comprehensive mental health care.', image: 'https://randomuser.me/api/portraits/men/42.jpg' },
  { id: 36, name: 'Dr. Karen Scott', specialty: 'Psychiatry', rating: 4.8, experience: 14, location: 'Cleveland, OH', gender: 'female', bio: 'Specializes in child and adolescent psychiatry. Dedicated to young patients\' mental wellness.', image: 'https://randomuser.me/api/portraits/women/19.jpg' },
  { id: 37, name: 'Dr. Thomas Brown', specialty: 'Urology', rating: 4.6, experience: 18, location: 'Detroit, MI', gender: 'male', bio: 'Expert in urinary tract disorders, kidney stones, and prostate health. Comprehensive urological care provider.', image: 'https://randomuser.me/api/portraits/men/43.jpg' },
  { id: 38, name: 'Dr. Patricia Miller', specialty: 'Urology', rating: 4.7, experience: 12, location: 'Sacramento, CA', gender: 'female', bio: 'Specializes in female urology and pelvic health. Dedicated to comprehensive urological care for women.', image: 'https://randomuser.me/api/portraits/women/20.jpg' },
  { id: 39, name: 'Dr. Jessica Taylor', specialty: 'Ophthalmology', rating: 4.8, experience: 12, location: 'Minneapolis, MN', gender: 'female', bio: 'Specialist in cataract surgery, LASIK, and comprehensive eye care. Leader in vision correction procedures.', image: 'https://randomuser.me/api/portraits/women/21.jpg' },
  { id: 40, name: 'Dr. William Davis', specialty: 'Ophthalmology', rating: 4.6, experience: 16, location: 'Indianapolis, IN', gender: 'male', bio: 'Expert in glaucoma treatment and retinal diseases. Pioneer in advanced ophthalmic surgery techniques.', image: 'https://randomuser.me/api/portraits/men/44.jpg' },
  { id: 41, name: 'Dr. Susan Chen', specialty: 'Ophthalmology', rating: 4.7, experience: 10, location: 'Raleigh, NC', gender: 'female', bio: 'Specializes in pediatric ophthalmology and strabismus. Dedicated to children\'s vision health.', image: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { id: 42, name: 'Dr. Laura Bennett', specialty: 'Pediatrics', rating: 4.9, experience: 11, location: 'Seattle, WA', gender: 'female', bio: 'Specialist in child healthcare, developmental pediatrics, and adolescent medicine. Compassionate pediatrician.', image: 'https://randomuser.me/api/portraits/women/23.jpg' },
  { id: 43, name: 'Dr. Charles Evans', specialty: 'Pediatrics', rating: 4.7, experience: 13, location: 'Oklahoma City, OK', gender: 'male', bio: 'Expert in pediatric emergency medicine and infectious diseases. Dedicated to children\'s urgent care.', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: 44, name: 'Dr. William Parker', specialty: 'General Surgery', rating: 4.7, experience: 16, location: 'Nashville, TN', gender: 'male', bio: 'Expert in minimally invasive procedures, laparoscopic surgery, and trauma care. Leader in surgical innovation.', image: 'https://randomuser.me/api/portraits/men/46.jpg' },
  { id: 45, name: 'Dr. Elizabeth Foster', specialty: 'General Surgery', rating: 4.8, experience: 12, location: 'New Orleans, LA', gender: 'female', bio: 'Specializes in breast surgery and oncological surgery. Dedicated to comprehensive cancer care.', image: 'https://randomuser.me/api/portraits/women/24.jpg' },
  { id: 46, name: 'Dr. Rachel Kim', specialty: 'Oncology', rating: 4.8, experience: 13, location: 'Baltimore, MD', gender: 'female', bio: 'Expert in cancer treatment, chemotherapy, and immunotherapy. Leader in personalized cancer care.', image: 'https://randomuser.me/api/portraits/women/25.jpg' },
  { id: 47, name: 'Dr. Peter Johnson', specialty: 'Oncology', rating: 4.6, experience: 15, location: 'Memphis, TN', gender: 'male', bio: 'Specializes in radiation oncology and cancer research. Pioneer in advanced radiation therapy techniques.', image: 'https://randomuser.me/api/portraits/men/47.jpg' },
  { id: 48, name: 'Dr. Daniel Murphy', specialty: 'Emergency Medicine', rating: 4.6, experience: 14, location: 'Dallas, TX', gender: 'male', bio: 'Expert in critical care, trauma management, and acute medical conditions. Leader in emergency response.', image: 'https://randomuser.me/api/portraits/men/48.jpg' },
  { id: 49, name: 'Dr. Christine Park', specialty: 'Emergency Medicine', rating: 4.7, experience: 10, location: 'Columbus, OH', gender: 'female', bio: 'Specializes in emergency pediatrics and disaster medicine. Dedicated to rapid emergency response.', image: 'https://randomuser.me/api/portraits/women/26.jpg' },
  { id: 50, name: 'Dr. Sophia Chen', specialty: 'Gastroenterology', rating: 4.8, experience: 11, location: 'Atlanta, GA', gender: 'female', bio: 'Expert in digestive disorders, endoscopy, and liver diseases. Leader in comprehensive gastrointestinal care.', image: 'https://randomuser.me/api/portraits/women/27.jpg' }
];

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldDark = '#047857';
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  
  const toastContext = useToast();
  const showToast = toastContext?.showToast || toastContext?.addToast;

  // Audio Call States
  const [activeCallDoctor, setActiveCallDoctor] = useState(null);
  const [callState, setCallState] = useState('idle'); // 'idle', 'dialing', 'connecting', 'connected', 'summary'
  const [callDuration, setCallDuration] = useState(0);
  const [callMuted, setCallMuted] = useState(false);
  const [callSpeaker, setCallSpeaker] = useState(false);
  const [callNotes, setCallNotes] = useState('');

  useEffect(() => {
    const doctorId = parseInt(id);
    const found = ALL_DOCTORS.find(d => d.id === doctorId);
    if (found) {
      setDoctor(found);
    }
    setLoading(false);
  }, [id]);

  // Audio Call Side-effects & handlers
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
      }, 2000);
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
    if (showToast) showToast('📞 Call ended.', 'info');
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCall = (e) => {
    e.stopPropagation();
    setActiveCallDoctor(doctor);
    setCallState('dialing');
    if (showToast) showToast(`📞 Dialing ${doctor.name}...`, 'info');
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} style={{ color: '#f59e0b', fontSize: '1rem' }} />
        ))}
        {halfStar && <FaStar style={{ color: '#f59e0b', fontSize: '1rem', opacity: 0.5 }} />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} style={{ color: '#e2e8f0', fontSize: '1rem' }} />
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
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: `3px solid ${emeraldLight}`, borderTop: `3px solid ${emerald}`, animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
            <p style={{ color: '#64748b', marginTop: '12px' }}>Loading doctor details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!doctor) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#1e293b', marginBottom: '12px' }}>Doctor Not Found</h2>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>The doctor you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/doctors')} style={{ padding: '12px 24px', background: emerald, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Back to Doctors
            </button>
          </div>
        </div>
      </>
    );
  }

  const isFav = isFavorite(doctor.id);
  const isBookmark = isBookmarked(doctor.id);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
          {/* Back Button */}
          <button
            onClick={() => navigate('/doctors')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: '0.9rem',
              marginBottom: '24px',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = emerald; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; }}
          >
            <FaArrowLeft /> Back to Doctors
          </button>

          {/* Doctor Card */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {/* Image */}
              <div style={{ flexShrink: 0 }}>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `4px solid ${emeraldLight}`
                  }}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name.replace('Dr.', ''))}&size=200&background=059669&color=fff&bold=true`;
                  }}
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0' }}>
                      {doctor.name}
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: emerald, fontWeight: '600', margin: '0 0 8px 0' }}>
                      {doctor.specialty}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      {renderStars(doctor.rating)}
                      <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{doctor.rating} rating</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => toggleFavorite(doctor.id, { name: doctor.name, type: 'doctor', specialty: doctor.specialty })}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        background: isFav ? '#fef2f2' : 'white',
                        color: isFav ? '#ef4444' : '#94a3b8',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ef4444'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
                    >
                      {isFav ? <FaHeart /> : <FaRegHeart />}
                      {isFav ? 'Favorited' : 'Favorite'}
                    </button>
                    <button
                      onClick={() => toggleBookmark(doctor.id, { name: doctor.name, type: 'doctor', specialty: doctor.specialty })}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        background: isBookmark ? '#fffbeb' : 'white',
                        color: isBookmark ? '#f59e0b' : '#94a3b8',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#f59e0b'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
                    >
                      {isBookmark ? <FaBookmark /> : <FaRegBookmark />}
                      {isBookmark ? 'Bookmarked' : 'Bookmark'}
                    </button>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginBottom: '20px',
                  padding: '16px 0',
                  borderTop: '1px solid #f1f5f9',
                  borderBottom: '1px solid #f1f5f9'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748b' }}>
                    <FaClock style={{ color: emerald }} />
                    {doctor.experience} years experience
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748b' }}>
                    <FaMapMarkerAlt style={{ color: emerald }} />
                    {doctor.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748b' }}>
                    <FaUserMd style={{ color: emerald }} />
                    {doctor.specialty}
                  </span>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>About</h3>
                  <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.7' }}>
                    {doctor.bio}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    style={{
                      padding: '12px 24px',
                      borderRadius: '10px',
                      border: 'none',
                      background: emerald,
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => navigate('/book-appointment', { state: { doctor } })}
                    onMouseEnter={(e) => { e.currentTarget.style.background = emeraldDark; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = emerald; }}
                  >
                    <FaCalendarCheck /> Book Appointment
                  </button>
                  <button
                    style={{
                      padding: '12px 24px',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      background: 'white',
                      color: '#64748b',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => navigate(`/video-consultation/${doctor.id}`, { state: { doctor } })}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; }}
                  >
                    <FaVideo /> Video Consultation
                  </button>
                  <button
                    style={{
                      padding: '12px 24px',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      background: 'white',
                      color: '#64748b',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={handleCall}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; }}
                  >
                    <FaPhone /> Call
                  </button>
                </div>
              </div>
            </div>
          </div>
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

              <button 
                onClick={() => setCallState('idle')}
                style={{
                  width: '100%', padding: '14px', background: emerald, color: 'white',
                  border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '0.95rem',
                  cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.15)'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#047857'}
                onMouseLeave={e => e.currentTarget.style.background = emerald}
              >
                Close Summary
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(5, 150, 105, 0.4); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(5, 150, 105, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(5, 150, 105, 0); }
        }
        @keyframes bounceWave {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
      `}</style>
      <Footer />
    </>
  );
};

export default DoctorDetail;
