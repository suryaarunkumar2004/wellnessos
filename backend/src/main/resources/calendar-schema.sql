-- Calendar Events Table
CREATE TABLE IF NOT EXISTS calendar_events (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    event_type VARCHAR(50) DEFAULT 'appointment',
    category VARCHAR(50) DEFAULT 'General',
    status VARCHAR(20) DEFAULT 'scheduled',
    priority VARCHAR(20) DEFAULT 'medium',
    location VARCHAR(255),
    is_all_day BOOLEAN DEFAULT FALSE,
    is_recurring BOOLEAN DEFAULT FALSE,
    recurring_pattern VARCHAR(50),
    recurring_end_date DATE,
    reminder_minutes INT DEFAULT 30,
    reminder_sent BOOLEAN DEFAULT FALSE,
    user_id BIGINT,
    doctor_id BIGINT,
    appointment_id BIGINT,
    color VARCHAR(7) DEFAULT '#059669',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL,

    INDEX idx_event_date (event_date),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_event_type (event_type)
);

-- Sample Events with correct column names
INSERT INTO calendar_events (title, description, event_date, start_time, end_time, event_type, category, status, priority, location, color, user_id) VALUES
('Consultation with Dr. Emily Carter', 'Regular heart checkup and follow-up', CURDATE(), '10:00:00', '11:00:00', 'appointment', 'Cardiology', 'scheduled', 'high', 'WellnessOS Video Call', '#ef4444', 1),
('Health Checkup', 'Annual physical examination', DATE_ADD(CURDATE(), INTERVAL 2 DAY), '09:30:00', '10:30:00', 'appointment', 'General Medicine', 'scheduled', 'medium', 'City Hospital', '#8b5cf6', 1),
('Dental Cleaning', 'Routine dental checkup and cleaning', DATE_ADD(CURDATE(), INTERVAL 5 DAY), '14:00:00', '15:00:00', 'appointment', 'Dentistry', 'scheduled', 'low', 'Smile Dental Clinic', '#ec4899', 1),
('Medication Reminder', 'Take blood pressure medication', CURDATE(), '08:00:00', '08:15:00', 'reminder', 'Medication', 'scheduled', 'high', 'Home', '#f59e0b', 1),
('Yoga Session', 'Morning yoga for health and wellness', CURDATE(), '06:00:00', '07:00:00', 'activity', 'Exercise', 'scheduled', 'medium', 'Home', '#14b8a6', 1),
('Lab Test: Blood Work', 'Fasting blood test for cholesterol and glucose', DATE_ADD(CURDATE(), INTERVAL 3 DAY), '07:30:00', '08:30:00', 'test', 'Lab', 'scheduled', 'high', 'City Lab Center', '#3b82f6', 1),
('Follow-up Call', 'Follow-up call with Dr. James Wilson', DATE_ADD(CURDATE(), INTERVAL 7 DAY), '11:00:00', '11:30:00', 'appointment', 'Cardiology', 'scheduled', 'medium', 'Phone Call', '#ef4444', 1);
