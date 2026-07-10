package com.wellnessos.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "health_records")
public class HealthRecord {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id")
    private Long userId;
    
    @Column(name = "record_date")
    private LocalDate recordDate;
    
    // Activity Metrics
    private Integer steps = 0;
    
    @Column(name = "distance_km")
    private Double distanceKm = 0.0;
    
    @Column(name = "calories_burned")
    private Integer caloriesBurned = 0;
    
    @Column(name = "active_minutes")
    private Integer activeMinutes = 0;
    
    @Column(name = "workout_type")
    private String workoutType;
    
    @Column(name = "workout_duration")
    private Integer workoutDuration = 0;
    
    @Column(name = "workout_intensity")
    private String workoutIntensity;
    
    // Sleep Metrics
    @Column(name = "sleep_hours")
    private Double sleepHours = 0.0;
    
    @Column(name = "sleep_quality")
    private Integer sleepQuality = 0;
    
    @Column(name = "bed_time")
    private LocalTime bedTime;
    
    @Column(name = "wake_time")
    private LocalTime wakeTime;
    
    @Column(name = "deep_sleep_hours")
    private Double deepSleepHours = 0.0;
    
    // Nutrition Metrics
    @Column(name = "calories_consumed")
    private Integer caloriesConsumed = 0;
    
    @Column(name = "water_intake_ml")
    private Integer waterIntakeMl = 0;
    
    @Column(name = "protein_g")
    private Double proteinG = 0.0;
    
    @Column(name = "carbs_g")
    private Double carbsG = 0.0;
    
    @Column(name = "fat_g")
    private Double fatG = 0.0;
    
    @Column(name = "sugar_g")
    private Double sugarG = 0.0;
    
    // Vitals
    @Column(name = "heart_rate")
    private Integer heartRate = 0;
    
    private Integer systolic = 0;
    private Integer diastolic = 0;
    
    @Column(name = "blood_glucose")
    private Integer bloodGlucose = 0;
    
    @Column(name = "oxygen_sat")
    private Integer oxygenSat = 0;
    
    @Column(name = "weight_kg")
    private Double weightKg = 0.0;
    
    @Column(name = "body_fat")
    private Double bodyFat = 0.0;
    
    @Column(name = "temperature_c")
    private Double temperatureC = 0.0;
    
    // Mental Health
    @Column(name = "mood_score")
    private Integer moodScore = 0;
    
    @Column(name = "stress_level")
    private Integer stressLevel = 0;
    
    @Column(name = "meditation_minutes")
    private Integer meditationMinutes = 0;
    
    private String notes;
    
