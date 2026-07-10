package com.wellnessos.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
public class Document {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "name", nullable = false, length = 255)
    private String name;
    
    @Column(name = "category", length = 100)
    private String category;
    
    @Column(name = "file_size", length = 50)
    private String fileSize;
    
    @Column(name = "file_url", length = 500)
    private String fileUrl;
    
    @Column(name = "uploaded_at", updatable = false)
    private LocalDateTime uploadedAt;

    // ========== GETTERS ==========
    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getFileSize() { return fileSize; }
    public String getFileUrl() { return fileUrl; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }

    // ========== SETTERS ==========
    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setName(String name) { this.name = name; }
    public void setCategory(String category) { this.category = category; }
    public void setFileSize(String fileSize) { this.fileSize = fileSize; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }

    // ========== LIFE CYCLE CALLBACKS ==========
    @PrePersist
    protected void onCreate() {
        uploadedAt = LocalDateTime.now();
    }
}
