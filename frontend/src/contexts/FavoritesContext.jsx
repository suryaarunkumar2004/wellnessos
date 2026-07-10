import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('globalFavorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem('globalFavorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const toggleFavorite = (itemId, itemData = {}) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === itemId);
      if (exists) {
        return prev.filter(item => item.id !== itemId);
      } else {
        return [...prev, { id: itemId, ...itemData, addedAt: new Date().toISOString() }];
      }
    });
  };

  const isFavorite = (itemId) => {
    return favorites.some(item => item.id === itemId);
  };

  const removeFavorite = (itemId) => {
    setFavorites(prev => prev.filter(item => item.id !== itemId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const getFavoritesByType = (type) => {
    return favorites.filter(item => item.type === type);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      loading,
      toggleFavorite,
      isFavorite,
      removeFavorite,
      clearFavorites,
      count: favorites.length,
      getFavoritesByType
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
