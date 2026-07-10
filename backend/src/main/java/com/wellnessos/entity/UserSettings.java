package com.wellnessos.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_settings")
public class UserSettings {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;
    
    // Security Settings
    @Column(name = "two_factor_enabled")
    private Boolean twoFactorEnabled = false;
    
    @Column(name = "two_factor_secret")
    private String twoFactorSecret;
    
    // Preferences
    @Column(name = "language")
    private String language = "en";
    
    @Column(name = "currency")
    private String currency = "USD";
    
    @Column(name = "timezone")
    private String timezone = "UTC";
    
    // Accessibility
    @Column(name = "high_contrast")
    private Boolean highContrast = false;
    
    @Column(name = "font_size")
    private String fontSize = "1rem";
    
    @Column(name = "motion_reduce")
    private Boolean motionReduce = false;
    
    @Column(name = "voice_volume")
    private Integer voiceVolume = 70;
    
    // NEW: Font Family
    @Column(name = "font_family")
    private String fontFamily = "Inter";
    
    // NEW: Reduced Motion
    @Column(name = "reduced_motion")
    private Boolean reducedMotion = false;
    
    // NEW: Line Height
    @Column(name = "line_height")
    private String lineHeight = "1.5";
    
    // NEW: Letter Spacing
    @Column(name = "letter_spacing")
    private String letterSpacing = "0";
    
    // NEW: Underline Links
    @Column(name = "underline_links")
    private Boolean underlineLinks = false;
    
    // NEW: Tooltip Delay
    @Column(name = "tooltip_delay")
    private Integer tooltipDelay = 300;
    
    // Notification Settings
    @Column(name = "notifications_enabled")
    private Boolean notificationsEnabled = true;
    
    @Column(name = "notif_appointments")
    private Boolean notifAppointments = true;
    
    @Column(name = "notif_medications")
    private Boolean notifMedications = true;
    
    @Column(name = "notif_lab_results")
    private Boolean notifLabResults = false;
    
    @Column(name = "notif_health_tips")
    private Boolean notifHealthTips = true;
    
    @Column(name = "notif_email")
    private Boolean notifEmail = true;
    
    @Column(name = "notif_sms")
    private Boolean notifSMS = false;
    
    @Column(name = "notif_push")
    private Boolean notifPush = true;
    
    @Column(name = "quiet_hours_enabled")
    private Boolean quietHoursEnabled = false;
    
    @Column(name = "quiet_hours_start")
    private String quietHoursStart = "22:00";
    
    @Column(name = "quiet_hours_end")
    private String quietHoursEnd = "07:00";
    
    // Device Integrations
    @Column(name = "fitbit_connected")
    private Boolean fitbitConnected = false;
    
    @Column(name = "fitbit_last_sync")
    private LocalDateTime fitbitLastSync;
    
    @Column(name = "garmin_connected")
    private Boolean garminConnected = false;
    
    @Column(name = "garmin_last_sync")
    private LocalDateTime garminLastSync;
    
    @Column(name = "google_fit_connected")
    private Boolean googleFitConnected = false;
    
    @Column(name = "google_fit_last_sync")
    private LocalDateTime googleFitLastSync;
    
    @Column(name = "apple_health_connected")
    private Boolean appleHealthConnected = false;
    
    @Column(name = "apple_health_last_sync")
    private LocalDateTime appleHealthLastSync;
    
    // General
    @Column(name = "silent_mode")
    private Boolean silentMode = false;
    
    @Column(name = "calendar_sync")
    private Boolean calendarSync = true;
    
