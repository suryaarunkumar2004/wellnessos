import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaVideo, FaMicrophone, FaMicrophoneSlash, 
  FaVideoSlash, FaDesktop, FaComment, FaPhoneSlash, 
  FaClock, FaUserMd, FaCalendarCheck, FaCheckCircle, 
  FaUsers, FaChartLine, FaPrescription, 
  FaRecordVinyl, FaExpand, FaCompress,
  FaCog, FaSpinner,
  FaCircle, FaCalendarAlt, FaStethoscope,
  FaClipboardList, FaNotesMedical, FaStar, FaShieldAlt, FaLock,
  FaSignal, FaSmile, FaHeart, FaRegHeart, FaPlus, FaTrash, FaDownload, FaTv,
  FaArrowLeft
} from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useToast } from '../../contexts/ToastContext';

const VideoConsultation = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Safe toast setup
  const toastContext = useToast();
  const showToast = toastContext.showToast || toastContext.addToast;

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldDark = '#047857';

  // Read consultation origin: 'telehealth' or 'doctors'
  const from = location.state?.from || 'doctors';

  // State
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [quality, setQuality] = useState('HD');
  const [layout, setLayout] = useState('grid');
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [showPrescription, setShowPrescription] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [callQuality] = useState('Excellent');
  const [handRaised, setHandRaised] = useState(false);
  const [showEndCallConfirm, setShowEndCallConfirm] = useState(false);
  const [backgroundBlur, setBackgroundBlur] = useState(false);
  
  // Premium additions states
  const [videoFilter, setVideoFilter] = useState('none'); // 'none', 'warm', 'cool', 'high-contrast'
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false);
  const [diagnosticsResults, setDiagnosticsResults] = useState(null);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState([
    { time: 2, speaker: 'doctor', text: 'Hello! I am reviewing your cardiology vitals now.' },
    { time: 6, speaker: 'doctor', text: 'How have you been feeling since yesterday?' },
    { time: 12, speaker: 'patient', text: 'I felt some light palpitations during my walk.' }
  ]);
  const [showTranscript, setShowTranscript] = useState(true);
  
  // Custom Prescription builder
  const [rxList, setRxList] = useState([
    { id: 1, drug: 'Metformin 500mg', dose: '1x daily', duration: '30 Days', route: 'WellNest Home Delivery' }
  ]);
  const [rxDrug, setRxDrug] = useState('Metformin 500mg');
  const [rxDose, setRxDose] = useState('1x daily');
  const [rxDuration, setRxDuration] = useState('30 Days');
  const [rxRoute, setRxRoute] = useState('WellNest Home Delivery');

  const [messages, setMessages] = useState([
    { id: 1, sender: 'doctor', text: 'Hello! How are you feeling today?', time: '2:30 PM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef(null);
  const canvasRef = useRef(null); // Vitals ECG plotter

  useEffect(() => {
    const doctor = location.state?.doctor;
    const defaultDoctor = {
      id: appointmentId || 1,
      name: doctor?.name || 'Dr. Emily Carter',
      specialty: doctor?.specialty || 'Cardiology',
      rating: doctor?.rating || 4.9,
      image: doctor?.image || 'https://randomuser.me/api/portraits/women/1.jpg'
    };
    setAppointment({
      id: defaultDoctor.id,
      doctorName: defaultDoctor.name,
      doctorSpecialty: defaultDoctor.specialty,
      doctorImage: defaultDoctor.image,
      patientName: 'You',
      appointmentDate: new Date().toISOString().split('T')[0],
      appointmentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setLoading(false);
  }, [appointmentId, location.state]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isCallActive) {
        setTimeElapsed(prev => {
          const nextTime = prev + 1;
          // Add automated live transcripts in real time
          if (nextTime === 18) {
            setLiveTranscript(t => [...t, { time: 18, speaker: 'doctor', text: 'Your current ECG waves look stable.' }]);
          } else if (nextTime === 24) {
            setLiveTranscript(t => [...t, { time: 24, speaker: 'doctor', text: 'I am configuring Metformin dosage adjust. Check e-Prescription panel.' }]);
          } else if (nextTime === 32) {
            setLiveTranscript(t => [...t, { time: 32, speaker: 'patient', text: 'Thank you Doctor, that sounds reassuring.' }]);
          }
          return nextTime;
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isCallActive]);

  // Vitals ECG canvas drawer loop (LIGHT MODE)
  useEffect(() => {
    let animationId;
    if (isCallActive && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let x = 0;
      const yMid = canvas.height / 2;
      const points = [];
      const speed = 2;
      
      const draw = () => {
        // Clean white background for Light Mode
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid lines in light emerald/gray
        ctx.strokeStyle = 'rgba(5, 150, 105, 0.08)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 20) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += 20) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(canvas.width, i);
          ctx.stroke();
        }

        // ECG Wave logic (Vibrant Emerald trace line)
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(5, 150, 105, 0.4)';
        ctx.beginPath();

        // Advance line x position
        x = (x + speed) % canvas.width;
        
        // Calculate new ECG peak point
        let y = yMid;
        const phase = (x / 80) % 1; // repeat pulse cycle
        if (phase > 0.1 && phase < 0.15) {
          y = yMid - 10; // P wave
        } else if (phase >= 0.15 && phase < 0.2) {
          y = yMid;
        } else if (phase >= 0.2 && phase < 0.22) {
          y = yMid + 15; // Q
        } else if (phase >= 0.22 && phase < 0.25) {
          y = yMid - 45; // R peak
        } else if (phase >= 0.25 && phase < 0.28) {
          y = yMid + 25; // S
        } else if (phase >= 0.28 && phase < 0.32) {
          y = yMid;
        } else if (phase >= 0.32 && phase < 0.42) {
          y = yMid - 15; // T wave
        }

        points.push({ x, y });
        if (points.length > canvas.width / speed) {
          points.shift();
        }

        for (let i = 0; i < points.length; i++) {
          const pt = points[i];
          if (i === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            // Prevent drawing line wrap line
            if (points[i].x > points[i-1].x) {
              ctx.lineTo(pt.x, pt.y);
            } else {
              ctx.moveTo(pt.x, pt.y);
            }
          }
        }
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
        
        animationId = requestAnimationFrame(draw);
      };
      
      draw();
    }
    return () => cancelAnimationFrame(animationId);
  }, [isCallActive, showStats]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleEndCall = () => setShowEndCallConfirm(true);
  const confirmEndCall = () => {
    setIsCallActive(false);
    setShowEndCallConfirm(false);
    if (showToast) {
      showToast('Consultation session archived.', 'info');
    }
    setTimeout(() => {
      navigate(from === 'telehealth' ? '/telehealth' : '/doctors');
    }, 1500);
  };
  const cancelEndCall = () => setShowEndCallConfirm(false);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOff(!isVideoOff);
  const toggleRecording = () => { 
    setIsRecording(!isRecording); 
    if (showToast) {
      showToast(isRecording ? 'Video recording stopped.' : 'Consultation recording active.', isRecording ? 'info' : 'success');
    }
  };
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { 
        id: Date.now(), 
        sender: 'patient', 
        text: newMessage, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
      setNewMessage('');
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  // Add drug prescription
  const handleAddRx = () => {
    const newRx = {
      id: Date.now(),
      drug: rxDrug,
      dose: rxDose,
      duration: rxDuration,
      route: rxRoute
    };
    setRxList([...rxList, newRx]);
    if (showToast) showToast(`${rxDrug} prescription added.`, 'success');
  };

  // Delete drug prescription
  const handleDeleteRx = (id) => {
    setRxList(rxList.filter(rx => rx.id !== id));
    if (showToast) showToast('Medication item removed.', 'info');
  };

  // Run hardware test check
  const runHardwareDiagnostics = () => {
    setDiagnosticsRunning(true);
    setTimeout(() => {
      setDiagnosticsResults({
        camera: 'Webcam active (1080p @ 30fps) - OK',
        mic: 'Microphone level (-14dB input gain) - OK',
        speakers: 'Speaker channel output responsive - OK',
        network: `Latency: 14ms (Jitter: 2.1ms) - Excellent`
      });
      setDiagnosticsRunning(false);
      if (showToast) showToast('Hardware diagnostics run complete.', 'success');
    }, 2000);
  };

  const getFilterStyle = () => {
    let filter = '';
    if (backgroundBlur) filter += 'blur(10px) ';
    if (videoFilter === 'warm') filter += 'sepia(0.2) contrast(1.1) ';
    if (videoFilter === 'cool') filter += 'saturate(1.2) hue-rotate(10deg) ';
    if (videoFilter === 'high-contrast') filter += 'contrast(1.3) ';
    return filter || 'none';
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <FaSpinner style={{ fontSize: '3rem', color: emerald, animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#64748b', marginTop: '16px' }}>Loading consultation room...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div style={{ background: '#f8fafc', color: '#1e293b', fontFamily: "'Inter', sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ display: 'flex', flex: 1, paddingTop: '80px', minHeight: 'calc(100vh - 80px)', flexWrap: 'wrap' }}>
        
        {/* Main Video Section */}
        <div style={{ flex: 2, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '400px' }}>
          
          {/* Header Card (Distinguished Telehealth vs Doctor Call in light mode) */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '16px 24px',
            border: '1px solid #cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: emeraldLight, color: emerald, padding: '10px', borderRadius: '12px' }}>
                {from === 'telehealth' ? <FaTv size={20} /> : <FaUserMd size={20} />}
              </div>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  {from === 'telehealth' ? 'WellNest Telehealth Consultation Hub' : 'Doctor Virtual Consultation Room'}
                </h2>
                <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0 0', fontWeight: '500' }}>
                  {from === 'telehealth' ? 'Premium Virtual Care Desk' : `Secure consultation with ${appointment?.doctorName}`}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate(from === 'telehealth' ? '/telehealth' : '/doctors')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: 'white',
                color: '#475569',
                fontWeight: '700',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = emerald; e.currentTarget.style.color = emerald; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#475569'; }}
            >
              <FaArrowLeft /> {from === 'telehealth' ? 'Back to Telehealth' : 'Back to Doctors'}
            </button>
          </div>

          {/* Video Grid */}
          <div style={{ 
            flex: 1, 
            display: 'grid', 
            gridTemplateColumns: layout === 'grid' ? (isCallActive ? '1fr 1fr' : '1fr') : '2fr 1fr',
            gap: '16px',
            minHeight: '380px'
          }}>
            {/* Doctor Video frame */}
            <div style={{ 
              background: '#e2e8f0', 
              borderRadius: '24px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              position: 'relative', 
              border: '1px solid #cbd5e1',
              overflow: 'hidden'
            }}>
              {isCallActive ? (
                <>
                  <img 
                    src={appointment?.doctorImage} 
                    alt={appointment?.doctorName} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      opacity: 0.95
                    }} 
                  />
                  {/* Doctor Info card overlay */}
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '16px', 
                    left: '16px', 
                    background: 'rgba(255, 255, 255, 0.9)', 
                    backdropFilter: 'blur(10px)',
                    padding: '8px 16px', 
                    borderRadius: '16px',
                    border: '1px solid #cbd5e1'
                  }}>
                    <h4 style={{ color: '#0f172a', margin: 0, fontSize: '0.92rem', fontWeight: '800' }}>{appointment?.doctorName}</h4>
                    <p style={{ color: emerald, margin: '2px 0 0 0', fontSize: '0.75rem', fontWeight: '700' }}>{appointment?.doctorSpecialty}</p>
                  </div>
                  
                  <div style={{ 
                    position: 'absolute', 
                    top: '16px', 
                    right: '16px', 
                    background: '#ef4444', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.7rem', 
                    color: 'white',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <FaCircle style={{ fontSize: '0.5rem' }} className="animate-pulse" /> LIVE STREAM
                  </div>
                  <Footer />
      </>
              ) : (
                <div style={{ textAlign: 'center', color: '#ef4444' }}>
                  <FaPhoneSlash style={{ fontSize: '3rem', marginBottom: '12px' }} />
                  <p style={{ fontWeight: '700' }}>Consultation Finished</p>
                </div>
              )}
            </div>

            {/* Patient Video frame */}
            <div style={{ 
              background: '#e2e8f0', 
              borderRadius: '24px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              position: 'relative', 
              border: '1px solid #cbd5e1',
              overflow: 'hidden'
            }}>
              {isCallActive && !isVideoOff ? (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  {/* Simulated Patient Camera stream using custom style filter */}
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    filter: getFilterStyle(),
                    transition: 'all 0.3s'
                  }}>
                    <div style={{ textAlign: 'center', color: emeraldDark }}>
                      <span style={{ fontSize: '3.5rem', fontWeight: '800' }}>Y</span>
                      <p style={{ margin: '8px 0 0 0', fontSize: '0.9rem', fontWeight: '700' }}>You (Patient Video)</p>
                    </div>
                  </div>

                  <div style={{ 
                    position: 'absolute', 
                    bottom: '16px', 
                    left: '16px', 
                    background: 'rgba(255, 255, 255, 0.9)', 
                    backdropFilter: 'blur(10px)',
                    padding: '6px 12px', 
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    color: '#1e293b',
                    border: '1px solid #cbd5e1'
                  }}>
                    {isMuted ? '🔇 Muted' : '🔊 Microphone Active'} • {quality}
                  </div>
                </div>
              ) : isCallActive && isVideoOff ? (
                <div style={{ textAlign: 'center', color: '#64748b' }}>
                  <FaVideoSlash style={{ fontSize: '3rem', marginBottom: '12px' }} />
                  <p style={{ fontWeight: '700' }}>Camera Off</p>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#ef4444' }}>
                  <FaPhoneSlash style={{ fontSize: '3rem', marginBottom: '12px' }} />
                  <p style={{ fontWeight: '700' }}>Consultation Finished</p>
                </div>
              )}
            </div>
          </div>

          {/* Vitals monitor real-time ECG screen (Light Mode Re-styled) */}
          <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '24px', padding: '16px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669' }}>
                <FaHeart className="animate-pulse" />
                <span style={{ fontSize: '0.82rem', fontWeight: '800', letterSpacing: '0.5px' }}>SECURE BIOMETRIC VITALS MONITOR</span>
              </div>
              <span style={{ fontSize: '0.75rem', background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: '6px', fontWeight: '700', border: '1px solid #a7f3d0' }}>ECG SENSOR: ONLINE</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 250px', gap: '16px', alignItems: 'center' }}>
              <canvas ref={canvasRef} width="600" height="90" style={{ width: '100%', height: '90px', background: 'white', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px', textAlign: 'center', border: '1px solid #cbd5e1' }}>
                  <div style={{ color: '#64748b', fontSize: '0.62rem', fontWeight: '800' }}>HEART RATE</div>
                  <div style={{ color: '#059669', fontSize: '1.1rem', fontWeight: '800', marginTop: '2px' }}>72 <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: '500' }}>bpm</span></div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px', textAlign: 'center', border: '1px solid #cbd5e1' }}>
                  <div style={{ color: '#64748b', fontSize: '0.62rem', fontWeight: '800' }}>BLOOD PRESS</div>
                  <div style={{ color: '#3b82f6', fontSize: '1.1rem', fontWeight: '800', marginTop: '2px' }}>120/80</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px', textAlign: 'center', border: '1px solid #cbd5e1' }}>
                  <div style={{ color: '#64748b', fontSize: '0.62rem', fontWeight: '800' }}>OXYGEN (SPO2)</div>
                  <div style={{ color: '#d97706', fontSize: '1.1rem', fontWeight: '800', marginTop: '2px' }}>98%</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px', textAlign: 'center', border: '1px solid #cbd5e1' }}>
                  <div style={{ color: '#64748b', fontSize: '0.62rem', fontWeight: '800' }}>RESPIRATION</div>
                  <div style={{ color: '#7c3aed', fontSize: '1.1rem', fontWeight: '800', marginTop: '2px' }}>16 <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: '500' }}>/m</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Bar (Light Mode) */}
          <div style={{ 
            padding: '16px 24px', 
            background: 'white', 
            borderRadius: '24px',
            border: '1px solid #cbd5e1', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '12px', 
            flexWrap: 'wrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
          }}>
            <button onClick={toggleMute} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #cbd5e1', background: isMuted ? '#fecaca' : '#f1f5f9', color: isMuted ? '#ef4444' : '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Toggle Microphone">{isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}</button>
            <button onClick={toggleVideo} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #cbd5e1', background: isVideoOff ? '#fecaca' : '#f1f5f9', color: isVideoOff ? '#ef4444' : '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Toggle Video">{isVideoOff ? <FaVideoSlash /> : <FaVideo />}</button>
            <button onClick={toggleRecording} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #cbd5e1', background: isRecording ? '#fee2e2' : '#f1f5f9', color: isRecording ? '#ef4444' : '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Record Consultation">{isRecording ? <FaRecordVinyl className="animate-pulse" style={{ color: '#ef4444' }} /> : <FaRecordVinyl />}</button>
            <button onClick={toggleFullscreen} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #cbd5e1', background: isFullscreen ? '#d1fae5' : '#f1f5f9', color: isFullscreen ? emeraldDark : '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Toggle Fullscreen">{isFullscreen ? <FaCompress /> : <FaExpand />}</button>
            <button onClick={() => setShowChat(!showChat)} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #cbd5e1', background: showChat ? '#d1fae5' : '#f1f5f9', color: showChat ? emeraldDark : '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Open Chat"><FaComment /></button>
            <button onClick={() => setShowPrescription(!showPrescription)} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #cbd5e1', background: showPrescription ? '#d1fae5' : '#f1f5f9', color: showPrescription ? emeraldDark : '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Prescription Panel"><FaPrescription /></button>
            <button onClick={() => setShowSettings(!showSettings)} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #cbd5e1', background: showSettings ? '#d1fae5' : '#f1f5f9', color: showSettings ? emeraldDark : '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Consultation Settings"><FaCog /></button>
            <button onClick={() => setShowDiagnostics(!showDiagnostics)} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #cbd5e1', background: showDiagnostics ? '#d1fae5' : '#f1f5f9', color: showDiagnostics ? emeraldDark : '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Diagnostics Check"><FaTv /></button>
            
            {/* Split End call & Go Back buttons */}
            <button onClick={handleEndCall} style={{ width: '52px', height: '52px', borderRadius: '50%', border: 'none', background: '#ef4444', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(239,68,68,0.25)' }} title="End Consultation"><FaPhoneSlash /></button>
          </div>

        </div>

        {/* Live Sidebar Panels (Light Mode Cards) */}
        <div style={{ width: '360px', padding: '20px 20px 20px 0', display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '320px' }}>
          
          {/* Header Time Card */}
          <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '16px 20px', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.82rem', fontWeight: '700' }}>
              <FaClock style={{ color: emerald }} />
              <span>SESSION ELAPSED</span>
            </div>
            <span style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: '800', color: '#059669' }}>{formatTime(timeElapsed)}</span>
          </div>

          {/* Live scrolling clinical transcription */}
          {showTranscript && (
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '24px', padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '12px' }}>
                <span style={{ color: '#0f172a', fontWeight: '800', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaClipboardList style={{ color: emerald }} /> Live Clinical Transcript
                </span>
                <span style={{ fontSize: '0.68rem', color: emerald, background: emeraldLight, padding: '2px 8px', borderRadius: '10px', fontWeight: '700', border: '1px solid #a7f3d0' }}>AUTO-TRANSCRIPT</span>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '240px' }}>
                {liveTranscript.map((t, idx) => (
                  <div key={idx} style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: t.speaker === 'doctor' ? emerald : '#3b82f6', fontWeight: '700', marginBottom: '2px' }}>
                      <span>{t.speaker === 'doctor' ? appointment?.doctorName : 'You'}</span>
                      <span style={{ color: '#94a3b8', fontSize: '0.68rem' }}>{formatTime(t.time)}</span>
                    </div>
                    <p style={{ margin: 0, color: '#475569' }}>{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat Side Drawer */}
          {showChat && (
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '24px', padding: '20px', display: 'flex', flexDirection: 'column', height: '290px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '12px' }}>
                <span style={{ color: '#0f172a', fontWeight: '800', fontSize: '0.88rem' }}>💬 Consultation Chat</span>
                <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
              </div>
              <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' }}>
                {messages.map(msg => (
                  <div key={msg.id} style={{ alignSelf: msg.sender === 'patient' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <div style={{
                      background: msg.sender === 'patient' ? emerald : '#f1f5f9',
                      color: msg.sender === 'patient' ? 'white' : '#1e293b',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      fontSize: '0.82rem',
                      fontWeight: '500'
                    }}>{msg.text}</div>
                    <span style={{ fontSize: '0.62rem', color: '#94a3b8', display: 'block', textAlign: msg.sender === 'patient' ? 'right' : 'left', marginTop: '2px' }}>{msg.time}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)} 
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  style={{ flex: 1, padding: '8px 12px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', color: '#1e293b', fontSize: '0.82rem', outline: 'none' }}
                />
                <button onClick={handleSendMessage} style={{ padding: '8px 14px', background: emerald, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem' }}>Send</button>
              </div>
            </div>
          )}

          {/* e-Prescription Modal Panel */}
          {showPrescription && (
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '12px' }}>
                <span style={{ color: '#0f172a', fontWeight: '800', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaPrescription style={{ color: emerald }} /> e-Prescription Wizard
                </span>
                <button onClick={() => setShowPrescription(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
              </div>
              
              {/* Prescriptions list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                {rxList.map(rx => (
                  <div key={rx.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px 12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ color: '#1e293b', fontSize: '0.8rem', fontWeight: '700' }}>{rx.drug}</div>
                      <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '2px' }}>{rx.dose} • {rx.duration} • <span style={{ color: emerald, fontWeight: '600' }}>{rx.route}</span></div>
                    </div>
                    <button onClick={() => handleDeleteRx(rx.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><FaTrash size={12} /></button>
                  </div>
                ))}
              </div>

              {/* Add Prescription form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <select value={rxDrug} onChange={e => setRxDrug(e.target.value)} style={{ padding: '8px', background: 'white', color: '#1e293b', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.8rem' }}>
                  <option value="Metformin 500mg">Metformin 500mg (Insulin Control)</option>
                  <option value="Lisinopril 10mg">Lisinopril 10mg (Hypertension)</option>
                  <option value="Amoxicillin 250mg">Amoxicillin 250mg (Antibiotic)</option>
                  <option value="Atorvastatin 20mg">Atorvastatin 20mg (Cholesterol)</option>
                </select>
                <select value={rxDose} onChange={e => setRxDose(e.target.value)} style={{ padding: '8px', background: 'white', color: '#1e293b', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.8rem' }}>
                  <option value="1x daily">1x Daily (Morning)</option>
                  <option value="2x daily">2x Daily (Morning/Evening)</option>
                  <option value="3x daily">3x Daily (Meals)</option>
                </select>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" value={rxDuration} onChange={e => setRxDuration(e.target.value)} placeholder="e.g. 7 Days" style={{ flex: 1, padding: '8px', background: 'white', color: '#1e293b', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.8rem' }} />
                  <button onClick={handleAddRx} style={{ background: emerald, color: 'white', border: 'none', borderRadius: '8px', padding: '0 16px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }}>Add</button>
                </div>
                <button 
                  onClick={() => { if (showToast) showToast('Prescription PDF dispatch initiated.', 'success'); }}
                  style={{ marginTop: '10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <FaDownload /> Download Rx PDF
                </button>
              </div>
            </div>
          )}

          {/* Consultation Settings Drawer */}
          {showSettings && (
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '12px' }}>
                <span style={{ color: '#0f172a', fontWeight: '800', fontSize: '0.88rem' }}>⚙️ Audio/Video Controls</span>
                <button onClick={() => setShowSettings(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Video Quality</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['SD', 'HD', 'FHD', '4K'].map(q => (
                      <button key={q} onClick={() => { setQuality(q); if (showToast) showToast(`Video set to ${q}`, 'info'); }} style={{ flex: 1, padding: '4px', background: quality === q ? emerald : '#f1f5f9', color: quality === q ? 'white' : '#475569', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.72rem', cursor: 'pointer', fontWeight: '700' }}>{q}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Camera Filters</label>
                  <select value={videoFilter} onChange={e => setVideoFilter(e.target.value)} style={{ width: '100%', padding: '8px', background: 'white', color: '#1e293b', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.8rem' }}>
                    <option value="none">Standard Feed</option>
                    <option value="warm">Warm Contrast sepia</option>
                    <option value="cool">Cool saturation feed</option>
                    <option value="high-contrast">High Contrast Mode</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#1e293b', fontSize: '0.8rem', fontWeight: '700' }}>Blur Background</span>
                  <input type="checkbox" checked={backgroundBlur} onChange={e => setBackgroundBlur(e.target.checked)} style={{ accentColor: emerald, width: '18px', height: '18px', cursor: 'pointer' }} />
                </div>
              </div>
            </div>
          )}

          {/* Diagnostics Panel */}
          {showDiagnostics && (
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '24px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '12px' }}>
                <span style={{ color: '#0f172a', fontWeight: '800', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaShieldAlt style={{ color: emerald }} /> Hardware Diagnostics
                </span>
                <button onClick={() => setShowDiagnostics(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
              </div>

              {diagnosticsRunning ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <FaSpinner style={{ fontSize: '2rem', color: emerald, animation: 'spin 1s linear infinite' }} />
                  <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '10px' }}>Analyzing peripheral channels...</p>
                </div>
              ) : diagnosticsResults ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
                  <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.62rem', fontWeight: '700' }}>WEBCAM DRIVER</span>
                    <span style={{ color: '#059669', fontWeight: '700' }}>{diagnosticsResults.camera}</span>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.62rem', fontWeight: '700' }}>MICROPHONE FEED</span>
                    <span style={{ color: '#059669', fontWeight: '700' }}>{diagnosticsResults.mic}</span>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.62rem', fontWeight: '700' }}>AUDIO OUTPUT CHANNEL</span>
                    <span style={{ color: '#059669', fontWeight: '700' }}>{diagnosticsResults.speakers}</span>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.62rem', fontWeight: '700' }}>NETWORK QUALITY</span>
                    <span style={{ color: '#059669', fontWeight: '700' }}>{diagnosticsResults.network}</span>
                  </div>
                  <button onClick={runHardwareDiagnostics} style={{ border: 'none', background: emerald, color: 'white', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem', marginTop: '8px' }}>Rerun Tests</button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '10px' }}>
                  <p style={{ color: '#475569', fontSize: '0.8rem', marginBottom: '14px', lineHeight: '1.4' }}>Diagnose mic, speaker, and camera stability before the clinical session.</p>
                  <button onClick={runHardwareDiagnostics} style={{ border: 'none', background: emerald, color: 'white', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem' }}>Run Diagnostics Check</button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* End Call Confirmation Dialog Overlay */}
      {showEndCallConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            border: '1px solid #cbd5e1',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🩺</div>
            <h3 style={{ color: '#0f172a', marginBottom: '8px', fontWeight: '800' }}>End Consultation?</h3>
            <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '0.88rem', lineHeight: '1.4' }}>Are you sure you want to end this clinical consultation?</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={cancelEndCall} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', background: 'transparent', color: '#64748b', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>Cancel</button>
              <button onClick={confirmEndCall} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: '#ef4444', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>End Call</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
};

export default VideoConsultation;
