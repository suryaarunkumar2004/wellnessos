package com.wellnessos.controller;

import com.wellnessos.entity.User;
import com.wellnessos.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
@Tag(name = "User Profile", description = "User profile management APIs")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Operation(summary = "Get user profile", description = "Retrieves a user's profile information by their ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User profile retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserProfile(@Parameter(description = "User ID", required = true, example = "1") @PathVariable Long userId) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            User user = userOptional.get();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            
            Map<String, Object> data = new HashMap<>();
            data.put("id", user.getId());
            data.put("name", user.getName());
            data.put("email", user.getEmail());
            data.put("phone", user.getPhone());
            data.put("dob", user.getDob());
            data.put("gender", user.getGender());
            data.put("address", user.getAddress());
            data.put("city", user.getCity());
            data.put("country", user.getCountry());
            data.put("role", user.getRole());
            data.put("createdAt", user.getCreatedAt());
            data.put("updatedAt", user.getUpdatedAt());
            
            response.put("data", data);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @Operation(summary = "Update user profile", description = "Updates a user's profile information")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User profile updated successfully"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUserProfile(
            @Parameter(description = "User ID", required = true, example = "1") @PathVariable Long userId,
            @RequestBody Map<String, Object> request) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            User user = userOptional.get();
            if (request.containsKey("name")) user.setName((String) request.get("name"));
            if (request.containsKey("phone")) user.setPhone((String) request.get("phone"));
            if (request.containsKey("dob")) user.setDob((String) request.get("dob"));
            if (request.containsKey("gender")) user.setGender((String) request.get("gender"));
            if (request.containsKey("address")) user.setAddress((String) request.get("address"));
            if (request.containsKey("city")) user.setCity((String) request.get("city"));
            if (request.containsKey("country")) user.setCountry((String) request.get("country"));
            user.setUpdatedAt(LocalDateTime.now());
            User saved = userRepository.save(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User profile updated successfully");
            
            Map<String, Object> data = new HashMap<>();
            data.put("id", saved.getId());
            data.put("name", saved.getName());
            data.put("email", saved.getEmail());
            data.put("phone", saved.getPhone());
            data.put("dob", saved.getDob());
            data.put("gender", saved.getGender());
            data.put("address", saved.getAddress());
            data.put("city", saved.getCity());
            data.put("country", saved.getCountry());
            data.put("updatedAt", saved.getUpdatedAt());
            
            response.put("data", data);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @Operation(summary = "Change user password", description = "Changes a user's password (requires current password verification)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Password changed successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid current password or request"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PostMapping("/{userId}/password")
    public ResponseEntity<?> changePassword(
            @Parameter(description = "User ID", required = true, example = "1") @PathVariable Long userId,
            @RequestBody Map<String, String> request) {
        try {
            String currentPassword = request.get("currentPassword");
            String newPassword = request.get("newPassword");
            if (currentPassword == null || newPassword == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("error", "Current and new password are required");
                return ResponseEntity.badRequest().body(error);
            }
            if (newPassword.length() < 6) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("error", "New password must be at least 6 characters");
                return ResponseEntity.badRequest().body(error);
            }
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            User user = userOptional.get();
            if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("error", "Current password is incorrect");
                return ResponseEntity.badRequest().body(error);
            }
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Password changed successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @Operation(summary = "Delete user account", description = "Soft deletes a user account (sets isActive to false)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User account deactivated successfully"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@Parameter(description = "User ID", required = true, example = "1") @PathVariable Long userId) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            User user = userOptional.get();
            user.setIsActive(false);
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User account deactivated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
