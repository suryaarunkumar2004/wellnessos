package com.wellnessos.dto;

public class CalendarEventRequest {
    private String title;
    private String description;
    private String location;
    private String type;
    private String date;
    private String startTime;
    private String endTime;
    private String duration;
    private String color;
    private String icon;
    private boolean allDay;
    private boolean recurring;
    private String recurringType;
    private Integer recurringInterval;
    private String priority;
    private String status;
    private String reminderMinutes;
    private String notes;
    private String attachments;

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }
    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public boolean isAllDay() { return allDay; }
    public void setAllDay(boolean allDay) { this.allDay = allDay; }
    public boolean isRecurring() { return recurring; }
    public void setRecurring(boolean recurring) { this.recurring = recurring; }
    public String getRecurringType() { return recurringType; }
    public void setRecurringType(String recurringType) { this.recurringType = recurringType; }
    public Integer getRecurringInterval() { return recurringInterval; }
    public void setRecurringInterval(Integer recurringInterval) { this.recurringInterval = recurringInterval; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getReminderMinutes() { return reminderMinutes; }
    public void setReminderMinutes(String reminderMinutes) { this.reminderMinutes = reminderMinutes; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getAttachments() { return attachments; }
    public void setAttachments(String attachments) { this.attachments = attachments; }
}