    @Column(name = "analytics_enabled")
    private Boolean analyticsEnabled = true;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ========== GETTERS ==========
    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public Boolean getTwoFactorEnabled() { return twoFactorEnabled; }
    public String getTwoFactorSecret() { return twoFactorSecret; }
    public String getLanguage() { return language; }
    public String getCurrency() { return currency; }
    public String getTimezone() { return timezone; }
    public Boolean getHighContrast() { return highContrast; }
    public String getFontSize() { return fontSize; }
    public Boolean getMotionReduce() { return motionReduce; }
    public Integer getVoiceVolume() { return voiceVolume; }
    public String getFontFamily() { return fontFamily; }
    public Boolean getReducedMotion() { return reducedMotion; }
    public String getLineHeight() { return lineHeight; }
    public String getLetterSpacing() { return letterSpacing; }
    public Boolean getUnderlineLinks() { return underlineLinks; }
    public Integer getTooltipDelay() { return tooltipDelay; }
    public Boolean getNotificationsEnabled() { return notificationsEnabled; }
    public Boolean getNotifAppointments() { return notifAppointments; }
    public Boolean getNotifMedications() { return notifMedications; }
    public Boolean getNotifLabResults() { return notifLabResults; }
    public Boolean getNotifHealthTips() { return notifHealthTips; }
    public Boolean getNotifEmail() { return notifEmail; }
    public Boolean getNotifSMS() { return notifSMS; }
    public Boolean getNotifPush() { return notifPush; }
    public Boolean getQuietHoursEnabled() { return quietHoursEnabled; }
    public String getQuietHoursStart() { return quietHoursStart; }
    public String getQuietHoursEnd() { return quietHoursEnd; }
    public Boolean getFitbitConnected() { return fitbitConnected; }
    public LocalDateTime getFitbitLastSync() { return fitbitLastSync; }
    public Boolean getGarminConnected() { return garminConnected; }
    public LocalDateTime getGarminLastSync() { return garminLastSync; }
    public Boolean getGoogleFitConnected() { return googleFitConnected; }
    public LocalDateTime getGoogleFitLastSync() { return googleFitLastSync; }
    public Boolean getAppleHealthConnected() { return appleHealthConnected; }
    public LocalDateTime getAppleHealthLastSync() { return appleHealthLastSync; }
    public Boolean getSilentMode() { return silentMode; }
    public Boolean getCalendarSync() { return calendarSync; }
    public Boolean getAnalyticsEnabled() { return analyticsEnabled; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    // ========== SETTERS ==========
    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setTwoFactorEnabled(Boolean twoFactorEnabled) { this.twoFactorEnabled = twoFactorEnabled; }
    public void setTwoFactorSecret(String twoFactorSecret) { this.twoFactorSecret = twoFactorSecret; }
    public void setLanguage(String language) { this.language = language; }
    public void setCurrency(String currency) { this.currency = currency; }
    public void setTimezone(String timezone) { this.timezone = timezone; }
    public void setHighContrast(Boolean highContrast) { this.highContrast = highContrast; }
    public void setFontSize(String fontSize) { this.fontSize = fontSize; }
    public void setMotionReduce(Boolean motionReduce) { this.motionReduce = motionReduce; }
    public void setVoiceVolume(Integer voiceVolume) { this.voiceVolume = voiceVolume; }
    public void setFontFamily(String fontFamily) { this.fontFamily = fontFamily; }
    public void setReducedMotion(Boolean reducedMotion) { this.reducedMotion = reducedMotion; }
    public void setLineHeight(String lineHeight) { this.lineHeight = lineHeight; }
    public void setLetterSpacing(String letterSpacing) { this.letterSpacing = letterSpacing; }
    public void setUnderlineLinks(Boolean underlineLinks) { this.underlineLinks = underlineLinks; }
    public void setTooltipDelay(Integer tooltipDelay) { this.tooltipDelay = tooltipDelay; }
    public void setNotificationsEnabled(Boolean notificationsEnabled) { this.notificationsEnabled = notificationsEnabled; }
    public void setNotifAppointments(Boolean notifAppointments) { this.notifAppointments = notifAppointments; }
    public void setNotifMedications(Boolean notifMedications) { this.notifMedications = notifMedications; }
    public void setNotifLabResults(Boolean notifLabResults) { this.notifLabResults = notifLabResults; }
    public void setNotifHealthTips(Boolean notifHealthTips) { this.notifHealthTips = notifHealthTips; }
    public void setNotifEmail(Boolean notifEmail) { this.notifEmail = notifEmail; }
    public void setNotifSMS(Boolean notifSMS) { this.notifSMS = notifSMS; }
    public void setNotifPush(Boolean notifPush) { this.notifPush = notifPush; }
    public void setQuietHoursEnabled(Boolean quietHoursEnabled) { this.quietHoursEnabled = quietHoursEnabled; }
    public void setQuietHoursStart(String quietHoursStart) { this.quietHoursStart = quietHoursStart; }
    public void setQuietHoursEnd(String quietHoursEnd) { this.quietHoursEnd = quietHoursEnd; }
    public void setFitbitConnected(Boolean fitbitConnected) { this.fitbitConnected = fitbitConnected; }
    public void setFitbitLastSync(LocalDateTime fitbitLastSync) { this.fitbitLastSync = fitbitLastSync; }
    public void setGarminConnected(Boolean garminConnected) { this.garminConnected = garminConnected; }
    public void setGarminLastSync(LocalDateTime garminLastSync) { this.garminLastSync = garminLastSync; }
    public void setGoogleFitConnected(Boolean googleFitConnected) { this.googleFitConnected = googleFitConnected; }
    public void setGoogleFitLastSync(LocalDateTime googleFitLastSync) { this.googleFitLastSync = googleFitLastSync; }
    public void setAppleHealthConnected(Boolean appleHealthConnected) { this.appleHealthConnected = appleHealthConnected; }
    public void setAppleHealthLastSync(LocalDateTime appleHealthLastSync) { this.appleHealthLastSync = appleHealthLastSync; }
    public void setSilentMode(Boolean silentMode) { this.silentMode = silentMode; }
    public void setCalendarSync(Boolean calendarSync) { this.calendarSync = calendarSync; }
    public void setAnalyticsEnabled(Boolean analyticsEnabled) { this.analyticsEnabled = analyticsEnabled; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (twoFactorEnabled == null) twoFactorEnabled = false;
        if (notificationsEnabled == null) notificationsEnabled = true;
        if (analyticsEnabled == null) analyticsEnabled = true;
        if (calendarSync == null) calendarSync = true;
        if (silentMode == null) silentMode = false;
        if (highContrast == null) highContrast = false;
        if (motionReduce == null) motionReduce = false;
        if (reducedMotion == null) reducedMotion = false;
        if (underlineLinks == null) underlineLinks = false;
        if (notifAppointments == null) notifAppointments = true;
        if (notifMedications == null) notifMedications = true;
        if (notifHealthTips == null) notifHealthTips = true;
        if (notifEmail == null) notifEmail = true;
        if (notifPush == null) notifPush = true;
        if (notifSMS == null) notifSMS = false;
        if (notifLabResults == null) notifLabResults = false;
        if (fitbitConnected == null) fitbitConnected = false;
        if (garminConnected == null) garminConnected = false;
        if (googleFitConnected == null) googleFitConnected = false;
        if (appleHealthConnected == null) appleHealthConnected = false;
        if (quietHoursEnabled == null) quietHoursEnabled = false;
        if (language == null) language = "en";
        if (currency == null) currency = "USD";
        if (timezone == null) timezone = "UTC";
        if (fontSize == null) fontSize = "1rem";
        if (voiceVolume == null) voiceVolume = 70;
        if (quietHoursStart == null) quietHoursStart = "22:00";
        if (quietHoursEnd == null) quietHoursEnd = "07:00";
        if (fontFamily == null) fontFamily = "Inter";
        if (lineHeight == null) lineHeight = "1.5";
        if (letterSpacing == null) letterSpacing = "0";
        if (tooltipDelay == null) tooltipDelay = 300;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
