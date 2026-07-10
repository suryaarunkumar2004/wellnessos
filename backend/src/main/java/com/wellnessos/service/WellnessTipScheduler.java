package com.wellnessos.service;

import com.wellnessos.entity.User;
import com.wellnessos.entity.UserSettings;
import com.wellnessos.repository.UserRepository;
import com.wellnessos.repository.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class WellnessTipScheduler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    @Autowired
    private EmailService emailService;

    private final Random random = new Random();

    // Collection of wellness tips
    private static final String[] WELLNESS_TIPS = {
        "💧 Drink at least 8 glasses of water today. Hydration is key to good health!",
        "🚶 Take a 15-minute walk after lunch. It helps with digestion and mental clarity.",
        "😴 Aim for 7-8 hours of quality sleep tonight. Your body will thank you.",
        "🧘 Practice deep breathing for 5 minutes. Inhale for 4, hold for 7, exhale for 8.",
        "�� Include a serving of fresh fruit with every meal. Nature's candy!",
        "🏋️ Stretch your body for 10 minutes every morning. It boosts circulation.",
        "📝 Write down 3 things you're grateful for today. Gratitude improves mental health.",
        "🧠 Challenge your brain with a puzzle or new skill today. Keep your mind sharp.",
        "🥗 Eat a rainbow of vegetables daily. Each color provides different nutrients.",
        "💪 Strength training twice a week builds muscle and bone density.",
        "🧴 Apply sunscreen daily. Protect your skin from harmful UV rays.",
        "👀 Give your eyes a break from screens every 20 minutes. Look at something 20 feet away.",
        "🦷 Floss daily. Gum health is linked to heart health.",
        "🧠 Meditate for 5-10 minutes. It reduces stress and improves focus.",
        "🏃 Cardio exercise 3 times a week. It's good for your heart and lungs.",
        "🍵 Drink green tea. It's rich in antioxidants and boosts metabolism.",
        "🛌 Keep a consistent sleep schedule. Your body loves routine.",
        "🌿 Spend time in nature. It lowers stress and improves mood.",
        "🎵 Listen to calming music. It reduces anxiety and promotes relaxation.",
        "💬 Connect with a friend or family member. Social connection is vital for health."
    };

    // ============ SEND WELLNESS TIP ============
    public void sendWellnessTip(Long userId) {
        try {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) return;

            // Check if wellness tips are enabled
            if (!isNotificationTypeEnabled(userId, "health_tips")) {
                System.out.println("🔕 Wellness tips disabled for user: " + user.getEmail());
                return;
            }

            // Check if user has email enabled and DND
            if (!canSendEmail(userId)) {
                System.out.println("📧 Email/DND blocked for user: " + user.getEmail());
                return;
            }

            // Select random tip
            String tip = WELLNESS_TIPS[random.nextInt(WELLNESS_TIPS.length)];

            String subject = "💚 Daily Wellness Tip - WellnessOS";
            String body = String.format("""
                Dear %s,

                Here is your daily wellness tip to help you stay healthy and happy!

                🌟 %s

                Remember, small steps lead to big changes. Keep up the great work!

                Best regards,
                WellnessOS Team
                """, user.getName(), tip);

            emailService.sendNotificationEmail(user.getEmail(), subject, body);

            System.out.println("✅ Wellness tip sent to: " + user.getEmail());

        } catch (Exception e) {
            System.err.println("❌ Failed to send wellness tip: " + e.getMessage());
        }
    }

    // ============ SCHEDULED TASK: Send wellness tips daily at 10:00 AM ============
    @Scheduled(cron = "0 0 10 * * ?")
    public void sendDailyWellnessTips() {
        System.out.println("⏰ Running daily wellness tip scheduler...");

        List<User> users = userRepository.findAll();
        int sentCount = 0;

        for (User user : users) {
            sendWellnessTip(user.getId());
            sentCount++;
        }

        System.out.println("✅ Sent " + sentCount + " wellness tips");
    }

    // ============ SCHEDULED TASK: Send wellness tips on Monday/Wednesday/Friday at 10:00 AM ============
    @Scheduled(cron = "0 0 10 * * MON,WED,FRI")
    public void sendWellnessTipsMWF() {
        System.out.println("⏰ Running MWF wellness tip scheduler...");
        sendDailyWellnessTips();
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
                case "health_tips":
                    return settings.getNotifHealthTips() != null ? settings.getNotifHealthTips() : true;
                case "appointments":
                    return settings.getNotifAppointments() != null ? settings.getNotifAppointments() : true;
                case "medications":
                    return settings.getNotifMedications() != null ? settings.getNotifMedications() : true;
                case "lab_results":
                    return settings.getNotifLabResults() != null ? settings.getNotifLabResults() : false;
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
