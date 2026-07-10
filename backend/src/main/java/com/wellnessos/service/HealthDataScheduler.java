package com.wellnessos.service;

import com.wellnessos.entity.HealthMetrics;
import com.wellnessos.repository.HealthMetricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Random;

@Service
public class HealthDataScheduler {

    @Autowired
    private HealthMetricsRepository healthMetricsRepository;

    private final Random random = new Random();

    // Run every day at 12:00 AM (midnight)
    // @Scheduled(cron = "0 0 0 * * ?")
    public void addDailyHealthData() {
        LocalDate today = LocalDate.now();
        generateDataForDate(today);
    }

    // Also run at 12:00 PM (noon) as a backup
    // @Scheduled(cron = "0 0 12 * * ?")
    public void addDailyHealthDataBackup() {
        LocalDate today = LocalDate.now();
        generateDataForDate(today);
    }

    // Run every hour to check and fill missing data
    // @Scheduled(cron = "0 0 * * * ?")
    public void fillMissingData() {
        LocalDate today = LocalDate.now();
        for (int i = 0; i < 30; i++) {
            LocalDate date = today.minusDays(i);
            generateDataForDate(date);
        }
    }

    private void generateDataForDate(LocalDate date) {
        // Check if data already exists for this date
        boolean exists = healthMetricsRepository.findByUserIdAndMetricDate(1L, date).isPresent();
        
        if (!exists) {
            HealthMetrics metric = new HealthMetrics();
            metric.setUserId(1L);
            metric.setMetricDate(date);
            
            int dayOfWeek = date.getDayOfWeek().getValue();
            boolean isWeekend = dayOfWeek >= 6;
            
            // ===== ACTIVITY METRICS =====
            // Steps: More on weekends
            int steps;
            if (isWeekend) {
                steps = 5000 + random.nextInt(6000); // 5000-11000
            } else {
                steps = 4000 + random.nextInt(5000); // 4000-9000
            }
            metric.setSteps(steps);
            
            // Distance: 5-10 km based on steps
            double distanceKm = (steps / 1000.0) * 0.8 + random.nextDouble() * 2;
            metric.setDistanceKm(Math.round(distanceKm * 10) / 10.0);
            
            // Calories burned: Based on steps
            int caloriesBurned = (int)(steps * 0.04) + random.nextInt(100);
            metric.setCaloriesBurned(caloriesBurned);
            
            // Active minutes: Based on steps
            int activeMinutes = (int)(steps / 100) + random.nextInt(20);
            metric.setActiveMinutes(activeMinutes);
            
            // Workout type
            String[] workouts = {"Running", "Walking", "Cycling", "Yoga", "Swimming", "Gym", null};
            metric.setWorkoutType(workouts[random.nextInt(workouts.length)]);
            
            // Workout duration
            metric.setWorkoutDuration(random.nextInt(60) + 10); // 10-70 minutes
            
            // Workout intensity
            String[] intensities = {"Low", "Medium", "High"};
            metric.setWorkoutIntensity(intensities[random.nextInt(3)]);
            
            // ===== SLEEP METRICS =====
            double sleepHours = 6.5 + random.nextDouble() * 1.5; // 6.5-8.0
            metric.setSleepHours(Math.round(sleepHours * 10) / 10.0);
            
            metric.setSleepQuality(random.nextInt(4) + 1); // 1-5
            
            // Bed time: 10 PM - 12 AM
            metric.setBedTime(java.time.LocalTime.of(22 + random.nextInt(2), random.nextInt(60)));
            
            // Wake time: 6 AM - 8 AM
            metric.setWakeTime(java.time.LocalTime.of(6 + random.nextInt(2), random.nextInt(60)));
            
            // Deep sleep: 1-3 hours
            metric.setDeepSleepHours(Math.round((1.0 + random.nextDouble() * 2.0) * 10) / 10.0);
            
            // ===== NUTRITION METRICS =====
            // Calories consumed: 1800-2800
            int caloriesConsumed = 1800 + random.nextInt(1000);
            metric.setCaloriesConsumed(caloriesConsumed);
            
            // Water intake: 1.5-3.5 L (in ml)
            int waterIntakeMl = 1500 + random.nextInt(2000);
            metric.setWaterIntakeMl(waterIntakeMl);
            
            // Protein: 50-120g
            metric.setProteinG(Math.round((50 + random.nextDouble() * 70) * 10) / 10.0);
            
            // Carbs: 150-350g
            metric.setCarbsG(Math.round((150 + random.nextDouble() * 200) * 10) / 10.0);
            
            // Fat: 40-90g
            metric.setFatG(Math.round((40 + random.nextDouble() * 50) * 10) / 10.0);
            
            // Sugar: 20-60g
            metric.setSugarG(Math.round((20 + random.nextDouble() * 40) * 10) / 10.0);
            
            // ===== VITAL SIGNS =====
            // Heart Rate: 65-80
            int heartRate = 65 + random.nextInt(15);
            metric.setHeartRate(heartRate);
            
            // Blood Pressure: Systolic 110-130, Diastolic 70-85
            metric.setSystolic(110 + random.nextInt(20));
            metric.setDiastolic(70 + random.nextInt(15));
            
            // Blood Glucose: 85-110 (mg/dL)
            metric.setBloodGlucose(85 + random.nextInt(25));
            
            // Oxygen Saturation: 95-99%
            metric.setOxygenSat(95 + random.nextInt(4));
            
            // Weight: 68-75 kg
            double weightKg = 68 + random.nextDouble() * 7;
            metric.setWeightKg(Math.round(weightKg * 10) / 10.0);
            
            // Body Fat: 15-25%
            metric.setBodyFat(Math.round((15 + random.nextDouble() * 10) * 10) / 10.0);
            
            // Temperature: 36.5-37.2°C
            metric.setTemperatureC(Math.round((36.5 + random.nextDouble() * 0.7) * 10) / 10.0);
            
            // ===== MENTAL HEALTH =====
            // Mood: Better on weekends
            int moodScore;
            if (isWeekend) {
                moodScore = 6 + random.nextInt(4); // 6-9
            } else {
                moodScore = 4 + random.nextInt(4); // 4-7
            }
            metric.setMoodScore(moodScore);
            
            // Stress: Higher on weekdays
            int stressLevel;
            if (isWeekend) {
                stressLevel = 1 + random.nextInt(4); // 1-4
            } else {
                stressLevel = 2 + random.nextInt(5); // 2-6
            }
            metric.setStressLevel(stressLevel);
            
            // Meditation: 5-30 minutes
            metric.setMeditationMinutes(5 + random.nextInt(25));
            
            // Notes
            String[] notes = {"Feeling great!", "Good workout today!", "Slept well.", "Stressful day.", "Relaxing weekend.", null};
            metric.setNotes(notes[random.nextInt(notes.length)]);
            
            // ===== CALCULATE HEALTH SCORE =====
            int healthScore = calculateHealthScore(
                steps, sleepHours, waterIntakeMl, heartRate, moodScore, 
                caloriesBurned, weightKg, stressLevel
            );
            metric.setHealthScore(healthScore);
            
            healthMetricsRepository.save(metric);
            
            System.out.println("✅ Health data generated for: " + date + 
                " | Steps: " + steps + 
                " | Sleep: " + String.format("%.1f", sleepHours) + "h" +
                " | Weight: " + String.format("%.1f", weightKg) + "kg" +
                " | Health Score: " + healthScore);
        }
    }

