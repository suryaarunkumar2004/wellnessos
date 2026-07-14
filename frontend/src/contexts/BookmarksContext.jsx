import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const BookmarksContext = createContext();

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const key = `bookmarks_user_${user?.id || 'guest'}`;
        const stored = localStorage.getItem(key) || localStorage.getItem('globalBookmarks');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            const valid = parsed.filter(item => item && (item.id !== undefined && item.id !== null));
            setBookmarks(valid);
          }
        }
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  useEffect(() => {
    try {
      const key = `bookmarks_user_${user?.id || 'guest'}`;
      localStorage.setItem(key, JSON.stringify(bookmarks));
      localStorage.setItem('globalBookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  }, [bookmarks, user]);

  const toggleBookmark = async (itemId, itemData = {}) => {
    const exists = bookmarks.some(item => item.id === itemId);
    const updatedBookmarks = exists
      ? bookmarks.filter(item => item.id !== itemId)
      : [...bookmarks, { id: itemId, ...itemData, addedAt: new Date().toISOString() }];

    setBookmarks(updatedBookmarks);

    if (user && user.id) {
      try {
        await fetch('/api/interactions/bookmark', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, postId: itemId })
        });
      } catch (err) {
        console.warn('MySQL bookmark sync warning:', err);
      }
    }
  };

  const isBookmarked = (itemId) => {
    return bookmarks.some(item => item.id === itemId);
  };

  const removeBookmark = (itemId) => {
    setBookmarks(prev => prev.filter(item => item.id !== itemId));
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  const getBookmarksByType = (type) => {
    return bookmarks.filter(item => item.type === type);
  };

  return (
    <BookmarksContext.Provider value={{
      bookmarks,
      loading,
      toggleBookmark,
      isBookmarked,
      removeBookmark,
      clearBookmarks,
      count: bookmarks.length,
      getBookmarksByType
    }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export default BookmarksContext;
