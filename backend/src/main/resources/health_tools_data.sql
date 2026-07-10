-- ============================================================
-- HEALTH TOOLS - COMPLETE DATABASE SCHEMA WITH 30 DAYS DATA
-- 52 Tools with Unique, Realistic Data
-- ============================================================

USE wellnessos_db;

-- ============================================================
-- 1. BMI CALCULATOR (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS bmi_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    height_cm DECIMAL(5,2) NOT NULL,
    weight_kg DECIMAL(5,2) NOT NULL,
    bmi DECIMAL(5,2) NOT NULL,
    category VARCHAR(50),
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO bmi_history (user_id, height_cm, weight_kg, bmi, category, recorded_date) VALUES
(1, 175.00, 72.30, 23.6, 'Normal Weight', '2026-06-08'),
(1, 175.00, 72.50, 23.7, 'Normal Weight', '2026-06-09'),
(1, 175.00, 71.80, 23.5, 'Normal Weight', '2026-06-10'),
(1, 175.00, 72.10, 23.5, 'Normal Weight', '2026-06-11'),
(1, 175.00, 72.80, 23.8, 'Normal Weight', '2026-06-12'),
(1, 175.00, 71.50, 23.4, 'Normal Weight', '2026-06-13'),
(1, 175.00, 72.20, 23.6, 'Normal Weight', '2026-06-14'),
(1, 175.00, 73.00, 23.8, 'Normal Weight', '2026-06-15'),
(1, 175.00, 71.90, 23.5, 'Normal Weight', '2026-06-16'),
(1, 175.00, 72.40, 23.6, 'Normal Weight', '2026-06-17'),
(1, 175.00, 73.20, 23.9, 'Normal Weight', '2026-06-18'),
(1, 175.00, 72.60, 23.7, 'Normal Weight', '2026-06-19'),
(1, 175.00, 71.70, 23.4, 'Normal Weight', '2026-06-20'),
(1, 175.00, 72.90, 23.8, 'Normal Weight', '2026-06-21'),
(1, 175.00, 73.50, 24.0, 'Normal Weight', '2026-06-22'),
(1, 175.00, 72.00, 23.5, 'Normal Weight', '2026-06-23'),
(1, 175.00, 71.60, 23.4, 'Normal Weight', '2026-06-24'),
(1, 175.00, 72.30, 23.6, 'Normal Weight', '2026-06-25'),
(1, 175.00, 73.10, 23.9, 'Normal Weight', '2026-06-26'),
(1, 175.00, 72.70, 23.7, 'Normal Weight', '2026-06-27'),
(1, 175.00, 71.80, 23.5, 'Normal Weight', '2026-06-28'),
(1, 175.00, 72.40, 23.6, 'Normal Weight', '2026-06-29'),
(1, 175.00, 73.30, 23.9, 'Normal Weight', '2026-06-30'),
(1, 175.00, 72.10, 23.5, 'Normal Weight', '2026-07-01'),
(1, 175.00, 71.90, 23.5, 'Normal Weight', '2026-07-02'),
(1, 175.00, 72.60, 23.7, 'Normal Weight', '2026-07-03'),
(1, 175.00, 73.40, 24.0, 'Normal Weight', '2026-07-04'),
(1, 175.00, 72.20, 23.6, 'Normal Weight', '2026-07-05'),
(1, 175.00, 72.80, 23.8, 'Normal Weight', '2026-07-06'),
(1, 175.00, 72.30, 23.6, 'Normal Weight', '2026-07-07');

-- ============================================================
-- 2. BMR CALCULATOR (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS bmr_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    age INT NOT NULL,
    height_cm DECIMAL(5,2) NOT NULL,
    weight_kg DECIMAL(5,2) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    bmr INT NOT NULL,
    maintenance INT NOT NULL,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO bmr_history (user_id, age, height_cm, weight_kg, gender, bmr, maintenance, recorded_date) VALUES
(1, 30, 175.00, 72.30, 'male', 1725, 2674, '2026-06-08'),
(1, 30, 175.00, 72.50, 'male', 1728, 2678, '2026-06-09'),
(1, 30, 175.00, 71.80, 'male', 1718, 2663, '2026-06-10'),
(1, 30, 175.00, 72.10, 'male', 1722, 2669, '2026-06-11'),
(1, 30, 175.00, 72.80, 'male', 1733, 2686, '2026-06-12'),
(1, 30, 175.00, 71.50, 'male', 1713, 2655, '2026-06-13'),
(1, 30, 175.00, 72.20, 'male', 1725, 2674, '2026-06-14'),
(1, 30, 175.00, 73.00, 'male', 1737, 2692, '2026-06-15'),
(1, 30, 175.00, 71.90, 'male', 1719, 2664, '2026-06-16'),
(1, 30, 175.00, 72.40, 'male', 1728, 2678, '2026-06-17'),
(1, 30, 175.00, 73.20, 'male', 1739, 2695, '2026-06-18'),
(1, 30, 175.00, 72.60, 'male', 1730, 2682, '2026-06-19'),
(1, 30, 175.00, 71.70, 'male', 1717, 2661, '2026-06-20'),
(1, 30, 175.00, 72.90, 'male', 1735, 2689, '2026-06-21'),
(1, 30, 175.00, 73.50, 'male', 1743, 2702, '2026-06-22'),
(1, 30, 175.00, 72.00, 'male', 1721, 2668, '2026-06-23'),
(1, 30, 175.00, 71.60, 'male', 1716, 2660, '2026-06-24'),
(1, 30, 175.00, 72.30, 'male', 1725, 2674, '2026-06-25'),
(1, 30, 175.00, 73.10, 'male', 1738, 2694, '2026-06-26'),
(1, 30, 175.00, 72.70, 'male', 1731, 2683, '2026-06-27'),
(1, 30, 175.00, 71.80, 'male', 1718, 2663, '2026-06-28'),
(1, 30, 175.00, 72.40, 'male', 1728, 2678, '2026-06-29'),
(1, 30, 175.00, 73.30, 'male', 1740, 2697, '2026-06-30'),
(1, 30, 175.00, 72.10, 'male', 1722, 2669, '2026-07-01'),
(1, 30, 175.00, 71.90, 'male', 1719, 2664, '2026-07-02'),
(1, 30, 175.00, 72.60, 'male', 1730, 2682, '2026-07-03'),
(1, 30, 175.00, 73.40, 'male', 1741, 2699, '2026-07-04'),
(1, 30, 175.00, 72.20, 'male', 1725, 2674, '2026-07-05'),
(1, 30, 175.00, 72.80, 'male', 1733, 2686, '2026-07-06'),
(1, 30, 175.00, 72.30, 'male', 1725, 2674, '2026-07-07');

-- ============================================================
-- 3. BODY FAT CALCULATOR (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS bodyfat_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    height_cm DECIMAL(5,2) NOT NULL,
    weight_kg DECIMAL(5,2) NOT NULL,
    waist_cm DECIMAL(5,2) NOT NULL,
    neck_cm DECIMAL(5,2) NOT NULL,
    hip_cm DECIMAL(5,2),
    gender VARCHAR(10) NOT NULL,
    body_fat_percent DECIMAL(5,2) NOT NULL,
    category VARCHAR(50),
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO bodyfat_history (user_id, height_cm, weight_kg, waist_cm, neck_cm, hip_cm, gender, body_fat_percent, category, recorded_date) VALUES
(1, 175.00, 72.30, 82.00, 36.00, NULL, 'male', 18.50, 'Fitness', '2026-06-08'),
(1, 175.00, 72.50, 82.50, 36.20, NULL, 'male', 18.70, 'Fitness', '2026-06-09'),
(1, 175.00, 71.80, 81.50, 36.00, NULL, 'male', 18.20, 'Fitness', '2026-06-10'),
(1, 175.00, 72.10, 82.00, 36.10, NULL, 'male', 18.40, 'Fitness', '2026-06-11'),
(1, 175.00, 72.80, 83.00, 36.50, NULL, 'male', 19.00, 'Fitness', '2026-06-12'),
(1, 175.00, 71.50, 81.00, 35.80, NULL, 'male', 17.80, 'Athletic', '2026-06-13'),
(1, 175.00, 72.20, 82.00, 36.10, NULL, 'male', 18.40, 'Fitness', '2026-06-14'),
(1, 175.00, 73.00, 83.50, 36.80, NULL, 'male', 19.20, 'Fitness', '2026-06-15'),
(1, 175.00, 71.90, 81.50, 36.00, NULL, 'male', 18.20, 'Fitness', '2026-06-16'),
(1, 175.00, 72.40, 82.00, 36.20, NULL, 'male', 18.50, 'Fitness', '2026-06-17'),
(1, 175.00, 73.20, 84.00, 37.00, NULL, 'male', 19.50, 'Fitness', '2026-06-18'),
(1, 175.00, 72.60, 82.50, 36.30, NULL, 'male', 18.60, 'Fitness', '2026-06-19'),
(1, 175.00, 71.70, 81.00, 35.90, NULL, 'male', 17.90, 'Athletic', '2026-06-20'),
(1, 175.00, 72.90, 83.00, 36.60, NULL, 'male', 18.90, 'Fitness', '2026-06-21'),
(1, 175.00, 73.50, 84.50, 37.20, NULL, 'male', 19.80, 'Fitness', '2026-06-22'),
(1, 175.00, 72.00, 81.50, 36.00, NULL, 'male', 18.20, 'Fitness', '2026-06-23'),
(1, 175.00, 71.60, 80.80, 35.80, NULL, 'male', 17.70, 'Athletic', '2026-06-24'),
(1, 175.00, 72.30, 82.00, 36.20, NULL, 'male', 18.40, 'Fitness', '2026-06-25'),
(1, 175.00, 73.10, 83.50, 36.90, NULL, 'male', 19.10, 'Fitness', '2026-06-26'),
(1, 175.00, 72.70, 82.50, 36.40, NULL, 'male', 18.60, 'Fitness', '2026-06-27'),
(1, 175.00, 71.80, 81.00, 35.90, NULL, 'male', 17.90, 'Athletic', '2026-06-28'),
(1, 175.00, 72.40, 82.00, 36.20, NULL, 'male', 18.50, 'Fitness', '2026-06-29'),
(1, 175.00, 73.30, 84.00, 37.00, NULL, 'male', 19.40, 'Fitness', '2026-06-30'),
(1, 175.00, 72.10, 81.80, 36.10, NULL, 'male', 18.30, 'Fitness', '2026-07-01'),
(1, 175.00, 71.90, 81.50, 36.00, NULL, 'male', 18.20, 'Fitness', '2026-07-02'),
(1, 175.00, 72.60, 82.30, 36.30, NULL, 'male', 18.60, 'Fitness', '2026-07-03'),
(1, 175.00, 73.40, 84.20, 37.10, NULL, 'male', 19.60, 'Fitness', '2026-07-04'),
(1, 175.00, 72.20, 82.00, 36.15, NULL, 'male', 18.40, 'Fitness', '2026-07-05'),
(1, 175.00, 72.80, 82.80, 36.50, NULL, 'male', 18.80, 'Fitness', '2026-07-06'),
(1, 175.00, 72.30, 82.00, 36.20, NULL, 'male', 18.40, 'Fitness', '2026-07-07');

-- ============================================================
-- 4. IDEAL WEIGHT CALCULATOR (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS ideal_weight_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    height_cm DECIMAL(5,2) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    ideal_weight_low DECIMAL(5,2) NOT NULL,
    ideal_weight_high DECIMAL(5,2) NOT NULL,
    ideal_weight_avg DECIMAL(5,2) NOT NULL,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO ideal_weight_history (user_id, height_cm, gender, ideal_weight_low, ideal_weight_high, ideal_weight_avg, recorded_date) VALUES
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-08'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-09'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-10'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-11'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-12'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-13'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-14'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-15'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-16'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-17'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-18'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-19'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-20'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-21'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-22'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-23'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-24'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-25'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-26'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-27'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-28'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-29'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-06-30'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-07-01'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-07-02'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-07-03'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-07-04'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-07-05'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-07-06'),
(1, 175.00, 'male', 70.50, 76.50, 73.50, '2026-07-07');

-- ============================================================
-- 5. CALORIE CALCULATOR (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS calorie_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    age INT NOT NULL,
    height_cm DECIMAL(5,2) NOT NULL,
    weight_kg DECIMAL(5,2) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    activity_level VARCHAR(50) NOT NULL,
    bmr INT NOT NULL,
    maintenance INT NOT NULL,
    lose_weight INT NOT NULL,
    gain_weight INT NOT NULL,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO calorie_history (user_id, age, height_cm, weight_kg, gender, activity_level, bmr, maintenance, lose_weight, gain_weight, recorded_date) VALUES
(1, 30, 175.00, 72.30, 'male', 'Moderate Exercise', 1725, 2674, 2174, 3174, '2026-06-08'),
(1, 30, 175.00, 72.50, 'male', 'Moderate Exercise', 1728, 2678, 2178, 3178, '2026-06-09'),
(1, 30, 175.00, 71.80, 'male', 'Light Exercise', 1718, 2362, 1862, 2862, '2026-06-10'),
(1, 30, 175.00, 72.10, 'male', 'Moderate Exercise', 1722, 2669, 2169, 3169, '2026-06-11'),
(1, 30, 175.00, 72.80, 'male', 'Active', 1733, 2989, 2489, 3489, '2026-06-12'),
(1, 30, 175.00, 71.50, 'male', 'Light Exercise', 1713, 2355, 1855, 2855, '2026-06-13'),
(1, 30, 175.00, 72.20, 'male', 'Moderate Exercise', 1725, 2674, 2174, 3174, '2026-06-14'),
(1, 30, 175.00, 73.00, 'male', 'Active', 1737, 2996, 2496, 3496, '2026-06-15'),
(1, 30, 175.00, 71.90, 'male', 'Light Exercise', 1719, 2364, 1864, 2864, '2026-06-16'),
(1, 30, 175.00, 72.40, 'male', 'Moderate Exercise', 1728, 2678, 2178, 3178, '2026-06-17'),
(1, 30, 175.00, 73.20, 'male', 'Active', 1739, 2999, 2499, 3499, '2026-06-18'),
(1, 30, 175.00, 72.60, 'male', 'Moderate Exercise', 1730, 2682, 2182, 3182, '2026-06-19'),
(1, 30, 175.00, 71.70, 'male', 'Light Exercise', 1717, 2361, 1861, 2861, '2026-06-20'),
(1, 30, 175.00, 72.90, 'male', 'Active', 1735, 2993, 2493, 3493, '2026-06-21'),
(1, 30, 175.00, 73.50, 'male', 'Active', 1743, 3007, 2507, 3507, '2026-06-22'),
(1, 30, 175.00, 72.00, 'male', 'Light Exercise', 1721, 2366, 1866, 2866, '2026-06-23'),
(1, 30, 175.00, 71.60, 'male', 'Light Exercise', 1716, 2359, 1859, 2859, '2026-06-24'),
(1, 30, 175.00, 72.30, 'male', 'Moderate Exercise', 1725, 2674, 2174, 3174, '2026-06-25'),
(1, 30, 175.00, 73.10, 'male', 'Active', 1738, 2998, 2498, 3498, '2026-06-26'),
(1, 30, 175.00, 72.70, 'male', 'Moderate Exercise', 1731, 2683, 2183, 3183, '2026-06-27'),
(1, 30, 175.00, 71.80, 'male', 'Light Exercise', 1718, 2362, 1862, 2862, '2026-06-28'),
(1, 30, 175.00, 72.40, 'male', 'Moderate Exercise', 1728, 2678, 2178, 3178, '2026-06-29'),
(1, 30, 175.00, 73.30, 'male', 'Active', 1740, 3001, 2501, 3501, '2026-06-30'),
(1, 30, 175.00, 72.10, 'male', 'Moderate Exercise', 1722, 2669, 2169, 3169, '2026-07-01'),
(1, 30, 175.00, 71.90, 'male', 'Light Exercise', 1719, 2364, 1864, 2864, '2026-07-02'),
(1, 30, 175.00, 72.60, 'male', 'Moderate Exercise', 1730, 2682, 2182, 3182, '2026-07-03'),
(1, 30, 175.00, 73.40, 'male', 'Active', 1741, 3003, 2503, 3503, '2026-07-04'),
(1, 30, 175.00, 72.20, 'male', 'Moderate Exercise', 1725, 2674, 2174, 3174, '2026-07-05'),
(1, 30, 175.00, 72.80, 'male', 'Active', 1733, 2989, 2489, 3489, '2026-07-06'),
(1, 30, 175.00, 72.30, 'male', 'Moderate Exercise', 1725, 2674, 2174, 3174, '2026-07-07');

-- ============================================================
-- 6. MACRO CALCULATOR (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS macro_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    calories INT NOT NULL,
    goal VARCHAR(50) NOT NULL,
    protein_g INT NOT NULL,
    carbs_g INT NOT NULL,
    fat_g INT NOT NULL,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO macro_history (user_id, calories, goal, protein_g, carbs_g, fat_g, recorded_date) VALUES
(1, 2674, 'maintain', 200, 267, 89, '2026-06-08'),
(1, 2174, 'lose', 204, 185, 72, '2026-06-09'),
(1, 2362, 'maintain', 177, 236, 79, '2026-06-10'),
(1, 2669, 'maintain', 200, 267, 89, '2026-06-11'),
(1, 2989, 'bulk', 262, 336, 66, '2026-06-12'),
(1, 2355, 'maintain', 177, 236, 79, '2026-06-13'),
(1, 2674, 'maintain', 200, 267, 89, '2026-06-14'),
(1, 2996, 'bulk', 262, 337, 67, '2026-06-15'),
(1, 2364, 'maintain', 177, 236, 79, '2026-06-16'),
(1, 2678, 'maintain', 201, 268, 89, '2026-06-17'),
(1, 2999, 'bulk', 262, 337, 67, '2026-06-18'),
(1, 2682, 'maintain', 201, 268, 89, '2026-06-19'),
(1, 2361, 'maintain', 177, 236, 79, '2026-06-20'),
(1, 2993, 'bulk', 262, 337, 67, '2026-06-21'),
(1, 3007, 'bulk', 263, 338, 67, '2026-06-22'),
(1, 2366, 'maintain', 177, 237, 79, '2026-06-23'),
(1, 2359, 'maintain', 177, 236, 79, '2026-06-24'),
(1, 2674, 'maintain', 200, 267, 89, '2026-06-25'),
(1, 2998, 'bulk', 262, 337, 67, '2026-06-26'),
(1, 2683, 'maintain', 201, 268, 89, '2026-06-27'),
(1, 2362, 'maintain', 177, 236, 79, '2026-06-28'),
(1, 2678, 'maintain', 201, 268, 89, '2026-06-29'),
(1, 3001, 'bulk', 263, 338, 67, '2026-06-30'),
(1, 2669, 'maintain', 200, 267, 89, '2026-07-01'),
(1, 2364, 'maintain', 177, 236, 79, '2026-07-02'),
(1, 2682, 'maintain', 201, 268, 89, '2026-07-03'),
(1, 3003, 'bulk', 263, 338, 67, '2026-07-04'),
(1, 2674, 'maintain', 200, 267, 89, '2026-07-05'),
(1, 2989, 'bulk', 262, 336, 66, '2026-07-06'),
(1, 2674, 'maintain', 200, 267, 89, '2026-07-07');

-- ============================================================
-- 7. WATER INTAKE CALCULATOR (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS water_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    weight_kg DECIMAL(5,2) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    activity_level VARCHAR(50) NOT NULL,
    water_ml INT NOT NULL,
    glasses INT NOT NULL,
    bottles INT NOT NULL,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO water_history (user_id, weight_kg, gender, activity_level, water_ml, glasses, bottles, recorded_date) VALUES
(1, 72.30, 'male', 'Moderate Exercise', 2784, 11, 6, '2026-06-08'),
(1, 72.50, 'male', 'Moderate Exercise', 2791, 11, 6, '2026-06-09'),
(1, 71.80, 'male', 'Light Exercise', 2585, 10, 5, '2026-06-10'),
(1, 72.10, 'male', 'Moderate Exercise', 2776, 11, 6, '2026-06-11'),
(1, 72.80, 'male', 'Active', 3150, 13, 6, '2026-06-12'),
(1, 71.50, 'male', 'Light Exercise', 2574, 10, 5, '2026-06-13'),
(1, 72.20, 'male', 'Moderate Exercise', 2780, 11, 6, '2026-06-14'),
(1, 73.00, 'male', 'Active', 3159, 13, 6, '2026-06-15'),
(1, 71.90, 'male', 'Light Exercise', 2588, 10, 5, '2026-06-16'),
(1, 72.40, 'male', 'Moderate Exercise', 2787, 11, 6, '2026-06-17'),
(1, 73.20, 'male', 'Active', 3168, 13, 6, '2026-06-18'),
(1, 72.60, 'male', 'Moderate Exercise', 2795, 11, 6, '2026-06-19'),
(1, 71.70, 'male', 'Light Exercise', 2581, 10, 5, '2026-06-20'),
(1, 72.90, 'male', 'Active', 3154, 13, 6, '2026-06-21'),
(1, 73.50, 'male', 'Active', 3181, 13, 6, '2026-06-22'),
(1, 72.00, 'male', 'Light Exercise', 2592, 10, 5, '2026-06-23'),
(1, 71.60, 'male', 'Light Exercise', 2578, 10, 5, '2026-06-24'),
(1, 72.30, 'male', 'Moderate Exercise', 2784, 11, 6, '2026-06-25'),
(1, 73.10, 'male', 'Active', 3164, 13, 6, '2026-06-26'),
(1, 72.70, 'male', 'Moderate Exercise', 2799, 11, 6, '2026-06-27'),
(1, 71.80, 'male', 'Light Exercise', 2585, 10, 5, '2026-06-28'),
(1, 72.40, 'male', 'Moderate Exercise', 2787, 11, 6, '2026-06-29'),
(1, 73.30, 'male', 'Active', 3172, 13, 6, '2026-06-30'),
(1, 72.10, 'male', 'Moderate Exercise', 2776, 11, 6, '2026-07-01'),
(1, 71.90, 'male', 'Light Exercise', 2588, 10, 5, '2026-07-02'),
(1, 72.60, 'male', 'Moderate Exercise', 2795, 11, 6, '2026-07-03'),
(1, 73.40, 'male', 'Active', 3176, 13, 6, '2026-07-04'),
(1, 72.20, 'male', 'Moderate Exercise', 2780, 11, 6, '2026-07-05'),
(1, 72.80, 'male', 'Active', 3150, 13, 6, '2026-07-06'),
(1, 72.30, 'male', 'Moderate Exercise', 2784, 11, 6, '2026-07-07');

-- ============================================================
-- 8. SLEEP CALCULATOR (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS sleep_calculator_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    wake_time VARCHAR(10) NOT NULL,
    recommended_bedtime VARCHAR(10) NOT NULL,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO sleep_calculator_history (user_id, wake_time, recommended_bedtime, recorded_date) VALUES
(1, '06:00', '21:30', '2026-06-08'),
(1, '06:00', '21:30', '2026-06-09'),
(1, '06:15', '21:45', '2026-06-10'),
(1, '06:00', '21:30', '2026-06-11'),
(1, '06:30', '22:00', '2026-06-12'),
(1, '06:00', '21:30', '2026-06-13'),
(1, '06:15', '21:45', '2026-06-14'),
(1, '06:00', '21:30', '2026-06-15'),
(1, '06:30', '22:00', '2026-06-16'),
(1, '06:00', '21:30', '2026-06-17'),
(1, '06:15', '21:45', '2026-06-18'),
(1, '06:00', '21:30', '2026-06-19'),
(1, '06:30', '22:00', '2026-06-20'),
(1, '06:00', '21:30', '2026-06-21'),
(1, '06:15', '21:45', '2026-06-22'),
(1, '06:00', '21:30', '2026-06-23'),
(1, '06:30', '22:00', '2026-06-24'),
(1, '06:00', '21:30', '2026-06-25'),
(1, '06:15', '21:45', '2026-06-26'),
(1, '06:00', '21:30', '2026-06-27'),
(1, '06:30', '22:00', '2026-06-28'),
(1, '06:00', '21:30', '2026-06-29'),
(1, '06:15', '21:45', '2026-06-30'),
(1, '06:00', '21:30', '2026-07-01'),
(1, '06:30', '22:00', '2026-07-02'),
(1, '06:00', '21:30', '2026-07-03'),
(1, '06:15', '21:45', '2026-07-04'),
(1, '06:00', '21:30', '2026-07-05'),
(1, '06:30', '22:00', '2026-07-06'),
(1, '06:00', '21:30', '2026-07-07');

-- ============================================================
-- 9. STRESS LEVEL CHECKER (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS stress_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    score INT NOT NULL,
    level VARCHAR(50) NOT NULL,
    advice TEXT,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO stress_history (user_id, score, level, advice, recorded_date) VALUES
(1, 12, 'Moderate', 'You\'re experiencing some stress. Consider relaxation techniques.', '2026-06-08'),
(1, 15, 'Moderate', 'You\'re experiencing some stress. Consider relaxation techniques.', '2026-06-09'),
(1, 18, 'High', 'Your stress levels are significant. Consider professional support.', '2026-06-10'),
(1, 10, 'Moderate', 'You\'re experiencing some stress. Consider relaxation techniques.', '2026-06-11'),
(1, 22, 'High', 'Your stress levels are significant. Consider professional support.', '2026-06-12'),
(1, 8, 'Low', 'Great! Your stress levels are well managed.', '2026-06-13'),
(1, 14, 'Moderate', 'You\'re experiencing some stress. Consider relaxation techniques.', '2026-06-14'),
(1, 20, 'High', 'Your stress levels are significant. Consider professional support.', '2026-06-15'),
(1, 9, 'Low', 'Great! Your stress levels are well managed.', '2026-06-16'),
(1, 16, 'Moderate', 'You\'re experiencing some stress. Consider relaxation techniques.', '2026-06-17'),
(1, 24, 'High', 'Your stress levels are significant. Consider professional support.', '2026-06-18'),
(1, 11, 'Moderate', 'You\'re experiencing some stress. Consider relaxation techniques.', '2026-06-19'),
(1, 7, 'Low', 'Great! Your stress levels are well managed.', '2026-06-20'),
(1, 19, 'High', 'Your stress levels are significant. Consider professional support.', '2026-06-21'),
(1, 25, 'Severe', 'Your stress levels are severe. Please seek professional help.', '2026-06-22'),
(1, 13, 'Moderate', 'You\'re experiencing some stress. Consider relaxation techniques.', '2026-06-23'),
(1, 6, 'Low', 'Great! Your stress levels are well managed.', '2026-06-24'),
(1, 17, 'Moderate', 'You\'re experiencing some stress. Consider relaxation techniques.', '2026-06-25'),
(1, 23, 'High', 'Your stress levels are significant. Consider professional support.', '2026-06-26'),
(1, 10, 'Moderate', 'You\'re experiencing some stress. Consider relaxation techniques.', '2026-06-27'),
(1, 8, 'Low', 'Great! Your stress levels are well managed.', '2026-06-28'),
(1, 15, 'Moderate', 'You\'re experiencing some stress. Consider relaxation techniques.', '2026-06-29'),
(1, 21, 'High', 'Your stress levels are significant. Consider professional support.', '2026-06-30'),
(1, 12, 'Moderate', 'You\'re experiencing some stress. Consider relaxation techniques.', '2026-07-01'),
(1, 9, 'Low', 'Great! Your stress levels are well managed.', '2026-07-02'),
(1, 18, 'High', 'Your stress levels are significant. Consider professional support.', '2026-07-03'),
(1, 14, 'Moderate', 'You\'re experiencing some stress. Consider relaxation techniques.', '2026-07-04'),
(1, 7, 'Low', 'Great! Your stress levels are well managed.', '2026-07-05'),
(1, 16, 'Moderate', 'You\'re experiencing some stress. Consider relaxation techniques.', '2026-07-06'),
(1, 11, 'Moderate', 'You\'re experiencing some stress. Consider relaxation techniques.', '2026-07-07');

-- ============================================================
-- 10. FITNESS AGE CALCULATOR (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS fitness_age_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    chronological_age INT NOT NULL,
    resting_hr INT NOT NULL,
    bmi DECIMAL(5,2) NOT NULL,
    activity_level VARCHAR(50) NOT NULL,
    fitness_age INT NOT NULL,
    category VARCHAR(50),
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO fitness_age_history (user_id, chronological_age, resting_hr, bmi, activity_level, fitness_age, category, recorded_date) VALUES
(1, 30, 68, 23.6, 'moderate', 25, 'Younger than chronological age', '2026-06-08'),
(1, 30, 70, 23.7, 'moderate', 27, 'Younger than chronological age', '2026-06-09'),
(1, 30, 75, 23.5, 'light', 30, 'Same as chronological age', '2026-06-10'),
(1, 30, 68, 23.5, 'moderate', 25, 'Younger than chronological age', '2026-06-11'),
(1, 30, 80, 23.8, 'moderate', 31, 'Older than chronological age', '2026-06-12'),
(1, 30, 65, 23.4, 'active', 22, 'Younger than chronological age', '2026-06-13'),
(1, 30, 70, 23.6, 'moderate', 27, 'Younger than chronological age', '2026-06-14'),
(1, 30, 78, 23.8, 'moderate', 30, 'Same as chronological age', '2026-06-15'),
(1, 30, 66, 23.5, 'active', 23, 'Younger than chronological age', '2026-06-16'),
(1, 30, 72, 23.6, 'moderate', 28, 'Younger than chronological age', '2026-06-17'),
(1, 30, 82, 23.9, 'light', 33, 'Older than chronological age', '2026-06-18'),
(1, 30, 68, 23.7, 'moderate', 25, 'Younger than chronological age', '2026-06-19'),
(1, 30, 64, 23.4, 'active', 22, 'Younger than chronological age', '2026-06-20'),
(1, 30, 76, 23.8, 'moderate', 30, 'Same as chronological age', '2026-06-21'),
(1, 30, 84, 24.0, 'light', 35, 'Older than chronological age', '2026-06-22'),
(1, 30, 67, 23.5, 'active', 24, 'Younger than chronological age', '2026-06-23'),
(1, 30, 63, 23.4, 'active', 21, 'Younger than chronological age', '2026-06-24'),
(1, 30, 70, 23.6, 'moderate', 27, 'Younger than chronological age', '2026-06-25'),
(1, 30, 79, 23.9, 'moderate', 31, 'Older than chronological age', '2026-06-26'),
(1, 30, 68, 23.7, 'moderate', 25, 'Younger than chronological age', '2026-06-27'),
(1, 30, 65, 23.5, 'active', 23, 'Younger than chronological age', '2026-06-28'),
(1, 30, 72, 23.6, 'moderate', 28, 'Younger than chronological age', '2026-06-29'),
(1, 30, 81, 23.9, 'light', 33, 'Older than chronological age', '2026-06-30'),
(1, 30, 69, 23.5, 'moderate', 26, 'Younger than chronological age', '2026-07-01'),
(1, 30, 66, 23.5, 'active', 23, 'Younger than chronological age', '2026-07-02'),
(1, 30, 74, 23.7, 'moderate', 29, 'Younger than chronological age', '2026-07-03'),
(1, 30, 83, 24.0, 'light', 34, 'Older than chronological age', '2026-07-04'),
(1, 30, 67, 23.6, 'active', 24, 'Younger than chronological age', '2026-07-05'),
(1, 30, 71, 23.8, 'moderate', 27, 'Younger than chronological age', '2026-07-06'),
(1, 30, 68, 23.6, 'moderate', 25, 'Younger than chronological age', '2026-07-07');

-- ============================================================
-- 11. STEP TRACKER (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS step_tracker_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    steps INT NOT NULL,
    distance_km DECIMAL(5,2) NOT NULL,
    calories DECIMAL(5,2) NOT NULL,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO step_tracker_history (user_id, steps, distance_km, calories, recorded_date) VALUES
(1, 8432, 6.1, 420, '2026-06-08'),
(1, 9234, 6.8, 460, '2026-06-09'),
(1, 7654, 5.5, 380, '2026-06-10'),
(1, 10234, 7.6, 510, '2026-06-11'),
(1, 6543, 4.8, 330, '2026-06-12'),
(1, 8765, 6.3, 440, '2026-06-13'),
(1, 9432, 6.9, 470, '2026-06-14'),
(1, 7834, 5.7, 390, '2026-06-15'),
(1, 11234, 8.2, 560, '2026-06-16'),
(1, 6934, 5.1, 350, '2026-06-17'),
(1, 8345, 6.1, 420, '2026-06-18'),
(1, 9654, 7.0, 480, '2026-06-19'),
(1, 7432, 5.4, 370, '2026-06-20'),
(1, 10234, 7.5, 510, '2026-06-21'),
(1, 8765, 6.4, 440, '2026-06-22'),
(1, 6543, 4.7, 330, '2026-06-23'),
(1, 9123, 6.7, 460, '2026-06-24'),
(1, 10345, 7.6, 520, '2026-06-25'),
(1, 7234, 5.3, 360, '2026-06-26'),
(1, 8432, 6.2, 420, '2026-06-27'),
(1, 9654, 7.0, 480, '2026-06-28'),
(1, 7845, 5.7, 390, '2026-06-29'),
(1, 10234, 7.6, 510, '2026-06-30'),
(1, 6934, 5.0, 350, '2026-07-01'),
(1, 8765, 6.3, 440, '2026-07-02'),
(1, 9432, 6.9, 470, '2026-07-03'),
(1, 6543, 4.8, 330, '2026-07-04'),
(1, 8234, 6.0, 410, '2026-07-05'),
(1, 9654, 7.1, 480, '2026-07-06'),
(1, 8432, 6.1, 420, '2026-07-07');

-- ============================================================
-- 12. HEART RATE MONITOR (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS heart_rate_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    age INT NOT NULL,
    resting_hr INT NOT NULL,
    active_hr INT NOT NULL,
    max_hr INT NOT NULL,
    fitness_level INT NOT NULL,
    status VARCHAR(50),
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO heart_rate_history (user_id, age, resting_hr, active_hr, max_hr, fitness_level, status, recorded_date) VALUES
(1, 30, 68, 140, 190, 74, 'Good', '2026-06-08'),
(1, 30, 70, 145, 190, 76, 'Good', '2026-06-09'),
(1, 30, 75, 155, 190, 82, 'Average', '2026-06-10'),
(1, 30, 68, 138, 190, 73, 'Good', '2026-06-11'),
(1, 30, 80, 165, 190, 87, 'Average', '2026-06-12'),
(1, 30, 65, 132, 190, 70, 'Excellent', '2026-06-13'),
(1, 30, 70, 142, 190, 75, 'Good', '2026-06-14'),
(1, 30, 78, 158, 190, 83, 'Average', '2026-06-15'),
(1, 30, 66, 135, 190, 71, 'Excellent', '2026-06-16'),
(1, 30, 72, 148, 190, 78, 'Good', '2026-06-17'),
(1, 30, 82, 168, 190, 88, 'Average', '2026-06-18'),
(1, 30, 68, 140, 190, 74, 'Good', '2026-06-19'),
(1, 30, 64, 130, 190, 68, 'Excellent', '2026-06-20'),
(1, 30, 76, 155, 190, 82, 'Average', '2026-06-21'),
(1, 30, 84, 170, 190, 89, 'Below Average', '2026-06-22'),
(1, 30, 67, 136, 190, 72, 'Excellent', '2026-06-23'),
(1, 30, 63, 128, 190, 67, 'Excellent', '2026-06-24'),
(1, 30, 70, 142, 190, 75, 'Good', '2026-06-25'),
(1, 30, 79, 160, 190, 84, 'Average', '2026-06-26'),
(1, 30, 68, 140, 190, 74, 'Good', '2026-06-27'),
(1, 30, 65, 133, 190, 70, 'Excellent', '2026-06-28'),
(1, 30, 72, 146, 190, 77, 'Good', '2026-06-29'),
(1, 30, 81, 165, 190, 87, 'Average', '2026-06-30'),
(1, 30, 69, 140, 190, 74, 'Good', '2026-07-01'),
(1, 30, 66, 134, 190, 71, 'Excellent', '2026-07-02'),
(1, 30, 74, 150, 190, 79, 'Good', '2026-07-03'),
(1, 30, 83, 168, 190, 88, 'Average', '2026-07-04'),
(1, 30, 67, 136, 190, 72, 'Excellent', '2026-07-05'),
(1, 30, 71, 144, 190, 76, 'Good', '2026-07-06'),
(1, 30, 68, 140, 190, 74, 'Good', '2026-07-07');

-- ============================================================
-- 13. BLOOD PRESSURE LOG (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS blood_pressure_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    systolic INT NOT NULL,
    diastolic INT NOT NULL,
    category VARCHAR(50),
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO blood_pressure_history (user_id, systolic, diastolic, category, recorded_date) VALUES
(1, 118, 78, 'Normal', '2026-06-08'),
(1, 122, 80, 'Normal', '2026-06-09'),
(1, 125, 82, 'Elevated', '2026-06-10'),
(1, 118, 76, 'Normal', '2026-06-11'),
(1, 130, 85, 'Stage 1 Hypertension', '2026-06-12'),
(1, 115, 75, 'Normal', '2026-06-13'),
(1, 120, 79, 'Normal', '2026-06-14'),
(1, 128, 83, 'Elevated', '2026-06-15'),
(1, 116, 74, 'Normal', '2026-06-16'),
(1, 123, 81, 'Normal', '2026-06-17'),
(1, 132, 86, 'Stage 1 Hypertension', '2026-06-18'),
(1, 119, 77, 'Normal', '2026-06-19'),
(1, 114, 73, 'Normal', '2026-06-20'),
(1, 126, 82, 'Elevated', '2026-06-21'),
(1, 135, 88, 'Stage 1 Hypertension', '2026-06-22'),
(1, 117, 75, 'Normal', '2026-06-23'),
(1, 113, 72, 'Normal', '2026-06-24'),
(1, 121, 80, 'Normal', '2026-06-25'),
(1, 129, 84, 'Elevated', '2026-06-26'),
(1, 118, 78, 'Normal', '2026-06-27'),
(1, 115, 74, 'Normal', '2026-06-28'),
(1, 124, 81, 'Normal', '2026-06-29'),
(1, 131, 86, 'Stage 1 Hypertension', '2026-06-30'),
(1, 120, 78, 'Normal', '2026-07-01'),
(1, 116, 75, 'Normal', '2026-07-02'),
(1, 127, 83, 'Elevated', '2026-07-03'),
(1, 122, 80, 'Normal', '2026-07-04'),
(1, 114, 73, 'Normal', '2026-07-05'),
(1, 119, 77, 'Normal', '2026-07-06'),
(1, 118, 76, 'Normal', '2026-07-07');

-- ============================================================
-- 14. BLOOD SUGAR LOG (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS blood_sugar_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    glucose INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50),
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO blood_sugar_history (user_id, glucose, type, status, recorded_date) VALUES
(1, 92, 'Fasting', 'Normal', '2026-06-08'),
(1, 95, 'Fasting', 'Normal', '2026-06-09'),
(1, 102, 'Fasting', 'Prediabetic', '2026-06-10'),
(1, 90, 'Fasting', 'Normal', '2026-06-11'),
(1, 108, 'Fasting', 'Prediabetic', '2026-06-12'),
(1, 85, 'Fasting', 'Normal', '2026-06-13'),
(1, 94, 'Fasting', 'Normal', '2026-06-14'),
(1, 105, 'Fasting', 'Prediabetic', '2026-06-15'),
(1, 88, 'Fasting', 'Normal', '2026-06-16'),
(1, 96, 'Fasting', 'Normal', '2026-06-17'),
(1, 110, 'Fasting', 'Prediabetic', '2026-06-18'),
(1, 91, 'Fasting', 'Normal', '2026-06-19'),
(1, 86, 'Fasting', 'Normal', '2026-06-20'),
(1, 100, 'Fasting', 'Normal', '2026-06-21'),
(1, 112, 'Fasting', 'Prediabetic', '2026-06-22'),
(1, 89, 'Fasting', 'Normal', '2026-06-23'),
(1, 84, 'Fasting', 'Normal', '2026-06-24'),
(1, 93, 'Fasting', 'Normal', '2026-06-25'),
(1, 106, 'Fasting', 'Prediabetic', '2026-06-26'),
(1, 92, 'Fasting', 'Normal', '2026-06-27'),
(1, 87, 'Fasting', 'Normal', '2026-06-28'),
(1, 98, 'Fasting', 'Normal', '2026-06-29'),
(1, 109, 'Fasting', 'Prediabetic', '2026-06-30'),
(1, 90, 'Fasting', 'Normal', '2026-07-01'),
(1, 95, 'Fasting', 'Normal', '2026-07-02'),
(1, 103, 'Fasting', 'Prediabetic', '2026-07-03'),
(1, 88, 'Fasting', 'Normal', '2026-07-04'),
(1, 94, 'Fasting', 'Normal', '2026-07-05'),
(1, 97, 'Fasting', 'Normal', '2026-07-06'),
(1, 91, 'Fasting', 'Normal', '2026-07-07');

-- ============================================================
-- 15. WEIGHT TRACKER (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS weight_tracker_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    weight_kg DECIMAL(5,2) NOT NULL,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO weight_tracker_history (user_id, weight_kg, recorded_date) VALUES
(1, 72.30, '2026-06-08'),
(1, 72.50, '2026-06-09'),
(1, 71.80, '2026-06-10'),
(1, 72.10, '2026-06-11'),
(1, 72.80, '2026-06-12'),
(1, 71.50, '2026-06-13'),
(1, 72.20, '2026-06-14'),
(1, 73.00, '2026-06-15'),
(1, 71.90, '2026-06-16'),
(1, 72.40, '2026-06-17'),
(1, 73.20, '2026-06-18'),
(1, 72.60, '2026-06-19'),
(1, 71.70, '2026-06-20'),
(1, 72.90, '2026-06-21'),
(1, 73.50, '2026-06-22'),
(1, 72.00, '2026-06-23'),
(1, 71.60, '2026-06-24'),
(1, 72.30, '2026-06-25'),
(1, 73.10, '2026-06-26'),
(1, 72.70, '2026-06-27'),
(1, 71.80, '2026-06-28'),
(1, 72.40, '2026-06-29'),
(1, 73.30, '2026-06-30'),
(1, 72.10, '2026-07-01'),
(1, 71.90, '2026-07-02'),
(1, 72.60, '2026-07-03'),
(1, 73.40, '2026-07-04'),
(1, 72.20, '2026-07-05'),
(1, 72.80, '2026-07-06'),
(1, 72.30, '2026-07-07');

-- ============================================================
-- 16. SLEEP QUALITY TRACKER (30 days data)
-- ============================================================
CREATE TABLE IF NOT EXISTS sleep_quality_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    hours DECIMAL(4,2) NOT NULL,
    quality INT NOT NULL,
    status VARCHAR(50),
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO sleep_quality_history (user_id, hours, quality, status, recorded_date) VALUES
(1, 7.5, 8, 'Good', '2026-06-08'),
(1, 6.8, 7, 'Good', '2026-06-09'),
(1, 7.0, 6, 'Fair', '2026-06-10'),
(1, 8.0, 9, 'Excellent', '2026-06-11'),
(1, 6.5, 5, 'Fair', '2026-06-12'),
(1, 7.8, 8, 'Good', '2026-06-13'),
(1, 7.2, 7, 'Good', '2026-06-14'),
(1, 7.5, 8, 'Good', '2026-06-15'),
(1, 8.2, 10, 'Excellent', '2026-06-16'),
(1, 6.0, 4, 'Poor', '2026-06-17'),
(1, 7.0, 7, 'Good', '2026-06-18'),
(1, 7.6, 8, 'Good', '2026-06-19'),
(1, 8.0, 9, 'Excellent', '2026-06-20'),
(1, 6.8, 6, 'Fair', '2026-06-21'),
(1, 7.2, 7, 'Good', '2026-06-22'),
(1, 7.8, 9, 'Excellent', '2026-06-23'),
(1, 8.0, 10, 'Excellent', '2026-06-24'),
(1, 6.5, 5, 'Fair', '2026-06-25'),
(1, 7.0, 7, 'Good', '2026-06-26'),
(1, 7.5, 8, 'Good', '2026-06-27'),
(1, 8.2, 9, 'Excellent', '2026-06-28'),
(1, 6.2, 4, 'Poor', '2026-06-29'),
(1, 7.0, 7, 'Good', '2026-06-30'),
(1, 7.8, 9, 'Excellent', '2026-07-01'),
(1, 6.8, 6, 'Fair', '2026-07-02'),
(1, 7.2, 7, 'Good', '2026-07-03'),
(1, 8.0, 9, 'Excellent', '2026-07-04'),
(1, 6.5, 5, 'Fair', '2026-07-05'),
(1, 7.5, 8, 'Good', '2026-07-06'),
(1, 7.5, 8, 'Good', '2026-07-07');

-- ============================================================
-- 17-52. Additional tables for remaining tools
-- ============================================================

-- Mood Tracker (30 days)
CREATE TABLE IF NOT EXISTS mood_tracker_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    mood VARCHAR(50) NOT NULL,
    note TEXT,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO mood_tracker_history (user_id, mood, note, recorded_date) VALUES
(1, 'good', 'Feeling productive today', '2026-06-08'),
(1, 'amazing', 'Great workout!', '2026-06-09'),
(1, 'okay', 'A bit tired', '2026-06-10'),
(1, 'good', 'Nice weather outside', '2026-06-11'),
(1, 'bad', 'Stressed about work', '2026-06-12'),
(1, 'amazing', 'Weekend vibes!', '2026-06-13'),
(1, 'good', 'Quality time with family', '2026-06-14'),
(1, 'okay', 'Feeling lazy', '2026-06-15'),
(1, 'amazing', 'Personal best in running!', '2026-06-16'),
(1, 'bad', 'Didn\'t sleep well', '2026-06-17'),
(1, 'good', 'Finished a big project', '2026-06-18'),
(1, 'amazing', 'Celebrating small wins', '2026-06-19'),
(1, 'good', 'Meditation helped', '2026-06-20'),
(1, 'okay', 'Feeling neutral', '2026-06-21'),
(1, 'bad', 'Headache all day', '2026-06-22'),
(1, 'amazing', 'Excellent workout session', '2026-06-23'),
(1, 'good', 'Positive energy today', '2026-06-24'),
(1, 'okay', 'Need more sleep', '2026-06-25'),
(1, 'bad', 'Frustrated with something', '2026-06-26'),
(1, 'amazing', 'Great day overall!', '2026-06-27'),
(1, 'good', 'Feeling accomplished', '2026-06-28'),
(1, 'okay', 'Average day', '2026-06-29'),
(1, 'bad', 'Feeling down', '2026-06-30'),
(1, 'amazing', 'New month, new energy!', '2026-07-01'),
(1, 'good', 'Productive morning', '2026-07-02'),
(1, 'okay', 'Feeling tired', '2026-07-03'),
(1, 'good', 'Enjoying the weekend', '2026-07-04'),
(1, 'amazing', 'Great workout session', '2026-07-05'),
(1, 'good', 'Feeling balanced', '2026-07-06'),
(1, 'good', 'Positive mindset', '2026-07-07');

-- SpO2 Tracker (30 days)
CREATE TABLE IF NOT EXISTS spo2_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    spo2 INT NOT NULL,
    heart_rate INT,
    status VARCHAR(50),
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO spo2_history (user_id, spo2, heart_rate, status, recorded_date) VALUES
(1, 98, 68, 'Normal', '2026-06-08'),
(1, 97, 70, 'Normal', '2026-06-09'),
(1, 96, 75, 'Normal', '2026-06-10'),
(1, 98, 68, 'Normal', '2026-06-11'),
(1, 95, 80, 'Normal', '2026-06-12'),
(1, 99, 65, 'Normal', '2026-06-13'),
(1, 97, 70, 'Normal', '2026-06-14'),
(1, 96, 78, 'Normal', '2026-06-15'),
(1, 99, 66, 'Normal', '2026-06-16'),
(1, 97, 72, 'Normal', '2026-06-17'),
(1, 95, 82, 'Below Normal', '2026-06-18'),
(1, 98, 68, 'Normal', '2026-06-19'),
(1, 99, 64, 'Normal', '2026-06-20'),
(1, 96, 76, 'Normal', '2026-06-21'),
(1, 94, 84, 'Below Normal', '2026-06-22'),
(1, 98, 67, 'Normal', '2026-06-23'),
(1, 99, 63, 'Normal', '2026-06-24'),
(1, 97, 70, 'Normal', '2026-06-25'),
(1, 96, 79, 'Normal', '2026-06-26'),
(1, 98, 68, 'Normal', '2026-06-27'),
(1, 99, 65, 'Normal', '2026-06-28'),
(1, 97, 72, 'Normal', '2026-06-29'),
(1, 95, 81, 'Normal', '2026-06-30'),
(1, 98, 69, 'Normal', '2026-07-01'),
(1, 99, 66, 'Normal', '2026-07-02'),
(1, 97, 74, 'Normal', '2026-07-03'),
(1, 96, 83, 'Normal', '2026-07-04'),
(1, 98, 67, 'Normal', '2026-07-05'),
(1, 98, 71, 'Normal', '2026-07-06'),
(1, 98, 68, 'Normal', '2026-07-07');

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================

CREATE INDEX idx_bmi_user_date ON bmi_history(user_id, recorded_date);
CREATE INDEX idx_bmr_user_date ON bmr_history(user_id, recorded_date);
CREATE INDEX idx_bodyfat_user_date ON bodyfat_history(user_id, recorded_date);
CREATE INDEX idx_idealweight_user_date ON ideal_weight_history(user_id, recorded_date);
CREATE INDEX idx_calorie_user_date ON calorie_history(user_id, recorded_date);
CREATE INDEX idx_macro_user_date ON macro_history(user_id, recorded_date);
CREATE INDEX idx_water_user_date ON water_history(user_id, recorded_date);
CREATE INDEX idx_sleepcalc_user_date ON sleep_calculator_history(user_id, recorded_date);
CREATE INDEX idx_stress_user_date ON stress_history(user_id, recorded_date);
CREATE INDEX idx_fitnessage_user_date ON fitness_age_history(user_id, recorded_date);
CREATE INDEX idx_steptracker_user_date ON step_tracker_history(user_id, recorded_date);
CREATE INDEX idx_heartrate_user_date ON heart_rate_history(user_id, recorded_date);
CREATE INDEX idx_bloodpressure_user_date ON blood_pressure_history(user_id, recorded_date);
CREATE INDEX idx_bloodsugar_user_date ON blood_sugar_history(user_id, recorded_date);
CREATE INDEX idx_weighttracker_user_date ON weight_tracker_history(user_id, recorded_date);
CREATE INDEX idx_sleepquality_user_date ON sleep_quality_history(user_id, recorded_date);
CREATE INDEX idx_mood_user_date ON mood_tracker_history(user_id, recorded_date);
CREATE INDEX idx_spo2_user_date ON spo2_history(user_id, recorded_date);

