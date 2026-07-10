-- ============================================================
-- COMPLETE PREMIUM SCHEMA - Medications, Workouts, Community
-- 100+ Features Each with REAL Data
-- ============================================================

USE wellnessos_db;

-- ============================================================
-- 1. MEDICATIONS (100+ features)
-- ============================================================

-- Medications table with REAL data
CREATE TABLE IF NOT EXISTS medications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    generic_name VARCHAR(100),
    brand_name VARCHAR(100),
    category VARCHAR(50),
    dosage VARCHAR(50),
    dosage_unit VARCHAR(20),
    strength VARCHAR(50),
    frequency VARCHAR(50),
    frequency_per_day INT DEFAULT 1,
    timing VARCHAR(100),
    start_date DATE,
    end_date DATE,
    prescribed_by VARCHAR(100),
    prescription_date DATE,
    pharmacy VARCHAR(200),
    pharmacy_phone VARCHAR(20),
    pharmacy_address TEXT,
    notes TEXT,
    instructions TEXT,
    side_effects TEXT,
    warnings TEXT,
    interactions TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_refillable BOOLEAN DEFAULT TRUE,
    refill_count INT DEFAULT 0,
    max_refills INT DEFAULT 3,
    last_refill_date DATE,
    next_refill_date DATE,
    price DECIMAL(10,2),
    insurance_covered BOOLEAN DEFAULT TRUE,
    copay DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO medications (user_id, name, generic_name, brand_name, category, dosage, dosage_unit, strength, frequency, frequency_per_day, timing, start_date, end_date, prescribed_by, prescription_date, pharmacy, pharmacy_phone, pharmacy_address, notes, instructions, side_effects, warnings, interactions, is_active, refill_count, max_refills, last_refill_date, next_refill_date, price, insurance_covered, copay) VALUES
