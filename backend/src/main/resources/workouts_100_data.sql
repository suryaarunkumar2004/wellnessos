USE wellnessos_db;

INSERT INTO workout_logs (user_id, workout_plan_id, exercise, sets, reps, weight, duration, calories_burned, logged_at)
SELECT 
    FLOOR(RAND() * 5) + 1,
    FLOOR(RAND() * 10) + 1,
    ELT(FLOOR(RAND() * 20) + 1,
        'Bench Press', 'Squats', 'Deadlifts', 'Overhead Press', 'Rows',
        'Pull-ups', 'Push-ups', 'Lunges', 'Plank', 'Bicep Curls',
        'Tricep Pushdowns', 'Leg Press', 'Lat Pulldown', 'Dumbbell Flyes', 'Cable Crossovers',
        'Russian Twists', 'Burpees', 'Mountain Climbers', 'Jump Squats', 'Glute Bridges'),
    FLOOR(RAND() * 4) + 3,
    FLOOR(RAND() * 12) + 5,
    ROUND(RAND() * 100 + 20, 1),
    FLOOR(RAND() * 60) + 15,
    FLOOR(RAND() * 500) + 100,
    DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 90) DAY)
FROM (
    SELECT 
        ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
    FROM 
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t1,
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t2,
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t3
    LIMIT 100
) numbers;
