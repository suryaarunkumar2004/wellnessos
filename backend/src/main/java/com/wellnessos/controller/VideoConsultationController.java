package com.wellnessos.controller;

import com.wellnessos.dto.VideoConsultationDTO;
import com.wellnessos.entity.VideoConsultation;
import com.wellnessos.repository.VideoConsultationRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/video-consultations")
@Tag(name = "Video Consultations", description = "Video consultation management APIs for telehealth services")
public class VideoConsultationController {

    @Autowired
    private VideoConsultationRepository videoConsultationRepository;

    @Operation(summary = "Get all video consultations", description = "Retrieves a list of all video consultations")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Video consultations retrieved successfully")
    })
    @GetMapping
    public ResponseEntity<List<VideoConsultationDTO>> getAllConsultations() {
        List<VideoConsultation> consultations = videoConsultationRepository.findAll();
        return ResponseEntity.ok(consultations.stream().map(this::convertToDTO).collect(Collectors.toList()));
    }

    @Operation(summary = "Get video consultation by ID", description = "Retrieves a specific video consultation by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Video consultation found"),
        @ApiResponse(responseCode = "404", description = "Video consultation not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<VideoConsultationDTO> getConsultationById(@PathVariable Long id) {
        VideoConsultation consultation = videoConsultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultation not found"));
        return ResponseEntity.ok(convertToDTO(consultation));
    }

    @Operation(summary = "Get consultation by appointment ID", description = "Retrieves a video consultation by its associated appointment ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Video consultation found"),
        @ApiResponse(responseCode = "404", description = "Video consultation not found")
    })
    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<VideoConsultationDTO> getConsultationByAppointment(@PathVariable Long appointmentId) {
        List<VideoConsultation> consultations = videoConsultationRepository.findByAppointmentId(appointmentId);
        if (consultations.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(convertToDTO(consultations.get(0)));
    }

    @Operation(summary = "Get consultations by patient email", description = "Retrieves video consultations for a specific patient email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Video consultations retrieved successfully")
    })
    @GetMapping("/patient/{email}")
    public ResponseEntity<List<VideoConsultationDTO>> getConsultationsByPatient(@PathVariable String email) {
        List<VideoConsultation> consultations = videoConsultationRepository.findByPatientEmail(email);
        return ResponseEntity.ok(consultations.stream().map(this::convertToDTO).collect(Collectors.toList()));
    }

    @Operation(summary = "Get consultations by doctor email", description = "Retrieves video consultations for a specific doctor email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Video consultations retrieved successfully")
    })
    @GetMapping("/doctor/{email}")
    public ResponseEntity<List<VideoConsultationDTO>> getConsultationsByDoctor(@PathVariable String email) {
        List<VideoConsultation> consultations = videoConsultationRepository.findByDoctorEmail(email);
        return ResponseEntity.ok(consultations.stream().map(this::convertToDTO).collect(Collectors.toList()));
    }

    @Operation(summary = "Get consultations by status", description = "Retrieves video consultations filtered by status")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Video consultations retrieved successfully")
    })
    @GetMapping("/status/{status}")
    public ResponseEntity<List<VideoConsultationDTO>> getConsultationsByStatus(@PathVariable String status) {
        List<VideoConsultation> consultations = videoConsultationRepository.findByStatus(status);
        return ResponseEntity.ok(consultations.stream().map(this::convertToDTO).collect(Collectors.toList()));
    }

    @Operation(summary = "Create a new video consultation", description = "Creates a new video consultation with meeting link")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Video consultation created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid consultation data")
    })
    @PostMapping
    public ResponseEntity<VideoConsultationDTO> createConsultation(@RequestBody VideoConsultationDTO dto) {
        VideoConsultation consultation = convertToEntity(dto);
        consultation.setStatus("scheduled");
        if (consultation.getMeetingLink() == null) {
            String meetingId = "WELL-" + System.currentTimeMillis();
            consultation.setMeetingId(meetingId);
            consultation.setMeetingLink("https://meet.jit.si/WellNest-" + meetingId);
        }
        VideoConsultation saved = videoConsultationRepository.save(consultation);
        return ResponseEntity.ok(convertToDTO(saved));
    }

    @Operation(summary = "Start video consultation", description = "Updates the consultation status to active and sets start time")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Consultation started successfully"),
        @ApiResponse(responseCode = "404", description = "Consultation not found")
    })
    @PutMapping("/{id}/start")
    public ResponseEntity<VideoConsultationDTO> startConsultation(@PathVariable Long id) {
        VideoConsultation consultation = videoConsultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultation not found"));
        consultation.setStatus("active");
        consultation.setStartTime(LocalDateTime.now());
        VideoConsultation updated = videoConsultationRepository.save(consultation);
        return ResponseEntity.ok(convertToDTO(updated));
    }

    @Operation(summary = "End video consultation", description = "Updates the consultation status to completed and sets end time")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Consultation ended successfully"),
        @ApiResponse(responseCode = "404", description = "Consultation not found")
    })
    @PutMapping("/{id}/end")
    public ResponseEntity<VideoConsultationDTO> endConsultation(@PathVariable Long id) {
        VideoConsultation consultation = videoConsultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultation not found"));
        consultation.setStatus("completed");
        consultation.setEndTime(LocalDateTime.now());
        if (consultation.getStartTime() != null) {
            consultation.setDurationMinutes((int) java.time.Duration.between(consultation.getStartTime(), consultation.getEndTime()).toMinutes());
        }
        VideoConsultation updated = videoConsultationRepository.save(consultation);
        return ResponseEntity.ok(convertToDTO(updated));
    }

    @Operation(summary = "Cancel video consultation", description = "Updates the consultation status to cancelled")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Consultation cancelled successfully"),
        @ApiResponse(responseCode = "404", description = "Consultation not found")
    })
    @PutMapping("/{id}/cancel")
    public ResponseEntity<VideoConsultationDTO> cancelConsultation(@PathVariable Long id) {
        VideoConsultation consultation = videoConsultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultation not found"));
        consultation.setStatus("cancelled");
        VideoConsultation updated = videoConsultationRepository.save(consultation);
        return ResponseEntity.ok(convertToDTO(updated));
    }

    @Operation(summary = "Add prescription", description = "Adds a prescription URL to the consultation")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Prescription added successfully"),
        @ApiResponse(responseCode = "404", description = "Consultation not found")
    })
    @PutMapping("/{id}/prescription")
    public ResponseEntity<VideoConsultationDTO> addPrescription(@PathVariable Long id, @RequestParam String prescriptionUrl) {
        VideoConsultation consultation = videoConsultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultation not found"));
        consultation.setPrescriptionUrl(prescriptionUrl);
        VideoConsultation updated = videoConsultationRepository.save(consultation);
        return ResponseEntity.ok(convertToDTO(updated));
    }

    @Operation(summary = "Add recording", description = "Adds a recording URL to the consultation")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Recording added successfully"),
        @ApiResponse(responseCode = "404", description = "Consultation not found")
    })
    @PutMapping("/{id}/recording")
    public ResponseEntity<VideoConsultationDTO> addRecording(@PathVariable Long id, @RequestParam String recordingUrl) {
        VideoConsultation consultation = videoConsultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultation not found"));
        consultation.setRecordingUrl(recordingUrl);
        VideoConsultation updated = videoConsultationRepository.save(consultation);
        return ResponseEntity.ok(convertToDTO(updated));
    }

    private VideoConsultationDTO convertToDTO(VideoConsultation entity) {
        VideoConsultationDTO dto = new VideoConsultationDTO();
        dto.setId(entity.getId());
        dto.setAppointmentId(entity.getAppointmentId());
        dto.setMeetingId(entity.getMeetingId());
        dto.setMeetingLink(entity.getMeetingLink());
        dto.setStatus(entity.getStatus());
        dto.setPatientName(entity.getPatientName());
        dto.setDoctorName(entity.getDoctorName());
        dto.setPatientEmail(entity.getPatientEmail());
        dto.setDoctorEmail(entity.getDoctorEmail());
        dto.setStartTime(entity.getStartTime());
        dto.setEndTime(entity.getEndTime());
        dto.setDurationMinutes(entity.getDurationMinutes());
        dto.setRecordingUrl(entity.getRecordingUrl());
        dto.setNotes(entity.getNotes());
        dto.setPrescriptionUrl(entity.getPrescriptionUrl());
        dto.setChatTranscript(entity.getChatTranscript());
        return dto;
    }

    private VideoConsultation convertToEntity(VideoConsultationDTO dto) {
        VideoConsultation entity = new VideoConsultation();
        entity.setAppointmentId(dto.getAppointmentId());
        entity.setPatientName(dto.getPatientName());
        entity.setDoctorName(dto.getDoctorName());
        entity.setPatientEmail(dto.getPatientEmail());
        entity.setDoctorEmail(dto.getDoctorEmail());
        entity.setNotes(dto.getNotes());
        entity.setStatus(dto.getStatus() != null ? dto.getStatus() : "scheduled");
        return entity;
    }
}
