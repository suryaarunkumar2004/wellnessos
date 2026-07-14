package com.wellnessos.service;

import com.wellnessos.entity.HealthMetrics;
import com.wellnessos.repository.HealthMetricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HealthMetricsService {

    @Autowired
    private HealthMetricsRepository healthMetricsRepository;

    public HealthMetrics getLatestMetrics(Long userId) {
        return healthMetricsRepository.findTopByUserIdOrderByMetricDateDesc(userId).orElse(null);
    }

    public List<HealthMetrics> getMetricsByDateRange(Long userId, LocalDate startDate, LocalDate endDate) {
        return healthMetricsRepository.findByUserIdAndMetricDateBetween(userId, startDate, endDate);
    }

    public Map<String, Object> getDashboardStats(Long userId, LocalDate startDate, LocalDate endDate) {
        Map<String, Object> stats = new HashMap<>();

        stats.put("avgSteps", healthMetricsRepository.getAverageSteps(userId, startDate, endDate));
        stats.put("avgHeartRate", healthMetricsRepository.getAverageHeartRate(userId, startDate, endDate));
        stats.put("avgSleep", healthMetricsRepository.getAverageSleep(userId, startDate, endDate));
        stats.put("avgWater", healthMetricsRepository.getAverageWater(userId, startDate, endDate));
        stats.put("avgWeight", healthMetricsRepository.getAverageWeight(userId, startDate, endDate));
        stats.put("avgHealthScore", healthMetricsRepository.getAverageHealthScore(userId, startDate, endDate));
        stats.put("avgMood", healthMetricsRepository.getAverageMood(userId, startDate, endDate));
        stats.put("avgStress", healthMetricsRepository.getAverageStress(userId, startDate, endDate));
        stats.put("totalSteps", healthMetricsRepository.getTotalSteps(userId, startDate, endDate));
        stats.put("latestHealthScore", healthMetricsRepository.getLatestHealthScore(userId));
        stats.put("recordCount", healthMetricsRepository.getRecordCount(userId, startDate, endDate));
        stats.put("totalRecords", healthMetricsRepository.getTotalRecords(userId));

        return stats;
    }
}
