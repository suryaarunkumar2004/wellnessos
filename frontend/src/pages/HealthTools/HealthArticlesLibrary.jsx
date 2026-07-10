import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaBook, FaSearch, FaClock, FaEye, FaDownload, FaPrint, FaShare, FaTrash, FaHistory, FaInfoCircle } from 'react-icons/fa';

export default function HealthArticlesLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';

  const articles = [
    { id: 1, title: 'Understanding Heart Health', category: 'Cardiology', excerpt: 'Learn about cardiovascular health and prevention strategies. Includes latest research on heart disease prevention.', readTime: '5 min', views: 1234, content: 'Heart health is crucial for overall wellbeing. Regular exercise, balanced diet, and stress management are key factors in maintaining a healthy heart. Recent studies show that 30 minutes of moderate exercise daily can reduce heart disease risk by 40%.' },
    { id: 2, title: 'Nutrition for Better Sleep', category: 'Nutrition', excerpt: 'How your diet affects your sleep quality and duration. Discover foods that promote better sleep.', readTime: '4 min', views: 856, content: 'Certain foods can promote better sleep. Foods rich in tryptophan, magnesium, and melatonin can help regulate your sleep cycle. Bananas, almonds, and warm milk are excellent choices for a pre-bedtime snack.' },
    { id: 3, title: 'Managing Stress Effectively', category: 'Mental Health', excerpt: 'Proven techniques for reducing stress and anxiety in your daily life.', readTime: '6 min', views: 2341, content: 'Stress management techniques include deep breathing, meditation, exercise, and maintaining social connections. Regular practice of these techniques can reduce cortisol levels by up to 30%.' },
    { id: 4, title: 'Benefits of Regular Exercise', category: 'Fitness', excerpt: 'Discover why physical activity is essential for your health and longevity.', readTime: '3 min', views: 567, content: 'Regular exercise improves cardiovascular health, strengthens muscles, boosts mood, and reduces the risk of chronic diseases. Even 30 minutes of walking daily can have significant health benefits.' },
    { id: 5, title: 'Understanding Diabetes', category: 'Health', excerpt: 'A comprehensive guide to diabetes management and prevention strategies.', readTime: '7 min', views: 789, content: 'Diabetes is a chronic condition that affects how your body processes blood sugar. Management includes diet, exercise, medication, and regular monitoring. Early detection and lifestyle changes can prevent complications.' },
    { id: 6, title: 'Gut Health and Immunity', category: 'Nutrition', excerpt: 'How your gut microbiome affects your immune system and overall health.', readTime: '5 min', views: 1023, content: 'A healthy gut microbiome is essential for a strong immune system. Probiotics, fiber-rich foods, and fermented foods support gut health. The gut-brain axis also plays a crucial role in mental health.' },
    { id: 7, title: 'Mental Health in the Workplace', category: 'Mental Health', excerpt: 'Strategies for maintaining mental wellness and productivity at work.', readTime: '4 min', views: 678, content: 'Workplace mental health is important for productivity and overall wellbeing. Strategies include setting boundaries, taking breaks, seeking support, and practicing mindfulness. Employers are increasingly recognizing the importance of mental health support.' },
    { id: 8, title: 'Healthy Aging Tips', category: 'Wellness', excerpt: 'How to age gracefully and maintain your health as you get older.', readTime: '6 min', views: 1456, content: 'Healthy aging involves staying active, eating well, maintaining social connections, and managing stress. Regular health screenings and preventive care become increasingly important with age.' },
    { id: 9, title: 'The Science of Sleep', category: 'Wellness', excerpt: 'Understanding the science behind sleep and its importance for health.', readTime: '8 min', views: 2100, content: 'Sleep is essential for physical and mental health. During sleep, the body repairs tissues, consolidates memories, and regulates hormones. Adults need 7-9 hours of quality sleep per night.' },
    { id: 10, title: 'Plant-Based Diet Benefits', category: 'Nutrition', excerpt: 'Exploring the health benefits of a plant-based diet and lifestyle.', readTime: '5 min', views: 987, content: 'Plant-based diets are associated with lower risks of heart disease, diabetes, and certain cancers. They are also better for the environment. Transitioning gradually is the key to long-term success.' },
    { id: 11, title: 'Mindfulness Meditation Guide', category: 'Mental Health', excerpt: 'A beginner\'s guide to mindfulness meditation practice.', readTime: '6 min', views: 1567, content: 'Mindfulness meditation involves focusing on the present moment without judgment. Regular practice can reduce anxiety, improve focus, and increase emotional regulation. Start with 5 minutes daily.' },
    { id: 12, title: 'Hydration and Health', category: 'Wellness', excerpt: 'The importance of proper hydration for overall health and wellbeing.', readTime: '3 min', views: 2345, content: 'Proper hydration is essential for every bodily function. Water regulates temperature, transports nutrients, and removes waste. Aim for 2-3 liters of water daily, more if you exercise.' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('articles_read');
    if (saved) {
      const read = JSON.parse(saved);
      const updatedArticles = articles.map(a => ({
        ...a,
        views: read.includes(a.id) ? a.views + 1 : a.views
      }));
    }
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const categories = ['All', ...new Set(articles.map(a => a.category))];

  const filteredArticles = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        a.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        a.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = category === 'All' || a.category === category;
    return matchSearch && matchCategory;
  });

  const viewArticle = (article) => {
    setSelectedArticle(article);
    const read = JSON.parse(localStorage.getItem('articles_read') || '[]');
    if (!read.includes(article.id)) {
      read.push(article.id);
      localStorage.setItem('articles_read', JSON.stringify(read));
    }
    showToast(`📖 Reading: ${article.title}`, 'info');
  };

  const shareArticle = () => {
    if (!selectedArticle) return;
    const text = `Check out this article: ${selectedArticle.title}`;
    if (navigator.share) {
      navigator.share({ title: selectedArticle.title, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      showToast('📋 Copied to clipboard!', 'success');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
          <Link to="/more?tab=tools" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: emerald, fontWeight: '600', textDecoration: 'none', fontSize: '0.9rem' }}>
            <FaArrowLeft style={{ fontSize: '0.8rem' }} /> Back to Health Tools
          </Link>

          <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)', borderRadius: '16px', padding: '32px 36px', marginBottom: '32px', position: 'relative', overflow: 'hidden', color: 'white', boxShadow: '0 4px 20px rgba(5, 150, 105, 0.25)' }}>
            <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '14px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <FaBook style={{ fontSize: '1.8rem' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Health Articles Library</h1>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '2px 0 0', fontWeight: '300' }}>12 curated articles on health, nutrition, and wellness</p>
                </div>
              </div>
            </div>
          </div>

          {toastMessage && (
            <div style={{ position: 'fixed', top: '100px', right: '24px', zIndex: 9999, padding: '14px 24px', borderRadius: '12px', background: toastMessage.type === 'error' ? '#fef2f2' : '#ecfdf5', border: `1px solid ${toastMessage.type === 'error' ? '#fecaca' : '#a7f3d0'}`, color: toastMessage.type === 'error' ? '#dc2626' : '#059669', fontWeight: '600', fontSize: '0.9rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              {toastMessage.message}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '0 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <FaSearch style={{ color: '#94a3b8' }} />
              <input type="text" placeholder="Search articles..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                style={{ border: 'none', outline: 'none', padding: '12px 0', width: '100%', fontSize: '0.9rem', background: 'transparent' }} />
            </div>
            <select value={category} onChange={e => setCategory(e.target.value)}
              style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Articles ({filteredArticles.length})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto' }}>
                {filteredArticles.map((article) => (
                  <div key={article.id} onClick={() => viewArticle(article)} style={{ padding: '14px', border: `2px solid ${selectedArticle?.id === article.id ? emerald : '#e2e8f0'}`, borderRadius: '12px', cursor: 'pointer', background: selectedArticle?.id === article.id ? emeraldLight : 'white' }}>
                    <div style={{ fontWeight: '700', color: '#1e293b' }}>{article.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{article.category} • <FaClock style={{ display: 'inline', marginRight: '2px' }} /> {article.readTime} • <FaEye style={{ display: 'inline', marginRight: '2px' }} /> {article.views}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>{article.excerpt}</div>
                  </div>
                ))}
                {filteredArticles.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No articles found</div>
                )}
              </div>
            </div>

            <div>
              {selectedArticle ? (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: `2px solid ${emerald}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{selectedArticle.title}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '16px' }}>{selectedArticle.category} • <FaClock style={{ display: 'inline', marginRight: '2px' }} /> {selectedArticle.readTime} • <FaEye style={{ display: 'inline', marginRight: '2px' }} /> {selectedArticle.views} views</div>
                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '16px', maxHeight: '250px', overflowY: 'auto' }}>
                    <div style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: '1.8' }}>{selectedArticle.content}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaDownload size={12} /> Download</button>
                    <button style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaPrint size={12} /> Print</button>
                    <button onClick={shareArticle} style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaShare size={12} /> Share</button>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <FaBook size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
                  <p style={{ color: '#94a3b8', textAlign: 'center' }}>Select an article to read</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
}
