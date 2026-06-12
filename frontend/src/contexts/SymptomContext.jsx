import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SymptomContext = createContext(null);

export const SymptomProvider = ({ children }) => {
  const [symptoms, setSymptoms] = useState(() => {
    const saved = localStorage.getItem('symptoms');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('symptoms', JSON.stringify(symptoms));
  }, [symptoms]);

  const addSymptom = (symptom) => {
    const newSymptom = { id: uuidv4(), timestamp: Date.now(), ...symptom };
    setSymptoms((prev) => [...prev, newSymptom]);
    return newSymptom;
  };

  const updateSymptom = (id, updates) => {
    setSymptoms((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteSymptom = (id) => {
    setSymptoms((prev) => prev.filter((s) => s.id !== id));
  };

  const getSymptomsByDate = (date) => {
    return symptoms.filter((s) => new Date(s.timestamp).toDateString() === new Date(date).toDateString());
  };

  return (
    <SymptomContext.Provider
      value={{
        symptoms,
        addSymptom,
        updateSymptom,
        deleteSymptom,
        getSymptomsByDate,
      }}
    >
      {children}
    </SymptomContext.Provider>
  );
};

export const useSymptom = () => {
  const context = useContext(SymptomContext);
  if (!context) throw new Error('useSymptom must be used within SymptomProvider');
  return context;
};
