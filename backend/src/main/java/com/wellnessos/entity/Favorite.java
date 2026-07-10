package com.wellnessos.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "favorites")
public class Favorite {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long userId;
    private Long serviceId;
    private String serviceName;
    private String serviceCategory;
    private String serviceIcon;
    private Double serviceRating;
    private String servicePrice;
    private LocalDateTime createdAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }
    
    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }
    
    public String getServiceCategory() { return serviceCategory; }
    public void setServiceCategory(String serviceCategory) { this.serviceCategory = serviceCategory; }
    
    public String getServiceIcon() { return serviceIcon; }
    public void setServiceIcon(String serviceIcon) { this.serviceIcon = serviceIcon; }
    
    public Double getServiceRating() { return serviceRating; }
    public void setServiceRating(Double serviceRating) { this.serviceRating = serviceRating; }
    
    public String getServicePrice() { return servicePrice; }
    public void setServicePrice(String servicePrice) { this.servicePrice = servicePrice; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
