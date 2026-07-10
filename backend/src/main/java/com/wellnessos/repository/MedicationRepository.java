package com.wellnessos.repository;

import com.wellnessos.entity.Medication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, Long> {
    List<Medication> findByUserId(Long userId);
    
    @Query("SELECT m FROM Medication m WHERE m.active = true OR m.active IS NULL")
    List<Medication> findAllActive();
}
