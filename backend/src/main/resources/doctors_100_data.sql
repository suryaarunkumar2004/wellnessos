USE wellnessos_db;

INSERT INTO doctors (name, specialty, rating, reviews, hospital, fee, availability)
SELECT 
    ELT(FLOOR(RAND() * 20) + 1,
        'Dr. Emily Carter', 'Dr. Michael Chen', 'Dr. Priya Sharma', 'Dr. James Wilson', 'Dr. Sarah Lee',
        'Dr. Rachel Adams', 'Dr. Robert Taylor', 'Dr. Maria Garcia', 'Dr. David Kim', 'Dr. Lisa Thompson',
        'Dr. John Anderson', 'Dr. Patricia Brown', 'Dr. William Davis', 'Dr. Jessica Miller', 'Dr. Daniel Johnson',
        'Dr. Karen Williams', 'Dr. Brian Jones', 'Dr. Laura Wilson', 'Dr. Thomas Moore', 'Dr. Michelle Taylor'),
    ELT(FLOOR(RAND() * 12) + 1,
        'Cardiology', 'Neurology', 'Gynecology', 'Orthopedics', 'Dermatology',
        'Endocrinology', 'Pediatrics', 'Ophthalmology', 'ENT', 'Psychiatry',
        'Urology', 'Gastroenterology'),
    ROUND(RAND() * 0.5 + 4.4, 1),
    FLOOR(RAND() * 150) + 50,
    ELT(FLOOR(RAND() * 20) + 1,
        'WellNest Medical Center', 'City General Hospital', 'Apollo Medical Center', 'Fortis Healthcare', 'Sahyadri Hospital',
        'Global Health City', 'Kokilaben Hospital', 'Wockhardt Hospital', 'MGM Healthcare', 'Medanta Hospital',
        'Narayana Health', 'Max Healthcare', 'Manipal Hospitals', 'Aster Medcity', 'Columbia Asia',
        'Seven Hills Hospital', 'Care Hospitals', 'KIMS Hospitals', 'Sunshine Hospitals', 'Vikram Hospital'),
    FLOOR(RAND() * 300) + 100,
    CONCAT('Mon-Fri ', FLOOR(RAND() * 8) + 8, ':00-', FLOOR(RAND() * 3) + 16, ':00')
FROM (
    SELECT 
        ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
    FROM 
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t1,
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t2,
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t3
    LIMIT 100
) numbers;
