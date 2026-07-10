package com.wellnessos.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class DashboardDTO {
    private Long userId;
    private String userName;
    private String userEmail;
    private Integer totalMetrics;
    private Integer totalGoals;
    private Integer totalInsights;
    private Integer totalAchievements;
    private Integer totalNotifications;
    private Integer totalCommunityFeatures;
    private Integer completedGoals;
    private Integer unlockedAchievements;
    private Integer unreadNotifications;
    private LocalDateTime lastUpdated;
    private Map<String, Object> healthMetrics;
    private Map<String, Object> goals;
    private Map<String, Object> insights;
    private Map<String, Object> achievements;
    private Map<String, Object> notifications;
    private Map<String, Object> community;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public Integer getTotalMetrics() { return totalMetrics; }
    public void setTotalMetrics(Integer totalMetrics) { this.totalMetrics = totalMetrics; }
    public Integer getTotalGoals() { return totalGoals; }
    public void setTotalGoals(Integer totalGoals) { this.totalGoals = totalGoals; }
    public Integer getTotalInsights() { return totalInsights; }
    public void setTotalInsights(Integer totalInsights) { this.totalInsights = totalInsights; }
    public Integer getTotalAchievements() { return totalAchievements; }
    public void setTotalAchievements(Integer totalAchievements) { this.totalAchievements = totalAchievements; }
    public Integer getTotalNotifications() { return totalNotifications; }
    public void setTotalNotifications(Integer totalNotifications) { this.totalNotifications = totalNotifications; }
    public Integer getTotalCommunityFeatures() { return totalCommunityFeatures; }
    public void setTotalCommunityFeatures(Integer totalCommunityFeatures) { this.totalCommunityFeatures = totalCommunityFeatures; }
    public Integer getCompletedGoals() { return completedGoals; }
    public void setCompletedGoals(Integer completedGoals) { this.completedGoals = completedGoals; }
    public Integer getUnlockedAchievements() { return unlockedAchievements; }
    public void setUnlockedAchievements(Integer unlockedAchievements) { this.unlockedAchievements = unlockedAchievements; }
    public Integer getUnreadNotifications() { return unreadNotifications; }
    public void setUnreadNotifications(Integer unreadNotifications) { this.unreadNotifications = unreadNotifications; }
    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }
    public Map<String, Object> getHealthMetrics() { return healthMetrics; }
    public void setHealthMetrics(Map<String, Object> healthMetrics) { this.healthMetrics = healthMetrics; }
    public Map<String, Object> getGoals() { return goals; }
    public void setGoals(Map<String, Object> goals) { this.goals = goals; }
    public Map<String, Object> getInsights() { return insights; }
    public void setInsights(Map<String, Object> insights) { this.insights = insights; }
    public Map<String, Object> getAchievements() { return achievements; }
    public void setAchievements(Map<String, Object> achievements) { this.achievements = achievements; }
    public Map<String, Object> getNotifications() { return notifications; }
    public void setNotifications(Map<String, Object> notifications) { this.notifications = notifications; }
    public Map<String, Object> getCommunity() { return community; }
    public void setCommunity(Map<String, Object> community) { this.community = community; }
}
