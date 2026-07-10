package com.wellnessos.repository;

import com.wellnessos.entity.HealthMetrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface HealthMetricsRepository extends JpaRepository<HealthMetrics, Long> {
    
    // ========== BASIC QUERIES ==========
    
    List<HealthMetrics> findByUserIdOrderByMetricDateDesc(Long userId);
    
    // FIX: Use native query with LIMIT 1 to handle duplicates
    @Query(value = "SELECT * FROM health_metrics WHERE user_id = :userId AND metric_date = :metricDate ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Optional<HealthMetrics> findByUserIdAndMetricDate(@Param("userId") Long userId, @Param("metricDate") LocalDate metricDate);
    
    List<HealthMetrics> findByUserIdAndMetricDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
    
    // Fix: Use native query with LIMIT to handle duplicates
    @Query(value = "SELECT * FROM health_metrics WHERE user_id = :userId ORDER BY metric_date DESC, id DESC LIMIT 1", nativeQuery = true)
    Optional<HealthMetrics> findTopByUserIdOrderByMetricDateDesc(@Param("userId") Long userId);
    
    @Query("SELECT h FROM HealthMetrics h WHERE h.userId = :userId AND h.metricDate >= :startDate ORDER BY h.metricDate DESC")
    List<HealthMetrics> findLastNDays(@Param("userId") Long userId, @Param("startDate") LocalDate startDate);
    
    // ========== AGGREGATE QUERIES - AVERAGES ==========
    
    @Query("SELECT AVG(h.heartRate) FROM HealthMetrics h WHERE h.userId = :userId AND h.heartRate > 0")
    Double getAverageHeartRate(@Param("userId") Long userId);
    
    @Query("SELECT AVG(h.steps) FROM HealthMetrics h WHERE h.userId = :userId AND h.steps > 0")
    Double getAverageSteps(@Param("userId") Long userId);
    
    @Query("SELECT AVG(h.sleepHours) FROM HealthMetrics h WHERE h.userId = :userId AND h.sleepHours > 0")
    Double getAverageSleep(@Param("userId") Long userId);
    
    @Query("SELECT AVG(h.waterIntakeMl) FROM HealthMetrics h WHERE h.userId = :userId AND h.waterIntakeMl > 0")
    Double getAverageWaterIntake(@Param("userId") Long userId);
    
    @Query("SELECT AVG(h.moodScore) FROM HealthMetrics h WHERE h.userId = :userId AND h.moodScore > 0")
    Double getAverageMood(@Param("userId") Long userId);
    
    @Query("SELECT AVG(h.weightKg) FROM HealthMetrics h WHERE h.userId = :userId AND h.weightKg > 0")
    Double getAverageWeight(@Param("userId") Long userId);
    
    @Query("SELECT AVG(h.healthScore) FROM HealthMetrics h WHERE h.userId = :userId AND h.healthScore > 0")
    Double getAverageHealthScore(@Param("userId") Long userId);
    
    // ========== AGGREGATE QUERIES - WITH DATE RANGE ==========
    
    @Query("SELECT AVG(h.heartRate) FROM HealthMetrics h WHERE h.userId = :userId AND h.heartRate > 0 AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageHeartRate(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT AVG(h.steps) FROM HealthMetrics h WHERE h.userId = :userId AND h.steps > 0 AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageSteps(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT AVG(h.sleepHours) FROM HealthMetrics h WHERE h.userId = :userId AND h.sleepHours > 0 AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageSleep(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT AVG(h.waterIntakeMl) FROM HealthMetrics h WHERE h.userId = :userId AND h.waterIntakeMl > 0 AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageWater(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT AVG(h.weightKg) FROM HealthMetrics h WHERE h.userId = :userId AND h.weightKg > 0 AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageWeight(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT AVG(h.moodScore) FROM HealthMetrics h WHERE h.userId = :userId AND h.moodScore > 0 AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageMood(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT AVG(h.stressLevel) FROM HealthMetrics h WHERE h.userId = :userId AND h.stressLevel > 0 AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageStress(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT AVG(h.healthScore) FROM HealthMetrics h WHERE h.userId = :userId AND h.healthScore > 0 AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageHealthScore(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    // ========== AGGREGATE QUERIES - SUMS ==========
    
    @Query("SELECT SUM(h.steps) FROM HealthMetrics h WHERE h.userId = :userId AND h.steps > 0 AND h.metricDate BETWEEN :startDate AND :endDate")
    Long getTotalSteps(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT SUM(h.caloriesBurned) FROM HealthMetrics h WHERE h.userId = :userId AND h.caloriesBurned > 0 AND h.metricDate BETWEEN :startDate AND :endDate")
    Long getTotalCaloriesBurned(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT SUM(h.activeMinutes) FROM HealthMetrics h WHERE h.userId = :userId AND h.activeMinutes > 0 AND h.metricDate BETWEEN :startDate AND :endDate")
    Long getTotalActiveMinutes(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    // ========== AGGREGATE QUERIES - LATEST VALUES ==========
    
    @Query(value = "SELECT health_score FROM health_metrics WHERE user_id = :userId ORDER BY metric_date DESC, id DESC LIMIT 1", nativeQuery = true)
    Integer getLatestHealthScore(@Param("userId") Long userId);
    
    @Query(value = "SELECT weight_kg FROM health_metrics WHERE user_id = :userId ORDER BY metric_date DESC, id DESC LIMIT 1", nativeQuery = true)
    Double getLatestWeight(@Param("userId") Long userId);
    
    // ========== COUNT QUERIES ==========
    
    @Query("SELECT COUNT(h) FROM HealthMetrics h WHERE h.userId = :userId")
    Long getTotalRecords(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(h) FROM HealthMetrics h WHERE h.userId = :userId AND h.metricDate BETWEEN :startDate AND :endDate")
    Long getRecordCount(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT COUNT(h) FROM HealthMetrics h WHERE h.userId = :userId AND h.steps >= 10000")
    Long getDaysWith10kSteps(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(h) FROM HealthMetrics h WHERE h.userId = :userId AND h.steps >= 10000 AND h.metricDate BETWEEN :startDate AND :endDate")
    Long getDaysWith10kSteps(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
