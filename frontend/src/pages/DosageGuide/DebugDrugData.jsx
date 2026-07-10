import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import { 
  searchUSADrugs, 
  searchWHODrugs, 
  searchUKDrugs, 
  searchIndiaDrugs,
  searchAustraliaDrugs,
  searchCanadaDrugs,
  searchJapanDrugs,
  searchEUDrugs,
  searchBrazilDrugs,
  searchSouthAfricaDrugs
} from '../../services/realDrugService';

const DebugDrugData = () => {
  const [searchTerm, setSearchTerm] = useState('amoxicillin');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({});

  const countries = [
    { key: 'USA', label: '🇺🇸 USA (FDA)', func: searchUSADrugs },
    { key: 'WHO', label: '🌍 WHO (ATC)', func: searchWHODrugs },
    { key: 'UK', label: '🇬🇧 UK (NHS)', func: searchUKDrugs },
    { key: 'India', label: '🇮🇳 India (CDSCO)', func: searchIndiaDrugs },
    { key: 'Australia', label: '🇦🇺 Australia (PBS)', func: searchAustraliaDrugs },
    { key: 'Canada', label: '🇨🇦 Canada (Health)', func: searchCanadaDrugs },
    { key: 'Japan', label: '🇯🇵 Japan (PMDA)', func: searchJapanDrugs },
    { key: 'EU', label: '🇪🇺 EU (EMA)', func: searchEUDrugs },
    { key: 'Brazil', label: '🇧🇷 Brazil (ANVISA)', func: searchBrazilDrugs },
    { key: 'SouthAfrica', label: '🇿�� South Africa (SAHPRA)', func: searchSouthAfricaDrugs },
  ];

  const searchAll = async () => {
    setLoading(true);
    const allResults = {};
    
    for (const country of countries) {
      try {
        console.log(`Searching ${country.key} for "${searchTerm}"...`);
        const data = await country.func(searchTerm);
        allResults[country.key] = {
          count: data?.length || 0,
          data: data || [],
          success: true,
          error: null
        };
        console.log(`${country.key}: ${data?.length || 0} results`);
      } catch (error) {
        allResults[country.key] = {
          count: 0,
          data: [],
          success: false,
          error: error.message
        };
        console.error(`${country.key} error:`, error.message);
      }
    }
    
    setResults(allResults);
    setLoading(false);
  };

  const toggleExpand = (country) => {
    setExpanded(prev => ({ ...prev, [country]: !prev[country] }));
  };

  const totalResults = Object.values(results).reduce((sum, r) => sum + r.count, 0);

  return (
    <div style={{ padding: '100px 20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
        🧪 Drug Data Debug Tool
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>
        Check what real data is available from each country's API
      </p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter drug name (e.g., amoxicillin)"
          style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', minWidth: '200px' }}
        />
        <button
          onClick={searchAll}
          disabled={loading}
          style={{ padding: '12px 32px', background: '#059669', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
        >
          {loading ? 'Searching...' : '🔍 Search All Countries'}
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Searching all country databases...</p>
        </div>
      )}

      {!loading && Object.keys(results).length > 0 && (
        <>
          <div style={{ background: 'white', padding: '16px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ fontWeight: 'bold', color: '#1f2937' }}>
              Total Results: <span style={{ color: '#059669' }}>{totalResults}</span> drugs found across {Object.keys(results).length} countries
            </p>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {countries.map((country) => {
              const result = results[country.key];
              if (!result) return null;

              return (
                <div key={country.key} style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: result.success ? '1px solid #e5e7eb' : '1px solid #fca5a5' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => toggleExpand(country.key)}>
                    <div>
                      <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1f2937' }}>{country.label}</span>
                      {result.success ? (
                        <span style={{ marginLeft: '12px', color: '#059669', fontSize: '0.9rem' }}>
                          ✅ {result.count} drugs found
                        </span>
                      ) : (
                        <span style={{ marginLeft: '12px', color: '#ef4444', fontSize: '0.9rem' }}>
                          ❌ Error: {result.error}
                        </span>
                      )}
                    </div>
                    <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                      {expanded[country.key] ? '▼' : '▶'} {result.data.length} items
                    </span>
                  </div>

                  {expanded[country.key] && result.data.length > 0 && (
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ background: '#f3f4f6' }}>
                              <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                              <th style={{ padding: '8px', textAlign: 'left' }}>Brand</th>
                              <th style={{ padding: '8px', textAlign: 'left' }}>Category</th>
                              <th style={{ padding: '8px', textAlign: 'left' }}>Dosage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.data.slice(0, 10).map((drug, idx) => (
                              <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <td style={{ padding: '8px' }}>{drug.generic_name || drug.name || 'N/A'}</td>
                                <td style={{ padding: '8px' }}>{drug.brand_name || drug.brand || 'N/A'}</td>
                                <td style={{ padding: '8px' }}>{drug.category || drug.class || 'N/A'}</td>
                                <td style={{ padding: '8px' }}>{drug.dosage || drug.dosage_text || 'N/A'}</td>
                              </tr>
                            ))}
                            {result.data.length > 10 && (
                              <tr>
                                <td colSpan="4" style={{ padding: '8px', textAlign: 'center', color: '#6b7280' }}>
                                  ... and {result.data.length - 10} more
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <Footer />
      </>
      )}

      {!loading && Object.keys(results).length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          <p style={{ fontSize: '1.2rem' }}>🔍 Enter a drug name and click "Search All Countries"</p>
          <p>This will show you what data is available from each country's API</p>
        </div>
      )}
    </div>
  );
};

export default DebugDrugData;
