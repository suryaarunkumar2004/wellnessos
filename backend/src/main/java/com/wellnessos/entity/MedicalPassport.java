package com.wellnessos.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_passports")
public class MedicalPassport {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;
    
    @Column(name = "blood_type", length = 10)
    private String bloodType;
    
    @Column(name = "allergies", columnDefinition = "TEXT")
    private String allergies;
    
    @Column(name = "chronic_conditions", columnDefinition = "TEXT")
    private String chronicConditions;
    
    @Column(name = "surgeries", columnDefinition = "TEXT")
    private String surgeries;
    
    @Column(name = "primary_physician", length = 255)
    private String primaryPhysician;
    
    @Column(name = "insurance_provider", length = 255)
    private String insuranceProvider;
    
    @Column(name = "subscriber_id", length = 100)
    private String subscriberId;
    
    @Column(name = "emergency_name", length = 255)
    private String emergencyName;
    
    @Column(name = "emergency_relation", length = 100)
    private String emergencyRelation;
    
    @Column(name = "emergency_phone", length = 50)
    private String emergencyPhone;
    
    @Column(name = "organ_donor")
    private Boolean organDonor = false;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ========== GETTERS ==========
    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getBloodType() { return bloodType; }
    public String getAllergies() { return allergies; }
    public String getChronicConditions() { return chronicConditions; }
    public String getSurgeries() { return surgeries; }
    public String getPrimaryPhysician() { return primaryPhysician; }
    public String getInsuranceProvider() { return insuranceProvider; }
    public String getSubscriberId() { return subscriberId; }
    public String getEmergencyName() { return emergencyName; }
    public String getEmergencyRelation() { return emergencyRelation; }
    public String getEmergencyPhone() { return emergencyPhone; }
    public Boolean getOrganDonor() { return organDonor; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    // ========== SETTERS ==========
    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setBloodType(String bloodType) { this.bloodType = bloodType; }
    public void setAllergies(String allergies) { this.allergies = allergies; }
    public void setChronicConditions(String chronicConditions) { this.chronicConditions = chronicConditions; }
    public void setSurgeries(String surgeries) { this.surgeries = surgeries; }
    public void setPrimaryPhysician(String primaryPhysician) { this.primaryPhysician = primaryPhysician; }
    public void setInsuranceProvider(String insuranceProvider) { this.insuranceProvider = insuranceProvider; }
    public void setSubscriberId(String subscriberId) { this.subscriberId = subscriberId; }
    public void setEmergencyName(String emergencyName) { this.emergencyName = emergencyName; }
    public void setEmergencyRelation(String emergencyRelation) { this.emergencyRelation = emergencyRelation; }
    public void setEmergencyPhone(String emergencyPhone) { this.emergencyPhone = emergencyPhone; }
    public void setOrganDonor(Boolean organDonor) { this.organDonor = organDonor; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // ========== LIFE CYCLE CALLBACKS ==========
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (organDonor == null) {
            organDonor = false;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
