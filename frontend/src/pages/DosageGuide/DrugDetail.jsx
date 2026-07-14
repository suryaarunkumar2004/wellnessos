import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft, FaStar, FaClock, FaShoppingCart, 
  FaHeart, FaRegHeart, FaBookmark, FaRegBookmark,
  FaPills, FaPrescription, FaExclamationTriangle
} from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useBookmarks } from '../../contexts/BookmarksContext';
import { drugDatabase } from '../../services/drugDatabase';

const DrugDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drug, setDrug] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    // USE ONLY LOCAL DATA - NO BACKEND CALL
    const found = drugDatabase.find(d => d.id === parseInt(id));
    if (found) {
      setDrug(found);
    }
    setLoading(false);
  }, [id]);

  const getDetailedPrescriptionInfo = (drug) => {
    if (!drug) return '';
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
          <FaStar key={i} style={{ color: '#f59e0b', fontSize: '0.9rem' }} />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={i} style={{ color: '#e2e8f0', fontSize: '0.9rem' }} />
        ))}
      </span>
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Loading drug information...</p>
        </div>
      </>
    );
  }

  if (!drug) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ color: '#1e293b' }}>Drug Not Found</h2>
          <p style={{ color: '#64748b' }}>The drug you're looking for doesn't exist in our database.</p>
          <Link to="/dosage-guide" style={{ color: '#059669', textDecoration: 'none', marginTop: '16px', fontWeight: '600' }}>
            ← Back to Dosage Guide
          </Link>
        </div>
      </>
    );
  }

  const isFav = isFavorite(drug.id);
  const isBookmark = isBookmarked(drug.id);
  const priceValue = typeof drug.price === 'number' ? drug.price : parseInt(drug.price) || 299;

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
          <button
            onClick={() => navigate('/dosage-guide')}
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
              padding: '8px 0',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#059669'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; }}
          >
            <FaArrowLeft /> Back to Dosage Guide
          </button>

          <div style={{ 
            background: 'white', 
            borderRadius: '20px', 
            padding: '40px', 
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)', 
            border: '1px solid #e2e8f0' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '16px',
                background: '#ecfdf5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                color: '#059669'
              }}>
                💊
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b', margin: 0 }}>
                    {drug.name}
                  </h1>
                  {drug.brand && (
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: '#94a3b8', 
                      background: '#f1f5f9', 
                      padding: '2px 12px', 
                      borderRadius: '12px'
                    }}>
                      {drug.brand}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '4px' }}>
                  <span style={{ 
                    background: '#f1f5f9', 
                    padding: '2px 12px', 
                    borderRadius: '12px', 
                    fontSize: '0.75rem', 
                    color: '#475569' 
                  }}>
                    {drug.category || 'General'}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {renderStars(drug.rating || 4.5)}
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>({drug.rating || 4.5})</span>
                  </span>
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '10px',
                  padding: '6px 14px',
                  marginTop: '10px',
                  color: '#047857',
                  fontWeight: '600',
                  fontSize: '0.82rem'
                }}>
                  <FaPrescription style={{ color: '#059669', fontSize: '0.95rem' }} />
                  <span>{getDetailedPrescriptionInfo(drug)}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <button
                onClick={() => toggleFavorite(drug.id, { id: drug.id, name: drug.name, type: 'drug', category: drug.category })}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  background: isFav ? '#fef2f2' : 'white',
                  color: isFav ? '#ef4444' : '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s ease'
                }}
              >
                {isFav ? <FaHeart /> : <FaRegHeart />} Favorite
              </button>
              <button
                onClick={() => toggleBookmark(drug.id, { id: drug.id, name: drug.name, type: 'drug', category: drug.category })}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  background: isBookmark ? '#fffbeb' : 'white',
                  color: isBookmark ? '#f59e0b' : '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s ease'
                }}
              >
                {isBookmark ? <FaBookmark /> : <FaRegBookmark />} Bookmark
              </button>
              <button
                onClick={() => addToCart({ id: drug.id, name: drug.name, price: priceValue, type: 'drug' })}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  background: '#059669',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#047857'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#059669'; }}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>

            <p style={{ 
              fontSize: '1rem', 
              color: '#475569', 
              lineHeight: '1.8', 
              marginBottom: '24px' 
            }}>
              {drug.description}
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px',
              marginBottom: '24px'
            }}>
              {drug.dosage && (
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaPrescription size={12} /> Dosage
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1e293b', marginTop: '4px' }}>{drug.dosage}</div>
                </div>
              )}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Price</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669', marginTop: '4px' }}>${priceValue}</div>
              </div>
              {drug.manufacturer && (
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Manufacturer</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1e293b', marginTop: '4px' }}>{drug.manufacturer}</div>
                </div>
              )}
            </div>

            {drug.indications && drug.indications.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '10px' }}>
                  <FaPills style={{ color: '#059669', marginRight: '8px' }} />
                  Indications
                </h3>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '8px'
                }}>
                  {drug.indications.map((ind, i) => (
                    <li key={i} style={{ 
                      padding: '6px 12px', 
                      background: '#f8fafc', 
                      borderRadius: '8px',
                      color: '#475569',
                      fontSize: '0.85rem',
                      border: '1px solid #f1f5f9'
                    }}>
                      • {ind}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {drug.sideEffects && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '10px' }}>
                  <FaExclamationTriangle style={{ color: '#f59e0b', marginRight: '8px' }} />
                  Side Effects
                </h3>
                <div style={{ 
                  padding: '14px 18px', 
                  background: '#fffbeb', 
                  borderRadius: '12px',
                  border: '1px solid #fde68a'
                }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#92400e', lineHeight: '1.6' }}>
                    {Array.isArray(drug.sideEffects) ? drug.sideEffects.join(', ') : drug.sideEffects}
                  </p>
                </div>
              </div>
            )}

            <div style={{ marginTop: '24px', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                Related Drugs
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
                {drugDatabase
                  .filter(d => d.category === drug.category && d.id !== drug.id)
                  .slice(0, 4)
                  .map(d => (
                    <Link 
                      key={d.id} 
                      to={`/dosage-guide/${d.id}`} 
                      style={{ 
                        textDecoration: 'none', 
                        color: '#1e293b', 
                        display: 'block',
                        padding: '10px 14px',
                        border: '1px solid #f1f5f9',
                        borderRadius: '10px',
                        background: 'white',
                        transition: 'all 0.2s ease',
                        fontSize: '0.85rem'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(5,150,105,0.08)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ fontWeight: '600' }}>{d.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>${d.price || 299}</div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DrugDetail;
