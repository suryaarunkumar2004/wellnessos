package com.altheal.wellnessos.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiagnosticReportResponse {

    private String reportId;
    private String memberId;
    private double calculatedRecoveryIndex;
    private double peakHeartRateVariability;
    private double baselineHeartRateVariability;
    private double hrvSpikeDelta;
    private boolean criticalBurnoutIndicated;
    private String systemicSummaryNotes;
    private LocalDateTime generatedAt;

    /** Human-readable risk level derived from recovery index. */
    public String getRiskLevel() {
        if (calculatedRecoveryIndex >= 7.0) return "LOW";
        if (calculatedRecoveryIndex >= 4.0) return "MODERATE";
        return "HIGH";
    }
}
