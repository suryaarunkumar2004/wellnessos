-- ============================================================
-- WELLNESSOS QUICK ACCESS DATABASE SCHEMA
-- Book Appointments | Medications | Workouts | Community | Reports | Health Tools
-- ============================================================

USE wellnessos_db;

-- ============================================================
-- 1. BOOK APPOINTMENTS
-- ============================================================

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100),
    hospital VARCHAR(200),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50) DEFAULT 'India',
    phone VARCHAR(20),
    email VARCHAR(100),
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INT DEFAULT 0,
    consultation_fee DECIMAL(10,2) DEFAULT 0,
    availability JSON,
    profile_image_url VARCHAR(500),
    years_experience INT DEFAULT 0,
    education TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO doctors (name, specialty, hospital, city, phone, email, rating, review_count, consultation_fee, years_experience, education, availability) VALUES
('Dr. Emily Carter', 'Cardiology', 'WellNest Medical Center', 'Mumbai', '+919876543001', 'emily.carter@wellnest.com', 4.9, 127, 2500, 15, 'MD - Cardiology, Harvard Medical School', '{"mon": "9-5", "tue": "9-5", "wed": "9-1", "thu": "9-5", "fri": "9-5", "sat": "9-12"}'),
('Dr. Michael Chen', 'Neurology', 'NeuroCare Institute', 'Delhi', '+919876543002', 'michael.chen@neurocare.com', 4.8, 98, 2800, 12, 'MD - Neurology, Johns Hopkins', '{"mon": "10-6", "tue": "10-6", "wed": "10-6", "thu": "10-6", "fri": "10-4"}'),
('Dr. Priya Sharma', 'Gynecology', "Women's Health Center", 'Bangalore', '+919876543003', 'priya.sharma@womenshealth.com', 4.9, 156, 2200, 18, 'MD - Gynecology, AIIMS Delhi', '{"mon": "9-5", "tue": "9-5", "wed": "9-5", "thu": "9-5", "fri": "9-5"}'),
('Dr. James Wilson', 'Orthopedics', 'OrthoCare Hospital', 'Chennai', '+919876543004', 'james.wilson@orthocare.com', 4.7, 89, 2400, 10, 'MD - Orthopedics, Stanford', '{"mon": "8-4", "tue": "8-4", "wed": "8-4", "thu": "8-4", "fri": "8-2"}'),
('Dr. Sarah Lee', 'Dermatology', 'Skin & Aesthetics Clinic', 'Hyderabad', '+919876543005', 'sarah.lee@skinaesthetics.com', 4.8, 112, 2000, 8, 'MD - Dermatology, Yale', '{"mon": "10-6", "tue": "10-6", "wed": "10-6", "thu": "10-6", "fri": "10-6"}'),
('Dr. Rachel Adams', 'Endocrinology', 'Endocrine Center', 'Pune', '+919876543006', 'rachel.adams@endocrine.com', 4.6, 76, 2600, 14, 'MD - Endocrinology, Oxford', '{"mon": "9-5", "tue": "9-5", "wed": "9-5", "thu": "9-5", "fri": "9-5"}'),
('Dr. Robert Taylor', 'Cardiology', 'Heart Institute', 'Mumbai', '+919876543007', 'robert.taylor@heartinstitute.com', 4.7, 143, 2700, 20, 'MD - Cardiology, Mayo Clinic', '{"mon": "8-4", "tue": "8-4", "wed": "8-4", "thu": "8-4", "fri": "8-2"}'),
('Dr. Maria Garcia', 'Pediatrics', "Children's Hospital", 'Delhi', '+919876543008', 'maria.garcia@childrens.com', 4.9, 200, 2100, 16, 'MD - Pediatrics, Boston Children\'s', '{"mon": "9-5", "tue": "9-5", "wed": "9-5", "thu": "9-5", "fri": "9-5"}'),
('Dr. David Kim', 'Urology', 'Urology Center', 'Bangalore', '+919876543009', 'david.kim@urology.com', 4.5, 54, 3200, 9, 'MD - Urology, Johns Hopkins', '{"mon": "10-6", "tue": "10-6", "wed": "10-6", "thu": "10-6", "fri": "10-6"}'),
('Dr. Lisa Wong', 'Ophthalmology', 'Eye Care Center', 'Chennai', '+919876543010', 'lisa.wong@eyecare.com', 4.8, 67, 2300, 11, 'MD - Ophthalmology, Harvard', '{"mon": "9-5", "tue": "9-5", "wed": "9-5", "thu": "9-5", "fri": "9-5"}');

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    doctor_id BIGINT,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INT DEFAULT 30,
    type VARCHAR(20) DEFAULT 'video',
    status VARCHAR(20) DEFAULT 'scheduled',
    symptoms TEXT,
    notes TEXT,
    meeting_link VARCHAR(500),
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL
);

