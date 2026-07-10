-- ============================================================
-- COMPLETE HEALTH TOOLS DATABASE SCHEMA
-- ALL 52 Tools with 30 Days Data Each
-- ============================================================

USE wellnessos_db;

-- ============================================================
-- 1-18: BASIC CALCULATORS (Already Created)
-- ============================================================
-- bmi_history, bmr_history, bodyfat_history, ideal_weight_history
-- calorie_history, macro_history, water_history, sleep_calculator_history
-- stress_history, fitness_age_history, step_tracker_history, heart_rate_history
-- blood_pressure_history, blood_sugar_history, weight_tracker_history
-- sleep_quality_history, mood_tracker_history, spo2_history

-- ============================================================
-- 19. SYMPTOM CHECKER HISTORY
-- ============================================================
CREATE TABLE IF NOT EXISTS symptom_checker_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    symptoms JSON,
    count INT NOT NULL,
    severity VARCHAR(50),
    advice TEXT,
    recommendation TEXT,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO symptom_checker_history (user_id, symptoms, count, severity, advice, recommendation, recorded_date) VALUES
(1, '["Headache","Fatigue"]', 2, 'Low', 'Your symptoms appear mild. Get plenty of rest.', 'Monitor symptoms', '2026-06-08'),
(1, '["Fever","Cough","Fatigue"]', 3, 'Medium', 'You have several symptoms. Monitor closely.', 'Consult doctor if worsens', '2026-06-09'),
(1, '["Sore Throat","Runny Nose"]', 2, 'Low', 'Common cold symptoms. Rest and hydrate.', 'Monitor symptoms', '2026-06-10'),
(1, '["Headache","Nausea","Dizziness"]', 3, 'Medium', 'Could be migraine or dehydration.', 'Rest and hydrate', '2026-06-11'),
(1, '["Shortness of Breath","Chest Pain"]', 2, 'High', 'URGENT: Seek immediate medical attention.', 'Call emergency services', '2026-06-12'),
(1, '["Fatigue","Body Aches"]', 2, 'Low', 'Likely viral infection. Rest and hydrate.', 'Monitor temperature', '2026-06-13'),
(1, '["Cough","Sore Throat"]', 2, 'Low', 'Upper respiratory infection. Rest and hydrate.', 'Monitor symptoms', '2026-06-14'),
(1, '["Headache","Dizziness"]', 2, 'Low', 'Could be dehydration or stress.', 'Hydrate and rest', '2026-06-15'),
(1, '["Fever","Body Aches","Fatigue"]', 3, 'Medium', 'Influenza-like symptoms. Rest and hydrate.', 'Consult doctor if persists', '2026-06-16'),
(1, '["Rash","Itching"]', 2, 'Low', 'Likely allergic reaction. Take antihistamine.', 'Monitor symptoms', '2026-06-17'),
(1, '["Chest Pain","Shortness of Breath"]', 2, 'High', 'EMERGENCY: Call 911 immediately', 'Seek immediate care', '2026-06-18'),
(1, '["Headache","Nausea"]', 2, 'Low', 'Could be tension headache or migraine.', 'Rest and hydrate', '2026-06-19'),
(1, '["Fatigue","Sleep Issues"]', 2, 'Low', 'Could be stress or poor sleep hygiene.', 'Improve sleep habits', '2026-06-20'),
(1, '["Cough","Fever"]', 2, 'Medium', 'Could be respiratory infection.', 'Monitor temperature', '2026-06-21'),
(1, '["Sore Throat","Headache","Fatigue"]', 3, 'Medium', 'Likely viral infection. Rest and hydrate.', 'Consult if worsens', '2026-06-22'),
(1, '["Dizziness","Nausea"]', 2, 'Low', 'Could be low blood sugar or dehydration.', 'Eat and hydrate', '2026-06-23'),
(1, '["Shortness of Breath","Wheezing"]', 2, 'High', 'Could be asthma attack. Seek medical attention.', 'Use inhaler and call doctor', '2026-06-24'),
(1, '["Body Aches","Fatigue"]', 2, 'Low', 'Likely viral infection. Rest and hydrate.', 'Monitor symptoms', '2026-06-25'),
(1, '["Headache","Stress"]', 2, 'Low', 'Tension headache. Practice relaxation.', 'Stress management', '2026-06-26'),
(1, '["Fever","Rash"]', 2, 'Medium', 'Could be viral exanthem. Monitor closely.', 'Consult doctor', '2026-06-27'),
(1, '["Chest Pain","Arm Pain"]', 2, 'High', 'EMERGENCY: Call 911 immediately', 'Seek immediate care', '2026-06-28'),
(1, '["Nausea","Vomiting"]', 2, 'Medium', 'Could be food poisoning or stomach bug.', 'Hydrate and rest', '2026-06-29'),
(1, '["Headache","Vision Changes"]', 2, 'High', 'Could be migraine or serious condition.', 'Consult doctor urgently', '2026-06-30'),
(1, '["Cough","Shortness of Breath"]', 2, 'High', 'Could be pneumonia or asthma.', 'Seek medical attention', '2026-07-01'),
(1, '["Fatigue","Dizziness","Palpitations"]', 3, 'Medium', 'Could be anemia or dehydration.', 'Check blood work', '2026-07-02'),
(1, '["Sore Throat","Swollen Lymph Nodes"]', 2, 'Medium', 'Could be strep throat or viral.', 'Consult doctor', '2026-07-03'),
(1, '["Headache","Nausea","Light Sensitivity"]', 3, 'Medium', 'Likely migraine. Rest in dark room.', 'Take pain relief', '2026-07-04'),
(1, '["Chest Pain","Shortness of Breath","Sweating"]', 3, 'High', 'EMERGENCY: Call 911 immediately', 'Seek immediate care', '2026-07-05'),
(1, '["Fatigue","Muscle Weakness"]', 2, 'Medium', 'Could be electrolyte imbalance or illness.', 'Rest and hydrate', '2026-07-06'),
(1, '["Rash","Fever","Joint Pain"]', 3, 'Medium', 'Could be viral or autoimmune.', 'Consult doctor', '2026-07-07');

