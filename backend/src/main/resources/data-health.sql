-- Insert sample health records for user 1
INSERT INTO health_records (user_id, record_date, steps, water_intake, sleep_hours, heart_rate, weight, glucose, oxygen_sat, bmi, calories, meditation_minutes, mood, notes, created_at, updated_at) VALUES
(1, CURRENT_DATE - 6, 7500, 5.5, 7.0, 75, 69.0, 98, 97, 23.8, 1950, 10, 'happy', 'Good day', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, CURRENT_DATE - 5, 8200, 6.0, 7.5, 72, 68.8, 95, 98, 23.7, 2100, 15, 'happy', 'Great workout', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, CURRENT_DATE - 4, 6800, 5.0, 6.5, 78, 68.5, 102, 96, 23.6, 1800, 5, 'sad', 'Felt tired', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, CURRENT_DATE - 3, 9000, 7.0, 8.0, 70, 68.2, 93, 98, 23.5, 2200, 20, 'happy', 'Excellent day!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, CURRENT_DATE - 2, 8500, 6.5, 7.5, 73, 68.0, 96, 97, 23.4, 2050, 15, 'happy', 'Good progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, CURRENT_DATE - 1, 7800, 5.5, 7.0, 74, 67.8, 97, 97, 23.4, 1900, 12, 'neutral', 'Decent day', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, CURRENT_DATE, 8420, 6.0, 7.5, 72, 68.6, 95, 97, 23.6, 2100, 15, 'happy', 'Feeling great!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
