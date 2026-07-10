package com.wellnessos.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class HealthToolsCompleteService {

    private final JdbcTemplate jdbcTemplate;

    public HealthToolsCompleteService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // ============================================================
    // 1-18: BASIC CALCULATORS
    // ============================================================

    public List<Map<String, Object>> getBMIHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, height_cm, weight_kg, bmi, category FROM bmi_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getBMRHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, age, height_cm, weight_kg, gender, bmr, maintenance FROM bmr_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getBodyFatHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, height_cm, weight_kg, body_fat_percent, category FROM bodyfat_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getIdealWeightHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, height_cm, gender, ideal_weight_low, ideal_weight_high, ideal_weight_avg FROM ideal_weight_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getCalorieHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, age, weight_kg, bmr, maintenance, lose_weight, gain_weight FROM calorie_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getMacroHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, calories, goal, protein_g, carbs_g, fat_g FROM macro_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getWaterHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, weight_kg, water_ml, glasses, bottles FROM water_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getSleepCalcHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, wake_time, recommended_bedtime FROM sleep_calculator_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getStressHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, score, level, advice FROM stress_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getFitnessAgeHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, chronological_age, fitness_age, category FROM fitness_age_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getStepHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, steps, distance_km, calories FROM step_tracker_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getHeartRateHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, age, resting_hr, active_hr, status FROM heart_rate_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getBloodPressureHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, systolic, diastolic, category FROM blood_pressure_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getBloodSugarHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, glucose, type, status FROM blood_sugar_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getWeightHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, weight_kg FROM weight_tracker_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getSleepQualityHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, hours, quality, status FROM sleep_quality_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getMoodHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, mood, note FROM mood_tracker_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getSpO2History(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, spo2, heart_rate, status FROM spo2_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    // ============================================================
    // 19-25: ADVANCED HEALTH TOOLS
    // ============================================================

    public List<Map<String, Object>> getSymptomCheckerHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, symptoms, count, severity, advice, recommendation FROM symptom_checker_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getDrugInteractionHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, drug1, drug2, severity, has_interaction, advice, recommendation FROM drug_interaction_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getDrugDosageHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, drug_type, weight_kg, min_dose, max_dose, avg_dose, frequency FROM drug_dosage_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getVaccineScheduleHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, age_months, due_vaccines, upcoming_vaccines FROM vaccine_schedule_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getHealthRiskHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, score, risk_level, advice, age, bmi, smoker, exercise, family_history FROM health_risk_assessment_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getLabResultsHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, test_type, marker, value, normal_range, interpretation, advice FROM lab_results_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getHospitalFinderHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, location, hospital_name, distance, phone FROM hospital_finder_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    // ============================================================
    // 26-34: LIFESTYLE & WELLNESS TOOLS
    // ============================================================

    public List<Map<String, Object>> getAllergyProfileHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, allergy_name, allergy_type, severity FROM allergy_profile_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getMealPlannerHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, goal, day, breakfast, lunch, dinner, calories FROM meal_planner_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getFoodNutritionHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, food_name, calories, protein, carbs, fat, fiber FROM food_nutrition_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getFoodDiaryHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, food_name, calories, meal_type FROM food_diary_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getSupplementGuideHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, supplement_name, benefits, dosage FROM supplement_guide_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getGILookupHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, food_name, gi_value, gl_value, glycemic_level FROM gi_lookup_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getHydrationPlannerHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, target_ml, current_ml, progress FROM hydration_planner_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getStressReliefHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, exercise_name, duration, completed FROM stress_relief_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getGuidedMeditationHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, meditation_name, duration, completed FROM guided_meditation_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    // ============================================================
    // 35-44: MENTAL & PHYSICAL HEALTH TOOLS
    // ============================================================

    public List<Map<String, Object>> getBreathingExercisesHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, exercise_name, rounds, completed FROM breathing_exercises_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getMoodJournalHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, mood, note, rating FROM mood_journal_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getSleepHygieneHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, tip_name, completed FROM sleep_hygiene_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getMentalHealthScreenerHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, phq9_score, gad7_score, severity FROM mental_health_screener_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getHealthArticlesHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, article_title, category, read_time FROM health_articles_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getMedicalDictionaryHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, term, category FROM medical_dictionary_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getSymptomLibraryHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, symptom, causes, treatment FROM symptom_library_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getFirstAidHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, guide_title, steps_completed, total_steps FROM first_aid_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    // ============================================================
    // 43. HEALTH STATS - FIXED
    // ============================================================
    public List<Map<String, Object>> getHealthStatsHistory(Long userId) {
        return jdbcTemplate.queryForList(
            "SELECT recorded_date, steps, heart_rate, weight_kg, sleep_hours, calories, water_ml FROM health_stats_history WHERE user_id = ? ORDER BY recorded_date DESC", 
            userId
        );
    }

    // 44. SHARE RESULTS
    public List<Map<String, Object>> getShareResultsHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, result_type, result_value, platform FROM share_results_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    // ============================================================
    // 45-52: FITNESS & CHALLENGE TOOLS
    // ============================================================

    public List<Map<String, Object>> getHealthChallengesHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, challenge_name, progress, status FROM health_challenges_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getLeaderboardHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, rank_position, points FROM leaderboard_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getWorkoutPlannerHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, goal, exercises, days, duration, calories FROM workout_planner_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getExerciseDatabaseHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, exercise_name, muscle_group, equipment, difficulty FROM exercise_database_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getFitnessLevelTestHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, score, fitness_level, age, resting_hr FROM fitness_level_test_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getRunningPaceHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, distance, time_minutes, pace FROM running_pace_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getCalorieBurnHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, activity, duration, weight_kg, calories_burned FROM calorie_burn_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }

    public List<Map<String, Object>> getHIITTimerHistory(Long userId) {
        return jdbcTemplate.queryForList("SELECT recorded_date, work_time, rest_time, rounds, completed FROM hiit_timer_history WHERE user_id = ? ORDER BY recorded_date DESC", userId);
    }
}
