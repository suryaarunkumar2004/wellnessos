package com.wellnessos.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "health_metrics")
@Schema(description = "Health metrics tracking data for a user")
public class HealthMetrics {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier for the health metric record", example = "1")
    private Long id;
    
    @Column(name = "user_id")
    @Schema(description = "User ID this metric belongs to", example = "1")
    private Long userId;
    
    @Column(name = "metric_date")
    @Schema(description = "Date of the health metric", example = "2026-07-14")
    private LocalDate metricDate;
    
    // ========== ACTIVITY METRICS ==========
    @Schema(description = "Number of steps taken", example = "8500")
    private Integer steps;
    
    @Column(name = "distance_km")
    @Schema(description = "Distance walked in kilometers", example = "6.2")
    private Double distanceKm;
    
    @Column(name = "calories_burned")
    @Schema(description = "Calories burned during activity", example = "420")
    private Integer caloriesBurned;
    
    @Column(name = "active_minutes")
    @Schema(description = "Minutes of active exercise", example = "45")
    private Integer activeMinutes;
    
    @Column(name = "workout_type")
    @Schema(description = "Type of workout performed", example = "Running")
    private String workoutType;
    
    @Column(name = "workout_duration")
    @Schema(description = "Duration of workout in minutes", example = "30")
    private Integer workoutDuration;
    
    @Column(name = "workout_intensity")
    @Schema(description = "Intensity level of workout", example = "Medium")
    private String workoutIntensity;
    
    // ========== SLEEP METRICS ==========
    @Column(name = "sleep_hours")
    @Schema(description = "Hours of sleep", example = "7.5")
    private Double sleepHours;
    
    @Column(name = "sleep_quality")
    @Schema(description = "Sleep quality score (1-5)", example = "4")
    private Integer sleepQuality;
    
    @Column(name = "deep_sleep_hours")
    @Schema(description = "Hours of deep sleep", example = "2.5")
    private Double deepSleepHours;
    
    // ========== NUTRITION METRICS ==========
    @Column(name = "calories_consumed")
    @Schema(description = "Calories consumed", example = "2200")
    private Integer caloriesConsumed;
    
    @Column(name = "water_intake_ml")
    @Schema(description = "Water intake in milliliters", example = "2200")
    private Integer waterIntakeMl;
    
    @Column(name = "protein_g")
    @Schema(description = "Protein intake in grams", example = "85")
    private Double proteinG;
    
    @Column(name = "carbs_g")
    @Schema(description = "Carbohydrate intake in grams", example = "250")
    private Double carbsG;
    
    @Column(name = "fat_g")
    @Schema(description = "Fat intake in grams", example = "65")
    private Double fatG;
    
    @Column(name = "sugar_g")
    @Schema(description = "Sugar intake in grams", example = "35")
    private Double sugarG;
    
    // ========== VITAL SIGNS ==========
    @Column(name = "heart_rate")
    @Schema(description = "Resting heart rate in BPM", example = "72")
    private Integer heartRate;
    
    @Column(name = "systolic")
    @Schema(description = "Systolic blood pressure", example = "120")
    private Integer systolic;
    
    @Column(name = "diastolic")
    @Schema(description = "Diastolic blood pressure", example = "80")
    private Integer diastolic;
    
    @Column(name = "blood_glucose")
    @Schema(description = "Blood glucose level in mg/dL", example = "95")
    private Integer bloodGlucose;
    
    @Column(name = "oxygen_sat")
    @Schema(description = "Oxygen saturation percentage", example = "98")
    private Integer oxygenSat;
    
    @Column(name = "weight_kg")
    @Schema(description = "Weight in kilograms", example = "72.5")
    private Double weightKg;
    
    @Column(name = "body_fat")
    @Schema(description = "Body fat percentage", example = "18.5")
    private Double bodyFat;
    
    @Column(name = "temperature_c")
    @Schema(description = "Body temperature in Celsius", example = "36.8")
    private Double temperatureC;
    
    // ========== MENTAL HEALTH ==========
    @Column(name = "mood_score")
    @Schema(description = "Mood score (1-10)", example = "8")
    private Integer moodScore;
    
    @Column(name = "stress_level")
    @Schema(description = "Stress level (1-10)", example = "3")
    private Integer stressLevel;
    
    @Column(name = "meditation_minutes")
    @Schema(description = "Minutes of meditation", example = "10")
    private Integer meditationMinutes;
    
    // ========== GENERAL ==========
    @Column(columnDefinition = "TEXT")
    @Schema(description = "Additional notes", example = "Feeling energetic today!")
    private String notes;
    
    @Column(name = "health_score")
    @Schema(description = "Calculated health score (0-100)", example = "82")
    private Integer healthScore;
    
    @Column(name = "created_at")
    @Schema(description = "Record creation timestamp", example = "2026-07-14T10:30:00")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @Schema(description = "Record last update timestamp", example = "2026-07-14T10:30:00")
    private LocalDateTime updatedAt;

    // ========== GETTERS AND SETTERS ==========
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public LocalDate getMetricDate() { return metricDate; }
    public void setMetricDate(LocalDate metricDate) { this.metricDate = metricDate; }
    
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
        if (healthScore == null) {
            healthScore = 0;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
