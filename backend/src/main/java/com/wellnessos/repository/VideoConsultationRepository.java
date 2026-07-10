package com.wellnessos.repository;

import com.wellnessos.entity.VideoConsultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VideoConsultationRepository extends JpaRepository<VideoConsultation, Long> {
    List<VideoConsultation> findByAppointmentId(Long appointmentId);
    List<VideoConsultation> findByPatientEmail(String email);
    List<VideoConsultation> findByDoctorEmail(String email);
    List<VideoConsultation> findByStatus(String status);
    Optional<VideoConsultation> findByMeetingId(String meetingId);
}
