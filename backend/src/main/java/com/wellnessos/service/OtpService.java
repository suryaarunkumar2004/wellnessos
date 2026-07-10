package com.wellnessos.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {

    private static final Logger logger = LoggerFactory.getLogger(OtpService.class);

    @Autowired
    private EmailService emailService;

    private final Map<String, OtpData> otpStore = new HashMap<>();

    private static class OtpData {
        String otp;
        LocalDateTime createdAt;
        
        OtpData(String otp) {
            this.otp = otp;
            this.createdAt = LocalDateTime.now();
        }
        
        boolean isValid() {
            return LocalDateTime.now().isBefore(createdAt.plusMinutes(5));
        }
    }

    public String generateOtpAndSendEmail(String email, String name) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStore.put(email, new OtpData(otp));
        
        logger.info("OTP generated for: {}", email);
        logger.info("OTP value: {}", otp);
        
        try {
            emailService.sendOtpEmail(email, otp, name);
            logger.info("OTP email sent successfully");
        } catch (Exception e) {
            logger.error("Failed to send OTP email", e);
        }
        
        return otp;
    }

    // Wrapper for AuthController / PasswordController compatibility
    public String generateOTP(String email) {
        return generateOtpAndSendEmail(email, "User");
    }

    // Wrapper for AuthController / PasswordController compatibility
    public boolean verifyOTP(String email, String otp) {
        return verifyOtp(email, otp);
    }

    public boolean verifyOtp(String email, String otp) {
        OtpData otpData = otpStore.get(email);
        if (otpData == null) {
            logger.warn("No OTP found for: {}", email);
            return false;
        }
        if (!otpData.isValid()) {
            logger.warn("OTP expired for: {}", email);
            otpStore.remove(email);
            return false;
        }
        boolean isValid = otpData.otp.equals(otp);
        if (isValid) {
            logger.info("OTP verified successfully for: {}", email);
            otpStore.remove(email);
        } else {
            logger.warn("Invalid OTP for: {}", email);
        }
        return isValid;
    }

    public void clearOtp(String email) {
        otpStore.remove(email);
    }
}
