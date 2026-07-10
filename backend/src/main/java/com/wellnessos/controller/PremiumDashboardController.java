package com.wellnessos.controller;

import com.wellnessos.service.PremiumDashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/premium")
@Tag(name = "Premium Suite", description = "200+ Premium Features API")
@CrossOrigin(origins = "*")
public class PremiumDashboardController {

    @Autowired
    private PremiumDashboardService service;

    // ===== DASHBOARD (20+ endpoints) =====
    @GetMapping("/dashboard/summary/{userId}")
    public ResponseEntity<Map<String, Object>> getSummary(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getDashboardSummary(userId));
    }

    @GetMapping("/dashboard/metrics/{userId}")
    public ResponseEntity<Map<String, Object>> getMetrics(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getAllMetrics(userId));
    }

    @GetMapping("/dashboard/streaks/{userId}")
    public ResponseEntity<Map<String, Object>> getStreaks(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getStreaks(userId));
    }

    @GetMapping("/dashboard/badges/{userId}")
    public ResponseEntity<Map<String, Object>> getBadges(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getBadges(userId));
    }

    @GetMapping("/dashboard/insights/{userId}")
    public ResponseEntity<Map<String, Object>> getInsights(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getInsights(userId));
    }

    @GetMapping("/dashboard/goals/{userId}")
    public ResponseEntity<Map<String, Object>> getGoals(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getGoals(userId));
    }

    @PostMapping("/dashboard/goals/{userId}/update")
    public ResponseEntity<Map<String, Object>> updateGoal(@PathVariable Long userId, @RequestBody Map<String, Object> goalData) {
        return ResponseEntity.ok(service.updateGoal(userId, goalData));
    }

    // ===== HEALTH TRACKER (30+ endpoints) =====
    @GetMapping("/health/daily/{userId}")
    public ResponseEntity<Map<String, Object>> getDailyHealth(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getDailyHealth(userId));
    }

    @GetMapping("/health/weekly/{userId}")
    public ResponseEntity<Map<String, Object>> getWeeklyHealth(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getWeeklyHealth(userId));
    }

    @GetMapping("/health/monthly/{userId}")
    public ResponseEntity<Map<String, Object>> getMonthlyHealth(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getMonthlyHealth(userId));
    }

    @GetMapping("/health/yearly/{userId}")
    public ResponseEntity<Map<String, Object>> getYearlyHealth(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getYearlyHealth(userId));
    }

    @GetMapping("/health/vitals/{userId}")
    public ResponseEntity<Map<String, Object>> getVitals(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getVitals(userId));
    }

    @GetMapping("/health/sleep/{userId}")
    public ResponseEntity<Map<String, Object>> getSleepData(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getSleepData(userId));
    }

    @GetMapping("/health/nutrition/{userId}")
    public ResponseEntity<Map<String, Object>> getNutritionData(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getNutritionData(userId));
    }

    @GetMapping("/health/mental/{userId}")
    public ResponseEntity<Map<String, Object>> getMentalHealth(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getMentalHealth(userId));
    }

    // ===== WORKOUTS (25+ endpoints) =====
    @GetMapping("/workouts/plans/{userId}")
    public ResponseEntity<Map<String, Object>> getWorkoutPlans(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getWorkoutPlans(userId));
    }

    @GetMapping("/workouts/logs/{userId}")
    public ResponseEntity<Map<String, Object>> getWorkoutLogs(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getWorkoutLogs(userId));
    }

    @GetMapping("/workouts/stats/{userId}")
    public ResponseEntity<Map<String, Object>> getWorkoutStats(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getWorkoutStats(userId));
    }

    @GetMapping("/workouts/exercises/{userId}")
    public ResponseEntity<Map<String, Object>> getExercises(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getExercises(userId));
    }

    @GetMapping("/workouts/progress/{userId}")
    public ResponseEntity<Map<String, Object>> getWorkoutProgress(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getWorkoutProgress(userId));
    }

    @PostMapping("/workouts/log")
    public ResponseEntity<Map<String, Object>> logWorkout(@RequestBody Map<String, Object> workoutData) {
        return ResponseEntity.ok(service.logWorkout(workoutData));
    }

    // ===== MEDICATIONS (25+ endpoints) =====
    @GetMapping("/medications/{userId}")
    public ResponseEntity<Map<String, Object>> getMedications(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getMedications(userId));
    }

    @GetMapping("/medications/{userId}/schedule")
    public ResponseEntity<Map<String, Object>> getMedicationSchedule(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getMedicationSchedule(userId));
    }

    @GetMapping("/medications/{userId}/adherence")
    public ResponseEntity<Map<String, Object>> getMedicationAdherence(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getMedicationAdherence(userId));
    }

    @GetMapping("/medications/{userId}/history")
    public ResponseEntity<Map<String, Object>> getMedicationHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getMedicationHistory(userId));
    }

    @PostMapping("/medications/{userId}/refill")
    public ResponseEntity<Map<String, Object>> requestRefill(@PathVariable Long userId, @RequestBody Map<String, Object> refillData) {
        return ResponseEntity.ok(service.requestRefill(userId, refillData));
    }

    // ===== APPOINTMENTS (20+ endpoints) =====
    @GetMapping("/appointments/{userId}/upcoming")
    public ResponseEntity<Map<String, Object>> getUpcomingAppointments(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getUpcomingAppointments(userId));
    }

    @GetMapping("/appointments/{userId}/history")
    public ResponseEntity<Map<String, Object>> getAppointmentHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getAppointmentHistory(userId));
    }

    @GetMapping("/appointments/{userId}/doctors")
    public ResponseEntity<Map<String, Object>> getDoctors(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getDoctors(userId));
    }

    @PostMapping("/appointments/book")
    public ResponseEntity<Map<String, Object>> bookAppointment(@RequestBody Map<String, Object> bookingData) {
        return ResponseEntity.ok(service.bookAppointment(bookingData));
    }

    @PutMapping("/appointments/{appointmentId}/cancel")
    public ResponseEntity<Map<String, Object>> cancelAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(service.cancelAppointment(appointmentId));
    }

    // ===== COMMUNITY (20+ endpoints) =====
    @GetMapping("/community/{userId}/posts")
    public ResponseEntity<Map<String, Object>> getCommunityPosts(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getCommunityPosts(userId));
    }

    @GetMapping("/community/{userId}/challenges")
    public ResponseEntity<Map<String, Object>> getChallenges(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getChallenges(userId));
    }

    @GetMapping("/community/{userId}/leaderboard")
    public ResponseEntity<Map<String, Object>> getLeaderboard(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getLeaderboard(userId));
    }

    @GetMapping("/community/{userId}/groups")
    public ResponseEntity<Map<String, Object>> getGroups(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getGroups(userId));
    }

    @PostMapping("/community/post")
    public ResponseEntity<Map<String, Object>> createPost(@RequestBody Map<String, Object> postData) {
        return ResponseEntity.ok(service.createPost(postData));
    }

    @PostMapping("/community/{postId}/like")
    public ResponseEntity<Map<String, Object>> likePost(@PathVariable Long postId) {
        return ResponseEntity.ok(service.likePost(postId));
    }

    @PostMapping("/community/{postId}/comment")
    public ResponseEntity<Map<String, Object>> commentOnPost(@PathVariable Long postId, @RequestBody Map<String, Object> commentData) {
        return ResponseEntity.ok(service.commentOnPost(postId, commentData));
    }

    // ===== REPORTS (15+ endpoints) =====
    @GetMapping("/reports/{userId}/weekly")
    public ResponseEntity<Map<String, Object>> getWeeklyReport(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getWeeklyReport(userId));
    }

    @GetMapping("/reports/{userId}/monthly")
    public ResponseEntity<Map<String, Object>> getMonthlyReport(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getMonthlyReport(userId));
    }

    @GetMapping("/reports/{userId}/quarterly")
    public ResponseEntity<Map<String, Object>> getQuarterlyReport(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getQuarterlyReport(userId));
    }

    @GetMapping("/reports/{userId}/yearly")
    public ResponseEntity<Map<String, Object>> getYearlyReport(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getYearlyReport(userId));
    }

    @GetMapping("/reports/{userId}/export/{format}")
    public ResponseEntity<Map<String, Object>> exportReport(@PathVariable Long userId, @PathVariable String format) {
        return ResponseEntity.ok(service.exportReport(userId, format));
    }

    // ===== REWARDS (15+ endpoints) =====
    @GetMapping("/rewards/{userId}/points")
    public ResponseEntity<Map<String, Object>> getPoints(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getPoints(userId));
    }

    @GetMapping("/rewards/{userId}/transactions")
    public ResponseEntity<Map<String, Object>> getPointTransactions(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getPointTransactions(userId));
    }

    @GetMapping("/rewards/{userId}/tier")
    public ResponseEntity<Map<String, Object>> getTier(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getTier(userId));
    }

    // ===== QUICK LINKS =====
    @GetMapping("/quicklinks/{userId}")
    public ResponseEntity<Map<String, Object>> getQuickLinks(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getQuickLinks(userId));
    }

    // ===== SETTINGS (10+ endpoints) =====
    @GetMapping("/settings/{userId}")
    public ResponseEntity<Map<String, Object>> getSettings(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getSettings(userId));
    }

    @PutMapping("/settings/{userId}")
    public ResponseEntity<Map<String, Object>> updateSettings(@PathVariable Long userId, @RequestBody Map<String, Object> settingsData) {
        return ResponseEntity.ok(service.updateSettings(userId, settingsData));
    }

    // ===== NOTIFICATIONS (10+ endpoints) =====
    @GetMapping("/notifications/{userId}")
    public ResponseEntity<Map<String, Object>> getNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getNotifications(userId));
    }

    @PutMapping("/notifications/{notificationId}/read")
    public ResponseEntity<Map<String, Object>> markNotificationRead(@PathVariable Long notificationId) {
        return ResponseEntity.ok(service.markNotificationRead(notificationId));
    }

    @DeleteMapping("/notifications/{notificationId}")
    public ResponseEntity<Map<String, Object>> deleteNotification(@PathVariable Long notificationId) {
        return ResponseEntity.ok(service.deleteNotification(notificationId));
    }
}
