package com.altheal.wellnessos.core.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

public record DiagnosticReport(
        String reportId,
        String memberId,
        double calculatedRecoveryIndex,
        double peakHeartRateVariability,
        double baselineHeartRateVariability,
        List<BiometricSnapshot> underlyingSnapshots,
        LocalDateTime generatedAt,
        String systemicSummaryNotes
) {
    public DiagnosticReport {
        if (reportId == null || reportId.isBlank()) {
            reportId = "RPT-" + UUID.randomUUID().toString().toUpperCase();
        }

        Objects.requireNonNull(memberId, "Associated Target Member link identifier must be defined.");
        if (memberId.isBlank()) {
            throw new IllegalArgumentException("Associated Target Member link identifier cannot be blank.");
        }

        if (calculatedRecoveryIndex < 0.0 || calculatedRecoveryIndex > 10.0) {
            throw new IllegalArgumentException("Aggregated recovery index metrics must sit tightly between 0.0 and 10.0.");
        }

        if (peakHeartRateVariability < 0.0 || baselineHeartRateVariability < 0.0) {
            throw new IllegalArgumentException("Heart rate variability metrics cannot map to negative floating values.");
        }

        if (peakHeartRateVariability < baselineHeartRateVariability) {
            throw new IllegalArgumentException("Invariant violation: Peak HRV cannot be mathematically lower than baseline HRV values.");
        }

        if (systemicSummaryNotes == null || systemicSummaryNotes.isBlank()) {
            systemicSummaryNotes = "Automated systemic evaluation compiled across assigned recovery tracking timeline matrix.";
        }

        if (underlyingSnapshots == null || underlyingSnapshots.isEmpty()) {
            underlyingSnapshots = List.of();
        } else {
            underlyingSnapshots = List.copyOf(underlyingSnapshots);
        }

        if (generatedAt == null) {
            generatedAt = LocalDateTime.now();
        }
    }

    public double getHrvSpikeDelta() {
        return this.peakHeartRateVariability - this.baselineHeartRateVariability;
    }

    public boolean isCriticalBurnoutIndicated() {
        return this.calculatedRecoveryIndex < 4.0 || this.baselineHeartRateVariability < 25.0;
    }
}
