package com.wellnessos.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "drugs")
public class Drug {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String category;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String dosage;
    
    @Column(name = "side_effects")
    private String sideEffects;
    
    private Double rating;
    private String price;
    private String availability;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "is_active")
    private Boolean isActive;
    
    private String manufacturer;
    
    @Column(name = "drug_class")
    private String drugClass;
    
    @Column(name = "pregnancy_category")
    private String pregnancyCategory;
    
    @Column(name = "storage_conditions")
    private String storageConditions;
    
    @Column(name = "half_life")
    private String halfLife;
    
    @Column(name = "onset_of_action")
    private String onsetOfAction;
    
    @Column(name = "duration_of_action")
    private String durationOfAction;
    
    private String metabolism;
    private String excretion;
    
    @Column(name = "review_count")
    private Integer reviewCount;
    
    @Column(columnDefinition = "JSON")
    private String interactions;
    
    @Column(columnDefinition = "JSON")
    private String warnings;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ========== GETTERS ==========
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public String getDosage() { return dosage; }
    public String getSideEffects() { return sideEffects; }
    public Double getRating() { return rating; }
    public String getPrice() { return price; }
    public String getAvailability() { return availability; }
    public String getImageUrl() { return imageUrl; }
    public Boolean getIsActive() { return isActive; }
    public String getManufacturer() { return manufacturer; }
    public String getDrugClass() { return drugClass; }
    public String getPregnancyCategory() { return pregnancyCategory; }
    public String getStorageConditions() { return storageConditions; }
    public String getHalfLife() { return halfLife; }
    public String getOnsetOfAction() { return onsetOfAction; }
    public String getDurationOfAction() { return durationOfAction; }
    public String getMetabolism() { return metabolism; }
    public String getExcretion() { return excretion; }
    public Integer getReviewCount() { return reviewCount; }
    public String getInteractions() { return interactions; }
    public String getWarnings() { return warnings; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    // ========== SETTERS ==========
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setCategory(String category) { this.category = category; }
    public void setDescription(String description) { this.description = description; }
    public void setDosage(String dosage) { this.dosage = dosage; }
    public void setSideEffects(String sideEffects) { this.sideEffects = sideEffects; }
    public void setRating(Double rating) { this.rating = rating; }
    public void setPrice(String price) { this.price = price; }
    public void setAvailability(String availability) { this.availability = availability; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    public void setManufacturer(String manufacturer) { this.manufacturer = manufacturer; }
    public void setDrugClass(String drugClass) { this.drugClass = drugClass; }
    public void setPregnancyCategory(String pregnancyCategory) { this.pregnancyCategory = pregnancyCategory; }
    public void setStorageConditions(String storageConditions) { this.storageConditions = storageConditions; }
    public void setHalfLife(String halfLife) { this.halfLife = halfLife; }
    public void setOnsetOfAction(String onsetOfAction) { this.onsetOfAction = onsetOfAction; }
    public void setDurationOfAction(String durationOfAction) { this.durationOfAction = durationOfAction; }
    public void setMetabolism(String metabolism) { this.metabolism = metabolism; }
    public void setExcretion(String excretion) { this.excretion = excretion; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
    public void setInteractions(String interactions) { this.interactions = interactions; }
    public void setWarnings(String warnings) { this.warnings = warnings; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (isActive == null) {
            isActive = true;
        }
        if (rating == null) {
            rating = 4.5;
        }
        if (reviewCount == null) {
            reviewCount = 0;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
