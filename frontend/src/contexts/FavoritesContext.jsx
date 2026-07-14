import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

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
  const { user } = useAuth();

  // Sync favorites with MySQL API on mount or when logged in user changes
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user && user.id) {
        try {
          const res = await fetch(`/api/favorites/user/${user.id}`);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) {
              setFavorites(data.map(item => ({
                id: item.serviceId || item.id,
                name: item.serviceName || item.name,
                ...item
              })));
              return;
            }
          }
        } catch (err) {
          console.warn('MySQL favorites fetch failed, falling back to local state:', err);
        }
      }

      try {
        const stored = localStorage.getItem(`favorites_user_${user?.id || 'guest'}`) || localStorage.getItem('globalFavorites');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setFavorites(parsed.filter(f => f && (f.id !== undefined && f.id !== null)));
          }
        }
      } catch (e) {
        console.error('Error loading fallback favorites:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  useEffect(() => {
    try {
      const key = `favorites_user_${user?.id || 'guest'}`;
      localStorage.setItem(key, JSON.stringify(favorites));
      localStorage.setItem('globalFavorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Error saving fallback favorites:', e);
    }
  }, [favorites, user]);

  const toggleFavorite = async (itemId, itemData = {}) => {
    const exists = favorites.some(item => (item.id === itemId || item.serviceId === itemId));
    const updatedFavs = exists
      ? favorites.filter(item => item.id !== itemId && item.serviceId !== itemId)
      : [...favorites, { id: itemId, ...itemData, addedAt: new Date().toISOString() }];

    setFavorites(updatedFavs);

    try {
      const key = `favorites_user_${user?.id || 'guest'}`;
      localStorage.setItem(key, JSON.stringify(updatedFavs));
      localStorage.setItem('globalFavorites', JSON.stringify(updatedFavs));
    } catch (e) {
      console.error('Error updating storage:', e);
    }

    if (user && user.id) {
      try {
        if (exists) {
          await fetch(`/api/favorites/${user.id}/${itemId}`, { method: 'DELETE' });
        } else {
          await fetch('/api/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: user.id,
              serviceId: itemId,
              serviceName: itemData.name || itemData.title || `Service #${itemId}`,
              category: itemData.category || 'General'
            })
          });
        }
      } catch (err) {
        console.warn('Failed to sync favorite with MySQL database:', err);
      }
    }
  };

  const isFavorite = (itemId) => {
    return favorites.some(item => item.id === itemId);
  };

  const removeFavorite = async (itemId) => {
    const updatedFavs = favorites.filter(item => item.id !== itemId && item.serviceId !== itemId);
    setFavorites(updatedFavs);

    try {
      const key = `favorites_user_${user?.id || 'guest'}`;
      localStorage.setItem(key, JSON.stringify(updatedFavs));
      localStorage.setItem('globalFavorites', JSON.stringify(updatedFavs));
    } catch (e) {
      console.error('Error updating storage:', e);
    }

    if (user && user.id) {
      try {
        await fetch(`/api/favorites/${user.id}/${itemId}`, { method: 'DELETE' });
      } catch (err) {
        console.warn('Failed to delete favorite from MySQL database:', err);
      }
    }
  };

  const clearFavorites = async () => {
    setFavorites([]);
    try {
      const key = `favorites_user_${user?.id || 'guest'}`;
      localStorage.setItem(key, JSON.stringify([]));
      localStorage.setItem('globalFavorites', JSON.stringify([]));
    } catch (e) {
      console.error('Error clearing storage:', e);
    }

    if (user && user.id) {
      try {
        await fetch(`/api/favorites/user/${user.id}/clear`, { method: 'DELETE' });
      } catch (err) {
        console.warn('Failed to clear favorites in MySQL database:', err);
      }
    }
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
