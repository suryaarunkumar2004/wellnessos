package com.wellnessos.service;

import com.wellnessos.entity.HealthMetrics;
import com.wellnessos.repository.HealthMetricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class HealthMetricsService {

    @Autowired
    private HealthMetricsRepository healthMetricsRepository;

    // ===== Basic CRUD =====
    public HealthMetrics saveMetric(HealthMetrics metric) {
        if (metric.getMetricDate() == null) {
            metric.setMetricDate(LocalDate.now());
        }
        return healthMetricsRepository.save(metric);
    }

    public List<HealthMetrics> getMetricsByUser(Long userId) {
        return healthMetricsRepository.findByUserIdOrderByMetricDateDesc(userId);
    }

    public HealthMetrics getMetricByDate(Long userId, LocalDate date) {
        return healthMetricsRepository.findByUserIdAndMetricDate(userId, date).orElse(null);
    }

    public List<HealthMetrics> getMetricsByDateRange(Long userId, LocalDate startDate, LocalDate endDate) {
        return healthMetricsRepository.findByUserIdAndMetricDateBetween(userId, startDate, endDate);
    }

    public HealthMetrics getLatestMetric(Long userId) {
        return healthMetricsRepository.findTopByUserIdOrderByMetricDateDesc(userId).orElse(null);
    }

    public List<HealthMetrics> getWeeklyMetrics(Long userId) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(7);
        return healthMetricsRepository.findByUserIdAndMetricDateBetween(userId, startDate, endDate);
    }

    public List<HealthMetrics> getMonthlyMetrics(Long userId) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(30);
        return healthMetricsRepository.findByUserIdAndMetricDateBetween(userId, startDate, endDate);
    }

    public void deleteMetric(Long id) {
        healthMetricsRepository.deleteById(id);
    }

    // ===== Analytics =====
    public Map<String, Object> getAllAnalytics(Long userId) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(30);
        
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("averageSteps", healthMetricsRepository.getAverageSteps(userId, startDate, endDate));
        analytics.put("averageSleep", healthMetricsRepository.getAverageSleep(userId, startDate, endDate));
        analytics.put("averageHeartRate", healthMetricsRepository.getAverageHeartRate(userId, startDate, endDate));
        analytics.put("averageWater", healthMetricsRepository.getAverageWater(userId, startDate, endDate));
        analytics.put("averageWeight", healthMetricsRepository.getAverageWeight(userId, startDate, endDate));
        analytics.put("averageMood", healthMetricsRepository.getAverageMood(userId, startDate, endDate));
        analytics.put("averageStress", healthMetricsRepository.getAverageStress(userId, startDate, endDate));
        analytics.put("totalSteps", healthMetricsRepository.getTotalSteps(userId, startDate, endDate));
        analytics.put("averageHealthScore", healthMetricsRepository.getAverageHealthScore(userId, startDate, endDate));
        analytics.put("latestHealthScore", healthMetricsRepository.getLatestHealthScore(userId));
        analytics.put("recordCount", healthMetricsRepository.getRecordCount(userId, startDate, endDate));
        return analytics;
    }

    // ===== Trend Analysis =====
    public Map<String, Object> getTrendAnalysis(Long userId, String metric, int days) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(days);
        List<HealthMetrics> metrics = healthMetricsRepository.findByUserIdAndMetricDateBetween(userId, startDate, endDate);
        
        Map<String, Object> trend = new HashMap<>();
        List<Double> values = new ArrayList<>();
        
        for (HealthMetrics m : metrics) {
            Double value = getMetricValue(m, metric);
            if (value != null) {
                values.add(value);
            }
        }
        
        if (values.size() >= 2) {
            double first = values.get(0);
            double last = values.get(values.size() - 1);
            double change = first != 0 ? ((last - first) / first) * 100 : 0;
            trend.put("direction", change > 0 ? "up" : change < 0 ? "down" : "stable");
            trend.put("change", Math.abs(change));
            trend.put("startValue", first);
            trend.put("endValue", last);
            trend.put("average", values.stream().mapToDouble(Double::doubleValue).average().orElse(0));
            trend.put("max", values.stream().mapToDouble(Double::doubleValue).max().orElse(0));
            trend.put("min", values.stream().mapToDouble(Double::doubleValue).min().orElse(0));
            trend.put("dataPoints", values.size());
        } else {
            trend.put("direction", "stable");
            trend.put("change", 0);
            trend.put("dataPoints", values.size());
        }
        return trend;
    }

    private Double getMetricValue(HealthMetrics m, String metric) {
        switch (metric.toLowerCase()) {
            case "steps": return m.getSteps() != null ? m.getSteps().doubleValue() : null;
            case "water": return m.getWaterIntakeMl() != null ? m.getWaterIntakeMl().doubleValue() / 1000 : null;
            case "sleep": return m.getSleepHours();
            case "heartrate": return m.getHeartRate() != null ? m.getHeartRate().doubleValue() : null;
            case "weight": return m.getWeightKg();
            case "mood": return m.getMoodScore() != null ? m.getMoodScore().doubleValue() : null;
            case "stress": return m.getStressLevel() != null ? m.getStressLevel().doubleValue() : null;
            default: return null;
        }
    }

    // ===== Chart Data =====
    public Map<String, Object> getChartData(Long userId, String metric, int days) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(days);
        List<HealthMetrics> metrics = healthMetricsRepository.findByUserIdAndMetricDateBetween(userId, startDate, endDate);
        
        List<String> labels = new ArrayList<>();
        List<Double> data = new ArrayList<>();
        
        // Sort by date ascending for chart
        metrics.sort((a, b) -> a.getMetricDate().compareTo(b.getMetricDate()));
        
        for (HealthMetrics m : metrics) {
            labels.add(m.getMetricDate().toString());
            Double value = getMetricValueForChart(m, metric);
            data.add(value != null ? value : 0.0);
        }
        
        Map<String, Object> chartData = new HashMap<>();
        chartData.put("labels", labels);
        chartData.put("data", data);
        chartData.put("metric", metric);
        return chartData;
    }

    private Double getMetricValueForChart(HealthMetrics m, String metric) {
        switch (metric.toLowerCase()) {
            case "steps": return m.getSteps() != null ? m.getSteps().doubleValue() : 0.0;
            case "heartrate": return m.getHeartRate() != null ? m.getHeartRate().doubleValue() : 0.0;
            case "weightkg": return m.getWeightKg() != null ? m.getWeightKg() : 0.0;
            case "sleephours": return m.getSleepHours() != null ? m.getSleepHours() : 0.0;
            case "waterintakeml": return m.getWaterIntakeMl() != null ? m.getWaterIntakeMl().doubleValue() / 1000 : 0.0;
            case "caloriesburned": return m.getCaloriesBurned() != null ? m.getCaloriesBurned().doubleValue() : 0.0;
            case "moodscore": return m.getMoodScore() != null ? m.getMoodScore().doubleValue() : 0.0;
            case "healthscore": return m.getHealthScore() != null ? m.getHealthScore().doubleValue() : 0.0;
            default: return 0.0;
        }
    }

    // ===== Summaries =====
    public Map<String, Object> getDailySummary(Long userId) {
        HealthMetrics latest = getLatestMetric(userId);
        Map<String, Object> summary = new HashMap<>();
        if (latest == null) {
            summary.put("message", "No data available");
            return summary;
        }
        
        summary.put("date", latest.getMetricDate().toString());
        summary.put("steps", latest.getSteps());
        summary.put("sleep", latest.getSleepHours());
        summary.put("water", latest.getWaterIntakeMl() != null ? latest.getWaterIntakeMl() / 1000 : 0);
        summary.put("heartRate", latest.getHeartRate());
        summary.put("mood", latest.getMoodScore());
        summary.put("stress", latest.getStressLevel());
        summary.put("healthScore", latest.getHealthScore());
        return summary;
    }

    public Map<String, Object> getWeeklySummary(Long userId) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(7);
        List<HealthMetrics> metrics = healthMetricsRepository.findByUserIdAndMetricDateBetween(userId, startDate, endDate);
        
        Map<String, Object> summary = new HashMap<>();
        if (metrics.isEmpty()) {
            summary.put("message", "No data available");
            return summary;
        }
        
        summary.put("totalDays", metrics.size());
        summary.put("averageSteps", metrics.stream().mapToInt(m -> m.getSteps() != null ? m.getSteps() : 0).average().orElse(0));
        summary.put("averageSleep", metrics.stream().mapToDouble(m -> m.getSleepHours() != null ? m.getSleepHours() : 0).average().orElse(0));
        summary.put("averageWater", metrics.stream().mapToDouble(m -> m.getWaterIntakeMl() != null ? m.getWaterIntakeMl() / 1000 : 0).average().orElse(0));
        summary.put("averageHeartRate", metrics.stream().mapToInt(m -> m.getHeartRate() != null ? m.getHeartRate() : 0).average().orElse(0));
        summary.put("totalSteps", metrics.stream().mapToInt(m -> m.getSteps() != null ? m.getSteps() : 0).sum());
        return summary;
    }

    public Map<String, Object> getMonthlySummary(Long userId) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(30);
        List<HealthMetrics> metrics = healthMetricsRepository.findByUserIdAndMetricDateBetween(userId, startDate, endDate);
        
        Map<String, Object> summary = new HashMap<>();
        if (metrics.isEmpty()) {
            summary.put("message", "No data available");
            return summary;
        }
        
        summary.put("totalDays", metrics.size());
        summary.put("averageSteps", metrics.stream().mapToInt(m -> m.getSteps() != null ? m.getSteps() : 0).average().orElse(0));
        summary.put("averageSleep", metrics.stream().mapToDouble(m -> m.getSleepHours() != null ? m.getSleepHours() : 0).average().orElse(0));
        summary.put("averageWater", metrics.stream().mapToDouble(m -> m.getWaterIntakeMl() != null ? m.getWaterIntakeMl() / 1000 : 0).average().orElse(0));
        summary.put("totalSteps", metrics.stream().mapToInt(m -> m.getSteps() != null ? m.getSteps() : 0).sum());
        return summary;
    }
}
