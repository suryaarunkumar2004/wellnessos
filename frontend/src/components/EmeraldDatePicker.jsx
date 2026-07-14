import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const EmeraldDatePicker = ({ value, onChange, placeholder = 'Select Date', minDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse YYYY-MM-DD
  const parseDate = (val) => {
    if (!val) return new Date();
    const parts = val.split('-');
    if (parts.length === 3) {
      return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }
    return new Date();
  };

  const selectedDate = value ? parseDate(value) : null;
  const [viewDate, setViewDate] = useState(selectedDate || new Date());

  useEffect(() => {
    if (value) {
      setViewDate(parseDate(value));
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const emerald = '#059669';
  const emeraldLight = '#ecfdf5';
  const emeraldDark = '#047857';

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleSelectDay = (day) => {
    const year = viewDate.getFullYear();
    const month = String(viewDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${year}-${month}-${dayStr}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  const handleToday = (e) => {
    e.stopPropagation();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const dayStr = String(today.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${dayStr}`;
    setViewDate(today);
    onChange(dateStr);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
  };

  const formatDisplay = () => {
    if (!value) return '';
    const parts = value.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return value;
  };

  const [dropUp, setDropUp] = useState(false);

  const toggleOpen = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < 320 && rect.top > 320) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
    setIsOpen(!isOpen);
  };

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  // Prev month filler days
  const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Input Display Box */}
      <div
        onClick={toggleOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'white',
          border: isOpen ? `2px solid ${emerald}` : '1px solid #e2e8f0',
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: isOpen ? '0 0 0 3px rgba(5,150,105,0.15)' : 'none'
        }}
      >
        <span style={{ fontSize: '0.9rem', color: value ? '#1e293b' : '#94a3b8', fontWeight: value ? '500' : '400' }}>
          {formatDisplay() || placeholder}
        </span>
        <FaCalendarAlt style={{ color: emerald, fontSize: '1rem', flexShrink: 0 }} />
      </div>

      {/* Custom Emerald DatePicker Dropdown */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          ...(dropUp ? { bottom: 'calc(100% + 6px)' } : { top: 'calc(100% + 6px)' }),
          left: 0,
          zIndex: 99999,
          background: 'white',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          border: '1px solid #e2e8f0',
          width: '280px',
          fontFamily: "'Inter', system-ui, sans-serif"
        }}>
          {/* Header Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#1e293b' }}>
              {monthNames[currentMonth]} {currentYear}
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                type="button"
                onClick={handlePrevMonth}
                style={{
                  padding: '6px',
                  borderRadius: '8px',
                  border: 'none',
                  background: emeraldLight,
                  color: emerald,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FaChevronLeft size={10} />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                style={{
                  padding: '6px',
                  borderRadius: '8px',
                  border: 'none',
                  background: emeraldLight,
                  color: emerald,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FaChevronRight size={10} />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center', marginBottom: '6px' }}>
            {daysOfWeek.map((day, idx) => (
              <span key={idx} style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', padding: '4px 0' }}>
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
            {/* Empty filler for previous month days */}
            {[...Array(firstDay)].map((_, i) => (
              <span key={`prev-${i}`} style={{ fontSize: '0.8rem', color: '#cbd5e1', padding: '6px 0' }}>
                {prevMonthDays - firstDay + i + 1}
              </span>
            ))}

            {/* Days of current month */}
            {[...Array(daysInMonth)].map((_, i) => {
              const dayNum = i + 1;
              const isSelected = selectedDate &&
                selectedDate.getFullYear() === currentYear &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getDate() === dayNum;

              const isToday = new Date().getFullYear() === currentYear &&
                new Date().getMonth() === currentMonth &&
                new Date().getDate() === dayNum;

              return (
                <button
                  key={dayNum}
                  type="button"
                  onClick={() => handleSelectDay(dayNum)}
                  style={{
                    padding: '7px 0',
                    borderRadius: '8px',
                    border: 'none',
                    background: isSelected ? emerald : isToday ? emeraldLight : 'transparent',
                    color: isSelected ? 'white' : isToday ? emeraldDark : '#1e293b',
                    fontWeight: isSelected || isToday ? '700' : '500',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = emeraldLight;
                      e.currentTarget.style.color = emeraldDark;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = isToday ? emeraldLight : 'transparent';
                      e.currentTarget.style.color = isToday ? emeraldDark : '#1e293b';
                    }
                  }}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={handleClear}
              style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleToday}
              style={{ background: 'none', border: 'none', color: emerald, fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer' }}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmeraldDatePicker;
