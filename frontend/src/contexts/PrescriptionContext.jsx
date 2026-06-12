import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PrescriptionContext = createContext(null);

export function PrescriptionProvider({ children }) {
  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem('prescriptions');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  const addPrescription = (prescription) => {
    const newPresc = {
      id: uuidv4(),
      createdAt: Date.now(),
      fulfilled: false,
      ...prescription,
    };
    setPrescriptions((prev) => [...prev, newPresc]);
    return newPresc;
  };

  const updatePrescription = (id, updates) => {
    setPrescriptions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deletePrescription = (id) => {
    setPrescriptions((prev) => prev.filter((p) => p.id !== id));
  };

  const getPrescriptions = () => prescriptions;

  const pendingCount = prescriptions.filter((p) => !p.fulfilled).length;

  return (
    <PrescriptionContext.Provider
      value={{
        prescriptions,
        addPrescription,
        updatePrescription,
        deletePrescription,
        getPrescriptions,
        pendingCount,
      }}
    >
      {children}
    </PrescriptionContext.Provider>
  );
}

export function usePrescription() {
  const context = useContext(PrescriptionContext);
  if (!context) throw new Error('usePrescription must be used within PrescriptionProvider');
  return context;
}
