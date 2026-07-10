package com.wellnessos.repository;

import com.wellnessos.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    
    List<Doctor> findByIsAvailableTrue();
    
    List<Doctor> findBySpecialtyContainingIgnoreCase(String specialty);
    
    List<Doctor> findByNameContainingIgnoreCaseOrSpecialtyContainingIgnoreCase(String name, String specialty);
    
    @Query("SELECT d FROM Doctor d WHERE d.isAvailable = true AND (LOWER(d.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(d.specialty) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(d.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Doctor> searchDoctors(@Param("search") String search);
    
    @Query("SELECT DISTINCT d.specialty FROM Doctor d WHERE d.isAvailable = true")
    List<String> findAllSpecialties();
}
