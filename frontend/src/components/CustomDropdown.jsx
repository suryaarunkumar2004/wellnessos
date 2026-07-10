import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CustomDropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select...',
  label = '',
  labelMap = {},
  style = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const emerald = '#059669';
  const emeraldLight = '#f0fdf4';
  const emeraldHover = '#10b981';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDisplayValue = (val) => {
    if (labelMap[val]) return labelMap[val];
    return val;
  };

  const selectedOption = options.find(opt => opt === value);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', minWidth: '150px', ...style }}>
      {label && (
        <label style={{ 
          fontSize: '0.75rem', 
          color: '#475569', 
          display: 'block', 
          marginBottom: '6px',
          fontWeight: '600',
          letterSpacing: '0.3px'
        }}>
          {label}
        </label>
      )}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '8px 16px',
          borderRadius: '10px',
          border: `1px solid ${isOpen ? emerald : '#cbd5e1'}`,
          background: 'white',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.2s ease',
          boxShadow: isOpen 
            ? `0 0 0 3px rgba(16, 185, 129, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.05)` 
            : '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          minHeight: '38px',
          fontSize: '0.85rem',
          fontWeight: '500',
          boxSizing: 'border-box'
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.currentTarget.style.borderColor = emeraldHover;
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.borderColor = '#cbd5e1';
        }}
      >
        <span style={{ color: selectedOption !== undefined ? '#334155' : '#94a3b8' }}>
          {selectedOption !== undefined ? getDisplayValue(selectedOption) : placeholder}
        </span>
        {isOpen ? (
          <FaChevronUp style={{ color: emerald, fontSize: '0.75rem', marginLeft: '8px' }} />
        ) : (
          <FaChevronDown style={{ color: '#64748b', fontSize: '0.75rem', marginLeft: '8px' }} />
        )}
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          right: 0,
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #f1f5f9',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.05)',
          maxHeight: '220px',
          overflowY: 'auto',
          zIndex: 999,
          padding: '6px',
          animation: 'fadeIn 0.15s ease'
        }}>
          {options.map((option, index) => {
            const isSelected = option === value;
            return (
              <div
                key={index}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: isSelected ? 'white' : '#475569',
                  background: isSelected ? emerald : 'transparent',
                  transition: 'all 0.15s ease',
                  fontWeight: isSelected ? '600' : '500',
                  fontSize: '0.85rem',
                  marginBottom: index === options.length - 1 ? 0 : '2px',
                  display: 'flex',
                  alignItems: 'center',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = emeraldLight;
                    e.currentTarget.style.color = emerald;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#475569';
                  }
                }}
              >
                {getDisplayValue(option)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
