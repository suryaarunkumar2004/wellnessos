import React, { createContext, useState, useContext, useEffect } from 'react';
import { drugDatabase, getDrugById, getCategories, searchDrugs } from '../services/drugDatabase.js';

const DrugContext = createContext();

export const useDrug = () => {
  const context = useContext(DrugContext);
  if (!context) {
    throw new Error('useDrug must be used within a DrugProvider');
  }
  return context;
};

export const DrugProvider = ({ children }) => {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [apiAvailable, setApiAvailable] = useState(true);

  useEffect(() => {
    loadDrugs();
    loadFavorites();
  }, []);

  useEffect(() => {
    filterDrugs();
  }, [drugs, searchTerm, selectedCategory]);

  const loadDrugs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/drugs?page=0&size=200', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        let drugsData = [];
        
        // ✅ FIX: Check for 'drugs' key first (backend response format)
        if (data.drugs && Array.isArray(data.drugs)) {
          drugsData = data.drugs;
        } 
        // Handle other formats as fallback
        else if (Array.isArray(data)) {
          drugsData = data;
        } else if (data.content && Array.isArray(data.content)) {
          drugsData = data.content;
        } else if (data.data && Array.isArray(data.data)) {
          drugsData = data.data;
        } else {
          // If it's an object with numeric keys, convert to array
          const values = Object.values(data);
          if (values.length > 0 && Array.isArray(values[0])) {
            drugsData = values[0];
          } else {
            drugsData = [];
          }
        }
        
        if (drugsData && drugsData.length > 0) {
          setDrugs(drugsData);
          const cats = ['All', ...new Set(drugsData.map(d => d.category).filter(Boolean))];
          setCategories(cats);
          setApiAvailable(true);
          console.log(`✅ Loaded ${drugsData.length} drugs from API`);
        } else {
          // Use local database if API returns empty
          console.log('📦 Using local drug database (API returned empty)');
          setDrugs(drugDatabase || []);
          const cats = ['All', ...new Set((drugDatabase || []).map(d => d.category).filter(Boolean))];
          setCategories(cats);
          setApiAvailable(false);
        }
      } else {
        // If API fails, use local database
        console.log('📦 Using local drug database (API unavailable)');
        setDrugs(drugDatabase || []);
        const cats = ['All', ...new Set((drugDatabase || []).map(d => d.category).filter(Boolean))];
        setCategories(cats);
        setApiAvailable(false);
      }
    } catch (error) {
      console.error('Error loading drugs:', error);
      // Fallback to local database
      setDrugs(drugDatabase || []);
      const cats = ['All', ...new Set((drugDatabase || []).map(d => d.category).filter(Boolean))];
      setCategories(cats);
      setApiAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem('drugFavorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const filterDrugs = () => {
    let result = [...drugs];
    if (searchTerm) {
      result = searchDrugs(searchTerm);
    }
    if (selectedCategory !== 'All') {
      result = result.filter(d => d.category === selectedCategory);
    }
    setFilteredDrugs(result);
  };

  const toggleFavorite = (drugId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(drugId) 
        ? prev.filter(id => id !== drugId) 
        : [...prev, drugId];
      localStorage.setItem('drugFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (drugId) => {
    return favorites.includes(drugId);
  };

  const getDrugByIdLocal = (id) => {
    return getDrugById(id);
  };

  const getCategoriesLocal = () => {
    return categories;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <DrugContext.Provider value={{
      drugs,
      filteredDrugs,
      loading,
      favorites,
      searchTerm,
      selectedCategory,
      categories,
      setSearchTerm,
      setSelectedCategory,
      toggleFavorite,
      isFavorite,
      getDrugById: getDrugByIdLocal,
      getCategories: getCategoriesLocal,
      clearFilters,
      drugCount: drugs.length,
      filteredCount: filteredDrugs.length,
      favoriteCount: favorites.length,
      apiAvailable
    }}>
      {children}
    </DrugContext.Provider>
  );
};

export default DrugContext;
