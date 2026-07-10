package com.wellnessos.service;

import com.wellnessos.entity.Medication;
import com.wellnessos.entity.User;
import com.wellnessos.entity.UserSettings;
import com.wellnessos.repository.MedicationRepository;
import com.wellnessos.repository.UserRepository;
import com.wellnessos.repository.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class MedicationReminderScheduler {

    @Autowired
    private MedicationRepository medicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    @Autowired
    private EmailService emailService;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("MMMM dd, yyyy");

    // ============ SEND MEDICATION REMINDER ============
    public void sendMedicationReminder(Long medicationId) {
        try {
            Medication medication = medicationRepository.findById(medicationId).orElse(null);
            if (medication == null) return;

            User user = userRepository.findById(medication.getUserId()).orElse(null);
            if (user == null) return;

            // Check if medication reminders are enabled
            if (!isNotificationTypeEnabled(user.getId(), "medications")) {
                System.out.println("🔕 Medication reminders disabled for user: " + user.getEmail());
                return;
            }

            // Check if user has email enabled and DND
            if (!canSendEmail(user.getId())) {
                System.out.println("📧 Email/DND blocked for user: " + user.getEmail());
                return;
            }

            String formattedDate = LocalDate.now().format(DATE_FORMATTER);
            String medicationName = medication.getName() != null ? medication.getName() : "Medication";
            String dosage = medication.getDosage() != null ? medication.getDosage() : "";
            String frequency = medication.getFrequency() != null ? medication.getFrequency() : "daily";

            String subject = "💊 Medication Reminder - WellnessOS";
            String body = String.format("""
                Dear %s,

                Reminder: Please take your medication.

                💊 Medication: %s
                📊 Dosage: %s
                🔄 Frequency: %s
                📅 Date: %s

                Stay healthy and take care!

                Best regards,
                WellnessOS Team
                """, user.getName(), medicationName, dosage, frequency, formattedDate);

            emailService.sendNotificationEmail(user.getEmail(), subject, body);

            System.out.println("✅ Medication reminder sent to: " + user.getEmail());

        } catch (Exception e) {
            System.err.println("❌ Failed to send medication reminder: " + e.getMessage());
        }
    }

    // ============ SCHEDULED TASK: Send medication reminders daily at 8:00 AM ============
    @Scheduled(cron = "0 0 8 * * ?")
    public void sendDailyMedicationReminders() {
        System.out.println("⏰ Running daily medication reminder scheduler...");

        List<Medication> medications = medicationRepository.findAllActive();
        int sentCount = 0;

        for (Medication medication : medications) {
            // Check if medication is active and today is a scheduled day
            if (isMedicationScheduledToday(medication)) {
                sendMedicationReminder(medication.getId());
                sentCount++;
            }
        }

        System.out.println("✅ Sent " + sentCount + " medication reminders");
    }

    // ============ SCHEDULED TASK: Send medication reminders at 8:00 PM (evening dose) ============
    @Scheduled(cron = "0 0 20 * * ?")
    public void sendEveningMedicationReminders() {
        System.out.println("⏰ Running evening medication reminder scheduler...");

        List<Medication> medications = medicationRepository.findAllActive();
        int sentCount = 0;

        for (Medication medication : medications) {
            // Only send evening reminders for medications with evening frequency
            if (isEveningMedication(medication)) {
                sendMedicationReminder(medication.getId());
                sentCount++;
            }
        }

        System.out.println("✅ Sent " + sentCount + " evening medication reminders");
    }

    // ============ HELPER: Check if medication is scheduled today ============
    private boolean isMedicationScheduledToday(Medication medication) {
        if (medication == null) return false;

        String frequency = medication.getFrequency();
        if (frequency == null) return true;

        String lower = frequency.toLowerCase();
        if (lower.contains("daily") || lower.contains("every day")) {
            return true;
        }

        if (lower.contains("weekly")) {
            // Check if today is the scheduled day
            String scheduledDay = medication.getScheduledDay();
            if (scheduledDay != null) {
                String today = LocalDate.now().getDayOfWeek().toString();
                return today.equalsIgnoreCase(scheduledDay);
            }
        }

        if (lower.contains("monthly")) {
            // Check if today is the scheduled date
            Integer scheduledDate = medication.getScheduledDate();
            if (scheduledDate != null) {
                return LocalDate.now().getDayOfMonth() == scheduledDate;
            }
        }

        return true; // Default to true
    }

    // ============ HELPER: Check if evening medication ============
    private boolean isEveningMedication(Medication medication) {
        if (medication == null) return false;

        String timeOfDay = medication.getTimeOfDay();
        if (timeOfDay == null) return false;

        String lower = timeOfDay.toLowerCase();
        return lower.contains("evening") || lower.contains("night") || lower.contains("pm");
    }

    // ============ HELPER: Check if user can send email ============
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

    // ============ HELPER: Check if notification type is enabled ============
    private boolean isNotificationTypeEnabled(Long userId, String type) {
        try {
            UserSettings settings = userSettingsRepository.findByUserId(userId).orElse(null);
            if (settings == null) return true;

            switch (type) {
                case "medications":
                    return settings.getNotifMedications() != null ? settings.getNotifMedications() : true;
                case "appointments":
                    return settings.getNotifAppointments() != null ? settings.getNotifAppointments() : true;
                case "lab_results":
                    return settings.getNotifLabResults() != null ? settings.getNotifLabResults() : false;
                case "health_tips":
                    return settings.getNotifHealthTips() != null ? settings.getNotifHealthTips() : true;
                default:
                    return true;
            }
        } catch (Exception e) {
            return true;
        }
    }

    // ============ HELPER: Check quiet hours ============
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