INSERT IGNORE INTO appointments (user_id, doctor_id, appointment_date, appointment_time, duration_minutes, type, status, symptoms, notes) VALUES
(1, 1, '2026-07-08', '10:00:00', 30, 'video', 'confirmed', 'Chest pain, shortness of breath', 'Follow up on previous consultation'),
(1, 3, '2026-07-15', '14:30:00', 30, 'in-person', 'scheduled', 'Regular checkup', 'Annual health checkup'),
(1, 5, '2026-07-20', '09:00:00', 45, 'video', 'scheduled', 'Skin rash on arms', 'Possible allergic reaction'),
(2, 2, '2026-07-10', '11:00:00', 30, 'video', 'confirmed', 'Severe headaches', 'MRI results review'),
(2, 4, '2026-07-22', '16:00:00', 30, 'in-person', 'scheduled', 'Knee pain', 'Sports injury evaluation'),
(3, 1, '2026-07-12', '10:30:00', 30, 'video', 'confirmed', 'Irregular heartbeat', 'ECG results discussion');

-- ============================================================
-- 2. MEDICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS medications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    generic_name VARCHAR(100),
    dosage VARCHAR(50),
    dosage_unit VARCHAR(20),
    frequency VARCHAR(50),
    start_date DATE,
    end_date DATE,
    prescribed_by VARCHAR(100),
    pharmacy VARCHAR(200),
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    refill_count INT DEFAULT 0,
    max_refills INT DEFAULT 3,
    last_refill_date DATE,
    next_refill_date DATE,
    side_effects TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT IGNORE INTO medications (user_id, name, generic_name, dosage, dosage_unit, frequency, start_date, prescribed_by, pharmacy, notes, is_active, refill_count, max_refills, side_effects) VALUES
(1, 'Metformin 500mg', 'Metformin', '500', 'mg', 'Daily', '2026-01-15', 'Dr. Emily Carter', 'CVS Pharmacy', 'Take with breakfast', TRUE, 2, 3, 'Nausea, diarrhea'),
(1, 'Lisinopril 10mg', 'Lisinopril', '10', 'mg', 'Twice Daily', '2026-02-01', 'Dr. Michael Chen', 'Walgreens', 'Take morning and evening', TRUE, 1, 3, 'Dizziness, cough'),
(1, 'Atorvastatin 20mg', 'Atorvastatin', '20', 'mg', 'Daily', '2026-03-10', 'Dr. Sarah Lee', 'Rite Aid', 'Take with dinner', TRUE, 0, 3, 'Muscle pain, weakness'),
(2, 'Vitamin D3 1000IU', 'Cholecalciferol', '1000', 'IU', 'Daily', '2026-05-01', 'Dr. Priya Sharma', 'CVS Pharmacy', 'Take with meal', TRUE, 5, 5, 'None'),
(2, 'Omega-3 1000mg', 'Fish Oil', '1000', 'mg', 'Twice Daily', '2026-04-15', 'Dr. James Wilson', 'Walgreens', 'Take with food', TRUE, 3, 3, 'Fishy burps'),
(3, 'Metoprolol 25mg', 'Metoprolol', '25', 'mg', 'Twice Daily', '2026-01-20', 'Dr. Emily Carter', 'CVS Pharmacy', 'Take with breakfast and dinner', TRUE, 1, 3, 'Fatigue, dizziness');

CREATE TABLE IF NOT EXISTS medication_schedule (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    medication_id BIGINT NOT NULL,
    scheduled_time TIME NOT NULL,
    days_of_week VARCHAR(50),
    take_with_food BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE
);

