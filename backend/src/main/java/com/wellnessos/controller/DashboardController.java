package com.wellnessos.controller;

import com.wellnessos.dto.DashboardData;
import com.wellnessos.service.dashboard.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@Tag(name = "Dashboard", description = "Dashboard Features API")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/data/{userId}")
    @Operation(summary = "Get dashboard data")
    public ResponseEntity<DashboardData> getDashboardData(@PathVariable Long userId) {
        DashboardData data = dashboardService.getDashboardData(userId);
        return ResponseEntity.ok(data);
    }

    /**
     * NEW: /api/dashboard/summary?userId=1
     * Returns a premium summary with metrics array, health score, streak, etc.
     * Called by the new DashboardTab.jsx frontend.
     */
    @GetMapping("/summary")
    @Operation(summary = "Get premium dashboard summary for a user")
    public ResponseEntity<Map<String, Object>> getDashboardSummary(
            @RequestParam(defaultValue = "1") Long userId) {

        Map<String, Object> summary = new LinkedHashMap<>();

        // Core vitals metrics
        List<Map<String, Object>> metrics = new ArrayList<>();
        Object[][] metricData = {
            {1, "Steps",          8432,  10000, "",     "#059669"},
            {2, "Water (L)",      2.1,   3.0,   "L",    "#3b82f6"},
            {3, "Sleep (hrs)",    7.2,   8.0,   "h",    "#8b5cf6"},
            {4, "Heart Rate",     72,    75,    "bpm",  "#ef4444"},
            {5, "Active (mins)",  72,    90,    "min",  "#f59e0b"},
            {6, "Calories Burned",2450,  2800,  "kcal", "#f97316"}
        };
        for (Object[] md : metricData) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id",     md[0]);
            m.put("label",  md[1]);
            m.put("value",  md[2]);
            m.put("target", md[3]);
            m.put("unit",   md[4]);
            m.put("color",  md[5]);
            metrics.add(m);
        }
        summary.put("metrics", metrics);

        // Aggregate stats
        summary.put("healthScore",       84);
        summary.put("streak",            7);
        summary.put("goalsMet",          4);
        summary.put("medsTaken",         2);
        summary.put("medsTotal",         4);
        summary.put("upcomingAppointments", 3);
        summary.put("userId",            userId);
        summary.put("generatedAt",       new Date());

        return ResponseEntity.ok(summary);
    }
}
