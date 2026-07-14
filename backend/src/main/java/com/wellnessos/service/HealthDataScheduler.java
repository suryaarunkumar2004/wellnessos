package com.wellnessos.service;

import com.wellnessos.entity.HealthMetrics;
import com.wellnessos.repository.HealthMetricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Random;

@Service
public class HealthDataScheduler {

    @Autowired
    private HealthMetricsRepository healthMetricsRepository;

    private final Random random = new Random();

    // Run every day at 12:00 AM (midnight)
    @Scheduled(cron = "0 0 0 * * ?")
    public void addDailyHealthData() {
        LocalDate today = LocalDate.now();
        generateDataForDate(today);
    }

    private void generateDataForDate(LocalDate date) {
        boolean exists = healthMetricsRepository.findByUserIdAndMetricDate(1L, date).isPresent();
        
        if (!exists) {
            HealthMetrics metric = new HealthMetrics();
            metric.setUserId(1L);
            metric.setMetricDate(date);
            
            int dayOfWeek = date.getDayOfWeek().getValue();
            boolean isWeekend = dayOfWeek >= 6;
            
            // Steps
            int steps = isWeekend ? 5000 + random.nextInt(6000) : 4000 + random.nextInt(5000);
            metric.setSteps(steps);
            
            // Distance
            double distanceKm = (steps / 1000.0) * 0.8 + random.nextDouble() * 2;
            metric.setDistanceKm(Math.round(distanceKm * 10) / 10.0);
            
            // Calories burned
            int caloriesBurned = (int)(steps * 0.04) + random.nextInt(100);
            metric.setCaloriesBurned(caloriesBurned);
            
            // Active minutes
            int activeMinutes = (int)(steps / 100) + random.nextInt(20);
            metric.setActiveMinutes(activeMinutes);
            
            // Sleep
            double sleepHours = 6.5 + random.nextDouble() * 1.5;
            metric.setSleepHours(Math.round(sleepHours * 10) / 10.0);
            metric.setSleepQuality(random.nextInt(4) + 1);
            metric.setDeepSleepHours(Math.round((1.0 + random.nextDouble() * 2.0) * 10) / 10.0);
            
            // Nutrition
            int caloriesConsumed = 1800 + random.nextInt(1000);
            metric.setCaloriesConsumed(caloriesConsumed);
            int waterIntakeMl = 1500 + random.nextInt(2000);
            metric.setWaterIntakeMl(waterIntakeMl);
            metric.setProteinG(Math.round((50 + random.nextDouble() * 70) * 10) / 10.0);
            metric.setCarbsG(Math.round((150 + random.nextDouble() * 200) * 10) / 10.0);
            metric.setFatG(Math.round((40 + random.nextDouble() * 50) * 10) / 10.0);
            metric.setSugarG(Math.round((20 + random.nextDouble() * 40) * 10) / 10.0);
            
            // Vitals
            int heartRate = 65 + random.nextInt(15);
            metric.setHeartRate(heartRate);
            metric.setSystolic(110 + random.nextInt(20));
            metric.setDiastolic(70 + random.nextInt(15));
            metric.setBloodGlucose(85 + random.nextInt(25));
            metric.setOxygenSat(95 + random.nextInt(4));
            double weightKg = 68 + random.nextDouble() * 7;
            metric.setWeightKg(Math.round(weightKg * 10) / 10.0);
            metric.setBodyFat(Math.round((15 + random.nextDouble() * 10) * 10) / 10.0);
            metric.setTemperatureC(Math.round((36.5 + random.nextDouble() * 0.7) * 10) / 10.0);
            
            // Mental Health
            int moodScore = isWeekend ? 6 + random.nextInt(4) : 4 + random.nextInt(4);
            metric.setMoodScore(moodScore);
            int stressLevel = isWeekend ? 1 + random.nextInt(4) : 2 + random.nextInt(5);
            metric.setStressLevel(stressLevel);
            metric.setMeditationMinutes(5 + random.nextInt(25));
            
            // Notes
            String[] notes = {"Feeling great!", "Good workout today!", "Slept well.", "Stressful day.", "Relaxing weekend.", null};
            metric.setNotes(notes[random.nextInt(notes.length)]);
            
            // Health Score
            int healthScore = calculateHealthScore(steps, sleepHours, waterIntakeMl, heartRate, moodScore, caloriesBurned, weightKg, stressLevel);
            metric.setHealthScore(healthScore);
            
            healthMetricsRepository.save(metric);
            System.out.println("✅ Health data generated for: " + date + " | Steps: " + steps + " | Sleep: " + String.format("%.1f", sleepHours) + "h | Health Score: " + healthScore);
        }
    }

    private int calculateHealthScore(int steps, double sleepHours, int waterIntakeMl, int heartRate, int moodScore, int caloriesBurned, double weightKg, int stressLevel) {
        int score = 0;
        if (steps >= 10000) score += 20;
        else if (steps >= 8000) score += 16;
        else if (steps >= 6000) score += 12;
        else if (steps >= 4000) score += 8;
        else score += 4;
        if (sleepHours >= 7 && sleepHours <= 8) score += 15;
        else if (sleepHours >= 6) score += 10;
        else score += 5;
        if (waterIntakeMl >= 3000) score += 10;
        else if (waterIntakeMl >= 2500) score += 8;
        else if (waterIntakeMl >= 2000) score += 5;
        else score += 3;
        if (heartRate >= 60 && heartRate <= 70) score += 15;
        else if (heartRate >= 71 && heartRate <= 80) score += 10;
        else score += 5;
        if (moodScore >= 8) score += 15;
        else if (moodScore >= 6) score += 10;
        else score += 5;
        if (caloriesBurned >= 600) score += 10;
        else if (caloriesBurned >= 400) score += 7;
        else if (caloriesBurned >= 250) score += 4;
        else score += 2;
        if (weightKg >= 68 && weightKg <= 73) score += 10;
        else if (weightKg >= 65 && weightKg <= 76) score += 6;
        else score += 3;
        if (stressLevel <= 2) score += 5;
        else if (stressLevel <= 4) score += 3;
        else score += 1;
        return Math.min(100, score);
    }

    public void generateDataForToday() {
        generateDataForDate(LocalDate.now());
    }

    public void generateDataForLastNDays(int days) {
        LocalDate today = LocalDate.now();
        for (int i = 0; i < days; i++) {
            generateDataForDate(today.minusDays(i));
        }
    }
}
