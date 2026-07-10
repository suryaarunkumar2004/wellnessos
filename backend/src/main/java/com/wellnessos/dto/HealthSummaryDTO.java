package com.wellnessos.dto;

public class HealthSummaryDTO {
    private Long userId;
    private Integer totalRecords;
    private Integer totalSteps;
    private Double averageWaterIntake;
    private Double averageSleepHours;
    private Integer averageHeartRate;
    private Integer lastMood;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Integer getTotalRecords() { return totalRecords; }
    public void setTotalRecords(Integer totalRecords) { this.totalRecords = totalRecords; }
    public Integer getTotalSteps() { return totalSteps; }
    public void setTotalSteps(Integer totalSteps) { this.totalSteps = totalSteps; }
    public Double getAverageWaterIntake() { return averageWaterIntake; }
    public void setAverageWaterIntake(Double averageWaterIntake) { this.averageWaterIntake = averageWaterIntake; }
    public Double getAverageSleepHours() { return averageSleepHours; }
    public void setAverageSleepHours(Double averageSleepHours) { this.averageSleepHours = averageSleepHours; }
    public Integer getAverageHeartRate() { return averageHeartRate; }
    public void setAverageHeartRate(Integer averageHeartRate) { this.averageHeartRate = averageHeartRate; }
    public Integer getLastMood() { return lastMood; }
    public void setLastMood(Integer lastMood) { this.lastMood = lastMood; }
}
