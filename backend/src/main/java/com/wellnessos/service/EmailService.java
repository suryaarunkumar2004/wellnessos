package com.wellnessos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    // ============ BASE EMAIL METHODS ============
    private void sendSimpleEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            System.out.println("✅ Email sent to: " + to);
        } catch (Exception e) {
            System.err.println("❌ Email failed to: " + to + " - " + e.getMessage());
        }
    }

    private void sendHtmlEmail(String to, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
            System.out.println("✅ HTML Email sent to: " + to);
        } catch (Exception e) {
            System.err.println("❌ HTML Email failed to: " + to + " - " + e.getMessage());
        }
    }

    // ============ OTP & AUTH EMAILS ============
    public void sendOtpEmail(String to, String otp, String name) {
        String subject = "WellnessOS - Your OTP Code";
        String body = String.format("""
            Hello %s,
            
            Your OTP code for WellnessOS account verification is:
            
            OTP: %s
            
            This code will expire in 5 minutes.
            
            If you didn't request this, please ignore this email.
            
            Thank you,
            WellnessOS Team
            """, name, otp);
        sendSimpleEmail(to, subject, body);
    }

    public void sendWelcomeEmail(String to, String name) {
        String subject = "Welcome to WellnessOS! 🏥";
        String htmlBody = String.format("""
            <!DOCTYPE html>
            <html>
            <head><style>
                body { font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
                .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; }
                .btn { background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; }
                .footer { text-align: center; color: #94a3b8; font-size: 0.8rem; margin-top: 20px; }
            </style></head>
            <body>
                <div class="header">
                    <h1>🏥 Welcome to WellnessOS!</h1>
                    <p>Your journey to better health starts here</p>
                </div>
                <div class="content">
                    <h2>Hello %s! 👋</h2>
                    <p>Thank you for joining WellnessOS. We're excited to help you on your health journey.</p>
                    <p style="text-align: center;">
                        <a href="https://wellnessos.com/dashboard" class="btn">Go to Dashboard</a>
                    </p>
                    <p>Need help? Reply to this email or contact us at support@wellnessos.com</p>
                </div>
                <div class="footer">© 2024 WellnessOS. All rights reserved.</div>
            </body>
            </html>
            """, name);
        sendHtmlEmail(to, subject, htmlBody);
    }

    // ============ APPOINTMENT EMAILS ============
    public void sendAppointmentConfirmation(String to, String patientName, String doctorName, String date, String time, String meetingLink) {
        String subject = "📅 Appointment Confirmed - WellnessOS";
        String htmlBody = String.format("""
            <!DOCTYPE html>
            <html>
            <head><style>
                body { font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
                .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; }
                .btn { background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; }
                .info-box { background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #059669; margin: 15px 0; }
            </style></head>
            <body>
                <div class="header"><h1>✅ Appointment Confirmed</h1></div>
                <div class="content">
                    <h2>Dear %s,</h2>
                    <p>Your appointment with <strong>Dr. %s</strong> has been confirmed.</p>
                    <div class="info-box">
                        <p><strong>📅 Date:</strong> %s</p>
                        <p><strong>⏰ Time:</strong> %s</p>
                        <p><strong>👨‍⚕️ Doctor:</strong> Dr. %s</p>
                    </div>
                    <p style="text-align: center;">
                        <a href="%s" class="btn">Join Video Consultation</a>
                    </p>
                    <p>Please join 5 minutes before the scheduled time.</p>
                    <p>Best regards,<br>WellnessOS Team</p>
                </div>
                <div class="footer">© 2024 WellnessOS. All rights reserved.</div>
            </body>
            </html>
            """, patientName, doctorName, date, time, doctorName, meetingLink);
        sendHtmlEmail(to, subject, htmlBody);
    }

    public void sendAppointmentReminder(String to, String patientName, String doctorName, String date, String time) {
        String subject = "⏰ Appointment Reminder - WellnessOS";
        String body = String.format("""
            Dear %s,
            
            Reminder: You have an appointment with Dr. %s tomorrow.
            
            Date: %s
            Time: %s
            
            Please be ready 5 minutes before the scheduled time.
            
            Join via: https://wellnessos.com/video-consultation
            
            Best regards,
            WellnessOS Team
            """, patientName, doctorName, date, time);
        sendSimpleEmail(to, subject, body);
    }

    public void sendAppointmentCancellation(String to, String patientName, String doctorName, String date, String time) {
        String subject = "❌ Appointment Cancelled - WellnessOS";
        String body = String.format("""
            Dear %s,
            
            Your appointment with Dr. %s on %s at %s has been cancelled.
            
            If you didn't request this cancellation, please contact us immediately.
            
            You can reschedule through your dashboard.
            
            Best regards,
            WellnessOS Team
            """, patientName, doctorName, date, time);
        sendSimpleEmail(to, subject, body);
    }

    public void sendAppointmentReschedule(String to, String patientName, String doctorName, String oldDate, String oldTime, String newDate, String newTime) {
        String subject = "🔄 Appointment Rescheduled - WellnessOS";
        String body = String.format("""
            Dear %s,
            
            Your appointment with Dr. %s has been rescheduled.
            
            Old Date: %s
            Old Time: %s
            
            New Date: %s
            New Time: %s
            
            Please update your calendar accordingly.
            
            Best regards,
            WellnessOS Team
            """, patientName, doctorName, oldDate, oldTime, newDate, newTime);
        sendSimpleEmail(to, subject, body);
    }

    // ============ VIDEO CONSULTATION EMAILS ============
    public void sendConsultationStartEmail(String to, String patientName, String doctorName, String meetingLink) {
        String subject = "🎥 Consultation Started - WellnessOS";
        String htmlBody = String.format("""
            <!DOCTYPE html>
            <html>
            <head><style>
                body { font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
                .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; }
                .btn { background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; }
            </style></head>
            <body>
                <div class="header"><h1>🎥 Consultation Started</h1></div>
                <div class="content">
                    <h2>Dear %s,</h2>
                    <p>Your consultation with <strong>Dr. %s</strong> has started.</p>
                    <p style="text-align: center;">
                        <a href="%s" class="btn">Join Consultation</a>
                    </p>
                    <p>Click the button above to join your video consultation.</p>
                    <p>Best regards,<br>WellnessOS Team</p>
                </div>
                <div class="footer">© 2024 WellnessOS. All rights reserved.</div>
            </body>
            </html>
            """, patientName, doctorName, meetingLink);
        sendHtmlEmail(to, subject, htmlBody);
    }

    public void sendConsultationSummary(String to, String patientName, String doctorName, String summary) {
        String subject = "📋 Consultation Summary - WellnessOS";
        String body = String.format("""
            Dear %s,
            
            Here is the summary of your consultation with Dr. %s:
            
            %s
            
            You can view the full details in your dashboard.
            
            Best regards,
            WellnessOS Team
            """, patientName, doctorName, summary);
        sendSimpleEmail(to, subject, body);
    }

    public void sendPrescriptionEmail(String to, String patientName, String doctorName, String prescription) {
        String subject = "💊 New Prescription - WellnessOS";
        String htmlBody = String.format("""
            <!DOCTYPE html>
            <html>
            <head><style>
                body { font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
                .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; }
                .prescription-box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 15px 0; font-family: monospace; }
            </style></head>
            <body>
                <div class="header"><h1>💊 New Prescription</h1></div>
                <div class="content">
                    <h2>Dear %s,</h2>
                    <p>Dr. %s has issued a new prescription for you:</p>
                    <div class="prescription-box">%s</div>
                    <p>Please review the prescription in your dashboard.</p>
                    <p>Best regards,<br>WellnessOS Team</p>
                </div>
                <div class="footer">© 2024 WellnessOS. All rights reserved.</div>
            </body>
            </html>
            """, patientName, doctorName, prescription);
        sendHtmlEmail(to, subject, htmlBody);
    }

    // ============ NOTIFICATION EMAILS ============
    public void sendNotificationEmail(String to, String subject, String message) {
        String htmlBody = String.format("""
            <!DOCTYPE html>
            <html>
            <head><style>
                body { font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
                .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; }
                .footer { text-align: center; color: #94a3b8; font-size: 0.8rem; margin-top: 20px; }
            </style></head>
            <body>
                <div class="header"><h1>🔔 WellnessOS Notification</h1></div>
                <div class="content">
                    <p>%s</p>
                    <p>Best regards,<br>WellnessOS Team</p>
                </div>
                <div class="footer">© 2024 WellnessOS. All rights reserved.</div>
            </body>
            </html>
            """, message);
        sendHtmlEmail(to, subject, htmlBody);
    }

    // ============ BILLING EMAILS ============
    public void sendInvoiceEmail(String to, String patientName, String amount, String invoiceId, String date) {
        String subject = "💰 Invoice Generated - WellnessOS";
        String body = String.format("""
            Dear %s,
            
            Your invoice for the recent consultation has been generated.
            
            Invoice ID: %s
            Date: %s
            Amount: %s
            
            You can view and download the invoice from your dashboard.
            
            Best regards,
            WellnessOS Team
            """, patientName, invoiceId, date, amount);
        sendSimpleEmail(to, subject, body);
    }

    // ============ HEALTH REMINDER EMAILS ============
    public void sendHealthReminder(String to, String name, String reminderType, String message) {
        String subject = "💚 Health Reminder - WellnessOS";
        String body = String.format("""
            Dear %s,
            
            %s
            
            %s
            
            Stay healthy and take care!
            
            Best regards,
            WellnessOS Team
            """, name, reminderType, message);
        sendSimpleEmail(to, subject, body);
    }

    // ============ DOCTOR COMMUNICATION EMAILS ============
    public void sendMessageNotification(String to, String patientName, String doctorName, String messagePreview) {
        String subject = "💬 New Message from " + doctorName + " - WellnessOS";
        String body = String.format("""
            Dear %s,
            
            You have a new message from Dr. %s:
            
            "%s"
            
            Reply to this message from your dashboard.
            
            Best regards,
            WellnessOS Team
            """, patientName, doctorName, messagePreview);
        sendSimpleEmail(to, subject, body);
    }

    // ============ PRESCRIPTION REMINDER ============
    public void sendPrescriptionReminder(String to, String patientName, String medicationName) {
        String subject = "💊 Prescription Reminder - WellnessOS";
        String body = String.format("""
            Dear %s,
            
            Reminder: Please take your medication - %s.
            
            Stay healthy and take care!
            
            Best regards,
            WellnessOS Team
            """, patientName, medicationName);
        sendSimpleEmail(to, subject, body);
    }
}
