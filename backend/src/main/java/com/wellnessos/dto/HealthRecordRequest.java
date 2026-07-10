package com.wellnessos.dto;

import java.time.LocalDate;

public class HealthRecordRequest {
    private Long userId;
    private LocalDate recordDate;
    private Integer steps;
    private Double sleepHours;
    private Integer waterIntakeMl;
    private Integer heartRate;
    private Integer moodScore;
    private Double weightKg;

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public LocalDate getRecordDate() { return recordDate; }
    public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }
    
    public Integer getSteps() { return steps; }
    public void setSteps(Integer steps) { this.steps = steps; }
    
    public Double getSleepHours() { return sleepHours; }
    public void setSleepHours(Double sleepHours) { this.sleepHours = sleepHours; }
    
    public Integer getWaterIntakeMl() { return waterIntakeMl; }
    public void setWaterIntakeMl(Integer waterIntakeMl) { this.waterIntakeMl = waterIntakeMl; }
    
    public Integer getHeartRate() { return heartRate; }
    public void setHeartRate(Integer heartRate) { this.heartRate = heartRate; }
    
    public Integer getMoodScore() { return moodScore; }
    public void setMoodScore(Integer moodScore) { this.moodScore = moodScore; }
    
    public Double getWeightKg() { return weightKg; }
    public void setWeightKg(Double weightKg) { this.weightKg = weightKg; }
}
