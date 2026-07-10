-- Health Tools Tables for 70+ Features (Fixed)

-- Feature 1-10: Health Calculators Results
CREATE TABLE IF NOT EXISTS calculator_results (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    calculator_type VARCHAR(50) NOT NULL,
    result_data JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 11-20: Health Trackers
CREATE TABLE IF NOT EXISTS health_tracker_data (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    tracker_type VARCHAR(50) NOT NULL,
    value DECIMAL(10,2),
    unit VARCHAR(20),
    recorded_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_tracker_user_date (user_id, tracker_type, recorded_at)
);

-- Feature 21-30: Medical Tools
CREATE TABLE IF NOT EXISTS symptom_checker_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    symptoms JSON,
    possible_conditions JSON,
    severity VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS drug_interaction_checks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    drugs JSON,
    interactions JSON,
    severity VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 31-40: Fitness Tools
CREATE TABLE IF NOT EXISTS workout_plans (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    plan_name VARCHAR(255),
    plan_data JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS workout_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    workout_plan_id BIGINT,
    exercise VARCHAR(255),
    set_count INT,
    rep_count INT,
    weight_used DECIMAL(10,2),
    duration_minutes INT,
    calories_burned INT,
    logged_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (workout_plan_id) REFERENCES workout_plans(id)
);

-- Feature 41-50: Nutrition Tools
CREATE TABLE IF NOT EXISTS meal_plans (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    plan_name VARCHAR(255),
    calories_target INT,
    meals JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS food_entries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    food_name VARCHAR(255),
    calories INT,
    protein DECIMAL(10,2),
    carbs DECIMAL(10,2),
    fats DECIMAL(10,2),
    meal_type VARCHAR(50),
    eaten_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 51-58: Mental Health Tools
CREATE TABLE IF NOT EXISTS mood_entries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    mood_score INT CHECK (mood_score BETWEEN 1 AND 10),
    mood_label VARCHAR(50),
    notes TEXT,
    logged_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS meditation_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    duration_minutes INT,
    meditation_type VARCHAR(50),
    quality_score INT CHECK (quality_score BETWEEN 1 AND 10),
    logged_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 59-66: Health Education
CREATE TABLE IF NOT EXISTS health_articles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(50),
    author VARCHAR(100),
    read_time_minutes INT,
    views INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS article_bookmarks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    article_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (article_id) REFERENCES health_articles(id),
    UNIQUE KEY unique_user_article (user_id, article_id)
);

-- Feature 67-70: Community & Sharing
CREATE TABLE IF NOT EXISTS health_challenges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    challenge_name VARCHAR(255) NOT NULL,
    challenge_description TEXT,
    duration_days INT,
    start_date DATETIME,
    end_date DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS challenge_participants (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    challenge_id BIGINT NOT NULL,
    progress_percent DECIMAL(5,2) DEFAULT 0,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (challenge_id) REFERENCES health_challenges(id)
);

CREATE TABLE IF NOT EXISTS community_posts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    post_title VARCHAR(255),
    post_content TEXT,
    category VARCHAR(50),
    like_count INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feature 71-80: Additional Tables
CREATE TABLE IF NOT EXISTS tool_usage_stats (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    tool_id VARCHAR(50),
    usage_count INT DEFAULT 0,
    last_used DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_user_tool (user_id, tool_id)
);

CREATE TABLE IF NOT EXISTS tool_ratings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    tool_id VARCHAR(50),
    rating_value INT CHECK (rating_value BETWEEN 1 AND 5),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_user_tool_rating (user_id, tool_id)
);

-- Insert sample health articles
INSERT INTO health_articles (title, content, category, author, read_time_minutes) VALUES
('How to Stay Healthy This Season', 'Tips and tricks for maintaining good health throughout the year. Regular exercise, balanced diet, and adequate sleep are essential.', 'Wellness', 'Dr. Wellness', 5),
('Understanding Nutrition Labels', 'Learn to read nutrition labels effectively to make informed food choices. Pay attention to serving sizes, calories, and nutrient content.', 'Nutrition', 'Nutritionist', 8),
('Benefits of Regular Exercise', 'Regular physical activity improves cardiovascular health, strengthens muscles, and boosts mental well-being.', 'Fitness', 'Fitness Expert', 6),
('Managing Stress Effectively', 'Stress management techniques including deep breathing, meditation, and mindfulness for daily life.', 'Mental Health', 'Psychologist', 7);

-- Insert sample health challenges
INSERT INTO health_challenges (challenge_name, challenge_description, duration_days, start_date, end_date) VALUES
('10,000 Steps Challenge', 'Walk 10,000 steps every day for a week to improve cardiovascular health.', 7, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY)),
('Water Challenge', 'Drink 3L of water daily for 5 days to stay hydrated and improve skin health.', 5, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 5 DAY)),
('Sleep Challenge', 'Get 7+ hours of quality sleep for 10 days to improve overall health and well-being.', 10, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 10 DAY));

-- Indexes
CREATE INDEX idx_tracker_user_date ON health_tracker_data(user_id, recorded_at);
CREATE INDEX idx_food_entries_user_date ON food_entries(user_id, eaten_at);
CREATE INDEX idx_mood_entries_user_date ON mood_entries(user_id, logged_at);
CREATE INDEX idx_challenge_participants_user ON challenge_participants(user_id, challenge_id);

-- Views
CREATE OR REPLACE VIEW health_tools_summary AS
SELECT 
    u.id AS user_id,
    COUNT(DISTINCT htd.tracker_type) AS active_trackers,
    COUNT(DISTINCT wr.workout_plan_id) AS active_plans,
    COUNT(DISTINCT fe.id) AS meal_entries,
    COUNT(DISTINCT me.id) AS mood_entries,
    COUNT(DISTINCT ab.id) AS bookmarked_articles,
    COUNT(DISTINCT cp.id) AS active_challenges
FROM users u
LEFT JOIN health_tracker_data htd ON u.id = htd.user_id
LEFT JOIN workout_logs wr ON u.id = wr.user_id
LEFT JOIN food_entries fe ON u.id = fe.user_id
LEFT JOIN mood_entries me ON u.id = me.user_id
LEFT JOIN article_bookmarks ab ON u.id = ab.user_id
LEFT JOIN challenge_participants cp ON u.id = cp.user_id
GROUP BY u.id;
