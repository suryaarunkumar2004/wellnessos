package com.wellnessos.service;

import com.wellnessos.entity.Appointment;
import com.wellnessos.entity.User;
import com.wellnessos.entity.UserSettings;
import com.wellnessos.repository.AppointmentRepository;
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
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    @Autowired
    private EmailService emailService;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("MMMM dd, yyyy");

    public void sendAppointmentConfirmation(Long appointmentId) {
        try {
            Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
            if (appointment == null) return;

            User user = userRepository.findById(appointment.getUserId()).orElse(null);
            if (user == null) return;

            if (!canSendEmail(user.getId())) {
                System.out.println("�� Email notifications disabled for user: " + user.getEmail());
                return;
            }

            String formattedDate = appointment.getAppointmentDate().format(DATE_FORMATTER);
            String formattedTime = appointment.getAppointmentTime() != null ? appointment.getAppointmentTime() : "10:00 AM";

            String meetingLink = "https://wellnessos.com/video-consultation/" + appointmentId;

            emailService.sendAppointmentConfirmation(
                user.getEmail(),
                user.getName(),
                appointment.getDoctorName(),
                formattedDate,
                formattedTime,
                meetingLink
            );

            System.out.println("✅ Appointment confirmation sent to: " + user.getEmail());

        } catch (Exception e) {
            System.err.println("❌ Failed to send appointment confirmation: " + e.getMessage());
        }
    }

    public void sendAppointmentReminder(Long appointmentId) {
        try {
            Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
            if (appointment == null) return;

            User user = userRepository.findById(appointment.getUserId()).orElse(null);
            if (user == null) return;

            if (!isNotificationTypeEnabled(user.getId(), "appointments")) {
                System.out.println("🔕 Appointment reminders disabled for user: " + user.getEmail());
                return;
            }

            if (!canSendEmail(user.getId())) {
                System.out.println("📧 Email/DND blocked for user: " + user.getEmail());
                return;
            }

            String formattedDate = appointment.getAppointmentDate().format(DATE_FORMATTER);
            String formattedTime = appointment.getAppointmentTime() != null ? appointment.getAppointmentTime() : "10:00 AM";

            emailService.sendAppointmentReminder(
                user.getEmail(),
                user.getName(),
                appointment.getDoctorName(),
                formattedDate,
                formattedTime
            );

            System.out.println("✅ Appointment reminder sent to: " + user.getEmail());

        } catch (Exception e) {
            System.err.println("❌ Failed to send appointment reminder: " + e.getMessage());
        }
    }

    public void sendAppointmentCancellation(Long appointmentId) {
        try {
            Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
            if (appointment == null) return;

            User user = userRepository.findById(appointment.getUserId()).orElse(null);
            if (user == null) return;

            if (!canSendEmail(user.getId())) return;

            String formattedDate = appointment.getAppointmentDate().format(DATE_FORMATTER);
            String formattedTime = appointment.getAppointmentTime() != null ? appointment.getAppointmentTime() : "10:00 AM";

            emailService.sendAppointmentCancellation(
                user.getEmail(),
                user.getName(),
                appointment.getDoctorName(),
                formattedDate,
                formattedTime
            );

            System.out.println("✅ Appointment cancellation sent to: " + user.getEmail());

        } catch (Exception e) {
            System.err.println("❌ Failed to send appointment cancellation: " + e.getMessage());
        }
    }

    public void sendAppointmentReschedule(Long appointmentId, LocalDate oldDate, String oldTime, LocalDate newDate, String newTime) {
        try {
            Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
            if (appointment == null) return;

            User user = userRepository.findById(appointment.getUserId()).orElse(null);
            if (user == null) return;

            if (!canSendEmail(user.getId())) return;

            String formattedOldDate = oldDate.format(DATE_FORMATTER);
            String formattedNewDate = newDate.format(DATE_FORMATTER);

            emailService.sendAppointmentReschedule(
                user.getEmail(),
                user.getName(),
                appointment.getDoctorName(),
                formattedOldDate,
                oldTime,
                formattedNewDate,
                newTime
            );

            System.out.println("✅ Appointment reschedule sent to: " + user.getEmail());

        } catch (Exception e) {
            System.err.println("❌ Failed to send appointment reschedule: " + e.getMessage());
        }
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

            if (type.equals("appointments")) {
                return settings.getNotifAppointments() != null ? settings.getNotifAppointments() : true;
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

    @Scheduled(cron = "0 0 9 * * ?")
    public void sendDailyAppointmentReminders() {
        System.out.println("⏰ Running daily appointment reminder scheduler...");
        
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        List<Appointment> appointments = appointmentRepository.findByAppointmentDate(tomorrow);

        int sentCount = 0;
        for (Appointment appointment : appointments) {
            if (appointment.getStatus() != null && !appointment.getStatus().equalsIgnoreCase("cancelled")) {
                sendAppointmentReminder(appointment.getId());
                sentCount++;
            }
        }

        System.out.println("✅ Sent " + sentCount + " appointment reminders for tomorrow");
    }
}
