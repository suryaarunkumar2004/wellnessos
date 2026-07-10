package com.wellnessos.controller;

import com.wellnessos.service.HealthToolsCompleteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/health-tools")
@CrossOrigin(origins = "*")
public class HealthToolsCompleteController {

    @Autowired
    private HealthToolsCompleteService service;

    // ============================================================
    // 1-18: BASIC CALCULATORS
    // ============================================================

    // 1. BMI
    @GetMapping("/bmi/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getBMIHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getBMIHistory(userId));
    }

    // 2. BMR
    @GetMapping("/bmr/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getBMRHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getBMRHistory(userId));
    }

    // 3. Body Fat
    @GetMapping("/bodyfat/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getBodyFatHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getBodyFatHistory(userId));
    }

    // 4. Ideal Weight
    @GetMapping("/ideal-weight/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getIdealWeightHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getIdealWeightHistory(userId));
    }

    // 5. Calorie
    @GetMapping("/calorie/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getCalorieHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getCalorieHistory(userId));
    }

    // 6. Macro
    @GetMapping("/macro/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getMacroHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getMacroHistory(userId));
    }

    // 7. Water
    @GetMapping("/water/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getWaterHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getWaterHistory(userId));
    }

    // 8. Sleep Calculator
    @GetMapping("/sleep-calc/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getSleepCalcHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getSleepCalcHistory(userId));
    }

    // 9. Stress
    @GetMapping("/stress/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getStressHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getStressHistory(userId));
    }

    // 10. Fitness Age
    @GetMapping("/fitness-age/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getFitnessAgeHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getFitnessAgeHistory(userId));
    }

    // 11. Step Tracker
    @GetMapping("/steps/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getStepHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getStepHistory(userId));
    }

    // 12. Heart Rate
    @GetMapping("/heart-rate/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getHeartRateHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getHeartRateHistory(userId));
    }

    // 13. Blood Pressure
    @GetMapping("/blood-pressure/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getBloodPressureHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getBloodPressureHistory(userId));
    }

    // 14. Blood Sugar
    @GetMapping("/blood-sugar/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getBloodSugarHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getBloodSugarHistory(userId));
    }

    // 15. Weight Tracker
    @GetMapping("/weight/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getWeightHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getWeightHistory(userId));
    }

    // 16. Sleep Quality
    @GetMapping("/sleep-quality/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getSleepQualityHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getSleepQualityHistory(userId));
    }

    // 17. Mood Tracker
    @GetMapping("/mood/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getMoodHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getMoodHistory(userId));
    }

    // 18. SpO2
    @GetMapping("/spo2/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getSpO2History(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getSpO2History(userId));
    }

    // ============================================================
    // 19-25: ADVANCED HEALTH TOOLS
    // ============================================================

    // 19. Symptom Checker
    @GetMapping("/symptom-checker/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getSymptomCheckerHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getSymptomCheckerHistory(userId));
    }

    // 20. Drug Interaction
    @GetMapping("/drug-interaction/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getDrugInteractionHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getDrugInteractionHistory(userId));
    }

    // 21. Drug Dosage
    @GetMapping("/drug-dosage/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getDrugDosageHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getDrugDosageHistory(userId));
    }

    // 22. Vaccine Schedule
    @GetMapping("/vaccine-schedule/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getVaccineScheduleHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getVaccineScheduleHistory(userId));
    }

    // 23. Health Risk Assessment
    @GetMapping("/health-risk/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getHealthRiskHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getHealthRiskHistory(userId));
    }

    // 24. Lab Results
    @GetMapping("/lab-results/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getLabResultsHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getLabResultsHistory(userId));
    }

    // 25. Hospital Finder
    @GetMapping("/hospital-finder/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getHospitalFinderHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getHospitalFinderHistory(userId));
    }

    // ============================================================
    // 26-34: LIFESTYLE & WELLNESS TOOLS
    // ============================================================

    // 26. Allergy Profile
    @GetMapping("/allergy-profile/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getAllergyProfileHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getAllergyProfileHistory(userId));
    }

