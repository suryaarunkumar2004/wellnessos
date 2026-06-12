import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaCalendarAlt, FaInfoCircle, FaShoppingCart, FaStar, FaStarHalfAlt, FaRegStar, FaShareAlt, FaBalanceScale, FaEye, FaPrint, FaCube } from 'react-icons/fa';

// Mock CartContext – replace with real one later
const useCart = () => {
  const addToCart = (service, quantity) => {
    alert(`Added ${service.name} (x${quantity}) to cart.`);
  };
  return { addToCart };
};

const styles = `
  .services-page { font-family: 'Inter', system-ui, sans-serif; background: linear-gradient(135deg, #f5f7fc 0%, #eef2f6 100%); min-height: 100vh; padding: 2rem 1rem; }
  .services-container { max-width: 1400px; margin: 0 auto; }
  .hero-section { text-align: center; margin-bottom: 2rem; }
  .hero-section h1 { font-size: 2.8rem; font-weight: 800; color: #059669; margin-bottom: 0.5rem; }
  .filter-bar { background: white; border-radius: 1rem; padding: 1.2rem; margin-bottom: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between; }
  .search-box { flex: 2; min-width: 200px; }
  .search-box input { width: 100%; padding: 0.6rem 1rem; border: 1px solid #e2e8f0; border-radius: 2rem; }
  .category-filter, .extra-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; }
  .category-btn, .filter-chip { padding: 0.4rem 1rem; border-radius: 2rem; background: #f1f5f9; border: none; font-size: 0.8rem; cursor: pointer; color: #059669; }
  .category-btn.active, .filter-chip.active { background: #059669; color: white; }
  .sort-select { padding: 0.5rem 1rem; border-radius: 2rem; border: 1px solid #e2e8f0; background: white; color: #059669; }
  .price-range { display: flex; gap: 1rem; align-items: center; }
  .price-range input { width: 100px; }
  .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.8rem; }
  .service-card { background: white; border-radius: 1.2rem; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.08); transition: all 0.3s; display: flex; flex-direction: column; }
  .service-card:hover { transform: translateY(-6px); box-shadow: 0 20px 30px -12px rgba(0,0,0,0.2); }
  .card-image { height: 140px; background: linear-gradient(135deg, #a3c9d6, #6b9eb3); display: flex; align-items: center; justify-content: center; font-size: 3rem; color: white; }
  .card-content { padding: 1.2rem; flex: 1; }
  .card-header { display: flex; justify-content: space-between; align-items: flex-start; }
  .service-title { font-weight: 700; font-size: 1.2rem; color: #1e293b; }
  .service-category { font-size: 0.7rem; background: #e6f7f0; display: inline-block; padding: 0.2rem 0.6rem; border-radius: 1rem; color: #059669; margin-top: 0.3rem; }
  .rating { display: flex; align-items: center; gap: 0.2rem; margin: 0.5rem 0; }
  .description { font-size: 0.85rem; color: #475569; margin: 0.6rem 0; line-height: 1.4; }
  .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.6rem 0; }
  .tag { background: #f1f5f9; border-radius: 1rem; padding: 0.2rem 0.6rem; font-size: 0.7rem; color: #334155; }
  .price-duration { display: flex; justify-content: space-between; align-items: baseline; margin: 0.8rem 0; }
  .price { font-size: 1.6rem; font-weight: 800; color: #059669; }
  .duration { font-size: 0.8rem; color: #64748b; }
  .card-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0.8rem 1.2rem 1.2rem; border-top: 1px solid #eef2f6; background: #fafcff; }
  .action-icon { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 0.3rem; padding: 0.5rem 0; border-radius: 2rem; font-size: 0.7rem; font-weight: 500; cursor: pointer; border: none; }
  .btn-primary { background: #059669; color: white; }
  .btn-primary:hover { background: #047857; }
  .btn-secondary { background: #e2e8f0; color: #1e293b; }
  .btn-secondary:hover { background: #cbd5e1; }
  .btn-outline { background: white; border: 1px solid #cbd5e1; color: #1e293b; }
  .btn-outline:hover { background: #f8fafc; }
  .favorite-btn { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #ef4444; }
  .pagination { display: flex; justify-content: center; gap: 0.5rem; margin-top: 2rem; flex-wrap: wrap; }
  .page-btn { padding: 0.5rem 1rem; border-radius: 0.5rem; border: 1px solid #cbd5e1; background: white; cursor: pointer; color: #059669; }
  .page-btn.active { background: #059669; color: white; border-color: #059669; }
  .compare-bar { position: fixed; bottom: 0; left: 0; right: 0; background: white; box-shadow: 0 -4px 20px rgba(0,0,0,0.1); padding: 0.8rem 2rem; display: flex; justify-content: space-between; align-items: center; z-index: 1000; border-top: 2px solid #059669; }
  .compare-items { display: flex; gap: 1rem; }
  .compare-item { background: #f1f5f9; padding: 0.3rem 0.8rem; border-radius: 2rem; display: flex; align-items: center; gap: 0.5rem; }
  .compare-item button { background: none; border: none; cursor: pointer; color: #ef4444; }
  @media (max-width: 700px) { .filter-bar { flex-direction: column; align-items: stretch; } .services-grid { grid-template-columns: 1fr; } .compare-bar { flex-direction: column; gap: 0.5rem; } }
  @media print {
    nav, footer, button:not(.print-btn), .filter-bar, .pagination, .action-buttons, .btn-group, .view-all, .favorite-btn, .card-actions, .compare-bar, .navbar, .top-bar { display: none !important; }
    body { padding-top: 0 !important; margin: 0; background: white; }
    .services-grid { display: block !important; }
    .service-card { break-inside: avoid; page-break-inside: avoid; margin-bottom: 20px; border: 1px solid #ddd; padding: 10px; }
    h1, h2, h3 { page-break-after: avoid; }
  }
`;

