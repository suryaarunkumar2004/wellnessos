package com.wellnessos.controller;

import com.wellnessos.entity.MedicalPassport;
import com.wellnessos.repository.MedicalPassportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/medical-passport")
@CrossOrigin(origins = "*")
public class MedicalPassportController {

    @Autowired
    private MedicalPassportRepository medicalPassportRepository;

    // ============================================================
    // 1. GET MEDICAL PASSPORT BY USER ID
    // ============================================================
    @GetMapping("/{userId}")
    public ResponseEntity<?> getMedicalPassport(@PathVariable Long userId) {
        try {
            MedicalPassport passport = medicalPassportRepository.findByUserId(userId)
                .orElse(null);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", passport);
            response.put("exists", passport != null);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 2. CREATE OR UPDATE MEDICAL PASSPORT
    // ============================================================
    @PostMapping("/{userId}")
    public ResponseEntity<?> createOrUpdateMedicalPassport(
            @PathVariable Long userId, 
            @RequestBody Map<String, Object> request) {
        try {
            MedicalPassport passport = medicalPassportRepository.findByUserId(userId)
                .orElse(new MedicalPassport());
            
            passport.setUserId(userId);
            
            // Personal Medical Information
            if (request.containsKey("bloodType")) {
                passport.setBloodType((String) request.get("bloodType"));
            }
            if (request.containsKey("allergies")) {
                passport.setAllergies((String) request.get("allergies"));
            }
            if (request.containsKey("chronicConditions")) {
                passport.setChronicConditions((String) request.get("chronicConditions"));
            }
            if (request.containsKey("surgeries")) {
                passport.setSurgeries((String) request.get("surgeries"));
            }
            
            // Healthcare Provider Information
            if (request.containsKey("primaryPhysician")) {
                passport.setPrimaryPhysician((String) request.get("primaryPhysician"));
            }
            if (request.containsKey("insuranceProvider")) {
                passport.setInsuranceProvider((String) request.get("insuranceProvider"));
            }
            if (request.containsKey("subscriberId")) {
                passport.setSubscriberId((String) request.get("subscriberId"));
            }
            
            // Emergency Contact Information
            if (request.containsKey("emergencyName")) {
                passport.setEmergencyName((String) request.get("emergencyName"));
            }
            if (request.containsKey("emergencyRelation")) {
                passport.setEmergencyRelation((String) request.get("emergencyRelation"));
            }
            if (request.containsKey("emergencyPhone")) {
                passport.setEmergencyPhone((String) request.get("emergencyPhone"));
            }
            
            // Organ Donor Status
            if (request.containsKey("organDonor")) {
                passport.setOrganDonor((Boolean) request.get("organDonor"));
            }
            
            MedicalPassport saved = medicalPassportRepository.save(passport);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Medical passport saved successfully");
            response.put("data", saved);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 3. UPDATE SPECIFIC FIELDS (PATCH)
    // ============================================================
    @PatchMapping("/{userId}")
    public ResponseEntity<?> updateMedicalPassportFields(
            @PathVariable Long userId,
            @RequestBody Map<String, Object> request) {
        try {
            MedicalPassport passport = medicalPassportRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Medical passport not found"));
            
            // Only update fields that are present in the request
            if (request.containsKey("bloodType")) {
                passport.setBloodType((String) request.get("bloodType"));
            }
            if (request.containsKey("allergies")) {
                passport.setAllergies((String) request.get("allergies"));
            }
            if (request.containsKey("chronicConditions")) {
                passport.setChronicConditions((String) request.get("chronicConditions"));
            }
            if (request.containsKey("surgeries")) {
                passport.setSurgeries((String) request.get("surgeries"));
            }
            if (request.containsKey("primaryPhysician")) {
                passport.setPrimaryPhysician((String) request.get("primaryPhysician"));
            }
            if (request.containsKey("insuranceProvider")) {
                passport.setInsuranceProvider((String) request.get("insuranceProvider"));
            }
            if (request.containsKey("subscriberId")) {
                passport.setSubscriberId((String) request.get("subscriberId"));
            }
            if (request.containsKey("emergencyName")) {
                passport.setEmergencyName((String) request.get("emergencyName"));
            }
            if (request.containsKey("emergencyRelation")) {
                passport.setEmergencyRelation((String) request.get("emergencyRelation"));
            }
            if (request.containsKey("emergencyPhone")) {
                passport.setEmergencyPhone((String) request.get("emergencyPhone"));
            }
            if (request.containsKey("organDonor")) {
                passport.setOrganDonor((Boolean) request.get("organDonor"));
            }
            
            MedicalPassport saved = medicalPassportRepository.save(passport);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Medical passport updated successfully");
            response.put("data", saved);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 4. DELETE MEDICAL PASSPORT
    // ============================================================
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteMedicalPassport(@PathVariable Long userId) {
        try {
            if (!medicalPassportRepository.existsByUserId(userId)) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("error", "Medical passport not found");
                return ResponseEntity.badRequest().body(error);
            }
            
            medicalPassportRepository.deleteByUserId(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Medical passport deleted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 5. CHECK IF USER HAS MEDICAL PASSPORT
    // ============================================================
    @GetMapping("/{userId}/exists")
    public ResponseEntity<?> checkExists(@PathVariable Long userId) {
        try {
            boolean exists = medicalPassportRepository.existsByUserId(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("exists", exists);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 6. GET ORGAN DONOR STATUS
    // ============================================================
    @GetMapping("/{userId}/organ-donor")
    public ResponseEntity<?> getOrganDonorStatus(@PathVariable Long userId) {
        try {
            Boolean isOrganDonor = medicalPassportRepository.getOrganDonorStatus(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("isOrganDonor", isOrganDonor != null && isOrganDonor);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ============================================================
    // 7. GET TOTAL ORGAN DONORS COUNT
    // ============================================================
    @GetMapping("/organ-donors/count")
    public ResponseEntity<?> getOrganDonorsCount() {
        try {
            Long count = medicalPassportRepository.countOrganDonors();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("count", count != null ? count : 0);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
