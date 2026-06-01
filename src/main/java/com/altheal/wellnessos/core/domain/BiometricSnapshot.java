package com.altheal.wellnessos.core.domain;

import java.time.LocalDateTime;

public record BiometricSnapshot(
        String snapshotId,
        String memberId,
        int score,
        double heartRateVariability,
        LocalDateTime capturedAt,
        String evaluationTag
) {
    public BiometricSnapshot {
        if (snapshotId == null || snapshotId.isBlank()) {
            throw new IllegalArgumentException("Snapshot Tracking ID cannot be null, empty or unassigned.");
        }
        if (memberId == null || memberId.isBlank()) {
            throw new IllegalArgumentException("Associated Target Member ID link must be declared.");
        }
        if (score < 1 || score > 10) {
            throw new IllegalArgumentException("Autonomic system recovery scores must fit strictly between 1 and 10.");
        }
        if (heartRateVariability <= 0.0) {
            throw new IllegalArgumentException("Heart Rate Variability measurement must be a positive quantitative value.");
        }
        if (capturedAt == null) {
            capturedAt = LocalDateTime.now();
        }
    }
}
