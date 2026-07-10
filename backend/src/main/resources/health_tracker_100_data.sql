-- ============================================================
-- HEALTH TRACKER - 100+ Records
-- ============================================================
INSERT INTO health_metrics (user_id, metric_date, steps, distance_km, calories_burned, active_minutes, sleep_hours, sleep_quality, water_intake_ml, heart_rate, systolic, diastolic, weight_kg, body_fat, mood_score, stress_level, health_score, created_at, updated_at)
SELECT 
    FLOOR(RAND() * 5) + 1,
    DATE_SUB(CURDATE(), INTERVAL n DAY),
    FLOOR(RAND() * 12000) + 2000,
    ROUND(RAND() * 8 + 1, 1),
    FLOOR(RAND() * 2500) + 500,
    FLOOR(RAND() * 90) + 10,
    ROUND(RAND() * 3 + 5, 1),
    FLOOR(RAND() * 7) + 3,
    FLOOR(RAND() * 3500) + 500,
    FLOOR(RAND() * 30) + 55,
    FLOOR(RAND() * 30) + 100,
    FLOOR(RAND() * 20) + 60,
    ROUND(RAND() * 25 + 55, 1),
    ROUND(RAND() * 20 + 10, 1),
    FLOOR(RAND() * 6) + 4,
    FLOOR(RAND() * 5) + 1,
    FLOOR(RAND() * 30) + 55,
    NOW(),
    NOW()
FROM (
    SELECT 
        ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
    FROM 
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t1,
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t2,
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t3
    LIMIT 100
) numbers;
