package com.altheal.wellnessos.repository;

import com.altheal.wellnessos.model.entity.DiagnosticReportEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface DiagnosticReportRepository extends JpaRepository<DiagnosticReportEntity, String> {

    Page<DiagnosticReportEntity> findAllByMemberId(String memberId, Pageable pageable);

    Page<DiagnosticReportEntity> findByMemberIdAndGeneratedAtBetween(
            String memberId, LocalDateTime from, LocalDateTime to, Pageable pageable);

    long countByMemberIdAndCriticalBurnoutIndicatedTrue(String memberId);
}
