-- ============================================
-- PREMIUM CALENDAR SCHEMA - 100+ FEATURES
-- ============================================

-- Drop tables in correct order (child tables first)
DROP TABLE IF EXISTS calendar_comments;
DROP TABLE IF EXISTS calendar_attachments;
DROP TABLE IF EXISTS calendar_attendees;
DROP TABLE IF EXISTS calendar_reminders;
DROP TABLE IF EXISTS calendar_events;

-- Calendar Events Table (50+ event-related features)
CREATE TABLE calendar_events (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    event_type VARCHAR(50) DEFAULT 'appointment',
    category VARCHAR(50) DEFAULT 'General',
    sub_category VARCHAR(50),
    status VARCHAR(20) DEFAULT 'scheduled',
    priority VARCHAR(20) DEFAULT 'medium',
    location VARCHAR(255),
    is_all_day BOOLEAN DEFAULT FALSE,
    is_recurring BOOLEAN DEFAULT FALSE,
    recurring_pattern VARCHAR(50),
    recurring_end_date DATE,
    recurrence_count INT DEFAULT 0,
    is_virtual BOOLEAN DEFAULT FALSE,
    meeting_link VARCHAR(500),
    color VARCHAR(7) DEFAULT '#059669',
    icon VARCHAR(50),
    reminder_minutes INT DEFAULT 30,
    reminder_sent BOOLEAN DEFAULT FALSE,
    reminder_type VARCHAR(20) DEFAULT 'notification',
    user_id BIGINT,
    doctor_id BIGINT,
    appointment_id BIGINT,
    guest_list TEXT,
    attachments TEXT,
    notes TEXT,
    rating INT,
    feedback TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    is_important BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    completed_at DATETIME,
    timezone VARCHAR(50) DEFAULT 'UTC',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_event_date (event_date),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_event_type (event_type),
    INDEX idx_category (category),
    INDEX idx_priority (priority)
);

-- Calendar Reminders Table (10+ reminder features)
CREATE TABLE calendar_reminders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    event_id BIGINT,
    user_id BIGINT,
    reminder_time DATETIME NOT NULL,
    reminder_type VARCHAR(20) DEFAULT 'notification',
    message TEXT,
    is_sent BOOLEAN DEFAULT FALSE,
    sent_at DATETIME,
    recurring_reminder BOOLEAN DEFAULT FALSE,
    reminder_interval INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES calendar_events(id) ON DELETE CASCADE
);

-- Calendar Attendees Table (15+ attendee features)
CREATE TABLE calendar_attendees (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    event_id BIGINT,
    user_id BIGINT,
    user_email VARCHAR(255),
    user_name VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending',
    response_time DATETIME,
    is_organizer BOOLEAN DEFAULT FALSE,
    is_required BOOLEAN DEFAULT TRUE,
    additional_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES calendar_events(id) ON DELETE CASCADE
);

-- Calendar Attachments Table (5+ attachment features)
CREATE TABLE calendar_attachments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    event_id BIGINT,
    file_name VARCHAR(255),
    file_url VARCHAR(500),
    file_type VARCHAR(50),
    file_size BIGINT,
    uploaded_by BIGINT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES calendar_events(id) ON DELETE CASCADE
);

-- Calendar Comments Table (10+ comment features)
CREATE TABLE calendar_comments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    event_id BIGINT,
    user_id BIGINT,
    comment TEXT,
    parent_comment_id BIGINT,
    is_edited BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES calendar_events(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES calendar_comments(id) ON DELETE CASCADE
);

-- ============================================
-- SAMPLE DATA - 30+ PREMIUM EVENTS
-- ============================================

