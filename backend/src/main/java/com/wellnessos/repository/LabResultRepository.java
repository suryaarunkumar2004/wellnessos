package com.wellnessos.repository;

import com.wellnessos.entity.LabResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LabResultRepository extends JpaRepository<LabResult, Long> {
    List<LabResult> findByUserId(Long userId);
    List<LabResult> findByStatus(String status);
}
