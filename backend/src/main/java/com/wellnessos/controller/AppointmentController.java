package com.wellnessos.controller;

import com.wellnessos.dto.AppointmentDTO;
import com.wellnessos.dto.VideoConsultationDTO;
import com.wellnessos.entity.Appointment;
import com.wellnessos.entity.VideoConsultation;
import com.wellnessos.repository.AppointmentRepository;
import com.wellnessos.repository.VideoConsultationRepository;
import com.wellnessos.service.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/appointments")
@Tag(name = "Appointments", description = "Appointment management APIs for booking and managing appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private VideoConsultationRepository videoConsultationRepository;

    @Autowired
    private EmailService emailService;

    @Operation(summary = "Get all appointments for a user", description = "Retrieves all appointments for a specific user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Appointments retrieved successfully")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByUser(@PathVariable Long userId) {
        List<Appointment> appointments = appointmentRepository.findByUserIdOrderByAppointmentDateDesc(userId);
        List<AppointmentDTO> dtos = appointments.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @Operation(summary = "Get appointment by ID", description = "Retrieves a specific appointment by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Appointment found"),
        @ApiResponse(responseCode = "404", description = "Appointment not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDTO> getAppointmentById(@PathVariable Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        return ResponseEntity.ok(convertToDTO(appointment));
    }

    @Operation(summary = "Get appointments by status", description = "Retrieves appointments filtered by status")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Appointments retrieved successfully")
    })
    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByStatus(
            @PathVariable Long userId,
            @PathVariable String status) {
        List<Appointment> appointments = appointmentRepository.findByUserIdAndStatus(userId, status);
        List<AppointmentDTO> dtos = appointments.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @Operation(summary = "Get appointments by date range", description = "Retrieves appointments for a user within a date range")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Appointments retrieved successfully")
    })
    @GetMapping("/user/{userId}/range")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByDateRange(
            @PathVariable Long userId,
            @RequestParam String start,
            @RequestParam String end) {
        LocalDate startDate = LocalDate.parse(start);
        LocalDate endDate = LocalDate.parse(end);
        List<Appointment> appointments = appointmentRepository.findByUserIdAndAppointmentDateBetween(userId, startDate, endDate);
        List<AppointmentDTO> dtos = appointments.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @Operation(summary = "Get appointments by doctor", description = "Retrieves appointments for a specific doctor")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Appointments retrieved successfully")
    })
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        List<Appointment> appointments = appointmentRepository.findByDoctorId(doctorId);
        List<AppointmentDTO> dtos = appointments.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @Operation(summary = "Create a new appointment", description = "Creates a new appointment and sends confirmation email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Appointment created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid appointment data")
    })
    @PostMapping
    public ResponseEntity<AppointmentDTO> createAppointment(@RequestBody AppointmentDTO dto) {
        Appointment appointment = convertToEntity(dto);
        if (appointment.getStatus() == null) {
            appointment.setStatus("pending");
        }
        Appointment saved = appointmentRepository.save(appointment);
        
        VideoConsultation consultation = new VideoConsultation();
        consultation.setAppointmentId(saved.getId());
        consultation.setPatientName(saved.getPatientName());
        consultation.setDoctorName(saved.getDoctorName());
        consultation.setPatientEmail(saved.getPatientEmail());
        consultation.setDoctorEmail(saved.getDoctorName() + "@wellnest.com");
        consultation.setStatus("scheduled");
        
        String meetingId = "WELL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        consultation.setMeetingId(meetingId);
        consultation.setMeetingLink("https://meet.jit.si/WellNest-" + meetingId);
        
        VideoConsultation savedConsultation = videoConsultationRepository.save(consultation);
        // emailService.sendAppointmentConfirmation(saved, savedConsultation);
        
        return ResponseEntity.ok(convertToDTO(saved));
    }

    @Operation(summary = "Update appointment status", description = "Updates the status of an existing appointment")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Appointment status updated successfully"),
        @ApiResponse(responseCode = "404", description = "Appointment not found")
    })
    @PutMapping("/{id}/status")
    public ResponseEntity<AppointmentDTO> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);
        Appointment updated = appointmentRepository.save(appointment);
        return ResponseEntity.ok(convertToDTO(updated));
    }

    @Operation(summary = "Update appointment", description = "Updates an existing appointment's details")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Appointment updated successfully"),
        @ApiResponse(responseCode = "404", description = "Appointment not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<AppointmentDTO> updateAppointment(
            @PathVariable Long id,
            @RequestBody AppointmentDTO dto) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setAppointmentTime(dto.getAppointmentTime());
        appointment.setNotes(dto.getNotes());
        appointment.setPatientName(dto.getPatientName());
        appointment.setPatientEmail(dto.getPatientEmail());
        appointment.setPatientPhone(dto.getPatientPhone());
        
        Appointment updated = appointmentRepository.save(appointment);
        return ResponseEntity.ok(convertToDTO(updated));
    }

    @Operation(summary = "Cancel appointment", description = "Cancels an existing appointment (soft delete)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Appointment cancelled successfully"),
        @ApiResponse(responseCode = "404", description = "Appointment not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus("cancelled");
        appointmentRepository.save(appointment);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Delete appointment", description = "Permanently deletes an appointment by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Appointment deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Appointment not found")
    })
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    private AppointmentDTO convertToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setUserId(appointment.getUserId());
        dto.setDoctorId(appointment.getDoctorId());
        dto.setDoctorName(appointment.getDoctorName());
        dto.setDoctorSpecialty(appointment.getDoctorSpecialty());
        dto.setAppointmentDate(appointment.getAppointmentDate());
        dto.setAppointmentTime(appointment.getAppointmentTime());
        dto.setPatientName(appointment.getPatientName());
        dto.setPatientEmail(appointment.getPatientEmail());
        dto.setPatientPhone(appointment.getPatientPhone());
        dto.setNotes(appointment.getNotes());
        dto.setStatus(appointment.getStatus());
        return dto;
    }

    private Appointment convertToEntity(AppointmentDTO dto) {
        Appointment appointment = new Appointment();
        appointment.setUserId(dto.getUserId());
        appointment.setDoctorId(dto.getDoctorId());
        appointment.setDoctorName(dto.getDoctorName());
        appointment.setDoctorSpecialty(dto.getDoctorSpecialty());
        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setAppointmentTime(dto.getAppointmentTime());
        appointment.setPatientName(dto.getPatientName());
        appointment.setPatientEmail(dto.getPatientEmail());
        appointment.setPatientPhone(dto.getPatientPhone());
        appointment.setNotes(dto.getNotes());
        appointment.setStatus(dto.getStatus() != null ? dto.getStatus() : "pending");
        return appointment;
    }
}