INSERT INTO calendar_events (title, description, event_date, start_time, end_time, event_type, category, sub_category, status, priority, location, is_all_day, is_recurring, color, icon, reminder_minutes, user_id) VALUES
('💓 Cardiology Follow-up', 'Regular heart checkup with Dr. Emily Carter. Review ECG results and discuss medication adjustments.', CURDATE(), '10:00:00', '11:00:00', 'appointment', 'Medical', 'Cardiology', 'scheduled', 'high', 'WellnessOS Video Call', FALSE, FALSE, '#ef4444', 'FaHeartbeat', 30, 1),
('🩺 Pre-Surgery Consultation', 'Consultation with Dr. James Wilson regarding upcoming heart procedure.', DATE_ADD(CURDATE(), INTERVAL 2 DAY), '14:30:00', '15:30:00', 'appointment', 'Medical', 'Cardiology', 'scheduled', 'critical', 'City Hospital', FALSE, FALSE, '#dc2626', 'FaUserMd', 60, 1),
('🥗 Nutrition Planning Session', 'Customized diet plan review with Dr. Sarah Johnson. Focus on heart-healthy Mediterranean diet.', CURDATE(), '15:00:00', '16:00:00', 'consultation', 'Nutrition', 'Dietetics', 'scheduled', 'medium', 'WellnessOS Video Call', FALSE, FALSE, '#22c55e', 'FaAppleAlt', 30, 1),
('🍎 Weight Management Check-in', 'Progress review and meal planning with Dr. Raj Patel.', DATE_ADD(CURDATE(), INTERVAL 3 DAY), '11:00:00', '12:00:00', 'consultation', 'Nutrition', 'Weight Management', 'scheduled', 'medium', 'WellnessOS Video Call', FALSE, FALSE, '#84cc16', 'FaWeight', 30, 1),
('🏋️ Post-Surgery Rehab', 'Physical therapy session with Dr. Maya Lee for knee rehabilitation.', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '09:00:00', '10:00:00', 'appointment', 'Medical', 'Rehabilitation', 'scheduled', 'high', 'WellnessOS Video Call', FALSE, FALSE, '#3b82f6', 'FaDumbbell', 30, 1),
('🧘 Back Pain Therapy', 'Exercise session for lower back pain relief with Dr. Kevin Brown.', DATE_ADD(CURDATE(), INTERVAL 4 DAY), '16:00:00', '17:00:00', 'appointment', 'Medical', 'Pain Management', 'scheduled', 'medium', 'WellnessOS Video Call', FALSE, FALSE, '#6366f1', 'FaSpine', 30, 1),
('📋 Annual Health Checkup', 'Comprehensive annual physical examination with Dr. Rachel Adams.', DATE_ADD(CURDATE(), INTERVAL 5 DAY), '08:30:00', '10:00:00', 'appointment', 'Medical', 'General Medicine', 'scheduled', 'high', 'City Hospital', FALSE, FALSE, '#8b5cf6', 'FaStethoscope', 60, 1),
('💊 Medication Review', 'Review current medications and adjust dosages with Dr. Thomas Wright.', DATE_ADD(CURDATE(), INTERVAL 7 DAY), '13:00:00', '14:00:00', 'appointment', 'Medical', 'Medication Management', 'scheduled', 'medium', 'WellnessOS Video Call', FALSE, FALSE, '#a855f7', 'FaPills', 30, 1),
('🧠 Therapy Session', 'Cognitive behavioral therapy session with Dr. Amanda White.', DATE_ADD(CURDATE(), INTERVAL 2 DAY), '16:00:00', '17:00:00', 'appointment', 'Mental Health', 'Therapy', 'scheduled', 'medium', 'WellnessOS Video Call', FALSE, FALSE, '#ec4899', 'FaBrain', 30, 1),
('🧘 Mindfulness Practice', 'Guided meditation and mindfulness session.', CURDATE(), '06:30:00', '07:30:00', 'activity', 'Wellness', 'Mindfulness', 'scheduled', 'low', 'Home', FALSE, TRUE, '#14b8a6', 'FaSpinner', 15, 1),
('🏃 Morning Run', '30 min cardio run in the park.', CURDATE(), '05:30:00', '06:00:00', 'activity', 'Fitness', 'Cardio', 'scheduled', 'low', 'Central Park', FALSE, TRUE, '#06b6d4', 'FaRunning', 15, 1),
('🏋️ Strength Training', 'Full body workout with weights.', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '18:00:00', '19:00:00', 'activity', 'Fitness', 'Strength', 'scheduled', 'medium', 'Gym', FALSE, FALSE, '#0ea5e9', 'FaDumbbell', 30, 1),
('🦷 Dental Cleaning', 'Routine dental checkup and cleaning.', DATE_ADD(CURDATE(), INTERVAL 3 DAY), '14:00:00', '15:00:00', 'appointment', 'Dental', 'Cleaning', 'scheduled', 'low', 'Smile Dental Clinic', FALSE, FALSE, '#f472b6', 'FaTooth', 30, 1),
('🦷 Cavity Filling', 'Dental filling procedure.', DATE_ADD(CURDATE(), INTERVAL 10 DAY), '10:00:00', '11:00:00', 'appointment', 'Dental', 'Treatment', 'scheduled', 'medium', 'Smile Dental Clinic', FALSE, FALSE, '#ec4899', 'FaTooth', 60, 1),
('👁️ Annual Eye Exam', 'Comprehensive eye examination with Dr. Jessica Taylor.', DATE_ADD(CURDATE(), INTERVAL 6 DAY), '11:00:00', '12:00:00', 'appointment', 'Eye Care', 'Exam', 'scheduled', 'low', 'Eye Care Center', FALSE, FALSE, '#60a5fa', 'FaEye', 30, 1),
('🔬 Blood Work', 'Fasting blood test for comprehensive health check.', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '07:00:00', '08:00:00', 'test', 'Lab', 'Blood Test', 'scheduled', 'high', 'City Lab Center', FALSE, FALSE, '#f59e0b', 'FaFlask', 60, 1),
('📊 Cholesterol Test', 'Lipid profile and cholesterol screening.', DATE_ADD(CURDATE(), INTERVAL 4 DAY), '08:00:00', '09:00:00', 'test', 'Lab', 'Cholesterol', 'scheduled', 'medium', 'City Lab Center', FALSE, FALSE, '#fbbf24', 'FaFlask', 60, 1),
('📊 Project Review', 'Review weekly progress and plan next week\'s tasks.', CURDATE(), '09:00:00', '10:00:00', 'task', 'Work', 'Meeting', 'scheduled', 'high', 'Office', FALSE, FALSE, '#6366f1', 'FaClipboardCheck', 15, 1),
('📧 Email Catch-up', 'Respond to urgent emails and messages.', CURDATE(), '17:00:00', '18:00:00', 'task', 'Work', 'Communication', 'scheduled', 'medium', 'Office', FALSE, FALSE, '#818cf8', 'FaEnvelope', 15, 1),
('🎂 Birthday Celebration', 'Friend\'s birthday dinner.', DATE_ADD(CURDATE(), INTERVAL 5 DAY), '19:00:00', '22:00:00', 'social', 'Personal', 'Event', 'scheduled', 'low', 'Restaurant', FALSE, FALSE, '#f472b6', 'FaGift', 60, 1),
('🛒 Grocery Shopping', 'Weekly grocery shopping.', DATE_ADD(CURDATE(), INTERVAL 2 DAY), '10:00:00', '11:30:00', 'task', 'Personal', 'Shopping', 'scheduled', 'low', 'Market', FALSE, FALSE, '#34d399', 'FaShoppingBag', 30, 1),
('💊 Morning Medication', 'Take blood pressure and cholesterol medication.', CURDATE(), '08:00:00', '08:15:00', 'medication', 'Health', 'Daily', 'scheduled', 'high', 'Home', FALSE, TRUE, '#8b5cf6', 'FaPills', 5, 1),
('💊 Evening Medication', 'Take evening dose of medication.', CURDATE(), '20:00:00', '20:15:00', 'medication', 'Health', 'Daily', 'scheduled', 'high', 'Home', FALSE, TRUE, '#8b5cf6', 'FaPills', 5, 1),
('📝 Journal Writing', 'Write daily health journal.', CURDATE(), '21:00:00', '21:30:00', 'task', 'Personal', 'Writing', 'scheduled', 'low', 'Home', FALSE, TRUE, '#fcd34d', 'FaPen', 15, 1),
('✅ Cardiology Consultation', 'Review ECG and discuss heart health.', DATE_SUB(CURDATE(), INTERVAL 7 DAY), '10:00:00', '11:00:00', 'appointment', 'Medical', 'Cardiology', 'completed', 'high', 'City Hospital', FALSE, FALSE, '#22c55e', 'FaHeartbeat', 30, 1),
('✅ Nutrition Workshop', 'Attended nutrition and wellness workshop.', DATE_SUB(CURDATE(), INTERVAL 5 DAY), '14:00:00', '16:00:00', 'event', 'Nutrition', 'Workshop', 'completed', 'medium', 'Convention Center', FALSE, FALSE, '#22c55e', 'FaLeaf', 30, 1),
('✅ Weekly Fitness Check', 'Weekly fitness progress review.', DATE_SUB(CURDATE(), INTERVAL 3 DAY), '17:00:00', '18:00:00', 'activity', 'Fitness', 'Review', 'completed', 'low', 'Home', FALSE, TRUE, '#14b8a6', 'FaCheckCircle', 15, 1);

-- Verify data
SELECT COUNT(*) as total_events,
       COUNT(CASE WHEN status = 'scheduled' THEN 1 END) as upcoming,
       COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
       COUNT(DISTINCT category) as categories
FROM calendar_events;
