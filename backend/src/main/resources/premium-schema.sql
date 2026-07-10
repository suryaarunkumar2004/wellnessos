-- ============================================================
-- WELLNESSOS PREMIUM DATABASE SCHEMA (200+ Features)
-- ============================================================

USE wellnessos_db;

-- ============================================================
-- 1. CORE USER TABLES
-- ============================================================

-- Add columns to users with IF NOT EXISTS logic
SET @dbname = DATABASE();
SET @tablename = 'users';
SET @columnname = 'date_of_birth';
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname) = 0,
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' DATE;'),
  'SELECT 1;'
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @columnname = 'gender';
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname) = 0,
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' VARCHAR(20);'),
  'SELECT 1;'
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @columnname = 'height_cm';
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname) = 0,
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' DECIMAL(5,2);'),
  'SELECT 1;'
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @columnname = 'weight_kg';
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname) = 0,
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' DECIMAL(5,2);'),
  'SELECT 1;'
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @columnname = 'blood_group';
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname) = 0,
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' VARCHAR(5);'),
  'SELECT 1;'
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @columnname = 'fitness_level';
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname) = 0,
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' VARCHAR(20);'),
  'SELECT 1;'
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @columnname = 'dietary_preference';
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname) = 0,
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' VARCHAR(50);'),
  'SELECT 1;'
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @columnname = 'sleep_preference';
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname) = 0,
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' VARCHAR(20);'),
  'SELECT 1;'
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @columnname = 'timezone';
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname) = 0,
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' VARCHAR(50) DEFAULT ''UTC'';'),
  'SELECT 1;'
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @columnname = 'last_active';
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname) = 0,
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' DATETIME;'),
  'SELECT 1;'
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- User Profiles
CREATE TABLE IF NOT EXISTS user_profiles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE,
    bio TEXT,
    profile_picture_url VARCHAR(500),
    cover_photo_url VARCHAR(500),
    fitness_goal VARCHAR(100),
    target_weight DECIMAL(5,2),
    target_steps INT DEFAULT 10000,
    target_sleep_hours DECIMAL(4,2) DEFAULT 8.0,
    target_water_ml INT DEFAULT 3000,
    target_calories INT DEFAULT 2000,
    medical_conditions TEXT,
    allergies TEXT,
    medications TEXT,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relation VARCHAR(50),
    preferred_language VARCHAR(20) DEFAULT 'en',
    notification_preferences JSON,
    privacy_settings JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 2. HEALTH METRICS DAILY
-- ============================================================

CREATE TABLE IF NOT EXISTS health_metrics_daily (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    metric_date DATE NOT NULL,
    steps INT DEFAULT 0,
    distance_km DECIMAL(6,2) DEFAULT 0,
    calories_burned INT DEFAULT 0,
    active_minutes INT DEFAULT 0,
    workout_minutes INT DEFAULT 0,
    workout_type VARCHAR(50),
    workout_intensity VARCHAR(20),
    floors_climbed INT DEFAULT 0,
    elevation_gain DECIMAL(6,2) DEFAULT 0,
    speed_avg DECIMAL(4,2) DEFAULT 0,
    sleep_hours DECIMAL(4,2) DEFAULT 0,
    sleep_quality INT DEFAULT 0,
    deep_sleep_hours DECIMAL(4,2) DEFAULT 0,
    light_sleep_hours DECIMAL(4,2) DEFAULT 0,
    rem_sleep_hours DECIMAL(4,2) DEFAULT 0,
    wake_count INT DEFAULT 0,
    bed_time TIME,
    wake_time TIME,
    calories_consumed INT DEFAULT 0,
    protein_g DECIMAL(6,2) DEFAULT 0,
    carbs_g DECIMAL(6,2) DEFAULT 0,
    fat_g DECIMAL(6,2) DEFAULT 0,
    sugar_g DECIMAL(6,2) DEFAULT 0,
    fiber_g DECIMAL(6,2) DEFAULT 0,
    sodium_mg INT DEFAULT 0,
    cholesterol_mg INT DEFAULT 0,
    water_intake_ml INT DEFAULT 0,
    caffeine_mg INT DEFAULT 0,
    alcohol_units INT DEFAULT 0,
    heart_rate_resting INT DEFAULT 0,
    heart_rate_max INT DEFAULT 0,
    systolic_bp INT DEFAULT 0,
    diastolic_bp INT DEFAULT 0,
    blood_glucose_fasting INT DEFAULT 0,
    blood_glucose_postmeal INT DEFAULT 0,
    oxygen_saturation INT DEFAULT 0,
    weight_kg DECIMAL(5,2) DEFAULT 0,
    body_fat_percent DECIMAL(5,2) DEFAULT 0,
    muscle_mass_kg DECIMAL(5,2) DEFAULT 0,
    bone_density DECIMAL(5,2) DEFAULT 0,
    temperature_c DECIMAL(4,2) DEFAULT 0,
    mood_score INT DEFAULT 5,
    stress_level INT DEFAULT 3,
    anxiety_score INT DEFAULT 0,
    meditation_minutes INT DEFAULT 0,
    mindfulness_score INT DEFAULT 0,
    energy_level INT DEFAULT 5,
    focus_score INT DEFAULT 5,
    happiness_score INT DEFAULT 5,
    menstrual_cycle_day INT DEFAULT 0,
    ovulation_risk VARCHAR(20),
    fertility_score INT DEFAULT 0,
    pregnancy_test_result BOOLEAN DEFAULT FALSE,
    symptoms TEXT,
    sleep_temperature DECIMAL(4,2) DEFAULT 0,
    room_humidity INT DEFAULT 0,
    air_quality INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_date (user_id, metric_date)
);

