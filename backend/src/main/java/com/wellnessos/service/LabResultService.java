package com.wellnessos.service;

import com.wellnessos.entity.LabResult;
import com.wellnessos.entity.User;
import com.wellnessos.entity.UserSettings;
import com.wellnessos.repository.LabResultRepository;
import com.wellnessos.repository.UserRepository;
import com.wellnessos.repository.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class LabResultService {

    @Autowired
    private LabResultRepository labResultRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    @Autowired
    private EmailService emailService;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("MMMM dd, yyyy hh:mm a");

    // ============ SEND LAB RESULT NOTIFICATION ============
    public void sendLabResultNotification(Long labResultId) {
        try {
            LabResult labResult = labResultRepository.findById(labResultId).orElse(null);
            if (labResult == null) return;

            User user = userRepository.findById(labResult.getUserId()).orElse(null);
            if (user == null) return;

            if (!isNotificationTypeEnabled(user.getId(), "lab_results")) {
                System.out.println("🔕 Lab result notifications disabled for user: " + user.getEmail());
                return;
            }

            if (!canSendEmail(user.getId())) {
                System.out.println("📧 Email/DND blocked for user: " + user.getEmail());
                return;
            }

            String formattedDate = LocalDateTime.now().format(DATE_FORMATTER);
            String testName = labResult.getTestName() != null ? labResult.getTestName() : "Lab Test";
            String resultStatus = labResult.getStatus() != null ? labResult.getStatus() : "Completed";
            String resultValue = labResult.getResultValue() != null ? labResult.getResultValue() : "";
            String referenceRange = labResult.getReferenceRange() != null ? labResult.getReferenceRange() : "";

            String subject = "🧪 Lab Results Ready - WellnessOS";
            String body = String.format("""
                Dear %s,

                Your lab results are now available.

                🧪 Test: %s
                📊 Result: %s
                📈 Value: %s
                📋 Reference Range: %s
                📅 Date: %s
                📍 Status: %s

                Please review your results in your dashboard.
                If you have any questions, contact your healthcare provider.

                Best regards,
                WellnessOS Team
                """, user.getName(), testName, resultStatus, resultValue, referenceRange, formattedDate, resultStatus);

            emailService.sendNotificationEmail(user.getEmail(), subject, body);

            System.out.println("✅ Lab result notification sent to: " + user.getEmail());

        } catch (Exception e) {
            System.err.println("❌ Failed to send lab result notification: " + e.getMessage());
        }
    }

    // ============ BULK SEND: Notify all users with pending results ============
    public void sendPendingLabResultNotifications() {
        System.out.println("⏰ Checking for pending lab results...");

        List<LabResult> pendingResults = labResultRepository.findByStatus("Pending");
        int sentCount = 0;

        for (LabResult result : pendingResults) {
            sendLabResultNotification(result.getId());
            sentCount++;
            result.setStatus("Notified");
            labResultRepository.save(result);
        }

        System.out.println("✅ Sent " + sentCount + " lab result notifications");
    }

    private boolean canSendEmail(Long userId) {
        try {
            UserSettings settings = userSettingsRepository.findByUserId(userId).orElse(null);
            if (settings == null) return true;

            if (settings.getNotifEmail() != null && !settings.getNotifEmail()) {
                return false;
            }

            if (settings.getQuietHoursEnabled() != null && settings.getQuietHoursEnabled()) {
                if (isInQuietHours(settings)) {
                    return false;
                }
            }

            return true;
        } catch (Exception e) {
            return true;
        }
    }

    private boolean isNotificationTypeEnabled(Long userId, String type) {
        try {
            UserSettings settings = userSettingsRepository.findByUserId(userId).orElse(null);
            if (settings == null) return true;

            if (type.equals("lab_results")) {
                return settings.getNotifLabResults() != null ? settings.getNotifLabResults() : false;
            }
            return true;
        } catch (Exception e) {
            return true;
        }
    }

    private boolean isInQuietHours(UserSettings settings) {
        try {
            String start = settings.getQuietHoursStart();
            String end = settings.getQuietHoursEnd();

            if (start == null || end == null) return false;

            LocalDateTime now = LocalDateTime.now();
            int currentMinutes = now.getHour() * 60 + now.getMinute();

            String[] startParts = start.split(":");
            String[] endParts = end.split(":");

            int startTotal = Integer.parseInt(startParts[0]) * 60 + Integer.parseInt(startParts[1]);
            int endTotal = Integer.parseInt(endParts[0]) * 60 + Integer.parseInt(endParts[1]);

            if (startTotal < endTotal) {
                return currentMinutes >= startTotal && currentMinutes < endTotal;
            } else {
                return currentMinutes >= startTotal || currentMinutes < endTotal;
            }
        } catch (Exception e) {
            return false;
        }
    }
}
