package com.wellnessos.dto;

public class DoctorDTO {
    private Long id;
    private String name;
    private String specialty;
    private Double rating;
    private Integer experienceYears;
    private String description;
    private String phone;
    private String email;
    private String availability;
    private String imageUrl;
    private Boolean isAvailable;

    public DoctorDTO() {}

    public DoctorDTO(Long id, String name, String specialty, Double rating, Integer experienceYears,
                     String description, String phone, String email, String availability, 
                     String imageUrl, Boolean isAvailable) {
        this.id = id;
        this.name = name;
        this.specialty = specialty;
        this.rating = rating;
        this.experienceYears = experienceYears;
        this.description = description;
        this.phone = phone;
        this.email = email;
        this.availability = availability;
        this.imageUrl = imageUrl;
        this.isAvailable = isAvailable;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }
    
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    
    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }
}
