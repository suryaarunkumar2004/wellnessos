package com.wellnessos.controller;

import com.wellnessos.dto.LoginRequest;
import com.wellnessos.dto.OtpRequest;
import com.wellnessos.dto.OtpVerifyRequest;
import com.wellnessos.dto.RegisterRequest;
import com.wellnessos.entity.User;
import com.wellnessos.repository.UserRepository;
import com.wellnessos.service.JwtService;
import com.wellnessos.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpService otpService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ===== EXISTING ENDPOINTS =====

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody OtpRequest request) {
        try {
            String otp = otpService.generateOtpAndSendEmail(request.getEmail(), request.getName());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "OTP sent to your email. Please check your inbox.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", "Failed to send OTP. Please try again.");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpVerifyRequest request) {
        boolean isValid = otpService.verifyOtp(request.getEmail(), request.getOtp());
        Map<String, Object> response = new HashMap<>();
        response.put("success", isValid);
        response.put("message", isValid ? "OTP verified successfully" : "Invalid or expired OTP");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
            }
            
            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setPhone(request.getPhone());
            user.setDob(request.getDob());
            user.setCountry(request.getCountry());
            user.setCity(request.getCity());
            user.setAddress(request.getAddress());
            user.setGender(request.getGender());
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            
            User savedUser = userRepository.save(user);
            
            String token = jwtService.generateToken(savedUser.getEmail());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("token", token);
            
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", savedUser.getId());
            userMap.put("name", savedUser.getName());
            userMap.put("email", savedUser.getEmail());
            userMap.put("phone", savedUser.getPhone());
            userMap.put("dob", savedUser.getDob() != null ? savedUser.getDob().toString() : null);
            userMap.put("country", savedUser.getCountry());
            userMap.put("city", savedUser.getCity());
            userMap.put("address", savedUser.getAddress());
            userMap.put("gender", savedUser.getGender());
            userMap.put("role", savedUser.getRole());
            response.put("user", userMap);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid password"));
            }
            
            String token = jwtService.generateToken(user.getEmail());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("token", token);
            
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("name", user.getName());
            userMap.put("email", user.getEmail());
            userMap.put("phone", user.getPhone());
            userMap.put("dob", user.getDob() != null ? user.getDob().toString() : null);
            userMap.put("country", user.getCountry());
            userMap.put("city", user.getCity());
            userMap.put("address", user.getAddress());
            userMap.put("gender", user.getGender());
            userMap.put("role", user.getRole());
            response.put("user", userMap);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        try {
            User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            if (request.containsKey("name")) user.setName((String) request.get("name"));
            if (request.containsKey("email")) user.setEmail((String) request.get("email"));
            if (request.containsKey("phone")) user.setPhone((String) request.get("phone"));
            if (request.containsKey("dob")) {
                Object dobVal = request.get("dob");
                if (dobVal == null || dobVal.toString().trim().isEmpty()) {
                    user.setDob(null);
                } else {
                    user.setDob(java.time.LocalDate.parse(dobVal.toString()));
                }
            }
            if (request.containsKey("country")) user.setCountry((String) request.get("country"));
            if (request.containsKey("city")) user.setCity((String) request.get("city"));
            if (request.containsKey("address")) user.setAddress((String) request.get("address"));
            if (request.containsKey("gender")) user.setGender((String) request.get("gender"));
            
            user.setUpdatedAt(LocalDateTime.now());
            User savedUser = userRepository.save(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Profile updated successfully");
            
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", savedUser.getId());
            userMap.put("name", savedUser.getName());
            userMap.put("email", savedUser.getEmail());
            userMap.put("phone", savedUser.getPhone());
            userMap.put("dob", savedUser.getDob() != null ? savedUser.getDob().toString() : null);
            userMap.put("country", savedUser.getCountry());
            userMap.put("city", savedUser.getCity());
            userMap.put("address", savedUser.getAddress());
            userMap.put("gender", savedUser.getGender());
            userMap.put("role", savedUser.getRole());
            response.put("user", userMap);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ===== NEW: Forgot Password Endpoints =====

    @PostMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        boolean exists = userRepository.findByEmail(email).isPresent();
        return ResponseEntity.ok(Map.of("exists", exists));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        
        try {
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Generate OTP or reset token
            String otp = otpService.generateOtpAndSendEmail(email, user.getName());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Password reset link sent to your email.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        String newPassword = request.get("newPassword");
        
        try {
            // Verify OTP
            if (!otpService.verifyOtp(email, otp)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired OTP"));
            }
            
            // Update password
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Password reset successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
