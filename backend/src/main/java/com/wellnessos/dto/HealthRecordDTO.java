package com.wellnessos.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class HealthRecordDTO {
    private Long id;
    private Long userId;
    private LocalDate recordDate;
    private Integer steps;
    private Double water;
    private Double sleep;
    private Integer heartRate;
    private Double weight;
    private Integer glucose;
    private Integer oxygenSat;
    private Integer activeMinutes;
    private Integer calories;
    private Integer systolic;
    private Integer diastolic;
    private Integer moodScore;
    private Integer stressLevel;
    private Double bmi;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // GETTERS AND SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public LocalDate getRecordDate() { return recordDate; }
    public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }
    public Integer getSteps() { return steps; }
    public void setSteps(Integer steps) { this.steps = steps; }
    public Double getWater() { return water; }
    public void setWater(Double water) { this.water = water; }
    public Double getSleep() { return sleep; }
    public void setSleep(Double sleep) { this.sleep = sleep; }
    public Integer getHeartRate() { return heartRate; }
    public void setHeartRate(Integer heartRate) { this.heartRate = heartRate; }
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
    public Integer getGlucose() { return glucose; }
    public void setGlucose(Integer glucose) { this.glucose = glucose; }
    public Integer getOxygenSat() { return oxygenSat; }
    public void setOxygenSat(Integer oxygenSat) { this.oxygenSat = oxygenSat; }
    public Integer getActiveMinutes() { return activeMinutes; }
    public void setActiveMinutes(Integer activeMinutes) { this.activeMinutes = activeMinutes; }
    public Integer getCalories() { return calories; }
    public void setCalories(Integer calories) { this.calories = calories; }
    public Integer getSystolic() { return systolic; }
    public void setSystolic(Integer systolic) { this.systolic = systolic; }
    public Integer getDiastolic() { return diastolic; }
    public void setDiastolic(Integer diastolic) { this.diastolic = diastolic; }
    public Integer getMoodScore() { return moodScore; }
    public void setMoodScore(Integer moodScore) { this.moodScore = moodScore; }
    public Integer getStressLevel() { return stressLevel; }
    public void setStressLevel(Integer stressLevel) { this.stressLevel = stressLevel; }
    public Double getBmi() { return bmi; }
    public void setBmi(Double bmi) { this.bmi = bmi; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
