package com.wellnessos.controller;

import com.wellnessos.entity.User;
import com.wellnessos.entity.UserSettings;
import com.wellnessos.repository.UserRepository;
import com.wellnessos.repository.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingsController {

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ============================================================
    // 1. GET ALL SETTINGS FOR A USER
    // ============================================================
    @GetMapping("/{userId}")
    public ResponseEntity<?> getSettings(@PathVariable Long userId) {
        try {
            UserSettings settings = userSettingsRepository.findByUserId(userId)
                .orElse(null);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", settings);
            response.put("exists", settings != null);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ============================================================
    // 2. CREATE OR UPDATE SETTINGS
    // ============================================================
    @PostMapping("/{userId}")
    public ResponseEntity<?> createOrUpdateSettings(
            @PathVariable Long userId,
            @RequestBody Map<String, Object> request) {
        try {
            UserSettings settings = userSettingsRepository.findByUserId(userId)
                .orElse(new UserSettings());
            
            settings.setUserId(userId);
            
            // Security Settings
            if (request.containsKey("twoFactorEnabled")) {
                settings.setTwoFactorEnabled((Boolean) request.get("twoFactorEnabled"));
            }
            
            // Preferences
            if (request.containsKey("language")) {
                settings.setLanguage((String) request.get("language"));
            }
            if (request.containsKey("currency")) {
                settings.setCurrency((String) request.get("currency"));
            }
            if (request.containsKey("timezone")) {
                settings.setTimezone((String) request.get("timezone"));
            }
            
            // Accessibility
            if (request.containsKey("highContrast")) {
                settings.setHighContrast((Boolean) request.get("highContrast"));
            }
            if (request.containsKey("fontSize")) {
                settings.setFontSize((String) request.get("fontSize"));
            }
            if (request.containsKey("motionReduce")) {
                settings.setMotionReduce((Boolean) request.get("motionReduce"));
            }
            if (request.containsKey("voiceVolume")) {
                settings.setVoiceVolume((Integer) request.get("voiceVolume"));
            }
            
            // Notification Settings
            if (request.containsKey("notificationsEnabled")) {
                settings.setNotificationsEnabled((Boolean) request.get("notificationsEnabled"));
            }
            if (request.containsKey("notifAppointments")) {
                settings.setNotifAppointments((Boolean) request.get("notifAppointments"));
            }
            if (request.containsKey("notifMedications")) {
                settings.setNotifMedications((Boolean) request.get("notifMedications"));
            }
            if (request.containsKey("notifLabResults")) {
                settings.setNotifLabResults((Boolean) request.get("notifLabResults"));
            }
            if (request.containsKey("notifHealthTips")) {
                settings.setNotifHealthTips((Boolean) request.get("notifHealthTips"));
            }
            if (request.containsKey("notifEmail")) {
                settings.setNotifEmail((Boolean) request.get("notifEmail"));
            }
            if (request.containsKey("notifSMS")) {
                settings.setNotifSMS((Boolean) request.get("notifSMS"));
            }
            if (request.containsKey("notifPush")) {
                settings.setNotifPush((Boolean) request.get("notifPush"));
            }
            if (request.containsKey("quietHoursEnabled")) {
                settings.setQuietHoursEnabled((Boolean) request.get("quietHoursEnabled"));
            }
            if (request.containsKey("quietHoursStart")) {
                settings.setQuietHoursStart((String) request.get("quietHoursStart"));
            }
            if (request.containsKey("quietHoursEnd")) {
                settings.setQuietHoursEnd((String) request.get("quietHoursEnd"));
            }
            
            // Device Integrations
            if (request.containsKey("fitbitConnected")) {
                settings.setFitbitConnected((Boolean) request.get("fitbitConnected"));
                if ((Boolean) request.get("fitbitConnected")) {
                    settings.setFitbitLastSync(LocalDateTime.now());
                }
            }
            if (request.containsKey("garminConnected")) {
                settings.setGarminConnected((Boolean) request.get("garminConnected"));
                if ((Boolean) request.get("garminConnected")) {
                    settings.setGarminLastSync(LocalDateTime.now());
                }
            }
            if (request.containsKey("googleFitConnected")) {
                settings.setGoogleFitConnected((Boolean) request.get("googleFitConnected"));
                if ((Boolean) request.get("googleFitConnected")) {
                    settings.setGoogleFitLastSync(LocalDateTime.now());
                }
            }
            if (request.containsKey("appleHealthConnected")) {
                settings.setAppleHealthConnected((Boolean) request.get("appleHealthConnected"));
                if ((Boolean) request.get("appleHealthConnected")) {
                    settings.setAppleHealthLastSync(LocalDateTime.now());
                }
            }
            
            // General
            if (request.containsKey("silentMode")) {
                settings.setSilentMode((Boolean) request.get("silentMode"));
            }
            if (request.containsKey("calendarSync")) {
                settings.setCalendarSync((Boolean) request.get("calendarSync"));
            }
            if (request.containsKey("analyticsEnabled")) {
                settings.setAnalyticsEnabled((Boolean) request.get("analyticsEnabled"));
            }
            
            UserSettings saved = userSettingsRepository.save(settings);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Settings saved successfully");
            response.put("data", saved);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ============================================================
    // 3. UPDATE PASSWORD
    // ============================================================
    @PostMapping("/{userId}/password")
    public ResponseEntity<?> updatePassword(
            @PathVariable Long userId,
            @RequestBody Map<String, String> request) {
        try {
            String currentPassword = request.get("currentPassword");
            String newPassword = request.get("newPassword");
            
            if (currentPassword == null || newPassword == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Current and new password are required"));
            }
            
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Current password is incorrect"));
            }
            
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Password updated successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ============================================================
    // 4. TOGGLE 2FA
    // ============================================================
    @PostMapping("/{userId}/2fa")
    public ResponseEntity<?> toggleTwoFactor(
            @PathVariable Long userId,
            @RequestBody Map<String, Boolean> request) {
        try {
            Boolean enabled = request.get("enabled");
            
            UserSettings settings = userSettingsRepository.findByUserId(userId)
                .orElse(new UserSettings());
            
            settings.setUserId(userId);
            settings.setTwoFactorEnabled(enabled);
            
            userSettingsRepository.save(settings);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", enabled ? "2FA enabled successfully" : "2FA disabled successfully",
                "twoFactorEnabled", enabled
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ============================================================
    // 5. TERMINATE SESSION
    // ============================================================
    @DeleteMapping("/session/{sessionId}")
    public ResponseEntity<?> terminateSession(@PathVariable String sessionId) {
        try {
            // In a real implementation, you would invalidate the JWT token
            // For now, we just return success
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Session terminated successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ============================================================
    // 6. GET 2FA STATUS
    // ============================================================
    @GetMapping("/{userId}/2fa/status")
    public ResponseEntity<?> getTwoFactorStatus(@PathVariable Long userId) {
        try {
            Boolean enabled = userSettingsRepository.getTwoFactorStatus(userId);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "twoFactorEnabled", enabled != null ? enabled : false
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
