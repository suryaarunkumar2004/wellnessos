USE wellnessos_db;

INSERT INTO community_posts (user_id, title, content, category, likes)
SELECT 
    FLOOR(RAND() * 5) + 1,
    ELT(FLOOR(RAND() * 20) + 1,
        'My Health Journey', 'Daily Fitness Tips', 'Healthy Eating Habits', 'Mental Wellness Guide', 'Workout Motivation',
        'Sleep Improvement', 'Hydration Goals', 'Stress Management', 'Weight Loss Tips', 'Yoga Benefits',
        'Running Progress', 'Strength Training', 'Nutrition Tips', 'Mindfulness Practice', 'Health Goals',
        'Community Support', 'New Research', 'Healthy Recipes', 'Fitness Challenges', 'Wellness Tips'),
    ELT(FLOOR(RAND() * 15) + 1,
        'Just started my health journey today! Excited to share my progress with everyone. 🚀',
        '5 tips for staying motivated on your fitness journey. Consistency is key! 💪',
        'What are your favorite healthy meals? Share your recipes below! 🥗',
        'How do you manage stress in your daily life? Let me know your tips! 🧘',
        'Hit my first 10K steps today! Feeling amazing! ��',
        'Started meditation and it\'s life-changing. 10 minutes a day makes a difference. 🧠',
        'Healthy eating doesn\'t have to be boring. Here are 5 delicious recipes! 😋',
        'Yoga has improved my flexibility and mental clarity. Highly recommend! 🧘',
        'Drinking 3L water daily is a game-changer. My skin and energy levels improved! 💧',
        'Strength training is not just for men. Women, pick up those weights! 💪',
        'Just completed my first 5K run! Next goal: 10K! 🏃',
        'Meal prepping on Sundays saves me time and keeps me on track. 🥗',
        'Mindfulness morning routine: Set intentions for the day. 🙏',
        'Consistency > Intensity. Small steps lead to big changes. 📈',
        'Grateful for this community! You all inspire me daily. ❤️'),
    ELT(FLOOR(RAND() * 5) + 1, 'Health', 'Fitness', 'Nutrition', 'Mental Health', 'Wellness'),
    FLOOR(RAND() * 50) + 5
FROM (
    SELECT 
        ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
    FROM 
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t1,
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t2,
        (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t3
    LIMIT 100
) numbers;
