import React, { useState, useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import {
  Loader2, User, Edit2, Save, X, Phone, Calendar, Globe, MapPin, Smile,
  Heart, Shield, Plus, Trash, FileText, Download, Upload, ShieldAlert,
  Users, Award, CheckCircle2, ChevronRight, UserPlus, Eye,
  Activity, Zap, Star, TrendingUp, Briefcase, Clock, Coffee,
  Droplet, Moon, Sun, AlertCircle, Printer, Share2, QrCode
} from 'lucide-react';
import CustomDropdown from '../../components/CustomDropdown';
import './Profile.css';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  // Tabs
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Profile Metrics
  const [profileMetrics, setProfileMetrics] = useState({
    steps: 0,
    water: 0,
    sleep: 0,
    heartRate: 0,
    streak: 0,
    totalRecords: 0,
    avgHealthScore: 0,
    daysWith10kSteps: 0,
    latestWeight: 0
  });

  // Edit form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  // Medical Passport states
  const [medicalPassport, setMedicalPassport] = useState({
    bloodType: '',
    allergies: '',
    chronicConditions: '',
    surgeries: '',
    primaryPhysician: '',
    insuranceProvider: '',
    subscriberId: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    organDonor: false
  });

  // Family Members
  const [familyMembers, setFamilyMembers] = useState([]);
  const [newFamilyName, setNewFamilyName] = useState('');
  const [newFamilyRelation, setNewFamilyRelation] = useState('Spouse');
  const [newFamilyAge, setNewFamilyAge] = useState('');
  const [newFamilyBlood, setNewFamilyBlood] = useState('O+');

  // Documents
  const [documents, setDocuments] = useState([]);
  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('Lab Result');

  // ========== LOAD USER DATA ==========
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setDob(user.dob || '');
      setGender(user.gender || '');
      setAddress(user.address || '');
      setCity(user.city || '');
      setCountry(user.country || '');
    }
  }, [user]);

  // ========== LOAD ALL DATA FROM BACKEND ==========
  useEffect(() => {
    if (user?.id) {
      loadMedicalPassport();
      loadFamilyMembers();
      loadDocuments();
      loadHealthMetrics();
    }
  }, [user]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // ========== MEDICAL PASSPORT API ==========
  const loadMedicalPassport = async () => {
    try {
      const response = await fetch(`/api/medical-passport/${user.id}`, {
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success && result.data) {
        setMedicalPassport(result.data);
      }
    } catch (error) {
      console.error('Error loading medical passport:', error);
    }
  };

  const handleSaveMedical = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/medical-passport/${user.id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(medicalPassport)
      });
      const result = await response.json();
      if (result.success) {
        addToast('Medical passport saved successfully!', 'success');
      } else {
        addToast(result.error || 'Failed to save medical passport', 'error');
      }
    } catch (error) {
      addToast('Error saving medical passport', 'error');
    }
    setLoading(false);
  };

  // ========== FAMILY MEMBERS API ==========
  const loadFamilyMembers = async () => {
    try {
      const response = await fetch(`/api/family/${user.id}`, {
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success) {
        setFamilyMembers(result.data || []);
      }
    } catch (error) {
      console.error('Error loading family members:', error);
    }
  };

  const handleAddFamily = async () => {
    if (!newFamilyName || !newFamilyAge) {
      addToast('Please enter family member details', 'warning');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: newFamilyName,
        relation: newFamilyRelation,
        age: parseInt(newFamilyAge),
        bloodGroup: newFamilyBlood
      };
      const response = await fetch(`/api/family/${user.id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.success) {
        addToast('Family member added successfully!', 'success');
        setNewFamilyName('');
        setNewFamilyAge('');
        await loadFamilyMembers();
      } else {
        addToast(result.error || 'Failed to add family member', 'error');
      }
    } catch (error) {
      addToast('Error adding family member', 'error');
    }
    setLoading(false);
  };

  const handleDeleteFamily = async (id) => {
    if (!window.confirm('Remove this family member?')) return;
    try {
      const response = await fetch(`/api/family/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success) {
        addToast('Family member removed', 'info');
        await loadFamilyMembers();
      }
    } catch (error) {
      addToast('Error removing family member', 'error');
    }
  };

  // ========== DOCUMENTS API ==========
  const loadDocuments = async () => {
    try {
      const response = await fetch(`/api/documents/${user.id}`, {
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success) {
        setDocuments(result.data || []);
      }
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const handleAddDoc = async () => {
    if (!newDocName) {
      addToast('Please enter document name', 'warning');
      return;
    }
    setLoading(true);
    try {
      const filename = newDocName.toLowerCase().endsWith('.pdf') ? newDocName : `${newDocName}.pdf`;
      const payload = {
        name: filename,
        category: newDocCategory,
        fileSize: `${Math.floor(Math.random() * 800) + 150} KB`
      };
      const response = await fetch(`/api/documents/${user.id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.success) {
        addToast('Document uploaded successfully!', 'success');
        setNewDocName('');
        await loadDocuments();
      } else {
        addToast(result.error || 'Failed to upload document', 'error');
      }
    } catch (error) {
      addToast('Error uploading document', 'error');
    }
    setLoading(false);
  };

  const handleDeleteDoc = async (id) => {
    if (!window.confirm('Delete this document?')) return;
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success) {
        addToast('Document deleted', 'info');
        await loadDocuments();
      }
    } catch (error) {
      addToast('Error deleting document', 'error');
    }
  };

  // ========== HEALTH METRICS API ==========
  const loadHealthMetrics = async () => {
    try {
      const response = await fetch(`/api/health-metrics/${user.id}/stats`, {
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success && result.stats) {
        setProfileMetrics({
          steps: result.stats.avgSteps || 0,
          water: result.stats.avgWaterMl ? result.stats.avgWaterMl / 1000 : 0,
          sleep: result.stats.avgSleep || 0,
          heartRate: result.stats.avgHeartRate || 0,
          streak: result.stats.streak || 0,
          totalRecords: result.stats.totalRecords || 0,
          avgHealthScore: result.stats.avgHealthScore || 0,
          daysWith10kSteps: result.stats.daysWith10kSteps || 0,
          latestWeight: result.stats.latestWeightKg || 0
        });
      }
    } catch (error) {
      console.error('Error loading health metrics:', error);
    }
  };

  // ========== USER PROFILE API ==========
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser({ name, email, phone, dob, gender, address, city, country });
      addToast('Personal information updated successfully', 'success');
      setEditMode(false);
    } catch (err) {
      addToast(err.message || 'Failed to update profile', 'error');
    }
    setLoading(false);
  };

  // ========== HELPER FUNCTIONS ==========
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="profile-page-wrapper">
          <div className="profile-glass-card" style={{ textAlign: 'center', padding: '40px', maxWidth: '400px', margin: '40px auto' }}>
            <Smile size={48} style={{ color: '#059669', marginBottom: '16px' }} />
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '20px' }}>
              Please log in to view your premium profile.
            </p>
            <Link to="/signup" className="profile-save-btn" style={{ display: 'inline-flex', textDecoration: 'none' }}>
              Log In / Sign Up
            </Link>
          </div>
        </div>
      </>
    );
  }

  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    const parts = fullName.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return fullName[0].toUpperCase();
  };

  const calculateCompletion = () => {
    let score = 0;
    if (user.name) score += 10;
    if (user.email) score += 10;
    if (user.phone) score += 10;
    if (user.dob) score += 10;
    if (user.gender) score += 5;
    if (user.address) score += 10;
    if (medicalPassport.bloodType) score += 10;
    if (medicalPassport.allergies) score += 5;
    if (medicalPassport.primaryPhysician) score += 5;
    if (medicalPassport.emergencyName) score += 5;
    if (familyMembers.length > 0) score += 10;
    if (documents.length > 0) score += 10;
    return Math.min(100, score);
  };

  const getRelationEmoji = (relation) => {
    const map = {
      'Father': '👨',
      'Mother': '👩',
      'Sister': '👧',
      'Brother': '👦',
      'Son': '👦',
      'Daughter': '👧',
      'Spouse': '��',
      'Husband': '👨',
      'Wife': '👩',
      'Grandfather': '👴',
      'Grandmother': '👵',
      'Uncle': '👨',
      'Aunt': '👩',
      'Cousin': '👨‍👩‍👧'
    };
    return map[relation] || '👤';
  };

  return (
    <>
      <Navbar />
      <div className="profile-page-wrapper" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px', background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)' }}>
        <div className="profile-container">

          {/* Left Sidebar Card */}
          <div className="profile-glass-card profile-sidebar-card" style={{ height: 'fit-content' }}>
            <div className="profile-avatar-sec" style={{ width: '100%' }}>
              <div className="profile-avatar-circle" style={{ margin: '0 auto 16px auto' }}>
                {getInitials(name)}
              </div>
              <h3 className="profile-sidebar-name" style={{ marginBottom: '4px' }}>{name}</h3>
              <span className="profile-sidebar-role" style={{ marginBottom: '8px' }}>🌟 WellNest Premium</span>
              <p className="profile-sidebar-email" style={{ marginBottom: '20px' }}>{email}</p>
            </div>

            {/* Profile Completion Meter */}
            <div style={{ width: '100%', marginBottom: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                <span>PROFILE COMPLETION</span>
                <span>{calculateCompletion()}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${calculateCompletion()}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '4px', transition: 'width 0.5s ease' }} />
              </div>
            </div>

            {/* Quick Health Stats Widget */}
            <div style={{ width: '100%', marginBottom: '20px', background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)', borderRadius: '16px', padding: '16px', border: '1px solid #a7f3d0' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: '800', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Health Overview</div>
              <div className="profile-stats-overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { label: 'Avg Steps', value: profileMetrics.steps ? Math.round(profileMetrics.steps).toLocaleString() : '0', icon: Activity, color: '#059669' },
                  { label: 'Heart Rate', value: profileMetrics.heartRate ? `${Math.round(profileMetrics.heartRate)} bpm` : '--', icon: Heart, color: '#ef4444' },
                  { label: 'Sleep', value: profileMetrics.sleep ? `${profileMetrics.sleep.toFixed(1)} hrs` : '--', icon: Zap, color: '#8b5cf6' },
                  { label: 'Streak', value: `${profileMetrics.streak || 0} days`, icon: Star, color: '#f59e0b' },
                  { label: 'Health Score', value: profileMetrics.avgHealthScore ? `${Math.round(profileMetrics.avgHealthScore)}/100` : '--', icon: TrendingUp, color: '#059669' },
                  { label: 'Records', value: `${profileMetrics.totalRecords || 0}`, icon: FileText, color: '#3b82f6' },
                ].map((stat, i) => (
                  <div key={i} style={{ background: 'white', borderRadius: '10px', padding: '10px', border: '1px solid #d1fae5' }}>
                    <stat.icon size={14} style={{ color: stat.color, marginBottom: '4px' }} />
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1e293b' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: '600' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Tabs list */}
            <div className="profile-navigation-tabs" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              {[
                { id: 'personal', label: 'Personal Details', icon: User },
                { id: 'medical', label: 'Medical Passport', icon: Heart },
                { id: 'family', label: 'Family Link', icon: Users },
                { id: 'vault', label: 'Health Vault', icon: FileText },
                { id: 'activity', label: 'Activity & Stats', icon: Activity },
                { id: 'benefits', label: 'Premium Benefits', icon: Award }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setEditMode(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    background: activeTab === tab.id ? '#ecfdf5' : 'transparent',
                    color: activeTab === tab.id ? '#059669' : '#475569',
                    fontWeight: '600',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    width: '100%'
                  }}
                  onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.background = '#f1f5f9'; }}
                  onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <tab.icon size={16} style={{ color: activeTab === tab.id ? '#059669' : '#64748b' }} />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight size={14} style={{ opacity: activeTab === tab.id ? 1 : 0.3 }} />
                </button>
              ))}
            </div>
            
            {/* Mobile Tabs Dropdown Selector */}
            <div className="profile-mobile-tabs-dropdown-container" style={{ width: '100%', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              <CustomDropdown
                options={['personal', 'medical', 'family', 'vault', 'activity', 'benefits']}
                value={activeTab}
                onChange={(val) => { setActiveTab(val); setEditMode(false); }}
                placeholder="Select Section"
                label="Select Section"
                labelMap={{
                  personal: '👤 Personal Details',
                  medical: '🩺 Medical Passport',
                  family: '👨‍👩‍👧‍👦 Family Link',
                  vault: '📁 Secure Health Vault',
                  activity: '📊 Activity & Stats',
                  benefits: '🌟 Premium Benefits'
                }}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Right Main Panel */}
          <div className="profile-glass-card profile-details-card" style={{ minHeight: '520px' }}>

            {/* PERSONAL DETAILS TAB */}
            {activeTab === 'personal' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Personal Details</h2>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>
                      Manage your profile settings and personal information.
                    </p>
                  </div>
                  {!editMode && (
                    <button className="profile-edit-btn" onClick={() => setEditMode(true)} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                      <Edit2 size={14} /> Edit Profile
                    </button>
                  )}
                </div>

                {editMode ? (
                  <form onSubmit={handleSave} className="profile-edit-form">
                    <div className="profile-form-grid">
                      <label className="profile-field-label">
                        Full Name
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="profile-form-input" />
                      </label>
                      <label className="profile-field-label">
                        Email Address
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="profile-form-input" disabled />
                      </label>
                      <label className="profile-field-label">
                        Phone Number
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="profile-form-input" placeholder="+91 00000 00000" />
                      </label>
                      <label className="profile-field-label">
                        Date of Birth
                        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="profile-form-input" />
                      </label>
                      <label className="profile-field-label">
                        Gender
                        <CustomDropdown
                          options={['Male', 'Female', 'Other', 'Prefer not to say']}
                          value={gender}
                          onChange={setGender}
                          placeholder="Select Gender"
                          style={{ width: '100%', marginTop: '6px' }}
                        />
                      </label>
                      <label className="profile-field-label">
                        Country
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="profile-form-input" placeholder="India" />
                      </label>
                      <label className="profile-field-label">
                        City
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="profile-form-input" placeholder="Coimbatore" />
                      </label>
                      <label className="profile-field-label" style={{ gridColumn: 'span 2' }}>
                        Address
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="profile-form-input" placeholder="123 Wellness Blvd" />
                      </label>
                    </div>
                    <div className="profile-actions-sec">
                      <button type="submit" className="profile-save-btn" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save Changes
                      </button>
                      <button type="button" className="profile-cancel-btn" onClick={() => setEditMode(false)} disabled={loading}>
                        <X size={16} /> Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-info-grid">
                    <div className="profile-info-item">
                      <div className="info-icon-circle"><User size={18} /></div>
                      <div className="info-text-group">
                        <span className="info-label">Full Name</span>
                        <span className="info-data">{name || 'Not provided'}</span>
                      </div>
                    </div>
                    <div className="profile-info-item">
                      <div className="info-icon-circle"><Phone size={18} /></div>
                      <div className="info-text-group">
                        <span className="info-label">Phone Number</span>
                        <span className="info-data">{phone || 'Not provided'}</span>
                      </div>
                    </div>
                    <div className="profile-info-item">
                      <div className="info-icon-circle"><Calendar size={18} /></div>
                      <div className="info-text-group">
                        <span className="info-label">Date of Birth</span>
                        <span className="info-data">{dob || 'Not provided'}</span>
                      </div>
                    </div>
                    <div className="profile-info-item">
                      <div className="info-icon-circle"><Smile size={18} /></div>
                      <div className="info-text-group">
                        <span className="info-label">Gender</span>
                        <span className="info-data">{gender || 'Not provided'}</span>
                      </div>
                    </div>
                    <div className="profile-info-item" style={{ gridColumn: 'span 2' }}>
                      <div className="info-icon-circle"><MapPin size={18} /></div>
                      <div className="info-text-group">
                        <span className="info-label">Address</span>
                        <span className="info-data">
                          {address ? `${address}, ` : ''}
                          {city ? `${city}, ` : ''}
                          {country || ''}
                          {!address && !city && !country && 'Not provided'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* MEDICAL PASSPORT TAB */}
            {activeTab === 'medical' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Medical Passport</h2>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>
                      Your secure clinical identification badge for emergency practitioners.
                    </p>
                  </div>
                  <button className="profile-save-btn" onClick={handleSaveMedical} disabled={loading} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                    {loading ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />} Save Passport
                  </button>
                </div>

                {/* Emergency Medical ID Card */}
                <div style={{
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
                  borderRadius: '20px',
                  padding: '24px',
                  color: '#1e293b',
                  marginBottom: '24px',
                  boxShadow: '0 10px 30px rgba(5,150,105,0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid #a7f3d0'
                }}>
                  <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(5,150,105,0.04)', filter: 'blur(30px)' }} />
                  <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(239,68,68,0.02)', filter: 'blur(30px)' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #d1fae5', paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Heart size={20} style={{ color: '#ef4444', fill: '#ef4444' }} />
                      <span style={{ fontSize: '0.8rem', fontWeight: '800', letterSpacing: '1px', color: '#047857' }}>EMERGENCY MEDICAL ID</span>
                    </div>
                    <span style={{ fontSize: '0.65rem', background: '#d1fae5', color: '#065f46', padding: '2px 8px', borderRadius: '20px', fontWeight: '700' }}>ACTIVE PASSPORT</span>
                  </div>

                  <div className="emergency-id-grid" style={{ gap: '16px', alignItems: 'center' }}>
                    <div className="emergency-id-left" style={{ gap: '12px' }}>
                      <div>
                        <div style={{ fontSize: '0.6rem', color: '#475569', textTransform: 'uppercase', fontWeight: '600' }}>Full Name</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b' }}>{name || 'User'}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.6rem', color: '#475569', textTransform: 'uppercase', fontWeight: '600' }}>Blood Type</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ef4444' }}>{medicalPassport.bloodType || 'Not set'}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.6rem', color: '#475569', textTransform: 'uppercase', fontWeight: '600' }}>Allergies</div>
                        <div style={{ fontSize: '0.78rem', fontWeight: '600', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{medicalPassport.allergies || 'None'}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.6rem', color: '#475569', textTransform: 'uppercase', fontWeight: '600' }}>Chronic Conditions</div>
                        <div style={{ fontSize: '0.78rem', fontWeight: '600', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{medicalPassport.chronicConditions || 'None'}</div>
                      </div>
                      <div style={{ gridColumn: 'span 2' }}>
                        <div style={{ fontSize: '0.6rem', color: '#475569', textTransform: 'uppercase', fontWeight: '600' }}>Emergency Contact</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b' }}>
                          {medicalPassport.emergencyName ? `${medicalPassport.emergencyName} (${medicalPassport.emergencyRelation || 'N/A'})` : 'Not set'}
                          {medicalPassport.emergencyPhone && <span style={{ color: '#059669', fontWeight: '700', marginLeft: '8px' }}>{medicalPassport.emergencyPhone}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="emergency-id-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '120px' }}>
                      <div style={{
                        background: 'white',
                        padding: '8px',
                        borderRadius: '16px',
                        border: '2px solid #a7f3d0',
                        boxShadow: '0 4px 14px rgba(5,150,105,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100px',
                        height: '100px',
                        boxSizing: 'border-box'
                      }}>
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`WELLNESS-OS EMERGENCY PASSPORT\nName: ${name || 'User'}\nBlood Type: ${medicalPassport.bloodType || 'N/A'}\nAllergies: ${medicalPassport.allergies || 'None'}\nContact: ${medicalPassport.emergencyName || 'N/A'} ${medicalPassport.emergencyPhone || ''}`)}&color=0f172a&bgcolor=ffffff`}
                          alt="Emergency Medical Scannable QR Code"
                          style={{ width: '84px', height: '84px', borderRadius: '6px', objectFit: 'contain' }}
                        />
                      </div>
                      <span style={{ fontSize: '0.58rem', color: '#475569', marginTop: '8px', fontWeight: '800', letterSpacing: '0.5px' }}>SCAN IN EMERGENCY</span>
                      {medicalPassport.organDonor && (
                        <span style={{ fontSize: '0.58rem', color: '#059669', marginTop: '3px', fontWeight: '800' }}>❤️ Organ Donor</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="profile-form-grid" style={{ marginBottom: '24px' }}>
                  <div className="profile-field-label">
                    Blood Group
                    <input type="text" value={medicalPassport.bloodType || ''} onChange={(e) => setMedicalPassport({ ...medicalPassport, bloodType: e.target.value })} className="profile-form-input" placeholder="e.g. B+" />
                  </div>
                  <div className="profile-field-label">
                    Primary Physician
                    <input type="text" value={medicalPassport.primaryPhysician || ''} onChange={(e) => setMedicalPassport({ ...medicalPassport, primaryPhysician: e.target.value })} className="profile-form-input" placeholder="Dr. Name" />
                  </div>
                  <div className="profile-field-label">
                    Insurance Provider
                    <input type="text" value={medicalPassport.insuranceProvider || ''} onChange={(e) => setMedicalPassport({ ...medicalPassport, insuranceProvider: e.target.value })} className="profile-form-input" placeholder="Insurance Company" />
                  </div>
                  <div className="profile-field-label">
                    Subscriber ID
                    <input type="text" value={medicalPassport.subscriberId || ''} onChange={(e) => setMedicalPassport({ ...medicalPassport, subscriberId: e.target.value })} className="profile-form-input" placeholder="ID Number" />
                  </div>
                  <div className="profile-field-label" style={{ gridColumn: 'span 2' }}>
                    Allergies & Reactions
                    <input type="text" value={medicalPassport.allergies || ''} onChange={(e) => setMedicalPassport({ ...medicalPassport, allergies: e.target.value })} className="profile-form-input" placeholder="e.g. Penicillin, Peanuts" />
                  </div>
                  <div className="profile-field-label" style={{ gridColumn: 'span 2' }}>
                    Chronic Conditions
                    <input type="text" value={medicalPassport.chronicConditions || ''} onChange={(e) => setMedicalPassport({ ...medicalPassport, chronicConditions: e.target.value })} className="profile-form-input" placeholder="e.g. Asthma, Hypertension" />
                  </div>
                  <div className="profile-field-label" style={{ gridColumn: 'span 2' }}>
                    Past Surgeries
                    <input type="text" value={medicalPassport.surgeries || ''} onChange={(e) => setMedicalPassport({ ...medicalPassport, surgeries: e.target.value })} className="profile-form-input" placeholder="e.g. Appendectomy (2015)" />
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginTop: '16px' }}>
                  <h4 style={{ color: '#1e293b', fontSize: '0.95rem', fontWeight: '700', marginTop: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldAlert size={18} style={{ color: '#ef4444' }} /> Emergency Contact
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <label className="profile-field-label">
                      Contact Name
                      <input type="text" value={medicalPassport.emergencyName || ''} onChange={(e) => setMedicalPassport({ ...medicalPassport, emergencyName: e.target.value })} className="profile-form-input" placeholder="Name" />
                    </label>
                    <label className="profile-field-label">
                      Relationship
                      <input type="text" value={medicalPassport.emergencyRelation || ''} onChange={(e) => setMedicalPassport({ ...medicalPassport, emergencyRelation: e.target.value })} className="profile-form-input" placeholder="e.g. Spouse, Parent" />
                    </label>
                    <label className="profile-field-label">
                      Emergency Phone
                      <input type="text" value={medicalPassport.emergencyPhone || ''} onChange={(e) => setMedicalPassport({ ...medicalPassport, emergencyPhone: e.target.value })} className="profile-form-input" placeholder="Phone Number" />
                    </label>
                  </div>
                </div>

                <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    type="checkbox"
                    id="donor_toggle"
                    checked={medicalPassport.organDonor || false}
                    onChange={(e) => setMedicalPassport({ ...medicalPassport, organDonor: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#059669' }}
                  />
                  <label htmlFor="donor_toggle" style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600', cursor: 'pointer' }}>
                    Register as an Active Organ Donor
                  </label>
                </div>
              </>
            )}

            {/* FAMILY LINK TAB */}
            {activeTab === 'family' && (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Family Link</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>
                    Link family accounts to synchronize calendars and wellness statistics.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                  {familyMembers.map(member => (
                    <div key={member.id} style={{ border: '1px solid #e2e8f0', background: 'white', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                      <button
                        onClick={() => handleDeleteFamily(member.id)}
                        style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash size={14} />
                      </button>
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>
                        {getRelationEmoji(member.relation)}
                      </div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: '700', color: '#1e293b' }}>{member.name}</h4>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '8px' }}>{member.relation} • {member.age} yrs</div>
                      <div style={{ display: 'inline-flex', width: 'fit-content', background: '#f1f5f9', color: '#475569', fontSize: '0.7rem', fontWeight: '700', padding: '3px 8px', borderRadius: '6px' }}>
                        Blood: {member.bloodGroup || 'N/A'}
                      </div>
                    </div>
                  ))}

                  {familyMembers.length === 0 && (
                    <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', border: '2px dashed #cbd5e1', borderRadius: '16px', gridColumn: 'span 2' }}>
                      No family members linked yet.
                    </div>
                  )}
                </div>

                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ color: '#1e293b', fontSize: '0.95rem', fontWeight: '700', marginTop: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UserPlus size={18} style={{ color: '#059669' }} /> Add Family Member
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '20px', marginBottom: '16px' }}>
                    <label className="profile-field-label">
                      Name
                      <input type="text" value={newFamilyName} onChange={(e) => setNewFamilyName(e.target.value)} className="profile-form-input" placeholder="Name" />
                    </label>
                    <label className="profile-field-label">
                      Relation
                      <CustomDropdown
                        options={['Spouse', 'Son', 'Daughter', 'Father', 'Mother', 'Sister', 'Brother']}
                        value={newFamilyRelation}
                        onChange={setNewFamilyRelation}
                        placeholder="Relation"
                        style={{ width: '100%', marginTop: '6px' }}
                      />
                    </label>
                    <label className="profile-field-label">
                      Age
                      <input type="number" value={newFamilyAge} onChange={(e) => setNewFamilyAge(e.target.value)} className="profile-form-input" placeholder="Age" />
                    </label>
                    <label className="profile-field-label">
                      Blood Group
                      <CustomDropdown
                        options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
                        value={newFamilyBlood}
                        onChange={setNewFamilyBlood}
                        placeholder="Blood Group"
                        style={{ width: '100%', marginTop: '6px' }}
                      />
                    </label>
                  </div>
                  <button onClick={handleAddFamily} className="profile-save-btn" disabled={loading} style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                    {loading ? <Loader2 className="animate-spin" size={14} /> : <Plus size={14} />} Add Member
                  </button>
                </div>
              </>
            )}

            {/* HEALTH VAULT TAB */}
            {activeTab === 'vault' && (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Secure Health Vault</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>
                    HIPAA-compliant document storage for prescriptions and reports.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                  {documents.map(doc => (
                    <div key={doc.id} className="profile-vault-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ background: '#ecfdf5', color: '#059669', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FileText size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>{doc.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                            {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : ''}
                            {doc.fileSize && ` • ${doc.fileSize}`}
                            {doc.category && <span style={{ color: '#059669', fontWeight: '600', marginLeft: '4px' }}>• {doc.category}</span>}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => addToast(`Viewing: ${doc.name}`, 'info')} style={{ border: '1px solid #e2e8f0', background: 'white', borderRadius: '8px', color: '#475569', padding: '8px', cursor: 'pointer' }}>
                          <Eye size={14} />
                        </button>
                        <button onClick={() => addToast(`Downloading: ${doc.name}`, 'success')} style={{ border: '1px solid #e2e8f0', background: 'white', borderRadius: '8px', color: '#475569', padding: '8px', cursor: 'pointer' }}>
                          <Download size={14} />
                        </button>
                        <button onClick={() => handleDeleteDoc(doc.id)} style={{ border: '1px solid #ef4444', background: '#fef2f2', borderRadius: '8px', color: '#ef4444', padding: '8px', cursor: 'pointer' }}>
                          <Trash size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {documents.length === 0 && (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', border: '2px dashed #cbd5e1', borderRadius: '12px' }}>
                      No documents stored in vault.
                    </div>
                  )}
                </div>

                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ color: '#1e293b', fontSize: '0.95rem', fontWeight: '700', marginTop: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Upload size={18} style={{ color: '#059669' }} /> Upload Document
                  </h4>
                  <div className="profile-vault-upload-row" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
                    <input
                      type="text"
                      placeholder="Document Name"
                      value={newDocName}
                      onChange={(e) => setNewDocName(e.target.value)}
                      style={{ flex: 1, minWidth: '220px' }}
                      className="profile-form-input"
                    />
                    <CustomDropdown
                      options={['Lab Result', 'Prescription', 'Vaccine Record', 'Insurance', 'Health Report', 'Dental Record', 'Test Result', 'Other']}
                      value={newDocCategory}
                      onChange={setNewDocCategory}
                      placeholder="Category"
                      style={{ width: '180px' }}
                    />
                  </div>
                  <button onClick={handleAddDoc} className="profile-save-btn" disabled={loading} style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                    {loading ? <Loader2 className="animate-spin" size={14} /> : <Plus size={14} />} Upload Document
                  </button>
                </div>
              </>
            )}

            {/* ACTIVITY & STATS TAB */}
            {activeTab === 'activity' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Activity & Stats</h2>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>
                      Monitor your health metrics and wellness progress.
                    </p>
                  </div>
                  <span style={{ fontSize: '0.75rem', background: '#059669', color: 'white', padding: '6px 14px', borderRadius: '20px', fontWeight: '700' }}>
                    {profileMetrics.totalRecords || 0} Records
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                  {[
                    { icon: Heart, label: 'Heart Rate', value: profileMetrics.heartRate ? `${Math.round(profileMetrics.heartRate)} bpm` : '--', sub: 'Avg', color: '#ef4444', bg: '#fef2f2', border: '#fecaca' },
                    { icon: Activity, label: 'Avg Steps', value: profileMetrics.steps ? Math.round(profileMetrics.steps).toLocaleString() : '--', sub: 'Daily', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
                    { icon: Zap, label: 'Sleep', value: profileMetrics.sleep ? `${profileMetrics.sleep.toFixed(1)} hrs` : '--', sub: 'Avg', color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe' },
                    { icon: TrendingUp, label: 'Streak', value: `${profileMetrics.streak || 0} days`, sub: 'Current', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
                    { icon: Award, label: 'Health Score', value: profileMetrics.avgHealthScore ? `${Math.round(profileMetrics.avgHealthScore)}/100` : '--', sub: 'Avg', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
                    { icon: Star, label: '10k+ Days', value: `${profileMetrics.daysWith10kSteps || 0}`, sub: 'Total', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
                  ].map((card, i) => (
                    <div key={i} style={{ background: card.bg, border: `1px solid ${card.border}`, borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
                      <card.icon size={16} style={{ color: card.color, marginBottom: '6px' }} />
                      <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '600' }}>{card.label}</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e293b' }}>{card.value}</div>
                      <div style={{ fontSize: '0.6rem', color: card.color, fontWeight: '600' }}>{card.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="profile-streak-card" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)', border: '1px solid #a7f3d0', borderRadius: '16px', padding: '20px', color: '#064e3b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#047857', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Current Wellness Streak</div>
                    <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#059669', lineHeight: 1.1 }}>{profileMetrics.streak || 0} <span style={{ fontSize: '1rem', fontWeight: '600', color: '#047857' }}>days</span></div>
                    <div style={{ fontSize: '0.78rem', color: '#047857', marginTop: '4px' }}>Keep tracking daily!</div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end' }}>
                    {[...Array(7)].map((_, i) => (
                      <div key={i} style={{ width: '10px', height: `${20 + i * 8}px`, background: i < (profileMetrics.streak || 0) % 7 ? '#059669' : '#d1fae5', borderRadius: '4px 4px 0 0' }} />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* PREMIUM BENEFITS TAB */}
            {activeTab === 'benefits' && (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Premium Benefits</h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>
                    Exclusive features for premium members.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  {[
                    { title: '💬 Zero-Fee Telehealth', desc: 'Unlimited video consults with specialists.' },
                    { title: '📦 Priority Rx Delivery', desc: 'Home deliveries within 4 hours.' },
                    { title: '🔒 Data Sharing Controls', desc: 'Full control over your private records.' },
                    { title: '👨‍👩‍👧‍👦 Family Care Lines', desc: 'Attach up to 6 dependents to your plan.' },
                    { title: '🏥 Digital Medical Passport', desc: 'Your clinical badge for emergencies.' },
                    { title: '🔬 Lab Diagnostics Sync', desc: 'Direct results to your Health Vault.' }
                  ].map((benefit, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', display: 'flex', gap: '12px' }}>
                      <div style={{ color: '#059669', paddingTop: '2px' }}>
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: '700', color: '#1e293b' }}>{benefit.title}</h4>
                        <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b', lineHeight: '1.4' }}>{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      </div>
      <Footer />
      <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .profile-page-wrapper,
        .profile-page-wrapper * {
          box-sizing: border-box !important;
        }

        .profile-sidebar-card {
          position: relative !important;
          z-index: 10 !important;
        }
        .profile-details-card {
          position: relative !important;
          z-index: 1 !important;
        }

        .grid-span-2 {
          grid-column: span 2;
        }

        .profile-mobile-tabs-dropdown-container {
          display: none;
        }

        @media (max-width: 991px) {
          .profile-container {
            grid-template-columns: 1fr !important;
          }
          .grid-span-2 {
            grid-column: span 1 !important;
          }
          .profile-navigation-tabs {
            display: none !important;
          }
          .profile-mobile-tabs-dropdown-container {
            display: block !important;
          }
        }

        @media (max-width: 640px) {
          .emergency-id-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .emergency-id-right {
            border-left: none !important;
            border-top: 1px solid #d1fae5 !important;
            padding-left: 0 !important;
            padding-top: 16px !important;
            width: 100% !important;
          }
        }

        @media (max-width: 576px) {
          .profile-glass-card {
            padding: 16px !important;
          }
          .profile-container {
            padding: 0 12px !important;
            gap: 16px !important;
          }
          .profile-info-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .profile-info-grid > * {
            grid-column: span 1 !important;
          }
          .profile-vault-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .profile-vault-item > div:last-child {
            width: 100% !important;
            justify-content: flex-end !important;
          }
          .profile-vault-upload-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .profile-vault-upload-row > * {
            width: 100% !important;
          }
          .profile-streak-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .emergency-id-left {
            grid-template-columns: 1fr !important;
          }
          .profile-stats-overview-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
