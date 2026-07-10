package com.wellnessos.dto;

import java.util.List;
import java.util.Map;

public class DashboardData {
    private int totalSteps;
    private double averageWaterIntake;
    private double averageSleepHours;
    private int averageHeartRate;
    private int recordCount;
    private int lastMood;
    private int todaySteps;
    private int todayWater;
    private double todaySleep;
    private int todayHeartRate;
    private List<Map<String, Object>> recentActivities;
    private Map<String, Object> goals;
    private Map<String, Object> insights;

    // Getters and Setters
    public int getTotalSteps() { return totalSteps; }
    public void setTotalSteps(int totalSteps) { this.totalSteps = totalSteps; }
    
    public double getAverageWaterIntake() { return averageWaterIntake; }
    public void setAverageWaterIntake(double averageWaterIntake) { this.averageWaterIntake = averageWaterIntake; }
    
    public double getAverageSleepHours() { return averageSleepHours; }
    public void setAverageSleepHours(double averageSleepHours) { this.averageSleepHours = averageSleepHours; }
    
    public int getAverageHeartRate() { return averageHeartRate; }
    public void setAverageHeartRate(int averageHeartRate) { this.averageHeartRate = averageHeartRate; }
    
    public int getRecordCount() { return recordCount; }
    public void setRecordCount(int recordCount) { this.recordCount = recordCount; }
    
    public int getLastMood() { return lastMood; }
    public void setLastMood(int lastMood) { this.lastMood = lastMood; }
    
    public int getTodaySteps() { return todaySteps; }
    public void setTodaySteps(int todaySteps) { this.todaySteps = todaySteps; }
    
    public int getTodayWater() { return todayWater; }
    public void setTodayWater(int todayWater) { this.todayWater = todayWater; }
    
    public double getTodaySleep() { return todaySleep; }
    public void setTodaySleep(double todaySleep) { this.todaySleep = todaySleep; }
    
    public int getTodayHeartRate() { return todayHeartRate; }
    public void setTodayHeartRate(int todayHeartRate) { this.todayHeartRate = todayHeartRate; }
    
    public List<Map<String, Object>> getRecentActivities() { return recentActivities; }
    public void setRecentActivities(List<Map<String, Object>> recentActivities) { this.recentActivities = recentActivities; }
    
    public Map<String, Object> getGoals() { return goals; }
    public void setGoals(Map<String, Object> goals) { this.goals = goals; }
    
    public Map<String, Object> getInsights() { return insights; }
    public void setInsights(Map<String, Object> insights) { this.insights = insights; }
}
