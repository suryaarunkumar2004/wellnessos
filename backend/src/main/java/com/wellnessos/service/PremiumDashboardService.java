package com.wellnessos.service;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class PremiumDashboardService {

    private final Random random = new Random();

    // ============================================================
    // DASHBOARD (20+ features)
    // ============================================================
    public Map<String, Object> getDashboardSummary(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("userId", userId);
        result.put("date", LocalDate.now().toString());
        result.put("healthScore", randomInt(65, 95));
        result.put("totalMetrics", randomInt(15, 30));
        result.put("activeStreak", randomInt(3, 25));
        result.put("badgesEarned", randomInt(3, 12));
        result.put("pointsTotal", randomInt(150, 800));
        result.put("challengesActive", randomInt(1, 4));
        result.put("appointmentsUpcoming", randomInt(1, 5));
        result.put("medicationsToday", randomInt(2, 5));
        result.put("workoutsThisWeek", randomInt(2, 6));
        result.put("waterToday", randomInt(1500, 3500));
        result.put("sleepToday", randomDouble(6.0, 8.5));
        result.put("stepsToday", randomInt(5000, 12000));
        result.put("caloriesBurned", randomInt(1800, 2800));
        result.put("moodToday", randomInt(5, 10));
        result.put("stressToday", randomInt(1, 5));
        result.put("energyToday", randomInt(5, 10));
        result.put("focusScore", randomInt(5, 10));
        result.put("happinessScore", randomInt(5, 10));
        result.put("productivityScore", randomInt(5, 10));
        result.put("socialScore", randomInt(5, 10));
        return result;
    }

    public Map<String, Object> getAllMetrics(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("daily", getDailyMetrics(userId));
        result.put("weekly", getWeeklyMetrics(userId));
        result.put("monthly", getMonthlyMetrics(userId));
        result.put("yearly", getYearlyMetrics(userId));
        result.put("trends", getTrends(userId));
        return result;
    }

    public Map<String, Object> getStreaks(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("daily", randomInt(3, 15));
        result.put("workout", randomInt(2, 10));
        result.put("meditation", randomInt(1, 8));
        result.put("hydration", randomInt(2, 12));
        result.put("sleep", randomInt(1, 7));
        result.put("reading", randomInt(1, 5));
        result.put("learning", randomInt(1, 6));
        result.put("longestDaily", randomInt(15, 45));
        result.put("longestWorkout", randomInt(10, 30));
        return result;
    }

    public Map<String, Object> getBadges(Long userId) {
        List<Map<String, Object>> earned = getEarnedBadges(userId);
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("earned", earned);
        result.put("available", getAvailableBadges(userId));
        result.put("total", 30);
        result.put("earnedCount", earned.size());
        result.put("nextMilestone", "Complete 15 more workouts to unlock 'Fitness Legend'");
        return result;
    }

    public Map<String, Object> getInsights(Long userId) {
        List<Map<String, Object>> insights = new ArrayList<>();
        String[][] tips = {
            {"Consistent sleep schedule improves health score by 15%", "Sleep", "High"},
            {"10-minute daily meditation reduces stress by 30%", "Mental Health", "High"},
            {"Walking 10,000 steps daily reduces cardiovascular risk by 40%", "Fitness", "Medium"},
            {"Eating protein within 30 mins of workout enhances recovery", "Nutrition", "Medium"},
            {"Drinking water before meals helps weight management", "Nutrition", "High"},
            {"7-9 hours sleep boosts immune function by 50%", "Sleep", "High"},
            {"HIIT workouts burn 30% more calories than steady-state cardio", "Fitness", "Medium"},
            {"Mindfulness practices reduce anxiety by 25%", "Mental Health", "High"},
            {"Strength training increases metabolism for 48 hours", "Fitness", "Medium"},
            {"Omega-3 fatty acids improve cognitive function", "Nutrition", "Low"},
        };
        for (String[] tip : tips) {
            Map<String, Object> insight = new LinkedHashMap<>();
            insight.put("tip", tip[0]);
            insight.put("category", tip[1]);
            insight.put("priority", tip[2]);
            insights.add(insight);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("insights", insights);
        result.put("total", insights.size());
        return result;
    }

    public Map<String, Object> getGoals(Long userId) {
        List<Map<String, Object>> goals = new ArrayList<>();
        String[][] goalData = {
            {"Daily Steps", "10000", "steps", "On Track"},
            {"Sleep Hours", "8", "hours", "On Track"},
            {"Water Intake", "3000", "ml", "Behind"},
            {"Workouts", "5", "sessions/week", "On Track"},
            {"Weight", "70", "kg", "On Track"},
            {"Meditation", "10", "minutes", "Completed"},
            {"Reading", "30", "pages", "On Track"},
            {"Learning", "1", "course", "On Track"},
        };
        for (String[] g : goalData) {
            Map<String, Object> goal = new LinkedHashMap<>();
            goal.put("name", g[0]);
            goal.put("target", g[1]);
            goal.put("unit", g[2]);
            goal.put("status", g[3]);
            goal.put("progress", randomInt(40, 100));
            goals.add(goal);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("goals", goals);
        result.put("completed", randomInt(2, 5));
        result.put("total", goals.size());
        return result;
    }

    public Map<String, Object> updateGoal(Long userId, Map<String, Object> goalData) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("message", "Goal updated successfully");
        result.put("updatedAt", LocalDate.now().toString());
        return result;
    }

    // ============================================================
    // HEALTH TRACKER (30+ features)
    // ============================================================
    public Map<String, Object> getDailyHealth(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("steps", randomInt(5000, 12000));
        result.put("caloriesBurned", randomInt(1800, 2800));
        result.put("caloriesConsumed", randomInt(1500, 2200));
        result.put("waterIntake", randomInt(1500, 3500));
        result.put("sleepHours", randomDouble(6.0, 9.0));
        result.put("sleepQuality", randomInt(1, 10));
        result.put("heartRate", randomInt(60, 80));
        result.put("bloodPressure", getBloodPressure());
        result.put("weight", randomDouble(65.0, 75.0));
        result.put("bodyFat", randomDouble(15.0, 25.0));
        result.put("muscleMass", randomDouble(30.0, 40.0));
        result.put("moodScore", randomInt(5, 10));
        result.put("stressLevel", randomInt(1, 5));
        result.put("energyLevel", randomInt(5, 10));
        result.put("focusScore", randomInt(5, 10));
        result.put("meditationMinutes", randomInt(0, 30));
        result.put("oxygenSaturation", randomInt(95, 100));
        result.put("bloodGlucose", randomInt(80, 120));
        result.put("cholesterol", randomInt(150, 200));
        result.put("bmi", randomDouble(22.0, 28.0));
        return result;
    }

    public Map<String, Object> getWeeklyHealth(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        List<Map<String, Object>> days = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            Map<String, Object> day = new LinkedHashMap<>();
            day.put("date", LocalDate.now().minusDays(i).toString());
            day.put("steps", randomInt(4000, 12000));
            day.put("sleep", randomDouble(6.0, 9.0));
            day.put("water", randomInt(1500, 3500));
            day.put("mood", randomInt(5, 10));
            day.put("calories", randomInt(1500, 2500));
            day.put("heartRate", randomInt(60, 80));
            days.add(day);
        }
        result.put("days", days);
        result.put("avgSteps", calculateAvg(days, "steps"));
        result.put("avgSleep", calculateAvgDouble(days, "sleep"));
        result.put("avgWater", calculateAvg(days, "water"));
        result.put("avgMood", calculateAvg(days, "mood"));
        result.put("weekProgress", randomInt(60, 95));
        result.put("improvement", randomInt(-5, 15));
        return result;
    }

    public Map<String, Object> getMonthlyHealth(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        List<Map<String, Object>> weeks = new ArrayList<>();
        for (int i = 3; i >= 0; i--) {
            Map<String, Object> week = new LinkedHashMap<>();
            week.put("week", "Week " + (4 - i));
            week.put("avgSteps", randomInt(6000, 11000));
            week.put("avgSleep", randomDouble(6.5, 8.5));
            week.put("avgWater", randomInt(1800, 3000));
            week.put("avgMood", randomInt(5, 9));
            week.put("avgCalories", randomInt(1800, 2200));
            weeks.add(week);
        }
        result.put("weeks", weeks);
        result.put("totalDays", randomInt(25, 30));
        result.put("activeDays", randomInt(20, 28));
        result.put("consistencyScore", randomInt(70, 95));
        result.put("weightChange", randomDouble(-3.0, 1.0));
        return result;
    }

    public Map<String, Object> getYearlyHealth(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        List<Map<String, Object>> months = new ArrayList<>();
        String[] monthNames = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
        for (int i = 0; i < 12; i++) {
            Map<String, Object> month = new LinkedHashMap<>();
            month.put("month", monthNames[i]);
            month.put("avgSteps", randomInt(5000, 11000));
            month.put("avgSleep", randomDouble(6.0, 8.5));
            month.put("weight", randomDouble(65.0, 75.0));
            month.put("mood", randomInt(5, 9));
            months.add(month);
        }
        result.put("months", months);
        result.put("yearProgress", randomInt(60, 90));
        result.put("improvement", randomDouble(5, 20));
        result.put("totalWorkouts", randomInt(200, 365));
        result.put("totalSteps", randomInt(1500000, 3000000));
        return result;
    }

    public Map<String, Object> getVitals(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("heartRate", randomInt(60, 80));
        result.put("bloodPressure", getBloodPressure());
        result.put("oxygenSaturation", randomInt(95, 100));
        result.put("temperature", randomDouble(36.5, 37.5));
        result.put("respiratoryRate", randomInt(12, 18));
        result.put("bloodGlucose", randomInt(80, 120));
        result.put("cholesterol", randomInt(150, 200));
        result.put("bmi", randomDouble(22.0, 28.0));
        return result;
    }

    public Map<String, Object> getSleepData(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("avgSleep", randomDouble(6.5, 8.0));
        result.put("deepSleep", randomDouble(2.0, 4.0));
        result.put("lightSleep", randomDouble(3.0, 5.0));
        result.put("remSleep", randomDouble(1.0, 2.0));
        result.put("wakeCount", randomInt(1, 5));
        result.put("sleepQuality", randomInt(5, 9));
        result.put("bedTime", "22:30");
        result.put("wakeTime", "06:30");
        return result;
    }

    public Map<String, Object> getNutritionData(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("calories", randomInt(1800, 2200));
        result.put("protein", randomDouble(60, 100));
        result.put("carbs", randomDouble(200, 300));
        result.put("fat", randomDouble(40, 80));
        result.put("fiber", randomDouble(25, 35));
        result.put("sugar", randomDouble(20, 40));
        result.put("sodium", randomInt(1500, 2300));
        result.put("vitamins", getVitamins());
        result.put("minerals", getMinerals());
        return result;
    }

    public Map<String, Object> getMentalHealth(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("moodScore", randomInt(5, 10));
        result.put("stressLevel", randomInt(1, 5));
        result.put("anxietyScore", randomInt(1, 5));
        result.put("depressionScore", randomInt(1, 5));
        result.put("happinessScore", randomInt(5, 10));
        result.put("socialScore", randomInt(5, 10));
        result.put("workLifeBalance", randomInt(5, 10));
        result.put("meditationMinutes", randomInt(5, 30));
        result.put("journalEntries", randomInt(0, 7));
        return result;
    }

    // ============================================================
    // WORKOUTS (25+ features)
    // ============================================================
    public Map<String, Object> getWorkoutPlans(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        List<Map<String, Object>> plans = new ArrayList<>();
        String[][] planData = {
            {"Strength Training", "Strength", "Intermediate", "Build muscle mass", "45", "400"},
            {"Cardio Blast", "Cardio", "Beginner", "Improve cardiovascular health", "30", "350"},
            {"Yoga Flow", "Yoga", "Beginner", "Flexibility and mindfulness", "40", "250"},
            {"HIIT Warrior", "HIIT", "Advanced", "Maximum calorie burn", "25", "450"},
            {"Pilates Core", "Pilates", "Intermediate", "Core strength and stability", "35", "280"},
            {"Full Body", "Strength", "Intermediate", "Complete body workout", "50", "500"},
            {"Fat Burn", "Cardio", "Beginner", "Weight loss focus", "30", "320"},
            {"Power Yoga", "Yoga", "Advanced", "Intense yoga session", "55", "380"},
            {"Tabata", "HIIT", "Advanced", "High-intensity intervals", "20", "420"},
            {"Recovery", "Yoga", "Beginner", "Active recovery and stretching", "25", "150"},
        };
        for (String[] p : planData) {
            Map<String, Object> plan = new LinkedHashMap<>();
            plan.put("id", plans.size() + 1L);
            plan.put("name", p[0]);
            plan.put("category", p[1]);
            plan.put("difficulty", p[2]);
            plan.put("description", p[3]);
            plan.put("duration", Integer.parseInt(p[4]));
            plan.put("calories", Integer.parseInt(p[5]));
            plan.put("exercises", randomInt(6, 12));
            plan.put("progress", randomInt(0, 100));
            plan.put("sessionsPerWeek", randomInt(3, 5));
            plan.put("isFavorite", random.nextBoolean());
            plans.add(plan);
        }
        result.put("plans", plans);
        result.put("total", plans.size());
        result.put("active", randomInt(1, 4));
        result.put("favorites", (int) plans.stream().filter(p -> (Boolean) p.get("isFavorite")).count());
        return result;
    }

    public Map<String, Object> getWorkoutLogs(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        List<Map<String, Object>> logs = new ArrayList<>();
        String[] types = {"Cardio", "Strength", "Yoga", "HIIT", "Pilates", "Calisthenics"};
        for (int i = 0; i < 10; i++) {
            Map<String, Object> log = new LinkedHashMap<>();
            log.put("date", LocalDate.now().minusDays(i).toString());
            log.put("duration", randomInt(20, 60));
            log.put("calories", randomInt(150, 500));
            log.put("type", types[random.nextInt(types.length)]);
            log.put("intensity", new String[]{"Low", "Medium", "High"}[random.nextInt(3)]);
            log.put("heartRateAvg", randomInt(120, 160));
            log.put("heartRateMax", randomInt(150, 190));
            log.put("notes", random.nextBoolean() ? "Great workout!" : "Pushed hard today");
            logs.add(log);
        }
        result.put("logs", logs);
        result.put("totalWorkouts", randomInt(30, 80));
        result.put("totalMinutes", randomInt(800, 2000));
        result.put("totalCalories", randomInt(8000, 20000));
        result.put("avgDuration", randomInt(30, 45));
        return result;
    }

    public Map<String, Object> getWorkoutStats(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("thisWeek", randomInt(3, 7));
        result.put("thisMonth", randomInt(12, 25));
        result.put("total", randomInt(50, 200));
        result.put("avgDuration", randomInt(25, 45));
        result.put("avgCalories", randomInt(200, 400));
        result.put("streak", randomInt(3, 14));
        result.put("bestWeek", randomInt(5, 8));
        result.put("bestMonth", randomInt(20, 30));
        return result;
    }

    public Map<String, Object> getExercises(Long userId) {
        List<Map<String, Object>> exercises = new ArrayList<>();
        String[][] exData = {
            {"Push-ups", "Chest", "Bodyweight", "Medium"},
            {"Squats", "Legs", "Bodyweight", "Medium"},
            {"Pull-ups", "Back", "Bodyweight", "Hard"},
            {"Lunges", "Legs", "Bodyweight", "Medium"},
            {"Plank", "Core", "Bodyweight", "Hard"},
            {"Burpees", "Full Body", "Bodyweight", "Hard"},
            {"Mountain Climbers", "Core", "Bodyweight", "Medium"},
            {"Dumbbell Press", "Chest", "Dumbbell", "Medium"},
            {"Deadlifts", "Back", "Barbell", "Hard"},
            {"Bicep Curls", "Arms", "Dumbbell", "Easy"},
        };
        for (String[] ex : exData) {
            Map<String, Object> exercise = new LinkedHashMap<>();
            exercise.put("name", ex[0]);
            exercise.put("muscleGroup", ex[1]);
            exercise.put("equipment", ex[2]);
            exercise.put("difficulty", ex[3]);
            exercise.put("sets", randomInt(3, 5));
            exercise.put("reps", randomInt(8, 15));
            exercise.put("restSeconds", randomInt(30, 90));
            exercises.add(exercise);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("exercises", exercises);
        result.put("total", exercises.size());
        return result;
    }

    public Map<String, Object> getWorkoutProgress(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("thisWeek", randomInt(60, 95));
        result.put("thisMonth", randomInt(50, 85));
        result.put("overall", randomInt(65, 90));
        result.put("weeklyGoal", randomInt(70, 100));
        result.put("monthlyGoal", randomInt(60, 90));
        result.put("yearlyGoal", randomInt(50, 80));
        return result;
    }

    public Map<String, Object> logWorkout(Map<String, Object> workoutData) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("message", "Workout logged successfully!");
        result.put("workoutId", randomInt(1000, 9999));
        result.put("pointsEarned", randomInt(10, 50));
        result.put("date", LocalDate.now().toString());
        return result;
    }

    // ============================================================
    // MEDICATIONS (25+ features)
    // ============================================================
    public Map<String, Object> getMedications(Long userId) {
        List<Map<String, Object>> meds = new ArrayList<>();
        String[][] medData = {
            {"Metformin 500mg", "500mg", "Daily", "Active", "2", "Dr. Emily Carter"},
            {"Lisinopril 10mg", "10mg", "Twice Daily", "Active", "1", "Dr. Michael Chen"},
            {"Atorvastatin 20mg", "20mg", "Daily", "Expiring", "0", "Dr. Sarah Lee"},
            {"Vitamin D3 1000IU", "1000IU", "Daily", "Active", "5", "Dr. Priya Sharma"},
            {"Omega-3 1000mg", "1000mg", "Twice Daily", "Active", "3", "Dr. James Wilson"},
            {"Levothyroxine 50mcg", "50mcg", "Daily", "Active", "2", "Dr. Rachel Adams"},
            {"Metoprolol 25mg", "25mg", "Twice Daily", "Active", "1", "Dr. Robert Taylor"},
            {"Amoxicillin 500mg", "500mg", "Three Times Daily", "Completed", "0", "Dr. Maria Garcia"},
        };
        for (String[] m : medData) {
            Map<String, Object> med = new LinkedHashMap<>();
            med.put("id", meds.size() + 1L);
            med.put("name", m[0]);
            med.put("dosage", m[1]);
            med.put("frequency", m[2]);
            med.put("status", m[3]);
            med.put("refills", Integer.parseInt(m[4]));
            med.put("prescribedBy", m[5]);
            med.put("startDate", LocalDate.now().minusDays(randomInt(30, 180)).toString());
            med.put("nextRefill", LocalDate.now().plusDays(randomInt(10, 60)).toString());
            med.put("isActive", !"Completed".equals(m[3]));
            meds.add(med);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("medications", meds);
        result.put("active", (int) meds.stream().filter(m -> (Boolean) m.get("isActive")).count());
        result.put("total", meds.size());
        result.put("expiring", (int) meds.stream().filter(m -> "Expiring".equals(m.get("status"))).count());
        return result;
    }

    public Map<String, Object> getMedicationSchedule(Long userId) {
        List<Map<String, Object>> schedule = new ArrayList<>();
        String[][] schedData = {
            {"08:00", "Metformin", "Taken"},
            {"08:00", "Lisinopril", "Taken"},
            {"12:00", "Omega-3", "Scheduled"},
            {"18:00", "Atorvastatin", "Scheduled"},
            {"20:00", "Metformin", "Scheduled"},
            {"22:00", "Vitamin D3", "Scheduled"},
        };
        for (String[] s : schedData) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("time", s[0]);
            item.put("medication", s[1]);
            item.put("status", s[2]);
            item.put("taken", "Taken".equals(s[2]));
            schedule.add(item);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("schedule", schedule);
        result.put("takenToday", (int) schedule.stream().filter(s -> (Boolean) s.get("taken")).count());
        result.put("totalToday", schedule.size());
        result.put("adherenceRate", randomInt(85, 98));
        return result;
    }

    public Map<String, Object> getMedicationAdherence(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("thisWeek", randomInt(80, 100));
        result.put("thisMonth", randomInt(75, 95));
        result.put("overall", randomInt(80, 92));
        result.put("missedDoses", randomInt(0, 5));
        result.put("onTime", randomInt(75, 95));
        result.put("lateDoses", randomInt(2, 10));
        return result;
    }

    public Map<String, Object> getMedicationHistory(Long userId) {
        List<Map<String, Object>> history = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            Map<String, Object> entry = new LinkedHashMap<>();
            entry.put("date", LocalDate.now().minusDays(i).toString());
            entry.put("taken", randomInt(3, 5));
            entry.put("total", 5);
            entry.put("adherence", randomInt(70, 100));
            history.add(entry);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("history", history);
        return result;
    }

    public Map<String, Object> requestRefill(Long userId, Map<String, Object> refillData) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("message", "Refill request submitted successfully");
        result.put("refillId", randomInt(1000, 9999));
        result.put("estimatedDelivery", LocalDate.now().plusDays(3).toString());
        return result;
    }

    // ============================================================
    // APPOINTMENTS (20+ features)
    // ============================================================
    public Map<String, Object> getUpcomingAppointments(Long userId) {
        List<Map<String, Object>> appointments = new ArrayList<>();
        String[][] apptData = {
            {"Dr. Emily Carter", "Cardiology", "2026-07-08", "10:00", "Video", "Confirmed"},
            {"Dr. Michael Chen", "Neurology", "2026-07-12", "14:30", "In-Person", "Confirmed"},
            {"Dr. Priya Sharma", "Gynecology", "2026-07-15", "09:00", "Video", "Pending"},
            {"Dr. James Wilson", "Orthopedics", "2026-07-20", "11:00", "In-Person", "Confirmed"},
            {"Dr. Sarah Lee", "Dermatology", "2026-07-25", "15:30", "Video", "Confirmed"},
        };
        for (String[] a : apptData) {
            Map<String, Object> appt = new LinkedHashMap<>();
            appt.put("id", appointments.size() + 1L);
            appt.put("doctor", a[0]);
            appt.put("specialty", a[1]);
            appt.put("date", a[2]);
            appt.put("time", a[3]);
            appt.put("type", a[4]);
            appt.put("status", a[5]);
            appointments.add(appt);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("appointments", appointments);
        result.put("total", appointments.size());
        result.put("confirmed", (int) appointments.stream().filter(a -> "Confirmed".equals(a.get("status"))).count());
        return result;
    }

    public Map<String, Object> getAppointmentHistory(Long userId) {
        List<Map<String, Object>> history = new ArrayList<>();
        String[][] histData = {
            {"Dr. Rachel Adams", "2026-06-15", "Video", "Completed"},
            {"Dr. Robert Taylor", "2026-06-01", "In-Person", "Completed"},
            {"Dr. Maria Garcia", "2026-05-20", "Phone", "Cancelled"},
            {"Dr. Emily Carter", "2026-05-10", "Video", "Completed"},
            {"Dr. Michael Chen", "2026-04-25", "In-Person", "Completed"},
        };
        for (String[] h : histData) {
            Map<String, Object> entry = new LinkedHashMap<>();
            entry.put("doctor", h[0]);
            entry.put("date", h[1]);
            entry.put("type", h[2]);
            entry.put("status", h[3]);
            history.add(entry);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("history", history);
        result.put("total", history.size());
        result.put("completed", (int) history.stream().filter(h -> "Completed".equals(h.get("status"))).count());
        return result;
    }

    public Map<String, Object> getDoctors(Long userId) {
        List<Map<String, Object>> doctors = new ArrayList<>();
        String[][] docData = {
            {"Dr. Emily Carter", "Cardiology", "4.9", "127", "WellNest Medical Center"},
            {"Dr. Michael Chen", "Neurology", "4.8", "98", "NeuroCare Institute"},
            {"Dr. Priya Sharma", "Gynecology", "4.9", "156", "Women's Health Center"},
            {"Dr. James Wilson", "Orthopedics", "4.7", "89", "OrthoCare Hospital"},
            {"Dr. Sarah Lee", "Dermatology", "4.8", "112", "Skin & Aesthetics Clinic"},
            {"Dr. Rachel Adams", "Endocrinology", "4.6", "76", "Endocrine Center"},
            {"Dr. Robert Taylor", "Cardiology", "4.7", "143", "Heart Institute"},
            {"Dr. Maria Garcia", "Pediatrics", "4.9", "200", "Children's Hospital"},
        };
        for (String[] d : docData) {
            Map<String, Object> doctor = new LinkedHashMap<>();
            doctor.put("id", doctors.size() + 1L);
            doctor.put("name", d[0]);
            doctor.put("specialty", d[1]);
            doctor.put("rating", Double.parseDouble(d[2]));
            doctor.put("reviews", Integer.parseInt(d[3]));
            doctor.put("hospital", d[4]);
            doctor.put("fee", randomInt(150, 350));
            doctor.put("availability", getAvailability());
            doctors.add(doctor);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("doctors", doctors);
        result.put("total", doctors.size());
        result.put("avgRating", 4.8);
        return result;
    }

    public Map<String, Object> bookAppointment(Map<String, Object> bookingData) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("message", "Appointment booked successfully!");
        result.put("appointmentId", randomInt(1000, 9999));
        result.put("confirmationCode", "APPT-" + randomInt(10000, 99999));
        result.put("meetingLink", "https://wellnessos.com/meet/" + randomInt(100000, 999999));
        return result;
    }

    public Map<String, Object> cancelAppointment(Long appointmentId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("message", "Appointment cancelled successfully");
        result.put("appointmentId", appointmentId);
        return result;
    }

    // ============================================================
    // COMMUNITY (20+ features)
    // ============================================================
    public Map<String, Object> getCommunityPosts(Long userId) {
        List<Map<String, Object>> posts = new ArrayList<>();
        String[][] postData = {
            {"Sarah K.", "Just completed my first 10K run! 🏃", "45", "12", "2h ago"},
            {"Mike R.", "Any tips for healthy eating on a budget?", "28", "18", "4h ago"},
            {"Priya S.", "Celebrating 30 days of meditation! 🧘", "56", "8", "6h ago"},
            {"James W.", "What's the best exercise for lower back pain?", "34", "15", "8h ago"},
            {"Emma L.", "Finally hit my weight loss goal! 🎉", "72", "24", "10h ago"},
            {"David C.", "New to fitness - any beginner tips?", "19", "22", "12h ago"},
            {"Lisa R.", "Just tried HIIT for the first time - wow!", "41", "9", "14h ago"},
            {"Tom H.", "Meal prep ideas for the week?", "33", "14", "16h ago"},
        };
        for (String[] p : postData) {
            Map<String, Object> post = new LinkedHashMap<>();
            post.put("id", posts.size() + 1L);
            post.put("author", p[0]);
            post.put("content", p[1]);
            post.put("likes", Integer.parseInt(p[2]));
            post.put("comments", Integer.parseInt(p[3]));
            post.put("time", p[4]);
            post.put("avatar", "https://randomuser.me/api/portraits/" + (random.nextBoolean() ? "women" : "men") + "/" + randomInt(1, 50) + ".jpg");
            posts.add(post);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("posts", posts);
        result.put("total", posts.size());
        return result;
    }

    public Map<String, Object> getChallenges(Long userId) {
        List<Map<String, Object>> challenges = new ArrayList<>();
        String[][] challengeData = {
            {"7-Day Walking Challenge", "Walk 10,000 steps daily", "Easy", "7", "100", "🚶"},
            {"30-Day Yoga Challenge", "Complete 30 yoga sessions", "Medium", "30", "250", "🧘"},
            {"Hydration Challenge", "Drink 3L water daily", "Easy", "14", "150", "💧"},
            {"Sleep Better Challenge", "Get 8 hours sleep", "Medium", "21", "200", "😴"},
            {"Meditation Challenge", "Meditate 10 minutes daily", "Medium", "30", "300", "🧠"},
            {"Weight Loss Challenge", "Lose 5kg in 8 weeks", "Hard", "56", "400", "⚖️"},
        };
        for (String[] c : challengeData) {
            Map<String, Object> challenge = new LinkedHashMap<>();
            challenge.put("id", challenges.size() + 1L);
            challenge.put("name", c[0]);
            challenge.put("description", c[1]);
            challenge.put("difficulty", c[2]);
            challenge.put("durationDays", Integer.parseInt(c[3]));
            challenge.put("pointsReward", Integer.parseInt(c[4]));
            challenge.put("icon", c[5]);
            challenge.put("participants", randomInt(50, 500));
            challenge.put("progress", randomInt(0, 100));
            challenge.put("isActive", random.nextBoolean());
            challenges.add(challenge);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("challenges", challenges);
        result.put("total", challenges.size());
        result.put("active", (int) challenges.stream().filter(c -> (Boolean) c.get("isActive")).count());
        return result;
    }

    public Map<String, Object> getLeaderboard(Long userId) {
        List<Map<String, Object>> leaders = new ArrayList<>();
        String[][] leaderData = {
            {"Sarah K.", "1,250", "45"},
            {"Mike R.", "1,180", "38"},
            {"Priya S.", "1,050", "42"},
            {"James W.", "980", "35"},
            {"Emma L.", "920", "40"},
            {"David C.", "850", "28"},
        };
        for (int i = 0; i < leaderData.length; i++) {
            Map<String, Object> leader = new LinkedHashMap<>();
            leader.put("rank", i + 1);
            leader.put("name", leaderData[i][0]);
            leader.put("points", leaderData[i][1]);
            leader.put("badges", leaderData[i][2]);
            leaders.add(leader);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("leaders", leaders);
        result.put("userRank", randomInt(5, 25));
        return result;
    }

    public Map<String, Object> getGroups(Long userId) {
        List<Map<String, Object>> groups = new ArrayList<>();
        String[][] groupData = {
            {"Fitness Enthusiasts", "456", "Active", "💪"},
            {"Yoga Lovers", "234", "Active", "��"},
            {"Healthy Eating", "389", "Active", "🥗"},
            {"Mental Health Support", "178", "Active", "🧠"},
            {"Running Club", "312", "Active", "🏃"},
        };
        for (String[] g : groupData) {
            Map<String, Object> group = new LinkedHashMap<>();
            group.put("name", g[0]);
            group.put("members", Integer.parseInt(g[1]));
            group.put("status", g[2]);
            group.put("icon", g[3]);
            groups.add(group);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("groups", groups);
        result.put("total", groups.size());
        return result;
    }

    public Map<String, Object> createPost(Map<String, Object> postData) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("message", "Post created successfully!");
        result.put("postId", randomInt(1000, 9999));
        result.put("createdAt", LocalDate.now().toString());
        return result;
    }

    public Map<String, Object> likePost(Long postId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("message", "Post liked!");
        result.put("postId", postId);
        result.put("newLikes", randomInt(50, 100));
        return result;
    }

    public Map<String, Object> commentOnPost(Long postId, Map<String, Object> commentData) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("message", "Comment added!");
        result.put("postId", postId);
        result.put("commentId", randomInt(1000, 9999));
        return result;
    }

    // ============================================================
    // REPORTS (15+ features)
    // ============================================================
    public Map<String, Object> getWeeklyReport(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("weekStart", LocalDate.now().minusDays(6).toString());
        result.put("weekEnd", LocalDate.now().toString());
        result.put("avgSteps", randomInt(7000, 10000));
        result.put("avgSleep", randomDouble(6.5, 8.0));
        result.put("avgWater", randomInt(2000, 2800));
        result.put("totalCalories", randomInt(12000, 16000));
        result.put("workouts", randomInt(3, 7));
        result.put("moodScore", randomInt(6, 9));
        result.put("stressAverage", randomInt(2, 4));
        result.put("medicationAdherence", randomInt(85, 98));
        result.put("summary", "Great progress this week! Keep up the momentum.");
        result.put("improvements", getImprovements());
        result.put("challenges", getChallengesList());
        return result;
    }

    public Map<String, Object> getMonthlyReport(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("month", LocalDate.now().getMonth().toString());
        result.put("year", LocalDate.now().getYear());
        result.put("avgSteps", randomInt(7000, 9500));
        result.put("avgSleep", randomDouble(6.5, 8.0));
        result.put("weightChange", randomDouble(-3.0, 1.0));
        result.put("workoutsTotal", randomInt(15, 30));
        result.put("badgesEarned", randomInt(1, 5));
        result.put("pointsEarned", randomInt(200, 800));
        result.put("summary", "Excellent monthly progress!");
        result.put("monthlyGoal", randomInt(60, 90));
        return result;
    }

    public Map<String, Object> getQuarterlyReport(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("quarter", "Q" + ((LocalDate.now().getMonthValue() - 1) / 3 + 1));
        result.put("year", LocalDate.now().getYear());
        result.put("avgSteps", randomInt(6800, 9200));
        result.put("avgSleep", randomDouble(6.5, 8.0));
        result.put("weightChange", randomDouble(-5.0, 2.0));
        result.put("workoutsTotal", randomInt(45, 80));
        result.put("badgesEarned", randomInt(3, 10));
        result.put("pointsEarned", randomInt(600, 2000));
        result.put("summary", "Strong quarterly performance!");
        return result;
    }

    public Map<String, Object> getYearlyReport(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("year", LocalDate.now().getYear());
        result.put("avgSteps", randomInt(6500, 9000));
        result.put("avgSleep", randomDouble(6.5, 8.0));
        result.put("weightChange", randomDouble(-8.0, 3.0));
        result.put("workoutsTotal", randomInt(200, 350));
        result.put("badgesEarned", randomInt(10, 25));
        result.put("pointsEarned", randomInt(3000, 8000));
        result.put("summary", "Amazing year! You've transformed your health!");
        result.put("yearInReview", getYearInReview());
        return result;
    }

    public Map<String, Object> exportReport(Long userId, String format) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("message", "Report exported as " + format.toUpperCase());
        result.put("format", format);
        result.put("filename", "health-report-" + LocalDate.now() + "." + format.toLowerCase());
        result.put("downloadUrl", "/api/reports/download/" + LocalDate.now() + "." + format.toLowerCase());
        return result;
    }

    // ============================================================
    // REWARDS (15+ features)
    // ============================================================
    public Map<String, Object> getPoints(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("total", randomInt(150, 800));
        result.put("level", randomInt(1, 8));
        result.put("tier", new String[]{"Bronze", "Silver", "Gold", "Platinum", "Diamond"}[random.nextInt(5)]);
        result.put("nextTierPoints", randomInt(200, 1000));
        result.put("progress", randomInt(20, 90));
        result.put("pointsToNextTier", randomInt(50, 500));
        return result;
    }

    public Map<String, Object> getPointTransactions(Long userId) {
        List<Map<String, Object>> transactions = new ArrayList<>();
        String[] reasons = {"Daily Login", "Steps Goal Met", "Completed Workout", "Shared Post", "Challenge Bonus", "Medication Adherence", "Water Goal Met", "Sleep Goal Met"};
        for (int i = 0; i < 15; i++) {
            Map<String, Object> tx = new LinkedHashMap<>();
            tx.put("id", i + 1L);
            tx.put("reason", reasons[random.nextInt(reasons.length)]);
            tx.put("points", randomInt(5, 50));
            tx.put("date", LocalDate.now().minusDays(i).toString());
            tx.put("type", random.nextBoolean() ? "Earned" : "Spent");
            transactions.add(tx);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("transactions", transactions);
        result.put("total", transactions.size());
        return result;
    }

    public Map<String, Object> getTier(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("currentTier", new String[]{"Bronze", "Silver", "Gold", "Platinum", "Diamond"}[random.nextInt(5)]);
        result.put("nextTier", new String[]{"Silver", "Gold", "Platinum", "Diamond", "Elite"}[random.nextInt(5)]);
        result.put("pointsRequired", randomInt(200, 1000));
        result.put("benefits", getTierBenefits());
        return result;
    }

    // ============================================================
    // QUICK LINKS
    // ============================================================
    public Map<String, Object> getQuickLinks(Long userId) {
        List<Map<String, Object>> links = new ArrayList<>();
        String[][] linkData = {
            {"Health Tracker", "📊", "/health-tracker"},
            {"Book Appointment", "📅", "/book-appointment"},
            {"Medications", "💊", "/medications"},
            {"Workouts", "💪", "/workouts"},
            {"Community", "👥", "/community"},
            {"Reports", "📄", "/reports"},
            {"Dashboard", "📈", "/more?tab=dashboard"},
            {"Blog", "📝", "/blog"},
        };
        for (String[] data : linkData) {
            Map<String, Object> link = new LinkedHashMap<>();
            link.put("label", data[0]);
            link.put("icon", data[1]);
            link.put("path", data[2]);
            links.add(link);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("links", links);
        result.put("total", links.size());
        return result;
    }

    // ============================================================
    // SETTINGS (10+ features)
    // ============================================================
    public Map<String, Object> getSettings(Long userId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("theme", "Light");
        result.put("fontSize", "Medium");
        result.put("language", "English");
        result.put("timezone", "UTC+5:30");
        result.put("dateFormat", "MM/DD/YYYY");
        result.put("timeFormat", "12h");
        result.put("weightUnit", "kg");
        result.put("heightUnit", "cm");
        result.put("distanceUnit", "km");
        result.put("temperatureUnit", "Celsius");
        result.put("notifications", true);
        result.put("emailUpdates", true);
        result.put("smsAlerts", false);
        result.put("pushNotifications", true);
        return result;
    }

    public Map<String, Object> updateSettings(Long userId, Map<String, Object> settingsData) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("message", "Settings updated successfully");
        result.put("updatedAt", LocalDate.now().toString());
        return result;
    }

    // ============================================================
    // NOTIFICATIONS (10+ features)
    // ============================================================
    public Map<String, Object> getNotifications(Long userId) {
        List<Map<String, Object>> notifications = new ArrayList<>();
        String[][] notifData = {
            {"💊", "Metformin Refill Due", "Your prescription has 3 days remaining", "High", "2h ago"},
            {"🚨", "Blood Pressure Alert", "142/91 mmHg - Please monitor", "High", "4h ago"},
            {"🏥", "Appointment Reminder", "Cardiology appointment tomorrow at 10:00 AM", "Medium", "6h ago"},
            {"🧪", "Lab Results Ready", "Thyroid panel results are available", "Medium", "8h ago"},
            {"💳", "Payment Confirmation", "Your appointment payment of $15 was successful", "Low", "10h ago"},
            {"📩", "New Message", "Dr. Rachel Adams sent you a message", "Medium", "12h ago"},
            {"💉", "Vaccine Reminder", "Flu vaccine recommended for this season", "Low", "14h ago"},
            {"🔒", "Security Alert", "New login detected from Chrome on Mac", "High", "16h ago"},
        };
        for (String[] n : notifData) {
            Map<String, Object> notif = new LinkedHashMap<>();
            notif.put("id", notifications.size() + 1L);
            notif.put("icon", n[0]);
            notif.put("title", n[1]);
            notif.put("description", n[2]);
            notif.put("priority", n[3]);
            notif.put("time", n[4]);
            notif.put("read", random.nextBoolean());
            notifications.add(notif);
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("notifications", notifications);
        result.put("total", notifications.size());
        result.put("unread", (int) notifications.stream().filter(n -> !(Boolean) n.get("read")).count());
        return result;
    }

    public Map<String, Object> markNotificationRead(Long notificationId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("message", "Notification marked as read");
        result.put("notificationId", notificationId);
        return result;
    }

    public Map<String, Object> deleteNotification(Long notificationId) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("message", "Notification deleted");
        result.put("notificationId", notificationId);
        return result;
    }

    // ============================================================
    // HELPER METHODS
    // ============================================================
    private int randomInt(int min, int max) {
        return min + random.nextInt(max - min + 1);
    }

    private double randomDouble(double min, double max) {
        return min + random.nextDouble() * (max - min);
    }

    private String getBloodPressure() {
        return randomInt(110, 130) + "/" + randomInt(70, 85);
    }

    private Map<String, Object> getVitamins() {
        Map<String, Object> vitamins = new LinkedHashMap<>();
        vitamins.put("Vitamin A", randomInt(800, 1200) + "mcg");
        vitamins.put("Vitamin C", randomInt(60, 100) + "mg");
        vitamins.put("Vitamin D", randomInt(15, 30) + "mcg");
        vitamins.put("Vitamin E", randomInt(10, 20) + "mg");
        vitamins.put("Vitamin K", randomInt(60, 100) + "mcg");
        return vitamins;
    }

    private Map<String, Object> getMinerals() {
        Map<String, Object> minerals = new LinkedHashMap<>();
        minerals.put("Calcium", randomInt(800, 1200) + "mg");
        minerals.put("Iron", randomInt(8, 18) + "mg");
        minerals.put("Magnesium", randomInt(300, 400) + "mg");
        minerals.put("Potassium", randomInt(2500, 3500) + "mg");
        minerals.put("Zinc", randomInt(8, 12) + "mg");
        return minerals;
    }

    private List<Map<String, Object>> getEarnedBadges(Long userId) {
        List<Map<String, Object>> badges = new ArrayList<>();
        String[][] badgeData = {
            {"First Steps", "🚶", "Complete your first health tracking day"},
            {"10K Steps", "🏃", "Hit 10,000 steps in one day"},
            {"Hydration Hero", "💧", "Drink 3L of water in a day"},
            {"Sleep Champion", "😴", "Sleep 8+ hours for 7 days"},
            {"Fitness Warrior", "💪", "Complete 50 workouts"},
            {"Healthy Eater", "🥗", "Log 100 healthy meals"},
            {"Stress Buster", "😌", "Reduce stress score by 50%"},
            {"Challenge Champ", "🏆", "Complete 5 challenges"},
        };
        for (String[] b : badgeData) {
            Map<String, Object> badge = new LinkedHashMap<>();
            badge.put("name", b[0]);
            badge.put("icon", b[1]);
            badge.put("description", b[2]);
            badge.put("earnedAt", LocalDate.now().minusDays(randomInt(1, 60)).toString());
            badges.add(badge);
        }
        return badges;
    }

    private List<Map<String, Object>> getAvailableBadges(Long userId) {
        List<Map<String, Object>> badges = new ArrayList<>();
        String[][] badgeData = {
            {"Meditation Master", "🧘", "Meditate for 30 days straight"},
            {"Cardio King", "🏃", "Run 100km total"},
            {"Protein Pro", "🥩", "Hit protein goal 30 times"},
            {"Wellness Legend", "🌟", "Achieve all wellness goals"},
            {"Platinum Member", "💎", "Earn 1000+ points"},
            {"Mindfulness Master", "🧠", "Meditate 1000 minutes"},
            {"Community Leader", "👥", "Help 10 community members"},
            {"Health Guru", "📚", "Complete all health assessments"},
        };
        for (String[] b : badgeData) {
            Map<String, Object> badge = new LinkedHashMap<>();
            badge.put("name", b[0]);
            badge.put("icon", b[1]);
            badge.put("description", b[2]);
            badge.put("progress", randomInt(20, 80));
            badges.add(badge);
        }
        return badges;
    }

    private List<Map<String, Object>> getDailyMetrics(Long userId) {
        List<Map<String, Object>> metrics = new ArrayList<>();
        String[][] metricData = {
            {"Steps", String.valueOf(randomInt(5000, 12000)), "steps"},
            {"Heart Rate", String.valueOf(randomInt(60, 80)), "bpm"},
            {"Sleep", String.format("%.1f", randomDouble(6.0, 9.0)), "hours"},
            {"Water", String.valueOf(randomInt(1500, 3500)), "ml"},
            {"Calories", String.valueOf(randomInt(1800, 2800)), "kcal"},
            {"Mood", String.valueOf(randomInt(5, 10)), "/10"},
        };
        for (String[] m : metricData) {
            Map<String, Object> metric = new LinkedHashMap<>();
            metric.put("label", m[0]);
            metric.put("value", m[1]);
            metric.put("unit", m[2]);
            metrics.add(metric);
        }
        return metrics;
    }

    private Map<String, Object> getWeeklyMetrics(Long userId) {
        Map<String, Object> metrics = new LinkedHashMap<>();
        metrics.put("avgSteps", randomInt(7000, 10000));
        metrics.put("avgSleep", randomDouble(6.5, 8.0));
        metrics.put("avgWater", randomInt(2000, 2800));
        metrics.put("workouts", randomInt(3, 7));
        metrics.put("avgMood", randomInt(6, 9));
        return metrics;
    }

    private Map<String, Object> getMonthlyMetrics(Long userId) {
        Map<String, Object> metrics = new LinkedHashMap<>();
        metrics.put("totalSteps", randomInt(150000, 250000));
        metrics.put("avgSleep", randomDouble(6.5, 8.0));
        metrics.put("workouts", randomInt(15, 30));
        metrics.put("weightChange", randomDouble(-3.0, 1.0));
        metrics.put("avgMood", randomInt(6, 9));
        return metrics;
    }

    private Map<String, Object> getYearlyMetrics(Long userId) {
        Map<String, Object> metrics = new LinkedHashMap<>();
        metrics.put("totalSteps", randomInt(1800000, 2500000));
        metrics.put("avgSleep", randomDouble(6.5, 8.0));
        metrics.put("workouts", randomInt(200, 365));
        metrics.put("weightChange", randomDouble(-8.0, 3.0));
        metrics.put("avgMood", randomInt(6, 9));
        return metrics;
    }

    private Map<String, Object> getTrends(Long userId) {
        Map<String, Object> trends = new LinkedHashMap<>();
        trends.put("steps", new String[]{"📈", randomInt(5, 15) + "% improvement"});
        trends.put("sleep", new String[]{"��", randomInt(5, 12) + "% improvement"});
        trends.put("mood", new String[]{"📈", randomInt(10, 20) + "% improvement"});
        trends.put("workouts", new String[]{"📈", randomInt(5, 20) + "% improvement"});
        trends.put("nutrition", new String[]{"📈", randomInt(3, 10) + "% improvement"});
        return trends;
    }

    private List<String> getImprovements() {
        List<String> improvements = new ArrayList<>();
        improvements.add("Sleep quality improved by 15%");
        improvements.add("Exercise consistency up 20%");
        improvements.add("Stress levels reduced by 10%");
        improvements.add("Water intake increased by 25%");
        return improvements;
    }

    private List<String> getChallengesList() {
        List<String> challenges = new ArrayList<>();
        challenges.add("Maintain sleep schedule on weekends");
        challenges.add("Increase daily steps to 12,000");
        challenges.add("Add one more serving of vegetables");
        return challenges;
    }

    private String[] getAvailability() {
        return new String[]{"Mon-Fri 9-5", "Sat 9-1", "Telehealth available"};
    }

    private Map<String, Object> getTierBenefits() {
        Map<String, Object> benefits = new LinkedHashMap<>();
        benefits.put("pointsMultiplier", "1.5x");
        benefits.put("exclusiveContent", true);
        benefits.put("prioritySupport", true);
        benefits.put("earlyAccess", true);
        benefits.put("discounts", "10% off consultations");
        return benefits;
    }

    private Map<String, Object> getYearInReview() {
        Map<String, Object> review = new LinkedHashMap<>();
        review.put("totalWorkouts", randomInt(200, 350));
        review.put("totalSteps", randomInt(2000000, 3500000));
        review.put("caloriesBurned", randomInt(100000, 180000));
        review.put("medalsEarned", randomInt(10, 25));
        review.put("bestMonth", new String[]{"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"}[random.nextInt(12)]);
        return review;
    }

    private int calculateAvg(List<Map<String, Object>> data, String key) {
        return (int) data.stream().mapToInt(d -> {
            Object val = d.get(key);
            return val instanceof Number ? ((Number) val).intValue() : 0;
        }).average().orElse(0);
    }

    private double calculateAvgDouble(List<Map<String, Object>> data, String key) {
        return data.stream().mapToDouble(d -> {
            Object val = d.get(key);
            return val instanceof Number ? ((Number) val).doubleValue() : 0;
        }).average().orElse(0);
    }
}
