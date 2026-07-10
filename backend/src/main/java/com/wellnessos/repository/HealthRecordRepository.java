package com.wellnessos.repository;

import com.wellnessos.entity.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {
    
    List<HealthRecord> findByUserId(Long userId);
    
    List<HealthRecord> findByUserIdOrderByRecordDateDesc(Long userId);
    
    Optional<HealthRecord> findByUserIdAndRecordDate(Long userId, LocalDate recordDate);
    
    List<HealthRecord> findByUserIdAndRecordDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
    
    Optional<HealthRecord> findTopByUserIdOrderByRecordDateDesc(Long userId);
}
