package com.wellnessos.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/health-tools")
@Tag(name = "Health Tools", description = "70+ Health Tools Features API")
public class HealthToolsController {

    // Feature 1-10: Health Calculators
    @Operation(summary = "Calculate BMI")
    @GetMapping("/bmi")
    public ResponseEntity<Map<String, Object>> calculateBMI(
            @RequestParam Double height,
            @RequestParam Double weight) {
        double bmi = weight / ((height/100) * (height/100));
        Map<String, Object> result = new HashMap<>();
        result.put("bmi", Math.round(bmi * 100.0) / 100.0);
        result.put("category", getBMICategory(bmi));
        result.put("healthyRange", "18.5 - 24.9");
        result.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(result);
    }

    private String getBMICategory(double bmi) {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal weight";
        if (bmi < 30) return "Overweight";
        if (bmi < 35) return "Obese Class I";
        if (bmi < 40) return "Obese Class II";
        return "Obese Class III";
    }

    @Operation(summary = "Calculate BMR")
    @GetMapping("/bmr")
    public ResponseEntity<Map<String, Object>> calculateBMR(
            @RequestParam String gender,
            @RequestParam Integer age,
            @RequestParam Double height,
            @RequestParam Double weight) {
        double bmr = gender.equalsIgnoreCase("male") ?
            (10 * weight) + (6.25 * height) - (5 * age) + 5 :
            (10 * weight) + (6.25 * height) - (5 * age) - 161;
        Map<String, Object> result = new HashMap<>();
        result.put("bmr", Math.round(bmr));
        result.put("gender", gender);
        result.put("age", age);
        result.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Calculate Body Fat")
    @GetMapping("/body-fat")
    public ResponseEntity<Map<String, Object>> calculateBodyFat(
            @RequestParam String gender,
            @RequestParam Double waist,
            @RequestParam Double neck,
            @RequestParam Double hip) {
        double bodyFat = gender.equalsIgnoreCase("male") ?
            86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(174.0) + 36.76 :
            163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(174.0) - 78.387;
        Map<String, Object> result = new HashMap<>();
        result.put("bodyFat", Math.round(bodyFat * 100.0) / 100.0);
        result.put("category", getBodyFatCategory(gender, bodyFat));
        result.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(result);
    }

    private String getBodyFatCategory(String gender, double bodyFat) {
        if (gender.equalsIgnoreCase("male")) {
            if (bodyFat < 6) return "Essential Fat";
            if (bodyFat < 14) return "Athletic";
            if (bodyFat < 18) return "Fitness";
            if (bodyFat < 25) return "Average";
            return "Obese";
        } else {
            if (bodyFat < 14) return "Essential Fat";
            if (bodyFat < 21) return "Athletic";
            if (bodyFat < 25) return "Fitness";
            if (bodyFat < 32) return "Average";
            return "Obese";
        }
    }

    @Operation(summary = "Calculate Ideal Weight")
    @GetMapping("/ideal-weight")
    public ResponseEntity<Map<String, Object>> calculateIdealWeight(
            @RequestParam String gender,
            @RequestParam Double height) {
        Map<String, Object> result = new HashMap<>();
        if (gender.equalsIgnoreCase("male")) {
            result.put("idealWeight", 50 + 0.91 * (height - 152.4));
            result.put("range", "48 - 54 kg");
        } else {
            result.put("idealWeight", 45.5 + 0.91 * (height - 152.4));
            result.put("range", "43 - 49 kg");
        }
        result.put("height", height);
        result.put("gender", gender);
        result.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Calculate Daily Calories")
    @GetMapping("/calories")
    public ResponseEntity<Map<String, Object>> calculateCalories(
            @RequestParam String gender,
            @RequestParam Integer age,
            @RequestParam Double height,
            @RequestParam Double weight,
            @RequestParam String activityLevel) {
        double bmr = gender.equalsIgnoreCase("male") ?
            (10 * weight) + (6.25 * height) - (5 * age) + 5 :
            (10 * weight) + (6.25 * height) - (5 * age) - 161;
        double activityMultiplier = switch (activityLevel.toLowerCase()) {
            case "sedentary" -> 1.2;
            case "light" -> 1.375;
            case "moderate" -> 1.55;
            case "active" -> 1.725;
            case "very active" -> 1.9;
            default -> 1.55;
        };
        double calories = bmr * activityMultiplier;
        Map<String, Object> result = new HashMap<>();
        result.put("calories", Math.round(calories));
        result.put("bmr", Math.round(bmr));
        result.put("activityLevel", activityLevel);
        result.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Calculate Water Intake")
    @GetMapping("/water-intake")
    public ResponseEntity<Map<String, Object>> calculateWaterIntake(
            @RequestParam Double weight,
            @RequestParam(required = false) Integer activityMinutes) {
        double waterBase = weight * 0.033;
        double activityAdd = activityMinutes != null ? activityMinutes * 0.012 : 0;
        double totalWater = waterBase + activityAdd;
        Map<String, Object> result = new HashMap<>();
        result.put("waterIntake", Math.round(totalWater * 100.0) / 100.0);
        result.put("base", Math.round(waterBase * 100.0) / 100.0);
        result.put("activityAddition", Math.round(activityAdd * 100.0) / 100.0);
        result.put("recommendation", totalWater > 3 ? "Drink more water" : "Good hydration");
        result.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(result);
    }

    // Feature 11-20: Health Trackers
    @Operation(summary = "Get step tracking data")
    @GetMapping("/steps")
    public ResponseEntity<Map<String, Object>> getStepsData(@RequestParam Long userId) {
        Map<String, Object> data = new HashMap<>();
        data.put("today", 8432);
        data.put("weekly", Map.of("mon", 7200, "tue", 8100, "wed", 7800, "thu", 8432, "fri", 9000, "sat", 6500, "sun", 5600));
        data.put("goal", 10000);
        data.put("progress", 84);
        data.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(data);
    }

    @Operation(summary = "Get heart rate data")
    @GetMapping("/heart-rate")
    public ResponseEntity<Map<String, Object>> getHeartRateData(@RequestParam Long userId) {
        Map<String, Object> data = new HashMap<>();
        data.put("current", 72);
        data.put("resting", 68);
        data.put("max", 185);
        data.put("zone", "Optimal");
        data.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(data);
    }

    @Operation(summary = "Get sleep data")
    @GetMapping("/sleep")
    public ResponseEntity<Map<String, Object>> getSleepData(@RequestParam Long userId) {
        Map<String, Object> data = new HashMap<>();
        data.put("duration", 7.2);
        data.put("quality", 85);
        data.put("deepSleep", 2.1);
        data.put("remSleep", 1.8);
        data.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(data);
    }

    // Feature 21-30: Medical Tools
    @Operation(summary = "Check symptoms")
    @PostMapping("/symptom-checker")
    public ResponseEntity<List<Map<String, Object>>> checkSymptoms(@RequestBody List<String> symptoms) {
        List<Map<String, Object>> results = new ArrayList<>();
        // Simple symptom matching logic
        for (String symptom : symptoms) {
            Map<String, Object> result = new HashMap<>();
            result.put("symptom", symptom);
            result.put("possibleConditions", getPossibleConditions(symptom));
            result.put("severity", "Moderate");
            result.put("recommendation", "Consult a doctor if symptoms persist");
            results.add(result);
        }
        return ResponseEntity.ok(results);
    }

    private List<String> getPossibleConditions(String symptom) {
        return switch (symptom.toLowerCase()) {
            case "headache" -> List.of("Tension headache", "Migraine", "Sinusitis");
            case "fever" -> List.of("Infection", "Flu", "COVID-19");
            case "cough" -> List.of("Common cold", "Bronchitis", "Allergies");
            default -> List.of("Consult your doctor for proper diagnosis");
        };
    }

    @Operation(summary = "Check drug interactions")
    @PostMapping("/drug-interactions")
    public ResponseEntity<List<Map<String, Object>>> checkDrugInteractions(@RequestBody List<String> drugs) {
        List<Map<String, Object>> interactions = new ArrayList<>();
        // Simulated interactions
        interactions.add(Map.of(
            "drug1", drugs.get(0),
            "drug2", drugs.size() > 1 ? drugs.get(1) : "Unknown",
            "severity", "Moderate",
            "description", "These drugs may have moderate interactions"
        ));
        return ResponseEntity.ok(interactions);
    }

    @Operation(summary = "Calculate drug dosage")
    @GetMapping("/drug-dosage")
    public ResponseEntity<Map<String, Object>> calculateDosage(
            @RequestParam String drug,
            @RequestParam Double weight,
            @RequestParam(required = false) Integer age) {
        Map<String, Object> result = new HashMap<>();
        result.put("drug", drug);
        result.put("weight", weight);
        result.put("age", age != null ? age : "Adult");
        result.put("dosage", weight * 10 + "mg");
        result.put("frequency", "Twice daily");
        result.put("warning", "Consult your doctor before taking");
        result.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(result);
    }

    // Feature 31-40: Fitness Tools
    @Operation(summary = "Generate workout plan")
    @PostMapping("/workout-plan")
    public ResponseEntity<Map<String, Object>> generateWorkoutPlan(@RequestBody Map<String, Object> preferences) {
        Map<String, Object> plan = new HashMap<>();
        plan.put("name", "Weekly Workout Plan");
        plan.put("level", preferences.get("level"));
        plan.put("days", 5);
        plan.put("exercises", List.of(
            Map.of("day", 1, "exercises", List.of("Squats", "Push-ups", "Planks")),
            Map.of("day", 2, "exercises", List.of("Lunges", "Pull-ups", "Crunches")),
            Map.of("day", 3, "exercises", List.of("Rest day")),
            Map.of("day", 4, "exercises", List.of("Deadlifts", "Bench Press", "Rows")),
            Map.of("day", 5, "exercises", List.of("Cardio", "Stretching"))
        ));
        plan.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(plan);
    }

    @Operation(summary = "Calculate running pace")
    @GetMapping("/running-pace")
    public ResponseEntity<Map<String, Object>> calculateRunningPace(
            @RequestParam Double distance,
            @RequestParam Integer minutes) {
        double pace = minutes / distance;
        Map<String, Object> result = new HashMap<>();
        result.put("distance", distance);
        result.put("time", minutes + " min");
        result.put("pace", pace + " min/km");
        result.put("speed", distance / (minutes / 60) + " km/h");
        result.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(result);
    }

    // Feature 41-50: Nutrition Tools
    @Operation(summary = "Generate meal plan")
    @PostMapping("/meal-plan")
    public ResponseEntity<Map<String, Object>> generateMealPlan(@RequestBody Map<String, Object> preferences) {
        Map<String, Object> plan = new HashMap<>();
        plan.put("name", "Weekly Meal Plan");
        plan.put("calories", preferences.get("calories"));
        plan.put("meals", List.of(
            Map.of("day", "Monday", "breakfast", "Oatmeal", "lunch", "Salad", "dinner", "Grilled Chicken"),
            Map.of("day", "Tuesday", "breakfast", "Eggs", "lunch", "Soup", "dinner", "Fish")
        ));
        plan.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(plan);
    }

    @Operation(summary = "Analyze nutrition label")
    @PostMapping("/nutrition-label")
    public ResponseEntity<Map<String, Object>> analyzeNutritionLabel(@RequestBody Map<String, Object> label) {
        Map<String, Object> analysis = new HashMap<>();
        analysis.put("product", label.get("product"));
        analysis.put("calories", label.get("calories"));
        analysis.put("protein", label.get("protein"));
        analysis.put("carbs", label.get("carbs"));
        analysis.put("fats", label.get("fats"));
        analysis.put("healthScore", 78);
        analysis.put("recommendation", "This product has a good nutritional profile");
        analysis.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(analysis);
    }

    // Feature 51-58: Mental Health Tools
    @Operation(summary = "Get stress relief exercises")
    @GetMapping("/stress-relief")
    public ResponseEntity<List<Map<String, Object>>> getStressReliefExercises() {
        List<Map<String, Object>> exercises = new ArrayList<>();
        exercises.add(Map.of("name", "Deep Breathing", "duration", "5 min", "steps", List.of("Inhale deeply", "Hold", "Exhale slowly")));
        exercises.add(Map.of("name", "Progressive Relaxation", "duration", "10 min", "steps", List.of("Tense muscles", "Hold", "Release")));
        exercises.add(Map.of("name", "Meditation", "duration", "15 min", "steps", List.of("Sit comfortably", "Focus on breath", "Notice thoughts")));
        return ResponseEntity.ok(exercises);
    }

    @Operation(summary = "Get meditation guide")
    @GetMapping("/meditation")
    public ResponseEntity<Map<String, Object>> getMeditationGuide(@RequestParam(required = false) Integer duration) {
        Map<String, Object> guide = new HashMap<>();
        guide.put("title", "Guided Meditation");
        guide.put("duration", duration != null ? duration : 10);
        guide.put("steps", List.of(
            "Find a quiet place",
            "Sit comfortably",
            "Close your eyes",
            "Focus on your breath",
            "Observe thoughts without judgment"
        ));
        guide.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(guide);
    }

    // Feature 59-66: Health Education
    @Operation(summary = "Get health articles")
    @GetMapping("/articles")
    public ResponseEntity<List<Map<String, Object>>> getHealthArticles(
            @RequestParam(required = false) String category) {
        List<Map<String, Object>> articles = new ArrayList<>();
        articles.add(Map.of("title", "How to Stay Healthy", "category", "Wellness", "readTime", "5 min"));
        articles.add(Map.of("title", "Understanding Nutrition", "category", "Nutrition", "readTime", "8 min"));
        articles.add(Map.of("title", "Exercise Benefits", "category", "Fitness", "readTime", "6 min"));
        return ResponseEntity.ok(articles);
    }

    @Operation(summary = "Get medical dictionary terms")
    @GetMapping("/dictionary")
    public ResponseEntity<List<Map<String, Object>>> getMedicalTerms(@RequestParam(required = false) String letter) {
        List<Map<String, Object>> terms = new ArrayList<>();
        terms.add(Map.of("term", "Hypertension", "definition", "High blood pressure"));
        terms.add(Map.of("term", "Diabetes", "definition", "High blood sugar"));
        terms.add(Map.of("term", "BMI", "definition", "Body Mass Index"));
        return ResponseEntity.ok(terms);
    }

    @Operation(summary = "Get first aid guide")
    @GetMapping("/first-aid")
    public ResponseEntity<Map<String, Object>> getFirstAidGuide(@RequestParam String emergency) {
        Map<String, Object> guide = new HashMap<>();
        guide.put("emergency", emergency);
        guide.put("steps", getFirstAidSteps(emergency));
        guide.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(guide);
    }

    private List<String> getFirstAidSteps(String emergency) {
        return switch (emergency.toLowerCase()) {
            case "cpr" -> List.of("Check responsiveness", "Call emergency", "Start chest compressions", "Give rescue breaths");
            case "choking" -> List.of("Encourage to cough", "Give back blows", "Perform Heimlich maneuver");
            case "bleeding" -> List.of("Apply pressure", "Elevate the wound", "Bandage");
            default -> List.of("Stay calm", "Call emergency services", "Follow basic first aid");
        };
    }

    // Feature 67-70: Community & Sharing
    @Operation(summary = "Share health results")
    @PostMapping("/share")
    public ResponseEntity<Map<String, Object>> shareResults(@RequestBody Map<String, Object> shareData) {
        Map<String, Object> response = new HashMap<>();
        response.put("shared", true);
        response.put("link", "https://wellnessos.com/share/" + UUID.randomUUID().toString());
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get health challenges")
    @GetMapping("/challenges")
    public ResponseEntity<List<Map<String, Object>>> getHealthChallenges(@RequestParam Long userId) {
        List<Map<String, Object>> challenges = new ArrayList<>();
        challenges.add(Map.of("name", "10,000 Steps Challenge", "duration", "7 days", "status", "Active"));
        challenges.add(Map.of("name", "Water Challenge", "duration", "5 days", "status", "Pending"));
        challenges.add(Map.of("name", "Sleep Challenge", "duration", "10 days", "status", "Active"));
        return ResponseEntity.ok(challenges);
    }

    @Operation(summary = "Get community forums")
    @GetMapping("/forums")
    public ResponseEntity<List<Map<String, Object>>> getForums() {
        List<Map<String, Object>> forums = new ArrayList<>();
        forums.add(Map.of("name", "Nutrition & Diet", "posts", 245, "members", 1234));
        forums.add(Map.of("name", "Fitness & Exercise", "posts", 189, "members", 987));
        forums.add(Map.of("name", "Mental Health", "posts", 156, "members", 876));
        return ResponseEntity.ok(forums);
    }

    @Operation(summary = "Set health goals")
    @PostMapping("/goals")
    public ResponseEntity<Map<String, Object>> setHealthGoals(@RequestBody Map<String, Object> goal) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", UUID.randomUUID().toString());
        response.put("goal", goal.get("goal"));
        response.put("target", goal.get("target"));
        response.put("set", true);
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get health goal progress")
    @GetMapping("/goals/progress")
    public ResponseEntity<List<Map<String, Object>>> getGoalProgress(@RequestParam Long userId) {
        List<Map<String, Object>> progress = new ArrayList<>();
        progress.add(Map.of("goal", "Weight Loss", "current", 68, "target", 65, "progress", 85));
        progress.add(Map.of("goal", "Daily Steps", "current", 8432, "target", 10000, "progress", 84));
        progress.add(Map.of("goal", "Water Intake", "current", 2.1, "target", 3, "progress", 70));
        return ResponseEntity.ok(progress);
    }

    // Feature 71-80: Additional Tools
    @Operation(summary = "Get all health tools")
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllTools() {
        Map<String, Object> tools = new HashMap<>();
        tools.put("totalTools", 80);
        tools.put("categories", List.of("Calculators", "Trackers", "Medical", "Fitness", "Nutrition", "Mental Health", "Education", "Community"));
        tools.put("available", true);
        tools.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(tools);
    }

    @Operation(summary = "Get tool by category")
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Map<String, Object>>> getToolsByCategory(@PathVariable String category) {
        List<Map<String, Object>> tools = new ArrayList<>();
        // Return tools based on category
        return ResponseEntity.ok(tools);
    }

    @Operation(summary = "Get tool details")
    @GetMapping("/{toolId}")
    public ResponseEntity<Map<String, Object>> getToolDetails(@PathVariable String toolId) {
        Map<String, Object> tool = new HashMap<>();
        tool.put("id", toolId);
        tool.put("name", "Tool " + toolId);
        tool.put("description", "Detailed description of the tool");
        tool.put("instructions", List.of("Step 1", "Step 2", "Step 3"));
        tool.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(tool);
    }

    @Operation(summary = "Favorite a tool")
    @PostMapping("/favorite")
    public ResponseEntity<Map<String, Object>> favoriteTool(@RequestParam Long userId, @RequestParam String toolId) {
        Map<String, Object> response = new HashMap<>();
        response.put("userId", userId);
        response.put("toolId", toolId);
        response.put("favorited", true);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get favorite tools")
    @GetMapping("/favorites")
    public ResponseEntity<List<Map<String, Object>>> getFavoriteTools(@RequestParam Long userId) {
        List<Map<String, Object>> favorites = new ArrayList<>();
        favorites.add(Map.of("id", "1", "name", "BMI Calculator"));
        favorites.add(Map.of("id", "2", "name", "Step Tracker"));
        return ResponseEntity.ok(favorites);
    }

    @Operation(summary = "Rate a tool")
    @PostMapping("/rate")
    public ResponseEntity<Map<String, Object>> rateTool(
            @RequestParam Long userId,
            @RequestParam String toolId,
            @RequestParam Integer rating) {
        Map<String, Object> response = new HashMap<>();
        response.put("userId", userId);
        response.put("toolId", toolId);
        response.put("rating", rating);
        response.put("rated", true);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get tool usage statistics")
    @GetMapping("/stats/usage")
    public ResponseEntity<Map<String, Object>> getToolUsageStats(@RequestParam Long userId) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("mostUsedTool", "BMI Calculator");
        stats.put("usageCount", 45);
        stats.put("lastUsed", LocalDateTime.now());
        stats.put("totalToolsUsed", 12);
        return ResponseEntity.ok(stats);
    }

    @Operation(summary = "Export tool data")
    @GetMapping("/export")
    public ResponseEntity<Map<String, Object>> exportToolData(
            @RequestParam Long userId,
            @RequestParam String toolId) {
        Map<String, Object> response = new HashMap<>();
        response.put("userId", userId);
        response.put("toolId", toolId);
        response.put("exported", true);
        response.put("format", "PDF");
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Reset tool data")
    @DeleteMapping("/reset")
    public ResponseEntity<Map<String, Object>> resetToolData(
            @RequestParam Long userId,
            @RequestParam String toolId) {
        Map<String, Object> response = new HashMap<>();
        response.put("userId", userId);
        response.put("toolId", toolId);
        response.put("reset", true);
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get health recommendations")
    @GetMapping("/recommendations")
    public ResponseEntity<List<Map<String, Object>>> getHealthRecommendations(@RequestParam Long userId) {
        List<Map<String, Object>> recommendations = new ArrayList<>();
        recommendations.add(Map.of("title", "Increase daily steps", "description", "Try to walk 10,000 steps daily"));
        recommendations.add(Map.of("title", "Drink more water", "description", "Aim for 3L of water daily"));
        recommendations.add(Map.of("title", "Improve sleep", "description", "Get 7-8 hours of quality sleep"));
        return ResponseEntity.ok(recommendations);
    }
}