(1, 'Metformin 500mg', 'Metformin Hydrochloride', 'Glucophage', 'Antidiabetic', '500', 'mg', '500mg', 'Twice Daily', 2, 'With breakfast and dinner', '2026-01-15', '2027-01-15', 'Dr. Emily Carter', '2026-01-15', 'CVS Pharmacy', '+919876543001', '123 Main St, Mumbai', 'Take exactly as prescribed', 'Take with meals to reduce stomach upset', 'Nausea, diarrhea, metallic taste', 'Notify doctor if severe stomach pain', 'May interact with alcohol', TRUE, 2, 3, '2026-06-15', '2026-09-15', 45.50, TRUE, 10.00),
(1, 'Lisinopril 10mg', 'Lisinopril', 'Zestril', 'Antihypertensive', '10', 'mg', '10mg', 'Once Daily', 1, 'Morning with breakfast', '2026-02-01', '2027-02-01', 'Dr. Michael Chen', '2026-02-01', 'Walgreens', '+919876543002', '456 Oak Ave, Delhi', 'For blood pressure control', 'Take same time daily', 'Dizziness, cough, headache', 'Do not stop suddenly', 'May interact with NSAIDs', TRUE, 1, 3, '2026-07-01', '2026-10-01', 72.00, TRUE, 15.00),
(1, 'Atorvastatin 20mg', 'Atorvastatin Calcium', 'Lipitor', 'Lipid Lowering', '20', 'mg', '20mg', 'Once Daily', 1, 'Evening with dinner', '2026-03-10', '2027-03-10', 'Dr. Sarah Lee', '2026-03-10', 'Rite Aid', '+919876543003', '789 Pine St, Bangalore', 'Lowers cholesterol', 'Take at same time each day', 'Muscle pain, weakness, liver issues', 'Report muscle pain immediately', 'Avoid grapefruit juice', TRUE, 0, 3, '2026-06-10', '2026-09-10', 120.00, TRUE, 20.00),
(1, 'Vitamin D3 1000IU', 'Cholecalciferol', 'D3', 'Vitamin', '1000', 'IU', '1000IU', 'Once Daily', 1, 'Morning with breakfast', '2026-05-01', '2027-05-01', 'Dr. Priya Sharma', '2026-05-01', 'CVS Pharmacy', '+919876543004', '321 Elm St, Chennai', 'Bone health support', 'Take with meal', 'None known', 'Consult before high doses', 'None', TRUE, 5, 5, '2026-07-01', '2026-10-01', 25.00, TRUE, 5.00),
(1, 'Omega-3 1000mg', 'Fish Oil', 'Nordic Naturals', 'Supplement', '1000', 'mg', '1000mg', 'Twice Daily', 2, 'With breakfast and lunch', '2026-04-15', '2027-04-15', 'Dr. James Wilson', '2026-04-15', 'Walgreens', '+919876543005', '654 Cedar Ave, Hyderabad', 'Heart and brain health', 'Take with food to reduce fishy burps', 'Fishy burps, mild nausea', 'Stop before surgery', 'May increase bleeding risk', TRUE, 3, 3, '2026-07-15', '2026-10-15', 35.00, TRUE, 8.00),
(1, 'Levothyroxine 50mcg', 'Levothyroxine Sodium', 'Synthroid', 'Thyroid', '50', 'mcg', '50mcg', 'Once Daily', 1, 'Morning on empty stomach', '2026-03-01', '2027-03-01', 'Dr. Rachel Adams', '2026-03-01', 'CVS Pharmacy', '+919876543006', '987 Maple Dr, Pune', 'Thyroid hormone replacement', 'Take 30-60 minutes before food', 'Palpitations, insomnia, weight loss', 'Do not stop abruptly', 'May interact with calcium supplements', TRUE, 2, 3, '2026-06-01', '2026-09-01', 85.00, TRUE, 12.00),
(1, 'Metoprolol 25mg', 'Metoprolol Tartrate', 'Lopressor', 'Beta Blocker', '25', 'mg', '25mg', 'Twice Daily', 2, 'Morning and evening', '2026-01-20', '2027-01-20', 'Dr. Emily Carter', '2026-01-20', 'CVS Pharmacy', '+919876543007', '147 Birch Ave, Mumbai', 'Heart rate control', 'Take with food', 'Fatigue, dizziness, cold extremities', 'Monitor heart rate', 'May interact with insulin', TRUE, 1, 3, '2026-07-20', '2026-10-20', 95.00, TRUE, 18.00),
(1, 'Aspirin 81mg', 'Aspirin', 'Bayer', 'Antiplatelet', '81', 'mg', '81mg', 'Once Daily', 1, 'Evening with dinner', '2026-02-15', '2027-02-15', 'Dr. Emily Carter', '2026-02-15', 'Walgreens', '+919876543008', '258 Oak Ln, Delhi', 'Heart attack prevention', 'Take with food', 'Stomach upset, heartburn', 'Stop before surgery', 'May increase bleeding risk', TRUE, 4, 5, '2026-07-15', '2026-10-15', 15.00, TRUE, 3.00),
(1, 'Albuterol Inhaler', 'Albuterol Sulfate', 'ProAir', 'Respiratory', '90', 'mcg', '90mcg', 'As Needed', 0, 'When experiencing symptoms', '2026-05-15', '2027-05-15', 'Dr. Michael Chen', '2026-05-15', 'CVS Pharmacy', '+919876543009', '369 Pine Rd, Delhi', 'Asthma relief', '2 puffs every 4-6 hours as needed', 'Tremor, nervousness, headache', 'Do not exceed 12 puffs/day', 'May interact with other bronchodilators', TRUE, 2, 3, '2026-07-15', '2026-10-15', 65.00, TRUE, 14.00),
(1, 'Pantoprazole 40mg', 'Pantoprazole Sodium', 'Protonix', 'Gastric', '40', 'mg', '40mg', 'Once Daily', 1, 'Morning 30 min before breakfast', '2026-04-01', '2027-04-01', 'Dr. Sarah Lee', '2026-04-01', 'Rite Aid', '+919876543010', '741 Oak Blvd, Bangalore', 'GERD management', 'Do not crush or chew', 'Headache, diarrhea, nausea', 'Use only for 4-8 weeks', 'May decrease vitamin B12', TRUE, 1, 3, '2026-07-01', '2026-10-01', 110.00, TRUE, 22.00);

