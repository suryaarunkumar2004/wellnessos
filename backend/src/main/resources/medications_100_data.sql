USE wellnessos_db;

INSERT INTO medications (user_id, name, dosage, frequency, status, refills, prescribed_by, start_date, next_refill, is_active)
SELECT 
    FLOOR(RAND() * 5) + 1,
    ELT(FLOOR(RAND() * 15) + 1, 
        'Metformin', 'Lisinopril', 'Atorvastatin', 'Omeprazole', 'Amoxicillin',
        'Ciprofloxacin', 'Doxycycline', 'Metronidazole', 'Clindamycin', 'Azithromycin',
        'Levothyroxine', 'Losartan', 'Amlodipine', 'Furosemide', 'Warfarin'),
    CONCAT(FLOOR(RAND() * 5) + 1, '-', FLOOR(RAND() * 8) + 1, ' mg'),
    ELT(FLOOR(RAND() * 5) + 1, 'Once Daily', 'Twice Daily', 'Three Times Daily', 'Every 4 hours', 'As needed'),
    ELT(FLOOR(RAND() * 4) + 1, 'Active', 'Active', 'Active', 'Expiring'),
    FLOOR(RAND() * 6) + 1,
    ELT(FLOOR(RAND() * 10) + 1, 
        'Dr. Emily Carter', 'Dr. Michael Chen', 'Dr. Priya Sharma', 'Dr. James Wilson', 'Dr. Sarah Lee',
        'Dr. Rachel Adams', 'Dr. Robert Taylor', 'Dr. Maria Garcia', 'Dr. David Kim', 'Dr. Lisa Thompson'),
    DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 180) + 30 DAY),
    DATE_ADD(CURDATE(), INTERVAL FLOOR(RAND() * 60) + 10 DAY),
    RAND() > 0.2
FROM (
    SELECT 
        ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
    FROM 
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t1,
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t2,
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t3
    LIMIT 100
) numbers;
