package com.wellnessos.service.dashboard;

import com.wellnessos.dto.DashboardData;
import com.wellnessos.entity.HealthRecord;
import com.wellnessos.repository.HealthRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private HealthRecordRepository healthRecordRepository;

    public DashboardData getDashboardData(Long userId) {
        DashboardData dashboardData = new DashboardData();
        
        // Get all records for the user
        List<HealthRecord> records = healthRecordRepository.findByUserIdOrderByRecordDateDesc(userId);
        
        if (records.isEmpty()) {
            return dashboardData;
        }
        
        // Calculate averages
        int totalSteps = 0;
        int totalWater = 0;
        double totalSleep = 0;
        int totalHeartRate = 0;
        int count = 0;
        
        for (HealthRecord r : records) {
            if (r.getSteps() != null) totalSteps += r.getSteps();
            if (r.getWaterIntakeMl() != null) totalWater += r.getWaterIntakeMl();
            if (r.getSleepHours() != null) totalSleep += r.getSleepHours();
            if (r.getHeartRate() != null) totalHeartRate += r.getHeartRate();
            count++;
        }
        
        if (count > 0) {
            dashboardData.setTotalSteps(totalSteps);
            dashboardData.setAverageWaterIntake((double) totalWater / count);
            dashboardData.setAverageSleepHours(totalSleep / count);
            dashboardData.setAverageHeartRate(totalHeartRate / count);
            dashboardData.setRecordCount(count);
        }
        
        // Get latest record
        HealthRecord latest = records.isEmpty() ? null : records.get(0);
        if (latest != null) {
            dashboardData.setLastMood(latest.getMoodScore() != null ? latest.getMoodScore() : 0);
            dashboardData.setTodaySteps(latest.getSteps() != null ? latest.getSteps() : 0);
            dashboardData.setTodayWater(latest.getWaterIntakeMl() != null ? latest.getWaterIntakeMl() : 0);
            dashboardData.setTodaySleep(latest.getSleepHours() != null ? latest.getSleepHours() : 0);
            dashboardData.setTodayHeartRate(latest.getHeartRate() != null ? latest.getHeartRate() : 0);
        }
        
        // Add recent activities (last 5 records)
        List<Map<String, Object>> recentActivities = new ArrayList<>();
        int limit = Math.min(5, records.size());
        for (int i = 0; i < limit; i++) {
            HealthRecord r = records.get(i);
            Map<String, Object> activity = new HashMap<>();
            activity.put("date", r.getRecordDate());
            activity.put("steps", r.getSteps());
            activity.put("sleep", r.getSleepHours());
            activity.put("water", r.getWaterIntakeMl());
            activity.put("heartRate", r.getHeartRate());
            activity.put("mood", r.getMoodScore());
            recentActivities.add(activity);
        }
        dashboardData.setRecentActivities(recentActivities);
        
        // Add goals
        Map<String, Object> goals = new HashMap<>();
        goals.put("dailySteps", 10000);
        goals.put("dailyWater", 3000);
        goals.put("dailySleep", 8);
        dashboardData.setGoals(goals);
        
        // Add insights
        Map<String, Object> insights = new HashMap<>();
        insights.put("message", "You're doing great! Keep up the healthy habits.");
        insights.put("suggestion", "Try to increase your daily steps to 10,000.");
        dashboardData.setInsights(insights);
        
        return dashboardData;
    }
}