INSERT IGNORE INTO medication_schedule (medication_id, scheduled_time, days_of_week, take_with_food) VALUES
(1, '08:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE),
(2, '08:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE),
(2, '20:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE),
(3, '20:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE),
(4, '09:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE),
(5, '08:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE),
(5, '20:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE);

CREATE TABLE IF NOT EXISTS medication_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    medication_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    log_date DATE NOT NULL,
    scheduled_time TIME,
    taken_time TIME,
    is_taken BOOLEAN DEFAULT FALSE,
    skipped_reason VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT IGNORE INTO medication_logs (medication_id, user_id, log_date, scheduled_time, taken_time, is_taken) VALUES
(1, 1, '2026-07-06', '08:00:00', '08:05:00', TRUE),
(1, 1, '2026-07-07', '08:00:00', '08:10:00', TRUE),
(2, 1, '2026-07-06', '08:00:00', '08:06:00', TRUE),
(2, 1, '2026-07-06', '20:00:00', '20:02:00', TRUE),
(2, 1, '2026-07-07', '08:00:00', '08:12:00', TRUE),
(3, 1, '2026-07-06', '20:00:00', '20:05:00', TRUE);

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
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT IGNORE INTO workout_plans (user_id, name, description, category, difficulty, duration_weeks, sessions_per_week, goal, is_public, is_favorite) VALUES
(1, 'Advanced Strength Training', 'Progressive overload program for muscle building', 'Strength', 'Advanced', 8, 4, 'Build muscle and increase strength', TRUE, TRUE),
(1, 'Cardio Blast Routine', 'High intensity cardio workouts', 'Cardio', 'Intermediate', 6, 5, 'Improve cardiovascular endurance', TRUE, FALSE),
(1, 'Yoga for Flexibility', 'Full body yoga flow', 'Yoga', 'Beginner', 4, 3, 'Increase flexibility and reduce stress', TRUE, TRUE),
(2, 'Beginner Fitness', 'Complete beginner workout plan', 'Fitness', 'Beginner', 4, 3, 'Build basic fitness foundation', FALSE, FALSE),
(2, 'Pilates Core Strength', 'Targeted core workout plan', 'Pilates', 'Intermediate', 6, 4, 'Build core strength and stability', TRUE, TRUE),
(3, 'HIIT Warrior', 'High intensity interval training', 'HIIT', 'Advanced', 8, 4, 'Maximize calorie burn and endurance', TRUE, TRUE);

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

INSERT IGNORE INTO workout_sessions (workout_plan_id, session_number, name, description, duration_minutes, calories_estimate, difficulty, day_of_week) VALUES
(1, 1, 'Upper Body Power', 'Chest, shoulders, triceps workout', 45, 400, 'Advanced', 1),
(1, 2, 'Lower Body Strength', 'Legs, glutes, hamstrings workout', 50, 450, 'Advanced', 2),
(1, 3, 'Pull Day', 'Back, biceps, rear delts', 45, 380, 'Advanced', 3),
(1, 4, 'Push Day', 'Chest, shoulders, triceps', 45, 390, 'Advanced', 4),
(1, 5, 'Leg Day', 'Quad focused leg workout', 50, 440, 'Advanced', 5);

CREATE TABLE IF NOT EXISTS workout_exercises (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    session_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    exercise_sets INT DEFAULT 0,
    reps INT DEFAULT 0,
    weight_kg DECIMAL(5,2) DEFAULT 0,
    rest_seconds INT DEFAULT 0,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES workout_sessions(id) ON DELETE CASCADE
);

INSERT IGNORE INTO workout_exercises (session_id, name, description, exercise_sets, reps, weight_kg, rest_seconds, order_index) VALUES
(1, 'Bench Press', 'Barbell bench press', 4, 10, 60.00, 60, 1),
(1, 'Overhead Press', 'Shoulder press', 4, 10, 40.00, 60, 2),
(1, 'Tricep Pushdown', 'Cable tricep pushdown', 3, 15, 25.00, 45, 3),
(1, 'Dumbbell Lateral Raise', 'Lateral raises for shoulders', 3, 15, 8.00, 45, 4),
(2, 'Squats', 'Barbell back squats', 4, 12, 80.00, 60, 1),
(2, 'Romanian Deadlift', 'RDL with dumbbells', 3, 12, 50.00, 60, 2),
(2, 'Lunges', 'Walking lunges with dumbbells', 3, 10, 15.00, 45, 3);

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

INSERT IGNORE INTO workout_logs (user_id, workout_plan_id, session_id, log_date, duration_minutes, calories_burned, heart_rate_avg, heart_rate_max, notes, rating) VALUES
(1, 1, 1, '2026-07-06', 45, 420, 145, 175, 'Great workout!', 5),
(1, 1, 2, '2026-07-05', 50, 460, 150, 180, 'Legs are sore but good', 4),
(1, 2, 1, '2026-07-04', 30, 310, 155, 170, 'Cardio session', 4),
(2, 3, 1, '2026-07-06', 40, 280, 120, 150, 'Flexibility improving', 5);

-- ============================================================
-- 4. COMMUNITY
-- ============================================================

CREATE TABLE IF NOT EXISTS community_posts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    post_type VARCHAR(30) DEFAULT 'text',
    category VARCHAR(50),
    likes INT DEFAULT 0,
    shares INT DEFAULT 0,
    views INT DEFAULT 0,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT IGNORE INTO community_posts (user_id, content, post_type, category, likes, shares, views) VALUES
(1, 'Just completed my first 10K run! 🏃 Feeling amazing! 45 minutes new personal best.', 'text', 'Fitness', 127, 18, 340),
(2, '10-minute morning meditation challenge - Day 30 complete! 🧘 The mental clarity is incredible.', 'text', 'Mental Health', 89, 12, 210),
(3, 'New healthy recipe: Quinoa and roasted vegetable bowl. 400 calories, 20g protein. Recipe in comments!', 'text', 'Nutrition', 156, 34, 420),
(4, 'Any tips for staying motivated during a weight loss plateau? Need some inspiration!', 'text', 'Wellness', 67, 8, 180),
(5, 'Joined the gym today! 💪 First workout done. Starting my fitness journey.', 'text', 'Fitness', 234, 28, 560),
(1, 'My progress: Lost 5kg in 2 months! Consistency is key. 💪', 'text', 'Wellness', 189, 22, 410),
(2, 'Sleep tracking: 8 hours average this week! Improving sleep quality.', 'text', 'Sleep', 98, 7, 230);

CREATE TABLE IF NOT EXISTS community_comments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    post_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    parent_id BIGINT,
    content TEXT NOT NULL,
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES community_comments(id) ON DELETE CASCADE
);

INSERT IGNORE INTO community_comments (post_id, user_id, content, likes) VALUES
(1, 2, 'Amazing achievement! �� What was your training plan?', 12),
(1, 3, 'That\'s incredible! Sub-45 is my next goal.', 8),
(1, 4, 'Congratulations! Keep pushing 💪', 5),
(2, 1, '30 days is impressive. I\'m on day 15!', 6),
(2, 5, 'How do you stay consistent with meditation?', 4),
(3, 1, 'Sounds delicious! Can you share the full recipe?', 10);

-- ============================================================
-- 5. CHALLENGES
-- ============================================================

CREATE TABLE IF NOT EXISTS challenges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    difficulty VARCHAR(20) DEFAULT 'medium',
    duration_days INT DEFAULT 7,
    points_reward INT DEFAULT 100,
    badge_icon VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    start_date DATE,
    end_date DATE,
    participants_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO challenges (name, description, category, difficulty, duration_days, points_reward, badge_icon, is_active, start_date, end_date, participants_count) VALUES
('7-Day Walking Challenge', 'Walk 10,000 steps daily for 7 days. Track your progress and earn points!', 'Fitness', 'Easy', 7, 100, '🚶', TRUE, '2026-07-01', '2026-07-08', 342),
('30-Day Yoga Challenge', 'Complete 30 yoga sessions in 30 days. Each session minimum 20 minutes.', 'Fitness', 'Medium', 30, 250, '🧘', TRUE, '2026-07-01', '2026-07-31', 189),
('Hydration Challenge', 'Drink 3L water daily for 14 days. Track your water intake daily.', 'Nutrition', 'Easy', 14, 150, '💧', TRUE, '2026-07-01', '2026-07-15', 256),
('Sleep Better Challenge', 'Get 8 hours of quality sleep for 21 days. Use sleep tracking to monitor.', 'Sleep', 'Medium', 21, 200, '😴', TRUE, '2026-07-01', '2026-07-22', 178),
('Meditation Challenge', 'Meditate 10 minutes daily for 30 days. Build the mindfulness habit.', 'Mental Health', 'Medium', 30, 300, '🧠', TRUE, '2026-07-01', '2026-07-31', 145),
('Weight Loss Challenge', 'Lose 5kg in 8 weeks. Weekly weigh-in and progress tracking.', 'Health', 'Hard', 56, 400, '⚖️', TRUE, '2026-06-15', '2026-08-10', 98);

CREATE TABLE IF NOT EXISTS user_challenges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    challenge_id BIGINT NOT NULL,
    progress_percent INT DEFAULT 0,
    completed_days INT DEFAULT 0,
    started_at DATETIME,
    completed_at DATETIME,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
);

INSERT IGNORE INTO user_challenges (user_id, challenge_id, progress_percent, completed_days, started_at, status) VALUES
(1, 1, 85, 6, '2026-07-01 00:00:00', 'active'),
(1, 2, 33, 10, '2026-07-01 00:00:00', 'active'),
(1, 4, 60, 13, '2026-07-01 00:00:00', 'active'),
(2, 2, 70, 21, '2026-07-01 00:00:00', 'active'),
(2, 5, 80, 24, '2026-07-01 00:00:00', 'active'),
(3, 3, 100, 14, '2026-07-01 00:00:00', 'completed');

-- ============================================================
-- 6. BADGES & REWARDS
-- ============================================================

CREATE TABLE IF NOT EXISTS badges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    category VARCHAR(50),
    points_value INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
('Sleep Master', '8+ hours sleep for 30 days', 'Sleep', 45),
('Protein Pro', 'Hit protein goal 30 times', 'Nutrition', 20),
('Cardio King', 'Run 100km total', 'Fitness', 35),
('Mindfulness Master', 'Meditate 1000 minutes', 'Mental Health', 40),
('Wellness Legend', 'Achieve all wellness goals', 'Milestone', 60),
('Platinum Member', 'Earn 1000+ points', 'Milestone', 50);

CREATE TABLE IF NOT EXISTS user_badges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    badge_id BIGINT NOT NULL,
    earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_badge (user_id, badge_id)
);

INSERT IGNORE INTO user_badges (user_id, badge_id, earned_at) VALUES
(1, 1, '2026-06-01 00:00:00'),
(1, 2, '2026-06-05 00:00:00'),
(1, 3, '2026-06-15 00:00:00'),
(1, 4, '2026-06-20 00:00:00'),
(1, 5, '2026-06-25 00:00:00'),
(2, 1, '2026-06-01 00:00:00'),
(2, 2, '2026-06-10 00:00:00'),
(2, 6, '2026-06-20 00:00:00'),
(3, 1, '2026-06-01 00:00:00'),
(3, 2, '2026-06-08 00:00:00');

CREATE TABLE IF NOT EXISTS point_transactions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    points INT NOT NULL,
    reason VARCHAR(100),
    reference_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT IGNORE INTO point_transactions (user_id, points, reason, reference_type) VALUES
(1, 10, 'Daily Login Bonus', 'LOGIN'),
(1, 15, '10K Steps Achieved', 'STEPS'),
(1, 25, 'Completed Workout', 'WORKOUT'),
(1, 5, 'Shared Community Post', 'SHARE'),
(1, 50, 'Completed 7-Day Challenge', 'CHALLENGE'),
(2, 10, 'Daily Login Bonus', 'LOGIN'),
(2, 15, 'Meditation Streak', 'MEDITATION'),
(2, 30, 'Completed Yoga Session', 'WORKOUT'),
(3, 10, 'Daily Login Bonus', 'LOGIN'),
(3, 20, 'Hydration Goal Met', 'WATER');

-- ============================================================
-- 7. NOTIFICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50),
    priority VARCHAR(20) DEFAULT 'normal',
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT IGNORE INTO notifications (user_id, title, content, type, priority, action_url) VALUES
(1, '💊 Medication Reminder', 'Time to take your Metformin 500mg', 'medication', 'high', '/medications'),
(1, '🏃 Daily Step Goal', 'You\'re 85% towards your daily step goal of 10,000', 'fitness', 'medium', '/health-tracker'),
(1, '�� Hydration Reminder', 'Time to drink water! You\'ve had 1.2L of 3L target', 'nutrition', 'low', '/health-tracker'),
(1, '🏆 Challenge Update', 'You\'re leading the 7-Day Walking Challenge!', 'challenge', 'high', '/community'),
(2, '🧘 Meditation Reminder', 'Your daily meditation session is due', 'mental', 'medium', '/more?tab=notifications'),
(2, '💊 Medication Reminder', 'Time to take your Vitamin D3', 'medication', 'high', '/medications'),
(3, '📊 Weekly Report', 'Your weekly health report is ready', 'report', 'medium', '/reports'),
(1, '👥 Community Update', 'Your post got 50 new likes!', 'community', 'low', '/community'),
(2, '📅 Appointment Reminder', 'Your appointment with Dr. Michael Chen is tomorrow', 'appointment', 'high', '/book-appointment'),
(1, '🎉 Achievement Unlocked', 'You earned the "10K Steps" badge!', 'achievement', 'high', '/more?tab=dashboard');

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_appointments_user_date ON appointments(user_id, appointment_date);
CREATE INDEX idx_medications_user_active ON medications(user_id, is_active);
CREATE INDEX idx_medication_logs_user_date ON medication_logs(user_id, log_date);
CREATE INDEX idx_workout_logs_user_date ON workout_logs(user_id, log_date);
CREATE INDEX idx_community_posts_created ON community_posts(created_at);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX idx_user_challenges_user_status ON user_challenges(user_id, status);