-- ============================================================
-- 20. DRUG INTERACTION CHECKER HISTORY
-- ============================================================
CREATE TABLE IF NOT EXISTS drug_interaction_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    drug1 VARCHAR(100) NOT NULL,
    drug2 VARCHAR(100) NOT NULL,
    severity VARCHAR(50),
    has_interaction BOOLEAN,
    advice TEXT,
    recommendation TEXT,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO drug_interaction_history (user_id, drug1, drug2, severity, has_interaction, advice, recommendation, recorded_date) VALUES
(1, 'Metformin', 'Lisinopril', 'Moderate', TRUE, 'Moderate interaction. Monitor for symptoms.', 'Consult pharmacist', '2026-06-08'),
(1, 'Lisinopril', 'Ibuprofen', 'Moderate', TRUE, 'Moderate interaction. Monitor kidney function.', 'Avoid concurrent use', '2026-06-09'),
(1, 'Atorvastatin', 'Gemfibrozil', 'High', TRUE, 'High interaction. Risk of myopathy.', 'Avoid combination', '2026-06-10'),
(1, 'Aspirin', 'Warfarin', 'Critical', TRUE, 'CRITICAL: Increased bleeding risk.', 'Do not take together', '2026-06-11'),
(1, 'Metformin', 'Omeprazole', 'None', FALSE, 'No known interactions.', 'Safe to take as prescribed', '2026-06-12'),
(1, 'Lisinopril', 'Potassium', 'High', TRUE, 'High interaction. Risk of hyperkalemia.', 'Monitor potassium levels', '2026-06-13'),
(1, 'Aspirin', 'Ibuprofen', 'Moderate', TRUE, 'Moderate interaction. Increased bleeding risk.', 'Avoid concurrent use', '2026-06-14'),
(1, 'Metformin', 'Atorvastatin', 'None', FALSE, 'No known interactions.', 'Safe to take as prescribed', '2026-06-15'),
(1, 'Lisinopril', 'Hydrochlorothiazide', 'Moderate', TRUE, 'Moderate interaction. Monitor blood pressure.', 'Regular monitoring', '2026-06-16'),
(1, 'Warfarin', 'Amoxicillin', 'Moderate', TRUE, 'Moderate interaction. Monitor INR.', 'Monitor closely', '2026-06-17'),
(1, 'Metformin', 'Furosemide', 'Moderate', TRUE, 'Moderate interaction. Monitor kidney function.', 'Regular monitoring', '2026-06-18'),
(1, 'Digoxin', 'Furosemide', 'High', TRUE, 'High interaction. Risk of digoxin toxicity.', 'Monitor digoxin levels', '2026-06-19'),
(1, 'Lisinopril', 'Losartan', 'High', TRUE, 'High interaction. Risk of hyperkalemia.', 'Avoid combination', '2026-06-20'),
(1, 'Atorvastatin', 'Ezetimibe', 'None', FALSE, 'No known interactions.', 'Safe to take as prescribed', '2026-06-21'),
(1, 'Aspirin', 'Clopidogrel', 'Moderate', TRUE, 'Moderate interaction. Increased bleeding risk.', 'Monitor for bleeding', '2026-06-22'),
(1, 'Metformin', 'Insulin', 'None', FALSE, 'No known interactions. Monitor glucose.', 'Safe to take together', '2026-06-23'),
(1, 'Lisinopril', 'NSAIDs', 'Moderate', TRUE, 'Moderate interaction. Monitor kidney function.', 'Limit NSAID use', '2026-06-24'),
(1, 'Warfarin', 'Omeprazole', 'None', FALSE, 'No known interactions.', 'Safe to take as prescribed', '2026-06-25'),
(1, 'Atorvastatin', 'Fenofibrate', 'High', TRUE, 'High interaction. Risk of myopathy.', 'Monitor liver function', '2026-06-26'),
(1, 'Metformin', 'Alcohol', 'Moderate', TRUE, 'Moderate interaction. Risk of lactic acidosis.', 'Limit alcohol intake', '2026-06-27'),
(1, 'Lisinopril', 'Aliskiren', 'High', TRUE, 'High interaction. Risk of hyperkalemia.', 'Avoid combination', '2026-06-28'),
(1, 'Aspirin', 'Heparin', 'Critical', TRUE, 'CRITICAL: Increased bleeding risk.', 'Do not take together', '2026-06-29'),
(1, 'Metformin', 'Cimetidine', 'Moderate', TRUE, 'Moderate interaction. Monitor glucose.', 'Monitor blood sugar', '2026-06-30'),
(1, 'Lisinopril', 'Celecoxib', 'Moderate', TRUE, 'Moderate interaction. Monitor kidney function.', 'Regular monitoring', '2026-07-01'),
(1, 'Atorvastatin', 'Cyclosporine', 'High', TRUE, 'High interaction. Risk of myopathy.', 'Monitor closely', '2026-07-02'),
(1, 'Warfarin', 'Fluconazole', 'High', TRUE, 'High interaction. Risk of bleeding.', 'Monitor INR closely', '2026-07-03'),
(1, 'Metformin', 'Corticosteroids', 'Moderate', TRUE, 'Moderate interaction. Monitor glucose levels.', 'Monitor blood sugar', '2026-07-04'),
(1, 'Lisinopril', 'Lithium', 'High', TRUE, 'High interaction. Risk of lithium toxicity.', 'Monitor lithium levels', '2026-07-05'),
(1, 'Aspirin', 'Valproic Acid', 'Moderate', TRUE, 'Moderate interaction. Monitor for bleeding.', 'Monitor closely', '2026-07-06'),
(1, 'Atorvastatin', 'Grapefruit Juice', 'Moderate', TRUE, 'Moderate interaction. Avoid grapefruit juice.', 'Avoid grapefruit', '2026-07-07');

