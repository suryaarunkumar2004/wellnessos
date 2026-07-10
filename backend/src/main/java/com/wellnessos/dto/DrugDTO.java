package com.wellnessos.dto;

import java.time.LocalDateTime;

public class DrugDTO {
    private Long id;
    private String name;
    private String category;
    private String description;
    private String dosage;
    private String sideEffects;
    private Double rating;
    private String price;
    private String availability;
    private String imageUrl;
    private Boolean isActive;
    private String manufacturer;
    private String drugClass;
    private String pregnancyCategory;
    private String storageConditions;
    private String halfLife;
    private String onsetOfAction;
    private String durationOfAction;
    private String metabolism;
    private String excretion;
    private Integer reviewCount;
    private String interactions;
    private String warnings;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }
    public String getSideEffects() { return sideEffects; }
    public void setSideEffects(String sideEffects) { this.sideEffects = sideEffects; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }
    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    public String getManufacturer() { return manufacturer; }
    public void setManufacturer(String manufacturer) { this.manufacturer = manufacturer; }
    public String getDrugClass() { return drugClass; }
    public void setDrugClass(String drugClass) { this.drugClass = drugClass; }
    public String getPregnancyCategory() { return pregnancyCategory; }
    public void setPregnancyCategory(String pregnancyCategory) { this.pregnancyCategory = pregnancyCategory; }
    public String getStorageConditions() { return storageConditions; }
    public void setStorageConditions(String storageConditions) { this.storageConditions = storageConditions; }
    public String getHalfLife() { return halfLife; }
    public void setHalfLife(String halfLife) { this.halfLife = halfLife; }
    public String getOnsetOfAction() { return onsetOfAction; }
    public void setOnsetOfAction(String onsetOfAction) { this.onsetOfAction = onsetOfAction; }
    public String getDurationOfAction() { return durationOfAction; }
    public void setDurationOfAction(String durationOfAction) { this.durationOfAction = durationOfAction; }
    public String getMetabolism() { return metabolism; }
    public void setMetabolism(String metabolism) { this.metabolism = metabolism; }
    public String getExcretion() { return excretion; }
    public void setExcretion(String excretion) { this.excretion = excretion; }
    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
    public String getInteractions() { return interactions; }
    public void setInteractions(String interactions) { this.interactions = interactions; }
    public String getWarnings() { return warnings; }
    public void setWarnings(String warnings) { this.warnings = warnings; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
