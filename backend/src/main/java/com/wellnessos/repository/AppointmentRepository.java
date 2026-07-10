package com.wellnessos.repository;

import com.wellnessos.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUserId(Long userId);
    List<Appointment> findByAppointmentDate(LocalDate date);
    List<Appointment> findByUserIdAndAppointmentDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
    
    // Missing methods from AppointmentController
    List<Appointment> findByUserIdOrderByAppointmentDateDesc(Long userId);
    List<Appointment> findByUserIdAndStatus(Long userId, String status);
    List<Appointment> findByDoctorId(Long doctorId);
}