const CATEGORIES = ['Consultation', 'Nutrition', 'Fitness', 'Mindfulness', 'Workshop', 'Program', 'Corporate', 'Checkup', 'Therapy', 'Alternative', 'Digital', 'Coaching', 'Specialty', 'Beauty', 'Membership', 'Education', 'Rehabilitation', 'Mental Health', 'Wellness', 'Spa'];

const generateServices = (count) => {
  const services = [];
  const namePrefixes = ['Holistic', 'Personalized', 'Power', 'Mindful', 'Corporate', 'Weight Loss', 'Executive', 'Sports', 'Ayurvedic', 'Online', 'Life', 'Prenatal', 'Anti-aging', 'Gym', 'Certified', 'Cardiac', 'Stress', 'Personal', 'Sleep', 'Immune', 'Acupuncture', 'Meditation', 'Couples', 'Biohacking', 'Virtual'];
  const suffixes = ['Plan', 'Session', 'Program', 'Workshop', 'Package', 'Course', 'Coaching', 'Therapy', 'Consultation', 'Class', 'Treatment', 'Retreat'];
  for (let i = 1; i <= count; i++) {
    const cat = CATEGORIES[i % CATEGORIES.length];
    const prefix = namePrefixes[i % namePrefixes.length];
    const suffix = suffixes[i % suffixes.length];
    const name = `${prefix} ${suffix} ${i}`;
    const price = Math.floor(Math.random() * 300) + 20;
    const durationOptions = ['30 min', '45 min', '60 min', '90 min', '2 hours', '4 weeks', 'monthly'];
    const duration = durationOptions[i % durationOptions.length];
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
    const popular = Math.random() > 0.85;
    const featured = i <= 6;
    const tags = [];
    if (popular) tags.push('Popular');
    if (Math.random() > 0.7) tags.push('Certified');
    if (Math.random() > 0.8) tags.push('Online');
    services.push({ id: i, name, category: cat, price, duration, rating: parseFloat(rating), popular, featured, description: `Experience our premium ${cat.toLowerCase()} service "${name}". Tailored to help you achieve optimal wellness.`, tags });
  }
  return services;
};

const allServices = generateServices(1000);
const categoriesFilter = ['All', ...CATEGORIES];