-- ============================================================
-- 3. WORKOUTS
-- ============================================================

CREATE TABLE IF NOT EXISTS workout_plans (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    difficulty VARCHAR(20),
    duration_weeks INT DEFAULT 4,
    sessions_per_week INT DEFAULT 3,
    goal VARCHAR(100),
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS workout_sessions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    workout_plan_id BIGINT NOT NULL,
    session_number INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration_minutes INT DEFAULT 0,
    calories_estimate INT DEFAULT 0,
    difficulty VARCHAR(20),
    day_of_week INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workout_plan_id) REFERENCES workout_plans(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS workout_exercises (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    session_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    exercise_sets INT DEFAULT 0,
    reps INT DEFAULT 0,
    weight_kg DECIMAL(5,2) DEFAULT 0,
    duration_seconds INT DEFAULT 0,
    rest_seconds INT DEFAULT 0,
    video_url VARCHAR(500),
    image_url VARCHAR(500),
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES workout_sessions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exercise_library (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    category VARCHAR(50),
    muscle_group VARCHAR(50),
    equipment VARCHAR(100),
    difficulty VARCHAR(20),
    video_url VARCHAR(500),
    image_url VARCHAR(500),
    calories_per_minute DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workout_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    workout_plan_id BIGINT,
    session_id BIGINT,
    log_date DATE NOT NULL,
    duration_minutes INT DEFAULT 0,
    calories_burned INT DEFAULT 0,
    heart_rate_avg INT DEFAULT 0,
    heart_rate_max INT DEFAULT 0,
    notes TEXT,
    rating INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (workout_plan_id) REFERENCES workout_plans(id) ON DELETE SET NULL
);

-- ============================================================
-- 4. NUTRITION
-- ============================================================

CREATE TABLE IF NOT EXISTS meals (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    meal_type VARCHAR(20),
    calories INT DEFAULT 0,
    protein_g DECIMAL(6,2) DEFAULT 0,
    carbs_g DECIMAL(6,2) DEFAULT 0,
    fat_g DECIMAL(6,2) DEFAULT 0,
    sugar_g DECIMAL(6,2) DEFAULT 0,
    fiber_g DECIMAL(6,2) DEFAULT 0,
    sodium_mg INT DEFAULT 0,
    cholesterol_mg INT DEFAULT 0,
    is_favorite BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(500),
    recipe TEXT,
    prep_time_minutes INT DEFAULT 0,
    cook_time_minutes INT DEFAULT 0,
    servings INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS meal_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    meal_id BIGINT,
    log_date DATE NOT NULL,
    meal_type VARCHAR(20),
    calories INT DEFAULT 0,
    protein_g DECIMAL(6,2) DEFAULT 0,
    carbs_g DECIMAL(6,2) DEFAULT 0,
    fat_g DECIMAL(6,2) DEFAULT 0,
    portion_size DECIMAL(5,2) DEFAULT 1,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS food_database (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    calories_per_100g INT DEFAULT 0,
    protein_g DECIMAL(6,2) DEFAULT 0,
    carbs_g DECIMAL(6,2) DEFAULT 0,
    fat_g DECIMAL(6,2) DEFAULT 0,
    fiber_g DECIMAL(6,2) DEFAULT 0,
    sugar_g DECIMAL(6,2) DEFAULT 0,
    sodium_mg INT DEFAULT 0,
    glycemic_index INT DEFAULT 0,
    glycemic_load INT DEFAULT 0,
    vitamin_a_mcg INT DEFAULT 0,
    vitamin_c_mg DECIMAL(5,2) DEFAULT 0,
    calcium_mg DECIMAL(5,2) DEFAULT 0,
    iron_mg DECIMAL(5,2) DEFAULT 0,
    potassium_mg INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS water_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    log_date DATE NOT NULL,
    water_ml INT DEFAULT 0,
    timestamp TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_date_time (user_id, log_date, timestamp)
);

-- ============================================================
-- 5. MEDICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS medications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50),
    frequency VARCHAR(50),
    start_date DATE,
    end_date DATE,
    prescribed_by VARCHAR(100),
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS medication_schedule (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    medication_id BIGINT NOT NULL,
    scheduled_time TIME NOT NULL,
    days_of_week VARCHAR(20),
    take_with_food BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS medication_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    medication_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    log_date DATE NOT NULL,
    scheduled_time TIME,
    taken_time TIME,
    is_taken BOOLEAN DEFAULT FALSE,
    skipped_reason VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 6. APPOINTMENTS & DOCTORS
-- ============================================================

CREATE TABLE IF NOT EXISTS doctors (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100),
    hospital VARCHAR(200),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INT DEFAULT 0,
    consultation_fee DECIMAL(10,2) DEFAULT 0,
    availability JSON,
    profile_image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    doctor_id BIGINT,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INT DEFAULT 30,
    type VARCHAR(30),
    status VARCHAR(30),
    notes TEXT,
    meeting_link VARCHAR(500),
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS prescription_orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    doctor_id BIGINT,
    medication_name VARCHAR(100),
    dosage VARCHAR(50),
    frequency VARCHAR(50),
    quantity INT DEFAULT 0,
    pharmacy VARCHAR(200),
    refills_left INT DEFAULT 0,
    refill_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL
);

-- ============================================================
-- 7. BLOGS & EDUCATION
-- ============================================================

CREATE TABLE IF NOT EXISTS blog_posts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    author_id BIGINT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT,
    category VARCHAR(50),
    tags JSON,
    featured_image VARCHAR(500),
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    shares INT DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    published_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS blog_comments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    blog_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    parent_id BIGINT,
    content TEXT NOT NULL,
    likes INT DEFAULT 0,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (blog_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES blog_comments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS health_resources (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    category VARCHAR(50),
    resource_type VARCHAR(30),
    url VARCHAR(500),
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 8. COMMUNITY
-- ============================================================

CREATE TABLE IF NOT EXISTS community_posts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    media_url VARCHAR(500),
    post_type VARCHAR(30),
    category VARCHAR(50),
    likes INT DEFAULT 0,
    shares INT DEFAULT 0,
    views INT DEFAULT 0,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS challenges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    difficulty VARCHAR(20),
    duration_days INT DEFAULT 7,
    points_reward INT DEFAULT 100,
    badge_icon VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_challenges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    challenge_id BIGINT NOT NULL,
    progress_percent INT DEFAULT 0,
    started_at DATETIME,
    completed_at DATETIME,
    status VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
);

-- ============================================================
-- 9. REWARDS & GAMIFICATION
-- ============================================================

CREATE TABLE IF NOT EXISTS badges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    category VARCHAR(50),
    icon_url VARCHAR(500),
    points_value INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_badges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    badge_id BIGINT NOT NULL,
    earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_badge (user_id, badge_id)
);

CREATE TABLE IF NOT EXISTS point_transactions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    points INT NOT NULL,
    reason VARCHAR(100),
    reference_type VARCHAR(50),
    reference_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS streaks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    streak_type VARCHAR(30),
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    last_activity_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_streak_type (user_id, streak_type)
);

-- ============================================================
-- 10. REPORTS
-- ============================================================

CREATE TABLE IF NOT EXISTS health_reports (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    report_type VARCHAR(50),
    report_date DATE,
    data JSON,
    summary TEXT,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS metric_goals (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    metric_name VARCHAR(50) NOT NULL,
    target_value DECIMAL(10,2) NOT NULL,
    current_value DECIMAL(10,2) DEFAULT 0,
    unit VARCHAR(20),
    target_date DATE,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_metric (user_id, metric_name)
);

-- ============================================================
-- 11. SETTINGS
-- ============================================================

CREATE TABLE IF NOT EXISTS user_settings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE,
    theme VARCHAR(20) DEFAULT 'light',
    font_size VARCHAR(20) DEFAULT 'medium',
    language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'UTC',
    date_format VARCHAR(20) DEFAULT 'MM/DD/YYYY',
    time_format VARCHAR(20) DEFAULT '12h',
    weight_unit VARCHAR(10) DEFAULT 'kg',
    height_unit VARCHAR(10) DEFAULT 'cm',
    distance_unit VARCHAR(10) DEFAULT 'km',
    temperature_unit VARCHAR(10) DEFAULT 'celsius',
    currency VARCHAR(10) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 12. NOTIFICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS notification_preferences (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE,
    email_notifications JSON,
    push_notifications JSON,
    sms_notifications JSON,
    quiet_hours_start TIME,
    quiet_hours_end TIME,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 13. ACTIVITY LOGS
-- ============================================================

CREATE TABLE IF NOT EXISTS user_activity_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    activity_details JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_metrics_user_date ON health_metrics_daily(user_id, metric_date);
CREATE INDEX idx_workout_logs_user_date ON workout_logs(user_id, log_date);
CREATE INDEX idx_meal_logs_user_date ON meal_logs(user_id, log_date);
CREATE INDEX idx_medication_logs_user_date ON medication_logs(user_id, log_date);
CREATE INDEX idx_appointments_user_date ON appointments(user_id, appointment_date);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at);
CREATE INDEX idx_community_posts_created ON community_posts(created_at);
CREATE INDEX idx_challenges_active ON challenges(is_active);
CREATE INDEX idx_user_challenges_status ON user_challenges(user_id, status);
CREATE INDEX idx_activity_logs_user ON user_activity_logs(user_id, created_at);

-- ============================================================
-- INSERT DEFAULT DATA
-- ============================================================

INSERT IGNORE INTO badges (name, description, category, points_value) VALUES
('First Steps', 'Complete your first health tracking day', 'Milestone', 10),
('10K Steps', 'Hit 10,000 steps in one day', 'Fitness', 15),
('30-Day Streak', 'Active for 30 consecutive days', 'Milestone', 50),
('Weight Milestone', 'Reach your first weight goal', 'Health', 20),
('Hydration Hero', 'Drink 3L of water in a day', 'Nutrition', 15),
('Sleep Champion', 'Sleep 8+ hours for 7 days', 'Sleep', 25),
('Meditation Master', 'Meditate for 30 days straight', 'Mental Health', 30),
('Fitness Warrior', 'Complete 50 workouts', 'Fitness', 40),
('Healthy Eater', 'Log 100 healthy meals', 'Nutrition', 35),
('Heart Healthy', 'Maintain healthy BP for 30 days', 'Health', 30),
('Stress Buster', 'Reduce stress score by 50%', 'Mental Health', 25),
('Community Leader', 'Help 10 community members', 'Community', 20),
('Challenge Champion', 'Complete 5 challenges', 'Milestone', 30),
('Health Guru', 'Complete all health assessments', 'Education', 25),
('Sleep Master', '8+ hours sleep for 30 days', 'Sleep', 45),
('Protein Pro', 'Hit protein goal 30 times', 'Nutrition', 20),
('Cardio King', 'Run 100km total', 'Fitness', 35),
('Mindfulness Master', 'Meditate 1000 minutes', 'Mental Health', 40),
('Wellness Legend', 'Achieve all wellness goals', 'Milestone', 60),
('Platinum Member', 'Earn 1000+ points', 'Milestone', 50);

INSERT IGNORE INTO challenges (name, description, category, difficulty, duration_days, points_reward, badge_icon) VALUES
('7-Day Walking Challenge', 'Walk 10,000 steps daily for 7 days', 'Fitness', 'Easy', 7, 100, 'walk'),
('30-Day Yoga Challenge', 'Complete 30 yoga sessions in 30 days', 'Fitness', 'Medium', 30, 250, 'yoga'),
('Hydration Challenge', 'Drink 3L water daily for 14 days', 'Nutrition', 'Easy', 14, 150, 'water'),
('Sleep Better Challenge', 'Get 8 hours sleep for 21 days', 'Sleep', 'Medium', 21, 200, 'sleep'),
('Meditation Challenge', 'Meditate 10 minutes daily for 30 days', 'Mental Health', 'Medium', 30, 300, 'meditate'),
('Weight Loss Challenge', 'Lose 5kg in 8 weeks', 'Health', 'Hard', 56, 400, 'weight'),
('Healthy Eating Challenge', 'Eat 5 servings of vegetables daily', 'Nutrition', 'Easy', 30, 200, 'food'),
('Cardio Challenge', 'Run 100km in 30 days', 'Fitness', 'Hard', 30, 350, 'run'),
('Stress Reduction Challenge', 'Practice stress-relief daily', 'Mental Health', 'Medium', 30, 250, 'stress'),
('Balance Challenge', 'Balance workout, diet, and sleep for 14 days', 'Wellness', 'Medium', 14, 180, 'balance');

