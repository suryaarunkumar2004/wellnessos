-- Notifications Tables for 70+ Features

-- Feature 1-10: Notification Types
CREATE TABLE IF NOT EXISTS notification_types (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO notification_types (name, description) VALUES
('medication', 'Medication reminders and alerts'),
('appointment', 'Appointment confirmations and reminders'),
('achievement', 'Goal and achievement notifications'),
('health', 'Health tips and wellness information'),
('community', 'Community and social notifications'),
('emergency', 'Emergency and critical alerts'),
('system', 'System updates and announcements'),
('promotion', 'Promotional and marketing messages'),
('daily_digest', 'Daily summary and digest'),
('reminder', 'General reminders');

-- Feature 11-15: Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    type_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    priority VARCHAR(20) DEFAULT 'medium',
    is_read BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    read_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (type_id) REFERENCES notification_types(id)
);

-- Feature 16-20: Notification Priorities
CREATE TABLE IF NOT EXISTS notification_priorities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE,
    level INT NOT NULL,
    color VARCHAR(10),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO notification_priorities (name, level, color) VALUES
('critical', 0, '#ef4444'),
('high', 1, '#059669'),
('medium', 2, '#f59e0b'),
('low', 3, '#94a3b8');

-- Feature 21-24: Reminders Table
CREATE TABLE IF NOT EXISTS reminders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    reminder_time DATETIME NOT NULL,
    recurrence VARCHAR(50),
    priority VARCHAR(20) DEFAULT 'medium',
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 25-27: Recurring Reminders
CREATE TABLE IF NOT EXISTS recurring_reminders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    reminder_id BIGINT NOT NULL,
    recurrence_pattern VARCHAR(50) NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME,
    last_executed DATETIME,
    next_execution DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (reminder_id) REFERENCES reminders(id)
);

-- Feature 31-38: Appointment Alerts
CREATE TABLE IF NOT EXISTS appointment_alerts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    appointment_id BIGINT NOT NULL,
    alert_type VARCHAR(50) NOT NULL,
    message TEXT,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    read_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 39-46: Medication Alerts
CREATE TABLE IF NOT EXISTS medication_alerts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    medication_id BIGINT NOT NULL,
    alert_type VARCHAR(50) NOT NULL,
    message TEXT,
    alert_time DATETIME NOT NULL,
    is_acknowledged BOOLEAN DEFAULT FALSE,
    acknowledged_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 47-54: Health Alerts
CREATE TABLE IF NOT EXISTS health_alerts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    metric_type VARCHAR(50) NOT NULL,
    metric_value DECIMAL(10,2),
    normal_range_min DECIMAL(10,2),
    normal_range_max DECIMAL(10,2),
    severity VARCHAR(20) DEFAULT 'medium',
    message TEXT,
    is_resolved BOOLEAN DEFAULT FALSE,
    resolved_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 55-60: Goal Achievements
CREATE TABLE IF NOT EXISTS goal_achievements (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    goal_type VARCHAR(50) NOT NULL,
    achievement_description TEXT,
    points_earned INT DEFAULT 0,
    achieved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 61-65: Community Alerts
CREATE TABLE IF NOT EXISTS community_alerts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    alert_type VARCHAR(50) NOT NULL,
    source_user_id BIGINT,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    read_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (source_user_id) REFERENCES users(id)
);

-- Feature 66-68: User Preferences
CREATE TABLE IF NOT EXISTS notification_preferences (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    in_app_notifications BOOLEAN DEFAULT TRUE,
    daily_digest BOOLEAN DEFAULT TRUE,
    quiet_hours_start TIME DEFAULT '22:00:00',
    quiet_hours_end TIME DEFAULT '07:00:00',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 69-70: Do Not Disturb
CREATE TABLE IF NOT EXISTS do_not_disturb (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE,
    enabled BOOLEAN DEFAULT FALSE,
    until_time DATETIME,
    allowed_contacts TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 71-73: Frequency Settings
CREATE TABLE IF NOT EXISTS notification_frequency (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    frequency VARCHAR(20) DEFAULT 'immediate',
    last_sent DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_user_category (user_id, category)
);

-- Feature 74-78: Analytics Tables
CREATE TABLE IF NOT EXISTS notification_analytics (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    notification_id BIGINT NOT NULL,
    action VARCHAR(50) NOT NULL, -- read, snooze, archive, delete
    action_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (notification_id) REFERENCES notifications(id)
);

-- Feature 79-80: Bulk Operations Log
CREATE TABLE IF NOT EXISTS bulk_operations_log (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    operation_type VARCHAR(50) NOT NULL,
    affected_ids TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes for performance
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);
CREATE INDEX idx_reminders_user_time ON reminders(user_id, reminder_time);
CREATE INDEX idx_health_alerts_user ON health_alerts(user_id, is_resolved);
CREATE INDEX idx_analytics_user_action ON notification_analytics(user_id, action);

-- Views for dashboard
CREATE OR REPLACE VIEW notification_summary AS
SELECT 
    u.id AS user_id,
    COUNT(n.id) AS total_notifications,
    SUM(CASE WHEN n.is_read = FALSE THEN 1 ELSE 0 END) AS unread_count,
    SUM(CASE WHEN n.priority = 'critical' AND n.is_read = FALSE THEN 1 ELSE 0 END) AS critical_alerts,
    COUNT(DISTINCT n.type_id) AS active_categories
FROM users u
LEFT JOIN notifications n ON u.id = n.user_id AND n.is_deleted = FALSE
GROUP BY u.id;