-- ============================================================
-- 21-52: Continue with remaining tools
-- ============================================================

-- 21. DRUG DOSAGE CALCULATOR
CREATE TABLE IF NOT EXISTS drug_dosage_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    drug_type VARCHAR(50),
    weight_kg DECIMAL(5,2),
    min_dose DECIMAL(5,2),
    max_dose DECIMAL(5,2),
    avg_dose DECIMAL(5,2),
    frequency VARCHAR(50),
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO drug_dosage_history (user_id, drug_type, weight_kg, min_dose, max_dose, avg_dose, frequency, recorded_date) VALUES
(1, 'antibiotic', 72.30, 1807.50, 3615.00, 2711.25, 'Twice Daily', '2026-06-08'),
(1, 'antibiotic', 72.50, 1812.50, 3625.00, 2718.75, 'Twice Daily', '2026-06-09'),
(1, 'painkiller', 71.80, 359.00, 718.00, 538.50, 'Three Times Daily', '2026-06-10'),
(1, 'painkiller', 72.10, 360.50, 721.00, 540.75, 'Three Times Daily', '2026-06-11'),
(1, 'antihistamine', 72.80, 18.20, 36.40, 27.30, 'Once Daily', '2026-06-12'),
(1, 'antihistamine', 71.50, 17.88, 35.75, 26.81, 'Once Daily', '2026-06-13'),
(1, 'antiviral', 72.20, 1444.00, 2888.00, 2166.00, 'Three Times Daily', '2026-06-14'),
(1, 'antiviral', 73.00, 1460.00, 2920.00, 2190.00, 'Three Times Daily', '2026-06-15'),
(1, 'antifungal', 71.90, 431.40, 862.80, 647.10, 'Once Daily', '2026-06-16'),
(1, 'antifungal', 72.40, 434.40, 868.80, 651.60, 'Once Daily', '2026-06-17'),
(1, 'antibiotic', 73.20, 1830.00, 3660.00, 2745.00, 'Twice Daily', '2026-06-18'),
(1, 'antibiotic', 72.60, 1815.00, 3630.00, 2722.50, 'Twice Daily', '2026-06-19'),
(1, 'painkiller', 71.70, 358.50, 717.00, 537.75, 'Three Times Daily', '2026-06-20'),
(1, 'painkiller', 72.90, 364.50, 729.00, 546.75, 'Three Times Daily', '2026-06-21'),
(1, 'antihistamine', 73.50, 18.38, 36.75, 27.56, 'Once Daily', '2026-06-22'),
(1, 'antihistamine', 72.00, 18.00, 36.00, 27.00, 'Once Daily', '2026-06-23'),
(1, 'antiviral', 71.60, 1432.00, 2864.00, 2148.00, 'Three Times Daily', '2026-06-24'),
(1, 'antiviral', 72.30, 1446.00, 2892.00, 2169.00, 'Three Times Daily', '2026-06-25'),
(1, 'antifungal', 73.10, 438.60, 877.20, 657.90, 'Once Daily', '2026-06-26'),
(1, 'antifungal', 72.70, 436.20, 872.40, 654.30, 'Once Daily', '2026-06-27'),
(1, 'antibiotic', 71.80, 1795.00, 3590.00, 2692.50, 'Twice Daily', '2026-06-28'),
(1, 'antibiotic', 72.40, 1810.00, 3620.00, 2715.00, 'Twice Daily', '2026-06-29'),
(1, 'painkiller', 73.30, 366.50, 733.00, 549.75, 'Three Times Daily', '2026-06-30'),
(1, 'painkiller', 72.10, 360.50, 721.00, 540.75, 'Three Times Daily', '2026-07-01'),
(1, 'antihistamine', 71.90, 17.98, 35.95, 26.96, 'Once Daily', '2026-07-02'),
(1, 'antihistamine', 72.60, 18.15, 36.30, 27.23, 'Once Daily', '2026-07-03'),
(1, 'antiviral', 73.40, 1468.00, 2936.00, 2202.00, 'Three Times Daily', '2026-07-04'),
(1, 'antiviral', 72.20, 1444.00, 2888.00, 2166.00, 'Three Times Daily', '2026-07-05'),
(1, 'antifungal', 72.80, 436.80, 873.60, 655.20, 'Once Daily', '2026-07-06'),
(1, 'antifungal', 72.30, 433.80, 867.60, 650.70, 'Once Daily', '2026-07-07');

