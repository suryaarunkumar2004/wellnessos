package com.wellnessos.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "calendar_events")
public class CalendarEvent {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String description;
    
    @Column(name = "event_date")
    private LocalDate eventDate;
    
    @Column(name = "start_time")
    private LocalTime startTime;
    
    @Column(name = "end_time")
    private LocalTime endTime;
    
    @Column(name = "event_type")
    private String eventType;
    
    private String category;
    
    @Column(name = "sub_category")
    private String subCategory;
    
    private String status;
    private String priority;
    private String location;
    
    @Column(name = "is_all_day")
    private Boolean isAllDay;
    
    @Column(name = "is_recurring")
    private Boolean isRecurring;
    
    @Column(name = "recurring_pattern")
    private String recurringPattern;
    
    @Column(name = "recurring_end_date")
    private LocalDate recurringEndDate;
    
    @Column(name = "recurrence_count")
    private Integer recurrenceCount;
    
    @Column(name = "is_virtual")
    private Boolean isVirtual;
    
    @Column(name = "meeting_link")
    private String meetingLink;
    
    private String color;
    private String icon;
    
    @Column(name = "reminder_minutes")
    private Integer reminderMinutes;
    
    @Column(name = "reminder_sent")
    private Boolean reminderSent;
    
    @Column(name = "reminder_type")
    private String reminderType;
    
    @Column(name = "user_id")
    private Long userId;
    
    @Column(name = "doctor_id")
    private Long doctorId;
    
    @Column(name = "appointment_id")
    private Long appointmentId;
    
    @Column(name = "guest_list")
    private String guestList;
    
    private String attachments;
    private String notes;
    private Integer rating;
    private String feedback;
    
    @Column(name = "is_public")
    private Boolean isPublic;
    
    @Column(name = "is_important")
    private Boolean isImportant;
    
    @Column(name = "is_archived")
    private Boolean isArchived;
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    private String timezone;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        if (eventType == null) eventType = "appointment";
        if (category == null) category = "General";
        if (status == null) status = "scheduled";
        if (priority == null) priority = "medium";
        if (isAllDay == null) isAllDay = false;
        if (isRecurring == null) isRecurring = false;
        if (reminderMinutes == null) reminderMinutes = 30;
        if (reminderSent == null) reminderSent = false;
        if (color == null) color = "#059669";
        if (timezone == null) timezone = "UTC";
        if (isPublic == null) isPublic = false;
        if (isImportant == null) isImportant = false;
        if (isArchived == null) isArchived = false;
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // ===== GETTERS AND SETTERS =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public LocalDate getEventDate() { return eventDate; }
    public void setEventDate(LocalDate eventDate) { this.eventDate = eventDate; }
    
    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
    
    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
    
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getSubCategory() { return subCategory; }
    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public Boolean getIsAllDay() { return isAllDay; }
    public void setIsAllDay(Boolean isAllDay) { this.isAllDay = isAllDay; }
    
    public Boolean getIsRecurring() { return isRecurring; }
    public void setIsRecurring(Boolean isRecurring) { this.isRecurring = isRecurring; }
    
    public String getRecurringPattern() { return recurringPattern; }
    public void setRecurringPattern(String recurringPattern) { this.recurringPattern = recurringPattern; }
    
    public LocalDate getRecurringEndDate() { return recurringEndDate; }
    public void setRecurringEndDate(LocalDate recurringEndDate) { this.recurringEndDate = recurringEndDate; }
    
    public Integer getRecurrenceCount() { return recurrenceCount; }
    public void setRecurrenceCount(Integer recurrenceCount) { this.recurrenceCount = recurrenceCount; }
    
    public Boolean getIsVirtual() { return isVirtual; }
    public void setIsVirtual(Boolean isVirtual) { this.isVirtual = isVirtual; }
    
    public String getMeetingLink() { return meetingLink; }
    public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }
    
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    
    public Integer getReminderMinutes() { return reminderMinutes; }
    public void setReminderMinutes(Integer reminderMinutes) { this.reminderMinutes = reminderMinutes; }
    
    public Boolean getReminderSent() { return reminderSent; }
    public void setReminderSent(Boolean reminderSent) { this.reminderSent = reminderSent; }
    
    public String getReminderType() { return reminderType; }
    public void setReminderType(String reminderType) { this.reminderType = reminderType; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    
    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }
    
    public String getGuestList() { return guestList; }
    public void setGuestList(String guestList) { this.guestList = guestList; }
    
    public String getAttachments() { return attachments; }
    public void setAttachments(String attachments) { this.attachments = attachments; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
    
    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }
    
    public Boolean getIsImportant() { return isImportant; }
    public void setIsImportant(Boolean isImportant) { this.isImportant = isImportant; }
    
    public Boolean getIsArchived() { return isArchived; }
    public void setIsArchived(Boolean isArchived) { this.isArchived = isArchived; }
    
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
    
    public String getTimezone() { return timezone; }
    public void setTimezone(String timezone) { this.timezone = timezone; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
