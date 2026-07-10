package com.wellnessos.service;

import com.wellnessos.entity.Appointment;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class VideoMeetingService {

    public String createMeetingLink(Appointment appointment) {
        // Generate a unique meeting ID
        String meetingId = UUID.randomUUID().toString().substring(0, 8);
        
        // Use a video platform (Jitsi, Zoom, or custom)
        String meetingLink = "https://meet.jit.si/WellNest-" + meetingId;
        
        return meetingLink;
    }

    public String getMeetingLink(Appointment appointment) {
        // In real implementation, store meeting links in database
        String meetingId = UUID.randomUUID().toString().substring(0, 8);
        return "https://meet.jit.si/WellNest-" + meetingId;
    }
}
