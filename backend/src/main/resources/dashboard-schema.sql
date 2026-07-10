-- Dashboard Tables for 70+ Features

-- Feature 1-15: Health Metrics
CREATE TABLE IF NOT EXISTS health_metrics (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    metric_type VARCHAR(50) NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20),
    recorded_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 16-25: Goals
CREATE TABLE IF NOT EXISTS user_goals (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    goal_type VARCHAR(50) NOT NULL,
    target_value DECIMAL(10,2) NOT NULL,
    current_value DECIMAL(10,2) DEFAULT 0,
    unit VARCHAR(20),
    goal_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 26-35: Health Insights
CREATE TABLE IF NOT EXISTS health_insights (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    insight_title VARCHAR(255) NOT NULL,
    insight_description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 36-45: Achievements
CREATE TABLE IF NOT EXISTS user_achievements (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    achievement_name VARCHAR(100) NOT NULL,
    achievement_description TEXT,
    unlocked BOOLEAN DEFAULT FALSE,
    unlocked_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 46-55: Quick Actions (no table needed, static data)

-- Feature 56-65: Notifications
CREATE TABLE IF NOT EXISTS user_notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    notification_title VARCHAR(255) NOT NULL,
    notification_content TEXT,
    notification_type VARCHAR(50),
    is_read BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) DEFAULT 'normal',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    read_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 66-70: Community (no table needed, static data)

-- Feature 71: Dashboard Summary (view)
CREATE OR REPLACE VIEW dashboard_summary AS
SELECT 
    u.id AS user_id,
    (SELECT COUNT(*) FROM health_metrics hm WHERE hm.user_id = u.id) AS total_metrics,
    (SELECT COUNT(*) FROM user_goals ug WHERE ug.user_id = u.id) AS total_goals,
    (SELECT COUNT(*) FROM user_achievements ua WHERE ua.user_id = u.id AND ua.unlocked = TRUE) AS unlocked_achievements,
    (SELECT COUNT(*) FROM user_notifications un WHERE un.user_id = u.id AND un.is_read = FALSE) AS unread_notifications
FROM users u;

-- Feature 72-80: Additional tables for user health data

-- User health profile
CREATE TABLE IF NOT EXISTS user_health_profile (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE,
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    blood_group VARCHAR(10),
    allergies TEXT,
    medical_conditions TEXT,
    medications TEXT,
    emergency_contact VARCHAR(100),
    emergency_phone VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Daily health logs
CREATE TABLE IF NOT EXISTS daily_health_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    log_date DATE NOT NULL,
    steps INT DEFAULT 0,
    calories_burned DECIMAL(10,2) DEFAULT 0,
    water_intake DECIMAL(10,2) DEFAULT 0,
    sleep_hours DECIMAL(4,2) DEFAULT 0,
    heart_rate INT,
    blood_pressure_systolic INT,
    blood_pressure_diastolic INT,
    mood_score INT DEFAULT 5,
    stress_level INT DEFAULT 3,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_user_date (user_id, log_date)
);

-- Achievements catalog (master list)
CREATE TABLE IF NOT EXISTS achievements_catalog (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    category VARCHAR(50),
    points INT DEFAULT 10,
    icon VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default achievements
INSERT INTO achievements_catalog (name, description, category, points) VALUES
('7 Day Streak', 'Active for 7 days straight', 'fitness', 25),
('10K Steps', 'Hit 10,000 steps in a day', 'fitness', 15),
('Daily Goals', 'Complete all daily goals', 'wellness', 20),
('Weight Milestone', 'Reached weight goal', 'health', 30),
('Sleep Champion', 'Sleep score above 90%', 'wellness', 20),
('Hydration Hero', 'Hit water goal 5 days', 'nutrition', 15),
('Consistency King', 'Active for 30 days', 'fitness', 50),
('Health Guru', 'Complete health quiz', 'education', 20),
('Fitness Master', 'Reach fitness level 10', 'fitness', 40),
('Wellness Warrior', 'Complete all wellness challenges', 'wellness', 60);

-- User loyalty points
CREATE TABLE IF NOT EXISTS user_loyalty_points (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE,
    total_points INT DEFAULT 0,
    level INT DEFAULT 1,
    tier VARCHAR(20) DEFAULT 'bronze',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- User preferences
CREATE TABLE IF NOT EXISTS user_preferences (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE,
    notification_enabled BOOLEAN DEFAULT TRUE,
    dark_mode BOOLEAN DEFAULT FALSE,
    language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'UTC',
    reminder_time TIME DEFAULT '09:00:00',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes for performance
CREATE INDEX idx_health_metrics_user_date ON health_metrics(user_id, recorded_at);
CREATE INDEX idx_user_goals_user_date ON user_goals(user_id, goal_date);
CREATE INDEX idx_daily_logs_user_date ON daily_health_logs(user_id, log_date);
CREATE INDEX idx_notifications_user_read ON user_notifications(user_id, is_read);
CREATE INDEX idx_achievements_user_unlocked ON user_achievements(user_id, unlocked);

-- Feature 80: Export data procedure
DELIMITER //
CREATE PROCEDURE export_user_health_data(IN p_user_id BIGINT)
BEGIN
    SELECT * FROM health_metrics WHERE user_id = p_user_id;
    SELECT * FROM user_goals WHERE user_id = p_user_id;
    SELECT * FROM daily_health_logs WHERE user_id = p_user_id;
    SELECT * FROM user_achievements WHERE user_id = p_user_id;
    SELECT * FROM user_notifications WHERE user_id = p_user_id;
END //
DELIMITER ;