    // 27. Meal Planner
    @GetMapping("/meal-planner/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getMealPlannerHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getMealPlannerHistory(userId));
    }

    // 28. Food Nutrition Search
    @GetMapping("/food-nutrition/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getFoodNutritionHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getFoodNutritionHistory(userId));
    }

    // 29. Food Diary
    @GetMapping("/food-diary/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getFoodDiaryHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getFoodDiaryHistory(userId));
    }

    // 30. Supplement Guide
    @GetMapping("/supplement-guide/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getSupplementGuideHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getSupplementGuideHistory(userId));
    }

    // 31. GI Lookup
    @GetMapping("/gi-lookup/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getGILookupHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getGILookupHistory(userId));
    }

    // 32. Hydration Planner
    @GetMapping("/hydration-planner/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getHydrationPlannerHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getHydrationPlannerHistory(userId));
    }

    // 33. Stress Relief
    @GetMapping("/stress-relief/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getStressReliefHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getStressReliefHistory(userId));
    }

    // 34. Guided Meditation
    @GetMapping("/guided-meditation/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getGuidedMeditationHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getGuidedMeditationHistory(userId));
    }

    // ============================================================
    // 35-44: MENTAL & PHYSICAL HEALTH TOOLS
    // ============================================================

    // 35. Breathing Exercises
    @GetMapping("/breathing-exercises/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getBreathingExercisesHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getBreathingExercisesHistory(userId));
    }

    // 36. Mood Journal
    @GetMapping("/mood-journal/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getMoodJournalHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getMoodJournalHistory(userId));
    }

    // 37. Sleep Hygiene
    @GetMapping("/sleep-hygiene/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getSleepHygieneHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getSleepHygieneHistory(userId));
    }

    // 38. Mental Health Screener
    @GetMapping("/mental-health-screener/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getMentalHealthScreenerHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getMentalHealthScreenerHistory(userId));
    }

    // 39. Health Articles
    @GetMapping("/health-articles/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getHealthArticlesHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getHealthArticlesHistory(userId));
    }

    // 40. Medical Dictionary
    @GetMapping("/medical-dictionary/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getMedicalDictionaryHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getMedicalDictionaryHistory(userId));
    }

    // 41. Symptom Library
    @GetMapping("/symptom-library/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getSymptomLibraryHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getSymptomLibraryHistory(userId));
    }

    // 42. First Aid
    @GetMapping("/first-aid/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getFirstAidHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getFirstAidHistory(userId));
    }

    // 43. Health Stats
    @GetMapping("/health-stats/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getHealthStatsHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getHealthStatsHistory(userId));
    }

    // 44. Share Results
    @GetMapping("/share-results/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getShareResultsHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getShareResultsHistory(userId));
    }

    // ============================================================
    // 45-52: FITNESS & CHALLENGE TOOLS
    // ============================================================

    // 45. Health Challenges
    @GetMapping("/health-challenges/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getHealthChallengesHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getHealthChallengesHistory(userId));
    }

    // 46. Leaderboard
    @GetMapping("/leaderboard/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getLeaderboardHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getLeaderboardHistory(userId));
    }

    // 47. Workout Planner
    @GetMapping("/workout-planner/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getWorkoutPlannerHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getWorkoutPlannerHistory(userId));
    }

    // 48. Exercise Database
    @GetMapping("/exercise-database/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getExerciseDatabaseHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getExerciseDatabaseHistory(userId));
    }

    // 49. Fitness Level Test
    @GetMapping("/fitness-level-test/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getFitnessLevelTestHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getFitnessLevelTestHistory(userId));
    }

    // 50. Running Pace
    @GetMapping("/running-pace/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getRunningPaceHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getRunningPaceHistory(userId));
    }

    // 51. Calorie Burn
    @GetMapping("/calorie-burn/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getCalorieBurnHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getCalorieBurnHistory(userId));
    }

    // 52. HIIT Timer
    @GetMapping("/hiit-timer/history/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getHIITTimerHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getHIITTimerHistory(userId));
    }
}