    @Column(name = "health_score")
    private Integer healthScore = 0;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // GETTERS AND SETTERS - ALL 50+ fields
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public LocalDate getRecordDate() { return recordDate; }
    public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }
    
    public Integer getSteps() { return steps; }
    public void setSteps(Integer steps) { this.steps = steps; }
    
    public Double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(Double distanceKm) { this.distanceKm = distanceKm; }
    
    public Integer getCaloriesBurned() { return caloriesBurned; }
    public void setCaloriesBurned(Integer caloriesBurned) { this.caloriesBurned = caloriesBurned; }
    
    public Integer getActiveMinutes() { return activeMinutes; }
    public void setActiveMinutes(Integer activeMinutes) { this.activeMinutes = activeMinutes; }
    
    public String getWorkoutType() { return workoutType; }
    public void setWorkoutType(String workoutType) { this.workoutType = workoutType; }
    
    public Integer getWorkoutDuration() { return workoutDuration; }
    public void setWorkoutDuration(Integer workoutDuration) { this.workoutDuration = workoutDuration; }
    
    public String getWorkoutIntensity() { return workoutIntensity; }
    public void setWorkoutIntensity(String workoutIntensity) { this.workoutIntensity = workoutIntensity; }
    
    public Double getSleepHours() { return sleepHours; }
    public void setSleepHours(Double sleepHours) { this.sleepHours = sleepHours; }
    
    public Integer getSleepQuality() { return sleepQuality; }
    public void setSleepQuality(Integer sleepQuality) { this.sleepQuality = sleepQuality; }
    
    public LocalTime getBedTime() { return bedTime; }
    public void setBedTime(LocalTime bedTime) { this.bedTime = bedTime; }
    
    public LocalTime getWakeTime() { return wakeTime; }
    public void setWakeTime(LocalTime wakeTime) { this.wakeTime = wakeTime; }
    
    public Double getDeepSleepHours() { return deepSleepHours; }
    public void setDeepSleepHours(Double deepSleepHours) { this.deepSleepHours = deepSleepHours; }
    
    public Integer getCaloriesConsumed() { return caloriesConsumed; }
    public void setCaloriesConsumed(Integer caloriesConsumed) { this.caloriesConsumed = caloriesConsumed; }
    
    public Integer getWaterIntakeMl() { return waterIntakeMl; }
    public void setWaterIntakeMl(Integer waterIntakeMl) { this.waterIntakeMl = waterIntakeMl; }
    
    public Double getProteinG() { return proteinG; }
    public void setProteinG(Double proteinG) { this.proteinG = proteinG; }
    
    public Double getCarbsG() { return carbsG; }
    public void setCarbsG(Double carbsG) { this.carbsG = carbsG; }
    
    public Double getFatG() { return fatG; }
    public void setFatG(Double fatG) { this.fatG = fatG; }
    
    public Double getSugarG() { return sugarG; }
    public void setSugarG(Double sugarG) { this.sugarG = sugarG; }
    
    public Integer getHeartRate() { return heartRate; }
    public void setHeartRate(Integer heartRate) { this.heartRate = heartRate; }
    
    public Integer getSystolic() { return systolic; }
    public void setSystolic(Integer systolic) { this.systolic = systolic; }
    
    public Integer getDiastolic() { return diastolic; }
    public void setDiastolic(Integer diastolic) { this.diastolic = diastolic; }
    
    public Integer getBloodGlucose() { return bloodGlucose; }
    public void setBloodGlucose(Integer bloodGlucose) { this.bloodGlucose = bloodGlucose; }
    
    public Integer getOxygenSat() { return oxygenSat; }
    public void setOxygenSat(Integer oxygenSat) { this.oxygenSat = oxygenSat; }
    
    public Double getWeightKg() { return weightKg; }
    public void setWeightKg(Double weightKg) { this.weightKg = weightKg; }
    
    public Double getBodyFat() { return bodyFat; }
    public void setBodyFat(Double bodyFat) { this.bodyFat = bodyFat; }
    
    public Double getTemperatureC() { return temperatureC; }
    public void setTemperatureC(Double temperatureC) { this.temperatureC = temperatureC; }
    
    public Integer getMoodScore() { return moodScore; }
    public void setMoodScore(Integer moodScore) { this.moodScore = moodScore; }
    
    public Integer getStressLevel() { return stressLevel; }
    public void setStressLevel(Integer stressLevel) { this.stressLevel = stressLevel; }
    
    public Integer getMeditationMinutes() { return meditationMinutes; }
    public void setMeditationMinutes(Integer meditationMinutes) { this.meditationMinutes = meditationMinutes; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public Integer getHealthScore() { return healthScore; }
    public void setHealthScore(Integer healthScore) { this.healthScore = healthScore; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (recordDate == null) {
            recordDate = LocalDate.now();
        }
        calculateHealthScore();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        calculateHealthScore();
    }

    private void calculateHealthScore() {
        int score = 0;
        if (steps != null && steps >= 10000) score += 20;
        else if (steps != null && steps >= 7000) score += 15;
        else if (steps != null && steps >= 4000) score += 10;
        else if (steps != null) score += 5;
        
        if (sleepHours != null && sleepHours >= 7 && sleepHours <= 8) score += 15;
        else if (sleepHours != null && sleepHours >= 6) score += 10;
        else if (sleepHours != null) score += 5;
        
        if (waterIntakeMl != null && waterIntakeMl >= 8000) score += 15;
        else if (waterIntakeMl != null && waterIntakeMl >= 5000) score += 10;
        else if (waterIntakeMl != null) score += 5;
        
        if (heartRate != null && heartRate >= 60 && heartRate <= 80) score += 15;
        else if (heartRate != null && heartRate >= 50 && heartRate <= 90) score += 10;
        else if (heartRate != null) score += 5;
        
        if (moodScore != null && moodScore >= 8) score += 15;
        else if (moodScore != null && moodScore >= 6) score += 10;
        else if (moodScore != null) score += 5;
        
        if (activeMinutes != null && activeMinutes >= 60) score += 10;
        else if (activeMinutes != null && activeMinutes >= 30) score += 5;
        else if (activeMinutes != null) score += 2;
        
        if (weightKg != null && weightKg > 0) {
            Double bmi = weightKg / (1.75 * 1.75);
            if (bmi >= 18.5 && bmi <= 24.9) score += 10;
            else if (bmi >= 17 && bmi <= 29.9) score += 5;
            else score += 2;
        }
        
        healthScore = Math.min(100, score);
    }
}
