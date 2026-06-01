package com.altheal.wellnessos.model.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

@Data
public class DiagnosticReportRequest {

    @NotBlank(message = "Associated member ID is required.")
    private String memberId;

    @NotNull(message = "Biometric score matrix is required.")
    @Size(min = 1, max = 28, message = "Biometric score list must contain between 1 and 28 entries.")
    private List<@Min(value = 1, message = "Score must be at least 1") @Max(value = 10, message = "Score must be at most 10") Integer> biometricScores;

    @DecimalMin(value = "0.0", message = "Peak HRV must be non-negative.")
    private double peakHeartRateVariability;

    @DecimalMin(value = "0.0", message = "Baseline HRV must be non-negative.")
    private double baselineHeartRateVariability;

    private String systemicSummaryNotes;
}
