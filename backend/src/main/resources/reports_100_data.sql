USE wellnessos_db;

INSERT INTO health_reports (user_id, report_type, report_date, summary, file_url)
SELECT 
    FLOOR(RAND() * 5) + 1,
    ELT(FLOOR(RAND() * 4) + 1, 'Weekly', 'Monthly', 'Quarterly', 'Yearly'),
    DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 365) DAY),
    ELT(FLOOR(RAND() * 20) + 1,
        'Great progress this week!', 'Monthly health summary', 'Quarterly health review', 'Yearly health report',
        'Improvements in all areas', 'Focus on sleep quality', 'Exercise consistency improving', 'Nutrition on track',
        'Mental wellness improving', 'Stress levels reducing', 'Weight management on target', 'Cardiovascular health improving',
        'Good progress this month', 'Healthy lifestyle sustained', 'Wellness goals achieved', 'Health metrics improving',
        'Positive health trends', 'Balanced lifestyle maintained', 'Health score improved', 'Wellness journey continuing'),
    CONCAT('/reports/user_', FLOOR(RAND() * 5) + 1, '/', DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 365) DAY), '%Y-%m-%d'), '.pdf')
FROM (
    SELECT 
        ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
    FROM 
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t1,
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t2,
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t3
    LIMIT 100
) numbers;
