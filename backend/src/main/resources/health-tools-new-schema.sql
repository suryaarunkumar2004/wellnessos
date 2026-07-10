-- Additional Health Tools Tables for New Features

-- Feature 81-85: Health Monitoring
CREATE TABLE IF NOT EXISTS health_monitoring_data (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    spO2 DECIMAL(5,2),
    heart_rate INT,
    respiratory_rate INT,
    body_temperature DECIMAL(4,2),
    hydration_level DECIMAL(5,2),
    recorded_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 86-90: Stress and Sleep Analysis
CREATE TABLE IF NOT EXISTS stress_analysis (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    stress_score INT CHECK (stress_score BETWEEN 1 AND 100),
    stress_level VARCHAR(20),
    trigger_type VARCHAR(50),
    recorded_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS sleep_analysis (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    deep_sleep_minutes INT,
    rem_sleep_minutes INT,
    light_sleep_minutes INT,
    awake_minutes INT,
    quality_score INT CHECK (quality_score BETWEEN 1 AND 100),
    recorded_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 91-98: Medical Reference
CREATE TABLE IF NOT EXISTS drug_reference (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    drug_name VARCHAR(255) NOT NULL,
    generic_name VARCHAR(255),
    category VARCHAR(100),
    dosage_form VARCHAR(50),
    side_effects TEXT,
    interactions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS icd10_codes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cpt_codes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vaccine_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    vaccine_name VARCHAR(255) NOT NULL,
    dose_number INT,
    date_administered DATETIME,
    next_due_date DATETIME,
    status VARCHAR(20) DEFAULT 'pending',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 99-105: Wellness Programs
CREATE TABLE IF NOT EXISTS wellness_challenges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    challenge_name VARCHAR(255) NOT NULL,
    start_date DATETIME,
    end_date DATETIME,
    progress_percent DECIMAL(5,2) DEFAULT 0,
    tasks JSON,
    status VARCHAR(20) DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS habit_tracker (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    habit_name VARCHAR(255) NOT NULL,
    frequency VARCHAR(50),
    streak_count INT DEFAULT 0,
    completion_rate DECIMAL(5,2) DEFAULT 0,
    last_completed DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS wellness_routines (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    routine_name VARCHAR(255) NOT NULL,
    activities JSON,
    schedule VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 106-111: Specialized Tools
CREATE TABLE IF NOT EXISTS pregnancy_tracker (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    weeks_pregnant INT,
    due_date DATETIME,
    trimester INT,
    symptoms JSON,
    notes TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS child_growth_data (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    child_id BIGINT NOT NULL,
    age_months INT,
    height_cm DECIMAL(5,2),
    weight_kg DECIMAL(5,2),
    head_circumference DECIMAL(5,2),
    recorded_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS menstrual_cycle (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    cycle_start DATETIME,
    cycle_end DATETIME,
    cycle_length INT,
    phase VARCHAR(50),
    symptoms JSON,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample ICD-10 codes
INSERT IGNORE INTO icd10_codes (code, description, category) VALUES
('E11.9', 'Type 2 diabetes mellitus without complications', 'Endocrine'),
('I10', 'Essential (primary) hypertension', 'Cardiovascular'),
('J45.909', 'Unspecified asthma, uncomplicated', 'Respiratory'),
('M17.9', 'Osteoarthritis of knee, unspecified', 'Musculoskeletal'),
('F41.1', 'Generalized anxiety disorder', 'Mental Health');

-- Insert sample CPT codes
INSERT IGNORE INTO cpt_codes (code, description, category) VALUES
('99213', 'Office visit, established patient, 15 minutes', 'Evaluation'),
('99214', 'Office visit, established patient, 25 minutes', 'Evaluation'),
('93000', 'Electrocardiogram, routine ECG with 12 leads', 'Cardiology'),
('80061', 'Lipid panel (cholesterol, triglycerides, HDL, LDL)', 'Laboratory'),
('87880', 'Influenza virus test', 'Laboratory');

-- Insert sample drug references
INSERT IGNORE INTO drug_reference (drug_name, generic_name, category, dosage_form, side_effects) VALUES
('Lipitor', 'Atorvastatin', 'Statin', 'Tablet', 'Muscle pain, joint pain, diarrhea'),
('Metformin', 'Metformin', 'Biguanide', 'Tablet', 'Nausea, diarrhea, stomach upset'),
('Lisinopril', 'Lisinopril', 'ACE Inhibitor', 'Tablet', 'Cough, dizziness, headache');

-- Indexes
CREATE INDEX idx_monitoring_user_date ON health_monitoring_data(user_id, recorded_at);
CREATE INDEX idx_sleep_analysis_user_date ON sleep_analysis(user_id, recorded_at);
CREATE INDEX idx_vaccine_records_user ON vaccine_records(user_id, status);
CREATE INDEX idx_wellness_challenges_user ON wellness_challenges(user_id, status);
CREATE INDEX idx_habit_tracker_user ON habit_tracker(user_id, habit_name);
CREATE INDEX idx_pregnancy_tracker_user ON pregnancy_tracker(user_id);
CREATE INDEX idx_menstrual_cycle_user ON menstrual_cycle(user_id, cycle_start);
