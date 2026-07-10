package com.wellnessos.controller;

import com.wellnessos.dto.ServiceDTO;
import com.wellnessos.entity.Service;
import com.wellnessos.repository.ServiceRepository;
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
@RequestMapping("/api/services")
@Tag(name = "Services", description = "Service management APIs for healthcare services")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @Operation(summary = "Get all services", description = "Retrieves a list of all active services")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Services retrieved successfully")
    })
    @GetMapping
    public ResponseEntity<List<ServiceDTO>> getAllServices() {
        List<Service> services = serviceRepository.findByIsActiveTrue();
        return ResponseEntity.ok(services.stream().map(this::convertToDTO).collect(Collectors.toList()));
    }

    @Operation(summary = "Get service by ID", description = "Retrieves a specific service by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Service found"),
        @ApiResponse(responseCode = "404", description = "Service not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ServiceDTO> getServiceById(@PathVariable Long id) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));
        return ResponseEntity.ok(convertToDTO(service));
    }

    @Operation(summary = "Search services", description = "Search services by name or description")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Search results retrieved successfully")
    })
    @GetMapping("/search")
    public ResponseEntity<List<ServiceDTO>> searchServices(@RequestParam String q) {
        List<Service> services = serviceRepository.searchServices(q);
        return ResponseEntity.ok(services.stream().map(this::convertToDTO).collect(Collectors.toList()));
    }

    @Operation(summary = "Get services by category", description = "Retrieves services filtered by their category")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Services retrieved successfully")
    })
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ServiceDTO>> getServicesByCategory(@PathVariable String category) {
        List<Service> services = serviceRepository.findByCategory(category);
        return ResponseEntity.ok(services.stream().map(this::convertToDTO).collect(Collectors.toList()));
    }

    @Operation(summary = "Get all categories", description = "Retrieves a list of all unique service categories")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Categories retrieved successfully")
    })
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        return ResponseEntity.ok(serviceRepository.findAllCategories());
    }

    @Operation(summary = "Create a new service", description = "Adds a new service to the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Service created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid service data")
    })
    @PostMapping
    public ResponseEntity<ServiceDTO> createService(@RequestBody ServiceDTO dto) {
        Service service = convertToEntity(dto);
        service.setIsActive(true);
        Service saved = serviceRepository.save(service);
        return ResponseEntity.ok(convertToDTO(saved));
    }

    @Operation(summary = "Update a service", description = "Updates an existing service's information")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Service updated successfully"),
        @ApiResponse(responseCode = "404", description = "Service not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<ServiceDTO> updateService(@PathVariable Long id, @RequestBody ServiceDTO dto) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));
        
        service.setName(dto.getName());
        service.setCategory(dto.getCategory());
        service.setDescription(dto.getDescription());
        service.setRating(dto.getRating());
        service.setReviews(dto.getReviews());
        service.setPrice(dto.getPrice());
        service.setDuration(dto.getDuration());
        service.setAvailability(dto.getAvailability());
        service.setImageUrl(dto.getImageUrl());
        service.setIcon(dto.getIcon());
        
        Service updated = serviceRepository.save(service);
        return ResponseEntity.ok(convertToDTO(updated));
    }

    @Operation(summary = "Delete a service", description = "Soft deletes a service by setting isActive to false")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Service deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Service not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));
        service.setIsActive(false);
        serviceRepository.save(service);
        return ResponseEntity.ok().build();
    }

    private ServiceDTO convertToDTO(Service service) {
        ServiceDTO dto = new ServiceDTO();
        dto.setId(service.getId());
        dto.setName(service.getName());
        dto.setCategory(service.getCategory());
        dto.setDescription(service.getDescription());
        dto.setRating(service.getRating());
        dto.setReviews(service.getReviews());
        dto.setPrice(service.getPrice());
        dto.setDuration(service.getDuration());
        dto.setAvailability(service.getAvailability());
        dto.setImageUrl(service.getImageUrl());
        dto.setIcon(service.getIcon());
        dto.setIsActive(service.getIsActive());
        return dto;
    }

    private Service convertToEntity(ServiceDTO dto) {
        Service service = new Service();
        service.setName(dto.getName());
        service.setCategory(dto.getCategory());
        service.setDescription(dto.getDescription());
        service.setRating(dto.getRating());
        service.setReviews(dto.getReviews());
        service.setPrice(dto.getPrice());
        service.setDuration(dto.getDuration());
        service.setAvailability(dto.getAvailability());
        service.setImageUrl(dto.getImageUrl());
        service.setIcon(dto.getIcon());
        return service;
    }
}
