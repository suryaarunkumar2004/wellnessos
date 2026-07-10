package com.wellnessos.controller;

import com.wellnessos.entity.HealthRecord;
import com.wellnessos.repository.HealthRecordRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/health")
@Tag(name = "Health Tracker", description = "Health tracking endpoints")
public class HealthRecordController {

    @Autowired
    private HealthRecordRepository healthRecordRepository;

    @GetMapping("/records/{userId}")
    @Operation(summary = "Get all health records for a user")
    public ResponseEntity<List<HealthRecord>> getRecords(@PathVariable Long userId) {
        return ResponseEntity.ok(healthRecordRepository.findByUserIdOrderByRecordDateDesc(userId));
    }

    @GetMapping("/records/{userId}/latest")
    @Operation(summary = "Get latest health record for a user")
    public ResponseEntity<HealthRecord> getLatestRecord(@PathVariable Long userId) {
        return healthRecordRepository.findTopByUserIdOrderByRecordDateDesc(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @PostMapping("/record")
    @Operation(summary = "Add a new health record")
    public ResponseEntity<HealthRecord> addRecord(@RequestBody HealthRecord record) {
        if (record.getRecordDate() == null) {
            record.setRecordDate(java.time.LocalDate.now());
        }
        record.setCreatedAt(LocalDateTime.now());
        record.setUpdatedAt(LocalDateTime.now());
        HealthRecord saved = healthRecordRepository.save(record);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/record/{id}")
    @Operation(summary = "Delete a health record")
    public ResponseEntity<Void> deleteRecord(@PathVariable Long id) {
        if (healthRecordRepository.existsById(id)) {
            healthRecordRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/data")
    @Operation(summary = "Get all health records (legacy)")
    public ResponseEntity<List<HealthRecord>> getAllRecords() {
        return ResponseEntity.ok(healthRecordRepository.findAll());
    }

    @GetMapping("/data/{id}")
    @Operation(summary = "Get health record by ID")
    public ResponseEntity<HealthRecord> getRecordById(@PathVariable Long id) {
        return healthRecordRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/data")
    @Operation(summary = "Add a new health record (legacy)")
    public ResponseEntity<HealthRecord> addRecordLegacy(@RequestBody HealthRecord record) {
        if (record.getRecordDate() == null) {
            record.setRecordDate(java.time.LocalDate.now());
        }
        record.setCreatedAt(LocalDateTime.now());
        record.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(healthRecordRepository.save(record));
    }

    @DeleteMapping("/data/{id}")
    @Operation(summary = "Delete a health record (legacy)")
    public ResponseEntity<Void> deleteRecordLegacy(@PathVariable Long id) {
        if (healthRecordRepository.existsById(id)) {
            healthRecordRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
