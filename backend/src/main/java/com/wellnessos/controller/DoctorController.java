package com.wellnessos.controller;

import com.wellnessos.dto.DoctorDTO;
import com.wellnessos.entity.Doctor;
import com.wellnessos.repository.DoctorRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/doctors")
@Tag(name = "Doctors", description = "Doctor management APIs for searching, filtering, and managing healthcare professionals")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @Operation(summary = "Get all doctors", description = "Retrieves a list of all active doctors")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Doctors retrieved successfully")
    })
    @GetMapping
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findByIsAvailableTrue();
        List<DoctorDTO> doctorDTOs = doctors.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(doctorDTOs);
    }

    @Operation(summary = "Get doctor by ID", description = "Retrieves a specific doctor by their ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Doctor found"),
        @ApiResponse(responseCode = "404", description = "Doctor not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
        return ResponseEntity.ok(convertToDTO(doctor));
    }

    @Operation(summary = "Search doctors", description = "Search doctors by name, specialty, or description")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Search results retrieved successfully")
    })
    @GetMapping("/search")
    public ResponseEntity<List<DoctorDTO>> searchDoctors(@RequestParam String q) {
        List<Doctor> doctors = doctorRepository.searchDoctors(q);
        List<DoctorDTO> doctorDTOs = doctors.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(doctorDTOs);
    }

    @Operation(summary = "Get doctors by specialty", description = "Retrieves doctors filtered by their specialty")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Doctors retrieved successfully")
    })
    @GetMapping("/specialty/{specialty}")
    public ResponseEntity<List<DoctorDTO>> getDoctorsBySpecialty(@PathVariable String specialty) {
        List<Doctor> doctors = doctorRepository.findBySpecialtyContainingIgnoreCase(specialty);
        List<DoctorDTO> doctorDTOs = doctors.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(doctorDTOs);
    }

    @Operation(summary = "Get all specialties", description = "Retrieves a list of all unique doctor specialties")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Specialties retrieved successfully")
    })
    @GetMapping("/specialties")
    public ResponseEntity<List<String>> getAllSpecialties() {
        List<String> specialties = doctorRepository.findAllSpecialties();
        return ResponseEntity.ok(specialties);
    }

    @Operation(summary = "Create a new doctor", description = "Adds a new doctor to the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Doctor created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid doctor data")
    })
    @PostMapping
    public ResponseEntity<DoctorDTO> createDoctor(@RequestBody DoctorDTO doctorDTO) {
        Doctor doctor = convertToEntity(doctorDTO);
        doctor.setIsAvailable(true);
        Doctor savedDoctor = doctorRepository.save(doctor);
        return ResponseEntity.ok(convertToDTO(savedDoctor));
    }

    @Operation(summary = "Update a doctor", description = "Updates an existing doctor's information")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Doctor updated successfully"),
        @ApiResponse(responseCode = "404", description = "Doctor not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<DoctorDTO> updateDoctor(@PathVariable Long id, @RequestBody DoctorDTO doctorDTO) {
        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
        
        existingDoctor.setName(doctorDTO.getName());
        existingDoctor.setSpecialty(doctorDTO.getSpecialty());
        existingDoctor.setRating(doctorDTO.getRating());
        existingDoctor.setExperienceYears(doctorDTO.getExperienceYears());
        existingDoctor.setDescription(doctorDTO.getDescription());
        existingDoctor.setPhone(doctorDTO.getPhone());
        existingDoctor.setEmail(doctorDTO.getEmail());
        existingDoctor.setAvailability(doctorDTO.getAvailability());
        existingDoctor.setImageUrl(doctorDTO.getImageUrl());
        existingDoctor.setIsAvailable(doctorDTO.getIsAvailable());
        
        Doctor updatedDoctor = doctorRepository.save(existingDoctor);
        return ResponseEntity.ok(convertToDTO(updatedDoctor));
    }

    @Operation(summary = "Delete a doctor", description = "Soft deletes a doctor by setting isAvailable to false")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Doctor deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Doctor not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
        doctor.setIsAvailable(false);
        doctorRepository.save(doctor);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Toggle doctor availability", description = "Toggles a doctor's availability status")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Availability toggled successfully"),
        @ApiResponse(responseCode = "404", description = "Doctor not found")
    })
    @PatchMapping("/{id}/toggle-availability")
    public ResponseEntity<DoctorDTO> toggleAvailability(@PathVariable Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
        doctor.setIsAvailable(!doctor.getIsAvailable());
        Doctor updatedDoctor = doctorRepository.save(doctor);
        return ResponseEntity.ok(convertToDTO(updatedDoctor));
    }

    private DoctorDTO convertToDTO(Doctor doctor) {
        return new DoctorDTO(
            doctor.getId(),
            doctor.getName(),
            doctor.getSpecialty(),
            doctor.getRating(),
            doctor.getExperienceYears(),
            doctor.getDescription(),
            doctor.getPhone(),
            doctor.getEmail(),
            doctor.getAvailability(),
            doctor.getImageUrl(),
            doctor.getIsAvailable()
        );
    }

    private Doctor convertToEntity(DoctorDTO dto) {
        Doctor doctor = new Doctor();
        doctor.setName(dto.getName());
        doctor.setSpecialty(dto.getSpecialty());
        doctor.setRating(dto.getRating());
        doctor.setExperienceYears(dto.getExperienceYears());
        doctor.setDescription(dto.getDescription());
        doctor.setPhone(dto.getPhone());
        doctor.setEmail(dto.getEmail());
        doctor.setAvailability(dto.getAvailability());
        doctor.setImageUrl(dto.getImageUrl());
        doctor.setIsAvailable(dto.getIsAvailable());
        return doctor;
    }
}
