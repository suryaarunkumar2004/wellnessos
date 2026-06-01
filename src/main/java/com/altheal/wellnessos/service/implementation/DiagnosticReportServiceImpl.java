package com.altheal.wellnessos.service.implementation;

import com.altheal.wellnessos.core.algorithm.AdvancedHealthProcessor;
import com.altheal.wellnessos.core.domain.BiometricSnapshot;
import com.altheal.wellnessos.core.exception.InvalidDosageException;
import com.altheal.wellnessos.model.dto.request.DiagnosticReportRequest;
import com.altheal.wellnessos.model.dto.response.DiagnosticReportResponse;
import com.altheal.wellnessos.model.entity.DiagnosticReportEntity;
import com.altheal.wellnessos.repository.DiagnosticReportRepository;
import com.altheal.wellnessos.service.DiagnosticReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class DiagnosticReportServiceImpl implements DiagnosticReportService {

    private final DiagnosticReportRepository reportRepository;
    private final AdvancedHealthProcessor healthProcessor;

    @Override
    @Transactional
    public DiagnosticReportResponse generateReport(DiagnosticReportRequest request) {
        log.info("Generating diagnostic report for memberId: {}", request.getMemberId());

        // Build BiometricSnapshot list from the incoming integer scores
        List<BiometricSnapshot> snapshots = request.getBiometricScores().stream()
                .map(score -> new BiometricSnapshot(
                        UUID.randomUUID().toString(),
                        request.getMemberId(),
                        score,
                        request.getPeakHeartRateVariability(),
                        LocalDateTime.now(),
                        score >= 7 ? "RECOVERY" : score >= 4 ? "MODERATE" : "CRITICAL"
                ))
                .toList();

        double recoveryIndex;
        try {
            recoveryIndex = healthProcessor.calculateSystemicRecoveryIndex(snapshots);
        } catch (InvalidDosageException ex) {
            log.error("Recovery index calculation failed: {}", ex.getMessage());
            throw new IllegalArgumentException("Biometric data is invalid: " + ex.getMessage(), ex);
        }

        double hrvSpikeDelta = request.getPeakHeartRateVariability() - request.getBaselineHeartRateVariability();
        boolean criticalBurnout = recoveryIndex < 4.0 || request.getBaselineHeartRateVariability() < 25.0;

        String reportId = "RPT-" + UUID.randomUUID().toString().toUpperCase();

        DiagnosticReportEntity entity = new DiagnosticReportEntity();
        entity.setReportId(reportId);
        entity.setMemberId(request.getMemberId());
        entity.setCalculatedRecoveryIndex(recoveryIndex);
        entity.setPeakHeartRateVariability(request.getPeakHeartRateVariability());
        entity.setBaselineHeartRateVariability(request.getBaselineHeartRateVariability());
        entity.setHrvSpikeDelta(hrvSpikeDelta);
        entity.setCriticalBurnoutIndicated(criticalBurnout);
        entity.setSystemicSummaryNotes(
                request.getSystemicSummaryNotes() != null && !request.getSystemicSummaryNotes().isBlank()
                        ? request.getSystemicSummaryNotes()
                        : "Automated systemic evaluation compiled across assigned recovery tracking timeline matrix."
        );

        DiagnosticReportEntity saved = reportRepository.save(entity);
        log.info("Diagnostic report {} persisted for memberId: {}", saved.getReportId(), saved.getMemberId());

        return toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DiagnosticReportResponse> getReportsForMember(String memberId, Pageable pageable) {
        return reportRepository.findAllByMemberId(memberId, pageable).map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public DiagnosticReportResponse getReportById(String reportId) {
        return reportRepository.findById(reportId)
                .map(this::toResponse)
                .orElseThrow(() -> new NoSuchElementException("Diagnostic report not found: " + reportId));
    }

    @Override
    @Transactional(readOnly = true)
    public long countCriticalReportsForMember(String memberId) {
        return reportRepository.countByMemberIdAndCriticalBurnoutIndicatedTrue(memberId);
    }

    private DiagnosticReportResponse toResponse(DiagnosticReportEntity entity) {
        return DiagnosticReportResponse.builder()
                .reportId(entity.getReportId())
                .memberId(entity.getMemberId())
                .calculatedRecoveryIndex(entity.getCalculatedRecoveryIndex())
                .peakHeartRateVariability(entity.getPeakHeartRateVariability())
                .baselineHeartRateVariability(entity.getBaselineHeartRateVariability())
                .hrvSpikeDelta(entity.getHrvSpikeDelta())
                .criticalBurnoutIndicated(entity.isCriticalBurnoutIndicated())
                .systemicSummaryNotes(entity.getSystemicSummaryNotes())
                .generatedAt(entity.getGeneratedAt())
                .build();
    }
}
