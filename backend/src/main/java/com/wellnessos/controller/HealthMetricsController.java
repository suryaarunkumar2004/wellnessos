package com.wellnessos.controller;

import com.wellnessos.entity.HealthMetrics;
import com.wellnessos.repository.HealthMetricsRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/health-metrics")
@CrossOrigin(origins = "*")
@Tag(name = "Health Metrics", description = "Health metrics tracking APIs")
public class HealthMetricsController {

    @Autowired
    private HealthMetricsRepository healthMetricsRepository;

    // ============================================================
    // 1. GET ALL METRICS FOR A USER - FIXED!
    // ============================================================
    @Operation(summary = "Get all health metrics for a user", description = "Retrieves all health metrics for a specific user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Metrics retrieved successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    @GetMapping("/{userId}")
    public ResponseEntity<?> getHealthMetrics(@Parameter(description = "User ID", required = true, example = "1") @PathVariable Long userId) {
        try {
            List<HealthMetrics> metrics = healthMetricsRepository.findByUserIdOrderByMetricDateDesc(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", metrics);
            response.put("count", metrics.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 2. GET STATS FOR A USER
    // ============================================================
    @Operation(summary = "Get health statistics for a user", description = "Retrieves aggregated health stats for a user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Stats retrieved successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    @GetMapping("/{userId}/stats")
    public ResponseEntity<?> getStats(@Parameter(description = "User ID", required = true, example = "1") @PathVariable Long userId) {
        try {
            Long totalRecords = healthMetricsRepository.getTotalRecords(userId);
            Long daysWith10kSteps = healthMetricsRepository.getDaysWith10kSteps(userId);
            Double avgSteps = healthMetricsRepository.getAverageSteps(userId);
            Double avgHeartRate = healthMetricsRepository.getAverageHeartRate(userId);
            Double avgSleep = healthMetricsRepository.getAverageSleep(userId);
            Double avgWater = healthMetricsRepository.getAverageWaterIntake(userId);
            Double avgHealthScore = healthMetricsRepository.getAverageHealthScore(userId);
            
            Long streak = calculateStreak(userId);
            
            Double latestWeight = null;
            try {
                latestWeight = healthMetricsRepository.getLatestWeight(userId);
            } catch (Exception e) {
                // Ignore
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("stats", Map.of(
                "totalRecords", totalRecords != null ? totalRecords : 0,
                "daysWith10kSteps", daysWith10kSteps != null ? daysWith10kSteps : 0,
                "avgSteps", avgSteps != null ? Math.round(avgSteps) : 0,
                "avgHeartRate", avgHeartRate != null ? Math.round(avgHeartRate) : 0,
                "avgSleep", avgSleep != null ? Math.round(avgSleep * 10) / 10.0 : 0,
                "avgWaterMl", avgWater != null ? Math.round(avgWater) : 0,
                "avgHealthScore", avgHealthScore != null ? Math.round(avgHealthScore) : 0,
                "streak", streak != null ? streak : 0,
                "latestWeightKg", latestWeight
            ));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 3. GET LAST 30 DAYS METRICS WITH SUMMARY
    // ============================================================
    @Operation(summary = "Get last 30 days health metrics with summary", description = "Retrieves last 30 days health metrics with summary stats")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Metrics retrieved successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    @GetMapping("/{userId}/last30days")
    public ResponseEntity<?> getLast30DaysMetrics(@Parameter(description = "User ID", required = true, example = "1") @PathVariable Long userId) {
        try {
            LocalDate today = LocalDate.now();
            LocalDate thirtyDaysAgo = today.minusDays(30);
            
            List<HealthMetrics> metrics = healthMetricsRepository.findByUserIdAndMetricDateBetween(userId, thirtyDaysAgo, today);
            
            Double avgSteps = healthMetricsRepository.getAverageSteps(userId, thirtyDaysAgo, today);
            Double avgHeartRate = healthMetricsRepository.getAverageHeartRate(userId, thirtyDaysAgo, today);
            Double avgSleep = healthMetricsRepository.getAverageSleep(userId, thirtyDaysAgo, today);
            Double avgWater = healthMetricsRepository.getAverageWater(userId, thirtyDaysAgo, today);
            Double avgWeight = healthMetricsRepository.getAverageWeight(userId, thirtyDaysAgo, today);
            Double avgHealthScore = healthMetricsRepository.getAverageHealthScore(userId, thirtyDaysAgo, today);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", metrics);
            response.put("count", metrics.size());
            response.put("period", Map.of(
                "startDate", thirtyDaysAgo.toString(),
                "endDate", today.toString()
            ));
            response.put("summary", Map.of(
                "avgSteps", avgSteps != null ? Math.round(avgSteps) : 0,
                "avgHeartRate", avgHeartRate != null ? Math.round(avgHeartRate) : 0,
                "avgSleep", avgSleep != null ? Math.round(avgSleep * 10) / 10.0 : 0,
                "avgWaterMl", avgWater != null ? Math.round(avgWater) : 0,
                "avgWeightKg", avgWeight != null ? Math.round(avgWeight * 10) / 10.0 : 0,
                "avgHealthScore", avgHealthScore != null ? Math.round(avgHealthScore) : 0
            ));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 4. ADD OR UPDATE HEALTH METRIC
    // ============================================================
    @Operation(summary = "Add or update health metric", description = "Adds a new health metric or updates an existing one")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Metric saved successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    @PostMapping("/{userId}")
    public ResponseEntity<?> addHealthMetric(@Parameter(description = "User ID", required = true, example = "1") @PathVariable Long userId, @RequestBody Map<String, Object> request) {
        try {
            LocalDate metricDate = LocalDate.now();
            if (request.containsKey("metricDate") && request.get("metricDate") != null) {
                metricDate = LocalDate.parse(request.get("metricDate").toString());
            }
            
            Optional<HealthMetrics> existing = healthMetricsRepository.findByUserIdAndMetricDate(userId, metricDate);
            HealthMetrics metric = existing.orElse(new HealthMetrics());
            
            metric.setUserId(userId);
            metric.setMetricDate(metricDate);
            
            // Activity Metrics
            if (request.containsKey("steps")) metric.setSteps((Integer) request.get("steps"));
            if (request.containsKey("distanceKm")) {
                Object val = request.get("distanceKm");
                if (val instanceof Integer) metric.setDistanceKm(((Integer) val).doubleValue());
                else metric.setDistanceKm((Double) val);
            }
            if (request.containsKey("caloriesBurned")) metric.setCaloriesBurned((Integer) request.get("caloriesBurned"));
            if (request.containsKey("activeMinutes")) metric.setActiveMinutes((Integer) request.get("activeMinutes"));
            if (request.containsKey("workoutType")) metric.setWorkoutType((String) request.get("workoutType"));
            if (request.containsKey("workoutDuration")) metric.setWorkoutDuration((Integer) request.get("workoutDuration"));
            if (request.containsKey("workoutIntensity")) metric.setWorkoutIntensity((String) request.get("workoutIntensity"));
            
            // Sleep Metrics
            if (request.containsKey("sleepHours")) {
                Object val = request.get("sleepHours");
                if (val instanceof Integer) metric.setSleepHours(((Integer) val).doubleValue());
                else metric.setSleepHours((Double) val);
            }
            if (request.containsKey("sleepQuality")) metric.setSleepQuality((Integer) request.get("sleepQuality"));
            if (request.containsKey("deepSleepHours")) {
                Object val = request.get("deepSleepHours");
                if (val instanceof Integer) metric.setDeepSleepHours(((Integer) val).doubleValue());
                else metric.setDeepSleepHours((Double) val);
            }
            
            // Nutrition Metrics
            if (request.containsKey("caloriesConsumed")) metric.setCaloriesConsumed((Integer) request.get("caloriesConsumed"));
            if (request.containsKey("waterIntakeMl")) metric.setWaterIntakeMl((Integer) request.get("waterIntakeMl"));
            if (request.containsKey("proteinG")) {
                Object val = request.get("proteinG");
                if (val instanceof Integer) metric.setProteinG(((Integer) val).doubleValue());
                else metric.setProteinG((Double) val);
            }
            if (request.containsKey("carbsG")) {
                Object val = request.get("carbsG");
                if (val instanceof Integer) metric.setCarbsG(((Integer) val).doubleValue());
                else metric.setCarbsG((Double) val);
            }
            if (request.containsKey("fatG")) {
                Object val = request.get("fatG");
                if (val instanceof Integer) metric.setFatG(((Integer) val).doubleValue());
                else metric.setFatG((Double) val);
            }
            if (request.containsKey("sugarG")) {
                Object val = request.get("sugarG");
                if (val instanceof Integer) metric.setSugarG(((Integer) val).doubleValue());
                else metric.setSugarG((Double) val);
            }
            
            // Vitals
            if (request.containsKey("heartRate")) metric.setHeartRate((Integer) request.get("heartRate"));
            if (request.containsKey("systolic")) metric.setSystolic((Integer) request.get("systolic"));
            if (request.containsKey("diastolic")) metric.setDiastolic((Integer) request.get("diastolic"));
            if (request.containsKey("bloodGlucose")) metric.setBloodGlucose((Integer) request.get("bloodGlucose"));
            if (request.containsKey("oxygenSat")) metric.setOxygenSat((Integer) request.get("oxygenSat"));
            if (request.containsKey("weightKg")) {
                Object val = request.get("weightKg");
                if (val instanceof Integer) metric.setWeightKg(((Integer) val).doubleValue());
                else metric.setWeightKg((Double) val);
            }
            if (request.containsKey("bodyFat")) {
                Object val = request.get("bodyFat");
                if (val instanceof Integer) metric.setBodyFat(((Integer) val).doubleValue());
                else metric.setBodyFat((Double) val);
            }
            if (request.containsKey("temperatureC")) {
                Object val = request.get("temperatureC");
                if (val instanceof Integer) metric.setTemperatureC(((Integer) val).doubleValue());
                else metric.setTemperatureC((Double) val);
            }
            
            // Mental Health
            if (request.containsKey("moodScore")) metric.setMoodScore((Integer) request.get("moodScore"));
            if (request.containsKey("stressLevel")) metric.setStressLevel((Integer) request.get("stressLevel"));
            if (request.containsKey("meditationMinutes")) metric.setMeditationMinutes((Integer) request.get("meditationMinutes"));
            
            // Notes
            if (request.containsKey("notes")) metric.setNotes((String) request.get("notes"));
            
            // Calculate Health Score
            int healthScore = calculateHealthScore(metric);
            metric.setHealthScore(healthScore);
            
            HealthMetrics saved = healthMetricsRepository.save(metric);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Health metric saved successfully");
            response.put("data", saved);
            response.put("healthScore", saved.getHealthScore());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 5. DELETE HEALTH METRIC
    // ============================================================
    @Operation(summary = "Delete health metric", description = "Deletes a health metric by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Metric deleted successfully"),
        @ApiResponse(responseCode = "400", description = "Metric not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHealthMetric(@Parameter(description = "Health metric ID", required = true, example = "1") @PathVariable Long id) {
        try {
            if (!healthMetricsRepository.existsById(id)) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("error", "Health metric not found");
                return ResponseEntity.badRequest().body(error);
            }
            
            healthMetricsRepository.deleteById(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Health metric deleted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // HELPER: Calculate Streak
    // ============================================================
    private Long calculateStreak(Long userId) {
        LocalDate today = LocalDate.now();
        Long streak = 0L;
        
        for (int i = 0; i < 365; i++) {
            LocalDate checkDate = today.minusDays(i);
            Optional<HealthMetrics> metric = healthMetricsRepository.findByUserIdAndMetricDate(userId, checkDate);
            if (metric.isPresent() && metric.get().getSteps() != null && metric.get().getSteps() > 0) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    }

    // ============================================================
    // HELPER: Calculate Health Score
    // ============================================================
    private int calculateHealthScore(HealthMetrics metric) {
        int score = 0;
        
        // Steps (0-20 points)
        Integer steps = metric.getSteps();
        if (steps != null) {
            if (steps >= 10000) score += 20;
            else if (steps >= 8000) score += 16;
            else if (steps >= 6000) score += 12;
            else if (steps >= 4000) score += 8;
            else score += 4;
        }
        
        // Sleep (0-15 points)
        Double sleep = metric.getSleepHours();
        if (sleep != null) {
            if (sleep >= 7 && sleep <= 8) score += 15;
            else if (sleep >= 6) score += 10;
            else score += 5;
        }
        
        // Water (0-10 points)
        Integer water = metric.getWaterIntakeMl();
        if (water != null) {
            if (water >= 3000) score += 10;
            else if (water >= 2500) score += 8;
            else if (water >= 2000) score += 5;
            else score += 3;
        }
        
        // Heart Rate (0-15 points)
        Integer heartRate = metric.getHeartRate();
        if (heartRate != null) {
            if (heartRate >= 60 && heartRate <= 70) score += 15;
            else if (heartRate >= 71 && heartRate <= 80) score += 10;
            else score += 5;
        }
        
        // Mood (0-15 points)
        Integer mood = metric.getMoodScore();
        if (mood != null) {
            if (mood >= 8) score += 15;
            else if (mood >= 6) score += 10;
            else score += 5;
        }
        
        // Calories Burned (0-10 points)
        Integer calories = metric.getCaloriesBurned();
        if (calories != null) {
            if (calories >= 600) score += 10;
            else if (calories >= 400) score += 7;
            else if (calories >= 250) score += 4;
            else score += 2;
        }
        
        // Weight (0-10 points)
        Double weight = metric.getWeightKg();
        if (weight != null) {
            if (weight >= 68 && weight <= 73) score += 10;
            else if (weight >= 65 && weight <= 76) score += 6;
            else score += 3;
        }
        
        // Stress (0-5 points)
        Integer stress = metric.getStressLevel();
        if (stress != null) {
            if (stress <= 2) score += 5;
            else if (stress <= 4) score += 3;
            else score += 1;
        }
        
        return Math.min(100, score);
    }
}