    private int calculateHealthScore(int steps, double sleepHours, int waterIntakeMl, 
                                     int heartRate, int moodScore, int caloriesBurned,
                                     double weightKg, int stressLevel) {
        int score = 0;
        
        // Steps (0-20 points)
        if (steps >= 10000) score += 20;
        else if (steps >= 8000) score += 16;
        else if (steps >= 6000) score += 12;
        else if (steps >= 4000) score += 8;
        else score += 4;
        
        // Sleep (0-15 points)
        if (sleepHours >= 7 && sleepHours <= 8) score += 15;
        else if (sleepHours >= 6) score += 10;
        else score += 5;
        
        // Water (0-10 points)
        if (waterIntakeMl >= 3000) score += 10;
        else if (waterIntakeMl >= 2500) score += 8;
        else if (waterIntakeMl >= 2000) score += 5;
        else score += 3;
        
        // Heart Rate (0-15 points)
        if (heartRate >= 60 && heartRate <= 70) score += 15;
        else if (heartRate >= 71 && heartRate <= 80) score += 10;
        else score += 5;
        
        // Mood (0-15 points)
        if (moodScore >= 8) score += 15;
        else if (moodScore >= 6) score += 10;
        else score += 5;
        
        // Calories Burned (0-10 points)
        if (caloriesBurned >= 600) score += 10;
        else if (caloriesBurned >= 400) score += 7;
        else if (caloriesBurned >= 250) score += 4;
        else score += 2;
        
        // Weight (0-10 points)
        if (weightKg >= 68 && weightKg <= 73) score += 10;
        else if (weightKg >= 65 && weightKg <= 76) score += 6;
        else score += 3;
        
        // Stress (0-5 points)
        if (stressLevel <= 2) score += 5;
        else if (stressLevel <= 4) score += 3;
        else score += 1;
        
        return Math.min(100, score);
    }

    // Manual trigger for testing
    public void generateDataForToday() {
        generateDataForDate(LocalDate.now());
    }

    public void generateDataForLastNDays(int days) {
        LocalDate today = LocalDate.now();
        for (int i = 0; i < days; i++) {
            LocalDate date = today.minusDays(i);
            generateDataForDate(date);
        }
    }
}