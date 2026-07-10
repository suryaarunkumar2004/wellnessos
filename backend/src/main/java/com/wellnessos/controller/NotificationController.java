package com.wellnessos.controller;

import com.wellnessos.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/email")
    public ResponseEntity<Map<String, Object>> sendEmailNotification(
            @RequestBody Map<String, String> request) {
        
        String email = request.get("email");
        String subject = request.get("subject");
        String message = request.get("message");
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (email == null || email.isEmpty()) {
                response.put("success", false);
                response.put("message", "Email address is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            emailService.sendNotificationEmail(email, subject, message);
            response.put("success", true);
            response.put("message", "Email notification sent successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to send email: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/appointment/confirm")
    public ResponseEntity<Map<String, Object>> sendAppointmentConfirmation(
            @RequestBody Map<String, String> request) {
        
        String email = request.get("email");
        String patientName = request.get("patientName");
        String doctorName = request.get("doctorName");
        String date = request.get("date");
        String time = request.get("time");
        String meetingLink = request.get("meetingLink");
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            emailService.sendAppointmentConfirmation(email, patientName, doctorName, date, time, meetingLink);
            response.put("success", true);
            response.put("message", "Appointment confirmation email sent");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to send email: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/appointment/reminder")
    public ResponseEntity<Map<String, Object>> sendAppointmentReminder(
            @RequestBody Map<String, String> request) {
        
        String email = request.get("email");
        String patientName = request.get("patientName");
        String doctorName = request.get("doctorName");
        String date = request.get("date");
        String time = request.get("time");
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            emailService.sendAppointmentReminder(email, patientName, doctorName, date, time);
            response.put("success", true);
            response.put("message", "Appointment reminder email sent");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to send email: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/prescription")
    public ResponseEntity<Map<String, Object>> sendPrescription(
            @RequestBody Map<String, String> request) {
        
        String email = request.get("email");
        String patientName = request.get("patientName");
        String doctorName = request.get("doctorName");
        String prescription = request.get("prescription");
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            emailService.sendPrescriptionEmail(email, patientName, doctorName, prescription);
            response.put("success", true);
            response.put("message", "Prescription email sent");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to send email: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/consultation/summary")
    public ResponseEntity<Map<String, Object>> sendConsultationSummary(
            @RequestBody Map<String, String> request) {
        
        String email = request.get("email");
        String patientName = request.get("patientName");
        String doctorName = request.get("doctorName");
        String summary = request.get("summary");
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            emailService.sendConsultationSummary(email, patientName, doctorName, summary);
            response.put("success", true);
            response.put("message", "Consultation summary email sent");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to send email: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/billing/invoice")
    public ResponseEntity<Map<String, Object>> sendInvoice(
            @RequestBody Map<String, String> request) {
        
        String email = request.get("email");
        String patientName = request.get("patientName");
        String amount = request.get("amount");
        String invoiceId = request.get("invoiceId");
        String date = request.get("date");
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            emailService.sendInvoiceEmail(email, patientName, amount, invoiceId, date);
            response.put("success", true);
            response.put("message", "Invoice email sent");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to send email: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