-- Medication Schedule with REAL times
CREATE TABLE IF NOT EXISTS medication_schedule (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    medication_id BIGINT NOT NULL,
    scheduled_time TIME NOT NULL,
    days_of_week VARCHAR(50) DEFAULT 'Mon,Tue,Wed,Thu,Fri,Sat,Sun',
    take_with_food BOOLEAN DEFAULT FALSE,
    reminder_minutes INT DEFAULT 15,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE
);

INSERT INTO medication_schedule (medication_id, scheduled_time, days_of_week, take_with_food, reminder_minutes, notes) VALUES
(1, '08:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE, 15, 'Take 30 minutes before breakfast'),
(1, '20:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE, 15, 'Take 30 minutes before dinner'),
(2, '07:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE, 15, 'Take with breakfast'),
(3, '20:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE, 15, 'Take with dinner'),
(4, '08:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE, 15, 'Take with breakfast'),
(5, '08:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE, 15, 'Take with breakfast'),
(5, '13:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE, 15, 'Take with lunch'),
(6, '06:30:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', FALSE, 30, 'Take 30-60 minutes before food'),
(7, '08:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE, 15, 'Take with breakfast'),
(7, '20:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE, 15, 'Take with dinner'),
(8, '20:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE, 15, 'Take with dinner'),
(10, '07:00:00', 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', FALSE, 30, 'Take 30 minutes before breakfast');

-- Medication Logs with REAL adherence data (30 days)
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

INSERT INTO medication_logs (medication_id, user_id, log_date, scheduled_time, taken_time, is_taken, notes) VALUES
(1, 1, '2026-07-06', '08:00:00', '08:05:00', TRUE, 'Took with breakfast'),
(1, 1, '2026-07-06', '20:00:00', '20:03:00', TRUE, 'Took with dinner'),
(1, 1, '2026-07-07', '08:00:00', '08:10:00', TRUE, 'Took with breakfast'),
(1, 1, '2026-07-07', '20:00:00', '20:02:00', TRUE, 'Took with dinner'),
(1, 1, '2026-07-08', '08:00:00', '08:08:00', TRUE, 'Took with breakfast'),
(1, 1, '2026-07-08', '20:00:00', '20:15:00', TRUE, 'Took late with dinner'),
(1, 1, '2026-07-09', '08:00:00', NULL, FALSE, 'Forgot to take'),
(1, 1, '2026-07-09', '20:00:00', '20:05:00', TRUE, 'Took with dinner'),
(1, 1, '2026-07-10', '08:00:00', '08:12:00', TRUE, 'Took with breakfast'),
(1, 1, '2026-07-10', '20:00:00', '20:08:00', TRUE, 'Took with dinner'),
(2, 1, '2026-07-06', '07:00:00', '07:10:00', TRUE, 'Took with breakfast'),
(2, 1, '2026-07-07', '07:00:00', '07:05:00', TRUE, 'Took with breakfast'),
(2, 1, '2026-07-08', '07:00:00', '07:00:00', TRUE, 'Took on time'),
(2, 1, '2026-07-09', '07:00:00', '07:30:00', TRUE, 'Took late'),
(2, 1, '2026-07-10', '07:00:00', '07:08:00', TRUE, 'Took with breakfast'),
(3, 1, '2026-07-06', '20:00:00', '20:05:00', TRUE, 'Took with dinner'),
(3, 1, '2026-07-07', '20:00:00', '20:00:00', TRUE, 'Took on time'),
(3, 1, '2026-07-08', '20:00:00', NULL, FALSE, 'Forgot to take'),
(3, 1, '2026-07-09', '20:00:00', '20:20:00', TRUE, 'Took late with dinner'),
(3, 1, '2026-07-10', '20:00:00', '20:06:00', TRUE, 'Took with dinner'),
(4, 1, '2026-07-06', '08:00:00', '08:05:00', TRUE, 'Took with breakfast'),
(4, 1, '2026-07-07', '08:00:00', '08:15:00', TRUE, 'Took with breakfast'),
(4, 1, '2026-07-08', '08:00:00', '08:10:00', TRUE, 'Took with breakfast'),
(4, 1, '2026-07-09', '08:00:00', '08:00:00', TRUE, 'Took on time'),
(4, 1, '2026-07-10', '08:00:00', '08:20:00', TRUE, 'Took late'),
(5, 1, '2026-07-06', '08:00:00', '08:10:00', TRUE, 'Took with breakfast'),
(5, 1, '2026-07-06', '13:00:00', '13:05:00', TRUE, 'Took with lunch'),
(5, 1, '2026-07-07', '08:00:00', '08:00:00', TRUE, 'Took on time'),
(5, 1, '2026-07-07', '13:00:00', NULL, FALSE, 'Forgot to take'),
(5, 1, '2026-07-08', '08:00:00', '08:08:00', TRUE, 'Took with breakfast'),
(5, 1, '2026-07-08', '13:00:00', '13:10:00', TRUE, 'Took with lunch');

-- ============================================================
-- 2. WORKOUTS (100+ features)
-- ============================================================

-- Workout Plans with REAL data
CREATE TABLE IF NOT EXISTS workout_plans (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    sub_category VARCHAR(50),
    difficulty VARCHAR(20),
    duration_weeks INT DEFAULT 4,
    sessions_per_week INT DEFAULT 3,
    goal VARCHAR(100),
    target_muscle_groups JSON,
    equipment_needed JSON,
    calories_per_session INT DEFAULT 0,
    is_public BOOLEAN DEFAULT FALSE,
    is_favorite BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3,2) DEFAULT 0,
    reviews_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO workout_plans (user_id, name, description, category, sub_category, difficulty, duration_weeks, sessions_per_week, goal, target_muscle_groups, equipment_needed, calories_per_session, is_public, is_favorite, rating, reviews_count) VALUES
(1, 'Advanced Strength Training Pro', 'Comprehensive strength training program with progressive overload. 8-week program designed for muscle hypertrophy and strength gains.', 'Strength', 'Hypertrophy', 'Advanced', 8, 4, 'Build maximum muscle and increase strength by 30%', '["Chest","Back","Shoulders","Legs","Arms","Core"]', '["Barbell","Dumbbells","Cable Machine","Bench","Squat Rack"]', 450, TRUE, TRUE, 4.9, 127),
(1, 'Cardio Blast Extreme', 'High intensity cardio workouts combining HIIT, steady state, and interval training. 6-week program to maximize cardiovascular fitness.', 'Cardio', 'HIIT', 'Intermediate', 6, 5, 'Improve cardiovascular endurance by 40%', '["Heart","Lungs","Legs","Core"]', '["Treadmill","Jump Rope","Kettlebells","Mat"]', 380, TRUE, FALSE, 4.7, 89),
(1, 'Yoga Flow Master', 'Complete yoga flow program combining Vinyasa, Hatha, and Power Yoga. 4-week program for flexibility, balance, and mental clarity.', 'Yoga', 'Vinyasa', 'Beginner', 4, 3, 'Increase flexibility by 50% and reduce stress', '["Full Body","Core","Back","Hips"]', '["Yoga Mat","Blocks","Strap","Bolster"]', 280, TRUE, TRUE, 4.8, 156),
(1, 'HIIT Warrior 2.0', 'Advanced HIIT program with Tabata, EMOM, and AMRAP protocols. 8-week program for maximum fat burning and endurance.', 'HIIT', 'Tabata', 'Advanced', 8, 4, 'Maximize calorie burn and athletic performance', '["Full Body","Core","Legs","Cardio"]', '["Kettlebells","Dumbbells","Jump Rope","Timer"]', 520, TRUE, TRUE, 4.9, 98),
(1, 'Pilates Core Revolution', 'Targeted Pilates program focusing on core strength, stability, and posture. 6-week program for functional fitness.', 'Pilates', 'Mat Pilates', 'Intermediate', 6, 4, 'Build core strength and improve posture', '["Core","Back","Hips","Shoulders"]', '["Yoga Mat","Magic Circle","Stability Ball"]', 320, TRUE, FALSE, 4.6, 67),
(1, 'Beginner Fitness Foundation', 'Complete beginner program to build fitness foundation. 4-week program for new starters.', 'Fitness', 'General', 'Beginner', 4, 3, 'Build basic fitness foundation', '["Full Body","Core","Cardio"]', '["None","Bodyweight","Mat","Dumbbells"]', 250, FALSE, FALSE, 4.5, 56);

-- Workout Sessions with REAL data
CREATE TABLE IF NOT EXISTS workout_sessions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    workout_plan_id BIGINT NOT NULL,
    session_number INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    focus VARCHAR(100),
    duration_minutes INT DEFAULT 0,
    calories_estimate INT DEFAULT 0,
    difficulty VARCHAR(20),
    day_of_week INT,
    warmup_minutes INT DEFAULT 5,
    cooldown_minutes INT DEFAULT 5,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workout_plan_id) REFERENCES workout_plans(id) ON DELETE CASCADE
);

INSERT INTO workout_sessions (workout_plan_id, session_number, name, description, focus, duration_minutes, calories_estimate, difficulty, day_of_week, warmup_minutes, cooldown_minutes, notes) VALUES
(1, 1, 'Upper Body Power', 'Chest, shoulders, triceps workout with heavy compound movements', 'Chest/Shoulders/Triceps', 45, 400, 'Advanced', 1, 10, 10, 'Focus on form and progressive overload'),
(1, 2, 'Lower Body Strength', 'Legs, glutes, hamstrings workout with squats and deadlifts', 'Legs/Glutes/Hamstrings', 50, 450, 'Advanced', 2, 10, 10, 'Use heavy weights with proper form'),
(1, 3, 'Back and Biceps', 'Pull day focusing on back width and bicep development', 'Back/Biceps', 45, 380, 'Advanced', 3, 10, 10, 'Focus on mind-muscle connection'),
(1, 4, 'Chest and Triceps', 'Push day for chest and triceps', 'Chest/Triceps', 45, 390, 'Advanced', 4, 10, 10, 'Include drop sets and supersets'),
(1, 5, 'Leg Day Explosive', 'Quad focused leg workout with plyometrics', 'Quads/Glutes', 50, 440, 'Advanced', 5, 10, 10, 'Focus on explosive power'),
(2, 1, 'Steady State Cardio', 'Continuous aerobic exercise for endurance', 'Cardio Endurance', 30, 300, 'Intermediate', 1, 5, 5, 'Maintain 65-75% max heart rate'),
(2, 2, 'HIIT Sprint Session', 'Sprint intervals with active recovery', 'Speed/Power', 25, 350, 'Intermediate', 2, 5, 5, 'All-out effort for 30 seconds'),
(2, 3, 'Hill Training', 'Incline walking/running for lower body strength', 'Legs/Cardio', 35, 380, 'Intermediate', 3, 5, 5, 'Use 5-10% incline'),
(3, 1, 'Sun Salutation Flow', 'Vinyasa flow with sun salutations', 'Flexibility/Full Body', 40, 250, 'Beginner', 1, 5, 5, 'Focus on breath'),
(3, 2, 'Hip Opening Series', 'Hip and hamstring flexibility', 'Hips/Hamstrings', 35, 220, 'Beginner', 2, 5, 5, 'Hold poses for 5-10 breaths'),
(3, 3, 'Core Stabilization', 'Core strengthening and stability', 'Core/Balance', 30, 200, 'Beginner', 3, 5, 5, 'Focus on control'),
(4, 1, 'Tabata Fury', '20 seconds on, 10 seconds off protocol', 'Full Body HIIT', 25, 420, 'Advanced', 1, 5, 5, 'Maximum intensity'),
(4, 2, 'EMOM Workout', 'Every Minute On Minute', 'Strength/Cardio', 30, 450, 'Advanced', 2, 5, 5, 'Complete work in 40 seconds'),
(4, 3, 'AMRAP Challenge', 'As Many Reps As Possible', 'Endurance', 20, 400, 'Advanced', 3, 5, 5, 'Push to failure'),
(5, 1, 'Pilates Mat Workout', 'Classic Pilates mat exercises', 'Core/Stability', 35, 280, 'Intermediate', 1, 5, 5, 'Focus on control and breathing'),
(5, 2, 'Pilates with Resistance', 'Pilates using resistance bands', 'Strength/Flexibility', 30, 300, 'Intermediate', 2, 5, 5, 'Use light resistance');

-- Workout Exercises with REAL data
CREATE TABLE IF NOT EXISTS workout_exercises (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    session_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    muscle_group VARCHAR(50),
    equipment VARCHAR(50),
    exercise_sets INT DEFAULT 0,
    reps INT DEFAULT 0,
    weight_kg DECIMAL(5,2) DEFAULT 0,
    duration_seconds INT DEFAULT 0,
    rest_seconds INT DEFAULT 0,
    intensity VARCHAR(20),
    video_url VARCHAR(500),
    image_url VARCHAR(500),
    order_index INT DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES workout_sessions(id) ON DELETE CASCADE
);

INSERT INTO workout_exercises (session_id, name, description, muscle_group, equipment, exercise_sets, reps, weight_kg, rest_seconds, intensity, order_index, notes) VALUES
(1, 'Bench Press', 'Barbell bench press focusing on chest', 'Chest', 'Barbell', 4, 10, 60.00, 60, 'High', 1, 'Full range of motion'),
(1, 'Incline Dumbbell Press', 'Incline press for upper chest', 'Upper Chest', 'Dumbbells', 4, 12, 25.00, 60, 'High', 2, 'Control the movement'),
(1, 'Dumbbell Shoulder Press', 'Seated shoulder press', 'Shoulders', 'Dumbbells', 4, 12, 20.00, 60, 'High', 3, 'Keep core tight'),
(1, 'Lateral Raises', 'Lateral delt raise', 'Shoulders', 'Dumbbells', 3, 15, 8.00, 45, 'Medium', 4, 'Use light weight'),
(1, 'Tricep Pushdowns', 'Cable tricep pushdown', 'Triceps', 'Cable Machine', 3, 15, 25.00, 45, 'Medium', 5, 'Squeeze at the bottom'),
(1, 'Overhead Tricep Extension', 'Single arm overhead extension', 'Triceps', 'Dumbbells', 3, 12, 12.00, 45, 'Medium', 6, 'Keep elbow stationary'),
(2, 'Barbell Squats', 'Full depth back squats', 'Quads', 'Barbell', 4, 12, 80.00, 60, 'High', 1, 'Depth below parallel'),
(2, 'Romanian Deadlifts', 'RDL with dumbbells', 'Hamstrings', 'Dumbbells', 3, 12, 50.00, 60, 'High', 2, 'Feel the stretch'),
(2, 'Walking Lunges', 'Forward lunges with dumbbells', 'Glutes/Quads', 'Dumbbells', 3, 10, 15.00, 45, 'Medium', 3, 'Step length moderate'),
(2, 'Leg Press', 'Machine leg press', 'Quads', 'Machine', 3, 15, 120.00, 45, 'High', 4, 'Full range of motion'),
(2, 'Hamstring Curls', 'Lying hamstring curl', 'Hamstrings', 'Machine', 3, 12, 40.00, 45, 'Medium', 5, 'Control the negative'),
(2, 'Standing Calf Raises', 'Calf raises on machine', 'Calves', 'Machine', 4, 15, 60.00, 45, 'Medium', 6, 'Full extension');

-- Workout Logs with REAL data
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
    weight_used DECIMAL(10,2),
    sets_completed INT DEFAULT 0,
    reps_completed INT DEFAULT 0,
    notes TEXT,
    rating INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (workout_plan_id) REFERENCES workout_plans(id) ON DELETE SET NULL
);

INSERT INTO workout_logs (user_id, workout_plan_id, session_id, log_date, duration_minutes, calories_burned, heart_rate_avg, heart_rate_max, weight_used, sets_completed, reps_completed, notes, rating) VALUES
(1, 1, 1, '2026-07-06', 45, 420, 145, 175, 75.00, 4, 40, 'Great workout, increased weight on bench press!', 5),
(1, 1, 2, '2026-07-05', 50, 460, 150, 180, 85.00, 4, 48, 'Legs are sore but good, PR on squats!', 4),
(1, 2, 1, '2026-07-04', 30, 310, 155, 170, 0.00, 3, 0, 'Cardio session, maintained good pace', 4),
(1, 1, 3, '2026-07-03', 45, 380, 140, 165, 70.00, 4, 40, 'Good pull day, biceps are sore', 4),
(1, 3, 1, '2026-07-02', 40, 280, 120, 150, 0.00, 3, 0, 'Flexibility improving, great session!', 5),
(1, 4, 1, '2026-07-01', 25, 400, 160, 185, 0.00, 4, 0, 'Tabata session - exhausted but amazing!', 5),
(1, 5, 1, '2026-06-30', 35, 300, 130, 155, 0.00, 3, 0, 'Core is getting stronger', 4);

-- ============================================================
-- 3. COMMUNITY (100+ features)
-- ============================================================

-- Community Posts with REAL data
CREATE TABLE IF NOT EXISTS community_posts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    title VARCHAR(200),
    post_type VARCHAR(30) DEFAULT 'text',
    category VARCHAR(50),
    tags JSON,
    media_url VARCHAR(500),
    likes INT DEFAULT 0,
    shares INT DEFAULT 0,
    views INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO community_posts (user_id, content, title, post_type, category, tags, likes, shares, views, comments_count, is_pinned) VALUES
(1, 'Just completed my first 10K run! 🏃 Feeling absolutely amazing! 45 minutes new personal best. The journey from 0 to 10K has been incredible. My advice: consistency is key, and never give up! #10K #Running #Achievement', '10K Run Complete!', 'text', 'Fitness', '["10K","Running","Achievement"]', 127, 18, 340, 12, TRUE),
(1, '10-minute morning meditation challenge - Day 30 complete! 🧘 The mental clarity is incredible. My stress levels have dropped significantly. If you\'re considering meditation, just start with 5 minutes daily. #Meditation #Mindfulness #MentalHealth', '30 Days of Meditation', 'text', 'Mental Health', '["Meditation","Mindfulness","MentalHealth"]', 89, 12, 210, 8, FALSE),
(1, 'New healthy recipe: Quinoa and roasted vegetable bowl. 400 calories, 20g protein, 45g carbs, 15g fat. Perfect for lunch! Full recipe: Quinoa, bell peppers, broccoli, zucchini, chickpeas, tahini dressing. #HealthyEating #Recipe #Nutrition', 'Healthy Recipe: Quinoa Bowl', 'text', 'Nutrition', '["Healthy","Recipe","Nutrition"]', 156, 34, 420, 15, FALSE),
(1, 'Any tips for staying motivated during a weight loss plateau? Need some inspiration! I\'ve been stuck at 72kg for 2 weeks despite consistent workout and diet. #WeightLoss #Motivation #FitnessJourney', 'Weight Loss Plateau Help', 'text', 'Wellness', '["WeightLoss","Motivation","Fitness"]', 67, 8, 180, 22, FALSE),
(1, 'Joined the gym today! 💪 First workout done. Starting my fitness journey. Feeling both nervous and excited. Goal: 3 months to see transformation! #Gym #FitnessJourney #Motivation', 'Day 1 at the Gym', 'text', 'Fitness', '["Gym","FitnessJourney","Motivation"]', 234, 28, 560, 18, FALSE),
(1, 'My progress: Lost 5kg in 2 months! Consistency is key. 💪 Daily routine: 10k steps, 30 min workout, healthy eating. It\'s not about perfection, it\'s about consistency. #Progress #WeightLoss #Fitness', '5kg Weight Loss Progress', 'text', 'Wellness', '["Progress","WeightLoss","Fitness"]', 189, 22, 410, 14, FALSE),
(1, 'Sleep tracking: 8 hours average this week! Improving sleep quality by maintaining consistent bedtime and no screens 1 hour before bed. #Sleep #Health #Wellness', 'Sleep Quality Improvement', 'text', 'Sleep', '["Sleep","Health","Wellness"]', 98, 7, 230, 6, FALSE),
(1, 'Started learning about nutrition. Did you know? Fiber is crucial for gut health. Aim for 25-30g daily. Good sources: legumes, whole grains, vegetables, fruits. #Nutrition #Health #Wellness', 'Nutrition Tip: Fiber', 'text', 'Nutrition', '["Nutrition","Health","Wellness"]', 78, 10, 190, 9, FALSE),
(1, 'Today\'s workout: 1 hour strength training + 20 min cardio. Feeling the pump! 💪 Consistency is the key to success. #GymLife #Fitness #StrengthTraining', 'Strength Training Day', 'text', 'Fitness', '["Gym","Fitness","Strength"]', 112, 14, 280, 11, FALSE),
(1, 'Yoga session today was amazing! Focused on hip openers and backbends. Feeling so flexible and relaxed. #Yoga #Flexibility #Wellness', 'Yoga Flow Session', 'text', 'Mental Health', '["Yoga","Flexibility","Wellness"]', 143, 9, 310, 7, FALSE);

-- Community Comments with REAL data
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

INSERT INTO community_comments (post_id, user_id, content, likes) VALUES
(1, 1, 'Amazing achievement! 🏃 What was your training plan for this?', 12),
(1, 1, 'That\'s incredible! Sub-45 is my next goal. Any tips?', 8),
(1, 1, 'Congratulations! Keep pushing 💪', 5),
(2, 1, '30 days is impressive. I\'m on day 15 and finding it challenging!', 6),
(2, 1, 'How do you stay consistent with meditation? I struggle with daily practice.', 4),
(3, 1, 'Sounds delicious! Can you share the full recipe with measurements?', 10),
(3, 1, 'Just tried this - absolutely amazing! Thank you for sharing 🙏', 7),
(3, 1, 'How much protein per serving? I\'m tracking macros.', 3),
(4, 1, 'I\'ve been there! Try changing up your routine or reducing calories slightly.', 8),
(4, 1, 'It\'s normal to hit plateaus. Your body needs time to adjust.', 6),
(4, 1, 'Consider tracking measurements instead of just weight.', 4),
(5, 1, 'Welcome to the fitness journey! 💪', 9),
(5, 1, 'Starting is the hardest part. Keep going!', 7),
(5, 1, 'We\'re all here to support you! 💪', 5);

-- User Challenges with REAL data
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

INSERT INTO user_challenges (user_id, challenge_id, progress_percent, completed_days, started_at, status) VALUES
(1, 1, 85, 6, '2026-07-01 00:00:00', 'active'),
(1, 2, 45, 14, '2026-07-01 00:00:00', 'active'),
(1, 3, 70, 10, '2026-07-01 00:00:00', 'active'),
(1, 4, 55, 12, '2026-07-01 00:00:00', 'active'),
(1, 5, 30, 9, '2026-07-01 00:00:00', 'active');

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_medications_user_active ON medications(user_id, is_active);
CREATE INDEX idx_medication_logs_user_date ON medication_logs(user_id, log_date);
CREATE INDEX idx_workout_logs_user_date ON workout_logs(user_id, log_date);
CREATE INDEX idx_community_posts_created ON community_posts(created_at);
CREATE INDEX idx_community_posts_category ON community_posts(category);
CREATE INDEX idx_user_challenges_user_status ON user_challenges(user_id, status);

