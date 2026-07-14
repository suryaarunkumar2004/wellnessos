package com.wellnessos.controller;

import com.wellnessos.dto.LoginRequest;
import com.wellnessos.dto.RegisterRequest;
import com.wellnessos.entity.User;
import com.wellnessos.repository.UserRepository;
import com.wellnessos.service.EmailService;
import com.wellnessos.service.JwtService;
import com.wellnessos.service.OtpService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Authentication", description = "Authentication and user management APIs")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpService otpService;

    @Operation(summary = "Login user", description = "Authenticates a user and returns a JWT token")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login successful"),
        @ApiResponse(responseCode = "401", description = "Invalid credentials")
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(401).body(Map.of("success", false, "error", "Invalid email or password"));
            }
            User user = userOpt.get();
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.status(401).body(Map.of("success", false, "error", "Invalid email or password"));
            }
            if (!user.getIsActive()) {
                return ResponseEntity.status(403).body(Map.of("success", false, "error", "Account is deactivated"));
            }
            String token = jwtService.generateToken(user.getEmail());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("token", token);

            Map<String, Object> userData = new HashMap<>();
            userData.put("id", user.getId());
            userData.put("name", user.getName());
            userData.put("email", user.getEmail());
            userData.put("phone", user.getPhone());
            userData.put("dob", user.getDob());
            userData.put("gender", user.getGender());
            userData.put("address", user.getAddress());
            userData.put("city", user.getCity());
            userData.put("country", user.getCountry());
            userData.put("role", user.getRole());

            response.put("user", userData);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @Operation(summary = "Register new user", description = "Creates a new user account")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Registration successful"),
        @ApiResponse(responseCode = "400", description = "Validation error or email already exists")
    })
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Email already exists"));
            }

            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setPhone(request.getPhone() != null ? request.getPhone() : "");
            user.setDob(request.getDob() != null ? request.getDob() : "");
            user.setGender(request.getGender() != null ? request.getGender() : "");
            user.setAddress(request.getAddress() != null ? request.getAddress() : "");
            user.setCity(request.getCity() != null ? request.getCity() : "");
            user.setCountry(request.getCountry() != null ? request.getCountry() : "");
            user.setRole("PATIENT");
            user.setIsActive(true);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());

            User saved = userRepository.save(user);

            try {
                emailService.sendWelcomeEmail(saved.getEmail(), saved.getName());
            } catch (Exception e) {
                System.err.println("Welcome email failed: " + e.getMessage());
            }

            String token = jwtService.generateToken(saved.getEmail());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("token", token);

            Map<String, Object> userData = new HashMap<>();
            userData.put("id", saved.getId());
            userData.put("name", saved.getName());
            userData.put("email", saved.getEmail());
            userData.put("phone", saved.getPhone());
            userData.put("dob", saved.getDob());
            userData.put("gender", saved.getGender());
            userData.put("address", saved.getAddress());
            userData.put("city", saved.getCity());
            userData.put("country", saved.getCountry());
            userData.put("role", saved.getRole());

            response.put("user", userData);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @Operation(summary = "Send OTP", description = "Sends an OTP to the user's email for verification")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "OTP sent successfully"),
        @ApiResponse(responseCode = "400", description = "Email not found")
    })
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String name = request.get("name");

            if (email == null || email.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Email is required"));
            }

            String otp = otpService.generateOtpAndSendEmail(email, name != null ? name : "User");
            return ResponseEntity.ok(Map.of("success", true, "message", "OTP sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @Operation(summary = "Verify OTP", description = "Verifies the OTP sent to the user's email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "OTP verified successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid OTP")
    })
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String otp = request.get("otp");

            if (email == null || otp == null) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Email and OTP are required"));
            }

            boolean isValid = otpService.verifyOTP(email, otp);
            if (isValid) {
                return ResponseEntity.ok(Map.of("success", true, "message", "OTP verified successfully"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Invalid OTP"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @Operation(summary = "Check if email exists", description = "Checks if an email is already registered")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Email check completed")
    })
    @PostMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            if (email == null || email.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Email is required"));
            }

            boolean exists = userRepository.findByEmail(email).isPresent();
            return ResponseEntity.ok(Map.of("success", true, "exists", exists));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @Operation(summary = "Forgot password", description = "Sends a password reset link to the user's email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Reset link sent successfully"),
        @ApiResponse(responseCode = "400", description = "Email not found")
    })
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            if (email == null || email.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Email is required"));
            }

            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Email not found"));
            }

            // Generate password reset token using JWT
            String resetToken = jwtService.generateToken(email);

            String resetLink = "http://localhost:5173/reset-password?token=" + resetToken;
            emailService.sendNotificationEmail(email, "Password Reset Request",
                "Click the link below to reset your password:\n\n" + resetLink + "\n\nThis link will expire in 15 minutes.");

            return ResponseEntity.ok(Map.of("success", true, "message", "Password reset link sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @Operation(summary = "Reset password", description = "Resets the user's password using a valid token")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Password reset successful"),
        @ApiResponse(responseCode = "400", description = "Invalid token or password")
    })
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            String newPassword = request.get("newPassword");

            if (token == null || newPassword == null) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Token and new password are required"));
            }

            if (newPassword.length() < 6) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Password must be at least 6 characters"));
            }

            if (!jwtService.isTokenValid(token)) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Invalid or expired token"));
            }

            String email = jwtService.extractEmail(token);
            if (email == null) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Invalid token"));
            }

            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "User not found"));
            }

            User user = userOpt.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);

            return ResponseEntity.ok(Map.of("success", true, "message", "Password reset successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }
}
