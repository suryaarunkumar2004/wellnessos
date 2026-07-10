import React, { createContext, useState, useContext, useEffect } from 'react';

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

  useEffect(() => {
    try {
      const stored = localStorage.getItem('globalBookmarks');
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('globalBookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  }, [bookmarks]);

  const toggleBookmark = (itemId, itemData = {}) => {
    setBookmarks(prev => {
      const exists = prev.some(item => item.id === itemId);
      if (exists) {
        return prev.filter(item => item.id !== itemId);
      } else {
        return [...prev, { id: itemId, ...itemData, addedAt: new Date().toISOString() }];
      }
    });
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
