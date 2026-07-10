package com.wellnessos.controller;

import com.wellnessos.service.HealthDataScheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health-data")
public class HealthDataController {

    @Autowired
    private HealthDataScheduler healthDataScheduler;

    @PostMapping("/generate-today")
    public ResponseEntity<Map<String, String>> generateTodayData() {
        healthDataScheduler.addDailyHealthData();
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Today's health data generated successfully!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/generate-range")
    public ResponseEntity<Map<String, String>> generateRangeData(
            @RequestParam int days) {
        // Generate data for the next N days
        for (int i = 0; i < days; i++) {
            healthDataScheduler.addDailyHealthData();
        }
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Generated data for " + days + " days");
        return ResponseEntity.ok(response);
    }
}
