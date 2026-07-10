package com.wellnessos.controller;

import com.wellnessos.dto.DrugDTO;
import com.wellnessos.entity.Drug;
import com.wellnessos.repository.DrugRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/drugs")
@Tag(name = "Drugs", description = "Comprehensive Drug/Dosage Guide Management APIs")
public class DrugController {

    @Autowired
    private DrugRepository drugRepository;

    @Operation(summary = "Get all drugs with pagination")
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllDrugs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Drug> drugPage = drugRepository.findByIsActiveTrue(pageable);
        
        Map<String, Object> response = new HashMap<>();
        response.put("drugs", drugPage.getContent().stream().map(this::convertToDTO).collect(Collectors.toList()));
        response.put("currentPage", drugPage.getNumber());
        response.put("totalItems", drugPage.getTotalElements());
        response.put("totalPages", drugPage.getTotalPages());
        response.put("pageSize", drugPage.getSize());
        
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get all categories with counts")
    @GetMapping("/categories")
    public ResponseEntity<Map<String, Object>> getAllCategories() {
        List<Object[]> distribution = drugRepository.getCategoryDistribution();
        List<String> categories = new ArrayList<>();
        Map<String, Long> categoryCounts = new HashMap<>();
        
        for (Object[] row : distribution) {
            String category = (String) row[0];
            Long count = (Long) row[1];
            if (category != null) {
                categories.add(category);
                categoryCounts.put(category, count);
            }
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("categories", categories);
        response.put("categoryCounts", categoryCounts);
        response.put("totalCategories", categories.size());
        return ResponseEntity.ok(response);
    }

    private DrugDTO convertToDTO(Drug drug) {
        DrugDTO dto = new DrugDTO();
        dto.setId(drug.getId());
        dto.setName(drug.getName());
        dto.setCategory(drug.getCategory());
        dto.setDescription(drug.getDescription());
        dto.setDosage(drug.getDosage());
        dto.setSideEffects(drug.getSideEffects());
        dto.setRating(drug.getRating());
        dto.setPrice(drug.getPrice());
        dto.setAvailability(drug.getAvailability());
        dto.setImageUrl(drug.getImageUrl());
        dto.setIsActive(drug.getIsActive());
        dto.setManufacturer(drug.getManufacturer());
        dto.setDrugClass(drug.getDrugClass());
        dto.setPregnancyCategory(drug.getPregnancyCategory());
        dto.setStorageConditions(drug.getStorageConditions());
        dto.setHalfLife(drug.getHalfLife());
        dto.setOnsetOfAction(drug.getOnsetOfAction());
        dto.setDurationOfAction(drug.getDurationOfAction());
        dto.setMetabolism(drug.getMetabolism());
        dto.setExcretion(drug.getExcretion());
        dto.setReviewCount(drug.getReviewCount());
        dto.setInteractions(drug.getInteractions());
        dto.setWarnings(drug.getWarnings());
        dto.setCreatedAt(drug.getCreatedAt());
        dto.setUpdatedAt(drug.getUpdatedAt());
        return dto;
    }
}