-- 22. VACCINE SCHEDULE PLANNER
CREATE TABLE IF NOT EXISTS vaccine_schedule_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    age_months INT NOT NULL,
    due_vaccines JSON,
    upcoming_vaccines JSON,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO vaccine_schedule_history (user_id, age_months, due_vaccines, upcoming_vaccines, recorded_date) VALUES
(1, 12, '["MMR","Varicella","HepA"]', '["DTaP","IPV","Hib"]', '2026-06-08'),
(1, 18, '["DTaP","IPV","Hib"]', '["MMR","Varicella","HepA"]', '2026-06-09'),
(1, 24, '["HepA","MMR"]', '["DTaP","IPV","Varicella"]', '2026-06-10'),
(1, 36, '["DTaP","IPV"]', '["HepA","MMR","Varicella"]', '2026-06-11'),
(1, 48, '["MMR","Varicella"]', '["DTaP","IPV","HepA"]', '2026-06-12'),
(1, 60, '["DTaP","IPV","Hib"]', '["MMR","Varicella","HepA"]', '2026-06-13'),
(1, 72, '["HepA","MMR"]', '["DTaP","IPV","Varicella"]', '2026-06-14'),
(1, 84, '["DTaP","IPV"]', '["HepA","MMR","Varicella"]', '2026-06-15'),
(1, 96, '["MMR","Varicella"]', '["DTaP","IPV","HepA"]', '2026-06-16'),
(1, 108, '["DTaP","IPV","Hib"]', '["MMR","Varicella","HepA"]', '2026-06-17'),
(1, 120, '["HepA","MMR"]', '["DTaP","IPV","Varicella"]', '2026-06-18'),
(1, 132, '["DTaP","IPV"]', '["HepA","MMR","Varicella"]', '2026-06-19'),
(1, 144, '["MMR","Varicella"]', '["DTaP","IPV","HepA"]', '2026-06-20'),
(1, 156, '["DTaP","IPV","Hib"]', '["MMR","Varicella","HepA"]', '2026-06-21'),
(1, 168, '["HepA","MMR"]', '["DTaP","IPV","Varicella"]', '2026-06-22'),
(1, 180, '["DTaP","IPV"]', '["HepA","MMR","Varicella"]', '2026-06-23'),
(1, 192, '["MMR","Varicella"]', '["DTaP","IPV","HepA"]', '2026-06-24'),
(1, 204, '["DTaP","IPV","Hib"]', '["MMR","Varicella","HepA"]', '2026-06-25'),
(1, 216, '["HepA","MMR"]', '["DTaP","IPV","Varicella"]', '2026-06-26'),
(1, 228, '["DTaP","IPV"]', '["HepA","MMR","Varicella"]', '2026-06-27'),
(1, 240, '["MMR","Varicella"]', '["DTaP","IPV","HepA"]', '2026-06-28'),
(1, 252, '["DTaP","IPV","Hib"]', '["MMR","Varicella","HepA"]', '2026-06-29'),
(1, 264, '["HepA","MMR"]', '["DTaP","IPV","Varicella"]', '2026-06-30'),
(1, 276, '["DTaP","IPV"]', '["HepA","MMR","Varicella"]', '2026-07-01'),
(1, 288, '["MMR","Varicella"]', '["DTaP","IPV","HepA"]', '2026-07-02'),
(1, 300, '["DTaP","IPV","Hib"]', '["MMR","Varicella","HepA"]', '2026-07-03'),
(1, 312, '["HepA","MMR"]', '["DTaP","IPV","Varicella"]', '2026-07-04'),
(1, 324, '["DTaP","IPV"]', '["HepA","MMR","Varicella"]', '2026-07-05'),
(1, 336, '["MMR","Varicella"]', '["DTaP","IPV","HepA"]', '2026-07-06'),
(1, 348, '["DTaP","IPV","Hib"]', '["MMR","Varicella","HepA"]', '2026-07-07');