const Services = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(() => { const saved = localStorage.getItem('serviceFavorites'); return saved ? JSON.parse(saved) : []; });
  const [compareList, setCompareList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [durationFilter, setDurationFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => { localStorage.setItem('serviceFavorites', JSON.stringify(favorites)); }, [favorites]);

  const toggleFavorite = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  const addToCompare = (service) => { if (compareList.length >= 4) { alert('Max 4 services'); return; } if (!compareList.find(s => s.id === service.id)) setCompareList([...compareList, service]); else alert('Already in compare'); };
  const removeFromCompare = (id) => setCompareList(compareList.filter(s => s.id !== id));
  const clearCompare = () => setCompareList([]);
  const handleQuickView = (service) => alert(`Quick View\n\n${service.name}\nPrice: $${service.price}\nDuration: ${service.duration}\nRating: ${service.rating}\nDescription: ${service.description}`);
  const handleBook = (service) => alert(`Booking request sent for "${service.name}". We'll contact you shortly!`);
  const handleDetails = (service) => navigate(`/service/${service.id}`);
  const handleSchedule = (service) => alert(`Schedule appointment for "${service.name}" – calendar picker would open.`);
  const handleShare = (service) => { navigator.clipboard?.writeText(`${service.name} - $${service.price} - WellnessOS`); alert(`Link for "${service.name}" copied.`); };
  const handlePrint = () => window.print();

  const renderStars = (rating) => { let stars = []; for (let i=1;i<=5;i++) stars.push(i<=rating ? <FaStar key={i} style={{color:'#fbbf24'}} /> : <FaRegStar key={i} style={{color:'#cbd5e1'}} />); return stars; };

  let filtered = allServices.filter(s => (selectedCategory==='All' || s.category===selectedCategory) && s.name.toLowerCase().includes(searchTerm.toLowerCase()) && s.price>=priceRange[0] && s.price<=priceRange[1] && s.rating>=minRating && (durationFilter==='All' || s.duration===durationFilter));
  if (sortBy === 'price-asc') filtered.sort((a,b)=>a.price-b.price);
  else if (sortBy === 'price-desc') filtered.sort((a,b)=>b.price-a.price);
  else if (sortBy === 'rating') filtered.sort((a,b)=>b.rating-a.rating);
  else if (sortBy === 'popular') filtered.sort((a,b)=> (b.popular?1:0)-(a.popular?1:0));
  else filtered.sort((a,b)=>a.name.localeCompare(b.name));
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);
  const featuredServices = allServices.filter(s=>s.featured).slice(0,6);
  const uniqueDurations = ['All', ...new Set(allServices.map(s=>s.duration))];

  return (
    <>
      <style>{styles}</style>
      <div className="services-page">
        <div className="services-container">
          <div style={{display:'flex', justifyContent:'flex-end', marginBottom:'16px'}}>
            <button onClick={handlePrint} className="print-btn" style={{background:'#059669', color:'white', border:'none', padding:'8px 16px', borderRadius:'40px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px'}}><FaPrint /> Export PDF</button>
          </div>
          <div className="hero-section">
            <h1>1,000+ Wellness Services</h1>
            <p>Curated for your body, mind, and spirit — from trusted experts</p>
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem', marginBottom: '2rem', paddingBottom: '0.5rem' }}>
            {featuredServices.map(s => (<div key={s.id} style={{ background: 'white', borderRadius: '1rem', padding: '0.5rem 1rem', minWidth: '180px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><FaCube style={{fontSize:'2rem', color:'#059669'}} /><div><div style={{fontWeight:'bold'}}>{s.name.substring(0,20)}</div><div style={{fontSize:'0.8rem', color:'#059669'}}>${s.price} · {s.duration}</div></div></div>))}
          </div>
          <div className="filter-bar">
            <div className="search-box"><input type="text" placeholder="Search 1000+ services..." value={searchTerm} onChange={e=>{setSearchTerm(e.target.value); setCurrentPage(1);}} /></div>
            <div className="category-filter">{categoriesFilter.map(cat=><button key={cat} className={`category-btn ${selectedCategory===cat?'active':''}`} onClick={()=>{setSelectedCategory(cat); setCurrentPage(1);}}>{cat}</button>)}</div>
            <div className="extra-filters">
              <select className="sort-select" value={sortBy} onChange={e=>{setSortBy(e.target.value); setCurrentPage(1);}}><option value="name">Sort by Name</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="rating">Highest Rated</option><option value="popular">Most Popular</option></select>
              <div className="price-range"><span>$0</span><input type="range" min="0" max="500" step="10" value={priceRange[1]} onChange={e=>setPriceRange([0, parseInt(e.target.value)])} /><span>${priceRange[1]}</span></div>
              <select className="sort-select" value={minRating} onChange={e=>setMinRating(Number(e.target.value))}><option value={0}>All ratings</option><option value={4}>4★ & above</option><option value={4.5}>4.5★ & above</option></select>
              <select className="sort-select" value={durationFilter} onChange={e=>setDurationFilter(e.target.value)}>{uniqueDurations.map(dur=><option key={dur} value={dur}>{dur}</option>)}</select>
            </div>
          </div>
          <div className="services-grid">
            {paginated.map(service => (<div key={service.id} className="service-card"><div className="card-image"><FaCube style={{fontSize:'3rem', color:'white'}} /></div><div className="card-content"><div className="card-header"><div><div className="service-title">{service.name}</div><div className="service-category">{service.category}</div></div><button className="favorite-btn" onClick={()=>toggleFavorite(service.id)}>{favorites.includes(service.id)?<FaHeart />:<FaRegHeart />}</button></div><div className="rating">{renderStars(service.rating)}<span style={{fontSize:'0.75rem', marginLeft:'0.25rem'}}>{service.rating}</span></div><div className="description">{service.description}</div><div className="tags">{service.tags.map((tag,idx)=><span key={idx} className="tag">{tag}</span>)}</div><div className="price-duration"><span className="price">${service.price}</span><span className="duration">{service.duration}</span></div></div><div className="card-actions"><button className="action-icon btn-primary" onClick={()=>addToCart(service,1)}><FaShoppingCart /> Cart</button><button className="action-icon btn-primary" onClick={()=>handleBook(service)}>Book</button><button className="action-icon btn-secondary" onClick={()=>handleSchedule(service)}><FaCalendarAlt /> Schedule</button><button className="action-icon btn-outline" onClick={()=>handleQuickView(service)}><FaEye /> Quick</button><button className="action-icon btn-outline" onClick={()=>handleDetails(service)}><FaInfoCircle /> Details</button><button className="action-icon btn-outline" onClick={()=>handleShare(service)}><FaShareAlt /> Share</button><button className="action-icon btn-outline" onClick={()=>addToCompare(service)}><FaBalanceScale /> Compare</button></div></div>))}
          </div>
          {totalPages > 1 && (<div className="pagination"><button className="page-btn" disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)}>◀ Prev</button>{[...Array(Math.min(7,totalPages))].map((_,i)=>{let pageNum=i+1; if(currentPage>3 && totalPages>7) pageNum=currentPage-3+i; if(pageNum>totalPages) return null; return <button key={pageNum} className={`page-btn ${currentPage===pageNum?'active':''}`} onClick={()=>setCurrentPage(pageNum)}>{pageNum}</button>;})}<button className="page-btn" disabled={currentPage===totalPages} onClick={()=>setCurrentPage(p=>p+1)}>Next ▶</button></div>)}
          <div style={{textAlign:'center', marginTop:'1rem', fontSize:'0.8rem', color:'#64748b'}}>Showing {filtered.length} of {allServices.length} wellness services</div>
        </div>
      </div>
      {compareList.length > 0 && (<div className="compare-bar"><div className="compare-items">{compareList.map(s=><div key={s.id} className="compare-item"><span>{s.name.substring(0,20)}</span><button onClick={()=>removeFromCompare(s.id)}>✕</button></div>)}</div><div><button className="action-icon btn-primary" style={{marginRight:'1rem'}} onClick={()=>alert(`Compare:\n${compareList.map(s=>`${s.name} - $${s.price}`).join('\n')}`)}>Compare Now</button><button className="action-icon btn-outline" onClick={clearCompare}>Clear All</button></div></div>)}
    </>
  );
};

export default Services;

