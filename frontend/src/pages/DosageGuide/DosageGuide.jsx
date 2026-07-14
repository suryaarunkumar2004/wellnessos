import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, FaHeart, FaRegHeart, FaBookmark, FaRegBookmark,
  FaShoppingCart, FaStar, FaClock, FaPills, FaUserMd,
  FaFilter, FaArrowLeft, FaArrowRight, FaInfoCircle,
  FaPlus, FaMinus, FaPrescription, FaChartLine,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useBookmarks } from '../../contexts/BookmarksContext';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { drugDatabase } from '../../services/drugDatabase';

const DosageGuide = () => {
  const navigate = useNavigate();
  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldDark = '#047857';
  
  const [drugs, setDrugs] = useState([]);
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [currentPage, setCurrentPage] = useState(1);
  const [drugsPerPage] = useState(12);
  
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const { addToCart, cartItems } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    setDrugs(drugDatabase);
    setFilteredDrugs(drugDatabase);
    const cats = ['All', ...new Set(drugDatabase.map(d => d.category).filter(Boolean))];
    setCategories(cats);
    setLoading(false);
  }, []);

  useEffect(() => {
    let result = [...drugs];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(d => 
        d.name?.toLowerCase().includes(term) ||
        d.category?.toLowerCase().includes(term) ||
        (d.indications && d.indications.some(i => i.toLowerCase().includes(term))) ||
        d.manufacturer?.toLowerCase().includes(term)
      );
    }
    if (selectedCategory !== 'All') {
      result = result.filter(d => d.category === selectedCategory);
    }
    setFilteredDrugs(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, drugs]);

  const handleAddToCart = (drug) => {
    addToCart({
      id: drug.id,
      name: drug.name,
      price: parseFloat(drug.price) || 299,
      type: 'drug'
    });
    if (showToast) showToast(`${drug.name} added to cart!`, 'success');
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Pain Relief': '#ef4444',
      'Antibiotics': '#8b5cf6',
      'Cardiovascular': '#ec4899',
      'Diabetes': '#059669',
      'Respiratory': '#06b6d4',
      'Gastrointestinal': '#f59e0b',
      'Psychiatry': '#7c3aed',
      'Antihistamine': '#3b82f6',
      'Hormones': '#db2777',
      'Oncology': '#dc2626',
      'Dermatology': '#ec4899',
      'Nervous System': '#7c3aed'
    };
    return colors[category] || '#64748b';
  };

  const totalPages = Math.ceil(filteredDrugs.length / drugsPerPage);
  const indexOfLastDrug = currentPage * drugsPerPage;
  const indexOfFirstDrug = indexOfLastDrug - drugsPerPage;
  const currentDrugs = filteredDrugs.slice(indexOfFirstDrug, indexOfLastDrug);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getDetailedPrescriptionInfo = (drug) => {
    if (drug.prescriptionDetail) return drug.prescriptionDetail;

    const name = (drug.name || '').toLowerCase();
    const cat = (drug.category || '').toLowerCase();

    // Controlled Opioids & Central Analgesics
    if (name.includes('morphine') || name.includes('fentanyl') || name.includes('oxycodone') || name.includes('hydromorphone') || name.includes('tapentadol')) {
      return 'Rx Required • Schedule II Controlled Opioid (Strict Oversight)';
    }
    if (name.includes('tramadol') || name.includes('codeine') || name.includes('alprazolam') || name.includes('clonazepam') || name.includes('lorazepam')) {
      return 'Rx Required • Schedule IV/V Controlled Neuropathic & Sedative Agent';
    }
    if (name.includes('gabapentin') || name.includes('pregabalin')) {
      return 'Rx Required • Schedule V Anticonvulsant & GABAergic Modulator';
    }

    // Antibiotics & Anti-Infectives
    if (cat.includes('antibiotic')) {
      if (name.includes('amoxicillin') || name.includes('penicillin') || name.includes('ampicillin')) {
        return 'Rx Required • Aminopenicillin Antimicrobial Therapy';
      }
      if (name.includes('azithromycin') || name.includes('clarithromycin') || name.includes('erythromycin')) {
        return 'Rx Required • Targeted Macrolide Antibacterial Course';
      }
      if (name.includes('ciprofloxacin') || name.includes('levofloxacin') || name.includes('moxifloxacin')) {
        return 'Rx Required • Second/Third Gen Fluoroquinolone Anti-Infective';
      }
      if (name.includes('vancomycin') || name.includes('meropenem') || name.includes('linezolid') || name.includes('daptomycin')) {
        return 'Rx Required • High-Potency Reserve Hospital Infusion Antibiotic';
      }
      return 'Rx Required • Systemic Broad-Spectrum Antibacterial Agent';
    }

    // Cardiovascular & Anticoagulants
    if (cat.includes('cardio')) {
      if (name.includes('apixaban') || name.includes('rivaroxaban') || name.includes('dabigatran') || name.includes('warfarin')) {
        return 'Rx Required • Anticoagulant Blood Thinner (INR Tracked)';
      }
      if (name.includes('atorvastatin') || name.includes('ezetimibe') || name.includes('simvastatin') || name.includes('rosuvastatin')) {
        return 'Rx Required • Lipid-Lowering Statin & HMG-CoA Reductase Inhibitor';
      }
      if (name.includes('amlodipine') || name.includes('losartan') || name.includes('propranolol') || name.includes('lisinopril')) {
        return 'Rx Required • Cardiovascular Vasodilator & BP Modulator';
      }
      return 'Rx Required • Cardiac Hemodynamic & Hypertensive Control';
    }

    // Diabetes & Hormones
    if (cat.includes('diabet') || cat.includes('hormone')) {
      if (name.includes('insulin') || name.includes('glargine') || name.includes('lispro')) {
        return 'Rx Required • Recombinant Subcutaneous Human Insulin Therapy';
      }
      if (name.includes('metformin')) {
        return 'Rx Required • Biguanide Insulin Sensitizer & Antidiabetic';
      }
      return 'Rx Required • Endocrine Glucose & Metabolic Regulator';
    }

    // Respiratory & Allergy
    if (cat.includes('resp') || cat.includes('asthma')) {
      if (name.includes('salbutamol') || name.includes('budesonide') || name.includes('tiotropium')) {
        return 'Rx Required • Inhaled Bronchodilator & Airway Anti-Inflammatory';
      }
      return 'Rx Required • Pulmonary Airway Resistance Modulator';
    }

    // Pain Relief & NSAIDs
    if (cat.includes('pain')) {
      if (name.includes('paracetamol') || name.includes('aspirin')) {
        return 'OTC Approved • Non-Narcotic Antipyretic & Pain Relief';
      }
      if (name.includes('ibuprofen') || name.includes('naproxen')) {
        return 'OTC / Rx • Propionic Anti-Inflammatory & Analgesic Compound';
      }
      if (name.includes('celecoxib') || name.includes('ketorolac') || name.includes('diclofenac')) {
        return 'Rx Required • Targeted Selective Systemic NSAID';
      }
    }

    // Psychiatric & CNS
    if (cat.includes('psych') || cat.includes('nervous')) {
      return 'Rx Required • Central Nervous System Neuromodulator Agent';
    }

    // Gastrointestinal
    if (cat.includes('gastro') || cat.includes('ulcer')) {
      return 'Rx / OTC • Gastric Acid Proton Pump Shield & Suppressor';
    }

    return `Rx Required • ${drug.category || 'Clinical'} Certified Prescription Medication`;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 4.5);
    const emptyStars = 5 - fullStars;
    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
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
            <p style={{ color: '#64748b', marginTop: '16px' }}>Loading drug information...</p>
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
                  <FaPills style={{ fontSize: '2rem', opacity: 0.9 }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '2.2rem', fontWeight: '700', letterSpacing: '-0.5px', margin: 0, textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
                    Dosage Guide
                  </h1>
                  <p style={{ fontSize: '1rem', opacity: 0.9, margin: '2px 0 0 0', fontWeight: '300' }}>
                    {filteredDrugs.length} drugs and medications
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
                  { label: 'Total Drugs', value: drugs.length, icon: FaPills },
                  { label: 'Categories', value: categories.length - 1, icon: FaFilter },
                  { label: 'Favorites', value: favorites.filter(f => f.type === 'drug').length, icon: FaHeart },
                  { label: 'Bookmarks', value: bookmarks.filter(b => b.type === 'drug').length, icon: FaBookmark },
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
                placeholder="Search 200+ drugs by name, category, or use..."
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

            <div style={{ position: 'relative' }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '12px 40px 12px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  background: 'white',
                  fontSize: '0.9rem',
                  color: '#1e293b',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  outline: 'none',
                  minWidth: '140px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = emerald; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <FaFilter style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.8rem', pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
              Found <span style={{ color: emerald, fontWeight: '700' }}>{filteredDrugs.length}</span> drugs
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 360px))',
            gap: '20px',
            marginBottom: '40px',
            justifyContent: 'center'
          }}>
            {currentDrugs.map((drug) => {
              const isFav = isFavorite(drug.id);
              const isBookmark = isBookmarked(drug.id);
              const inCart = cartItems?.some(item => item.id === drug.id);
              const color = getCategoryColor(drug.category);

              return (
                <div
                  key={drug.id}
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
                    justifyContent: 'space-between',
                    height: '240px'
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
                  onClick={() => navigate(`/dosage-guide/${drug.id}`)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: `${color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.6rem',
                      color: color,
                      border: `2px solid ${color}10`,
                      flexShrink: 0
                    }}>
                      💊
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{
                        fontSize: '0.95rem',
                        fontWeight: '700',
                        color: '#1e293b',
                        margin: 0,
                        lineHeight: '1.2',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {drug.name}
                      </h3>
                      <p style={{ fontSize: '0.75rem', color: emerald, fontWeight: '600', margin: '2px 0 2px 0' }}>
                        {drug.category || 'General'}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {renderStars(drug.rating || 4.5)}
                        <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>({drug.rating || 4.5})</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ margin: '8px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {drug.dosage && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FaClock style={{ color: emerald, fontSize: '0.65rem' }} />
                        <span style={{ fontSize: '0.72rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {drug.dosage}
                        </span>
                      </div>
                    )}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      marginTop: '4px'
                    }}>
                      <FaPrescription style={{ color: emerald, fontSize: '0.75rem', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.66rem', color: '#047857', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {getDetailedPrescriptionInfo(drug)}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '10px',
                    marginTop: 'auto',
                    flexShrink: 0
                  }}>
                    <div>
                      <span style={{ fontSize: '0.55rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Price</span>
                      <div style={{ fontSize: '1.05rem', fontWeight: '800', color: emerald }}>
                        ${drug.price || 299}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(drug.id, { id: drug.id, name: drug.name, type: 'drug', category: drug.category }); }}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          background: isFav ? '#fef2f2' : 'white',
                          color: isFav ? '#ef4444' : '#94a3b8',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '0.8rem'
                        }}
                      >
                        {isFav ? <FaHeart /> : <FaRegHeart />}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleBookmark(drug.id, { id: drug.id, name: drug.name, type: 'drug', category: drug.category }); }}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          background: isBookmark ? '#fffbeb' : 'white',
                          color: isBookmark ? '#f59e0b' : '#94a3b8',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '0.8rem'
                        }}
                      >
                        {isBookmark ? <FaBookmark /> : <FaRegBookmark />}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(drug); }}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          background: inCart ? '#d1fae5' : emerald,
                          color: inCart ? '#047857' : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontWeight: '600',
                          fontSize: '0.7rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <FaShoppingCart style={{ fontSize: '0.65rem' }} />
                        {inCart ? 'Added' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

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
        </div>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <Footer />
      </>
  );
};

export default DosageGuide;