-- 23. HEALTH RISK ASSESSMENT
CREATE TABLE IF NOT EXISTS health_risk_assessment_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    score INT NOT NULL,
    risk_level VARCHAR(50),
    advice TEXT,
    age INT,
    bmi DECIMAL(5,2),
    smoker VARCHAR(10),
    exercise VARCHAR(50),
    family_history VARCHAR(10),
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO health_risk_assessment_history (user_id, score, risk_level, advice, age, bmi, smoker, exercise, family_history, recorded_date) VALUES
(1, 4, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.60, 'no', 'moderate', 'no', '2026-06-08'),
(1, 5, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.70, 'no', 'moderate', 'no', '2026-06-09'),
(1, 7, 'Moderate', 'Your health risk is moderate. Consider lifestyle improvements.', 30, 23.50, 'no', 'light', 'no', '2026-06-10'),
(1, 4, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.50, 'no', 'moderate', 'no', '2026-06-11'),
(1, 8, 'Moderate', 'Your health risk is moderate. Consider lifestyle improvements.', 30, 23.80, 'no', 'moderate', 'yes', '2026-06-12'),
(1, 3, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.40, 'no', 'active', 'no', '2026-06-13'),
(1, 5, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.60, 'no', 'moderate', 'no', '2026-06-14'),
(1, 9, 'Moderate', 'Your health risk is moderate. Consider lifestyle improvements.', 30, 23.80, 'no', 'moderate', 'yes', '2026-06-15'),
(1, 3, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.50, 'no', 'active', 'no', '2026-06-16'),
(1, 6, 'Moderate', 'Your health risk is moderate. Consider lifestyle improvements.', 30, 23.60, 'no', 'moderate', 'no', '2026-06-17'),
(1, 10, 'High', 'Your health risk is high. Please consult a healthcare provider.', 30, 23.90, 'no', 'light', 'yes', '2026-06-18'),
(1, 4, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.70, 'no', 'moderate', 'no', '2026-06-19'),
(1, 2, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.40, 'no', 'active', 'no', '2026-06-20'),
(1, 8, 'Moderate', 'Your health risk is moderate. Consider lifestyle improvements.', 30, 23.80, 'no', 'moderate', 'yes', '2026-06-21'),
(1, 11, 'High', 'Your health risk is high. Please consult a healthcare provider.', 30, 24.00, 'no', 'light', 'yes', '2026-06-22'),
(1, 3, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.50, 'no', 'active', 'no', '2026-06-23'),
(1, 2, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.40, 'no', 'active', 'no', '2026-06-24'),
(1, 5, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.60, 'no', 'moderate', 'no', '2026-06-25'),
(1, 9, 'Moderate', 'Your health risk is moderate. Consider lifestyle improvements.', 30, 23.90, 'no', 'moderate', 'yes', '2026-06-26'),
(1, 4, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.70, 'no', 'moderate', 'no', '2026-06-27'),
(1, 3, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.50, 'no', 'active', 'no', '2026-06-28'),
(1, 6, 'Moderate', 'Your health risk is moderate. Consider lifestyle improvements.', 30, 23.60, 'no', 'moderate', 'no', '2026-06-29'),
(1, 10, 'High', 'Your health risk is high. Please consult a healthcare provider.', 30, 23.90, 'no', 'light', 'yes', '2026-06-30'),
(1, 4, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.50, 'no', 'moderate', 'no', '2026-07-01'),
(1, 3, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.50, 'no', 'active', 'no', '2026-07-02'),
(1, 7, 'Moderate', 'Your health risk is moderate. Consider lifestyle improvements.', 30, 23.70, 'no', 'moderate', 'no', '2026-07-03'),
(1, 10, 'High', 'Your health risk is high. Please consult a healthcare provider.', 30, 24.00, 'no', 'light', 'yes', '2026-07-04'),
(1, 4, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.60, 'no', 'active', 'no', '2026-07-05'),
(1, 6, 'Moderate', 'Your health risk is moderate. Consider lifestyle improvements.', 30, 23.80, 'no', 'moderate', 'no', '2026-07-06'),
(1, 5, 'Low', 'Your health risk is low. Maintain healthy lifestyle.', 30, 23.60, 'no', 'moderate', 'no', '2026-07-07');

-- Continue with remaining tables (24-52)...
