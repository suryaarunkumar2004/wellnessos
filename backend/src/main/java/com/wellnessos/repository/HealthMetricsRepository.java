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

    List<HealthMetrics> findByUserIdOrderByMetricDateDesc(Long userId);

    Optional<HealthMetrics> findByUserIdAndMetricDate(Long userId, LocalDate metricDate);

    List<HealthMetrics> findByUserIdAndMetricDateBetween(Long userId, LocalDate startDate, LocalDate endDate);

    // Find latest health metric for a user
    Optional<HealthMetrics> findTopByUserIdOrderByMetricDateDesc(Long userId);

    // ========== STATS QUERIES ==========
    @Query("SELECT COUNT(h) FROM HealthMetrics h WHERE h.userId = :userId")
    Long getTotalRecords(@Param("userId") Long userId);

    @Query("SELECT COUNT(h) FROM HealthMetrics h WHERE h.userId = :userId AND h.steps >= 10000")
    Long getDaysWith10kSteps(@Param("userId") Long userId);

    @Query("SELECT AVG(h.steps) FROM HealthMetrics h WHERE h.userId = :userId")
    Double getAverageSteps(@Param("userId") Long userId);

    @Query("SELECT AVG(h.steps) FROM HealthMetrics h WHERE h.userId = :userId AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageSteps(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT AVG(h.heartRate) FROM HealthMetrics h WHERE h.userId = :userId")
    Double getAverageHeartRate(@Param("userId") Long userId);

    @Query("SELECT AVG(h.heartRate) FROM HealthMetrics h WHERE h.userId = :userId AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageHeartRate(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT AVG(h.sleepHours) FROM HealthMetrics h WHERE h.userId = :userId")
    Double getAverageSleep(@Param("userId") Long userId);

    @Query("SELECT AVG(h.sleepHours) FROM HealthMetrics h WHERE h.userId = :userId AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageSleep(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT AVG(h.waterIntakeMl) FROM HealthMetrics h WHERE h.userId = :userId")
    Double getAverageWaterIntake(@Param("userId") Long userId);

    @Query("SELECT AVG(h.waterIntakeMl) FROM HealthMetrics h WHERE h.userId = :userId AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageWater(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT AVG(h.weightKg) FROM HealthMetrics h WHERE h.userId = :userId AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageWeight(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT AVG(h.healthScore) FROM HealthMetrics h WHERE h.userId = :userId")
    Double getAverageHealthScore(@Param("userId") Long userId);

    @Query("SELECT AVG(h.healthScore) FROM HealthMetrics h WHERE h.userId = :userId AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageHealthScore(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT h.weightKg FROM HealthMetrics h WHERE h.userId = :userId AND h.weightKg IS NOT NULL ORDER BY h.metricDate DESC LIMIT 1")
    Double getLatestWeight(@Param("userId") Long userId);

    // ========== ADDITIONAL METHODS NEEDED BY HealthMetricsService ==========
    @Query("SELECT AVG(h.moodScore) FROM HealthMetrics h WHERE h.userId = :userId AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageMood(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT AVG(h.stressLevel) FROM HealthMetrics h WHERE h.userId = :userId AND h.metricDate BETWEEN :startDate AND :endDate")
    Double getAverageStress(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT SUM(h.steps) FROM HealthMetrics h WHERE h.userId = :userId AND h.metricDate BETWEEN :startDate AND :endDate")
    Long getTotalSteps(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT h.healthScore FROM HealthMetrics h WHERE h.userId = :userId AND h.healthScore IS NOT NULL ORDER BY h.metricDate DESC LIMIT 1")
    Integer getLatestHealthScore(@Param("userId") Long userId);

    @Query("SELECT COUNT(h) FROM HealthMetrics h WHERE h.userId = :userId AND h.metricDate BETWEEN :startDate AND :endDate")
    Long getRecordCount(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
